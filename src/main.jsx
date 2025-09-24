import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Portfolio from './Portfolio.jsx'

// NEW: router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlitchMessagePage from './GlitchMessagePage.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Portfolio /> },
  { path: '/glitch', element: <GlitchMessagePage /> }, // <— the new page
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
