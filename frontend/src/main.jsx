import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import TicketPage from './pages/ticket';
import BookingPage from './pages/booking';
import FlightPage from './pages/flight';
import HistoryPage from './pages/history';
import ProtectedRoute from './auth/protectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/history",
    element: <ProtectedRoute allowedRoles={["Passenger", "Employee"]} />,
    children: [
      { path: "", element: <HistoryPage /> }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRoles={["Employee"]} />,
    children: [
      { path: "ticket", element: <TicketPage /> },
      { path: "booking", element: <BookingPage /> },
      { path: "flight", element: <FlightPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
