import React, { Component } from 'react';
import axios from "axios";
import { Button, Table } from 'react-bootstrap';
import Autocomplete from 'react-autocomplete';

const rSItems = require('../assets/rs_items.json');

class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: '',
      item: '',
      allItems: rSItems,
      name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.itemInformation = this.itemInformation.bind(this);
    this.handleID = this.handleID.bind(this);

  }

  handleID(e) {
    this.setState({ name: e });
    this.state.allItems.find((element) => {
      if(element.name === e){
        this.setState({ itemID: element.id });
      }
      return element.name === e;
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.handleID(this.state.name);
    //console.log(this.state.name);
    this.itemInformation();
  }

  async itemInformation() {
    const res = await axios.post('/runescape/item', {itemID: this.state.itemID});
    //console.log(res);
    const body = await res.data;
    this.setState({ item: body });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Autocomplete
            items={this.state.allItems}
            shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.name}
            renderItem={(item, highlighted) =>
              <div
                key={item.id}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                >
                {item.name}
              </div>
            }
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            onSelect={value => this.setState({ name: value })}
            />
          <Button type="submit" bsStyle="primary">Submit</Button>
        </form>
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Todays Change</th>
              <th>Daily Price</th>
              <th>Average Price</th>
              <th>Store Price</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Buy Quantity</th>
              <th>Sell Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ this.state.item.id }</td>
              <td>{ this.state.item.name }</td>
              <td>{ this.state.item.price }</td>
              <td>{ this.state.item.todayChange }</td>
              <td>{ this.state.item.dailyPrice }</td>
              <td>{ this.state.item.averagePrice }</td>
              <td>{ this.state.item.storePrice }</td>
              <td>{ this.state.item.sellPriceAv }</td>
              <td>{ this.state.item.buyPriceAv }</td>
              <td>{ this.state.item.buyQ }</td>
              <td>{ this.state.item.sellQ }</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SingleItem;
