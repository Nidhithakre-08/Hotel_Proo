# HotelPro — Hotel Booking & Management System

**HotelPro** is a full-stack hotel booking and administration web application. Guests can discover hotels, explore rooms, make demo reservations, and manage their bookings. Administrators can manage hotels, rooms, reservations, customers, and dashboard statistics.

> A portfolio/demo project. Payments are simulated; no real money is charged.

## Screenshots

### Customer experience

| Discover hotels | Browse hotel listings |
|---|---|
| ![HotelPro discover page](screenshots/discover-home.jpeg) | ![Hotel listings](screenshots/hotel-listings.jpeg) |

### Booking experience

![Booking payment step](screenshots/booking-payment.jpeg)

![Customer bookings](screenshots/customer-bookings.jpeg)

### Admin experience

![Admin dashboard](screenshots/admin-dashboard.jpeg)

![Room management](screenshots/room-management.jpeg)

## Features

### Customer portal
- Browse and search hotels by destination.
- Select check-in/check-out dates and guest count.
- View hotel and room details, prices, amenities, and availability.
- Complete a multi-step booking flow and choose a demo payment method.
- View booking details and manage/cancel reservations.
- Save stays and manage account settings.

### Admin panel
- Dashboard summary for revenue, bookings, hotels, customers, and room status.
- Create, edit, and delete hotels and rooms.
- Update room status (available, maintenance, or hidden).
- View and manage bookings and payment status.
- View registered customers.

### Application safeguards
- Separate customer and administrator authentication flows.
- Server-side authorization for administrative API endpoints.
- Availability checks to prevent overlapping room reservations.
- Server-side price and tax calculation.
- Customers can access their own bookings rather than other customers' reservations.

## Tech stack

- **Frontend:** React 18, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (optional), with local JSON-file fallback for local development
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Deployment configuration:** Vercel

## Run locally

### Requirements

- Node.js (a current LTS version is recommended)
- npm
- Optional: a MongoDB database, such as MongoDB Atlas

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd hotelpro-project
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your repository's URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create your local `.env` file by copying the example:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux**
```bash
cp .env.example .env
```

Set your own values in `.env`:

```dotenv
MONGODB_URI=
JWT_SECRET=replace-with-a-random-secret-at-least-32-characters-long
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose-a-strong-password
```

Use a long, randomly generated `JWT_SECRET` and a strong admin password. Never commit `.env` or real credentials to GitHub. `.env.example` is provided as a template.

### 4. Start the application

```bash
npm run dev
```

This starts the API server and Vite development server. Open:

- Customer website: <http://localhost:5173>
- API server: <http://localhost:3000>
- Admin panel: choose **Sign in → Admin** on the website, or open <http://localhost:5173/admin>

For a production frontend build:

```bash
npm run build
```

## Data storage

When `MONGODB_URI` points to a reachable MongoDB database, HotelPro uses MongoDB. Otherwise, local development can use `data/hotelpro-local-db.json`. The local data file is ignored by Git. Serverless deployments need a persistent database; local filesystem or in-memory fallback storage should not be treated as production persistence.

## Demo payments

The checkout screen is a **simulation only**. It does not process real card, UPI, or bank payments. Do not enter real payment details. A production release would require a payment gateway integration and appropriate security/compliance review.

## Deployment notes

The repository includes Vercel configuration. Before deploying, configure `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in your hosting provider's environment-variable settings. Use a persistent database and verify the production authentication, API routing, and storage configuration before sharing the live site.

## Project structure

```text
hotelpro-project/
├── api/                 # Authentication, hotel, room, booking and admin API handlers
├── data/                # Local development data (ignored by Git)
├── lib/                 # Storage, booking and HTTP helpers
├── public/              # Public assets
├── screenshots/         # Selected README screenshots
├── src/                 # React application, components and styles
├── .env.example         # Environment-variable template
├── dev.js               # Starts frontend and API for local development
├── server.js            # Express API server
├── package.json
└── vite.config.js
```

## API overview

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a customer |
| `POST` | `/api/auth/login` | Customer login |
| `POST` | `/api/auth/admin-login` | Admin login |
| `GET` | `/api/auth/me` | Get the current authenticated user |
| `GET`, `POST` | `/api/hotels` | List or create hotels |
| `GET`, `PUT`, `DELETE` | `/api/hotels/:id` | Read, update, or delete a hotel |
| `GET`, `POST` | `/api/rooms` | List or create rooms |
| `GET`, `PUT`, `DELETE` | `/api/rooms/:id` | Read, update, or delete a room |
| `GET`, `POST` | `/api/bookings` | List or create bookings |
| `GET`, `PUT`, `DELETE` | `/api/bookings/:id` | Read, update, or delete a booking |
| `GET` | `/api/admin/stats` | Admin dashboard statistics |
| `GET` | `/api/admin/users` | List customers (admin) |
| `DELETE` | `/api/admin/users/:id` | Delete a customer (admin) |

## Future improvements

- Integrate a real payment provider.
- Add automated tests for booking, availability, and authentication flows.
- Add email confirmations and password reset.
- Add production logging, monitoring, and deployment checks.

## License

No license has been specified yet. Add a `LICENSE` file before presenting this repository as open source.
