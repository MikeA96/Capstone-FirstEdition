import { Link } from 'react-router-dom'
import { Component } from 'react'
import axios from 'axios'
import './nav.scss'

class Nav extends Component{
    state={
        username:false
    }

    componentDidMount(){
    const authorize=sessionStorage.getItem('authToken')
    if(authorize!==null){
    axios.get('/profile',{
        headers:{authorization:`Bearer ${authorize}`}
    }).then(response =>this.setState({
        username:response.data.username,
    }))
}
    }


    render(){
        if(this.state.username){
    return(
        <div className="nav">
            <Link to='/home' className="nav__title">FirstEdition</Link>
            <div className="nav__parent-container">
            <form onSubmit={(event)=>{
                event.preventDefault();
                this.props.history.history.push(`/search/${event.target.search.value}`)
            }} className="nav__form">
                <input type = 'text' name='search' className="nav__form-text"/>
                <button type='submit' className="nav__form-button">Search</button>
            </form>
            <div className="nav__link-container">
            <Link to='/home' className="nav__link">Home</Link>
            <Link to='/profile' className="nav__link">Profile</Link>
            <Link to='/add' className="nav__link">Add a story</Link>
            <p onClick={()=>{
                sessionStorage.removeItem('authToken');
                this.props.history.history.push('/')
            }} className="nav__link">Log Out</p>
            </div>
            </div>
        </div>
    )
    }
    else{
        return(
            <div className="nav">
                <Link to='/home' className="nav__title">FirstEdition</Link>
                <div className="nav__parent-container">
                <form className="nav__form">
                <input type = 'text' name='search' className="nav__form-text"/>
                <button type='submit' className="nav__form-button">Search</button>
            </form>
            <div className="nav__link-container">
                <Link to='/home' className="nav__link">Home</Link>
                <Link to='/signup' className="nav__link">Sign Up</Link>
                <Link to='/login' className="nav__link">Log In</Link>
                </div>
            </div>
            </div>
        )
    }
}
}
export default Nav