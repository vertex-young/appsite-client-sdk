var asTapCategoryItem = function (e, scope, name) {
  name = name || 'category';
  let category = scope.data[name] || {};
  let asToggle = category.asToggle || false;

  let index = +e.currentTarget.id;
  let categoryItem = category.asItems[index];
  if (asToggle) {
    categoryItem.checked = !categoryItem.checked;
  } else if (categoryItem.checked) {
    return categoryItem;
  } else {
    categoryItem.checked = true;
  }

  category.asItems.forEach(function(item){
    if (item.id != categoryItem.id) {
      if (item.checked) {
        item.checked = false;
      }
    }
  });

  let newdata = {};
  newdata[name] = category;
  scope.setData(newdata);

  return categoryItem;
}

var asCategoryScroll = function (e, scope, name) {
  name = name || 'category';
  let category = scope.data[name] || {};
  let isFold = category.isFold;

  if (!isFold) {
    return;
  }

  category.asScrollLeft = e.detail.scrollLeft;
  if (category.asScrollLeft < 30) {
    console.log(e)
    category.asScrollLeft=undefined;
  }
  let newdata = {};
  newdata[name] = category;
  scope.setData(newdata);
}

module.exports = {
  asCategoryScroll: asCategoryScroll,
  asTapCategoryItem: asTapCategoryItem
};