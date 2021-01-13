import axios from 'axios'
import { Component } from 'react'
import Nav from '../nav/nav'
import './add.scss'

class Add extends Component {
    state={
        username:undefined
    }

    componentDidMount(){
        const authorize=sessionStorage.getItem('authToken')
        if(authorize!==null){
        axios.get('/api/profile',{
            headers:{authorization:`Bearer ${authorize}`}
        }).then(response =>this.setState({
            username:response.data.username,
        }))}
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('/api/story',{
            username:this.state.username,
            title:event.target.title.value,
            text:event.target.text.value,
            genre:event.target.genre.value,
        }).then(setTimeout(()=>{this.props.history.push('/home')},500))
    }
    render(){
        if(this.state.username){
        return(
            <div>
                <Nav history={this.props}/>
            <form onSubmit={this.handleSubmit} className="add">
                <label className="add__title">Title</label><br/>
                <input type="text" name="title" placeholder="Title" className="add__input"/><br/>
                <label className="add__title">Genre</label><br/>
                <input type="text" name="genre" placeholder="Genre" className="add__input"/><br/>
                <label className="add__title">Enter your Story Here!</label><br/>
                <textarea type="textbox" name="text" placeholder="Start Typing!" className="add__text"/><br/>
                <button type="submit" className="add__button">Submit</button>
            </form>
            </div>
            )
    }
    else{
        return(
            <div>
                <Nav history={this.props}/>
                <div className="loginError">
                Please login or signup to view this page
                </div>
            </div>
        )
    }
}
    
}
export default Add