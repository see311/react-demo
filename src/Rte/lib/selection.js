/**
 * 选区处理
 */
export default class Selection {
  constructor() {
    this._currentRange = null;
  }
  saveRange(_range) {
    if (_range) {
      this._currentRange = _range;
      return;
    }
  }
  getRange() {
    return this._currentRange;
  }
  isEmptyRange() {
    const range = this._currentRange;
    if (range && range.startContainer)
      return (
        range.startContainer === range.endContainer &&
        range.startOffset === range.endOffset
      );
    return false;
  }
}
