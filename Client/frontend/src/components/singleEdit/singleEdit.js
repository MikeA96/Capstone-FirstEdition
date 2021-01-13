import { Component } from 'react'
import axios from 'axios'
import Diff from 'react-stylable-diff'
import Nav from '../nav/nav'
import './singleEdit.scss'


class SingleEdit extends Component{
    state={
        story:false,
        edit:false,
        liked:false,
        editId:false,
        username:false
    }
    componentDidMount(){
        const main=this.props.match.params.story
        const edited=this.props.match.params.edit
        const authorize=sessionStorage.getItem('authToken')
        if(authorize!==null){
        axios.get('/api/profile',{
            headers:{authorization:`Bearer ${authorize}`}
        }).then((response) =>{
            this.setState({
            username:response.data.username
        })})}
        axios.all([axios.get(`/api/${main}`),axios.get(`/api/edited/${edited}`)]).then(
            (response)=>{
                this.setState({
                    story:response[0].data.text,
                    edit:response[1].data.text,
                    liked:JSON.parse(response[1].data.likes),
                    editId:response[1].data.id
                })
            }
        )
    }
handleLike=(event)=>{
event.preventDefault();
axios.post(`/api/edit/like/${this.state.editId}`,{
    username:this.state.username
}).then((response)=>{
    this.setState({
        liked:JSON.parse(response.data.likes)
    })
})
}
handleUnlike=(event)=>{
    event.preventDefault();
    axios.delete(`/api/edit/like/${this.state.editId}`,{
        username:this.state.username
    }).then((response)=>{
        this.setState({
            liked:JSON.parse(response.data.likes)
        })
    })
}

    render(){
        if(this.state.story && this.state.edit&&this.state.liked.findIndex((element)=>element===this.state.username)===-1){
            
        return(
            <div className="singleEdit">
            <Nav history={this.props}/>
           <Diff inputA={this.state.story} inputB={this.state.edit} type='chars' className="difference"/>
           <form onSubmit={this.handleLike}>
               <button type='submit' className="singleEdit__like">Like</button>
           </form>
           </div>
        )
    }
    else if(this.state.story && this.state.edit&&this.state.liked.findIndex((element)=>element===this.state.username)!==-1){
        return(
            <div className="singleEdit">
            <Nav history={this.props}/>
           <Diff inputA={this.state.story} inputB={this.state.edit} type='chars' className="difference"/>
           <form onSubmit={this.handleUnlike}>
               <button type='submit' className="singleEdit__like">Unlike</button>
           </form>
           </div>
        )
    }
else{
    return(
        <div>
            <Nav history={this.props}/>
            <div>
            ...loading
            </div>
        </div>
    )
}}
}
export default SingleEdit