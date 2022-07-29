import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Searchbar from './components/Searchbar/Searchbar'
import './app.scss'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Info from './pages/Info/Info'

export default function App() {
  return (
    <Router>
      <div className="inputs">
        <Searchbar />
      </div>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/pokemon/:id" element={<Info />} />
        </Routes>
      </div>
    </Router>
  )
}


