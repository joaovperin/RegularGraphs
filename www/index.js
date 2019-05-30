const VertexColor = '#F00';
const VertexSize = 20;
const ArestaColor = '#0F0';

var canvas;
var ctx;

function appOnLoad() {

   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   console.log(ctx);

   let g1 = new Vertex(100, 20);
   let g2 = new Vertex(150, 90);
   let g3 = new Vertex(55, 90);

   g1.setNext(g2).setNext(g3);
   // g1.setNext(g2).setNext(g3);

   drawGraph(g1);

}

function drawGraph(initialVertex) {
   let c = initialVertex;
   //debugger;
   while (c) {
      ctx.fillStyle = VertexColor;
      ctx.fillRect(c.x, c.y, VertexSize, VertexSize);

      // TODO: fill circles  ctx.fillStyle = 'black'; ctx.arc(50, 50, 80, 0, 2*Math.PI);


      if (c.next) {
         let n = c.next;
         ctx.fillStyle = ArestaColor;
         ctx.lineWidth = 1;

         let sY = (c.y + VertexSize),
            sX = c.x > n.x ? c.x : c.x + VertexSize;
         let fY = n.y,
            fX = n.x > c.x ? n.x : n.x + VertexSize;

         ctx.moveTo(sX, sY);
         ctx.lineTo(fX, fY);
         ctx.closePath();
         ctx.stroke();
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
      this.next = next;
      return this.next;
   }

}