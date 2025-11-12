# Weather App

A modern, secure weather application built with React, Node.js, and Auth0 authentication. Get real-time weather information for multiple cities with a beautiful, responsive interface.

![Weather App](https://img.shields.io/badge/React-18.3-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Auth0](https://img.shields.io/badge/Auth0-Secured-orange)

## Features

-  **Secure Authentication** - Auth0 integration with MFA support
-  **Multi-City Weather** - Track weather in multiple cities simultaneously
-  **Detailed Weather Data** - Temperature, humidity, pressure, wind speed, visibility
-  **Beautiful UI** - Modern gradient design with Tailwind CSS
-  **Responsive Design** - Works seamlessly on desktop and mobile
-  **Sunrise/Sunset Times** - View sunrise and sunset information
-  **Real-time Updates** - Fresh weather data from OpenWeather API

## Tech Stack

### Frontend
- **React 18.3** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Auth0 React SDK** - Authentication
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Axios** - HTTP client for API requests
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Auth0 Account** - [Sign up free](https://auth0.com/)
- **OpenWeather API Key** - [Get free API key](https://openweathermap.org/api)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd WeatherApp
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=3001
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

**To get your OpenWeather API Key:**
1. Go to [OpenWeather API](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API keys" section
4. Copy your API key

#### Add Cities (Optional)
Edit `backend/cities.json` to add or remove cities:

```json
{
  "cities": [
    "Colombo",
    "London",
    "New York",
    "Tokyo",
    "Sydney"
  ]
}
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Configure Auth0

1. **Create Auth0 Application:**
   - Go to [Auth0 Dashboard](https://manage.auth0.com/)
   - Create a new "Single Page Application"
   - Note your `Domain` and `Client ID`

2. **Configure Auth0 Settings:**
   - **Allowed Callback URLs:** `http://localhost:5173`
   - **Allowed Logout URLs:** `http://localhost:5173`
   - **Allowed Web Origins:** `http://localhost:5173`

3. **Enable Multi-Factor Authentication (Optional):**
   - Go to Security → Multi-factor Auth
   - Enable your preferred MFA method

#### Configure Environment Variables
Create a `.env` file in the `frontend` directory:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain.us.auth0.com
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
VITE_API_URL=http://localhost:3001/api
```

Replace:
- `your-auth0-domain.us.auth0.com` with your Auth0 domain
- `your_auth0_client_id` with your Auth0 client ID

## 🎮 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:3001`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Access the Application

Open your browser and navigate to: **http://localhost:5173**

## Usage

1. **Login**
   - Click "Sign In with Auth0"
   - Enter your credentials or sign up
   - Complete MFA if enabled

2. **View Weather**
   - See weather cards for all configured cities
   - Click any card for detailed weather information

3. **Navigate**
   - Use the back button to return to the main view
   - Click logout to sign out securely

## Project Structure

```
WeatherApp/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── cities.json         # List of cities to track
│   ├── package.json        # Backend dependencies
│   └── .env               # Backend environment variables
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # Application entry point
│   │   ├── index.css       # Global styles + Tailwind
│   │   ├── auth/
│   │   │   └── Auth0ProviderWithHistory.jsx
│   │   └── components/
│   │       └── LoginPage.jsx
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── .env              # Frontend environment variables
│
└── README.md             # This file
```

## 🔧 Configuration

### Backend Configuration

**Port:** Default is `3001`, can be changed in `backend/.env`

**Cities:** Edit `backend/cities.json` to modify the list of tracked cities

**API Rate Limiting:** OpenWeather free tier allows 60 calls/minute

### Frontend Configuration

**Development Port:** Default is `5173` (Vite default)

**Auth0 Configuration:** All Auth0 settings are in `frontend/.env`

**API URL:** Points to backend API, default is `http://localhost:3001/api`

## Available Scripts

### Backend
```bash
npm start        # Start the backend server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Troubleshooting

### Authentication Issues
- **Problem:** "Auth0 configuration error"
  - **Solution:** Check that all Auth0 environment variables are set correctly in `frontend/.env`
  - Verify your Auth0 application settings match the callback URLs

### API Connection Issues
- **Problem:** "Failed to fetch weather data"
  - **Solution:** 
    - Ensure backend server is running on port 3001
    - Check OpenWeather API key is valid
    - Verify `VITE_API_URL` in frontend `.env` is correct

### Port Already in Use
- **Problem:** "Port 3001 is already in use"
  - **Solution:** 
    - Kill the process using the port: `lsof -ti:3001 | xargs kill -9`
    - Or change the port in `backend/.env`

### CORS Issues
- **Problem:** CORS policy blocking requests
  - **Solution:** Ensure frontend URL is allowed in backend CORS configuration

## Security Notes

- Never commit `.env` files to version control
- Keep your Auth0 credentials secure
- Rotate API keys periodically
- Use HTTPS in production
- Enable MFA for additional security

## Deployment

### Backend Deployment (Example with Heroku)
```bash
heroku create your-app-name
git push heroku main
heroku config:set OPENWEATHER_API_KEY=your_key
```

### Frontend Deployment (Example with Vercel)
```bash
vercel --prod
```

Remember to update Auth0 callback URLs with your production domains!

## Environment Variables Reference

### Backend (.env)
```env
PORT=3001
OPENWEATHER_API_KEY=<your_openweather_api_key>
```

### Frontend (.env)
```env
VITE_AUTH0_DOMAIN=<your_auth0_domain>
VITE_AUTH0_CLIENT_ID=<your_auth0_client_id>
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
VITE_API_URL=http://localhost:3001/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Fidenz Technologies**

## Acknowledgments

- [OpenWeather API](https://openweathermap.org/) for weather data
- [Auth0](https://auth0.com/) for authentication services
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities