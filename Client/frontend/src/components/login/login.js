import axios from 'axios'
import { Component } from 'react'
import './login.scss'

class Login extends Component{
 state={
     loginError:false
 }

    handleLogin=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:8080/login',{
            username:event.target.username.value,
            password:event.target.password.value
        }).then(response=>{
            if(response.data.failure){
                this.setState({
                    loginError:true
                })
            }
            else{
                sessionStorage.setItem('authToken',response.data.token)
                this.props.history.push('/home')
            }
        })
    }

    render(){ 
        if(!this.state.loginError){
        return(
        <div className="login">
            <h1 className="login__title">Log In</h1>
            <form onSubmit={this.handleLogin} className="login__form">
                <input type="text" name="username" placeholder="username" className="login__text"/>
                <input type="password" name="password" placeholder="password" className="login__text"/>
                <button type="submit" className="login__button">Submit</button>
                </form>
        </div>
        )
        }
        else{
            return(
                <div className="login">
                    <h1 className="login__title">Log In</h1>
                <form onSubmit={this.handleLogin} className="login__form">
                    <input type="text" name="username" placeholder="username" className="login__text"/>
                    <label className="login__error">Make sure username and password are correct</label>
                    <input type="password" name="password" placeholder="password" className="login__text"/>
                    <button type="submit" className="login__button">Submit</button>
                    </form>
            </div>
            )
        }
}
}
export default Login