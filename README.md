# 🍔 Cravio

**Cravio** is a modern full-stack food ordering application built with the **MERN stack**. It combines food delivery with a reels-style video experience, allowing users to discover restaurants and dishes by scrolling through short videos posted by restaurants.

Instead of browsing static menus, users can watch food videos, explore cravings visually, and order directly from the app.

## 🚀 Project Idea

Cravio is designed around one simple concept:

> Scroll. Watch. Crave. Order.

Restaurants can post short food videos similar to reels, and users can explore dishes in an engaging way before placing an order.

## ✨ Features

* User authentication
* Restaurant/food partner authentication
* Reels-style food video feed
* Browse food through restaurant-posted videos
* View food details
* Add items to cart
* Place food orders
* Restaurant-based food discovery
* Responsive frontend
* REST API based backend
* MongoDB database integration
* Clean MERN stack folder structure

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* CSS
* Axios / Fetch API
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js
* cookie-parser
* dotenv

### Database

* MongoDB / MongoDB Atlas

## 📁 Folder Structure

```bash
Cravio/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── videos/
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/SachinGarg-hub/Cravio.git
cd Cravio
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Authentication Flow

Cravio uses authentication for users and food partners.

* Users can register and login
* Food partners/restaurants can register and login
* Passwords are hashed using bcrypt
* JWT tokens are used for secure authentication
* Protected routes can be accessed only after login

## 🎥 Video-Based Food Discovery

The main highlight of Cravio is its reels-style food feed.

Restaurants can upload/post food videos, and users can scroll through them to discover dishes visually. This makes food ordering more interactive and engaging compared to traditional menu-based apps.

## 🛒 Ordering Flow

1. User opens Cravio
2. User scrolls through food videos
3. User discovers a dish/restaurant
4. User views food details
5. User adds item to cart
6. User places order
7. Restaurant receives the order

## 📌 API Routes

Example backend routes:

```bash
POST /api/auth/user/register
POST /api/auth/user/login

POST /api/auth/food-partner/register
POST /api/auth/food-partner/login
```

More routes can be added for:

```bash
/api/food
/api/videos
/api/cart
/api/orders
/api/restaurants
```

## 🌟 Why Cravio?

Most food delivery platforms show only images and menus. Cravio improves this experience by using short-form videos, helping users make faster and more exciting food choices.

It is useful for:

* Users who want visual food discovery
* Restaurants that want to promote dishes through videos
* Food businesses that want better engagement
* A modern social-commerce style food ordering experience

## 🚧 Future Improvements

* Video upload using Cloudinary/Multer
* Like and save food videos
* Restaurant dashboard
* Order tracking
* Payment gateway integration
* Search and filter dishes
* Location-based restaurant suggestions
* Ratings and reviews
* Admin dashboard
* Push notifications

## 👨‍💻 Author

**Sachin Garg**

GitHub: [SachinGarg-hub](https://github.com/SachinGarg-hub)

## 📄 License

This project is for learning and development purposes.
