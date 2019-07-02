

import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import '../css/Face.css'
import '../css//bootstrap/bootstrap.min.css';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }
// RECIBO EL MENSAJE
  componentDidMount () {
    this.socket = io('/')
    this.socket.on('message', message => {
      // acá se guarda el estado
      this.setState({ messages: [message, ...this.state.messages]});
      console.log("componentDidMount:: mensaje -->>> "+JSON.stringify(message));
    })
  }
// ENVÍO MENSAJE AL SERVIDOR
  handleSubmit () {
    let mensaje = document.getElementById('mensaje').value;//event.target.value
    let usuario = document.getElementById('usuario').value;
   
     console.log("handleSubmit:: enviando --- ");
      const message = {
        usuario: usuario,
        mensaje:mensaje
      }
      // acá guardo el estado
      this.setState({ messages: [message, ...this.state.messages]});
      console.log("handleSubmit:: mensaje -->> "+JSON.stringify(message));
      this.socket.emit('message', message)    
  }

  render() {
    // acá actualizo el componente y recorro el estado com map
    const messages = this.state.messages.map((message, index) => {
      console.log('todo: '+ JSON.stringify(message));
      return <li key={index}>
        <b>{message.usuario}: {message.mensaje}</b>
        
      </li>
      
    });
    // el return devuelve el conenido
    return(
    <div className="container-fluid chat">
        <h1>Chat y logs...</h1>
        {messages}      
      <div className="row mt-4">
          
        <div className="col-md-3 text-center">
          <input type="text" placeholder='Ingrese usuario' id="usuario" className="form-control"/>
          <input type="text" id="mensaje" placeholder='Ingrese su mensaje' className="form-control"/>            
          <button type="button" className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Enviar</button>
        </div>
      </div>
    </div>

      // FINN
    )
  }
}

export default Chat;
//ReactDOM.render(<Chat/>, document.getElementById('root'));
