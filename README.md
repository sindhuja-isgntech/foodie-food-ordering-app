# Foodie - Modern Food Delivery Application

Foodie is a food delivery web application built with React, TypeScript, Vite, Tailwind CSS, TanStack Query, and React Hook Form.

## 🚀 Features
- **Dynamic Restaurant Menus**: Unique menu data per restaurant ID with fallback handling.
- **Category & Search Integration**: Pre-filtered view via home categories or live search bar.
- **State & Data Caching**: Async state management using TanStack Query and Axios service layer.
- **Validated Checkout**: Client-side form validation (Zod + React Hook Form) supporting Card, UPI, and COD payments.
- **Order Management System**: Real-time tracking with status transitions (Placed, Preparing, Out for Delivery, Delivered, Cancelled).

## 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons
- **State & Data**: TanStack Query (v5), React Context, Axios
- **Form Validation**: React Hook Form

## 🏁 Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
