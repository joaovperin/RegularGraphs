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
var valueField;

/**
 * Runs when the browser loads
 */
function appOnLoad() {

   // Get a reference to canvas and context
   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   console.log(ctx);

   valueField = document.getElementById('value');
   valueField.addEventListener("keypress", function (evt) {
      var ch = String.fromCharCode(evt.which);
      let isNumber = /[0-9]/.test(ch);
      if (!isNumber) {
         evt.preventDefault();
      }
      return isNumber;
   });

   // randomizeAndDraw();
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
   if (isRunningOnApple()) {
      alert('Oi Lari te amo <3');
   } else {
      alert('Not implemented yet!');
   }
}

/**
 * Generates a new random graph
 */
function generateRandomGraph(root) {
   // Exit conditions
   if (!root || isVertexInvalid(root)) return;
   // Determinate a direction to grow
   let side = (~~((Math.random() * 100) % 4));
   /**
    * 1 = Left
    * 2 = Right
    * 3 = Both
    */
   let newLeftChild = root.createLeftChild();
   if (isVertexInvalid(newLeftChild)) {
      newLeftChild = null;
   }
   let newRightChild = root.createRightChild();
   if (isVertexInvalid(newRightChild)) {
      newRightChild = null;
   }
   if (side === 1) { // Left
      root.leftChild = newLeftChild;
   } else if (side === 2) { // Right
      root.rightChild = newRightChild;
   } else if (side === 3) { // Both
      root.leftChild = newLeftChild;
      root.rightChild = newRightChild;
   }
   // Make it recursively
   generateRandomGraph(root.leftChild);
   generateRandomGraph(root.rightChild);
}

/**
 * Return true if the vertex is invalid (out of canvas bounds)
 * 
 * @param {Vertex} root 
 */
function isVertexInvalid(root) {
   return (root.y + VertexRadius) >= CanvasHeight ||
      (root.x - VertexRadius) <= 0 ||
      (root.x + VertexRadius) >= CanvasWidth;
}

/**
 * Clear the canvas
 */
function clearCanvas() {
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
   // If the graph does not exist yet, create it
   if (!graphRootNode){
      createNewGraph();
   } else {
      addValueOnExistingGraph();
   }
   clearCanvas();
   drawGraph(graphRootNode);
   document.getElementById('value').value = ''; 
}

/**
 * Create a new graph
 */
function /*private*/ createNewGraph(){
   // Gets initial X and Y for the center
   let startX = CanvasWidth / 2,
   startY = VertexInitialOffset + VertexRadius;
   // Some randomness, just for fun (and tests) :D
   graphRootNode = new Vertex(startX, startY, {
      x: CanvasWidth,
      y: CanvasHeight
   });
   graphRootNode.value = Number(valueField.value);
}

/**
 * Add a value on the existing graph
 */
function /*private*/ addValueOnExistingGraph(){
   let stack = [graphRootNode], 
       currentValue = Number(valueField.value);
   // Stack
   while (stack.length){
      let r = stack.pop(),
          v = Number(r.value);
      // If value already on the graph
      if(v === currentValue){
         let msg = 'Value already exists on the graph!';
         console.error(msg);
         alert(msg);
         return;
      }
      // Traverse left
      if (currentValue < v){
         if(r.leftChild){
            stack.push(r.leftChild);
         } else {
            r.leftChild = r.createLeftChild();
            r.leftChild.value = currentValue;
            console.debug('LEFT -> ', currentValue);
         }
      } else if (currentValue > v) {
         // Traverse right
         if (r.rightChild){
            stack.push(r.rightChild);
         } else {
            r.rightChild = r.createRightChild();
            r.rightChild.value = currentValue;
            console.debug('RIGHT -> ', currentValue)
         }
      }
   }
}

/**
 * Return true if it's running on an Apple device
 */
function isRunningOnApple() {
   let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
   return iOS;
}