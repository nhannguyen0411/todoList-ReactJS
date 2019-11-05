import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './todoItem.css';
import checkImg from '../img/check.svg';
import checkImgDone from '../img/checkDone.svg';

class TodoItem extends Component{
    render(){
        
        const { item, onClick } = this.props;
        let url = checkImg;
        if(item.isComplete) {
            url = checkImgDone;
        }

        return (
            <div className={classNames('TodoItem', {
                'TodoItem-done': item.isComplete === true
            })}>
                <img onClick = {onClick} src={url} alt='Error' width={32} height={32}/>
                <p>{this.props.item.title}</p>
            </div>
        )
    }
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        isComplete: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired
    }),
    onClick: PropTypes.func.isRequired
};

export default TodoItem;