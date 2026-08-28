import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/Home.tsx'
import Login from './components/Login.tsx'
import Signup from './components/Signup.tsx'
import PostSelection from './components/PostSelection.tsx'
import Post from './components/Post.tsx'

function App() {
  

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
      path: 'category/:id',
      element: <PostSelection/>
    },
    {
      path: 'post/:id',
      element: <Post/>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
