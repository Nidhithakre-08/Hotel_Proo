import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authLogin from './api/auth/login.js';
import authRegister from './api/auth/register.js';
import authAdmin from './api/auth/admin-login.js';
import authMe from './api/auth/me.js';
import hotels from './api/hotels/index.js';
import hotelById from './api/hotels/[id].js';
import rooms from './api/rooms/index.js';
import roomById from './api/rooms/[id].js';
import bookings from './api/bookings/index.js';
import bookingById from './api/bookings/[id].js';
import adminStats from './api/admin/stats.js';
import adminUsers from './api/admin/users.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors());
app.use(express.json({ limit: '6mb' }));
const withId = (h) => (req, res) => { req.query = { ...req.query, id: req.params.id }; return h(req, res); };
app.all('/api/auth/login', authLogin);
app.all('/api/auth/register', authRegister);
app.all('/api/auth/admin-login', authAdmin);
app.all('/api/auth/me', authMe);
app.all('/api/hotels', hotels);
app.all('/api/hotels/:id', withId(hotelById));
app.all('/api/rooms', rooms);
app.all('/api/rooms/:id', withId(roomById));
app.all('/api/bookings', bookings);
app.all('/api/bookings/:id', withId(bookingById));
app.all('/api/admin/stats', adminStats);
app.all('/api/admin/users', adminUsers);
app.all('/api/admin/users/:id', withId(adminUsers));
app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, req, res, next) => res.status(err.status || 500).json({ message: err.type === 'entity.too.large' ? 'Image is too large. Use a smaller picture.' : 'Server error' }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`HotelPro server running at http://localhost:${port}`));
