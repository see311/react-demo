import React, { Component } from "react";
import { Button } from "antd";
import Rte from "./Rte/Rte.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "",
      textContent: ""
    };
  }
  getHtml() {
    this.state.html.trim() && alert(this.state.html);
  }
  getText() {
    this.state.textContent.trim() && alert(this.state.textContent);
  }
  focus() {
    this.rte.focus();
  }
  blur() {
    this.rte.blur();
  }
  setInnerHtml() {
    this.rte.setInnerHtml("<p>test<span>demo</span></p>");
  }
  onInput(v) {
    this.setState({ html: v.html, textContent: v.textContent });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Rich text editor</h1>
          <h2>Rich text editor</h2>
          <h3>Rich text editor</h3>
          <h4>Rich text editor</h4>
          <h5>Rich text editor</h5>
          <h6>Rich text editor</h6>
        </header>
        <h1>Rich text editor</h1>
        <h2>Rich text editor</h2>
        <h3>Rich text editor</h3>
        <h4>Rich text editor</h4>
        <h5>Rich text editor</h5>
        <h6>Rich text editor</h6>
        <section style={{ padding: 20 }}>
          <Rte
            ref={node => {
              this.rte = node;
            }}
            onInput={this.onInput.bind(this)}
            placeholder="请输入……"
            counter
          />
        </section>
        <footer className="App-footer">
          <Button type="primary" onClick={this.getHtml.bind(this)}>
            innerHtml
          </Button>
          <Button type="primary" onClick={this.setInnerHtml.bind(this)}>
            setInnerHtml
          </Button>
          <Button type="primary" onClick={this.getText.bind(this)}>
            textContent
          </Button>
          <Button type="primary" onClick={this.focus.bind(this)}>
            focus
          </Button>
          <Button type="primary" onClick={this.blur.bind(this)}>
            blur
          </Button>
        </footer>
      </div>
    );
  }
}

export default App;
