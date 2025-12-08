import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from "./routes/Home.jsx";
import Details from "./routes/Details.jsx";
import Purchases from "./routes/Purchases.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/purchases/:id" element={<Purchases />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
