# Tourist Platform  

A MERN stack tourism platform that connects tourists with local guides, homestays, and unique experiences in Uttarakhand. The platform includes multiple dashboards with customized access for different roles.  

---

## Live Demo  
 [https://tourism-platform-kappa.vercel.app] 

---

## Tech Stack  
- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Deployment:** Vercel (frontend), Render (backend)  

---

## Features  
- User authentication and authorization  
- Browse and book guides  
- Search and book homestays  
- Explore local experiences  
- Booking management system  
- Admin controls for managing users and listings  

---

## Installation  

### 1. Clone the repository  
```bash
git clone https://github.com/gauravnainwal518/tourist-platform.git

2. Backend Setup
cd backend
npm install

Create a .env file inside the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
JWT_EXPIRATION=1d
ADMIN_EMAIL=your_preferred_email_here
ADMIN_PASSWORD=your_chosen_admin_password

Run backend:
npm run dev

3. Frontend Setup
cd frontend
npm install

Create a .env file inside the frontend folder:
# Frontend Environment Variables
VITE_API_BASE=https://your-backend-url.onrender.com/api

# API Endpoints
VITE_API_AUTH=/auth
VITE_API_GUIDES=/guides
VITE_API_HOMESTAYS=/homestays
VITE_API_BOOKINGS=/bookings
VITE_API_ADMIN=/admin

# External API Keys
VITE_GEOAPIFY_API_KEY=your_api_key_here

Run frontend:
npm run dev

4. Open in browser
Local: http://localhost:5173
Live: tourism-platform-kappa.vercel.app



