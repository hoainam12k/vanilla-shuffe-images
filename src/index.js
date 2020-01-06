import { $, $on } from './helper';

export default class ShuffleImages {
    constructor(options) {
      this.options = options;
      this.init();
    }
  
    init() {
      let shuffleImageElements = $(document, this.options.target, "ALL");
      shuffleImageElements.forEach(el => {
        this.shuffleHandler(el);
      });
    }

    destroy() {
        
    }

    shuffleHandler(elementNode) {
      const imgAllElement = $(elementNode, "img", "ALL");
      let distance = 0;
      let triggerTime = null;
  
      const defaults = {
        type: "imageMouseMove",
        mouseMoveTrigger: 50,
        hoverTrigger: 100,
        scrollTrigger: 100
      };
      const settings = {
        ...defaults,
        ...this.options
      };
  
      imgAllElement.forEach((imgEl, i) => {
        if (i !== 0) {
          imgEl.style.display = "none";
        } else {
          imgEl.setAttribute("data-active", "active");
        }
      });
  
      switch (settings.type) {
        case "imageMouseMove":
          $on(elementNode, "mousemove", event => {
            let active = $(elementNode, "img[data-active]");
            let math = Math.round(
              Math.sqrt(Math.pow(event.clientY, 2) + Math.pow(event.clientX, 2))
            );
  
            if (Math.abs(math - distance) > settings.mouseMoveTrigger) {
              this.displayImg(active, imgAllElement[0]);
              distance = math;
            }
          });
          break;
        case "imageHover":
          $on(elementNode, "mouseover", () => {
            triggerTime = setInterval(() => {
              let active = $(elementNode, "img[data-active]");
              this.displayImg(active, imgAllElement[0]);
            }, settings.hoverTrigger);
          });
          $on(elementNode, "mouseout", () => {
            clearInterval(triggerTime);
          });
          break;
  
        case "documentMouseMove":
          $on(document, "mousemove", event => {
            let active = $(elementNode, "img[data-active]");
            let math = Math.round(
              Math.sqrt(Math.pow(event.clientY, 2) + Math.pow(event.clientX, 2))
            );
  
            if (Math.abs(math - distance) > settings.mouseMoveTrigger) {
              this.displayImg(active, imgAllElement[0]);
              distance = math;
            }
          });
          break;
  
        case "documentScroll":
          $on(document, "scroll", () => {
            let math = window.pageYOffset;
            let active = $(elementNode, "img[data-active]");
            if (Math.abs(math - distance) > settings.scrollTrigger) {
              this.displayImg(active, imgAllElement[0]);
              distance = math;
            }
          });
          break;
        default:
          break;
      }
    }
  
    /**
     * Hien thi image
     * @param {Element} activeElement image dang duoc active
     * @param {Element} imageFirst the image dau tien
     */
    displayImg(activeElement, imageFirst) {
      if (activeElement.nextElementSibling) {
        activeElement.style.display = "none";
        activeElement.nextElementSibling.style.display = "block";
        activeElement.nextElementSibling.setAttribute("data-active", "active");
        activeElement.removeAttribute("data-active");
      } else {
        activeElement.style.display = "none";
        imageFirst.style.display = "block";
        imageFirst.setAttribute("data-active", "active");
        activeElement.removeAttribute("data-active");
      }
    }
    
  }
  