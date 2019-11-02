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
      currentFilter: "ALL",
      clearCompleted: false,
      todoItems: [
        {title: 'Đi ngủ', isComplete: false},
        {title: 'Đi tắm', isComplete: false},
        {title: 'Đi ăn', isComplete: false},
        {title: 'Đi chơi', isComplete: false}
    ]};

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheckAll = this.onCheckAll.bind(this);
  }

  onItemClicked(index) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.todoItems[index].isComplete = !this.state.todoItems[index].isComplete;
    this.setState({
      //clearCompleted: !stateCopy.clearCompleted,
      todoItems: [
        ...stateCopy.todoItems
      ]
    });
  }

  onCheckAll(){
    let checkTodo = this.state.todoItems.filter(item => { // lọc danh sách có bao nhiêu phần tử true
      if(item.isComplete === true)
        return true;
      return false;
    });
    
    let checkTrue = this.state.todoItems.find(item => { // tìm trong danh sách có isComplete = true ko, ko có trả về false
      if(item.isComplete === true)
        return 1;
    });

    if(checkTrue === undefined) {
      checkTrue = false;
    }

    let stateCopy; 

    if(checkTrue.isComplete === true || checkTrue) {
      if(checkTodo.length === this.state.todoItems.length) 
        stateCopy = this.state.todoItems.map( item => item.isComplete = false);
      else 
        stateCopy = this.state.todoItems.map( item => item.isComplete = true);
    }
    else {
      if(checkTodo.length < 1) 
        stateCopy = this.state.todoItems.map( item => item.isComplete = true);
      else 
        stateCopy = this.state.todoItems.map( item => item.isComplete = false);
    }
    
    this.setState({
      ...stateCopy
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

  // onCurrentFilter(currentState) {
  //   return (event) => {
  //     //let stateCopy = Object.assign({}, this.state);
  //     const stateCopy = [...this.state.todoItems];
  //     if(currentState === 'ALL') {
  //       let stateAll = stateCopy;//[...stateCopy.todoItems];
  //       this.setState({
  //         currentFilter: 'ALL',
  //         todoItems: [
  //           ...stateAll
  //         ]
  //       })
  //     }
  //     else if(currentState === 'ACTIVE') {
  //       // let stateActive = [...stateCopy.todoItems].filter( item => {
  //       //   return item.isComplete === false;
  //       // });
  //       let stateActive = stateCopy.filter( item => {
  //         return item.isComplete === false;
  //       });
  //       this.setState({
  //         currentFilter: 'ACTIVE',
  //         todoItems: [
  //           ...stateActive
  //         ]
  //       })
  //     }
  //     else {
  //       // let stateCompleted = [...stateCopy.todoItems].filter( item => {
  //       //   return item.isComplete === true;
  //       // });
  //       let stateCompleted = stateCopy.filter( item => {
  //         return item.isComplete === true;
  //       });
  //       this.setState({
  //         currentFilter: 'COMPLETED',
  //         todoItems: [
  //           ...stateCompleted
  //         ]
  //       })
  //     }
  //   }
    

  //   // switch(currentState){
  //   //   case 'ALL': {
  //   //     let stateAll = [...stateCopy.todoItems]
  //   //     this.setState({
  //   //       currentFilter: 'ALL',
  //   //       todoItems: [
  //   //         ...stateAll
  //   //       ]
  //   //     });
  //   //     break;
  //   //   }

  //   //   case 'ACTIVE': {
  //   //     let stateActive = [...stateCopy.todoItems].filter( item => {
  //   //       return item.isComplete === false;
  //   //     });
  //   //     this.setState({
  //   //       currentFilter: 'ACTIVE',
  //   //       todoItems: [
  //   //         ...stateActive
  //   //       ]
  //   //     });
  //   //     break;
  //   //   }

  //   //   case 'COMPLETED': {
  //   //     let stateCompleted = [...stateCopy.todoItems].filter( item => {
  //   //       return item.isComplete === true;
  //   //     });
  //   //     this.setState({
  //   //       currentFilter: 'COMPLETED',
  //   //       todoItems: [
  //   //         ...stateCompleted
  //   //       ]
  //   //     });
  //   //     break;
  //   //   }

  //   //   default: return;
  //   // }

    
  // }

  onCurrentFilter(currentState) {
    return (event) => {
      let { todoItems } = this.state;
      if(currentState === 'ALL') {
        this.setState({
          currentFilter: 'ALL',
          todoItems: [
            ...todoItems
          ]
        })
      }
      else if(currentState === 'ACTIVE') {
        let stateActive = todoItems.filter( item => {
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
        let stateCompleted = todoItems.filter( item => {
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



  render(){
    let { todoItems, newItem, currentFilter, clearCompleted } = this.state;
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
          <div>Item left</div>
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
          <div className={classNames('clear-completed', {
            active: clearCompleted
          })}>Clear Completed</div>
        </div>
      </div>
    );
  }
}

export default App