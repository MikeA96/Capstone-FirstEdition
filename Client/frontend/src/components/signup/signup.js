import axios from 'axios'
import {Component} from 'react'
import './signup.scss'
class Signup extends Component {

    state={
        signupError:false
    }

     handleSignup=(event)=>{
        event.preventDefault()
        if(event.target.username.value.length &&
            event.target.name.value.length&&
            event.target.password.value.length
            ){
        axios.post('http://localhost:8080/signup',{
            username:event.target.username.value,
            name:event.target.name.value,
            password:event.target.password.value
        }).then((response)=>{
            if(response.data.failure){
                this.setState({
                    signupError:true
                })
            }
            else{

                setTimeout( ()=>{axios.post('http://localhost:8080/login',{
                    username:event.target.username.value,
                    password:event.target.password.value 
                }
        ).then((response)=>{sessionStorage.setItem('authToken',response.data.token)}).then(setTimeout(()=>{this.props.history.push('/profile')},1000))
            },2000)} }
        )
                
        }
                
    else{
        this.setState({
            signupError:true
        })
    }
    }
    render(){
        if(!this.state.signupError){
    return(
        <div className="signup">
            <h1 className="signup__title">Sign Up</h1>
            <form onSubmit={this.handleSignup} className="signup__form"> 
                <input type="text" name="username" placeholder="Username" className="signup__text"/>
                <input type="text" name="name" placeholder="Name" className="signup__text"/>
                <input type="password" name="password" placeholder="Password" className="signup__text"/>
                <button type="submit" className="signup__button">Submit</button>
            </form>
        </div>
    )
}
else{
    return(
        <div className="signup">
            <h1 className="signup__title">Sign Up</h1>
            <form onSubmit={this.handleSignup} className="signup__form"> 
                <input type="text" name="username" placeholder="Username" className="signup__text"/>
                <label className="signup__error">Username taken, try something else</label>
                <input type="text" name="name" placeholder="Name" className="signup__text"/>
                <input type="password" name="password" placeholder="Password" className="signup__text"/>
                <button type="submit" className="signup__button">Submit</button>
            </form>
        </div>
    )
}
    }
    
}
export default Signup