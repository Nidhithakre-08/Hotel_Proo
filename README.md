# HotelPro — Hotel Booking & Management

Full-stack hotel booking site: React + Vite frontend, Node/Express API (also deployable as Vercel serverless functions), MongoDB or a local JSON file for storage.

## Run locally
```bash
npm install
npm run dev
```
- Customer site: http://localhost:5173
- **Admin panel:** click **Sign in** on the customer site, choose the **Admin** tab, and sign in (you are taken to http://localhost:5173/admin). You can also open `/admin` directly.
- API: http://localhost:3000

Data is stored in MongoDB when `MONGODB_URI` in `.env` is valid and reachable; otherwise automatically in `data/hotelpro-local-db.json`. Demo hotels and rooms are added the first time the server starts.

## Two separate logins
| | Customer | Admin |
|---|---|---|
| Where | Sign in → **Customer** tab (or Create account) | Sign in → **Admin** tab on the same popup, or `/admin` directly |
| Credentials | Registered by the customer | `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` (fixed, cannot be registered) |
| Token | `hotelpro_token` | `hotelpro_admin_token` |

Every admin API call is checked on the server; a customer token cannot create, edit or delete hotels, rooms or other people's bookings.

## Features
**Customer:** search hotels by city/name, dates and guests; see only rooms that are free for the chosen dates; 3-step booking (stay → guest details → payment); payment by card, UPI, net banking or pay-at-hotel; My bookings with details, cancel (refund marked) and delete; saved rooms; profile; settings.

**Admin:** dashboard (revenue, bookings, customers, occupancy); add/edit/delete hotels and rooms with photo upload; set a room to Available / Maintenance / Hidden; view, search, filter, update status of, or delete any booking; mark payments paid/pending/refunded; list customers.

**Rules enforced by the server:** no double-booking of a room, no past dates, guest count ≤ room capacity, prices and taxes (12%) calculated server-side, customers can only see their own bookings, a booking must be cancelled before it can be deleted by the customer, hotels/rooms with active bookings cannot be deleted.

## Payments
Payments are **simulated** (no real money moves). Only the card brand and last 4 digits are stored — the full card number and CVV never leave the browser form. To accept real payments, integrate a gateway such as Razorpay or Stripe in `lib/booking.js` / `src/BookingFlow.jsx`.

## Deploy to Vercel
Set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` in Project → Settings → Environment Variables. Without MongoDB, Vercel storage is temporary (in-memory) — always use MongoDB in production.

## API
`POST /api/auth/register|login|admin-login`, `GET /api/auth/me`, `GET|POST /api/hotels`, `GET|PUT|DELETE /api/hotels/:id`, `GET|POST /api/rooms`, `GET|PUT|DELETE /api/rooms/:id`, `GET|POST /api/bookings`, `GET|PUT|DELETE /api/bookings/:id`, `GET /api/admin/stats`, `GET /api/admin/users`, `DELETE /api/admin/users/:id`.
