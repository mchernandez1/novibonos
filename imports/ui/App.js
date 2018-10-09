import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
// Mismo consejo del api, esta no es buena práctica, sobre todo cuando se tienen muchas más collecciones
// Deberían tener tasks.js y juntos.js
import { Tasks } from '../api/collections.js';
import { Juntos } from '../api/collections.js';
import Task from './Task.js';
import Junto from './Junto.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';


// A manera de consejo: No está mal poner la página principal de la app en este App.js, pero es mejor si modularizan 
// y crean un componente para esto. Esto ayuda sobre todo en términos de modificabilidad

// App component - represents the whole app
class App extends Component {
  constructor(props){
    super(props);
  }

  handleSubmitTasks(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const textTask = ReactDOM.findDOMNode(this.refs.textTaskInput).value.trim();
    const pointsTask = parseInt(ReactDOM.findDOMNode(this.refs.numTaskInput).value);

    Meteor.call('tasks.insert', [textTask, pointsTask]);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textTaskInput).value = '';
    ReactDOM.findDOMNode(this.refs.numTaskInput).value = '';
  }

  handleSubmitJuntos(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const textJuntos = ReactDOM.findDOMNode(this.refs.textJuntosInput).value.trim();
    const pointsJuntos = parseInt(ReactDOM.findDOMNode(this.refs.numJuntosInput).value);

    Meteor.call('juntos.insert', [textJuntos, pointsJuntos]);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textJuntosInput).value = '';
    ReactDOM.findDOMNode(this.refs.numJuntosInput).value = '';
  }


  renderTasks() {

    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  renderJuntos() {

    return this.props.juntos.map((junto) => (
      <Junto key={junto._id} junto={junto} />
    ));
  }

  render() {
    return (
      <div className="container">

        <header>

          <AccountsUIWrapper />

          <h1>Labores del hogar</h1>
          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmitTasks.bind(this)} >
              <fieldset>
                <input
                  type="text"
                  ref="textTaskInput"
                  placeholder="Añadir tarea"
                />

                <input
                  type="number"
                  ref="numTaskInput"
                  placeholder="Añadir puntos"
                />

                <button type="submit" value="submit">Agregar</button>
              </fieldset>
            </form> : ''
          }

        </header>

        <ul>
          {this.renderTasks()}
        </ul>

        <header>
          <h1>Actividades juntos</h1>
          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmitJuntos.bind(this)} >
              <fieldset>
                <input
                  type="text"
                  ref="textJuntosInput"
                  placeholder="Añadir atividad juntos"
                />

                <input
                  type="number"
                  ref="numJuntosInput"
                  placeholder="Añadir puntos"
                />

                <button type="submit" value="submit">Agregar</button>
              </fieldset>
            </form> : ''
          }
        </header>

        <ul>
          {this.renderJuntos()}
        </ul>

      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  Meteor.subscribe('juntos');
  
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    juntos: Juntos.find({}, { sort: {createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };})(App);
