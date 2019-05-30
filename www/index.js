const CanvasWidth = 1600;
const CanvasHeight = 1200;

const VertexLineWidth = 4;
const VertexColor = '#000';
const VertexFillColor = '#F00';
const VertexRadius = 20;
const VertexOffset = 10;
const VertexInitialOffset = 25;

const VertexValueColor = '#000';

const EdgeColor = '#0F0';
const EdgeWidth = 4;

// Canvas and RenderingContext
var canvas;
var ctx;

/**
 * Runs when the browser loads
 */
function appOnLoad() {

   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   console.log(ctx);

   let startX = CanvasWidth / 2,
      startY = VertexInitialOffset + VertexRadius;

   // Some randomness, just for fun (and tests) :D
   let root = new Vertex(startX, startY);
   let c = root;
   for (let i = 0; i < 20; i++) {
      let go = (~~((Math.random() * 100) % 2));
      if (go)
         c.leftChild = c.createLeftChild();
      else
         c.rightChild = c.createRightChild();
      c = !go ? c.rightChild : c.leftChild;
   }

   // Draw the graph, starting by root node
   drawGraph(root);
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

   x;
   y;
   value;

   valueOffsetX;
   valueOffsetY;

   leftChild;
   rightChild;

   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.value = ~~(Math.random() * 100);
      this.valueOffsetX = 5 * this.value.toString().length;
      this.valueOffsetY = 7;
   }

   /**
    * Creates a child to the left
    */
   createLeftChild() {
      let pX = this.x / 2,
         pY = this.y + VertexOffset + 2 * VertexRadius;
      return new Vertex(pX, pY);
   }

   /**
    * Creates a child to the right
    */
   createRightChild() {
      let pX = this.x + (CanvasWidth - this.x) / 2,
         pY = this.y + VertexOffset + 2 * VertexRadius;
      return new Vertex(pX, pY);
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
      ctx.font = "20px Arial";
      ctx.beginPath();
      ctx.fillText(this.value, this.x - this.valueOffsetX, this.y + this.valueOffsetY);
      ctx.closePath();
      ctx.fill();
   }

}