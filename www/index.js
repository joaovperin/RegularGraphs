'use strict';

const CanvasWidth = 1600;
const CanvasHeight = 1200;
const CanvasColor = 'FFF';

const VertexRadius = 30;

const VertexLineWidth = 4;
const VertexInitialOffset = 25;
const VertexColor = '#000';
const VertexFillColor = '#F00';

const VertexFontSize = VertexRadius;
const VertexFont = VertexFontSize + 'px Monaco';
const VertexOffsetY = 15 + VertexRadius / 6;
const VertexOffsetX = 5 + VertexRadius;

const VertexValueColor = '#000';

const EdgeColor = '#0F0';
const EdgeWidth = 4;

// Canvas and RenderingContext
var canvas;
var ctx;

// Current graph
var graphRootNode;
var valueField;

/**
 * Return true if the vertex is invalid (out of canvas bounds)
 *
 * @param {Vertex} root
 */
function /*private*/ isVertexInvalid(root) {
   return (root.y + VertexRadius) >= CanvasHeight ||
      (root.x - VertexRadius) <= 0 ||
      (root.x + VertexRadius) >= CanvasWidth;
}

/**
 * Clear the canvas
 */
function /*private*/ clearCanvas() {
   ctx.fillStyle = CanvasColor;
   ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw a graph
 *
 * @param {Vertex} rootNode
 */
function /*private*/ drawGraph(rootNode) {
   let left = rootNode.leftChild,
      right = rootNode.rightChild;
   if (left) {
      drawEdge(rootNode, left);
      drawGraph(left);
   }
   if (right) {
      drawEdge(rootNode, right);
      drawGraph(right);
   }
   rootNode.draw();
}

/**
 * Draws an edge between two graph vertex
 *
 * @param {Vertex} me
 * @param {Vertex} son
 */
function /*private*/ drawEdge(me, son) {
   ctx.fillStyle = EdgeColor;
   ctx.lineWidth = EdgeWidth;

   ctx.beginPath();
   ctx.moveTo(me.x, me.y);
   ctx.lineTo(son.x, son.y);
   ctx.closePath();
   ctx.stroke();
}

/**
 * A vertex
 */
class /*private*/ Vertex {

   /*
      x; y;  // position
      value; // value
      valueOffsetX; valueOffsetY; // offset for the text
      parentVertex; leftChild; rightChild; // relationships
   */

   constructor(x, y, parentVertex, value) {
      this.parentVertex = parentVertex;
      this.x = x;
      this.y = y;
      this.value = value;
      let vSize = this.value.toString().length;
      this.valueOffsetX = VertexRadius / 7.5 + vSize * (VertexRadius / 7);
      this.valueOffsetY = ((VertexRadius + 5) / 4);
   }

   /**
    * Creates a child to the left
    */
   createLeftChild(value) {
      let min = Math.min(this.parentVertex.x, this.x),
         max = Math.max(this.parentVertex.x, this.x);
      let pX = this.x - (max - min) / 2 - VertexOffsetX,
         pY = this.y + VertexOffsetY + 2 * VertexRadius;
      return new Vertex(pX, pY, this, value);
   }

   /**
    * Creates a child to the right
    */
   createRightChild(value) {
      let min = Math.min(this.parentVertex.x, this.x),
         max = Math.max(this.parentVertex.x, this.x);
      let pX = this.x + (max - min) / 2 + VertexOffsetX,
         pY = this.y + VertexOffsetY + 2 * VertexRadius;
      return new Vertex(pX, pY, this, value);
   }

   /**
    * Renders the Vertex itself on canvas
    */
   draw() {
      ctx.strokeStyle = VertexColor;
      ctx.fillStyle = VertexFillColor;
      ctx.lineWidth = VertexLineWidth;

      // Vertex circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, VertexRadius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Value inside
      ctx.fillStyle = VertexValueColor;
      ctx.font = VertexFont;
      ctx.beginPath();
      ctx.fillText(this.value, this.x - this.valueOffsetX, this.y + this.valueOffsetY);
      ctx.closePath();
      ctx.fill();
   }

}

/**
 * Adds a value on the graph
 */
function /*private*/ addValueOnGraph(value) {
   if (!value) {
      return;
   }
   // If the graph does not exist yet, create it
   if (!graphRootNode) {
      createNewGraph(value);
   } else {
      addValueOnExistingGraph(value);
   }
   clearCanvas();
   drawGraph(graphRootNode);
}

/**
 * Create a new graph
 */
function /*private*/ createNewGraph(value) {
   // Gets initial X and Y for the center
   let startX = CanvasWidth / 2,
      startY = VertexInitialOffset + VertexRadius;
   // Some randomness, just for fun (and tests) :D
   graphRootNode = new Vertex(startX, startY, {
      x: CanvasWidth,
      y: CanvasHeight
   }, Number(value));
   console.debug('Root -> ', graphRootNode.value);
}

/**
 * Add a value on the existing graph
 */
function /*private*/ addValueOnExistingGraph(value) {
   let stack = [graphRootNode],
      currentValue = Number(value);
   // Stack
   while (stack.length) {
      let r = stack.pop(),
         v = Number(r.value);
      // If value already on the graph
      if (v === currentValue) {
         let msg = 'Value already exists on the graph!';
         console.error(msg);
         alert(msg);
         return;
      }
      // Traverse left
      if (currentValue < v) {
         if (r.leftChild) {
            stack.push(r.leftChild);
         } else {
            r.leftChild = r.createLeftChild(currentValue);
            console.debug('LEFT -> ', currentValue);
         }
      } else if (currentValue > v) {
         // Traverse right
         if (r.rightChild) {
            stack.push(r.rightChild);
         } else {
            r.rightChild = r.createRightChild(currentValue);
            console.debug('RIGHT -> ', currentValue);
         }
      }
   }
}

/**
 * Runs when the browser loads
 */
function /*public*/ appOnLoad() {

   // Get a reference to canvas and context
   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   console.log(ctx);

   valueField = document.getElementById('value');
   valueField.addEventListener("keypress", function (evt) {
      if (evt && evt.charCode === 13) {
         addValueOnGraph(valueField.value);
         return false;
      }
      var ch = String.fromCharCode(evt.which);
      let isNumber = /[0-9]/.test(ch);
      if (!isNumber) {
         evt.preventDefault();
      }
      return isNumber;
   });
}

/**
 * Callback - add button click
 */
function /* public */ onClickAddButton() {
   addValueOnGraph(valueField.value);
   document.getElementById('value').value = '';
}

/**
 * Callback - clear button click
 */
function /* public */ onClickClearButton() {
   clearCanvas();
}