const CanvasWidth = 1600;
const CanvasHeight = 1200;

const VertexLineWidth = 4;
const VertexColor = '#000';
const VertexFillColor = '#F00';
const VertexRadius = 20;
const VertexOffset = 10;
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

   let startX = CanvasWidth / 2,
      startY = VertexInitialOffset + VertexRadius;

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

class Vertex {

   x;
   y;

   leftChild;
   rightChild;

   constructor(x, y) {
      this.x = x;
      this.y = y;
   }

   createLeftChild() {
      let pX = this.x / 2,
         pY = this.y + VertexOffset + 2 * VertexRadius;
      return new Vertex(pX, pY);

   }
   createRightChild() {
      let pX = this.x + (CanvasWidth - this.x) / 2,
         pY = this.y + VertexOffset + 2 * VertexRadius;
      return new Vertex(pX, pY);
   }

   draw() {
      ctx.strokeStyle = VertexColor;
      ctx.fillStyle = VertexFillColor;
      ctx.lineWidth = VertexLineWidth;

      ctx.beginPath();
      ctx.arc(this.x, this.y, VertexRadius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
   }

}