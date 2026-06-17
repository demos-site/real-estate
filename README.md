# Rokadia Reality - Premium Luxury Real Estate Portal

A premium, state-of-the-art Real Estate platform built with **React**, **TypeScript**, and **Tailwind CSS v4**.

## ✨ Features

- **Dynamic Homepage**: High-end hero section with custom typography, immersive property listings showcase, and key value propositions.
- **Listing Browser**: Search filter sidebar to filter properties by price range, bedroom counts, built-up area, and category (villas, apartments, commercial, plots).
- **Interactive Mortgage Calculator**: Real-time monthly payment calculation using interest rate, down payment, and loan tenure sliders.
- **Detailed Property Views**:
  - Fullscreen lightbox media gallery with keyboard support.
  - Interactive Google Maps location embeds.
  - Active/inactive amenities highlights.
  - Quick lead capture form connected to the broker.
- **Broker Profile Page**: Dedicated biography, experience timeline, and contact information for Rajesh Rokadia.
- **Hidden Admin Dashboard Portal**:
  - Secure login at `/dashboard/login` (Redirection guard active for `/dashboard`).
  - Analytics visual charts showing monthly metrics, sales pipelines, and active visitor counts.
  - Full CRUD manager for property listings.
  - Leads CRM with transaction status progression and logging notes.
- **Harmonious Dark/Light Themes**: Dynamic Tailwind CSS v4 variables with obsidian dark mode and elegant clean light mode.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18+) and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/officienonline-cyber/realestate.git
   cd realestate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### Building for Production

To compile the application for production deployment:
```bash
npm run build
```

## 🔒 Admin Credentials

- **Direct URL**: `http://localhost:5173/dashboard` (redirects to login) or `http://localhost:5173/dashboard/login`
- **Email**: `rajesh@rokadiareality.com`
- **Password**: `admin123`
