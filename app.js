// 1) Import mudels -
const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authorRoutes = require('./routes/authorRoutes');
const meRoutes = require('./routes/meRoutes');
const statsRoutes = require('./routes/statsRoutes');
// 2) initalize the app
const app = express();
// 3) Use medleware
app.use(express.json());

// 4) Secury
// 5) Routes
app.use('/api/v1/me', meRoutes);
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/author', authorRoutes);
app.use('/api/v1/stats', statsRoutes);

// 6) Path error handle
// 7) export the mudel
module.exports = app;
