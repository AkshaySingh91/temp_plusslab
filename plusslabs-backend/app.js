import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.routes.js'
import session from 'express-session'
import membershipRoutes from './routes/membership.routes.js'
import MongoStore from 'connect-mongo' // Add this import

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)  // Add admin routes
app.use('/api/membership', membershipRoutes)

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Add ping route for health check
app.get('/ping', (req, res) => {
  res.status(200).send('OK');
});

export { app }