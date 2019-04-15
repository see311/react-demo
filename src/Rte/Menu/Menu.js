import React, { Component } from "react";
import Bold from "./Bold/Bold";
import Italic from "./Italic/Italic";
import RemoveFormat from "./RemoveFormat/RemoveFormat";
import Emoji from "./Emoji/Emoji";

import "../css/menu.less";

class Menu extends Component {
  render() {
    return (
      <div className="Rte-menu">
        <ul className="Rte-menu-list">
          <li className="Rte-menu-item">
            <Bold active={this.props.activeList.includes("bold")} />
          </li>
          <li className="Rte-menu-item">
            <Italic active={this.props.activeList.includes("italic")} />
          </li>
          <li className="Rte-menu-item">
            <RemoveFormat />
          </li>
          <li className="Rte-menu-item">
            <Emoji />
          </li>
        </ul>
      </div>
    );
  }
}
export default Menu;
