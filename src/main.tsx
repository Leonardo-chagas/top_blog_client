import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Home from './components/Home.tsx'
import Login from './components/Login.tsx'
import Signup from './components/Signup.tsx'
import PostSelection from './components/PostSelection.tsx'
import Post from './components/Post.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: 'signup',
    element: <Signup/>
  },
  {
    path: 'selection',
    element: <PostSelection/>
  },
  {
    path: 'post',
    element: <Post/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
