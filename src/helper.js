/**
 * Get Dom element
 * @param {Element} scope Tên element muốn query
 * @param {String} selector Tên class, id, tagName
 * @param {String} typeQuery Chọn kiểu muốn query Node hoặc NodeList
 * @return {NodeList} type query là NodeList
 * @return {Node} type query là Node
 */
const $ = (scope, selector, typeQuery = "Node") => {
  if (typeQuery === "NodeList") {
    return scope.querySelectorAll(selector);
  }
  return scope.querySelector(selector);
};

/**
 * Add event for element
 * @param {Element} target Element muốn thêm sự kiện
 * @param {String} type Loại sự kiện
 * @param {Function} callback callback funtion
 */
const $on = (target, type, callback) => {
  target.addEventListener(type, callback);
};

/**
 * Remove event for element
 * @param {Element} target Element muốn xoá sự kiện
 * @param {String} type Loại sự kiện
 * @param {Function} callback callback funtion
 */
const $off = (target, type, callback) => {
  target.removeEventListener(type, callback);
};

/**
 * Hide and show next image
 * @param {Element} activeElement Image is showing and will be hided
 * @param {Element} firstImage First image in HTML Elements
 */
const displayImage = (activeElement, firstImage) => {
  if (activeElement.nextElementSibling) {
    activeElement.nextElementSibling.style.visibility = "visible";
    activeElement.nextElementSibling.style.opacity = "1";
    activeElement.nextElementSibling.style.position = "static";
    activeElement.nextElementSibling.classList.add("active");
  } else {
    firstImage.style.visibility = "visible";
    firstImage.style.opacity = "1";
    firstImage.style.position = "static";
    firstImage.classList.add("active");
  }
  activeElement.style.visibility = "hidden";
  activeElement.style.opacity = "0";
  activeElement.style.position = "absolute";
  activeElement.classList.remove("active");
};

/**
 * (c) https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * Get random charactor
 * @param {Number} length - Length of string
 */
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export { $, $on, $off, displayImage, makeid };
