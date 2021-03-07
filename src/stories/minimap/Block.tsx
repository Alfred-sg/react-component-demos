import React, { Component } from 'react';

const DEBUG = false;

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export class Dark extends Component<Props> {
  render() {
    if (DEBUG)
      console.log("render Dark")
    return (
      <div className={`card-container ${this.props.className ? this.props.className : ''}`} style={this.props.style}>
        <div className="box dark">
          <h2>Dark</h2>
        </div>
      </div>
    );
  }
}

export class Red extends Component<Props> {
  render() {
    if (DEBUG)
      console.log("render Red")
    return (
      <div className={this.props.className} style={this.props.style}>
        <div className="box red">
          <h2>Red</h2>
          <Dark />

        </div>
      </div>
    );
  }
}

export class Yellow extends Component<Props> {
  render() {
    if (DEBUG)
      console.log("render Yellow")
    return (
      <div className={this.props.className} style={this.props.style}>
        <div className="box yellow">
          <h2>Yellow</h2>
        </div>
      </div>
    );
  }
}