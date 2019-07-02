

import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import '../css/Face.css'
import '../css//bootstrap/bootstrap.min.css';
import Chat from './Chat'
import TodoForm from './Casos'
import { todos } from './todos.json';
import Flecha from '../img/flecha.png';
var iframeDocument;
class Face extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      faces: []
    }
    this.state = {
      todos
    }
    this.handleAddTodo = this.handleAddTodo.bind(this);
    
  }
// RECIBO EL MENSAJE
  componentDidMount () {
    this.socket = io('/')
    this.socket.on('message', face => {
      // acá se guarda el estado
      this.setState({ faces: [face, ...this.state.faces]});
      console.log("componentDidMount face:: mensaje -->>> "+JSON.stringify(face));
      iframeDocument = document.getElementsByClassName('djs-element djs-shape').contentDocument;
    })
  }
  handleAddTodo(todo) {
    this.setState({
      todos: [...this.state.todos, todo]
    })
  }
  removeTodo(index) {
    this.setState({
      todos: this.state.todos.filter((e, i) => {
        return i !== index
      })
    });
  }

  render() {
    const todos = this.state.todos.map((todo, i) => {
      return (
        <div className="col-md-12" key={i}>
          <div className="card mt-4 mb-4">
            <div className="card-title text-center">
              <h3>{todo.title}</h3>
              <span className="badge badge-pill badge-danger ml-2">
                {todo.priority}
              </span>
            </div>
            <div className="card-body">
              {todo.description}
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-danger"
                onClick={this.removeTodo.bind(this, i)}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )
    });

      /*
    // acá actualizo el componente y recorro el estado com map
    const messages = this.state.messages.map((message, index) => {
      console.log('todo en FACE: '+ JSON.stringify(message));
      
      return <li key={index}>
        <b>{message.usuario}: {message.mensaje}</b>
        
      </li>
      
      
    }
    
    );
    */
    // el return devuelve el conenido
    return(
      
        <div>       
            <div className="container-fluid">        
              <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                  Casos
                  <span className="badge badge-pill badge-light ml-2">
                    {this.state.todos.length}
                  </span>
                </a>
                FACE Versión 10.1
                <div className="col-md-4 col-md-offset-1 someclass">
                  <input type="button" defaultValue="Estado" className="btn btn-outline-success" />
                  <input type="button" defaultValue="Logoff usuario" id="btnLogoff" className="btn btn-outline-success"/>
                  <input type="button" defaultValue="PAUSAR" id="btnPausar" className="btn btn-outline-success"/>
                  <input type="button" defaultValue="Llamar" id="btnLlamar" className="btn btn-outline-success"/>
                  <input type="button" defaultValue="Cortar" id="btnCortar" className="btn btn-outline-success"/>
                  <input type="button" defaultValue="Transferir" id="btnTransferir" className="btn btn-outline-success"/>    
                </div>
              </nav>

              
            </div>
            <div className="container-fluid">
                <div className="row">
                  <div className="col col-lg-2">
                                          
                      <TodoForm onAddTodo={this.handleAddTodo}></TodoForm>
                    
                    
                      
                        {todos}
                 
                
                  </div>
                  <div className="col col-lg-10">
                    <div className="row">
                      
                      <p>WORKFLOW </p>  <img src={Flecha} height="30px"/>
                   
                    </div>
                    
                      <h1>CONTEXTO</h1>      
                      
                  </div>
                </div>
            </div>
            
            <div className="container-fluid">        
                <div className="row mt-4">
                    <div className="col-md-1 text-center datos-face">
                    <input type="text" id="ani" placeholder="ANI" className="form-control"/>
                    <input type="text" id="agente" placeholder="Agente" className="form-control"/>
                    <input type="text" id="campania" placeholder="Campaña" className="form-control"/>
                    <input type="text" id="llamar" placeholder="Numero a llamar" className="form-control"/>
                    <input type="text" id="transferir" placeholder="Número a transferir" className="form-control"/>
                    <input type="text" id="uniqueid" placeholder="UniqueID" className="form-control"/>
                    <input type="text" id="channel" placeholder="Channel" className="form-control"/>
                    </div>
                </div>
            <hr/>
            
            </div>
            <div className="container-fluid">
              <div className="row mt-4">
                <Chat/>
              </div>
            </div>
      </div>
    
    

      // FINN
    )
  }
}


export default Face;


//ReactDOM.render(<Chat/>, document.getElementById('root'));
