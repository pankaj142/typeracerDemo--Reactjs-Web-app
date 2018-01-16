import React from 'react';
import request from 'superagent';

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:"",
			inputValue:"",
			count:0
		}
	}
	
	//API call
	getData(){
		var text;
		request
		 .get('http://www.randomtext.me/api/')
		 .end(function(err,res){
		       text=res.body.text_out;
	           console.log("API data",text)
	      });
	}
	componentDidMount(){
		this.getData();
	}
	start(){
		this.setState({
			data:"This is dumy paragraph data."
		})
	}
	handleInputChange(event){
		this.setState({
			inputValue : event.target.value
		})
	}
	checking(){
		let words=this.state.data.split(" ")
		let count=this.state.count;
		console.log(words)
		if(this.state.inputValue === words[count]){
			console.log("yes")
			this.setState({
				inputValue:"",
				count: +1
			})
		}else{
			console.log("no")
			alert("You have entered wrong word.")
			this.setState({
				inputValue:"",
			})
		}
	}
	handleEnter(event){
		//here I used on Enter key rather than spacebar key(something was not working with it)
		if(event.key === 'Enter'){
			console.log("enter")
			this.checking();
		}
	}
	render(){
		   let text=this.state.data;
		return(
				<div className="container">
					<div className="row">
						<button onClick={()=>{this.start()}}>Start</button>
					</div>
					<div className="row">
					   {text}
					</div>
					<div className="row">
					   <input 
                                value={this.state.inputValue}
                                onChange={(e)=>{this.handleInputChange(e)}}
                                onKeyPress={(e)=>{this.handleEnter(e)}}
                        />
					</div>
				</div>
			);
	}
};