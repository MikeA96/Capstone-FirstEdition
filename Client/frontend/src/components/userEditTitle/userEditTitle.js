import { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav from '../nav/nav'
import './userEditTitle.scss'

class UserEditTitle extends Component{
    state={
        username:false,
        storyId:false,
       edits:false
    }
     componentDidMount(){
         const link=this.props.match.params.story
        const authorize=sessionStorage.getItem('authToken')
        axios.get('http://localhost:8080/profile',{
            headers:{authorization:`Bearer ${authorize}`}
        }).then(response =>{
            this.setState({
            username:response.data.username
        })
            axios.get(`http://localhost:8080/edit/${response.data.username}/${link}`).then((response)=>{
                this.setState({
                    edits:response.data
                })
            })
            axios.get(`http://localhost:8080/findstory/${response.data.username}/${link}`).then(
                (response)=>{
                    this.setState({
                        storyId:response.data[0].id
                    })
                }
            )
    })
     }
     render(){
         const link=this.props.match.params.story
         if(this.state.username&&this.state.edits && this.state.storyId){
         return(
             <div>
                 <Nav/>
                 <div className="userEditTitle">
                 <h1 className="userEditTitle__title">{this.state.username}<br/> {link}</h1>
                 {this.state.edits.map(element=>{
                     return(
                    <Link to={'/edited/'+this.state.storyId+'/'+element.id} key={element.id} className="userEditTitle__link">
                        <h3 className="userEditTitle__link--title">{element.editor}</h3>
                         <p className="userEditTitle__link--content">{new Date(element.created).toDateString()}</p>
                    </Link>     
                     )
                 })}
                 </div>
             </div>
         )
         }
         else if(!this.state.edits){
             return(
             <div className="userEditTitle">
                 No Edits Here
             </div>
             )
         }
         else{
             return(
                 <div className="loginError">
                     Please Sign up or Log in to see this page
                 </div>
             )
         }
     }
}
export default UserEditTitle