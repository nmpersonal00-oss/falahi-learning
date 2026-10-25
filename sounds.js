/* Falahi Bloom soft UI feedback · entirely generated locally with Web Audio.
   Sound effects run only after user interaction. No recordings, speech synthesis or network requests. */
(function(){
'use strict';
const KEY='falahi-bloom-audio';
let settings={enabled:true,volume:0.37};
try{settings={...settings,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){}
let context=null;
function ctx(){if(!settings.enabled)return null;try{
 if(!context)context=new (window.AudioContext||window.webkitAudioContext)();
 if(context.state==='suspended')context.resume().catch(()=>{});
 return context;
}catch(e){return null}}
function tone(c,frequency,when,duration,amplitude,type='sine'){
 const o=c.createOscillator(),gain=c.createGain();o.type=type;o.frequency.setValueAtTime(frequency,when);
 gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(Math.max(.0002,amplitude*settings.volume),when+0.012);
 gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
 o.connect(gain).connect(c.destination);o.start(when);o.stop(when+duration+.025)
}
function play(kind='click'){
 const c=ctx();if(!c)return;
 const t=c.currentTime+.012;
 switch(kind){
  case 'click':tone(c,690,t,.075,.055,'sine');tone(c,920,t+.034,.07,.018,'sine');break;
  case 'right':tone(c,659.25,t,.16,.16);tone(c,880,t+.095,.22,.14);tone(c,1046.5,t+.205,.31,.11);break;
  case 'wrong':tone(c,392,t,.16,.105,'triangle');tone(c,329.63,t+.12,.21,.095,'sine');break;
  case 'complete':[[523.25,0],[659.25,.12],[783.99,.24],[1046.5,.36],[1318.5,.5]].forEach(([hz,dt],i)=>tone(c,hz,t+dt,.4,i===4?.13:.10));break;
  case 'soft':tone(c,740,t,.15,.075);tone(c,988,t+.15,.20,.075);break;
 }
}
function store(){try{localStorage.setItem(KEY,JSON.stringify(settings))}catch(e){}}
function setEnabled(v){settings.enabled=Boolean(v);store()}
function setVolume(v){settings.volume=Math.max(0,Math.min(1,Number(v)));store()}
function getSettings(){return {...settings}}
window.FALAHI_SOUND={play,setEnabled,setVolume,getSettings};
// Auditory cues for normal buttons, excluding answer controls (which have outcome sounds).
document.addEventListener('click',function(e){const b=e.target.closest('button');if(!b||b.disabled)return;
 if(b.matches('[data-answer],[data-scenario],[data-dchoice],[data-gchoice],[data-mem],[data-grade]'))return;
 if(b.matches('[data-act="checkSpell"],[data-act="checkSentence"],[data-act="grammarNext"],[data-act="dialogueNext"],[data-act="nextRound"],[data-act="markStudy"]'))return;
 if(b.matches('[data-audio-toggle]'))return;
 play('click');
});
})();
