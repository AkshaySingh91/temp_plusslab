import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.routes.js'
import session from 'express-session'
import membershipRoutes from './routes/membership.routes.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
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

export { app }