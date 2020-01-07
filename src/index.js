import { $, $on, $off, displayImage } from "./helper";

export default class ShuffleImages {
  /**
   *
   * @param {Object} options
   */
  constructor(options) {
    this.options = options;
    /**
     * @param {NodeList} shuffleImageElements Get NodeList 
     */
    this.shuffleImageElements = $(document, this.options.target, "NodeList");
    /**
     * @param {Boolean} isInit xét điều khiện init hoặc là destroy
     */
    this.isInit = true;
    /**
     * @param {number} distance Biến điều kiện để so sánh khi di chuyển chuột
     */
    this.distance = null;
    /**
     * @param {number} triggerTime Biến lưu trữ setInterval 
     */
    this.triggerTime = null;
    /**
     * @param {Node} triggerTime Node Element
     */
    this.node = null;

    /**
     * @param {Object} defaults options mặc định
     */
    this.defaults = {
      type: "imageMouseMove",
      mouseMoveTrigger: 200,
      hoverTrigger: 2000,
      scrollTrigger: 100
    };

    /**
     * @param {Object} settings options đầu vào
     */
    this.settings = {
      ...this.defaults,
      ...this.options
    };

    //* thay đổi con trỏ this của hàm
    this.imageMouseMoveHandler = this.imageMouseMoveHandler.bind(this);
    this.imageMouseOverHandler = this.imageMouseOverHandler.bind(this);
    this.imageMouseOverHandler = this.imageMouseOverHandler.bind(this);
    this.imageMouseOutHandler = this.imageMouseOutHandler.bind(this);
    this.documentScrollHandler = this.documentScrollHandler.bind(this);
  }

  /**
   * Hàm khởi tạo shuffle
   */
  init() {
    if (this.isInit) {
      this.isInit = false;
      if (this.shuffleImageElements.length > 0) {
        this.shuffleImageElements.forEach(el => {
          this.shuffleHandler(el);
        });
      }
      return;
    }
  }

  /**
   * Hàm huỷ shuffle
   */
  destroy() {
    if (!this.isInit) {
      this.isInit = true;
      if (this.shuffleImageElements.length > 0) {
        this.shuffleImageElements.forEach(el => {
          this.destroyShuffleHandler(el);
        });
      }
      return;
    }
  }

  /**
   * Hàm xử lý shuffle
   * @param {Node} elementNode 
   */
  shuffleHandler(elementNode) {
    const imgAllElement = $(elementNode,elementNode.firstElementChild.localName,"NodeList");
    this.node = elementNode;

    imgAllElement.forEach((imgEl, i) => {
      if (i !== 0) {
        imgEl.style.display = "none";
      } else {
        imgEl.setAttribute("data-active", "active");
      }
    });

    switch (this.settings.type) {
      case "imageMouseMove":
        $on(elementNode, "mousemove", this.imageMouseMoveHandler);
        break;
      case "imageHover":
        $on(elementNode, "mouseover", this.imageMouseOverHandler);
        $on(elementNode, "mouseout", this.imageMouseOutHandler);
        break;
      case "documentMouseMove":
        $on(document, "mousemove", this.imageMouseMoveHandler);
        break;
      case "documentScroll":
        $on(document, "scroll", this.documentScrollHandler);
        break;
      default:
        break;
    }
  }

  /**
   * Hàm huỷ shuffle và các sự kiện khác
   * @param {Node} elementNode 
   */
  destroyShuffleHandler(elementNode) {
    const imgAllElement = $(elementNode,elementNode.firstElementChild.localName,"NodeList");

    imgAllElement.forEach((imgEl, i) => {
      if (imgEl.hasAttribute("data-active") || imgEl.hasAttribute("style")) {
        imgEl.removeAttribute("data-active");
        imgEl.removeAttribute("style");
      }
    });

    switch (this.settings.type) {
      case "imageMouseMove":
        $off(elementNode, "mousemove", this.imageMouseMoveHandler);
        break;
      case "imageHover":
        $off(elementNode, "mouseover", this.imageMouseOverHandler);
        $off(elementNode, "mouseout", this.imageMouseOutHandler);
        break;
      case "documentMouseMove":
        $off(document, "mousemove", this.imageMouseMoveHandler);
        break;
      case "documentScroll":
        $off(document, "scroll", this.documentScrollHandler);
        break;
      default:
        break;
    }
  }

  /**
   * Hàm xử lý hiển thị image khi di chuyển chuột vào element or document có điều kiện khoảng cách 
   */
  imageMouseMoveHandler() {
    let active = $(this.node, "[data-active]");
    let math = Math.round(
      Math.sqrt(Math.pow(event.clientY, 2) + Math.pow(event.clientX, 2))
    );

    if (Math.abs(math - this.distance) > this.settings.mouseMoveTrigger) {
      displayImage(active, this.node.firstElementChild);
      this.distance = math;
    }
  }

  /**
   * Hàm xử lý hiển thị image khi di chuyển chuột vào element có điều kiện thời gian
   */
  imageMouseOverHandler() {
    this.triggerTime = setInterval(() => {
      let active = $(this.node, "[data-active]");
      displayImage(active, this.node.firstElementChild);
    }, this.settings.hoverTrigger);
  }

  /**
   * Hàm xử lý hiển thị image khi di chuyển ra ngoài element
   */
  imageMouseOutHandler() {
    clearInterval(this.triggerTime);
  }

  /**
   * Hàm xử lý hiển thị image khi scroll document
   */
  documentScrollHandler() {
    let math = window.pageYOffset;
    let active = $(this.node, "[data-active]");

    if (Math.abs(math - this.distance) > this.settings.scrollTrigger) {
      displayImage(active, this.node.firstElementChild);
      this.distance = math;
    }
  }
}
