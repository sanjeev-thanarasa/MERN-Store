# 🌟 MERN Store

A **MERN (MongoDB, Express, React, Node.js)** application for managing products. This app allows users to **create**, **update**, **delete**, and **view products** in a modern and responsive interface.

---

## 🚀 Features

- 🛒 **Create Products**: Add new products with a name, price, and image URL.
- 📋 **View Products**: Display all products in a visually appealing grid layout.
- ✏️ **Update Products**: Edit product details directly from the UI.
- ❌ **Delete Products**: Remove products with a single click.
- 🌐 **Responsive Design**: Fully responsive and works seamlessly on all devices.

---

## 🛠️ Tech Stack

### **Frontend**

- ⚛️ **React**: For building the user interface.
- 🎨 **Chakra UI**: For modern and responsive styling.
- 🗂️ **Zustand**: For state management.

### **Backend**

- 🖥️ **Node.js**: For server-side logic.
- 🚀 **Express.js**: For building RESTful APIs.
- 🗄️ **MongoDB**: For database management.

---

## 📂 Folder Structure

```
mern-store/
├── backend/
│   ├── config/
│   │   └── db.js          # MongoDB connection setup
│   ├── controllers/
│   │   └── product.controller.js # Backend logic for products
│   ├── models/
│   │   └── product.model.js # Mongoose schema for products
│   ├── routes/
│   │   └── product.route.js # API routes for products
│   └── server.js           # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   └── ProductCard.jsx  # Product card component
│   │   ├── pages/
│   │   │   ├── CreatePage.jsx   # Page to create a product
│   │   │   └── HomePage.jsx     # Homepage to display products
│   │   ├── store/
│   │   │   └── product.js       # Zustand store for product state
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # React entry point
│   └── vite.config.js           # Vite configuration
└── README.md                    # Project documentation
```

---

## ⚙️ Installation and Setup

### **Prerequisites**

- 🖥️ **Node.js** installed on your machine.
- 🌐 A **MongoDB database** (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database).

### **Steps to Run the Project**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/mern-store.git
   cd mern-store
   ```

2. **Install Dependencies and Build**:

   ```bash
   npm install
   npm run build
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory and add your MongoDB connection string:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
     PORT=5002
     ```

4. **Start the Application**:

   ```bash
   npm start
   ```

5. **Open the Application**:
   - Navigate to `http://localhost:5002` in your browser.

---

## 🌐 API Endpoints

### **Base URL**: `http://localhost:5002/api/products`

| Method | Endpoint | Description            |
| ------ | -------- | ---------------------- |
| GET    | `/`      | Fetch all products     |
| POST   | `/`      | Create a new product   |
| PUT    | `/:id`   | Update a product by ID |
| DELETE | `/:id`   | Delete a product by ID |

---

## 🛡️ Security: MongoDB Connection

To keep your MongoDB credentials secure:

1. **Use Environment Variables**:
   - Store your MongoDB URI in a `.env` file.
   - Example:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
     ```
2. **Add `.env` to `.gitignore**:
   - Ensure the `.env` file is not pushed to GitHub by adding it to `.gitignore`:
     ```
     # Ignore environment variables
     .env
     ```

---

## 🎉 Features in Action

### **Homepage**

- Displays all products in a grid layout.
- Includes buttons to edit or delete products.

### **Create Product**

- Add a new product with a name, price, and image URL.

### **Update Product**

- Edit product details in a modal.

### **Delete Product**

- Remove a product with a confirmation toast.

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 💡 Next Steps

1. Add more features like user authentication or product categories.
2. Deploy the app to platforms like **Vercel** (frontend) and **Render** (backend).
3. Share your project with the world!
