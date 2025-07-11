# 🛒FOREVER CLOTHING A MERN Stack E-Commerce Website

A full-featured E-Commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). It includes user & admin authentication, product management, shopping cart, secure checkout, payment integration, and an admin dashboard for complete store control.

---

## 🚀 Features

- 🌐 Frontend: Vite + React with pages for:
  - Home, Collections, Product Details
  - Cart, Orders, Login, About, Contact
- 🛠️ Backend: Node.js + Express for REST APIs, auth, and DB handling
- 🔐 Authentication: Secure login for users and admins using JWT
- 📦 Product Management: Admin can upload, update, or delete products
- 🛒 Cart & Orders: Add to cart, place orders, and track via dashboard
- 💳 Payment Integration: Secure payments via Stripe and Razorpay
- 🖼️ Image Uploads: Cloudinary + Multer for efficient product image handling
- 🚢 Deployment: Hosted on Vercel for easy access

---

## 🧱 Project Structure

```
📁 mern-ecommerce/
├── frontend/     → Vite + React App
├── backend/      → Express.js + MongoDB API
├── admin/        → Admin Panel for managing the store
```

---

## 🛠️ Tech Stack

| Tech                   | Description                 |
| ---------------------- | --------------------------- |
| ⚛️ React               | Frontend library            |
| 🚀 Vite                | Fast build tool for React   |
| 🛠️ Node.js + Express   | Backend & API development   |
| 🌿 MongoDB             | NoSQL database              |
| 🔐 JWT                 | Authentication (User/Admin) |
| 🖼️ Cloudinary + Multer | Image uploads               |
| 💳 Stripe + Razorpay   | Payment gateways            |
| 🧩 Redux               | State management            |
| 🧭 React Router        | Routing in frontend         |
| 🌐 Vercel              | Deployment platform         |

---

## 💻 Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/bharat-bhangale/Forever-Clothing-App.git
   cd mern-ecommerce
   ```

2. Install dependencies

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   cd ../admin && npm install
   ```

3. Run development servers

   ```bash
   cd frontend && npm run dev
   cd ../backend && npm run dev
   cd ../admin && npm start
   ```

4. Access the site  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Deployment

To deploy on Vercel:

1. Push the code to GitHub.
2. Connect the frontend and backend to Vercel separately.
3. Set necessary environment variables in the Vercel dashboard.
4. Deploy and enjoy!

---

## 👨‍💻 Contributor

- Bharat Bhangale — [GitHub Profile](https://github.com/bharat-bhangale)

---

## 📄 License

This project is licensed under the MIT License — free to use and modify.
