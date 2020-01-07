/**
 * Fake $ element
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
 * Thêm sự kiện cho một element
 * @param {Element} target Element muốn thêm sự kiện
 * @param {String} type Loại sự kiện
 * @param {Function} callback callback funtion
 */
const $on = (target, type, callback) => {
    target.addEventListener(type, callback);
};

/**
 * Xoá sự kiện của một element
 * @param {Element} target Element muốn xoá sự kiện
 * @param {String} type Loại sự kiện
 * @param {Function} callback callback funtion
 */
const $off = (target, type, callback) => {
  target.removeEventListener(type, callback);
};

/**
   * Hiển thị image
   * @param {Element} activeElement Image đang được hiển thị
   * @param {Element} imageFirst Thẻ image đầu tiên trong 1 Nodelist
   */
const displayImage = (activeElement, imageFirst) => {
  if (activeElement.nextElementSibling) {
    activeElement.nextElementSibling.style.display = "block";
    activeElement.nextElementSibling.setAttribute("data-active", "active");
  } else {
    imageFirst.style.display = "block";
    imageFirst.setAttribute("data-active", "active");
  }
  activeElement.style.display = "none";
  activeElement.removeAttribute("data-active");
};

export { $, $on, $off, displayImage };