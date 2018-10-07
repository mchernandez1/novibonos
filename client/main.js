import React from 'react';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './main.html';
import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.js';
import Highcharts from 'highcharts';


Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

Template.login.helpers({
  getEmail() {
    return Meteor.user().emails && Meteor.user().emails[0].address;
  }
});

Template.login.events({
  'click button.log-in'(event) {
    event.preventDefault();
    Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
      if (err) {
        console.log('Handle errors here: ', err);
      }
    });
  },
  'click button.log-out'(event) {
    event.preventDefault();
    Meteor.logout();
  }
});


function createHigh() {
  $('#container').highcharts({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Puntos de pareja mensual'
    },
    xAxis: {
      categories: ['Octubre', 'Noviembre', 'Diciembre']
    },
    yAxis: {
      title: {
        text: 'Punto de cada uno'
      },
    },
    series: [
      {
        name: 'Laura',
        data: [10, 0, 0]
      }, {
        name: 'Juan',
        data: [25, 0, 0]
      }
    ]
  });
}

Template.Test.onCreated(function() {
});

Template.Test.onRendered(function() {
  this.autorun(() => {
    createHigh();
  });
});