import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from '../nav/nav'
import { Component } from 'react'
import './search.scss'

class Search extends Component{
    state={
        searchUsers:false,
        searchStories:false
    }

    componentDidMount(){
        const link=this.props.match.params.search
        axios.get(`/api/search/${link}`).then((response)=>{
      const search=response.data.shift()
            this.setState({
                searchUsers:search,
                searchStories:response.data
            })
            
        })

    }
    componentDidUpdate(prevProps){
        let main=this.props.match.url
        const link=this.props.match.params.search
        if(prevProps.match.url!==main){
            axios.get(`/api/search/${link}`).then((response)=>{
                const users=response.data.shift()
                this.setState({
                    searchUsers:users,
                    searchStories:response.data
                })
        })
        }
    }
    render(){
        if((this.state.searchUsers||this.state.searchStories)&&(this.state.searchUsers.length||this.state.searchStories.length)){
            return(
                <div className="search">
                    <Nav history={this.props}/>
                    <h2 className="search__title">Stories</h2>
                    {this.state.searchStories.map(element=>{
                        return(
                        <Link to={'/story/'+element.id} className="search__content" key={element.id}>{element.title}</Link>
                        )
                    })}
                    <h2 className="search__title">Users</h2>
                    {this.state.searchUsers.map(element=>{
                        return(
                        <Link to ={'/user/'+element.username} className="search__content" key={element.username}>{element.username}</Link>
                        )
                    })}
                </div>
            )
        }
        else if(!this.state.searchUsers.length&&!this.state.searchStories.length){
            return(
            <div className="search">
                <Nav history={this.props}/>
                   <div className="search__content"> Nothing seems to match your search criteria</div>
                </div>
            )
        }
        else{
            return(
                <div>
                    ...loading
                </div>
            )
        }
    }

}
export default Search