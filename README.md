# Sigma Upsilon Mu (SUM) Website

Welcome to the official GitHub repository for the Sigma Upsilon Mu (SUM) website. This website serves as one of our main platforms for information about our fraternity, upcoming events, member achievments, and more.

## Table of Contents

- Overview
- Live Website
- Features
- Tech Stack
- Getting Started
- Folder Structure
- Deployment
- License

## Overview

The SUM Website provides an online platform to engage with current and potential members of SUM. The site is designed to be modern, user-friendly, and responsive, making it easy for visitors to navigate and learn more about SUM.

## Live Website

Check out the live website: http://www.rushsum.com

## Features

- **AI Chatbot**: Integration with OpenAI to provide intelligent SUM handbook trained responses to users.
- **Home Page**: Overview of the fraternity's mission and principles.
- **Interest Forms**: A simple signup form for potential members that connect to SUM's GHL.
- **Member Achievements**: Highlight the accomplishments of members.
- **Events Section**: Stay updated on fraternity activities and rush events.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.

## Tech Stack

### Frontend

- React
- React Icons
- CSS

### Backend

- Node.js
- OpenAI API
- GPT 4o mini

### Deployment

- Netlify

## Getting Started

To run the project locally:

### Prerequisites

- Node.js and npm installed on your system
- Git for cloning the repository

### Setup

1. Clone the repository

   - `git clone https://github.com/anarotgonbaatar/SUM-Website.git`s
   - `cd SUM-Website`

2. Install dependencies

   - `npm install`

3. Start the backend server

   - `node server.js`

4. Start the development server:

   - `npm start`

   The app will run on http://localhost:3000

## Deployment

The project is hosted on Netlify. Deploymnet commands are configured in the `netligy.toml` file. Simply git push your commit and Netlify will automatically publish the website.

- Ensure `netlify/functions/chat.js` is included in the deployment.
- Check that the OpenAI API key is correctly configured in the Netlify environment variables.

## License

?
