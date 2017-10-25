var asTapTabbarItem = function (e, scope, name) {
  name = name || 'asCurrent';
  let currentId = +e.currentTarget.id;
  if (scope.data[name] != currentId) {
    let newdata = {};
    newdata[name] = currentId;
    scope.setData(newdata);
  }
}
module.exports = {
  asTapTabbarItem: asTapTabbarItem
};