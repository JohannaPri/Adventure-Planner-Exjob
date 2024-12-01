# Adventure Planner 🌎✨

## Your All-in-One Travel Planner

**Welcome to Adventure Planner,** a tool designed to showcase a seamless and inspiring travel planning experience. This platform helps you explore destinations, organize trip details, and gather inspiration for your journeys—all in one place.

While Adventure Planner focuses on planning and discovering ideas, please note that bookings are not available through this app. Instead, it serves as your ultimate tool for collecting travel inspiration and staying organized.

Wondering how it works? Clear instructions and helpful tips are available on the site to guide you through features like searching for flights, hotels, activities, and weather updates. Start planning your next adventure and make your travel dreams feel closer than ever!

---

## 🌐 Live Demo

**Experience Adventure Planner in action! Click the link below to explore the app and start planning your next adventure.**

LÄNKEN HÄR!!!

---

## 📝 About the Project

**Adventure Planner** is a web-based tool designed to help users plan their perfect trips. Developed as a degree project at Medieinstitutet, this app lets users organize all aspects of their travel—from researching destinations to tracking flights, hotels, and activities—all in one place.

The main goal of the project is to provide an intuitive and fun platform for travelers to plan their trips effortlessly. With features like weather updates, personalized to-do lists, and easy access to flight and hotel information, it’s built to make travel planning easier and more enjoyable.

### Key Features:

- Search for flights, hotels, and activities.

- View weather updates for your destinations.

- Create personalized itineraries and to-do lists.

- Store and organize trip details in one place.

This project uses **React, Node.js, Tailwind CSS, and TypeScript (TS)** to provide a seamless and responsive user experience.

**Adventure Planner aims to be the ultimate travel companion—helping you plan your dream adventures and stay organized every step of the way!**

---

## 🛠️ Tech Stack

Adventure Planner is built using the following technologies:

-  **Frontend:** React, TypeScript, Tailwind CSS, Vite

- **Database:** Firebase (for authentication and data storage)

- **APIs:** Amadeus API (for flights), RAPAPI (for hotels and activities), OpenWeather API (for weather updates)

**These technologies provide a modern, efficient, and user-friendly experience while building and using Adventure Planner.**

---

## ⚙️ Installation & Setup

Follow these simple steps to get **Adventure Planner** up and running locally:

### 1. Clone the repository:

    - git clone https://github.com/JohannaPri/Adventure-Planner-Exjob.git

### 2. Install dependencies: 

    - cd adventure-planner
    - npm install

### 3. Set up your `.env` file:

The app requires certain API tokens to make API calls. You need to create a .env file with the necessary tokens. Here’s how you do it:

    - Create a .env file in the root of the project directory.

    - Copy the contents from the .env_example file into your .env file.

    - Replace the placeholder values with your own API tokens.

**Example `.env`** file:

`VITE_AMADEUS_CLIENT_ID=Your_Amadeus_Client_ID`

`VITE_AMADEUS_CLIENT_SECRET=Your_Amadeus_Client_Secret`

`VITE_RAPAPI_CLIENT_TOKEN=Your_RAPAPI_Client_Token`

`VITE_OPEN_WEATHER_KEY=Your_Open_Weather_API_Key`

To get these tokens, you will need to register for the respective APIs and generate your own keys.

### 4. Firebase Configuration: 

The app uses Firebase for user authentication and storing data. You’ll need to set up a Firebase project and add the configuration to the project.

    -  Go to Firebase Console, create a new project (or use an existing one).

    - Get your Firebase configuration from Project Settings > General > Your App’s Firebase configuration.

    - Add the configuration details to the appropriate file.

### 5. Run the app: 

After setting up your .env file and Firebase configuration, start the app locally:

    - npm run dev

### 6. Open the app: 

Visit http://localhost:`<your_port_number>` in your browser to start using Adventure Planner.

---








