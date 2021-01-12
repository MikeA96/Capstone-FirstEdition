import axios from 'axios'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../nav/nav'
import './home.scss'

class Home extends Component{
    state={
        stories:{},
        min:0,
        max:5
    }
    componentDidMount(){
        axios.get('http://localhost:8080/story').then((response)=>{
            this.setState({
                stories:response.data.reverse()
            })
        })
    }

    spliceStory=(something)=>{
       const newArray=[]
        for(let i=0;i<this.state.stories.length;i++){
            if(i<this.state.max&&i>=this.state.min){
                newArray.push(something[i])
            }
        }
        return newArray
    }

    forward=()=>{
        if(this.state.stories.length-this.state.max>0)
        this.setState({
            min:this.state.min+5,
            max:this.state.max+5
        })
    }
    backward=()=>{
        if(this.state.min>0){
        this.setState({
            min:this.state.min-5,
            max:this.state.max-5
        })
    }
    }

    handleFilter=(event)=>{
        event.preventDefault();
        axios.get(`http://localhost:8080/filter/${event.target.filter.value.toLowerCase()}`).then((response)=>{
            this.setState({
                stories:response.data.reverse()
            })
        }).then(event.target.reset())
    }
    
    handleReset=()=>{
        axios.get('http://localhost:8080/story').then((response)=>{
            this.setState({
                stories:response.data.reverse()
            })
        })
    }


    render(){
        
        if(this.state.stories.length){
            return(
                <div className="home">
                    <Nav history={this.props}/>
                    <form onSubmit={this.handleFilter} className="home__form">
                        <input type="text" name="filter" placeholder="Filter by Genre" className="home__form-text"/>
                        <button type="submit" className="home__form-button">Submit</button>
                    </form>
                    <button onClick={this.handleReset} className="home__reset">Reset Filter</button>
                    <div className="home__content--main-container">
            {this.spliceStory(this.state.stories).map((story)=>{

                return(
                    <div key={story.id} className="home__content-container">
                        <div className="home__content">
                            <Link to={"/story/"+story.id} className="home__title-link">
                        <h2 className="home__title">{story.title}</h2>
                        </Link>
                        <Link to={'/user/'+story.username} className="home__user-link">
                        <p className="home__user"> Written by:  {story.username}</p>
                        </Link>
                        <p className="home__timestamp">{new Date(story.created).toDateString()}</p>
                        <p className="home__genre">{story.genre}</p>
                        </div>
                        <div className="home__info-container">
                            <p className="home__likes">{story.liked} likes</p>
                        </div>
                    </div>
                    
                )
        })} </div>
        <div className="home__nav">
        <p onClick={this.backward} className="home__nav-button">{"<"}</p>
        <p onClick={this.forward} className="home__nav-button">{">"}</p>
        </div>
            </div>
            )
}
else{return(
    <div>
        <Nav/>
        <div>
        Loading..
        </div>
    </div>
)}
}}
export default Home