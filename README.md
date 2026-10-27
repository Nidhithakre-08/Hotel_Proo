# HotelPro — Hotel Booking & Management

A full-stack hotel booking website with a separate admin panel. Customers can search hotels, pick rooms for their dates, and book in three simple steps. Admins can manage hotels, rooms, bookings and customers from a dashboard.

**Stack:** React + Vite (frontend) · Node.js + Express (API) · MongoDB (database, with an automatic local JSON fallback) · JWT authentication

---

## How it works

### Customer side
1. **Discover:** the home page has a search bar for destination (city or hotel name), check-in and check-out dates, and number of guests.
2. **Browse hotels:** each hotel card shows the star rating, location, description, amenities and the starting price per night.
3. **Pick a room:** the hotel page lists only the rooms that are free for the chosen dates.
4. **Book in 3 steps:** Stay → Guest details → Payment. The price shows the room cost for the chosen nights plus 12% taxes and fees.
5. **Pay:** by card, UPI, net banking or pay at hotel. Payments are a demo and no real money is charged.
6. **Manage bookings:** the My bookings page shows every booking with its details, and lets the customer cancel or delete it.

### Admin side
1. **Sign in:** the sign-in popup has a **Customer** tab and an **Admin** tab. Admins can also open `/admin` directly.
2. **Dashboard:** revenue, bookings, hotels, customers, recent bookings, quick actions and room status at a glance.
3. **Hotels:** add, edit or delete hotels with details, amenities, status and a photo.
4. **Rooms:** search and filter rooms by hotel, edit prices and details, and set each room to Available, Maintenance or Hidden.
5. **Bookings:** open any booking to see the stay, guest and payment details, then update the booking or payment status.
6. **Customers:** view the list of registered customers.

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

## Interface

### Customer site

![Home page](<img width="1359" height="599" alt="01-home" src="https://github.com/user-attachments/assets/f85db9be-1692-42c6-b54b-c7a0dc189af0" />
)

![Hotel listing](<img width="1362" height="602" alt="08-hotel-listing" src="https://github.com/user-attachments/assets/31b7211a-9a16-4413-9d77-3b17d2c1a552" />
)

![Hotel details](<img width="1359" height="595" alt="09-hotel-details" src="https://github.com/user-attachments/assets/260fcf1f-0cd5-41fd-8b73-7df9a5e80542" />
)

![Create account](<img width="1336" height="596" alt="03-create-account" src="https://github.com/user-attachments/assets/f482affa-0845-4381-9767-6689da80a595" />
)

### Booking and payment

![Payment step](<img width="1314" height="590" alt="10-payment" src="https://github.com/user-attachments/assets/89427abf-84a9-47b9-9e25-778b89ad70ca" />
)

### Admin panel

![Admin sign in](<img width="1346" height="599" alt="02-admin-signin" src="https://github.com/user-attachments/assets/27d9f2e1-b017-416c-8dc1-c0c6903c3cad" />
)

![Admin dashboard](<img width="1358" height="599" alt="04-admin-dashboard" src="https://github.com/user-attachments/assets/723578d2-5b0f-4fb1-8390-72f5dbe60f41" />
)

![Add hotel](<img width="1326" height="597" alt="05-admin-add-hotel" src="https://github.com/user-attachments/assets/ee6d232e-06d2-419e-946b-4accfade015b" />
)

![Manage rooms](<img width="1344" height="602" alt="06-admin-rooms" src="https://github.com/user-attachments/assets/7bc9a75f-bed7-43d5-addb-73d0764705e3" />
)

![Booking details](<img width="1350" height="603" alt="07-admin-booking-details" src="https://github.com/user-attachments/assets/06cd7c64-7006-4cd4-b65b-e08a357e49cf" />
)
