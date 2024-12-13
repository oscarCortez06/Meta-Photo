# MetaPhoto Test

## **Project Overview**

The MetaPhoto Test project is an application that demonstrates functionality for fetching, filtering, enriching, and paginating photo data from an API. The backend is implemented in **Node.js** with **TypeScript**, and the frontend uses **React** with TypeScript. The application supports querying photos based on filters such as photo title, album title, and user email, with enriched responses and efficient pagination.

## **Features**

### Backend
- Fetch and enrich photo data with album and user details.
- Support filtering by:
  - Photo title (`title`)
  - Album title (`album.title`)
  - User email (`album.user.email`)
- Pagination support with `limit` and `offset` parameters.
- Type-safe implementation using TypeScript.
- Organized code structure with controllers, services, routes, and models.

### Frontend
- Dynamic UI for filtering and displaying photos.
- Filters for photo title, album title, and user email.
- Pagination controls.
- State management using React hooks.
- Data fetching with Axios.

## **Technologies Used**

### Backend
- Node.js
- Express.js
- TypeScript
- Axios

### Frontend
- React
- TypeScript
- Axios
- CSS for styling

## **Setup Instructions**

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Backend
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
4. The backend will be available at `http://localhost:3000/`.

### Frontend
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the frontend development server:
   ```bash
   yarn start
   ```
4. The frontend will be available at `http://localhost:3001/`.