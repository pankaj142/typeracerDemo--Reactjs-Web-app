import React from 'react';
import request from 'superagent';


export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:"This is dumy paragraph data.",
			inputValue:"",
			count:0,
			wpm:0,
			minutes:1,
			showParagraph:false,
			showStartButton:false,
			showInput:false
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
	showData(){
		this.setState({
			showParagraph:true,
			showStartButton:true
		})
	}
	countingWords(){
		setTimeout(()=>{
			this.setState({
				showInput:false
			})
			console.log("count",this.state.count)
			
		},120000)

		setInterval(()=>{
				console.log("hi")
				let wpm=this.state.count /this.state.minutes;
				this.setState({
					minutes:this.state.minutes,
					wpm: wpm
				})
			},6000)

	}
	start(){
		this.setState({
			showInput:true,
			showStartButton:false
		})
		this.countingWords();
	}
	handleInputChange(event){
		this.setState({
			inputValue : event.target.value
		})
	}
	checking(){
		let words=this.state.data.split(" ")
		let count=this.state.count;
		let minutes= this.state.minutes;
		console.log(words)
		if(this.state.inputValue === words[count]){
			console.log("yes")
			this.setState({
				inputValue:"",
				count: count +1,
				wpm: count/minutes
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
		let paragraph;
 		if(this.state.showParagraph){
		   paragraph=this.state.data;
 		}else{
 			paragraph="";
 		}
 		let startButton=null;

 		if(this.state.showStartButton){
 				startButton= <div className="form-group">
		 				 		The race starts in 5 seconds.
								<button type="button" className="btn"
								   onClick={()=>{this.start()}}>Start</button>
							</div>
 		}
 		let inputfield=null;
 		if(this.state.showInput){
 			inputfield= <input className="form-control" id="ex1" type="text"
					            placeholder={"Type the above paragraph here..."}
                                value={this.state.inputValue}
                                onChange={(e)=>{this.handleInputChange(e)}}
                                onKeyPress={(e)=>{this.handleEnter(e)}}
					    />

 		}
 		

		return(
				<div className="container">
					<div className="form-group">

						<button type="button" className="btn"
						   onClick={()=>{this.showData()}}>Show Paragraph</button>
						   {this.state.wpm}
					</div>
					<div className="form-group">
					   {paragraph}
					</div>
					<div className="form-group">
				    	{startButton}
					    {inputfield}
					</div>
				</div>
			);
	}
};