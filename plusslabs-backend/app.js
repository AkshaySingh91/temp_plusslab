import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.routes.js'
import session from 'express-session'
import membershipRoutes from './routes/membership.routes.js'

const app = express()
app.use(cookieParser())
app.use(express.json())
const corsOptions = {
  origin: ["https://plusslabs.com", "https://www.plusslabs.com","http://localhost:5173"], // Allow frontend origin
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allow cookies & auth headers
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)  // Add admin routes
app.use('/api/membership', membershipRoutes)

export { app }