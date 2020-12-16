import { Component } from 'react'
import axios from 'axios'
import Nav from '../nav/nav'
import { Link } from 'react-router-dom'
import './story.scss'

class Story extends Component {
state={
    story:false,
    username:false
}

componentDidMount(){
    let link=this.props.match.params.storyId
    const authorize=sessionStorage.getItem('authToken')
    if(authorize!==null){
        console.log('hello from this')
            axios.get('http://localhost:8080/profile',{
                headers:{authorization:`Bearer ${authorize}`}
            }).then(response =>this.setState({
                username:response.data.username
            }))}
    axios.get('http://localhost:8080/'+link).then(response=>{
        this.setState({
           story:response.data[0]
        })
    })
        
}

handleLike=(event)=>{
event.preventDefault();
let link=this.props.match.params.storyId
axios.post('http://localhost:8080/like/'+link).then( (response)=>{
    this.setState({
        story:response.data
    })
}
)
}
handleComment=(event)=>{
    event.preventDefault();
    let link=this.props.match.params.storyId
    axios.post('http://localhost:8080/comment/'+link,{
        username:this.state.username,
        text:event.target.text.value
    }).then((response)=>{
        this.setState({
            story:response.data
        })
    })
}

comments=()=>{
    if(this.state.story.comments&&this.state.story.comments.length!==0)
    {
       return(
           
       <div className="comments__container">
            {this.state.story.comments.map((element)=>{
            return(
                <div key={element.timestamp} className="comments__sub-container" >
                    <div className="comments__title-container">
                    <h3 className="comments__title">{element.username}</h3>
                    <p className="comments__timestamp">{new Date(element.timestamp).toDateString()}</p>
                    </div>
                    <p className="comments__text">{element.text}</p>
                    <div className="comments__like-container">
                    <p className="comments__likes">{element.likes}</p>
                    </div>
                </div>
            )
        })}
        </div>

    )
    }
    else if(this.state.story.comments &&this.state.story.comments.length===0){
        return(
            <div className="comments__empty">
                <div>
                No Comments posted yet
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <div>
                ...Loading
                </div>
            </div>
        )
    }
}

    render(){
        if(this.state.username){
        return(
            <div>
                <Nav history={this.props}/>
                <div className="story">
                <h1 className="story__title">{this.state.story.title}</h1>
                <p className="story__sub-title">By <Link to={'/user/'+this.state.story.username} className="user__link">{this.state.story.username}</Link></p>
                <p className="story__text">{this.state.story.text}</p>
                <form onSubmit={this.handleLike} className="story__like-form">
                <button type="submit" className="story__like--button">Like</button>
                </form>
               
                <p className="story__likes">{this.state.story.likes} Likes</p>
                <form onSubmit={this.handleComment} className="story__comments-form">
                    <label className="story__comment-title">Add a Comment</label><br/>
                    <label className="story__comment-label">{this.state.username}</label>
                    <input type="textbox" name="text" placeholder="Add your comment here" className="story__comment-input"/>
                    <button type="submit" className="story__comment-button">Submit</button>
                </form>
                <div className="story__comments">{this.comments()}</div>
                <Link to={'/edit/'+this.state.story.id} className="story__edit-link"><button className="story__edit-button">Edit</button></Link>
            </div>
            </div>
        )
    }
    else if(!this.state.username&&this.state.story){
        return(
        <div>
                <Nav history={this.props}/>
                <div className="story">
                <h1 className="story__title">{this.state.story.title}</h1>
                <p className="story__sub-title">By <Link to={'/user/'+this.state.story.username} className="user__link">{this.state.story.username}</Link></p>
                <p className="story__text">{this.state.story.text}</p>
                <form onSubmit={this.handleLike} className="story__like-form">
                <button type="submit" className="story__like--button">Like</button>
                </form>
               
                <p className="story__likes">{this.state.story.likes}</p>
                <form onSubmit={this.handleComment} className="story__comments-form">
                    <label className="story__comment-title">Add a Comment</label><br/>
                    <label className="story__comment-label">{this.state.username}</label>
                    <input type="textbox" name="text" placeholder="Add your comment here" className="story__comment-input"/>
                    <button type="submit" className="story__comment-button">Submit</button>
                </form>
                <div className="story__comments">{this.comments()}</div>
            </div>
            </div>
        )
    }
    else{return(
        <div>
            Loading
        </div>
    )}
}

}
export default Story