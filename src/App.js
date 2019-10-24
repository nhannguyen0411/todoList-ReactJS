import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/todoItem';

class App extends Component {
  constructor(){
    super();
    this.todoItems = [
      'No way',
      'Come on now'
    ];
  }

  render(){
    return (
      <div className="App">
        <TodoItem title="No way"/>
        <TodoItem title="Come on now"/>
      </div>
    );
  }
}

export default App;
