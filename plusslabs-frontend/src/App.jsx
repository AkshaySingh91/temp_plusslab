import React from "react";
import Landing from "./components/Landing";
import FeaturedHealthCheckup from "./components/FeaturedHealthCheckup";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/Footer.jsx";
import ConcernHealthCheckups from "./components/ConcernHealthCheckups";
import FunctionSection from "./components/FunctionSection";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTests from "./components/AllTests";
import PastConsultancies from "./components/PastConsultancies";
import AllPatients from "./components/AllPatients";
import DashboardContent from "./components/dashboard/DashboardContent";
import ViewPatients from "./components/ViewPatients";
import ViewTests from "./components/ViewTests";
import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import MembershipPage from './components/MembershipPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Landing />
            <FunctionSection />
            <FeaturedHealthCheckup />
            <ConcernHealthCheckups />
            <WhyChooseUs />
            <Footer />
          </>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/all-tests" element={<AllTests />} />
        <Route path="/dashboard/all-patients" element={<AllPatients />} />
        <Route path="/dashboard/view-patients" element={<ViewPatients />} />
        <Route path="/dashboard/view-tests" element={
          <ProtectedRoute adminOnly={true}>
            <ViewTests />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <DashboardContent />
          </ProtectedRoute>
        } />

        {/* <Route path="/view-tests" element={
          <ProtectedRoute>
            <ViewTests />
          </ProtectedRoute>
        } /> */}

        <Route path="/past-consultancies" element={
          <ProtectedRoute>
            <PastConsultancies />
          </ProtectedRoute>
        } />

        <Route path="/past-consultancies" element={<PastConsultancies />} />

        <Route path="/super-admin" element={
          <ProtectedRoute adminOnly={false} superAdminOnly={true}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/membership" element={
          <ProtectedRoute>
            <MembershipPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


/*

 server {
    listen 443 ssl;
    server_name plusslabs.duckdns.org;
    ssl_certificate /etc/letsencrypt/live/plusslabs.duckdns.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/plusslabs.duckdns.org/privkey.pem; # managed by Certbot
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    location /api/ {
        # Intercept OPTIONS requests for CORS preflight
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain; charset=UTF-8';
            return 204;
        }

        # Proxy all other requests to your backend
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}
*/