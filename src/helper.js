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
    activeElement.nextElementSibling.style.position = "unset";
    activeElement.nextElementSibling.classList.add("active");
  } else {
    firstImage.style.visibility = "visible";
    firstImage.style.opacity = "1";
    firstImage.style.position = "unset";
    firstImage.classList.add("active");
  }
  activeElement.style.visibility = "hidden";
  activeElement.style.opacity = "0";
  activeElement.style.position = "absolute";
  activeElement.classList.remove("active");
};

export { $, $on, $off, displayImage };
