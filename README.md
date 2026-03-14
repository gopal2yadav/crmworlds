# 🌐 CRMworlds

> Customer email collection server built with Node.js, Express, and MongoDB.

## 🚀 Features

- Collect and store customer emails in MongoDB
- Duplicate email detection (no double signups)
- Clean, responsive landing page
- Admin endpoint to view all collected emails
- Ready to deploy on Railway, Render, or Heroku

## 📁 Project Structure

```
crmworlds/
├── server.js          # Main Express server
├── package.json       # Dependencies
├── .env.example       # Environment variable template
└── public/
    └── index.html     # Landing page with email form
```

## ⚙️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/gopal2yadav/crmworlds.git
cd crmworlds
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` with your MongoDB connection string and admin key.

### 4. Run the server
```bash
npm start
```

Visit `http://localhost:3000`

## 🌍 Deploy to Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) and connect your GitHub repo
3. Add environment variables: `MONGO_URI` and `ADMIN_KEY`
4. Railway will auto-deploy and give you a live URL

## 📧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/subscribe` | Submit an email address |
| GET | `/emails?adminKey=YOUR_KEY` | View all collected emails |

## 🛡️ Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Server port (default: 3000) |
| `ADMIN_KEY` | Secret key to access email list |

## 📄 License

MIT
