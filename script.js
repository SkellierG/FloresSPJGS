alert("Como no nos vemos mucho en persona pero aún así quería entregarte un detalle te hice esto, espero te guste<3");

const c = document.querySelector("canvas");
const ctx = c.getContext('2d');

c.width = W = window.innerWidth;
c.height = H = window.innerHeight;

let no = 250;
let a = 0;
let color = 360 * Math.random();
let times = 0;

function animate(){
  a+=0.01;
  ctx.beginPath();
  let x = W / 2 + W / 2 * Math.cos(no * a) * Math.cos(a);
  let y = -(-H / 2 + W / 2 * Math.cos(no * a) * Math.sin(a));
  ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
  ctx.strokeStyle = "hsl(" + 40 + ",100%,50%)";
  ctx.stroke();
  
  if (a > 10 && times <= 3) {
    a = 0.01;
    no = Math.floor(Math.random() * 9) + 2;
    ctx.clearRect(0, 0, W, H);
    times++;
  }
  
  if (times > 3) {
    a = 0.01;
    no = 250;
    ctx.clearRect(0, 0, W, H);
    times = 0;
  }
  
  /*if (color > 10) {
    color = 360 * Math.random;
  }*/
  
  if (no >= 80) {
    ctx.moveTo(W / 2, H / 2);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);