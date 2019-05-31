'use strict';

const CanvasWidth = 1600;
const CanvasHeight = 1200;
const CanvasColor = 'FFF';

const VertexRadius = 30;

const VertexLineWidth = 4;
const VertexInitialOffset = 25;
const VertexColor = '#000';
const VertexFillColor = '#F00';

const VertexFontSize = VertexRadius - VertexRadius / 10;
const VertexFont = VertexFontSize + 'px Arial';
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
var graphValueArray;
var currentValue;

/**
 * Runs when the browser loads
 */
function appOnLoad() {

   // Get a reference to canvas and context
   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   console.log(ctx);

   const valueField = document.getElementById('value');
   valueField.addEventListener("keypress", function (evt) {
      var ch = String.fromCharCode(evt.which);
      let isNumber = /[0-9]/.test(ch);
      if (!isNumber) {
         evt.preventDefault();
      }
      return isNumber;
   });
   valueField.addEventListener("keyup", (evt) => currentValue = evt.target.value || 0);

   randomizeAndDraw();
}

/**
 * Randomize graph and draw it on screen
 */
function randomizeAndDraw() {

   // Clear the canvas
   clearCanvas();

   // Gets initial X and Y for the center
   let startX = CanvasWidth / 2,
      startY = VertexInitialOffset + VertexRadius;

   // Some randomness, just for fun (and tests) :D
   let root = new Vertex(startX, startY, {
      x: CanvasWidth,
      y: CanvasHeight
   });
   root.leftChild = root.createLeftChild();
   root.rightChild = root.createRightChild();
   generateRandomGraph(root.leftChild);
   generateRandomGraph(root.rightChild);
   /*   let c = root;
      for (let i = 0; i < 8; i++) {
         let go = (~~((Math.random() * 100) % 2));
         if (go)
            c.leftChild = c.createLeftChild();
         else
            c.rightChild = c.createRightChild();
         c = !go ? c.rightChild : c.leftChild;
      }
   */
   // Draw the graph, starting by root node
   graphRootNode = root;
   drawGraph(graphRootNode);
}

/**
 * Sort function
 */
function sortGraph() {
   //alert('Not implemented yet!');
}

/**
 * Generates a new random graph
 */
function generateRandomGraph(root) {
   // Exit conditions
   if (!root ||
      (root.y + VertexRadius) >= CanvasHeight ||
      (root.x - VertexRadius) <= 0 ||
      (root.x + VertexRadius) >= CanvasWidth
   ) return;
   // Determinate a direction to grow
   let side = (~~((Math.random() * 100) % 4));
   if (side === 1) { // Left
      root.leftChild = root.createLeftChild();
   } else if (side === 2) { // Right
      root.rightChild = root.createRightChild();
   } else if (side === 3) { // Both
      root.leftChild = root.createLeftChild();
      root.rightChild = root.createRightChild();
   }
   // Make it recursively
   generateRandomGraph(root.leftChild);
   generateRandomGraph(root.rightChild);
}

/**
 * Clear the canvas
 */
function clearCanvas() {
   graphRootNode = null;
   ctx.fillStyle = CanvasColor;
   ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw a graph
 *
 * @param {Vertex} rootNode
 */
function drawGraph(rootNode) {
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
function drawEdge(me, son) {
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
class Vertex {

   /*
      x; y;  // position
      value; // value
      valueOffsetX; valueOffsetY; // offset for the text
      parentVertex; leftChild; rightChild; // relationships
   */

   constructor(x, y, parentVertex) {
      this.parentVertex = parentVertex;
      this.x = x;
      this.y = y;
      this.value = ~~(Math.random() * 100);
      let vSize = this.value.toString().length;
      this.valueOffsetX = VertexRadius / 7.5 + vSize * (VertexRadius / 6.5);
      this.valueOffsetY = ((VertexRadius + 3) / 4);
   }

   /**
    * Creates a child to the left
    */
   createLeftChild() {
      let pX = this.x - (this.parentVertex.x - this.x) / 2 - VertexOffsetX,
         pY = this.y + VertexOffsetY + 2 * VertexRadius;
      return new Vertex(pX, pY, this);
   }

   /**
    * Creates a child to the right
    */
   createRightChild() {
      let pX = this.x + (this.parentVertex.x - this.x) / 2 + VertexOffsetX,
         pY = this.y + VertexOffsetY + 2 * VertexRadius;
      return new Vertex(pX, pY, this);
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
function addValueOnGraph() {
   console.log('Value: ', value);
   alert('Not implemented yet');
}