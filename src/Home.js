import './index.css'
import * as React from 'react'
import { supabase } from './supabaseClient'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: []
        };
    }

    async getUsers(){

        try {
            this.setState({
                loading: true
            })
        
            let { data, error } = await supabase
                .from('profiles')
                .select('username, id')
        
            if (error) {
                throw error
            }

            this.setState({
                users: data
            })
        } catch (error) {
            alert(error.message)
        } finally {
            this.setState({
                loading: false
            })
        }

    }

    componentDidMount(){
        this.getUsers()
    }
    render() {
      return (
        <div>
            <h1>Главная</h1>
            {this.state.users.map(user => <div key={user.id}>{user.username}</div>)}
        </div>
      );
    }
  }