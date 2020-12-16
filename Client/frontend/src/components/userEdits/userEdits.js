import { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav from '../nav/nav'
import './userEdits.scss'

class UserEdits extends Component {
    state={
        username:false,
        userStories:false,
        edits:false
    }
    componentDidMount(){
        const authorize=sessionStorage.getItem('authToken')
        if(authorize!==null){
        axios.get('http://localhost:8080/profile',{
            headers:{authorization:`Bearer ${authorize}`}
        }).then(response =>{
            this.setState({
            username:response.data.username
        })
        axios.get(`http://localhost:8080/story/${response.data.username}`).then((response)=>{
            this.setState({
                userStories:response.data
            })
        })
        axios.get(`http://localhost:8080/edit/${response.data.username}`).then(
            (response)=>{
                this.setState({
                    edits:response.data
                })
            }
        )
    })
            
        
            
}    
        
    }
    getTitleEdits=(currStory)=>{
        const edits=[]
        const main=this.state.edits
        for(let i=0;i<main.length;i++){
            if(main[i].title===currStory.title){
                edits.push(main[i])
            }
        }
        return edits
    }
   

    render(){
        if(this.state.username && this.state.userStories&&this.state.edits){
        return(
            <div>
                <Nav history={this.props}/>
                <div className="userEdits">
                <h1 className="userEdits__title">{this.state.username}'s Edit page</h1>
                {this.state.userStories.map(element=>{
                    if(this.getTitleEdits(element).length){
                    return(
                        <Link to={'userEditTitle/'+element.title} className="userEdits__success" key={element.id}>
                            <h3 className="userEdits__success--title">{element.title}</h3>
                            <p className="userEdits__success--content">{this.getTitleEdits(element).length} Edit(s)</p>
                        </Link>
                    
                    
                )}
                else{return(
                        <div className="userEdits__failure" key={element.id}>
                            No Edits for {element.title}
                        </div>
                )}
                })}
                </div>
            </div>
        )
        }
        else if(!this.state.username){
            return(
                <div>
                    <Nav history={this.props}/>
                    <div className="loginError">
                    Please login or signup to see this page
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>...Loading</div>
            )
        }
    }
}
export default UserEdits