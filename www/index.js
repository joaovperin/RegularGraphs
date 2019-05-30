const CanvasWidth = 1600;
const CanvasHeight = 1200;

const VertexLineWidth = 4;
const VertexColor = '#000';
const VertexFillColor = '#F00';
const VertexRadius = 50;
const VertexOffset = 60;
const VertexInitialOffset = 25;

const EdgeColor = '#0F0';
const EdgeWidth = 4;

var canvas;
var ctx;

/**
 * Runs when the browser loads
 */
function appOnLoad() {

   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   console.log(ctx);

   let pX, pY;

   let startX = CanvasWidth / 2,
      startY = VertexInitialOffset + VertexRadius;

   let root = new Vertex(startX, startY);

   pX = root.x / 2,
      pY = root.y + VertexOffset + 2 * VertexRadius;
   root.leftChild = new Vertex(pX, pY);

   pX = root.x + root.x / 2,
      pY = root.y + VertexOffset + 2 * VertexRadius;
   root.rightChild = new Vertex(pX, pY);

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
   // debugger;
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

class Vertex {

   x;
   y;

   leftChild;
   rightChild;

   constructor(x, y) {
      this.x = x;
      this.y = y;
   }

   draw() {
      ctx.strokeStyle = VertexColor;
      ctx.fillStyle = VertexFillColor;
      ctx.lineWidth = VertexLineWidth;

      ctx.beginPath();
      ctx.arc(this.x, this.y, VertexRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
   }

}