# Clipster – Clipboard Sharing Web App

Clipster is a simple, fast, and interactive web app that allows you to save text online and retrieve it using a unique 5-digit code. It’s perfect for quickly sharing small pieces of text securely.

---

## Live Website

You can access the live website here:
**[Clipster Website](no link made yet)**

---

## Features

* Register and log in to your Clipster account
* Save text snippets using the **Share** button
* Get a unique 5-digit code for each clip
* Retrieve your saved text using the **Retrieve** button
* OTP-style code input for smooth and easy access
* Modern UI with animations and a polished About page
* Clips expire automatically after a set time for security
* Secure user authentication with password hashing

---

## How to Use

1. **Register / Login**

   * If you are a new user, enter your name, email, and password to register.
   * If you already have an account, log in with your email and password.

2. **Share a Clip**

   * Go to the **Share** page.
   * Enter the text you want to save.
   * Click **Send** to save it. You will receive a 5-digit code to access it later.
   * The expiry time of the code will be displayed.

3. **Retrieve a Clip**

   * Go to the **Retrieve** page.
   * Enter your 5-digit code or paste it.
   * Your saved text will appear instantly.

4. **About Page**

   * Explore the About page to see smooth transitions and animations explaining the app.

---

## Tech Stack

**Frontend:**

* React.js
* React Router DOM
* Framer Motion
* Axios
* React Hot Toast
* Tailwind CSS / Bootstrap (for styling)

**Backend:**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Password Hashing (bcrypt)

---

## Installation / Running Locally

1. **Clone the repository**

```bash
git clone https://github.com/your-username/clipster.git
```

2. **Backend Setup**

```bash
cd server
npm install
```

* Create a `.env` file and add:

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

* Start the backend server:

```bash
npm start
```

3. **Frontend Setup**

```bash
cd ../client
npm install
npm run dev
```

4. **Open the app**

* The frontend should open at `http://localhost:3000`
* The backend API runs at `http://localhost:8000` (or the port you defined)

---

## Security

* User passwords are securely hashed using bcrypt.
* JWT tokens are used for authentication.
* Clips expire automatically after an hour to protect privacy.

---

## Database

Clipster uses **MongoDB** with two main collections:

* **Users** – stores registered user emails and hashed passwords
* **Clipboard** – stores the saved text, code, owner, and expiry timestamp

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is not licensed.

---

## Demo

Check out the demo video here:
[Clipster Walkthrough Video](https://youtu.be/ydJJ7RnD-b8)
