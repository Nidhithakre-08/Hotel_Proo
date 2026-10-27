# HotelPro — Hotel Booking & Management

A full-stack hotel booking website with a separate admin panel. Customers can search hotels, pick rooms for their dates, and book in three simple steps. Admins can manage hotels, rooms, bookings and customers from a dashboard.

**Stack:** React + Vite (frontend) · Node.js + Express (API) · MongoDB (database, with an automatic local JSON fallback) · JWT authentication

---

## Screenshots

### Customer site

| Home / Discover | Hotel listing |
|---|---|
| ![Home page](<img width="1250" height="550" alt="01-home" src="https://github.com/user-attachments/assets/1ea71bdb-799a-4713-bf61-64e3079abdca" />
) | ![Hotel listing](<img width="1310" height="550" alt="02-admin-signin" src="https://github.com/user-attachments/assets/f81727e7-8aea-443a-8658-ccf7b5e28244" />
) |
| Search by city or hotel name, check-in / check-out dates and guests. | Browse hotels with star rating, amenities and the starting price per night. |

| Hotel details | Create account |
|---|---|
| ![Hotel details](docs/screenshots/09-hotel-details.png) | ![Create account](docs/screenshots/03-create-account.png) |
| See the hotel's address, rating and the rooms available for your dates. | Customers register with name, email, optional phone and password. |

### Booking and payment

![Payment step](docs/screenshots/10-payment.png)

Bookings follow three steps: **Stay → Guest details → Payment**. Customers can pay by card, UPI, net banking or pay at hotel. The price shows the room cost for the chosen nights plus 12% taxes and fees. Payments are a **demo**: no real money is charged.

### Admin panel

| Admin sign in | Dashboard |
|---|---|
| ![Admin sign in](docs/screenshots/02-admin-signin.png) | ![Admin dashboard](docs/screenshots/04-admin-dashboard.png) |
| The same sign-in popup has a **Customer** and an **Admin** tab. | Revenue, bookings, hotels, customers, recent bookings and room status at a glance. |

| Add hotel | Manage rooms |
|---|---|
| ![Add hotel](docs/screenshots/05-admin-add-hotel.png) | ![Manage rooms](docs/screenshots/06-admin-rooms.png) |
| Add or edit hotels with details, amenities, status and a photo. | Search and filter rooms by hotel, and set each room to Available, Maintenance or Hidden. |

![Booking details](docs/screenshots/07-admin-booking-details.png)

Admins can open any booking to see the stay, guest and payment details, then update the booking or payment status. Personal details in these screenshots have been hidden.

---

## Features

**Customer**
- Search hotels by city or name, with dates and guest count
- See only the rooms that are free for the chosen dates
- 3-step booking: stay, guest details, payment
- Pay by card, UPI, net banking or pay at hotel
- My bookings: view details, cancel (refund is marked) and delete
- Saved stays, profile and settings
- Works on mobile and desktop (responsive layout)

**Admin**
- Dashboard with revenue, bookings, customers and room occupancy
- Add, edit and delete hotels and rooms, with photo upload
- Set a room to Available, Maintenance or Hidden
- View, search, filter, update and delete any booking
- Mark payments as paid, pending or refunded
- List all customers

**Rules enforced by the server**
- No double-booking of a room
- No past dates
- Guest count cannot exceed the room capacity
- Prices and taxes (12%) are calculated on the server
- Customers can only see their own bookings
- A booking must be cancelled before a customer can delete it
- Hotels and rooms with active bookings cannot be deleted

---

## Project structure

```
hotelpro-project/
├── api/            # API routes (auth, hotels, rooms, bookings, admin)
├── lib/            # Shared server code (database, booking rules, seed data)
├── src/            # React frontend (App, Admin, BookingFlow, MyBookings ...)
├── public/         # Static files
├── docs/           # README screenshots
├── server.js       # Express server (API + built frontend)
├── dev.js          # Starts frontend and backend together for development
├── vercel.json     # Vercel configuration
└── vite.config.js  # Vite configuration
```

---

## Getting started

### Requirements
- Node.js 18 or newer
- A MongoDB Atlas connection string (optional for local use)

### Install and run

```bash
git clone https://github.com/Nidhithakre-08/Hotel_Proo.git
cd Hotel_Proo
npm install
cp .env.example .env     # on Windows: copy .env.example .env
npm run dev
```

Then open:
- Customer site: http://localhost:5173
- Admin panel: click **Sign in → Admin**, or go to http://localhost:5173/admin
- API: http://localhost:3000

If `MONGODB_URI` is empty or cannot be reached, data is saved in `data/hotelpro-local-db.json`. Demo hotels and rooms are added automatically the first time the server starts.

### Environment variables

Create a `.env` file in the project root (see `.env.example`):

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string. Leave empty to use the local JSON file. |
| `JWT_SECRET` | A long random secret, at least 32 characters. |
| `ADMIN_EMAIL` | Email used to sign in to the admin panel. |
| `ADMIN_PASSWORD` | Password used to sign in to the admin panel. |

> Never commit your `.env` file. It is already listed in `.gitignore`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the frontend and backend together |
| `npm run build` | Builds the frontend into `dist/` |
| `npm start` | Starts the Express server (serves the API and `dist/` in production) |

---

## Two separate logins

| | Customer | Admin |
|---|---|---|
| Where | Sign in → **Customer** tab, or Create account | Sign in → **Admin** tab, or `/admin` |
| Credentials | Registered by the customer | `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env` |

Every admin API call is checked on the server. A customer token cannot create, edit or delete hotels, rooms or other people's bookings.

---

## Deployment

Create a MongoDB Atlas cluster first and allow network access from `0.0.0.0/0`. Without MongoDB, data on serverless hosts is temporary.

### Option 1: Vercel
1. Push the project to GitHub.
2. Import the repository in Vercel (the Vite preset is detected automatically).
3. Add `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` under Environment Variables.
4. Click **Deploy**. Redeploy after changing any variable.

> The free (Hobby) plan allows up to 12 serverless functions per deployment. If the build reports too many functions, use Option 2 instead.

### Option 2: Render (runs `server.js`)
| Setting | Value |
|---|---|
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Environment | the four variables above, plus `NODE_ENV=production` |

---

## Payments

Payments are **simulated**. No real money moves. Only the card brand and the last 4 digits are stored, and the full card number and CVV never leave the browser form. To accept real payments, connect a gateway such as Razorpay or Stripe in `lib/booking.js` and `src/BookingFlow.jsx`.

---

## API reference

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create a customer account |
| POST | `/api/auth/login` | Customer login |
| POST | `/api/auth/admin-login` | Admin login |
| GET | `/api/auth/me` | Current user |
| GET, POST | `/api/hotels` | List or add hotels |
| GET, PUT, DELETE | `/api/hotels/:id` | Read, update or delete a hotel |
| GET, POST | `/api/rooms` | List or add rooms |
| GET, PUT, DELETE | `/api/rooms/:id` | Read, update or delete a room |
| GET, POST | `/api/bookings` | List or create bookings |
| GET, PUT, DELETE | `/api/bookings/:id` | Read, update or delete a booking |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/users` | List customers |
| DELETE | `/api/admin/users/:id` | Delete a customer |

---

## Author

Made by [Nidhi Thakre](https://github.com/Nidhithakre-08).
