var asCarouselChange = function (e, scope, name) {
  name = name || 'carousel';
  let carousel = scope.data[name] || {};
  carousel['asCurrent'] = e.detail.current;

  let newdata = {};
  newdata[name] = carousel;
  scope.setData(newdata);
}
module.exports = {
  asCarouselChange: asCarouselChange
};