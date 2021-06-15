import './index.css'
import * as React from 'react'
// import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Router, Link } from "@reach/router"
import Account from './Account'
import Home from './Home'
import Avatar from './Avatar'
import { render } from '@testing-library/react'


export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            username: null,
            website: null,
            avatar_url: null
        };
    }

    componentDidMount(){
        this.getProfile()
    }

    async getProfile() {
        try {
            this.setState({
                loading: true
            })

            const user = supabase.auth.user()

            let { data, error } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.id)
            .single()

            if (error) {
            throw error
            }

            console.log(this.state.username)

            this.setState({
                loading: data.username,
                website: data.website,
                username: data.username,
                avatar_url: data.avatar_url
            })
        } catch (error) {
            alert(error.message)
        } finally {
            this.setState({
                loading: false
            })
        }
      }

    render() {
        return (
            <div>
            <nav className="mainNav">
                <Link to="/">Главная</Link>
                <Link to="account">
                    <Avatar
                        url={this.state.avatar_url}
                        size={32}
                    />
                    {this.state.username}
                </Link>
            </nav>
            
            <Router>
                <Home path="/" />
                <Account
                    path="account"
                    user={this.state}
                    session={this.props.session}
                    setAvatar={(url) => {
                        this.setState({
                            avatar_url: url
                        })
                    }}
                />
    
            </Router>
    
            </div>
    
        )
    }
}
