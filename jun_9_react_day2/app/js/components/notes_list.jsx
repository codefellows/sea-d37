'use strict';

var React = require('react');
var Note = require('./note.jsx');

module.exports = React.createClass({
  renderNotes: function() {
    return this.props.data.map(function(note) {
      return <Note data={note} key={note._id}/>;
    });
  },
  render: function() {
    return (
      <ul>
        {this.renderNotes()}
      </ul>
    )
  }
});
