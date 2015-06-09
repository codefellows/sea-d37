'use strict';

var React = require('react');

//note component
module.exports = React.createClass({
  render: function() {
    return <li>{this.props.data.noteBody}</li>;
  }
});
