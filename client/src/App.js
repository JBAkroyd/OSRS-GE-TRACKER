import React, { Component } from 'react';
import SingleItem from './components/singleItem';
import BestMargins from './components/bestMargins';

import {Grid, Row, Col} from 'react-bootstrap';
//To centre columns it is 12-(col-size)/2 mdCol={6} mdOffset={3}
class App extends Component {

  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col md={11} mdOffset={1}>
              <SingleItem />
              <BestMargins />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
