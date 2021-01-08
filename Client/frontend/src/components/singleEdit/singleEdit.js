import { Component } from 'react'
import axios from 'axios'
import Diff from 'react-stylable-diff'
import Nav from '../nav/nav'
import './singleEdit.scss'


class SingleEdit extends Component{
    state={
        story:false,
        edit:false
    }
    componentDidMount(){
        const main=this.props.match.params.story
        const edited=this.props.match.params.edit
        axios.all([axios.get(`http://localhost:8080/${main}`),axios.get(`http://localhost:8080/edited/${edited}`)]).then(
            (response)=>{
                this.setState({
                    story:response[0].data.text,
                    edit:response[1].data.text
                })
            }
        )
    }


    render(){
        if(this.state.story && this.state.edit){
            
        return(
            <div className="singleEdit">
            <Nav history={this.props}/>
           <Diff inputA={this.state.story} inputB={this.state.edit} type='chars' className="difference"/>
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