import React, { Component } from 'react';
import axios from "axios";
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemInformation = this.itemInformation.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    console.log(e.target.name + ": " + e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.itemInformation();
  }

  async itemInformation() {
    const res = await axios.get('/runescape/items');
    const body = await res.data;
    console.log(body);
    this.setState({ items: body });
  }

  render() {
    return (
      <div>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <Button type="submit" bsStyle="primary">Fetch</Button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default SingleItem;
