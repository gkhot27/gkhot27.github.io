import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Portfolio from './Portfolio.jsx'

// NEW: router
import { createHashRouter, RouterProvider } from 'react-router-dom'
import GlitchMessagePage from './GlitchMessagePage.jsx'
import Journal from './Journal.jsx'

const router = createHashRouter([
  { path: '/', element: <Portfolio /> },
  { path: '/glitch', element: <GlitchMessagePage /> },
  { path: '/journal', element: <Journal /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
