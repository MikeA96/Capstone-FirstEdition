import axios from 'axios'
import { Component } from 'react'
import Nav from '../nav/nav'
import './edit.scss'

class Edit extends Component{
    state={
        title:false,
        username:false,
        text:false,
        editor:false,
        loginInfo:false
    }
    componentDidMount(){
        let link=this.props.match.params.storyId
        const authorize=sessionStorage.getItem('authToken')
        if(authorize!==null){
        axios.get('http://localhost:8080/profile',{
            headers:{authorization:`Bearer ${authorize}`}
        }).then((response) =>{this.setState({
            loginInfo:response.data.username,
        })})}
    axios.get('http://localhost:8080/'+link).then((response)=>{
        this.setState({
           title:response.data[0].title,
           username:response.data[0].username,
           text:response.data[0].text
        })
    })
   
    }
    onChange=(event)=>{
        this.setState({
            text:event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
axios.post('http://localhost:8080/edit',{
    username:this.state.username,
    title:this.state.title,
    text:event.target.text.value,
    editor:this.state.loginInfo
    }
    ).then(this.props.history.push('/home'))
    }
   
    render(){
        if(this.state.loginInfo){
        return(
            <div>
                <Nav history={this.props}/>
                <form onSubmit={this.handleSubmit} className="edit">
                    <label className="edit__title">{this.state.title}</label>
                    <label className="edit__sub-title">{this.state.username}</label>
                    <textarea type="textarea" name="text" onChange={this.onChange}value={this.state.text} className="edit__text"/>
                    <button type="submit" className="edit__button">Submit</button>
                </form>
            </div>
        )
    }
    else{
        return(
            <div>
                <Nav/>
                <div className="loginError">
                Please login or signup to see this page
                </div>
            </div>
        )
    }
}
}
export default Edit