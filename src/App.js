import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';
import TodoItem from './components/todoItem';
import list from './img/list.svg';


class App extends Component {
  constructor(){
    super();
    
    // this.array = [
    //   {title: 'Đi ngủ', isComplete: false},
    //   {title: 'Đi tắm', isComplete: false},
    //   {title: 'Đi ăn', isComplete: false},
    //   {title: 'Đi chơi', isComplete: false}
    // ];

    this.state = {
      newItem: '',
      total: 0,
      currentFilter: "ALL",
      clearCompleted: false,
      todoItems: [
        {title: 'Đi ngủ', isComplete: false},
        {title: 'Đi tắm', isComplete: false},
        {title: 'Đi ăn', isComplete: false},
        {title: 'Đi chơi', isComplete: false}
    ]};

    this.array = [...this.state.todoItems];

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
      total: sum.length,
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
        todoItems: [
          {
            title: text,
            isComplete: false
          },
          ...this.state.todoItems
        ]
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
      const newArr = [...this.array];
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
    // let stateCopy = [...this.state.todoItems].filter( item => item.isComplete === false);
    // this.setState({
    //   total: this.state.todoItems.length - stateCopy.length,
    //   todoItems: [
    //     ...stateCopy
    //   ]
    // });
    console.log('Hello');
  }

  render(){
    let { todoItems, newItem, currentFilter, total } = this.state;
    console.log('rendering...', todoItems);
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
          todoItems.map( (item, index) => 
            <TodoItem key={index} 
              item={ item } 
              onClick = {() => this.onItemClicked(index)} 
              />)
        }
        
        <div className='Footer'>
          { (todoItems.length - total) < 2 && <div>{todoItems.length - total} Item left</div>}
          { (todoItems.length - total) > 1 && <div>{todoItems.length - total} Items left</div>}
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
          {/* <div className={classNames('clear-completed', {
            active: clearCompleted
          })}>Clear Completed</div> */}
          { total > 0 && <div onClick={this.onDelete} 
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