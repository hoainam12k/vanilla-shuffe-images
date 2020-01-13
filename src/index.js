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
     * @param {Boolean} isInit
     */
    this.isInit = true;
    /**
     * @param {number} distance
     */
    this.distance = null;
    /**
     * @param {number} triggerTime
     */
    this.triggerTime = null;
    /**
     * @param {Node} node Node Element
     */
    this.node = null;

    /**
     * @param {Object} defaults Default value when init
     */
    this.defaults = {
      type: "imageMouseMove",
      mouseMoveTrigger: 50,
      hoverTrigger: 200,
      scrollTrigger: 100
    };

    /**
     * @param {Object} settings
     */
    this.settings = {
      ...this.defaults,
      ...this.options
    };

    this.imageMouseMoveHandler = this.imageMouseMoveHandler.bind(this);
    this.imageMouseOverHandler = this.imageMouseOverHandler.bind(this);
    this.imageMouseOverHandler = this.imageMouseOverHandler.bind(this);
    this.imageMouseOutHandler = this.imageMouseOutHandler.bind(this);
    this.documentScrollHandler = this.documentScrollHandler.bind(this);
  }

  /**
   * Initial shuffle images
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
   * Destroy shuffle images
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
   * Process shuffle
   * @param {Node} elementNode
   */
  shuffleHandler(elementNode) {
    const imgAllElement = $(elementNode,elementNode.firstElementChild.localName,"NodeList");
    this.node = elementNode;

    // init images
    imgAllElement[0].classList.add('active');
    elementNode.style.position = "relative";
    elementNode.style.minHeight = "1px";
    elementNode.style.overflow = "hidden";
    imgAllElement.forEach((imgEl, i) => {
      imgEl.style.top = "0";
      imgEl.style.right = "0";
      imgEl.style.bottom = "0";
      imgEl.style.left = "0";

      if (imgEl.className === "active") {
        imgEl.style.visibility = "visible";
        imgEl.style.opacity = "1";
        imgEl.style.position = "unset";
      } else {
        imgEl.style.visibility = "hidden";
        imgEl.style.position = "absolute";
        imgEl.style.opacity = "0";
      }
    });

    // select shuffle
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
   * Destroy and remove events
   * @param {Node} elementNode
   */
  destroyShuffleHandler(elementNode) {
    const imgAllElement = $(elementNode,elementNode.firstElementChild.localName,"NodeList");

    // destroy init image
    if (elementNode.hasAttribute("style")) elementNode.removeAttribute("style");
    imgAllElement.forEach((imgEl, i) => {
      if (imgEl.className.includes("active") || imgEl.hasAttribute("style")) {
        imgEl.removeAttribute("style");
        imgEl.classList.remove("active");
      }
    });

    //select type distroy
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
   * Shuffle images when moving mouse (with distance)
   */
  imageMouseMoveHandler() {
    let active = $(this.node, ".active");
    let math = Math.round(
      Math.sqrt(Math.pow(event.clientY, 2) + Math.pow(event.clientX, 2))
    );

    if (Math.abs(math - this.distance) > this.settings.mouseMoveTrigger) {
      displayImage(active, this.node.firstElementChild);
      this.distance = math;
    }
  }

  /**
   * Shuffle images when hovering
   */
  imageMouseOverHandler() {
    this.triggerTime = setInterval(() => {
      let active = $(this.node, ".active");
      displayImage(active, this.node.firstElementChild);
    }, this.settings.hoverTrigger);
  }

  /**
   * Remove time interval when hover out element
   */
  imageMouseOutHandler() {
    clearInterval(this.triggerTime);
  }

  /**
   * Shuffle images when scrolling
   */
  documentScrollHandler() {
    let math = window.pageYOffset;
    let active = $(this.node, ".active");

    if (Math.abs(math - this.distance) > this.settings.scrollTrigger) {
      displayImage(active, this.node.firstElementChild);
      this.distance = math;
    }
  }
}
