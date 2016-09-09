import React from 'react'

export default React.createClass({
  getInitialState(){
    return {
      todoItems: [
        {
          name: ""
        }
      ]
    }
  },
  componentDidMount(){
    // This method is what is called *after* the component successfuly
    //   loaded into memory
    this.getTodoItems();
  },
  getTodoItems(){
    // Setup ajax
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e)=>{
      var responseJSON = JSON.parse(e.target.response);
      this.setState({
        todoItems: responseJSON
      });

    });
    xhr.open("GET", "http://tiny-tiny.herokuapp.com/collections/tiy-sat-summer16-1");
    xhr.send();
  },
  onSubmitTodoHandler(e){
    e.preventDefault();
    // get the todo text input value
    var todoNameValue = this.refs.todoName.value;
    // Stringified (how we send data over the internet)
    var newTodoStringified = JSON.stringify({
      name: todoNameValue
    });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e)=>{
      var responseJSON = JSON.parse(e.target.response);
      this.getTodoItems();
    });
    xhr.open("POST", "http://tiny-tiny.herokuapp.com/collections/tiy-sat-summer16-1");
    // telling the server what type of content to expect
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(newTodoStringified);
  },
  render() {
    return (
      <section>
        <ul>
          { this.state.todoItems.map((item, i)=>{
            return <li key={i}> {item.name} </li>
          })}
        </ul>
        <form method="POST"
              action="#"
              onSubmit={this.onSubmitTodoHandler}>
          <input type="text"
                 placeholder="todo name"
                 ref="todoName" />
          <input type="submit" value="add todo" />
        </form>
      </section>
    )
  }
})
