# Forest Shop

Forest Shop is a clean, modern frontend application for managing products in Lišákův obchod ("Fox’s Shop"). Built with React, TypeScript, Material‑UI, Formik, and Axios, it provides an intuitive interface for listing, creating, updating, and deleting products via an OpenAPI‑defined backend.

---

## 📋 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Prerequisites](#-prerequisites)
4. [Getting Started](#-getting-started)
   - [Run with Docker](#run-with-docker)
   - [Run Locally](#run-locally)
5. [API Specification](#-api-specification)
6. [License](#-license)

---

## 🚀 Features

- **Product Listing:** View all products with details (name, price, stock, status).
- **Search & Filter:** Filter by name, price range, stock quantity, and active/inactive status.
- **CRUD Operations:** Add, edit, or delete products with instant validation.
- **Responsive Design:** Fully responsive UI powered by Material‑UI.
- **OpenAPI Integration:** Automatic type safety and API documentation.

---

## 🛠 Tech Stack

| Layer             | Technology                                        |
| ----------------- | ------------------------------------------------- |
| Frontend          | React, TypeScript, Material‑UI, Formik, Axios     |
| Backend (Example) | Docker image `sajdlavantro/exampleshop` (OpenAPI) |

---

## ✅ Prerequisites

- Node.js v14+
- npm v6+ or Yarn v1+
- Docker (optional, for running backend)

---

## ⚡ Getting Started

### Run with Docker

1️⃣ Run backend with Docker:

```bash
docker run -d --name exampleshop -p 3000:3000 sajdlavantro/exampleshop
```

> The OpenAPI spec will be available at [http://localhost:3000/api](http://localhost:3000/api)

### Run Locally

1️⃣ Clone this repository:

```bash
git clone https://github.com/Paveldevelopment/forest-shop.git
cd forest-shop
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Start the development server:

```bash
npm start
```

> The app will open at [http://localhost:3001](http://localhost:3001) by default.

---

## 📄 API Specification

Browse the backend API documentation here: [http://localhost:3000/api](http://localhost:3000/api)

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
