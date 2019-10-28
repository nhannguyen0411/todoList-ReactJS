import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/todoItem';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todoItems: [
        {title: 'No way', isComplete: true},
        {title: 'Come on now', isComplete: false}
    ]};

    //this.onItemClicked = this.onItemClicked.bind(this);
  }

  onItemClicked(index) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.todoItems[index].isComplete = !this.state.todoItems[index].isComplete;
    this.setState(stateCopy);
    console.log(this.state);
  }

  render(){
    let { todoItems } = this.state;
    console.log('rendering...', todoItems);
    return (
      <div className="App">
        {
          todoItems.map( (item, index) => 
            <TodoItem key={index} 
              item={ item } 
              onClick = {() => this.onItemClicked(index)} 
              />)
        }
      </div>
    );
  }
}

export default App