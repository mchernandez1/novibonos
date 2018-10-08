import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Juntos } from '../api/collections.js';

export default class Junto extends Component {

  toggleChecked() {

    // Set the checked property to the opposite of its current value
    Meteor.call('juntos.setChecked', this.props.junto._id, !this.props.junto.checked);
  }

  deleteThisJunto() {
    Meteor.call('juntos.remove', this.props.junto._id);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const juntoClassName = this.props.junto.checked ? 'checked' : '';

    return (
      <li className={juntoClassName}>
        <button className="delete" onClick={this.deleteThisJunto.bind(this)}>
          &times;
        </button>

        {/* <input
          type="checkbox"
          readOnly
          checked={!!this.props.junto.checked}
          onClick={this.toggleChecked.bind(this)}
        /> */}

        <span className="text">
          <strong>{this.props.junto.username}</strong>: {this.props.junto.textJuntos} / {this.props.junto.pointsJuntos}
        </span>
      </li>
    );
  }
}
