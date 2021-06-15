import './index.css'
import * as React from 'react' 
import { supabase } from './supabaseClient'

export default class Home extends React.Component {
    render() {
      return <h1>Главная</h1>;
    }
  }