'use strict';

var React = require('react');
var NoteList = require('./components/notes_list.jsx');
var request = require('superagent');

var App = React.createClass({
  getInitialState: function() {
    return {notes: [], title: "Notes: "};
  },
  componentDidMount: function() {
    request
      .get('/api/notes')
      .end(function(err, res) {
        if(err) return console.log(err);

        this.setState({notes: res.body});
      }.bind(this));
  },
  render: function() {
    return (
      <main>
        <h1>{this.state.title}</h1>
        <NoteList data={this.state.notes} />
      </main>
    )
  }
});

React.render(<App />, document.body);
