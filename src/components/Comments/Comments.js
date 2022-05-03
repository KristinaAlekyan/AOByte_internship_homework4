import React from 'react';

import "./comments.css";

class Comments extends React.Component {

    render() { 
        const {comments} = this.props;
        return (
            <div >
                {comments.map(comment => 
                    <Comment 
                        key = {comment.comment_id}
                        id = {comment.id}
                        comment_title ={comment.comment_title}    
                        comment_rate ={comment.comment_rate}             
                    />
                )} 
            </div>            
        )
    }
}
 
export default Comments;