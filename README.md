# Forest Shop

Forest Shop is a frontend application for managing products in the shop (Lišákův obchod). It is built using React, TypeScript, Material-UI, Formik, and Axios. The application allows you to list, add, edit, and delete products. It communicates with a backend defined by an OpenAPI specification.

## Features

- **Product Listing:** View a list of products with details including name, price, stock quantity, and active status.
- **Search & Filtering:** Search for products by name, price, or stock quantity, and filter by active/inactive status.
- **Product Management:** Easily add, edit, and delete products.
- **Responsive Design:** Built with Material-UI for a modern and responsive user interface.
- **API Integration:** Communicates with a backend defined by an OpenAPI specification.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm

## Getting Started

### Running the Backend via Docker

To run Forest Shop, either use the following `docker run` command:

```bash
docker run -p 3000:3000 sajdlavantro/exampleshop


Or create a docker-compose.yml file in your project directory with the following content:

services:
  exampleshop:
    image: sajdlavantro/exampleshop:latest
    ports:
      - "3000:3000"


Then, in that same directory, run:

docker compose up


Once the backend is running, the OpenAPI specification will be available at http://localhost:3000/api.

Running the Application Locally
Clone the repository:

git clone https://github.com/Paveldevelopment/forest-shop
cd exampleshop


npm install


Start the application:

npm start


The application will run in development mode for example at http://localhost:3001
```
