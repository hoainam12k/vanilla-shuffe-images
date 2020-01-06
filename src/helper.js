/**
 * Fake $ element
 * @param {Element} scope tên element muốn query
 * @param {String} selector tên class, id, tagName
 * @param {String} type chọn Node hoặc là đơn
 */
const $ = (scope, selector, typeQuery = "") => {
    if (typeQuery === "ALL") {
        return scope.querySelectorAll(selector);
    }
    return scope.querySelector(selector);
};

/**
 * Them su kien cho element
 * @param {*} target the muon them su kien
 * @param {*} type kieu su kien
 * @param {*} callback callback funtion
 */
const $on = (target, type, callback) => {
    target.addEventListener(type, callback);
};

export {
    $,
    $on,
}