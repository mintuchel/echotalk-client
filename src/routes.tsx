import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />
  },
  {
    path: '/signup',
    element: <SignUpForm />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}