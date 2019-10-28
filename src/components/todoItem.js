import React, { Component } from 'react';
import classNames from 'classnames';
import './todoItem.css';

class TodoItem extends Component{
    render(){
        
        const { item, onClick } = this.props;

        return (
            <div onClick = {onClick} className={classNames('TodoItem', {
                'TodoItem-done': item.isComplete
            })}>
                <p>{this.props.item.title}</p>
            </div>
        )
    }
}

export default TodoItem;