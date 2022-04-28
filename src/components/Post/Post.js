import React from 'react';
import '../Post/post.css';

import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';
import Comment from "../Comment/Comment"

class Post extends React.Component {

    render() { 
        const {id,post_title,comments} = this.props;
        return (
            <div className = 'postContent'>
                <ListGroup as = "ul">
                    <ListGroup.Item as = "li" className = "d-flex flex-row ">
                        <div className ="bg-light border m-1">{id}</div>
                        <div className ="m-1">{post_title}</div>
                    </ListGroup.Item>
                </ListGroup>
                
                <div >
                    {comments.map(comment => 
                        <Comment 
                            key = {comment.comment_id}
                            id = {comment.id}
                            comment_title = {comment.comment_title}    
                            comment_rate = {comment.comment_rate}             
                        />
                        )
                    } 
                </div>
            </div>
            
        )
    }
}
 
export default Post;