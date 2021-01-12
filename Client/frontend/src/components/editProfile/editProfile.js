import axios from 'axios'
import { Component } from 'react'
import Nav from '../nav/nav'
import './editProfile.scss'

class EditProfile extends Component{
    state={
        username:undefined,
        name:undefined
    }

    componentDidMount(){
    const authorize=sessionStorage.getItem('authToken')
    if(authorize!==null){
        axios.get('/profile',{
            headers:{authorization:`Bearer ${authorize}`}
        }).then(response =>this.setState({
            username:response.data.username,
            name:response.data.findName
        }))}
    }
handleSubmit=(event)=>{
    event.preventDefault();
    axios.put('/user',{
       username:this.state.username ,
       name:this.state.name,
       info:event.target.info.value,
       content:event.target.content.value
    }).then(this.props.history.push(`/profile`))
}
    render(){
        if(this.state.username && this.state.name){
        return(
            <div>
                <Nav history={this.props}/>
                <div className="editProfile">
                <p className="editProfile__title">{this.state.username}</p>
                <p className="editProfile__subtitle">{this.state.name}</p>
                <form onSubmit={this.handleSubmit} className="editProfile__form">
                    <label className="editProfile__label">Tell us a little something about yourself</label><br/>
                    <textarea type="textbox" name="info" className="editProfile__input"/><br/>
                    <label className="editProfile__label">What's your favorite creative content, anything from authors to movie titles</label><br/>
                    <textarea type="textbox" name="content" className="editProfile__input"/>
                    <button type="submit" className="editProfile__button">Submit</button>
                </form>
            </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <Nav/>
                <div className="loginError">
                Please login or signup to view this page
                </div>
            </div>
        )
    }
}
}
export default EditProfile