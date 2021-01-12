import { Component } from 'react'
import axios from 'axios'
import Nav from '../nav/nav'
import { Link } from 'react-router-dom'
import './story.scss'

class Story extends Component {
state={
    story:false,
    comments:false,
    username:false,
    likes:false
}

componentDidMount(){
    let link=this.props.match.params.storyId
    const authorize=sessionStorage.getItem('authToken')
    if(authorize!==null){
            axios.get('/profile',{
                headers:{authorization:`Bearer ${authorize}`}
            }).then(response =>{
                this.setState({
                username:response.data.username
            })})}
   /* axios.get('http://localhost:8080/'+link).then(response=>{
        this.setState({
           story:response.data
        })
    })*/
    axios.all([(axios.get('/'+link)),axios.get(`/comments/${link}`)]).then(
        (response)=>{
       this.setState({
            story:response[0].data,
            comments:response[1].data.reverse(),
            likes:JSON.parse(response[0].data.likes)
        })}
    )
        
}

handleLike=(event)=>{
event.preventDefault();
let link=this.props.match.params.storyId
axios.post(`/like/${link}`,{
        username:this.state.username
}).then( (response)=>{
    this.setState({
        story:response.data,
        likes:JSON.parse(response.data.likes)
    })
}

)
}

handleUnlike=(event)=>{
    event.preventDefault();
    let link=this.props.match.params.storyId
    axios.delete(`/like/${link}`,{
            username:this.state.username
    }).then((response)=>{
        this.setState({
            story:response.data,
            likes:JSON.parse(response.data.likes)
        })
    })
}

handleComment=(event)=>{
    event.preventDefault();
    let link=this.props.match.params.storyId
    axios.post('/comment/'+link,{
        username:this.state.username,
        text:event.target.text.value
    }).then(
    setTimeout(()=>{axios.get('/comments/'+link).then((response)=>{
    this.setState({
        comments:response.data
    })
    })},500)
    )
}
handleDelete=(event)=>{
event.preventDefault();
axios.delete(`/comments/${event.target.comment.value}`,{
    data:{
        username:this.state.username
    }
}).then(setTimeout(()=>{
    
    axios.get(`/comments/${this.props.match.params.storyId}`).then((response)=>{
        this.setState({
            comments:response.data
        })
    }
    )
},500))
}
handleCommentLike=(event)=>{
event.preventDefault();
let link=this.props.match.params.storyId
axios.post(`/comment/like/${event.target.comment.value}`,{
    username:this.state.username
}).then(setTimeout(()=>{axios.get(`/comments/${link}`).then((response)=>{
    this.setState({
        comments:response.data.reverse()
    })
})},500))
}
handleCommentUnlike=(event)=>{
    event.preventDefault();
    let link=this.props.match.params.storyId
    axios.delete(`/comment/like/${event.target.comment.value}`,{
        username:this.state.username
    }).then(setTimeout(()=>{axios.get(`/comments/${link}`).then((response)=>{
        this.setState({
            comments:response.data.reverse()
        })
    })},500))
}

comments=()=>{
    if(this.state.comments&&this.state.comments.length!==0)
    {
       return(
           
       <div className="comments__container">
            {this.state.comments.map((element)=>{
               let findLikes=JSON.parse(element.liked)
                if(element.username===this.state.username&&findLikes.findIndex((element)=>element===this.state.username)===-1){
                    return(
                        <div key={element.timestamp} className="comments__sub-container" >
                        <div className="comments__title-container">
                        <h3 className="comments__title">{element.username}</h3>
                        <p className="comments__timestamp">{element.timestamp}</p>
                        </div>
                        <p className="comments__text">{element.text}</p>
                        <div className="comments__like-container">
                        <p className="comments__likes">{element.likes}</p>
                        </div>
                        <form onSubmit={this.handleDelete}>
                            <button name="comment" value={element.id} type="submit" className="comments__button"> DElETE YOUR COMMENT</button>
                        </form>
                        <form onSubmit={this.handleCommentLike}>
                            <button type="submit" name="comment" value={element.id} className="comments__button">Like</button>
                        </form>
                    </div>
                    )
                }
                else if(element.username===this.state.username&&findLikes.findIndex((element)=>element===this.state.username)!==-1){
                    return(
                        <div key={element.timestamp} className="comments__sub-container" >
                        <div className="comments__title-container">
                        <h3 className="comments__title">{element.username}</h3>
                        <p className="comments__timestamp">{element.timestamp}</p>
                        </div>
                        <p className="comments__text">{element.text}</p>
                        <div className="comments__like-container">
                        <p className="comments__likes">{element.likes}</p>
                        </div>
                        <form onSubmit={this.handleDelete}>
                            <button name="comment" value={element.id} type="submit" className="comments__button"> DElETE YOUR COMMENT</button>
                        </form>
                        <form onSubmit={this.handleCommentUnlike}>
                            <button type="submit" name="comment" value={element.id} className="comments__button">Unlike</button>
                        </form>
                    </div>
                    )
                }
                else if(element.username!==this.state.username&&findLikes.findIndex((element)=>element===this.state.username)===-1){
                    return(
                        <div key={element.timestamp} className="comments__sub-container" >
                        <div className="comments__title-container">
                        <h3 className="comments__title">{element.username}</h3>
                        <p className="comments__timestamp">{element.timestamp}</p>
                        </div>
                        <p className="comments__text">{element.text}</p>
                        <div className="comments__like-container">
                        <p className="comments__likes">{element.likes}</p>
                        </div>
                        <form onSubmit={this.handleCommentLike}>
                            <button type="submit" name="comment" value={element.id} className="comments__button">Like</button>
                        </form>
                    </div>
                    )
                }
                else if(element.username!==this.state.username&&findLikes.findIndex((element)=>element===this.state.username)!==-1){
                    return(
                        <div key={element.timestamp} className="comments__sub-container" >
                        <div className="comments__title-container">
                        <h3 className="comments__title">{element.username}</h3>
                        <p className="comments__timestamp">{element.timestamp}</p>
                        </div>
                        <p className="comments__text">{element.text}</p>
                        <div className="comments__like-container">
                        <p className="comments__likes">{element.likes}</p>
                        </div>
                        <form onSubmit={this.handleCommentUnlike}>
                            <button type="submit" name="comment" value={element.id} className="comments__button">Unlike</button>
                        </form>
                    </div>
                    )
                }
                else{
            return(
                <div key={element.timestamp} className="comments__sub-container" >
                    <div className="comments__title-container">
                    <h3 className="comments__title">{element.username}</h3>
                    <p className="comments__timestamp">{element.timestamp}</p>
                    </div>
                    <p className="comments__text">{element.text}</p>
                    <div className="comments__like-container">
                    <p className="comments__likes">{element.likes}</p>
                    </div>
                </div>
            )}
        })}
        </div>

    )
    }
    else if(this.state.comments &&this.state.comments.length===0){
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
        if(this.state.username&&this.state.likes&&this.state.likes.findIndex((element)=>element===this.state.username)===-1){
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
               
                <p className="story__likes">{this.state.story.liked} Likes</p>
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
    else if(this.state.username&&this.state.story&&this.state.likes&&this.state.likes.findIndex((element)=>element===this.state.username)!==-1){
        return(
        <div>
                <Nav history={this.props}/>
                <div className="story">
                <h1 className="story__title">{this.state.story.title}</h1>
                <p className="story__sub-title">By <Link to={'/user/'+this.state.story.username} className="user__link">{this.state.story.username}</Link></p>
                <p className="story__text">{this.state.story.text}</p>
                <form onSubmit={this.handleUnlike} className="story__like-form">
                <button type="submit" className="story__like--button">Unlike</button>
                </form>
               
                <p className="story__likes">{this.state.story.liked} Likes</p>
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
    else if(this.state.story&&!this.state.username){
        return(
            <div>
                <Nav history={this.props}/>
                <div className="story">
                <h1 className="story__title">{this.state.story.title}</h1>
                <p className="story__sub-title">By <Link to={'/user/'+this.state.story.username} className="user__link">{this.state.story.username}</Link></p>
                <p className="story__text">{this.state.story.text}</p>
               
                <p className="story__likes">{this.state.story.liked} Likes</p>
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