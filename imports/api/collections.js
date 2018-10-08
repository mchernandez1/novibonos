import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// Las colecciones deberían estar modularizadas para que la aplicación sea más escalable en el tiempo.

// Depronto tengan en cuenta en que idioma van a nombrar las colecciones  
// porque tienen una base de datos con nombres de colecciones en ambos idiomas.

// Debería existir un archivo para "tasks"
export const Tasks = new Mongo.Collection('tasks');

// Debería existir un archivo para "juntos"
export const Juntos = new Mongo.Collection('juntos');

if (Meteor.isServer) {
  // This code only runs on the server

  // ¿Las tareas no deberían ser solamente vistas por los usuarios que las crearon?
  // Usen el "Meteor.userId()" en el metodo de find para ambas publicaciones como valor del atributo "owner"
  
  Meteor.publish('tasks', function tasksPublication() { 
    return Tasks.find();
  });

  Meteor.publish('juntos', function juntosPublication(){
    return Juntos.find();
  });
}

Meteor.methods({

  /////////////////////////// Metodos para labores ////////////////////////////
  'tasks.insert'(data) {

    let textTask = data[0];
    let pointsTask = parseInt(data[1]);

    check(textTask, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      textTask,
      pointsTask,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },

  ///////////////////////////Metodos para juntos//////////////////////////////
  'juntos.insert'(data) {

    let textJuntos = data[0];
    let pointsJuntos = parseInt(data[1]);

    check(textJuntos, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Juntos.insert({
      textJuntos,
      pointsJuntos,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    });
  },
  'juntos.remove'(taskId) {
    check(taskId, String);

    Juntos.remove(taskId);
  },
  'juntos.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Juntos.update(taskId, { $set: { checked: setChecked } });
  },
});
