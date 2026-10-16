# Akash Hegadi — Full-Stack Portfolio

A responsive developer portfolio inspired by the supplied reference, built with **React + Vite** on the frontend and **Java Spring Boot** on the backend.

## Features
- Responsive dark portfolio UI with hero, about, skills, projects, and contact sections
- Project cards for Vehicle Rental System, Courier Management System, and AI-Driven Criminal Face Recognition System
- React contact form connected to a Spring Boot REST API
- Contact messages saved to an embedded H2 database
- Form validation and success/error states
- No external database setup required

## Requirements
- Node.js 18+ and npm
- Java 17+
- Maven 3.8+ (or use the Maven wrapper if you add one)

## Run the backend
Open a terminal in `backend`:

```bash
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`
Health endpoint: `http://localhost:8080/api/health`
H2 console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:portfolio`
- Username: `sa`
- Password: leave blank

## Run the frontend
Open a second terminal in `frontend`:

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## API
`POST /api/contact`

Example JSON:
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Portfolio enquiry",
  "message": "Hello!"
}
```

`GET /api/health` returns a small health response.

## Personalize before publishing
1. Update your email and social/profile URLs in `frontend/src/App.jsx`.
2. Add your resume PDF at `frontend/public/resume.pdf` if you want the Download Resume button to work.
3. Update project GitHub/demo links to your real repositories.
4. The backend currently stores contact messages in H2 memory. For production, switch to MySQL/PostgreSQL and configure deployment environment variables.
5. Deploy the React frontend and Spring Boot backend separately, then set `VITE_API_URL` in `frontend/.env` to your deployed backend URL.

## Project structure
```text
akash-portfolio-fullstack/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── pom.xml
    └── src/main/
        ├── java/com/akash/portfolio/
        │   ├── PortfolioApplication.java
        │   ├── config/CorsConfig.java
        │   ├── contact/ContactMessage.java
        │   ├── contact/ContactRepository.java
        │   ├── contact/ContactRequest.java
        │   └── contact/ContactController.java
        └── resources/application.properties
```
