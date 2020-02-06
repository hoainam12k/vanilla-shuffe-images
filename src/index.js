import { $, $on, $off, displayImage, makeid } from "./helper";

export default class ShuffleImages {
  /**
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
    this.triggerTime = [];
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

    /** Function name to init and destroy */
    this.funcImageMouseMove = null;
    this.funcImageMouseOver = null;
    this.funcImageMouseOut = null;
    this.funcDocumentScroll = null;
  }

  /**
   * Initial shuffle images
   */
  init() {
    const { wrapperTarget } = this.settings;
    if (wrapperTarget) {
      try {
        const wrapperDom = $(document, wrapperTarget, "NodeList");
        if (wrapperDom.length > 1 || !wrapperDom.length) throw 'Not found wrapper DOM !';
        const wrapperNodeList = $(wrapperDom[0], this.options.target, "NodeList");
        this.shuffleImageElements = [...this.shuffleImageElements, ...wrapperNodeList];      
      } catch (error) {
        console.log(error);
      }
    }
    this.isInit = true;
    this.shuffleImageElements.forEach(el => {
      el.removeAttribute('destroy');
      el.id = makeid(8);
      this.shuffleHandler(el);
    });
  }
  
  /**
   * Destroy shuffle images
   */
  destroy() {
    this.isInit = false;
    this.shuffleImageElements.forEach(el => {
      this.destroyShuffleHandler(el);
    });
  }

  /**
   * Process shuffle
   * @param {Node} elementNode
   */
  shuffleHandler(elementNode) {
    const imgAllElement = $(elementNode, elementNode.firstElementChild.localName, "NodeList");
    const { wrapperTarget } = this.settings;
    if (!imgAllElement[1]) return;
    this.node = elementNode;
    const self = this;

    // init images
    imgAllElement[0].classList.add('active');
    elementNode.style.position = "relative";
    elementNode.style.minHeight = "1px";
    elementNode.style.overflow = "hidden";
    imgAllElement.forEach(imgEl => {
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
    /** Bind function */
    this.funcImageMouseMove = this.imageMouseMoveHandler.bind(this, this.node);
    this.funcImageMouseOver = this.imageMouseOverHandler.bind(this, this.node);
    this.funcImageMouseOut = this.imageMouseOutHandler.bind(this);
    this.funcDocumentScroll = this.documentScrollHandler.bind(this, this.node);
    if (wrapperTarget) {
      const wrapperDOM = $(document, wrapperTarget, "NodeList");      
      for (const item of wrapperDOM) {
        self.addEventTrigger(item);
      }
    }
    self.addEventTrigger(elementNode);
  }

  /** Select shuffle */
  addEventTrigger(elementNode) {
    switch (this.settings.type) {
      case "imageMouseMove":
        $on(elementNode, "mousemove", this.funcImageMouseMove);
        break;
      case "imageHover":
        $on(elementNode, "mouseenter", this.funcImageMouseOver);
        $on(elementNode, "mouseleave", this.funcImageMouseOut);
        break;
      case "documentMouseMove":
        $on(document, "mousemove", this.funcImageMouseMove);
        break;
      case "documentScroll":
        $on(document, "scroll", this.funcDocumentScroll);
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
    elementNode.setAttribute('destroy', '');
    const imgAllElement = $(elementNode, elementNode.firstElementChild.localName, "NodeList");
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
        $off(elementNode, "mousemove", this.funcImageMouseMove);
        break;
      case "imageHover":
        $off(elementNode, "mouseenter", this.funcImageMouseOver);
        $off(elementNode, "mouseleave", this.funcImageMouseOut);
        break;
      case "documentMouseMove":
        $off(document, "mousemove", this.funcImageMouseMove);
        break;
      case "documentScroll":
        $off(document, "scroll", this.funcDocumentScroll);
        break;
    }
  }

  /**
   * Shuffle images when moving mouse (with distance)
   */
  imageMouseMoveHandler(node) {
    if (node.hasAttribute('destroy')) return;
    let active, firstElement;
    if (this.settings.type === 'documentMouseMove') {
      active = $(document, `.${node.className}`, 'NodeList');
    } else {
      const oneElement = document.getElementById(node.id);
      active = $(oneElement, ".active");
      firstElement = oneElement.firstElementChild;
    }
    let math = Math.round(
      Math.sqrt(Math.pow(event.clientY, 2) + Math.pow(event.clientX, 2))
    );

    if (Math.abs(math - this.distance) > this.settings.mouseMoveTrigger) {
      if (active.length) {
        for (let index = 0; index < active.length; index++) {
          const element = active[index];
          const activeOneItem = $(element, '.active');
          displayImage(activeOneItem, element.firstElementChild);
        }
      } else {
        displayImage(active, firstElement);
      }
      this.distance = math;
    }
  }

  /**
   * Shuffle images when hovering
   */
  imageMouseOverHandler(node) {
    if (node.hasAttribute('destroy')) return;
    const oneElement = document.getElementById(node.id);
    const triggerFunc = setInterval(() => {
      const active = $(oneElement, ".active");
      const firstElement = oneElement.firstElementChild;
      displayImage(active, firstElement);
    }, this.settings.hoverTrigger);
    this.triggerTime.push(triggerFunc);
  }

  /**
   * Remove time interval when hover out element
   */
  imageMouseOutHandler() {
    for (const item of this.triggerTime) {  
      clearInterval(item);
    }
  }

  /**
   * Shuffle images when scrolling
   */
  documentScrollHandler(node) {
    if (node.hasAttribute('destroy')) return;
    let nodeList = $(document, `.${node.className}`, 'NodeList');
    let math = window.pageYOffset;
    if (Math.abs(math - this.distance) < this.settings.scrollTrigger) return;
    if (nodeList.length > 1) {
      Array.from(nodeList).forEach(item => {
        const activeOneItem = $(item, '.active');
        displayImage(activeOneItem, item.firstElementChild);
        this.distance = math;
      })
    } else {
      let active = $(this.node, ".active");
      displayImage(active, this.node.firstElementChild);
      this.distance = math;
    }
  }
}
