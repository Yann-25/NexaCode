/* Latar: hujan angka biner biru (0/1) yang jatuh terus, kolom berlapis supaya terasa berdimensi */
(function(){
const cv=document.getElementById('bgFlow'),ctx=cv.getContext('2d');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const BG='#02101f';
let W,H,C=[],vis=true,last=performance.now();
function mkCol(x,layer,init){
 const size=[10,13,17][layer],row=size*1.28,len=10+(Math.random()*22|0)+layer*6;
 const c={x,layer,size,row,len,sp:[28,48,78][layer]*(.7+Math.random()*.7),a:[.28,.5,.85][layer]*(.6+Math.random()*.5),
  head:init?Math.random()*(H+len*row)-len*row*.3:-Math.random()*H*.6,acc:0,ch:[]};
 for(let i=0;i<len;i++)c.ch.push(Math.random()<.5?'0':'1');
 return c}
function size(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
 C=[];const steps=[15,19,24];
 for(let l=0;l<3;l++){const st=steps[l];for(let x=6+Math.random()*st*.5;x<W;x+=st*(.8+Math.random()*.5)){C.push(mkCol(x,l,true))}}
 C.sort((a,b)=>a.layer-b.layer);draw(0)}
function draw(dt){
 ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);ctx.textAlign='center';ctx.textBaseline='top';
 let lf=-1;
 for(const c of C){
  if(c.layer!==lf){ctx.font=c.size+'px "JetBrains Mono",ui-monospace,monospace';lf=c.layer}
  c.head+=c.sp*dt;c.acc+=c.sp*dt;
  while(c.acc>=c.row){c.acc-=c.row;c.ch.pop();c.ch.unshift(Math.random()<.5?'0':'1')}
  if(Math.random()<.02*dt*60){const k=Math.random()*c.len|0;c.ch[k]=c.ch[k]==='0'?'1':'0'}
  for(let i=0;i<c.len;i++){
   const y=c.head-i*c.row;if(y<-c.row||y>H)continue;
   const f=1-i/c.len,a=c.a*Math.pow(f,1.7);
   if(i===0){ctx.fillStyle='rgba(170,215,255,'+Math.min(1,a*1.25)+')'}
   else if(i<3){ctx.fillStyle='rgba(70,160,255,'+a+')'}
   else{ctx.fillStyle='rgba(30,110,215,'+a+')'}
   ctx.fillText(c.ch[i],c.x,y)}
  if(c.head-c.len*c.row>H){c.head=-Math.random()*H*.5;c.sp=[28,48,78][c.layer]*(.7+Math.random()*.7)}
 }}
function loop(now){if(!vis)return;const dt=Math.min(.05,(now-last)/1000);last=now;draw(dt);requestAnimationFrame(loop)}
addEventListener('resize',size);
document.addEventListener('visibilitychange',()=>{vis=!document.hidden;if(vis&&!reduce){last=performance.now();requestAnimationFrame(loop)}});
size();
if(!reduce)requestAnimationFrame(loop);
})();
