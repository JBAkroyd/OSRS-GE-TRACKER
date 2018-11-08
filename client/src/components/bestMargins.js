import React, { Component } from 'react';
import axios from "axios";
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Checkbox } from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const columns = [{
  Header: '#',
  accessor: 'id'
},{
  Header: 'Name',
  accessor: 'name',
  width: 230,
},{
  Header: 'Store Price',
  accessor: 'sp'
},{
  Header: 'Buy Price',
  accessor: 'sell_average'
},{
  Header: 'Sell Price',
  accessor: 'buy_average'
},{
  Header: 'Profit',
  accessor: 'profit'
},{
  Header: 'Buy Quantity',
  accessor: 'buy_quantity'
},{
  Header: 'Sell Quantity',
  accessor: 'sell_quantity'
},]

class BestMargins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalGold: 9999999999,
      sales: 0,
      member: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemInformation = this.itemInformation.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        <ReactTable
          defaultSortDesc={true}
          data={items}
          columns={columns} />
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }
}

export default BestMargins;
