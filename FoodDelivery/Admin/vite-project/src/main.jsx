import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // Now we have the support of react router in our project 
  <BrowserRouter>
  <App />
    </BrowserRouter>
  
)
