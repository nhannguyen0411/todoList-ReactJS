import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';
import TodoItem from './components/todoItem';
import list from './img/list.svg';


class App extends Component {
  constructor(){
    super();

    this.state = {
      newItem: '',
      total: 0,
      currentFilter: "ALL",
      clearCompleted: false,
      todoItems: [],
      array: []
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheckAll = this.onCheckAll.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onItemClicked(index) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.todoItems[index].isComplete = !this.state.todoItems[index].isComplete;
    let sum = [...stateCopy.todoItems].filter(item => item.isComplete === true);
    this.setState({
      total: this.state.todoItems.length - sum.length,
      todoItems: [
        ...stateCopy.todoItems
      ]
    });
  }

  onCheckAll(){
    let checkTodo = this.state.todoItems.filter(item => { // lọc danh sách có bao nhiêu phần tử true
      return item.isComplete === true;
    });
    
    let checkTrue = this.state.todoItems.find(item => { // tìm trong danh sách có isComplete = true ko, ko có trả về false
      return item.isComplete === true;
    });

    if(checkTrue === undefined) {
      checkTrue = false;
    }

    let stateCopy; 
    let sum;
    if(checkTrue.isComplete === true || checkTrue) {
      if(checkTodo.length === this.state.todoItems.length) {
        stateCopy = this.state.todoItems.map( item => {
          item.isComplete = false;
          return item;
        });
        sum = 0;
      }
      else {
        stateCopy = this.state.todoItems.map( item => {
          item.isComplete = true;
          return item;
        });
        sum = this.state.todoItems.length;
      }
    }
    else {
      if(checkTodo.length < 1) {
        stateCopy = this.state.todoItems.map( item => {
          item.isComplete = true;
          return item;
        });
        sum = this.state.todoItems.length;
      }
      else{
        this.state.todoItems.map( item => {
          item.isComplete = false;
          return item;
        });
        sum = 0;
      }
    }
    
    this.setState({
      total: sum,
      todoItems: [
        ...stateCopy
      ]
    });
  }

  onKeyUp(event) {

    if(event.keyCode === 13){
      let text = event.target.value;
      if(!text) { return; }
  
      text = text.trim();
      if(!text) { return; }
  
      this.setState({
        newItem: '',
        total: this.state.todoItems.length + 1,
        todoItems: [
          {
            title: text,
            isComplete: false
          },
          ...this.state.todoItems
        ],
        array: [
          {
            title: text,
            isComplete: false
          },
          ...this.state.array
        ],
      })
    }

  }

  onChange(event){
    let text = event.target.value;
    this.setState({
      newItem: text
    })
  }

  onCurrentFilter(currentState) {
    return (event) => {
      const newArr = [...this.state.array];
      if(currentState === 'ALL') {
        this.setState({
          currentFilter: 'ALL',
          todoItems: [
            ...newArr
          ]
        })
      }
      else if(currentState === 'ACTIVE') {
        let stateActive = newArr.filter( item => {
          return item.isComplete === false;
        });
        this.setState({
          currentFilter: 'ACTIVE',
          todoItems: [
            ...stateActive
          ]
        })
      }
      else {
        let stateCompleted = newArr.filter( item => {
          return item.isComplete === true;
        });
        this.setState({
          currentFilter: 'COMPLETED',
          todoItems: [
            ...stateCompleted
          ]
        })
      }
    }
  }

  onDelete() {
    let stateCopy = [...this.state.todoItems].filter( item => item.isComplete === false);
    this.setState({
      total: this.state.todoItems.length - stateCopy.length,
      todoItems: [
        ...stateCopy
      ],
      array: [
        ...stateCopy
      ]
    });
  }

  render(){
    let { todoItems, newItem, currentFilter, total } = this.state;
    let totalTrue = todoItems.filter(item => item.isComplete === true);
    return (
      <div className="App">
        <div className='Header'>
          <img onClick={this.onCheckAll} src={list} alt='Error' width={32} height={32} />
          <input type='text' 
          value={newItem}
          placeholder='Add a new value' 
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}/>
        </div>
        {
          todoItems.length > 0 && todoItems.map( (item, index) => 
            <TodoItem key={index} 
              item={ item } 
              onClick = {() => this.onItemClicked(index)} 
              />)
        }
        {
          todoItems.length < 1 && 'Nothing here'
        }
        
        <div className='Footer'>
          { total < 2 && <div>{total} Item left</div>}
          { total > 1 && <div>{total} Items left</div>}
          <div className='state-middle'>

            <span onClick={this.onCurrentFilter('ALL')} className={classNames({
              active: currentFilter === 'ALL'
            })}>All</span>

            <span onClick={this.onCurrentFilter('ACTIVE')} className={classNames({
              active: currentFilter === 'ACTIVE'
            })}>Active</span>

            <span onClick={this.onCurrentFilter('COMPLETED')} className={classNames({
              active: currentFilter === 'COMPLETED'
            })}>Completed</span>

          </div>
          { totalTrue.length > 0 && <div onClick={this.onDelete} 
                              className={classNames('clear-completed', {
                              active: true
          })}>
            Clear Completed
          </div>}
        </div>
      </div>
    );
  }
}

export default App