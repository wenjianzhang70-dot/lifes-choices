/* 攻略模式页面逻辑（独立于主测，不改 app.js） */
(function(){
var $=function(s){return document.querySelector(s)};
var G=window.GL,type=null,pool='serious',sel=null,qs=[],idx=0,ans=[],you=null,lastPct=0;
var TYPES={char:'Characters',mbti:'MBTI',sign:'Star signs'};
var SV={
 door:'<svg viewBox="0 0 60 60"><path d="M16 54V20a14 14 0 0 1 28 0v34Z" fill="#ffc9d6"/><path d="M16 54V20a14 14 0 0 1 28 0v34" fill="none" stroke="#d98aa0" stroke-width="2.5" stroke-dasharray="3 3"/><circle cx="38" cy="38" r="2.6" fill="#fff"/><path d="M48 8l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1Z" fill="#ffd76a"/></svg>',
 patch:'<svg viewBox="0 0 60 60"><rect x="8" y="8" width="21" height="21" rx="6" fill="#bfe3cf"/><rect x="31" y="8" width="21" height="21" rx="6" fill="#ffd6e3"/><rect x="8" y="31" width="21" height="21" rx="6" fill="#fff1b8"/><rect x="31" y="31" width="21" height="21" rx="6" fill="#d9d0f7"/><path d="M30 6v48M6 30h48" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/></svg>',
 ystar:'<svg viewBox="0 0 60 60"><path d="M30 6l7 15 16 2-12 11 3 16-14-8-14 8 3-16L7 23l16-2Z" fill="#d9d0f7"/><path d="M18 26q12 4 24 0M20 36q10 3 20 0M30 10v38" fill="none" stroke="#fff" stroke-width="1.8"/></svg>',
 moon:'<svg viewBox="0 0 60 60"><path d="M38 8a22 22 0 1 0 14 34A17 17 0 1 1 38 8Z" fill="#e6dede"/></svg>',
 me:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#ffe3ec"/><ellipse cx="50" cy="82" rx="26" ry="18" fill="#ffc4d4"/><circle cx="50" cy="46" r="22" fill="#fff4ee"/><circle cx="42" cy="46" r="2.6" fill="#7a5a64"/><circle cx="58" cy="46" r="2.6" fill="#7a5a64"/><ellipse cx="38" cy="53" rx="4" ry="2.4" fill="#ffc4d4"/><ellipse cx="62" cy="53" rx="4" ry="2.4" fill="#ffc4d4"/><path d="M45 56q5 4 10 0" fill="none" stroke="#7a5a64" stroke-width="2" stroke-linecap="round"/><circle cx="50" cy="22" r="6" fill="#ffc4d4"/></svg>',
 heart:'<svg viewBox="0 0 30 30"><path d="M15 26C3 18 3 9 9 7c3-1 5 1 6 3 1-2 3-4 6-3 6 2 6 11-6 19Z" fill="#ff9fbb"/></svg>',
 house:'<svg viewBox="0 0 60 60"><path d="M10 28 30 10l20 18v24H10Z" fill="#fff1c2"/><rect x="40" y="8" width="6" height="12" rx="2" fill="#e8d59a"/><rect x="24" y="36" width="12" height="16" rx="5" fill="#f2dc9a"/></svg>',
 clock:'<svg viewBox="0 0 60 60"><path d="M14 54V24a16 16 0 0 1 32 0v30Z" fill="#dde8f7"/><circle cx="30" cy="22" r="8" fill="#fff"/><path d="M30 17v5l3 2" stroke="#9fb3d1" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
 hwin:'<svg viewBox="0 0 60 60"><path d="M14 54V24a16 16 0 0 1 32 0v30Z" fill="#ffd6e0"/><path d="M30 34c-7-5-7-10-4-11 2-1 3 0 4 2 1-2 2-3 4-2 3 1 3 6-4 11Z" fill="#fff"/></svg>'
};
function ab(n){return {Aries:'Ar',Taurus:'Ta',Gemini:'Ge',Cancer:'Cn',Leo:'Le',Virgo:'Vi',Libra:'Li',Scorpio:'Sc',Sagittarius:'Sg',Capricorn:'Cp',Aquarius:'Aq',Pisces:'Pi'}[n]||n.slice(0,2)}
var NUM=['1','2','3','4'];
var TRAIT={O:['are up for trying new things','prefer a familiar, steady pace'],I:['take a step forward when you like someone','tend to watch quietly from the side first'],S:['feel steady inside and don\'t spiral easily','notice every little signal and care a lot'],C:['say what you mean out loud','keep things inside and show it through actions']};
var HOOK=['Send this card to a friend who\'s just like them. Is it spot on?','Tag a friend who reminds you of them and get them to try','Try another pick and see who you click with most'];
function vib(p){try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}
function show(id){document.querySelectorAll('.page').forEach(function(p){p.classList.toggle('show',p.id===id)});scrollTo(0,0)}
function theme(){document.body.className='t-gonglue'+(/theme=vangogh/.test(location.search)?' vg':'')}
function av(t,size){if(!t)return SV.me;if(t.type==='char')return ICON(t.motif,'s',size);
  if(t.type==='mbti')return '<span class="gl-tag mb">'+t.name+'</span>';return '<span class="gl-tag sg">'+ab(t.name)+'</span>'}
function openTypes(){sel=null;theme();show('glType')}
function openPick(t){type=t;sel=null;var h='';
  $('#glPickType').textContent=TYPES[t];$('#glPool').hidden=t!=='char';
  var L=G.targets.filter(function(x){return x.type===t&&(t!=='char'||x.pool===pool)});
  L.forEach(function(x){var sub=t==='char'?x.from.replace(/^the (animated film|Japanese series|K-drama|anime|drama|film) /,'')+' · '+x.stage:t==='mbti'?x.nick:x.date;
    h+='<button class="gl-it gl-'+t+'" data-id="'+x.id+'"><span class="gl-av">'+(t==='char'?ICON(x.motif,'s',46):t==='mbti'?'<b>'+x.name+'</b>':'<i>'+ab(x.name)+'</i>')+'</span><span class="gl-nm">'+(t==='char'?'<b>'+x.name+'</b>':t==='sign'?'<b>'+x.name+'</b>':'')+'<small>'+sub+'</small></span></button>'});
  $('#glList').className='gl-list gl-l-'+t;$('#glList').innerHTML=h;
  $('#glList').querySelectorAll('.gl-it').forEach(function(b){b.onclick=function(){vib(10);sel=G.targets.find(function(x){return x.id===b.dataset.id});
    $('#glList').querySelectorAll('.gl-it').forEach(function(o){o.classList.toggle('on',o===b)});$('#glGo').disabled=false}});
  $('#glGo').disabled=true;show('glPick')}
function startQ(){qs=G.next();idx=0;ans=[];$('#glChip').innerHTML='<span>Getting closer to · '+sel.name+'</span>';render();show('glQuiz')}
function render(){var q=qs[idx];$('#glCount').textContent=(idx+1)+' / '+qs.length;var w=(idx/qs.length*100)+'%';$('#glBar').style.width=w;
  var qc=$('#glQcard');qc.classList.remove('flip');void qc.offsetWidth;qc.classList.add('flip');
  $('#glQ').textContent=q.q;var o=$('#glOpts');o.innerHTML='';
  q.opts.forEach(function(op,i){var b=document.createElement('button');b.className='opt'+(ans[idx]===i?' on':'');b.innerHTML='<b>'+'ABCD'[i]+'</b><span>'+op[0]+'</span>';
    b.onpointerdown=function(){vib(12)};b.onclick=function(){pick(i)};o.appendChild(b)});
  $('#glBack').style.visibility=idx?'visible':'hidden'}
function pick(i){ans[idx]=i;vib([8,30,8]);$('#glOpts').querySelectorAll('.opt').forEach(function(b,k){b.classList.toggle('on',k===i)});
  setTimeout(function(){if(idx<qs.length-1){idx++;render()}else result()},160)}
function result(){var r=G.score(qs,ans),t=sel,p=G.match(r,t),tr=G.tier(p);lastPct=p;
  var ks=['O','I','S','C'].sort(function(a,b){var wa=t.bonus.indexOf(a)>=0?.8:1,wb=t.bonus.indexOf(b)>=0?.8:1;return wa*Math.abs(r[a]-t.pref[a])-wb*Math.abs(r[b]-t.pref[b])});
  var tr1=function(k){return TRAIT[k][r[k]>=.5?0:1]},far=ks[3];
  var why='Across these answers you '+tr1(ks[0])+', which is just what they like: '+t.like+'. '+
    (p>=50?'You also '+tr1(ks[1])+'. That makes you easy company for them, too.':'Still, you '+tr1(far)+', which isn\'t quite their rhythm. Give it time and you\'ll find it.');
  var df=Math.max(1,Math.min(3,t.diff+(p<50?1:0)-(p>=80?1:0))),balls='';for(var i=0;i<3;i++)balls+='<i class="'+(i<df?'on':'')+'"></i>';
  var hook=HOOK[(t.id.length+p)%HOOK.length];
  var sub=t.type==='char'?t.from+' · '+t.stage:t.type==='mbti'?t.name+' · '+t.nick:t.name+' · '+t.date;
  var sec=function(n,h,b){return '<div class="sec gs'+n+'"><h4>'+NUM[n]+' · '+h+'</h4>'+b+'</div>'};
  $('#glCard').innerHTML='<div class="head"><span class="badge">Crush Mode · Life\'s Choices</span>'+
   '<div class="gl-duo"><div class="gl-p"><span class="gl-ava">'+(you?ICON(you.motif,'s',84):SV.me)+'</span><small>You'+(you?' · '+you.name:'')+'</small></div>'+
   '<svg class="gl-yarn" viewBox="0 0 90 30"><path d="M4 15C20 0 30 30 45 15S70 0 86 15" fill="none" stroke="#ff9fbb" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/>'+SV.heart.replace('<svg viewBox="0 0 30 30">','<g transform="translate(34 4) scale(.75)">').replace('</svg>','</g>')+'</svg>'+
   '<div class="gl-p"><span class="gl-ava">'+av(t,84)+'</span><small>Them · '+t.name+'</small></div></div>'+
   '<p class="gl-sub">'+sub+'</p>'+
   '<div class="gl-pct"><b>'+p+'<em>%</em></b><span class="gl-note">Just for fun, don\'t take it seriously</span></div>'+
   '<div class="gl-bar"><i style="width:'+p+'%"></i></div>'+
   '<div class="gl-tier gl-'+tr.k+'">'+tr.name+'</div></div>'+
   sec(0,'Why you click','<p>'+why+'</p>')+sec(1,'What you bring them','<p>'+t.gift+'</p>')+
   sec(2,'How tricky','<p class="gl-diff"><span class="gl-balls">'+balls+'</span>'+t.tip+'</p>')+
   sec(3,'Watch out for',t.mines.map(function(m){return '<p class="li">'+m+'</p>'}).join(''))+
   '<div class="hook">'+hook+'</div><div class="foot">A just-for-fun match. Not astrology, a personality assessment or relationship advice.<br>Only fictional characters and type labels. Answers stay on your device; nothing is collected.</div>';
  show('glResult')}
function loadH2C(){return window.html2canvas?Promise.resolve():new Promise(function(ok,no){var s=document.createElement('script');s.src='vendor/html2canvas.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function init(){
  document.querySelectorAll('[data-sv]').forEach(function(e){e.innerHTML=SV[e.dataset.sv]});
  $('#doorGl').onclick=function(){vib(12);you=null;try{var n=sessionStorage.getItem('lc-you');if(n)you=findChar(n)}catch(e){}openTypes()};
  document.querySelectorAll('.gl-type').forEach(function(b){if(b.disabled)return;b.onclick=function(){vib(10);openPick(b.dataset.type)}});
  document.querySelectorAll('#glPool button').forEach(function(b){b.onclick=function(){pool=b.dataset.pool;document.querySelectorAll('#glPool button').forEach(function(o){o.classList.toggle('on',o===b)});openPick('char')}});
  $('#glGo').onclick=function(){if(sel)startQ()};
  $('#glTypeBack').onclick=function(){document.body.className=/theme=vangogh/.test(location.search)?'vg':'';show('start')};
  $('#glPickBack').onclick=openTypes;
  $('#glBack').onclick=function(){if(idx>0){idx--;render()}};
  $('#glSwap').onclick=openTypes;
  $('#glHome').onclick=function(){document.body.className=/theme=vangogh/.test(location.search)?'vg':'';show('start')};
  $('#glClose').onclick=function(){$('#glPrev').classList.add('hide')};
  $('#glSave').onclick=function(){loadH2C().then(function(){return document.fonts.ready}).then(function(){return html2canvas($('#glCard'),{scale:2,backgroundColor:null})}).then(function(c){
    var u=c.toDataURL('image/png');$('#glImg').src=u;$('#glPrev').classList.remove('hide');var a=document.createElement('a');a.href=u;a.download='my-crush-card.png';if(!/MicroMessenger|xhs|discover/i.test(navigator.userAgent))a.click()}).catch(function(){alert('Please take a screenshot instead')})};
  var tg=$('#toGl');if(tg)tg.onclick=function(){var n=($('#card .cname')||{}).textContent;you=findChar(n);try{sessionStorage.setItem('lc-you',n||'')}catch(e){}openTypes()};
}
function findChar(n){var c=null;['serious','funny'].forEach(function(m){QUIZ[m].chars.forEach(function(x){if(x.name===n)c=x})});return c}
init();
window.__gl={openPick:openPick,pick:pick,start:startQ,select:function(id){sel=G.targets.find(function(x){return x.id===id})},pct:function(){return lastPct}};
})();
