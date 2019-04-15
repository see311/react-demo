import React, { PureComponent } from "react";
import classNames from "classnames";
const iconName = {
  bold: "bold",
  italic: "italic",
  removeFormat:'trash-o'
};
class MenuButton extends PureComponent {
  constructor(props) {
    super(props);
    this.inClicking = false;
    this.state = {
      _active: false
    };
  }
  _execCommand(e, type) {
    document.execCommand(type, false);
    if (this.props.active !== undefined) {
      this.inClicking = true;
      this.setState(
        {
          _active: !this.nowActive
        },
        () => {
          this.inClicking = false;
        }
      );
      this.forceUpdate();
    }
  }
  render() {
    var iClass = `Rte-icon-${iconName[this.props.type]}`;
    if (this.props.active !== undefined) {
      const active = this.inClicking ? this.state._active : this.props.active;
      iClass = classNames(`Rte-icon-${this.props.type}`, {
        active: active
      });
      this.nowActive = active;
    }

    return (
      <button
        className={`Rte-menu-button Rte-menu-${this.props.type}`}
        onClick={e => this._execCommand.call(this, e, this.props.type)}
        title={this.props.title}
      >
        <i className={iClass} />
      </button>
    );
  }
}
export default MenuButton;
