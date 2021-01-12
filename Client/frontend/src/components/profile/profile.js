import { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav from '../nav/nav'
import './profile.scss'

class Profile extends Component{
    state={
        username:false,
        name:false,
        stories:false,
        edits:false
    }
    componentDidMount(){
        const authorize=sessionStorage.getItem('authToken')
        if(authorize!==null){
        axios.get('http://localhost:8080/profile',{
            headers:{authorization:`Bearer ${authorize}`}
        }).then((response) =>{
            this.setState({
            username:response.data.username,
            name:response.data.findName
        })
        axios.all([axios.get(`http://localhost:8080/story/${response.data.username}`),axios.get(`http://localhost:8080/edit/${response.data.username}`)]).then(
            (response)=>{ 
                this.setState({
                    stories:response[0].data,
                    edits:response[1].data
                })
            }
        )
        })}
    }

    handleDelete=(event)=>{
        event.preventDefault();
        axios.delete(`http://localhost:8080/story/${event.target.story.value}`,{
            data:{
            username:this.state.username
            }
        }).then(setTimeout(()=>{axios.get(`http://localhost:8080/story/${this.state.username}`).then((response)=>{
            this.setState({
                stories:response.data
            })
        })},500))
    }
    render(){
        if(this.state.username&&this.state.name&&!this.state.stories.failure &&this.state.edits){
            return(
                <div>
                    <Nav history={this.props}/>
                    <div className="profile">
                    <h1 className="profile__title">{this.state.username}</h1>
                    <h3 className="profile__sub-title">{this.state.name}</h3>
                    <Link to='/editProfile' className="editProfile__button-link"><button className="editProfile__button">Edit your Profile</button></Link>
                    <div className="profile__content-container">
                        {this.state.stories.map((element)=>{
                            return(
                                <div key={element.id} className="profile__story-container" >
                                    <div className="profile__story-subcontainer">
                                        <Link to={"/story/"+element.id} className="profile__story-link">
                                    <h2 className="profile__story-title">{element.title}</h2>
                                    </Link>
                                    <p className="profile__content">Created by:  {element.username}</p>
                                    <p className="profile__content">{new Date(element.created).toDateString()}</p>
                                    <p className="profile__content">{element.genre}</p>
                                    </div>
                                    <div className="profile__info-container">
                                        <p className="profile__info">{element.liked} likes</p>
                                    </div>
                                    <form onSubmit={this.handleDelete} >
                                        <button className="profile__delete" name="story" type="submit" value={element.id} >DELETE STORY</button>
                                        </form>
                                </div>
                        )})}
                    </div>
                    <div className="profile__edits">
                            <Link to='/userEdits' className="profile__edits-link">You have {this.state.edits.length} edit(s)</Link>
                    </div>
                    </div>
                </div>
            )
            }
            else if(!this.state.stories||this.state.stories.failure){
                return(
                    <div>
                        <Nav history={this.props}/>
                        <div className="profile">
                    <h1 className="profile__title">{this.state.username}</h1>
                    <h3 className="profile__sub-title">{this.state.name}</h3>
                    <Link to='/editProfile' className="editProfile__button-link"><button className="editProfile__button">Edit your Profile</button></Link>
                    <p className="profile__content">No stories yet</p>
                    <div className="profile__edits">
                            <Link to='/userEdits' className="profile__edits-link">You have {this.state.edits.length} edit(s)</Link>
                    </div>
                    </div>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <Nav history={this.props}/>
                    <div className="loginError">Please sign up or log in to view this page</div>
                    </div>
                )
            }
    }
}
export default Profile