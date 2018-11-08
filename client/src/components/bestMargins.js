import React, { Component } from 'react';
import axios from "axios";
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table, Checkbox } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class BestMargins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalGold: '',
      sales: '',
      member: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemInformation = this.itemInformation.bind(this);
    this.itemRow = this.itemRow.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  itemRow(item) {
    return (
      <tr>
      <td>{ item.id }</td>
      <td>{ item.name }</td>
      <td>{ item.sp }</td>
      <td>{ item.sell_average }</td>
      <td>{ item.buy_average }</td>
      <td>{ item.buy_average - item.sell_average }</td>
      <td>{ item.buy_quantity }</td>
      <td>{ item.sell_quantity }</td>
      </tr>
    );
  }

  async handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.itemInformation();
  }

  async itemInformation() {
    const res = await axios.post('/runescape/items', { totalGold: this.state.totalGold, sales: this.state.sales, member: this.state.member});
    //console.log(res);
    const body = await res.data;
    this.setState({ items: body }, () => { this.forceUpdate() });
  }

  render() {
    if(this.state.items) {
      var items = this.state.items;
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
        <FieldGroup
        id="formControlsTotalGold"
        type="text"
        label="Total Gold"
        name="totalGold"
        placeholder="Enter Gold"
        value={this.state.totalGold}
        onChange={this.handleChange}
        />
        <FieldGroup
        id="formControlsSales"
        type="text"
        label="Sales"
        name="sales"
        placeholder="Enter Sales"
        value={this.state.sales}
        onChange={this.handleChange}
        />
      <Checkbox onChange={() => {
          if(this.state.member){
            this.setState({ member: false });
          }
          else {
            this.setState({ member: true });
          }
        }}>Member</Checkbox>
        <Button type="submit" bsStyle="primary">Submit</Button>
        </form>
        <Table striped bordered condensed hover responsive>
        <thead>
        <tr>
        <th>#</th>
        <th>Name</th>
        <th>Store Price</th>
        <th>Buy Price</th>
        <th>Sell Price</th>
        <th>Profit</th>
        <th>Buy Quantity</th>
        <th>Sell Quantity</th>
        </tr>
        </thead>
        <tbody>
        {this.state.items.map((item) => this.itemRow(item))}
        </tbody>
        </Table>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }
}

export default BestMargins;
