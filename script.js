
const VertexColor = '#F00';
const VertexSize = 30;

var canvas;
var ctx;

function appOnLoad(){

 canvas = document.getElementById('canvas');
 ctx = canvas.getContext('2d');
 console.log(ctx);

 let g = new Vertex(40, 40);
 
 drawGraph(g);

}

function drawGraph(initialVertex){
   let c = initialVertex;
	debugger;
   while (c){
      ctx.fillStyle = VertexColor;
      ctx.fillRect(c.x, c.y, VertexSize, VertexSize);

// TODO: fill circles  ctx.fillStyle = 'black'; ctx.arc(50, 50, 80, 0, 2*Math.PI);


      if (c.next){
         ctx.fillStyle = ArestaColor;
         ctx.fillRect(c.x, c.y, c.next.x, c.next.y);
      }	   
      c = c.next;	   
   }	
}

class Vertex {
 
  x; y;
  value;

  next;

  constructor(x, y){
     this.x=x; this.y=y;
  }

  setNext(next){ this.next = next }

}

