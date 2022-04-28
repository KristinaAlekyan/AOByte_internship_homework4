import React from "react";
import './App.css';
import Post from "./components/Post/Post";
import BestPost from './components/BestPost/BestPost';
import Data from "./posts.json";
import { v4 as uuid } from 'uuid';

class App extends  React.Component {
  constructor(props){
    super(props)
    this.state = {
      data : JSON.parse(JSON.stringify(Data)),
      dataLeft: JSON.parse(JSON.stringify(Data)),
      dataRight:[],
      used: false
    }
  }

  deletePost = (id,side) =>{
    if(side === "left"){
      let newData = this.state.dataLeft.filter(post => post.id !== id);  
      console.log(newData)  
      this.setState({
          ...this.state,
          dataLeft: newData
      })
   } else {
    let newData = this.state.dataRight.filter(post => post.id !== id);
    this.setState({
      ...this.state,
      dataRight:newData
    })
   }
  }

  addPost = (side) =>{ 
     
    let sumArray = this.state.data.map(a => a["comments"].map(a => a["comment_rate"]).reduce((a,b) => (a+b)));
    let commentRateArray1 = this.state.data.map(a => a["comments"].map( a => a["comment_rate"]));

    let quantity = commentRateArray1.map(a => a.length);
    let averagRate = [];

    for(let i = 0; i < sumArray.length; i++){
        averagRate.push(sumArray[i]/quantity[i])
    }
    let max = averagRate[0];
    let maxIndex = 0;

    for (let i = 1; i < averagRate.length; i++) {
        if (averagRate[i] > max) {
            maxIndex = i;
            max = averagRate[i];
        }
    }

    if(side === "left"){
      this.state.dataLeft.push(this.state.data[maxIndex]);
      this.setState({
        ...this.state
      })
    } else if(side === "right"){
      this.state.dataRight.push(this.state.data[maxIndex]);
      this.setState({
        ...this.state
      })
    }    
  }

  render(){  

    return (
      <div className = "appContainer"> 
        <div className = "appPostsContainer"><b>Posts are here    </b>
          {this.state.data.map(post => 
              <Post
                  key = {post.id}
                  id = {post.id}
                  post_title = {post.post_title}    
                  comments = {post.comments}              
              />
            )
          }
        </div> 
        <div className = "bestPostContainer">          
          <BestPost           
            key = {uuid()}
            side = {"left"}
            data = {this.state.dataLeft}
            addPost = {this.addPost}
            deletePost = {this.deletePost}
            maxIndex = {this.maxIndex}
          />
          <BestPost 
            key = {uuid()}
            side = {"right"}
            data = {this.state.dataRight}
            addPost = {this.addPost}
            deletePost = {this.deletePost}
            maxIndex = {this.maxIndex}
          />  
        </div>       
      </div>
    );
  }
}

export default App;
