(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function clone(element, newId) {
    if (element) {
      const clonedElement = element.cloneNode(true); // Clone the element, including its children
  
      if (element.style) {
        clonedElement.style.cssText = window.getComputedStyle(element).cssText;
      }
  
      // Copy the classes from the original element to the cloned element.
      clonedElement.className = element.className;
  
      clonedElement.id = newId; // Set the new id for the cloned element
      element.parentNode.insertBefore(clonedElement, element.nextSibling);

      return document.getElementById(clonedElement.id);
    }
  }
  
  
  function remove(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
  
  module.exports = {
    clone,
    remove
  };
  
},{}],2:[function(require,module,exports){
(function (global){(function (){
const transform = require('./transform/index.js')
const misc = require('./misc/index.js')
const game = require('./game/index.js')
const elements = require('./elements/index.js')
global.window.transform = transform
global.window.misc = misc
global.window.game = game
global.window.gameElement = elements
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./elements/index.js":1,"./game/index.js":3,"./misc/index.js":4,"./transform/index.js":5}],3:[function(require,module,exports){
function playMusic(audioFile) {
    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.play();
  }

  module.exports = {
    playMusic
  }
  

  
},{}],4:[function(require,module,exports){
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function revealMouseCoordinatesOnCtrlM() {
    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.key === "m") {
            alert("Mouse X: " + mouseX + " Mouse Y: " + mouseY);
        }
    });
}

module.exports = {
    mouseCoords: revealMouseCoordinatesOnCtrlM
}

},{}],5:[function(require,module,exports){

function change(element, x, y) {
    let currentLeft = parseInt(element.style.left) || 0;
    let currentTop = parseInt(element.style.top) || 0;
    element.style.left = (currentLeft + x) + "px";
    element.style.top = (currentTop + y) + "px";
    element.style.position = 'absolute';
}


function set(element, x, y) {
    element.style.left = x + "px";
    element.style.top = y + "px";
    element.style.position = 'absolute';
}

function move(element, targetX, targetY, uduration) {
    element.style.position = 'absolute';

    // Get the current position of the element
    const currentX = parseInt(element.style.left) || 0;
    const currentY = parseInt(element.style.top) || 0;

    let deltaX = targetX - currentX;
    let deltaY = targetY - currentY;
    let duration = uduration; 
    let startTime;

    function animate(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
            const newX = currentX + deltaX * progress;
            const newY = currentY + deltaY * progress;
            element.style.left = newX + "px";
            element.style.top = newY + "px";
            requestAnimationFrame(animate);
        } else {
            // Ensure the element reaches the exact target position
            element.style.left = targetX + "px";
            element.style.top = targetY + "px";
        }
    }

    requestAnimationFrame(animate);
}

function rotate(element, degree, duration) {
    element.style.transition = `transform ${duration}ms`;
    element.style.transform = `rotate(${degree}deg)`;

    // After the specified duration, remove the transition to avoid affecting subsequent transformations.
    setTimeout(() => {
        element.style.transition = 'none';
    }, duration);
}
function scale(element, widthToAdd, heightToAdd, duration) {
    const currentWidth = element.clientWidth;
    const currentHeight = element.clientHeight;
    const newWidth = currentWidth + widthToAdd;
    const newHeight = currentHeight + heightToAdd;

    element.style.transition = `width ${duration}ms, height ${duration}ms`;
    element.style.width = `${newWidth}px`;
    element.style.height = `${newHeight}px`;

    // After the specified duration, remove the transition to avoid affecting subsequent transformations.
    setTimeout(() => {
        element.style.transition = 'none';
    }, duration);
}
module.exports={
    change,
    set,
    move,
    rotate,
    scale
}
},{}]},{},[2]);
