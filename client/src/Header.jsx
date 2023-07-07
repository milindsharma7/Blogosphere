import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

function Header() {
  return (
      <header>
        <a href="/" className="logo">Blogosphere</a>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
  )
}

export default Header