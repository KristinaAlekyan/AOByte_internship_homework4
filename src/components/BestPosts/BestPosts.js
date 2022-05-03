import React from 'react';
import { v4 as uuid } from 'uuid';
import { BsFillCartXFill,BsFillArrowUpCircleFill, BsFillArrowDownCircleFill  } from "react-icons/bs";
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';

import './bestPosts.css';
import { findMaxRatePost, sortPostsList} from '../../utils';


class BestPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            sort: false
        }
    }

    addList = (e) => {
        e.preventDefault();
        const { posts } = this.props;
        const updatedList = [...this.state.list];
        const maximumRatePost = findMaxRatePost(posts);
        if (!maximumRatePost) {
            return;
        }
        
        updatedList.push({
            id: uuid(),
            listId: maximumRatePost.id,
            post_title: maximumRatePost.post_title,
            rate: maximumRatePost.averageRate
        });
        
        this.setState({
            list: updatedList
        }, () => this.props.disablePost(maximumRatePost.id));
    }
    
    deletPost = (id) => {
        const { list } = this.state;
        const removed = list.find(post => post.id === id);

        const updatedList = list.filter(post => post.id !== id);
        this.setState({list: updatedList });

        this.props.disablePost(removed.listId);
    }

    sort = () => {
        this.setState({ sort: !this.state.sort });
    }

    render() {    
        const sortedList = sortPostsList(this.state);
        return (
            <div className='bestPostsContainer'>                
                <button
                    type = "button"
                    className = 'btn'
                    onClick={this.sort}
                >
                    {this.state.sort? <span><BsFillArrowUpCircleFill/></span> : <span><BsFillArrowDownCircleFill/></span>}
                </button>
                
                <button onClick={this.addList}>+</button>

                {sortedList.map(post =>                                                               
                    <ListGroup  key = {post.id} as = "ul" className = 'd-flex flex-row justify-content-between'>
                        <ListGroup.Item as = "li" className="d-flex flex-row ">   
                            <div className = "m-1">{post.post_title}</div>
                            <div className="m-1">{post.rate}</div>
                        </ListGroup.Item>
                        <button onClick={() => this.deletPost(post.id)}> <BsFillCartXFill/></button>
                    </ListGroup>
                )}                
            </div>
        )
    }
}
 
export default BestPosts;