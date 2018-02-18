import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hex from './Hex.jsx';
import { gridPoints } from './utils';
import HexlifeGenerator from './HexlifeGenerator';

class HexBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            color0: props.color0,
            color1: props.color1,
            gentime: props.gentime,
            gen: 0,
            biomap: props.biomap,
            hexlife_generator: HexlifeGenerator(25, 25),
        }
    }
    componentDidMount() {
        this.interval = setInterval(this.nextgen.bind(this), this.state.gentime);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    nextgen() {
        console.log('tick');
        this.setState({gen: this.state.gen + 1,
                       color1: this.state.color1==='blue'?'red':'blue',
                       biomap: this.state.hexlife_generator.next().value,
        });


    }

    render() {
        const biomap = this.state.biomap;
        const hexmaker =({ props, gridX, gridY }) => (
                <Hex {...props} fill={biomap?
                    (biomap[gridX][gridY]?this.state.color1:this.state.color0)
                    : 'black'} stroke="black" />)
        const hexes = gridPoints('pointy-topped', 100, 100, 10, 25, 25).map(hexmaker);

  return (
    <div>
    <p>
        Generation: {this.state.gen}
    </p>
    <svg width={this.state.width} height="500">
      {hexes}
    </svg>
    </div>
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
        <HexBoard gentime={1000} width={1000} height={500} color0='black' color1='red' ncells_x={25} ncells_y={25} />
      </div>
    );
  }
}

export default App;
