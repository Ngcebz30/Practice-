var usr_color = 160; //Change value to change color scheme

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var canvas = document.getElementsByTagName("canvas")[0];
var dpr = window.devicePixelRatio || 1;
var rect = canvas.getBoundingClientRect();
var w = rect.width * dpr;
var h = rect.height * dpr;
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext('2d');
ctx.scale(dpr, dpr);

var arcs = [];

function init(){
  console.log("init called");
  reset();
  arcs = [];
  var m = new arc();
  m.class = "month";
  arcs.push(m);
  
  var d = new arc();
  d.class = "date";
  d.r = 135;
  arcs.push(d);
  
  var d = new arc();
  d.class = "day";
  d.r = 170;
  arcs.push(d);
  
  var h = new arc();
  h.class = "hours";
  h.r = 205;
  arcs.push(h);
  
  var m = new arc();
  m.class = "mins";
  m.r = 240;
  arcs.push(m);
  
  var s = new arc();
  s.class = "secs";
  s.r = 275;
  arcs.push(s);
}

function arc(){
  this.class = "month";
  this.r = 100;
  this.rot = 1;
  
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(300,300,this.r,(Math.PI/(2/3)),this.rot,false);
    ctx.lineWidth = 30;
    ctx.strokeStyle = "hsla("+(this.rot*(180/Math.PI)+usr_color)+",60%,50%,1)";
    ctx.stroke();
    
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 48, 1)";
    ctx.translate(300, 300);
    ctx.rotate(this.rot);
    ctx.font="bold 14px Arial";
    if(this.class == "secs"){
      var d = new Date();
      ctx.fillText(d.getSeconds(), 267, -5);
    }
    else if(this.class == "mins"){
      var d = new Date();
      ctx.fillText(d.getMinutes(), 232, -5);
    }
    else if(this.class == "hours"){
      var d = new Date();
      ctx.fillText(d.getHours(), 197, -5);
    }
    else if(this.class == "day"){
      var d = new Date();
      var day = d.getDay();
      if(day == 1){
        var day = "Mon"
      }
      else if(day == 2){
        var day = "Tue"
      }
      else if(day == 3){
        var day = "Wed"
      }
      else if(day == 4){
        var day = "Thu"
      }
      else if(day == 5){
        var day = "Fri"
      }
      else if(day == 6){
        var day = "Sat"
      }
      else if(day == 7){
        var day = "Sun"
      }
      ctx.fillText(day, 158, -5);
    }
    else if(this.class == "date"){
      var d = new Date();
      ctx.fillText(d.getDate(), 127, -5);
    }
    else if(this.class == "month"){
      var d = new Date();
      ctx.fillText(d.getMonth()+1, 93, -5);
    }
    ctx.restore();
  }
}

function reset(){
  ctx.fillStyle = "rgba(0, 0, 48, 1)";
  ctx.fillRect(0,0,w,h);
}

function draw(){
  reset();
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "12px Arial"
  ctx.fillText("seconds", 250, 27);
  ctx.fillText("minutes", 252, 63);
  ctx.fillText("hours", 264, 98);
  ctx.fillText("day", 274, 134);
  ctx.fillText("date", 270, 168);
  ctx.fillText("month", 260, 203);
  
  for(var i=0;i<arcs.length;i++){
    var a = arcs[i];
    var d = new Date();
    if(a.class == "month"){
      var n = d.getMonth()+1;
      a.rot = (n/12)*(Math.PI*2) - (Math.PI/2);
    }
    else if(a.class == "date"){
      var n = d.getDate();
      a.rot = (n/31)*(Math.PI*2) - (Math.PI/2);
    }
    else if(a.class == "day"){
      var n = d.getDay();
      a.rot = (n/7)*(Math.PI*2) - (Math.PI/2);
    }
    else if(a.class == "hours"){
      var n = d.getHours();
      var m = d.getMinutes();
      a.rot = ((n/12)*(Math.PI*2) - (Math.PI/2)) + ((m/3600)*(Math.PI*2));
    }
    else if(a.class == "mins"){
      var n = d.getMinutes();
      var s = d.getSeconds();
      a.rot = ((n/60)*(Math.PI*2) - (Math.PI/2)) + ((s/3600)*(Math.PI*2));
    }
    else if(a.class == "secs"){
      var n = d.getSeconds();
      var m = d.getMilliseconds();
      a.rot = ((n/60)*(Math.PI*2) - (Math.PI/2)) + ((m/60000)*(Math.PI*2));
    }
    a.draw();
  }
}

function animloop() {
  draw();
  requestAnimFrame(animloop); 
}

init();
animloop();
