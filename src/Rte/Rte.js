import React, { Component } from "react";
import classNames from "classnames";
import "./css/Rte.less";
import Menu from "./Menu/Menu";

const commands = ["bold", "italic"];

class Rte extends Component {
  constructor(props) {
    super(props);
    this._container = React.createRef();
    this.state = {
      html: "",
      innerText: "",
      textContent: "",
      counter: 0,
      _inComposition: false,
      activeList: []
    };
    document.execCommand("styleWithCSS", false, true);
  }
  // 统一事件处理
  _editorCommonHandler(d) {
    // 字数统计
    if (!this.state._inComposition)
      d.counter = d.textContent.replace(/\s*/g, "").length;
    // 触发input
    this.setState(d, () => {
      this.props.onInput(this.state);
    });
  }
  // keydown事件处理
  _editorKeydownHandler(e) {
    this._backspaceKeydownHandler(e);
  }
  // keyup事件处理
  _editorKeyupHandler(e) {
    this.setState({
      activeList: this._queryCommandState(commands)
    });
    this._backspaceKeyupHandler(e);
  }
  // mousedown事件处理
  _editorMousedownHandler(e) {
    this.setState({
      activeList: this._queryCommandState(commands)
    });
  }
  // mouseup事件处理
  _editorMouseupHandler(e) {
    this.setState({
      activeList: this._queryCommandState(commands)
    });
  }
  _queryCommandState(arr) {
    return arr.filter(item => document.queryCommandState(item));
  }
  _backspaceKeyupHandler(e) {
    if (e.keyCode !== 8) return;
    let html = e.target.innerHTML.toLowerCase().trim();
    if (html === "<p><br/></p>" || html === "<p><br></p>") e.preventDefault();
    if (!html || html === "<br/>" || html === "<br>")
      e.target.innerHTML = "<p><br/></p>";
  }
  _backspaceKeydownHandler(e) {
    if (e.keyCode !== 8) return;
    let html = e.target.innerHTML.toLowerCase().trim();
    if (html === "<p><br/></p>" || html === "<p><br></p>") e.preventDefault();
  }

  // input事件
  _editorInputHandler(e) {
    let d = {
      html: e.target.innerHTML,
      innerText: e.target.innerText,
      textContent: e.target.textContent
    };

    this._editorCommonHandler(d);
  }
  // 输入法输入事件
  _editorCompositionstartHandler() {
    this.setState({
      _inComposition: true
    });
  }
  _editorCompositionendHandler(e) {
    this.setState({
      _inComposition: false,
      counter: e.target.textContent.replace(/\s*/g, "").length
    });
  }
  _tryChangeActivity() {}
  // 焦点模糊
  focus() {
    this._container.current.focus();
  }
  blur() {
    this._container.current.blur();
  }
  // 设置并覆盖全部内容
  setInnerHtml(html) {
    this._container.current.innerHTML = html;
    let d = {
      html: this._container.current.innerHTML,
      innerText: this._container.current.innerText,
      textContent: this._container.current.textContent
    };
    this._editorCommonHandler(d);
    let selObj = window.getSelection();
    selObj.selectAllChildren(this._container.current);
  }
  render() {
    var containerClass = classNames("Rte-container", {
      empty: this.state.textContent.length < 1
    });
    var wrapClass = classNames("Z-Rte Rte-wrap");

    return (
      <section className={wrapClass} onClickCapture={this.focus.bind(this)}>
        <Menu activeList={this.state.activeList} />
        <div
          className={containerClass}
          ref={this._container}
          contentEditable
          suppressContentEditableWarning
          placeholder={this.props.placeholder || "Compose an epic..."}
          onKeyDown={this._editorKeydownHandler.bind(this)}
          onKeyUp={this._editorKeyupHandler.bind(this)}
          onMouseDown={this._editorMousedownHandler.bind(this)}
          onMouseUp={this._editorMouseupHandler.bind(this)}
          onInput={this._editorInputHandler.bind(this)}
          onCompositionEnd={this._editorCompositionendHandler.bind(this)}
          onCompositionStart={this._editorCompositionstartHandler.bind(this)}
        >
          <p>
            <br />
          </p>
        </div>
        {this.props.counter && (
          <i className="counter" data-count={this.state.counter} />
        )}
      </section>
    );
  }
}
export default Rte;
