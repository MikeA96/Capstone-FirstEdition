import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from '../nav/nav'
import { Component } from 'react'
import './search.scss'

class Search extends Component{
    state={
        searchQuery:false
    }

    componentDidMount(){
        const link=this.props.match.params.search
        axios.get(`http://localhost:8080/search/${link}`).then((response)=>{
            this.setState({
                searchQuery:response.data
            })
        })

    }
    componentDidUpdate(prevProps){
        let main=this.props.match.url
        const link=this.props.match.params.search
        if(prevProps.match.url!==main){
            axios.get(`http://localhost:8080/search/${link}`).then((response)=>{
            this.setState({
                searchQuery:response.data
            })
        })
        }
    }
    render(){
        if(this.state.searchQuery&&(this.state.searchQuery[0].length||this.state.searchQuery[1].length)){
            return(
                <div className="search">
                    <Nav history={this.props}/>
                    <h2 className="search__title">Stories</h2>
                    {this.state.searchQuery[0].map(element=>{
                        return(
                        <Link to={'/story/'+element.id} className="search__content">{element.title}</Link>
                        )
                    })}
                    <h2 className="search__title">Users</h2>
                    {this.state.searchQuery[1].map(element=>{
                        return(
                        <Link to ={'/user/'+element.username} className="search__content">{element.username}</Link>
                        )
                    })}
                </div>
            )
        }
        else if(this.state.searchQuery&&(!this.state.searchQuery[0].length&&!this.state.searchQuery[1].length)){
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