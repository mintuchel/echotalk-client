import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { ChatForm } from '@/components/chat/ChatForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />
  },
  {
    path: '/signup',
    element: <SignUpForm />
  },
  {
    path: '/chat',
    element: <ChatForm />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}