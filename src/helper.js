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
    activeElement.nextElementSibling.style.display = "block";
    activeElement.nextElementSibling.setAttribute("data-active", "active");
  } else {
    firstImage.style.display = "block";
    firstImage.setAttribute("data-active", "active");
  }
  activeElement.style.display = "none";
  activeElement.removeAttribute("data-active");
};

export { $, $on, $off, displayImage };