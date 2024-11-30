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

**Make sure to provide `.env` file with correct values before running the application!**</br>

The project includes `.example.env` file that can be used as a reference if needed.

| Environment Variable        | Description                           | Example                                   |
|-----------------------------|---------------------------------------|-------------------------------------------|
| `VITE_SERVER_API_URL`       | The URL for the server's API.         | `VITE_SERVER_API_URL=https://example.com/`|

## Installation

To install and use this app locally, use the following command:

```
npm install
```

## Usage

To run the app locally, use the following command:

```
npm run dev
```

To run the app and expose it to the local network use the following command:
```
npm run dev:host
```

To run tests provided with app, use the following command
```
npm run test
```

# Additional documentation
## Security measurements

Since the application has a search functionality that requires an input field where the user can search for products by name, it can also serve as a vulnerable point where malicious users could enter code or scripts and retrieve and modify information such as user session and user activity.</br>

For that purpose, the app uses the `Zod` validation package to filter out potentially vulnerable attempts.</br>

Apart from user input, the product query input is also validated on other components. Such components include filtering and sorting products to ensure defined constraints. Also, throttling is applied to some elements to minimize potential application abuse.</br>

For login purposes (currently not implemented), storing user data, such as tokens or any other sensitive information in local storage should be completely avoided since the data is easily accessible by a simple JavaScript code which also be found in the undoubted npm package. 
A good alternative would be to use Redux to save sensitive information in memory and retrieve it (as needed) with an API call. For token retrieval, the HTTP-only cookie can be generated on the backend and used for any user request that requires user authentication.</br>

While there is no "silver" solution, HTTP-only cookies are not immune to vulnerabilities; however, some options are better than others.</br>

Before the app deployment, it should also be ensured that the needed certificates are obtained so the app can be served over an HTTPS connection to encrypt requests and responses. This is important because communication between the client and server on a regular connection is unsafe, and data is transferred unencrypted in plain text.

## Deployment

For presentation purposes, this app can be deployed in its current state using various React hosting providers. In future development, the plan is to set up a CI/CD pipeline, such as GitHub Actions. Provided tests will be used to ensure application stability, versioning will be implemented so that the app version updates with each deployment, and new tests will be created while maintaining existing ones as the application continues to develop.

## Continued development
The following outlines the proposed steps for continued development:

- Implement a Signup and Login feature to enable user purchases
- Develop an administrative dashboard to enable product organization
- Establish a logging system and enable analytics to monitor application usage
- Integrate the application with a payment processing system
- Configure GitHub Actions to support Continuous Integration and Continuous Deployment (CI/CD)
- Build a backend server to ensure the application can operate independently

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
    ├── __tests__        <--- Test files and mocks
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── src
    │   ├── App.css
    │   ├── App.tsx
    │   ├── api          <--- Axios instance with baseURL, API handlers and routes
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

