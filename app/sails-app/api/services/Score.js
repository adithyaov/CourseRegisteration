module.exports = {
  get: function (type) {
    switch (type) {
      case 'user': return 1;
      case 'owner': return 2;
      case 'admin': return 3;
      default: return 0;
    }
  }
}
