'use client';
import {useEffect,useRef,useState,CSSProperties} from 'react';
import {RotateCcw,Hand,Sparkles} from 'lucide-react';
type Winner={name:string;amount:string;round:number};
export function DrawBowl({count,drawing,winner,lang}:{count:number;drawing:boolean;winner?:Winner;lang:string}){
 const [phase,setPhase]=useState('idle');
 const [stirring,setStirring]=useState(false);
 const [tilt,setTilt]=useState({x:-8,y:0});
 const drag=useRef<{x:number;y:number;rx:number;ry:number}|null>(null);
 const stirTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{if(!drawing){setPhase('idle');return;}setPhase('mix');const lift=setTimeout(()=>setPhase('lift'),2100);return()=>clearTimeout(lift);},[drawing]);
 useEffect(()=>()=>{if(stirTimer.current)clearTimeout(stirTimer.current);},[]);
 const ml=lang==='ml';const moving=drawing||stirring;
 return <div className={'draw-theatre '+(moving?'is-moving ':'')+'phase-'+phase}>
   <div className="draw-spotlight"/>
   <div className="bowl-interaction" aria-label={ml?'പാത്രം തിരിക്കാൻ വലിക്കുക':'Drag to rotate the bowl'} onPointerDown={e=>{if(e.button!==0)return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,rx:tilt.x,ry:tilt.y};}} onPointerMove={e=>{if(!drag.current)return;setTilt({x:Math.max(-22,Math.min(8,drag.current.rx-(e.clientY-drag.current.y)*.2)),y:Math.max(-32,Math.min(32,drag.current.ry+(e.clientX-drag.current.x)*.25))});}} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}>
     <div className="bowl-ground"/>
     <div className="glass-scene" style={{'--view-x':tilt.x+'deg','--view-y':tilt.y+'deg'} as CSSProperties}>
       <div className="glass-rim back-rim"/>
       <div className="glass-back"/>
       <div className="paper-chamber" aria-hidden="true">{Array.from({length:Math.min(count+(drawing&&winner?1:0),100)},(_,i)=><div className="paper-position" key={i} style={{'--px':((i*47+19)%75-37)+'px','--py':((i*31+7)%80-25)+'px','--pz':((i*29+11)%100-50)+'px','--turn':(i*67%170-85)+'deg','--delay':(-i*.19)+'s','--height':(-25-(i%5)*9)+'px'} as CSSProperties}><div className="paper-orbit"><div className="paper-slip"><span className="paper-half paper-left"/><span className="paper-half paper-right"/><span className="paper-fold"/></div></div></div>)}</div>
       <div className="glass-front"><span className="glass-glint"/><span className="glass-glint narrow"/></div>
       <div className="glass-rim front-rim"/>
       <div className="glass-foot"/>
     </div>
     {drawing&&<div className="rising-slip" aria-hidden="true"><span/><span/></div>}
   </div>
   {winner&&!drawing&&<div key={winner.round} className="unfolded-result" role="status"><div className="result-wing wing-left"/><div className="result-wing wing-right"/><div className="result-writing"><Sparkles size={20}/><small>{ml?'അഭിനന്ദനങ്ങൾ':'CONGRATULATIONS'} · {ml?'മാസം':'ROUND'} {winner.round}</small><strong>{winner.name}</strong><b>{winner.amount}</b></div></div>}
   <div className="bowl-caption" aria-live="polite">{drawing?<span className="draw-suspense"><i/>{phase==='mix'?(ml?'കുറികൾ കലർത്തുന്നു…':'Mixing the folded papers…'):(ml?'നിങ്ങളുടെ ഭാഗ്യക്കുറി തുറക്കുന്നു…':'One paper rises. Your moment is here…')}</span>:<span><Hand size={14}/>{ml?'പാത്രം തിരിക്കാൻ വലിക്കുക':'Drag the bowl to look around'}</span>}</div>
   <div className="bowl-controls"><button className="secondary" disabled={drawing||stirring||count===0} onClick={()=>{setStirring(true);if(stirTimer.current)clearTimeout(stirTimer.current);stirTimer.current=setTimeout(()=>setStirring(false),1800);}}><RotateCcw size={15}/>{stirring?(ml?'കലർത്തുന്നു…':'Mixing…'):(ml?'കുറികൾ കലർത്തുക':'Mix papers')}</button><button className="text-button" onClick={()=>setTilt({x:-8,y:0})}>{ml?'കാഴ്ച പുനഃക്രമീകരിക്കുക':'Reset view'}</button></div>
 </div>;
}
