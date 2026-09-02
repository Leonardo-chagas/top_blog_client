import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import axios from 'axios'
import Home from './components/Home.tsx'
import Login from './components/Login.tsx'
import Signup from './components/Signup.tsx'
import PostSelection from './components/PostSelection.tsx'
import Post from './components/Post.tsx'

function App() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const addToken = (token:string) => {
    setAccessToken(token);
    console.log(token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const addUsername = (username:string) => {
    setUsername(username);
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home username={username}/>
    },
    {
      path: 'login',
      element: <Login addToken={addToken} addUsername={addUsername}/>
    },
    {
      path: 'signup',
      element: <Signup addToken={addToken} addUsername={addUsername}/>
    },
    {
      path: 'category/:id',
      element: <PostSelection username={username}/>
    },
    {
      path: 'post/:id',
      element: <Post username={username} addToken={() => addToken} accessToken={accessToken}/>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
