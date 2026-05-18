# Mini Service Request Board – Frontend

This is the frontend application for the **Mini Service Request Board** technical assessment built for GlobalTNA.

The application allows homeowners to create service requests and enables tradespeople to browse available jobs, view job details, update job statuses, and remove completed requests.

The frontend is built using **Next.js App Router** and communicates with a separate **Node.js + Express REST API** backend.

---

# Features

- View all service requests
- Filter jobs by category
- Create a new job request
- View full job details
- Update job request status
- Delete job requests
- Client-side form validation
- Responsive and clean user interface

---

# Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS / CSS
- Axios
- REST API Integration

---

# Project Structure

```bash
src/
│
├── app/
│   ├── jobs/
│   └── page.tsx
│
├── components/
│
├── lib/
│
├── types/
│
└── styles/
```

---

# Local Setup

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 3. Run Development Server

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

---