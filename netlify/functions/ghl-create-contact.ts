export const handler = async (event: any) => {
    console.log("RAW BODY:", event.body)

    const normalizePhone = (phone?: string) => {
        if (!phone) return undefined
        const digits = phone.replace(/\D/g, "")
        if (digits.length === 10) return `+1${digits}`
        if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`
        if (phone.trim().startsWith("+")) return phone.trim()
        return undefined
    }

    try {
        if (event.httpMethod !== "POST") {
            return { statusCode: 405, body: "Method Not Allowed" }
        }

        const token = process.env.GHL_PRIVATE_TOKEN
        const locationId = process.env.GHL_LOCATION_ID
        const baseTag = process.env.GHL_TAG // e.g. "prospect"
		const cfReferredById = process.env.GHL_CF_REFERRED_BY_ID
	    const cfCommentsId = process.env.GHL_CF_COMMENTS_ID

        if (!token || !locationId) {
            return { statusCode: 500, body: "Missing server env vars" }
        }

        const payload = JSON.parse(event.body || "{}")
        console.log("PARSED PAYLOAD:", payload)

        const { firstName, lastName, email, phone, referredBy, type, comments } = payload

        const createRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Version: "2021-07-28",
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                locationId,
                firstName,
                lastName,
                email,
                phone: normalizePhone(phone),
                source: "sum-website-join",
            }),
        })

        const raw = await createRes.text()
        let createData: any = raw
        try { createData = JSON.parse(raw) } catch {}

        if (!createRes.ok) {
            const message = createData?.message || ""

            if (createRes.status === 400 && message.includes("does not allow duplicated contacts")) {
                const field = createData?.meta?.matchingField || "email/phone"
                return {
                    statusCode: 409,
                    body: JSON.stringify({
                        ok: false,
                        code: "DUPLICATE_CONTACT",
                        message: `There is already a contact with that ${field}.`,
                    }),
                }
            }

            return {
                statusCode: createRes.status,
                body: JSON.stringify({ ok: false, message, error: createData }),
            }
        }

        // Pull contactId from success response
        const contactId =
            createData?.contact?.id ||
            createData?.contactId ||
            createData?.id

        if (!contactId) {
            return {
                statusCode: 500,
                body: JSON.stringify({ ok: false, message: "Missing contactId in GHL response", error: createData }),
            }
        }
		
        // Tags
        const needsReplyTag = (comments && String(comments).trim().length > 0) ? "needs-reply" : null
        const tags = [baseTag, type, needsReplyTag].filter(Boolean)
		
        const customFields = [
			(cfReferredById && referredBy) ? { id: cfReferredById, value: String(referredBy) } : null,
            (cfCommentsId && comments) ? { id: cfCommentsId, value: String(comments) } : null,
        ].filter(Boolean)
		
		if (customFields.length) {
			const updateRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					Version: "2021-07-28",
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ customFields }),
			})

			const updateRaw = await updateRes.text()

			if (!updateRes.ok) {
				console.error("CUSTOM FIELDS UPDATE FAILED:", updateRes.status, updateRaw)
				return {
					statusCode: 502,
					body: JSON.stringify({
						ok: false,
						message: "GHL custom field update failed",
						status: updateRes.status,
						error: updateRaw,
					}),
				}
			}

			console.log("CUSTOM FIELDS UPDATE OK:", updateRaw)
		}

        if (tags.length) {
            await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Version: "2021-07-28",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ tags }),
            })
        }

        const noteText = [
            referredBy ? `Referred By: ${referredBy}` : null,
            type ? `Type: ${type}` : null,
            comments ? `Comments: ${comments}` : null,
        ].filter(Boolean).join("\n")

        if (noteText) {
            await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Version: "2021-07-28",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ body: noteText }),
            }).catch(() => {})
        }

        return { statusCode: 200, body: JSON.stringify({ ok: true }) }
    } catch (e: any) {
        return { statusCode: 500, body: JSON.stringify({ ok: false, error: e?.message || "Server error" }) }
    }
}
