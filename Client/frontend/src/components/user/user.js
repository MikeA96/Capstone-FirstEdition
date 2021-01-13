import { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav from '../nav/nav'
import './user.scss'

class User extends Component{
    state={
        userInfo:false,
        userStories:false
    }
    componentDidMount(){
        let link = this.props.match.params.user
        axios.all([axios.get(`/api/user/${link}`),axios.get(`/api/story/${link}`)]).then(
            (response)=>{
           this.setState({
                userInfo:response[0].data,
                userStories:response[1].data
            })}
        )
            
        
    }
    render(){
        if(this.state.userInfo&&!this.state.userStories.failure){
        return(
            <div>
                <Nav history={this.props}/>
                <div className="user">
               <h1 className="user__title">{this.state.userInfo.username}</h1>
                <p className="user__sub-title">{this.state.userInfo.name}</p>
                <p className="user__content">{this.state.userInfo.info}</p>
                <p className="user__content">{this.state.userInfo.content}</p>
                {this.state.userStories.map((story)=>{
                return(
                    <div key={story.id} className="user__story">
                        <div className="user__story-container">
                            <Link to={"/story/"+story.id} className="user__story--link">
                        <h2 className="user__story--title">{story.title}</h2>
                        </Link>
                        <p className="user__story--content">{story.username}</p>
                        <p className="user__story--content">{new Date(story.created).toDateString()}</p>
                        <p className="user__story--content">{story.genre}</p>
                        </div>
                        <div className="user__story-info-container">
                            <p className="user__story--info">{story.liked} likes</p>
                        </div>
                    </div>
                    
                )
            })}
            </div>
            </div>
             
        )
    }else if(this.state.userInfo){
        return(
            <div>
            <Nav history={this.props}/>
            <div className="user">
            <h1 className="user__title">{this.state.userInfo.username}</h1>
             <p className="user__sub-title">{this.state.userInfo.name}</p>
             <p className="user__content">{this.state.userInfo.info}</p>
             <p className="user__content">{this.state.userInfo.content}</p>
             <div className="user__content">
                 This user has not yet posted any stories
             </div>
            </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <Nav history={this.props}/>
        <div className="loginError">This user does not exist</div>
        </div>
    )}
}
}
export default User