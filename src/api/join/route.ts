    import { NextResponse } from "next/server";

    export async function POST(req: Request) {
        const token = process.env.GHL_PRIVATE_TOKEN!;
        const locationId = process.env.GHL_LOCATION_ID!;

        const body = await req.json();
        const { firstName, lastName, email, phone } = body;

        const r = await fetch("https://services.leadconnectorhq.com/contacts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Version": "2021-07-28",
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                locationId,
                firstName,
                lastName,
                email,
                phone,
                // customFields: [{ id: "...", value: "..." }],  // if you add custom fields
                // tags: ["Recruitment"],                       // sometimes works here, but tags endpoint is cleaner
                source: "website-join-form",
            }),
        });

        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
            return NextResponse.json({ ok: false, error: data }, { status: r.status });
        }

        return NextResponse.json({ ok: true, contact: data });
    }
