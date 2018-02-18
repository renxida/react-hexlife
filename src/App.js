import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hex from './Hex.jsx';
import { gridPoints } from './utils';

class HexBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            ncells_x: props.ncells_x,
            ncells_y: props.ncells_y,
            color0: props.color0,
            color1: props.color1,
            biomap: props.biomap,
        };
    }

    render() {
        let hex_size = Math.min(
                this.state.width / this.state.ncells_x,
                this.state.height / this.state.ncells_y
                )

        const grid_points = gridPoints(
                'pointy-topped',
                0, 0,
                hex_size,
                this.state.ncells_x,
                this.state.ncells_y,
                );
        const get_color = (x, y) => this.state.biomap[x][y]?this.state.color1:this.state.color2;

        const hexmaker = ({ props, gridX, gridY }) => ( <Hex {...props} fill={get_color(gridX, gridY)} stroke="black"> );
        const hexes = grid_points.map(hexmaker);
        return (
                <svg width={this.state.width}
                     height={this.state.height}>
                     {hexes}
                </svg>
               );
    }


};

class App extends Component{
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <HexBoard width={500} height={500} color0='black' color1='red' ncells_x={25} ncells_y={25} />
      </div>
    );
  }
}

export default App;
