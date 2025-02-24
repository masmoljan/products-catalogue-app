# Product Catalogue App

The Product Catalogue app lists products and displays relevant information.</br>
It includes features such as searching, sorting, filtering, and pagination.

## Quick overview
Using this app, the user should be able to:
  * See displayed products with corresponding image and price
  * See detailed information about every product (name, description, brand, price, category...)
  * Search products by name
  * Sort products by title and price (ascending/descending order)
  * Filter products by category and price

## Live demo
[Vercel](https://products-catalogue-app.vercel.app/)

## Prerequisites

### Package requirements
- Node v22.9.0
- React v18.3.1
- Vite v5.4.11 

### Client configuration

### **Make sure to provide `.env` file with correct values before running the application!**</br>

The project includes `.example.env` file that can be used as a reference if needed.

| Environment Variable        | Description                           | Example                                   |
|-----------------------------|---------------------------------------|-------------------------------------------|
| `VITE_SERVER_API_URL`       | The URL for the server's API.         | `VITE_SERVER_API_URL=https://dummyjson.com/`|

## Installation

To install and use this app locally, use the following command:

```
npm install
```

## Usage (Local)

To run the app locally, use the following command:

```
npm run dev
```

To run the app and expose it to the local network use the following command:
```
npm run dev:host
```

## Usage (Docker)

To run the app with Docker, use the following command:
```
docker-compose up
```

# Additional documentation
## Integration

This app can be integrated with API that provides the following routes:
- `/products`
- `/products/search`
- `/products/category-list`

These routes can also be modified to fit your specifications.

Information about Product model can be found in `src/types/` folder.

## Project structure

This is the project structure with highlighted main parts:

```
└── products-catalogue-app
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── src
    │   ├── App.css
    │   ├── App.tsx
    │   ├── api          <--- RTK instance with baseURL, API handlers and routes
    │   ├── components   <--- App components
    │   ├── hooks        <--- Custom hooks
    │   ├── index.css
    │   ├── lib
    │   ├── main.tsx
    │   ├── types        <--- TypeScript types
    │   ├── utils        <--- Common utilites
    │   ├── validation   <--- Validation schemas
    │   └── vite-env.d.ts
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── vitest.config.ts
```

## Built with
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

