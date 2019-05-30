const VertexColor = '#F00';
const VertexSize = 30;
const ArestaColor = '#0F0';

var canvas;
var ctx;

function appOnLoad() {

   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   console.log(ctx);

   let g1 = new Vertex(40, 40);
   let g2 = new Vertex(150, 90);

   g1.setNext(g2);

   drawGraph(g1);
   drawGraph(g2);

}

function drawGraph(initialVertex) {
   let c = initialVertex;
   debugger;
   while (c) {
      ctx.fillStyle = VertexColor;
      ctx.fillRect(c.x, c.y, VertexSize, VertexSize);

      // TODO: fill circles  ctx.fillStyle = 'black'; ctx.arc(50, 50, 80, 0, 2*Math.PI);


      if (c.next) {
         let n = c.next;
         //ctx.lineWidth = 10;
         ctx.fillStyle = ArestaColor;
         ctx.moveTo(c.x, c.y);
         ctx.lineTo(n.x, n.y);
      }
      c = c.next;
   }
}

class Vertex {

   x;
   y;
   value;

   next;

   constructor(x, y) {
      this.x = x;
      this.y = y;
   }

   setNext(next) {
      this.next = next
   }

}