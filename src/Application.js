import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Router, Link } from "@reach/router"
import Account from './Account'
import Home from './Home'

export default function Application({session}) {

  return (
      <div>
        <nav className="mainNav">
            <Link to="/">Home</Link>
            <Link to="account">Account</Link>
        </nav>
        
        <Router>
            <Home path="/" />
            <Account path="account" session={session} />

        </Router>

      </div>
    
  )
}
