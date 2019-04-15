import React, { PureComponent } from "react";
import "./Emoji.css";
import emojiArr from "./Emoji.json";
import classNames from "classnames";
import { Dropdown } from "antd";
function insertHtml(e) {
  var text = e.target.textContent;
  document.execCommand("insertHTML", false, text);
  var selObj = window.getSelection();
  selObj && selObj.collapseToEnd();
}
const EmojiList = (
  <ul className="Rte-panel Rte-panel-emoji">
    {emojiArr.map((e, i) => (
      <li key={i} onClick={insertHtml}>
        <span>{e}</span>
      </li>
    ))}
  </ul>
);
class Emoji extends PureComponent {
  constructor(props) {
    super(props);
    this.inClicking = false;
    this.state = {
      _active: false,
      visible: false
    };
  }
  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };
  render() {
    const active = this.inClicking ? this.state._active : this.props.active;
    var iClass = classNames(`Rte-icon-emoji`, {
      active: active
    });
    this.nowActive = active;

    return (
      <Dropdown
        overlay={EmojiList}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
        placement="topCenter"
      >
        <button className="Rte-menu-button" title="emoji">
          <i className={iClass} />
        </button>
      </Dropdown>
    );
  }
}
export default Emoji;
