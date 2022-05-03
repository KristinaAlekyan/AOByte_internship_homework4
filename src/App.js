import React from "react";

import './App.css';
import Post from "./components/Post/Post";
import BestPosts from './components/BestPosts/BestPosts';
import postsdata from "./posts.json";
import { addAverageRate } from './utils';

class App extends  React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts : []
        }
    }

    componentDidMount() {
        const postsWithAvarageRate = addAverageRate(postsdata);
        this.setState({ posts: postsWithAvarageRate });
    }

    disablePost = (id) => {
        const updatedPosts = this.state.posts.map(post => {
            return (post.id === id) ? { ...post, disabled: !post.disabled } : post
        });
        this.setState({ posts: [...updatedPosts] });
    }

    render(){ 
        return (
            <div className = "appContainer"> 
                <div className = "appPostsContainer"><b>Posts are here    </b>
                    {this.state.posts.map(post => 
                        <Post
                            key = {post.id}
                            id = {post.id}
                            post_title = {post.post_title}    
                            comments = {post.comments}  
                            disabled ={post.disabled}       
                        />
                    )}
                </div> 

                <div className = "bestPostContainer">          
                    <BestPosts          
                        posts = {this.state.posts}                  
                        disablePost ={this.disablePost}
                    />
                    <BestPosts 
                        posts = {this.state.posts}                  
                        disablePost ={this.disablePost}
                    />  
                </div>       
            </div>
        );
    }
}

export default App;