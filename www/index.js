const CanvasWidth = 1600;
const CanvasHeight = 1200;

const VertexColor = '#000';
const VertexFillColor = '#F00';
const VertexRadius = 50;
const VertexOffset = 60;
const VertexInitialOffset = 25;

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

   let root = new Vertex(startX, startY);
   drawGraph(root);
}

/**
 * Draw a graph
 *
 * @param {Vertex} rootNode
 */
function drawGraph(rootNode) {
   let c = rootNode;
   c.draw();
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

      ctx.beginPath();
      ctx.arc(this.x, this.y, VertexRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
   }

}