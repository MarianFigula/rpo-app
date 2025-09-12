# Advertisement Management System

This is a **web application** for managing advertisements.  
It provides functionality to create, read, update, and delete advertisements using a **REST API**.  
The application is designed to run locally using Docker and consists of:

- **Frontend:** React (TypeScript)
- **Backend:** Plain PHP
- **Database:** MySQL

---

## Features

- Create, update, and delete advertisements.
- Associate advertisements with companies.
- Fetch companies automatically from the official [RPO API](https://susrrpo.docs.apiary.io/), or create them manually.
- Search companies in real time when adding advertisements.
- Download advertisements as PDFs using [mPDF](https://mpdf.github.io/).
- Companies without a logo display a placeholder image which is not included in PDF file.
- CRUD actions return responses that are shown to the user with toast notifications.
- Advertisements are displayed on the main page and sorted by `creation_date`.

---

## System Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (with `docker compose`)
- [cURL](https://curl.se/)

---

## Architecture

- **Frontend** (React + TypeScript)  
  Runs on: [http://localhost:5173/](http://localhost:5173/)

- **Backend** (PHP, REST API)  
  Runs on: [http://localhost:8000/](http://localhost:8000/)  
  All API endpoints are located in: `backend/api/`

- **Database** (MySQL)  
  Schema definition: [`database/init.sql`](database/init.sql)

### Database Design

- **Company**
- **Advertisement**
    - One-to-many relationship: a company can have multiple advertisements (`advertisement.company_id`).

---

## Setup & Installation

```bash
# Clone the repository
git clone https://github.com/MarianFigula/rpo-app.git
cd rpo-app

# Build and start containers
docker compose up --build
# or run in detached mode
docker compose up -d --build
```

Populate database with companies from the official RPO API:

```bash
curl http://localhost:8000/api/populate-data.php
```

> **Note:** You can also manually create companies through the app.

---

## External APIs

- **RPO API (Slovak Business Register):**  
  Example query for companies established in Košice in 2016:
  ```
  https://api.statistics.sk/rpo/v1/search?addressMunicipality=Ko%C5%A1ice&establishmentAfter=2016-01-01&establishmentBefore=2016-12-31
  ```

### Observations

- Some municipalities (e.g., Košice, Prešov) return at most **500 rows**, which may indicate API rate or result limits.
- Bardejov returns ~420 rows for the same query.
- Address handling requires checking `validTo`:
    - If missing → the address is still valid.
    - If present → use the most recent valid address.

---

## PDF Generation

- The backend uses [mPDF](https://mpdf.github.io/) for generating PDF files.
- **Problem solved:** Fetch API in React had issues downloading PDFs directly.
    - **Solution:** A clickable `<a>` tag with the PDF link is generated and automatically clicked in React.

---

## User Flow

### Adding an Advertisement
1. Click **Add Advertisement** button.
2. A modal opens with a **company search bar**.
    - After typing 3+ characters, 10 companies are shown.
    - Selecting a company fills input fields automatically.
    - Company fields can still be modified → updates company.
3. Alternatively, fill company inputs manually → creates a new company.
4. Add **advertisement text** (required) and **company logo** (optional).
5. Save → advertisement created.

### Managing Advertisements
- **Edit**: Modify advertisement/company data.
- **Delete**: Remove advertisement.
- **Download PDF**: Export advertisement as PDF (via mPDF).

---

## Known Issues & Future Improvements

- **Frontend error handling:**  
  Highlight invalid inputs with a red border for better UX.
- **File upload validation:**  
  Add file size checks on the frontend.
- **RPO API limitations:**  
  Investigate rate limiting or row caps.
- **Use config file:**  
  Config variables should be in .env file for future use.
- **Image not removed when deleted advertisement**  
Image is not removed from `public/logos` directory when advertisement is deleted.

---

## Development Notes

- Documentation and implementation rely on official sources:
    - [MDN Web Docs](https://developer.mozilla.org/) (forms, fetch, file input handling, etc.)
    - [mPDF Documentation](https://mpdf.github.io/)
    - [RPO API Docs](https://susrrpo.docs.apiary.io/)

---

## Credits & Tools

- **Libraries:** [mPDF](https://mpdf.github.io/)
- **API:** [RPO API](https://susrrpo.docs.apiary.io/)
- **AI Assistant:** [Claude](https://claude.ai/) (debugging, styling fixes, Docker deployment support, polishing documentation)

---
