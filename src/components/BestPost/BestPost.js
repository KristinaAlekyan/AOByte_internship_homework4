import React from 'react';
import '../BestPost/bestPost.css';

import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';
import { v4 as uuid } from 'uuid';

class BestPosts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.props
        }
    }
    render() {  
        const { addPost, deletePost} = this.props;   

        return (
            <div className='bestPostsContainer'>
                <button onClick = {() => addPost(this.state.side)}>+</button>
                {this.state.data.map(post =>                                           
                    <ListGroup  key = {uuid()} as = "ul" className = 'd-flex flex-row justify-content-between'>
                        <ListGroup.Item as = "li" className="d-flex flex-row ">                          
                            <div className = "bg-light border m-1">{post.id}</div>
                            <div className = "m-1">{post.post_title}</div>
                            <div className = "m-1">{post.comments.map(a => a["comment_rate"]).reduce((a,b) => a + b)/post.comments.map(a =>a["comment_rate"]).length}</div>
                        </ListGroup.Item>
                        <button onClick = { () => deletePost(post.id, this.state.side)}>Delete</button>
                    </ListGroup>
                )}                
            </div>
        )
    }
}
 
export default BestPosts;