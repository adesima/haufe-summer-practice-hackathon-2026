// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { seedDatabase } from './utils/firestore-db.js' // <--- ADĂUGAT DE TINE

// Rulăm popularea bazei de date (va scrie doar dacă e goală)
seedDatabase(); // <--- ADĂUGAT DE TINE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)