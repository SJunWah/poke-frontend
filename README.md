# Poke Frontend

A Next.js application for the Pokémon frontend project.

## Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (version 14.x or higher)
* **npm** package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd poke-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Copy the `.env.example` file and create your own `.env` file:

```bash
cp .env.example .env
```

Then update the environment variables with your own values:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

* `npm run dev` - Starts the development server
* `npm run build` - Creates an optimized production build
* `npm start` - Runs the production server
* `npm run lint` - Runs ESLint to check code quality

## Deployment

Deploy your Next.js app using [Vercel](https://vercel.com/):

```bash
npm run build
```
