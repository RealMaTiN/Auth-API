// import modules
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./configs/mongoDB.config');
const { errorHandler } = require('./middlewares/errors');
const { setHeader } = require('./middlewares/headers');
const { notFound } = require('./middlewares/notFound');

// express app
const app = express();

// connect to database
connectDB();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setHeader);

// routes
app.use("/", require('./routes/mainRoutes'));
app.use("/auth", require('./routes/authRoutes'));
app.use(notFound);
app.use(errorHandler);

// start app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SERVER] Server is running on port: ${PORT}`);
});