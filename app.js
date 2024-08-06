// 1) Import mudels -
const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const saleRoutes = require('./routes/saleRoutes');

// 2) initalize the app
const app = express();
// 3) Use medleware
app.use(express.json());
// 4) Secury
// 5) Routes
app.use((req, res, next) => {
  console.log('from app');
  next();
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/sale', saleRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/book', bookRoutes);

// 6) Path error handle
// 7) export the mudel
module.exports = app;
