import { Link } from 'react-router-dom'
import { Component }from 'react'
import './mainpage.scss'

class MainPage extends Component{
    render(){
    return(
    <div className="mainPage">
        <h1 className="mainPage__title">FirstEdition</h1>
        <div className="mainPage__link-container">
        <Link to="/signup" className="mainPage__link">Sign Up</Link>
        <Link to="/login" className="mainPage__link">Log In</Link>
        </div>
        <Link to='/home' className="mainPage__link">Continue as guest</Link>
    </div>
    )
}
}
export default MainPage