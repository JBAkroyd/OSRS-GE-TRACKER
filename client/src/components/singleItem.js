import React, { Component } from 'react';
import axios from "axios";
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

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
      itemID: '',
      item: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemInformation = this.itemInformation.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){
    document.addEventListener("keydown", this.changePrice, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.changePrice, false);
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
    const res = await axios.post('/runescape/item', {itemID: this.state.itemID});
    //console.log(res);
    const body = await res.data;
    console.log(body);
    this.setState({ item: body });
  }

  render() {
    return (
      <div>
      <p>{this.state.response}</p>
      <form onSubmit={this.handleSubmit}>
      <FieldGroup
      id="formControlsItemID"
      type="text"
      value={this.state.value}
      placeholder="Enter text"
      onChange={this.handleChange}
      name="itemID"
      label="Item ID"
      />
      <Button type="submit" bsStyle="primary">Submit</Button>
      </form>
      <Table striped bordered condensed hover responsive>
      <thead>
      <tr>
      <th>#</th>
      <th>Price</th>
      <th>Minimum</th>
      <th>Maximum</th>
      <th>Mean</th>
      <th>Median</th>
      <th>Mode</th>
      <th>Mode Min</th>
      <th>Mode Max</th>
      <th>Range</th>
      <th>Lower Quartile</th>
      <th>Upper Quartile</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>{ this.state.itemID }</td>
      <td>{ this.state.item.price }</td>
      <td>{ this.state.item.minimum }</td>
      <td>{ this.state.item.maximum }</td>
      <td>{ this.state.item.mean }</td>
      <td>{ this.state.item.median }</td>
      <td>{ this.state.item.mode}</td>
      <td>{ this.state.item.modeMin }</td>
      <td>{ this.state.item.modeMax }</td>
      <td>{ this.state.item.range }</td>
      <td>{ this.state.item.lowerQuartile }</td>
      <td>{ this.state.item.upperQuartile }</td>
      </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default SingleItem;
