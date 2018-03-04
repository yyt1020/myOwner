
export default {
  arrayContains : function (obj) {
  let i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}
}
