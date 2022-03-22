import React from "react";
import { Button, ButtonGroup } from 'react-bootstrap'

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.toggleOption = this.toggleOption.bind(this);
    this.getBsStyle = this.getBsStyle.bind(this);
    this.state = {
      selected: {
        A: false,
        B: false,
        C: false,
      }
    }
  }
  
  toggleOption(e) {
    const key = e.target.value; // e.g. 'A'
    const value = !this.state.selected[key];
    const newSelected = Object.assign(this.state.selected, {[key]: value});
    this.setState({ selected: newSelected });
    console.log('this.state', this.state);
  }
  
  getBsStyle(key) {
   return this.state.selected[key] ? 'primary' : 'default';
  }
  
  render() {
    return (
      <ButtonGroup>
        <Button onClick={this.toggleOption} value='A' bsStyle={this.getBsStyle('A')}>
          Option A
        </Button>
        <Button onClick={this.toggleOption} value='B' bsStyle={this.getBsStyle('B')}>
          Option B
        </Button>
        <Button onClick={this.toggleOption} value='C' bsStyle={this.getBsStyle('C')}>
          Option C
        </Button>
      </ButtonGroup>
      );
  }
}

export default Options