# 🍱 My Meal Mate – Smart Meal Finder & Planner App

**My Meal Mate** is a dynamic and intelligent React-based web app that helps users **discover meals**, **view full recipes with YouTube tutorials**, **organize favorites**, and **plan their daily meals**. Built using **React + Vite**, **Tailwind CSS**, and **Local Storage**, the app offers a smooth, engaging, and responsive user experience.

---

## 🌟 Features

### 🏠 Home Page
- **Hero Section**: Includes a full-width background image with a motivational phrase and a sleek search bar.
- **Search Meals**: Search any meal by name using TheMealDB API and see instant results below the hero section.
- **Explore by Categories**: Category cards show meals based on selected categories (e.g., Dessert, Seafood, Vegan).
- **Recipe Preview**: Upon clicking a meal card, a beautiful pop-up appears with:
  - Meal image
  - Ingredients with measurements
  - Step-by-step instructions
  - **YouTube video tutorial**
  - Option to add to **Favorites**

### ❤️ Favourites Page
- Displays meals added to favorites by the user.
- Includes search functionality within saved meals.
- "Explore More" button to return to Home Page.
- Data is saved using **Local Storage** to persist between sessions.

### 📅 Meal Planner
- Users can **select a date** to start meal planning.
- Options to plan for:
  - 🍳 Breakfast
  - 🥗 Lunch
  - 🍟 Snacks
  - 🍛 Dinner
  - ✨ Others (Custom slot name like “Night Snack”)
- Each slot allows users to search and select meals from the database.
- Tick mark appears after completing a meal slot.
- Finalized meal plan is displayed in a **wide card format** sorted by date and meal type.
- Clicking on a meal inside the plan shows the same pop-up recipe view with YouTube video.

### 🔐 Login System
- Login button in Navbar.
- Modal form appears (with background blur) asking for **Email** and **Password**.
- Option to create a new account if the user doesn’t have one.
- After login, **Favorites** and **Planner Data** are synced using **Local Storage**.

---

## 🛠️ Tech Stack

- ⚛️ React (Functional Components + Hooks)
- ⚡ Vite (React boilerplate)
- 💨 Tailwind CSS (for modern UI)
- 🔄 React Router DOM (page routing)
- 💾 Local Storage (to persist data)
- 🍽️ TheMealDB API (for meal data + YouTube links)

---

## 📁 Folder Structure

My Meal Mate/
│
├── public/                      # Static assets
│   └── index.html
│
├── src/                         # Main source code
│
│   ├── api/                     # API-related utilities (optional)
│
│   ├── assets/                  # Static files (images, SVGs, etc.)
│   │   └── react.svg
│
│   ├── components/              # Reusable components grouped by feature
│   │
│   │   ├── auth/
│   │   │   └── AuthModal.jsx    # Login / Signup Modal
│   │
│   │   ├── categories/
│   │   │   └── CategoryCard.jsx # Meal category cards
│   │
│   │   ├── layout/
│   │   │   └── Navbar.jsx       # Top navigation bar
│   │
│   │   ├── meals/
│   │   │   ├── MealCard.jsx     # Displays individual meal cards
│   │   │   └── MealDetail.jsx   # Detailed meal view with recipe & video
│   │
│   │   ├── planner/
│   │   │   ├── PlanCard.jsx     # Meal cards in planner
│   │   │   └── PlannerForm.jsx  # Form to schedule meals
│   │
│   │   ├── search/
│   │   │   └── SearchBar.jsx    # Search input for meals
│   │
│   │   └── ui/
│   │       ├── EmptyState.jsx   # UI when no results or data
│   │       └── LoadingSpinner.jsx # Reusable loading component
│
│   ├── contexts/                # React Contexts for global state
│   │   ├── AuthContext.jsx
│   │   ├── FavoritesContext.jsx
│   │   └── PlannerContext.jsx
│
│   ├── pages/                   # Route-based page components
│   │   ├── Home.jsx
│   │   ├── Favorites.jsx
│   │   ├── Planner.jsx
│   │   └── NotFound.jsx
│
│   ├── App.jsx                  # Main App component with routes
│   ├── App.css                  # Global styles
│   ├── index.js                 # Entry point
│   └── ...
│
└── README.md                    # You’re here! 🎉


---

## 🔗 Live Site

👉 **[Visit My Meal Mate](https://mymealmateee.netlify.app/)**  


---

## 🧪 How to Use

1. Search or select a category on the Home page.
2. Click on any meal card to view its full recipe & video.
3. Add meals you like to favorites.
4. Go to Planner, pick a date, and start selecting meals for your day.
5. Login to save your favorites and plans permanently!

---

## 🖼️ Screenshots



## ⚙️ Local Setup

```bash
git clone https://github.com/your-username/my-meal-mate.git
cd my-meal-mate
npm install
npm run dev

## build for production

npm run build

## **✨ Author**

Made with 💖 by Antara Utane
