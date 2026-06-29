/* ============================================================

   Cindy Care v2 — premium nutrition assistant (vanilla JS)

   Finish-First rotation · Nutrition Score · localStorage

   ============================================================ */

'use strict';



/* ---------- FOOD DATABASE (พร้อม benefits / โภชนาการ / suitable) ---------- */

const SEED_FOODS = [

  { id:'hills_cd', name:"Hill's c/d", cat:'wet', complete:true, urinary:true, meals:3, grams:82, kcal100:90, protein:9, fat:5, moisture:78, daysOpen:2,

    storage:'แช่ตู้เย็น ปิดสนิท กินภายใน 2 วัน', desc:'อาหารเปียกสูตรดูแลทางเดินปัสสาวะระดับพรีเมียม โปรตีนคุณภาพสูง ความชื้นสูง',

    benefits:['ดูแลทางเดินปัสสาวะ','ลดการเกิดผลึก/นิ่ว','อาหารครบส่วน (Complete)','ความชื้นสูง','โปรตีนพรีเมียม'], suitable:['urinary'] },

  { id:'peace', name:'Peace Urinary', cat:'wet', complete:true, urinary:true, meals:3, grams:80, kcal100:85, protein:10, fat:5, moisture:79, daysOpen:2,

    storage:'แช่ตู้เย็น กินภายใน 2 วัน', desc:'อาหารเปียกดูแลทางเดินปัสสาวะ ครบส่วน เพิ่มความชุ่มชื้น',

    benefits:['ดูแลทางเดินปัสสาวะ','อาหารครบส่วน','เพิ่มน้ำในร่างกาย'], suitable:['urinary'] },

  { id:'moochi', name:'Moochi', cat:'wet', complete:true, urinary:false, meals:3, grams:70, kcal100:80, protein:10, fat:5, moisture:80, daysOpen:2,

    storage:'แช่ตู้เย็น กินภายใน 2 วัน', desc:'อาหารเปียกครบส่วน เนื้อนุ่ม ย่อยง่าย',

    benefits:['อาหารครบส่วน','ย่อยง่าย','เพิ่มความอยากอาหาร'], suitable:['digestive'] },

  { id:'delisci', name:'Delisci', cat:'wet', complete:true, urinary:false, meals:3, grams:70, kcal100:80, protein:10, fat:5, moisture:80, daysOpen:2,

    storage:'แช่ตู้เย็น กินภายใน 2 วัน', desc:'อาหารเปียกเนื้อชอส ครบส่วน หอมน่ากิน',

    benefits:['อาหารครบส่วน','หอมน่ากิน','ความชื้นสูง'], suitable:[] },

  { id:'complete_pudding', name:'Complete Pudding', cat:'wet', complete:true, urinary:false, meals:2, grams:50, kcal100:75, protein:8, fat:4, moisture:80, daysOpen:2,

    storage:'แช่ตู้เย็น กินภายใน 2 วัน', desc:'พุดดิ้งครบส่วน เนื้อเนียนนุ่ม',

    benefits:['อาหารครบส่วน','เนื้อนุ่ม ทานง่าย'], suitable:['digestive'] },

  { id:'minican', name:'Minican', cat:'wet', complete:true, urinary:false, meals:2, grams:50, kcal100:85, protein:11, fat:6, moisture:78, daysOpen:2,

    storage:'แช่ตู้เย็น กินภายใน 2 วัน', desc:'อาหารกระป๋องเล็ก เนื้อแน่น เสริมโปรตีน',

    benefits:['อาหารครบส่วน','เสริมโปรตีน'], suitable:['protein'] },

  { id:'bear', name:'Bear Pudding', cat:'wet', complete:false, urinary:false, supplement:true, meals:2, grams:40, kcal100:70, protein:6, fat:3, moisture:80, daysOpen:2,

    storage:'แช่ตู้เย็น กินภายใน 2 วัน', desc:'พุดดิ้งเสริม กระตุ้นความอยากอาหาร (ไม่ใช่อาหารครบส่วน)',

    benefits:['กระตุ้นความอยากอาหาร','อาหารเสริม (Supplement)','ไม่ใช่อาหารครบส่วน'], suitable:[] },

  { id:'miso', name:'Miso', cat:'wet', complete:true, urinary:true, meals:1, grams:30, kcal100:80, protein:10, fat:5, moisture:80, daysOpen:1,

    storage:'แช่ตู้เย็น กินภายใน 1 วัน', desc:'ถ้วยเล็กดูแลทางเดินปัสสาวะ ครบส่วน',

    benefits:['ดูแลทางเดินปัสสาวะ','อาหารครบส่วน'], suitable:['urinary'] },

  { id:'special', name:'The Special Table', cat:'wet', complete:true, urinary:false, meals:1, grams:30, kcal100:90, protein:11, fat:6, moisture:77, daysOpen:1,

    storage:'แช่ตู้เย็น กินภายใน 1 วัน', desc:'อาหารเปียกเกรดพรีเมียม บำรุงร่างกายโดยรวม',

    benefits:['อาหารครบส่วน','เกรดพรีเมียม'], suitable:[] },

  { id:'push', name:'Push! Strong Body', cat:'wet', complete:true, urinary:false, meals:4, grams:100, kcal100:80, protein:11, fat:4, moisture:82, daysOpen:2,

    storage:'แช่ตู้เย็น กินภายใน 2 วัน', desc:'ซองใหญ่ Tuna & Shirasu ครบส่วน เสริมความแข็งแรง',

    benefits:['อาหารครบส่วน','โปรตีนสูง','ความชื้นสูง'], suitable:['protein'] },

  { id:'rc_urinary', name:'Royal Canin Urinary', cat:'dry', complete:true, urinary:true, meals:0, grams:0, gramsPerDay:22, kcal100:360, protein:30, fat:12, moisture:8, daysOpen:45,

    storage:'เก็บที่แห้ง ปิดสนิท', desc:'อาหารเม็ดดูแลทางเดินปัสสาวะ ให้ 20–25 ก./วัน (ไม่ free feeding)',

    benefits:['ดูแลทางเดินปัสสาวะ','อาหารครบส่วน','เสริมการขบเคี้ยว'], suitable:['urinary','weight'] },

  // soup

  { id:'pramy', name:'Pramy Broths', cat:'soup', complete:false, supplement:true, meals:0, grams:40, kcal100:30, protein:3, fat:1, moisture:92, daysOpen:1,

    storage:'แช่ตู้เย็น กินภายใน 1 วัน', desc:'ซุปเพิ่มน้ำ ช่วยบำรุงทางเดินปัสสาวะและไต', benefits:['เพิ่มน้ำในร่างกาย','ดีต่อทางเดินปัสสาวะ'], suitable:['urinary'] },

  { id:'peace_soup', name:'Peace Soup', cat:'soup', complete:false, supplement:true, meals:0, grams:40, kcal100:28, protein:3, fat:1, moisture:93, daysOpen:1,

    storage:'แช่ตู้เย็น กินภายใน 1 วัน', desc:'ซุปใส ย่อยง่าย เพิ่มน้ำ', benefits:['เพิ่มน้ำในร่างกาย','ย่อยง่าย'], suitable:['urinary'] },

  { id:'moochi_soup', name:'Moochi Soup', cat:'soup', complete:false, supplement:true, meals:0, grams:40, kcal100:35, protein:4, fat:1, moisture:90, daysOpen:1,

    storage:'แช่ตู้เย็น กินภายใน 1 วัน', desc:'ซุปครีมเนียน เพิ่มความอยากอาหาร', benefits:['เพิ่มน้ำในร่างกาย','กระตุ้นความอยากอาหาร'], suitable:[] },

  // freeze-dried

  { id:'bear_grove', name:'Bear Grove (Freeze Dried)', cat:'freeze', complete:false, supplement:true, meals:0, kcal100:350, protein:55, fat:8, moisture:5, daysOpen:60,

    storage:'เก็บที่แห้ง ปิดสนิท', desc:'ฟรีซดรายเนื้อไก่ 100% โรยเพิ่มโปรตีน', benefits:['โปรตีนสูง','โรยเพิ่มความน่ากิน'], suitable:['protein'] },

  { id:'bright_sakura', name:'Bright Sakura (Freeze Dried)', cat:'freeze', complete:false, supplement:true, meals:0, kcal100:350, protein:55, fat:8, moisture:5, daysOpen:60,

    storage:'เก็บที่แห้ง ปิดสนิท', desc:'ฟรีซดราย หอม เพิ่มความอยากอาหาร', benefits:['เพิ่มความอยากอาหาร','โปรตีนสูง'], suitable:[] },

  // powder

  { id:'kelly', name:'Kelly & Co', cat:'powder', complete:false, supplement:true, meals:0, daysOpen:90, storage:'เก็บที่แห้ง', desc:'ผงโรยบำรุงร่างกาย', benefits:['บำรุงร่างกาย','เสริมความอยากอาหาร'], suitable:[] },

  { id:'uboost', name:'U-Boost', cat:'powder', complete:false, supplement:true, meals:0, daysOpen:90, storage:'เก็บที่แห้ง', desc:'ผงโรยบำรุงผิวหนัง+ภูมิคุ้มกัน', benefits:['บำรุงผิวหนัง/ขน','เสริมภูมิคุ้มกัน'], suitable:[] },

  { id:'gager', name:'Gager', cat:'powder', complete:false, supplement:true, meals:0, daysOpen:90, storage:'เก็บที่แห้ง', desc:'ผงโรยบำรุงข้อ/กระดูก', benefits:['บำรุงข้อ/กระดูก'], suitable:[] },

  // treat (alternate days)

  { id:'vf_core', name:'VF Core', cat:'treat', complete:false, supplement:true, meals:0, alt:'even', daysOpen:1, storage:'ปิดสนิท', desc:'ขนมแมวเลีย เสริมโภชนาการ (วันคู่)', benefits:['เสริมโภชนาการ','ใช้เป็นรางวัล (วันละ 1)'], suitable:[] },

  { id:'vetology', name:'Vetology', cat:'treat', complete:false, supplement:true, meals:0, alt:'odd', daysOpen:1, storage:'ปิดสนิท', desc:'ขนมแมวเลีย เสริมภูมิคุ้มกัน (วันคี่)', benefits:['เสริมภูมิคุ้มกัน','ใช้เป็นรางวัล (วันละ 1)'], suitable:[] },

];



const CAT = { wet:'🥫 เปียก', dry:'🌾 เม็ด', soup:'🍲 ซุป', freeze:'❄️ ฟรีซดราย', powder:'✨ ผง', treat:'🍪 ขนม' };

const CATC = { wet:'#ff8fb0', dry:'#e0a84f', soup:'#5fa6d6', freeze:'#a98fd6', powder:'#5fc49a', treat:'#ef9a72' };

const CLABEL = { wet:'เปียก', dry:'เม็ด', soup:'ซุป', freeze:'ฟรีซดราย', powder:'ผง', treat:'ขนม' };

const CAT_ORDER = ['wet','dry','soup','freeze','powder','treat'];

const SUIT_LABEL = { urinary:'ทางเดินปัสสาวะ', hairball:'ก้อนขน', digestive:'ระบบย่อย', weight:'ควบคุมน้ำหนัก', protein:'โปรตีนสูง' };

const MEAL_SLOTS = [ {key:'morning',label:'มื้อเช้า',emoji:'🌅'}, {key:'lunch',label:'มื้อกลางวัน',emoji:'☀️'}, {key:'dinner',label:'มื้อเย็น',emoji:'🌙'} ];

const SOURCES = ['Shopee','Lazada','TikTok Shop','ร้านสัตว์เลี้ยง','คลินิก/รพ.สัตว์','Facebook','Line','อื่นๆ'];



/* ---------- STATE ---------- */

const KEY = 'cindyCare.v3';

function fresh() {

  return {

    profile: { name:'Cindy', weight:3.7, factor:1.2, dark:false, photo:'', mealTimes:['08:00','13:00','18:00'] },

    foods: JSON.parse(JSON.stringify(SEED_FOODS)),

    inventory: {},        // foodId: { packs, price, source, buyDate }

    activePack: null,     // { foodId, total, remaining, openedAt }

    lastFinished: null,

    logs: {},             // dk: { morning:{done,foodId,kcal,grams,time}, ... }

    checks: {},           // dk_slot or dk_day : { treat, med_<id> }

    notes: {},            // dk: text

    weights: [{date:todayKey(), kg:3.7}],

    poops: {}, pees: {}, water: {}, meds: [], vetVisits: [], purchases: [],

  };

}

let state = load();

function load() { try { const r = localStorage.getItem(KEY); if (!r) return fresh(); const s = Object.assign(fresh(), JSON.parse(r)); if (!s.foods || !s.foods.length) s.foods = JSON.parse(JSON.stringify(SEED_FOODS)); return s; } catch (e) { return fresh(); } }

function save() { localStorage.setItem(KEY, JSON.stringify(state)); cloudPush(); }



/* ---------- Cloud Sync state (เก็บแยกจาก state ที่ซิงก์) ---------- */

let cloudReady=false, cloudDoc=null, applyingRemote=false, pushTimer=null;

const deviceId = (()=>{ let id=localStorage.getItem('cc_device'); if(!id){ id='d'+Math.random().toString(36).slice(2); localStorage.setItem('cc_device',id); } return id; })();

function getCloud(){ try{ return JSON.parse(localStorage.getItem('cc_cloud')||'null'); }catch(e){ return null; } }

function setCloud(c){ localStorage.setItem('cc_cloud', JSON.stringify(c)); }



/* ---------- helpers ---------- */

function todayKey(d = new Date()) { const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), a=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${a}`; }

function dkPretty(dk){ const [y,m,d]=dk.split('-').map(Number); return new Date(y,m-1,d).toLocaleDateString('th-TH',{day:'numeric',month:'short'}); }

function addDaysKey(n){ const d=new Date(); d.setDate(d.getDate()+n); return todayKey(d); }

const foods = () => state.foods;

const findFood = id => state.foods.find(f => f.id === id);

const inv = id => state.inventory[id] || { packs:0 };

function daysSince(dk){ if(!dk)return 0; const [y,m,d]=dk.split('-').map(Number); const t=new Date(); t.setHours(0,0,0,0); return Math.floor((t-new Date(y,m-1,d))/86400000); }

// กินได้อีกกี่วัน: แบบกรัม = กรัมคงเหลือ÷กรัมต่อวัน · แบบมื้อ = (ชิ้น×มื้อ)/3 (ไม่ติดลบ)

function isGramFood(f){ return f.dry || f.byGram || (f.gramsPerDay && !f.meals); }

function foodDaysLeft(f){

  if(isGramFood(f)){ const g=inv(f.id).grams||0; const gpd=f.gramsPerDay||20; return gpd>0?Math.max(0,Math.floor(g/gpd)):0; }

  if(f.meals){ return Math.max(0,Math.floor((inv(f.id).packs||0)*f.meals/3)); }

  return null; // อาหารเสริม (ฟรีซดราย/ผง/ขนม) นับเป็นชิ้น

}

// ข้อมูลใกล้หมด (ครอบคลุมทั้งแบบวัน และแบบนับชิ้นสำหรับของเสริม)

function lowInfo(f){

  const dl=foodDaysLeft(f);

  if(dl!=null) return { sort:dl, low:dl<=4, out:dl<=0, label: dl<=0?'หมด':('~'+dl+' วัน') };

  const p=inv(f.id).packs||0;

  return { sort:100+p, low:p<=1, out:p<=0, label: p<=0?'หมด':('เหลือ '+p) };

}

function targetKcal(){ const kg=state.profile.weight||3.7; return Math.round(70*Math.pow(kg,0.75)*(state.profile.factor||1.2)); }

function gramsPerMeal(f){ return f.meals ? Math.round(f.grams/f.meals) : 0; }

function kcalPerMeal(f){ if(!f||!f.meals||!f.kcal100) return 0; return Math.round((f.grams/f.meals/100)*f.kcal100); }

function todaysTreat(d=new Date()){ const even=d.getDate()%2===0; return state.foods.find(f=>f.cat==='treat'&&f.alt===(even?'even':'odd')); }

function powderOfDay(d=new Date()){ const ps=foods().filter(f=>f.cat==='powder'); const sp=ps.filter(f=>(inv(f.id).packs||0)>0); const pool=sp.length?sp:ps; return pool.length?pool[d.getDate()%pool.length]:null; }



/* รูปสินค้า: ใช้รูปจริง (img) ถ้าไม่มี → placeholder พรีเมียม (อักษรย่อ) */

function foodSrc(f){ return (f.img && f.img.trim()) ? f.img.trim() : `assets/${f.id}.png`; }

function pic(f, cls=''){

  const letter = ((f.name||'?').trim()[0] || '🐾').replace(/['"\\]/g,'');

  const alt = (f.name||'').replace(/"/g,'');

  return `<img class="${cls}" src="${foodSrc(f)}" alt="${alt}" loading="lazy" onerror="imgErr(this,'${letter}')">`;

}

window.imgErr = (el, letter) => { const s = document.createElement('span'); s.className = 'pcard-ph'; s.textContent = letter || '🐾'; el.replaceWith(s); };



/* ---------- FINISH-FIRST ---------- */

function mealFoods(){ return foods().filter(f => f.meals > 0); }

function canOpen(){ return !state.activePack || state.activePack.remaining <= 0; }

function openPack(id){

  const f = findFood(id); if (!f || !f.meals) return;

  if (!canOpen()) { toast('กินแพ็คที่เปิดอยู่ให้หมดก่อน'); return; }

  if ((inv(id).packs||0) <= 0) { toast('ไม่มีสต็อก เพิ่มก่อนนะ'); return; }

  state.inventory[id].packs -= 1;

  state.activePack = { foodId:id, total:f.meals, remaining:f.meals, openedAt:todayKey() };

  save(); toast(`เปิด ${f.name} แล้ว`); closeModal(); renderAll();

}

function autoOpenNext(){

  const cand = mealFoods().filter(f => (inv(f.id).packs||0) > 0);

  if (!cand.length) return false;

  cand.sort((a,b)=> (b.complete?1:0)-(a.complete?1:0) || (inv(b.id).packs)-(inv(a.id).packs));

  const pick = cand.find(f => f.id !== state.lastFinished) || cand[0];

  state.inventory[pick.id].packs -= 1;

  state.activePack = { foodId:pick.id, total:pick.meals, remaining:pick.meals, openedAt:todayKey() };

  return true;

}

function consumeMeal(){

  if (!state.activePack) return;

  state.activePack.remaining -= 1;

  if (state.activePack.remaining <= 0) { state.lastFinished = state.activePack.foodId; state.activePack = null; }

}



// คิวมื้ออาหารตาม Finish-First (ไม่แก้ state) — คืน array ของ foodId

function buildQueue(){

  const q = [];

  if (state.activePack && state.activePack.remaining > 0) for (let i=0;i<state.activePack.remaining;i++) q.push(state.activePack.foodId);

  // จำลองลำดับเปิดถัดไป (rotate)

  const stock = {}; mealFoods().forEach(f => stock[f.id] = inv(f.id).packs||0);

  let last = state.lastFinished;

  let guard = 0;

  while (guard++ < 200) {

    const cand = mealFoods().filter(f => stock[f.id] > 0);

    if (!cand.length) break;

    cand.sort((a,b)=> (b.complete?1:0)-(a.complete?1:0) || stock[b.id]-stock[a.id]);

    const pick = cand.find(f => f.id !== last) || cand[0];

    stock[pick.id]--; last = pick.id;

    for (let i=0;i<pick.meals;i++) q.push(pick.id);

  }

  return q;

}

function todayPlan(){

  const day = state.logs[todayKey()] || {}; const q = buildQueue(); let qi = 0;

  return MEAL_SLOTS.map(s => {

    const e = day[s.key];

    if (e && e.done) return { slot:s, foodId:e.foodId, done:true, kcal:e.kcal };

    return { slot:s, foodId:q[qi++]||null, done:false };

  });

}

function tomorrowPlan(){

  const day = state.logs[todayKey()] || {};

  const pending = MEAL_SLOTS.filter(s => !(day[s.key] && day[s.key].done)).length;

  const q = buildQueue(); let qi = pending;

  return MEAL_SLOTS.map(s => ({ slot:s, foodId:q[qi++]||null }));

}



function logMeal(slotKey){

  if (!state.activePack || state.activePack.remaining <= 0) autoOpenNext();

  if (!state.activePack) { toast('ไม่มีอาหารในสต็อก — เพิ่มที่หน้าอาหาร'); return; }

  const f = findFood(state.activePack.foodId);

  const dk = todayKey();

  state.logs[dk] = state.logs[dk] || {};

  state.logs[dk][slotKey] = { done:true, foodId:f.id, kcal:kcalPerMeal(f), grams:gramsPerMeal(f), time:new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'}) };

  consumeMeal(); save(); toast('บันทึกมื้อแล้ว 🍽'); renderAll();

}

function undoMeal(slotKey){

  const dk = todayKey(), e = (state.logs[dk]||{})[slotKey]; if (!e) return;

  if (state.activePack && state.activePack.foodId === e.foodId && state.activePack.remaining < state.activePack.total) state.activePack.remaining++;

  else if (!state.activePack) { const f=findFood(e.foodId); if(f&&f.meals) state.activePack={foodId:e.foodId,total:f.meals,remaining:1,openedAt:dk}; }

  delete state.logs[dk][slotKey]; save(); toast('ยกเลิกแล้ว'); renderAll();

}



/* ---------- NUTRITION SCORE ---------- */

function computeNutrition(dk){

  const day = state.logs[dk] || {};

  const eaten = MEAL_SLOTS.map(s=>day[s.key]).filter(e=>e&&e.done).map(e=>findFood(e.foodId)).filter(Boolean);

  const dayck = state.checks[dk+'_day'] || {};

  if (!eaten.length) return { score:0, hydration:0, protein:0, urinary:0, complete:0, vitamin:0, kcal:0, eatenCount:0 };

  const avg = arr => arr.reduce((a,b)=>a+b,0)/arr.length;

  const hydration = Math.round(Math.min(100, avg(eaten.map(f=>(f.moisture||0)))/80*100));

  const protein = Math.round(Math.min(100, avg(eaten.map(f=>(f.protein||0)))/10*100));

  const urinary = Math.round((eaten.filter(f=>f.urinary).length/eaten.length)*100);

  const complete = Math.round((eaten.filter(f=>f.complete).length/eaten.length)*100);

  const vitamin = dayck.treat || eaten.some(f=>f.supplement) ? 100 : 45;

  const score = Math.round((hydration*0.25 + protein*0.2 + urinary*0.25 + complete*0.2 + vitamin*0.1));

  const kcal = MEAL_SLOTS.map(s=>day[s.key]).filter(e=>e&&e.done).reduce((a,e)=>a+(e.kcal||0),0);

  return { score, hydration, protein, urinary, complete, vitamin, kcal, eatenCount:eaten.length };

}

function aiSummary(n){

  if (!n.eatenCount) return { lines:['ยังไม่ได้บันทึกมื้อวันนี้'], tip:'เริ่มจากมื้อเช้าได้เลย 🍽' };

  const ok = []; if (n.complete>=60) ok.push('อาหารครบส่วน'); if (n.urinary>=50) ok.push('ดูแลทางเดินปัสสาวะ'); if (n.hydration>=75) ok.push('ความชื้นสูง'); if (n.protein>=70) ok.push('โปรตีนเพียงพอ');

  let tip = 'โภชนาการวันนี้ดีมาก 🎉';

  if (n.hydration < 70) tip = 'ความชุ่มชื้นน้อยไปนิด — เพิ่มซุป/น้ำ ~15 มล.';

  else if (n.urinary < 50) tip = 'เน้นสูตรดูแลทางเดินปัสสาวะเพิ่มอีกมื้อ';

  else if (n.complete < 60) tip = 'เพิ่มอาหารครบส่วน (Complete) อีกหน่อย';

  return { lines: ok.length?ok:['ได้รับสารอาหารบางส่วน'], tip };

}



/* ---------- NAV ---------- */

function showView(v){ document.querySelectorAll('.view').forEach(x=>x.classList.remove('active')); document.getElementById('view-'+v)?.classList.add('active'); document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.view===v)); window.scrollTo({top:0,behavior:'smooth'}); }

document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));



/* ---------- RENDER ALL ---------- */

function renderAll(){ applyTheme(); renderHome(); renderCalendar(); renderFood(); renderShop(); renderHealth(); }



/* ===== HOME ===== */

function renderHome(){

  const p = state.profile;

  const h = new Date().getHours();

  const greet = h<11?'สวัสดีตอนเช้า ☀️':(h<17?'สวัสดีตอนบ่าย 🌤':'สวัสดีตอนค่ำ 🌙');

  document.getElementById('heroGreet').textContent = greet;

  document.getElementById('heroDate').textContent = new Date().toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long'});

  document.querySelector('.hero-name').textContent = p.name;

  document.getElementById('brandSub').textContent = 'น้อง '+p.name;

  const catImg = p.photo ? `<img src="${p.photo}" alt="">` : '🐱';

  document.getElementById('heroAvatar').innerHTML = catImg;

  document.getElementById('catAvatar').innerHTML = catImg;



  // today meals

  const plan = todayPlan();

  const doneCount = plan.filter(m=>m.done).length;

  document.getElementById('mealsProgress').textContent = `${doneCount}/3 มื้อ`;

  const times = p.mealTimes || ['08:00','13:00','18:00'];

  const powderToday = powderOfDay();

  document.getElementById('todayMeals').innerHTML = plan.map((m,i)=>{

    const f = m.foodId ? findFood(m.foodId) : null;

    return `<div class="meal ${m.done?'done':''}">

      <div class="meal-thumb">${f?pic(f):'<span class="pcard-ph">🍽</span>'}</div>

      <div class="meal-info">

        <div class="meal-when">${m.slot.emoji} ${m.slot.label} · ${times[i]}${i===0&&powderToday?' · ✨ โรย '+powderToday.name:''}</div>

        <div class="meal-food">${f?f.name:'— ยังไม่มีอาหาร'}</div>

        <div class="meal-kcal">${m.done?'กินแล้ว '+(m.kcal||0)+' kcal':(f?'~'+kcalPerMeal(f)+' kcal':'เพิ่มอาหารในสต็อก')}</div>

      </div>

      ${m.done

        ? `<button class="done-btn is-done" onclick="undoMeal('${m.slot.key}')">✓</button>`

        : `<button class="done-btn" onclick="logMeal('${m.slot.key}')">กินแล้ว</button>`}

    </div>`;

  }).join('');



  renderRecommend();



  // nutrition score

  const n = computeNutrition(todayKey());

  const C = 2*Math.PI*48;

  const off = C*(1-n.score/100);

  const col = n.score>=75?'var(--good)':(n.score>=45?'var(--gold)':'var(--danger)');

  const bar = (label,val,c)=>`<div class="sbar-row"><div class="sbar-top"><span>${label}</span><span>${val}</span></div><div class="sbar-track"><div class="sbar-fill" style="width:${val}%;background:${c}"></div></div></div>`;

  document.getElementById('scoreCard').innerHTML = `

    <div class="ring">

      <svg width="110" height="110"><circle cx="55" cy="55" r="48" stroke="var(--line)" stroke-width="11" fill="none"/>

      <circle cx="55" cy="55" r="48" stroke="${col}" stroke-width="11" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${off}"/></svg>

      <div class="ring-num"><b>${n.score}</b><small>/100</small></div>

    </div>

    <div class="score-bars">

      ${bar('💧 ความชุ่มชื้น',n.hydration,'var(--blue-deep)')}

      ${bar('🥩 โปรตีน',n.protein,'var(--pink-deep)')}

      ${bar('🩺 Urinary',n.urinary,'var(--blue)')}

      ${bar('🍱 ครบส่วน',n.complete,'var(--good)')}

      ${bar('✨ วิตามิน/เสริม',n.vitamin,'var(--lav)')}

    </div>`;



  // open package

  const op = document.getElementById('openPackCard');

  if (state.activePack){

    const f = findFood(state.activePack.foodId); const eaten = state.activePack.total-state.activePack.remaining;

    const pct = Math.round(eaten/state.activePack.total*100);

    const since=daysSince(state.activePack.openedAt); const safe=f.daysOpen||3; const left=safe-since;

    const warn = left<=0

      ? `<div class="open-warn">⚠️ เปิดมา ${since} วัน — เกิน ${safe} วันแล้ว ควรทิ้ง ไม่ควรให้กินต่อ</div>`

      : `<div class="open-note">เปิดมา ${since} วัน · ควรกินหมดภายในอีก <b>${left} วัน</b> (เก็บได้ ${safe} วัน)</div>`;

    op.innerHTML = `<div class="pack-head"><div class="pack-thumb">${pic(f)}</div><div><div class="meal-food">${f.name}</div><div class="meal-kcal">เปิดเมื่อ ${dkPretty(state.activePack.openedAt)}</div></div></div>

      <div class="prog-track"><div class="prog-fill" style="width:${pct}%"></div></div>

      <div class="prog-meta"><span>เหลือ <b>${state.activePack.remaining}</b>/${state.activePack.total} มื้อ</span><span>${pct}%</span></div>

      ${warn}`;

  } else op.innerHTML = `<div class="empty">ยังไม่มีแพ็คที่เปิด — กด "กินแล้ว" หรือเปิดที่หน้าอาหาร</div>`;



  // tomorrow (รายมื้อ + โรยผง + ขนม)

  const times2 = p.mealTimes || ['08:00','13:00','18:00'];

  const tomD = new Date(); tomD.setDate(tomD.getDate()+1);

  const powders2 = foods().filter(f=>f.cat==='powder'); const sp2 = powders2.filter(f=>(inv(f.id).packs||0)>0); const pool2 = sp2.length?sp2:powders2;

  const pw2 = pool2.length ? pool2[tomD.getDate()%pool2.length] : null;

  const tt2 = todaysTreat(tomD);

  document.getElementById('tomorrowCard').innerHTML = tomorrowPlan().map((m,i)=>{ const f=m.foodId?findFood(m.foodId):null;

    return `<div class="mini-meal"><span class="mm-when">${m.slot.emoji} ${m.slot.label} ${times2[i]}</span>${f?`<div class="mm-thumb">${pic(f)}</div><span>${f.name}</span>`:'<span style="color:var(--ink-soft)">— เพิ่มอาหารในคลัง</span>'}</div>`; }).join('')

    + `<div class="rec-sub" style="margin-top:10px;padding-top:9px;border-top:1px solid var(--line)">✨ โรยผง: <b>${pw2?pw2.name:'—'}</b> (มื้อเช้า ${times2[0]}) · 🍪 ขนม: <b>${tt2?tt2.name:'—'}</b> (~15:00) <span style="opacity:.7">วันละ 1</span></div>`;



  // AI

  const ai = aiSummary(n);

  document.getElementById('aiCard').innerHTML = `${ai.lines.map(l=>`<div class="ai-line"><span class="chip-ok">✓</span> ${l}</div>`).join('')}<div class="ai-line tip">💡 ${ai.tip}</div>`;



  // running low

  const low = foods().filter(f=>(inv(f.id).packs||inv(f.id).grams||f.meals||f.gramsPerDay)&&lowInfo(f).low);

  document.getElementById('lowCard').innerHTML = low.length

    ? low.sort((a,b)=>lowInfo(a).sort-lowInfo(b).sort).map(f=>{ const li=lowInfo(f); return `<div class="low-row">${f.name}<span class="ls ${li.out?'out':'low'}">${li.label}</span></div>`; }).join('')

    : '<div class="empty">สต็อกเพียงพอ 👍</div>';

}



/* แนะนำประจำวัน: มื้อหลัก + ผงโรย + ขนม */

function renderRecommend(){

  const el = document.getElementById('recCard'); if (!el) return;

  const ap = state.activePack ? findFood(state.activePack.foodId) : null;

  const plan = todayPlan(); const pending = plan.find(m=>!m.done&&m.foodId);

  const mainF = ap || (pending ? findFood(pending.foodId) : null);

  const times = state.profile.mealTimes || ['08:00','13:00','18:00'];

  const powder = powderOfDay();

  const treat = todaysTreat();

  const budget = Math.round(targetKcal()*0.10);

  const treatTime = '15:00'; // ช่วงบ่าย ระหว่างมื้อ

  const dayck = state.checks[todayKey()+'_day'] || {};

  el.innerHTML = `

    <div class="rec"><span>🍽</span><div><b>มื้อหลัก:</b> ${mainF?mainF.name:'— เพิ่มอาหารในคลัง'} ${mainF&&mainF.urinary?'· Urinary 👍':''}<div class="rec-sub">เน้นอาหารเปียกครบส่วน ครบ 3 มื้อ (ดูเวลาแต่ละมื้อด้านบน)</div></div></div>

    <div class="rec"><span>✨</span><div><b>โรยผง:</b> ${powder?powder.name:'— ยังไม่มีผงในคลัง'} <span class="rec-tag">เฉพาะมื้อเช้า ${times[0]} · วันละ 1</span><div class="rec-sub">โรยมื้อเดียวพอ <b>ไม่ต้องทุกมื้อ</b>${powder?(' · '+((powder.benefits&&powder.benefits[0])||'')):''}</div></div></div>

    <div class="rec"><span>🍪</span><div><b>ขนม:</b> ${treat?treat.name:'—'} <span class="rec-tag">ให้ ~${treatTime} · วันละ 1</span> <button class="treat-chk ${dayck.treat?'on':''}" onclick="toggleTreatDone()">${dayck.treat?'✓ ให้แล้ว':'ให้แล้ว?'}</button><div class="rec-sub">ให้ช่วงบ่ายระหว่างมื้อ ไม่เกิน 10% ของแคล (~${budget} kcal)</div></div></div>`;

}



/* ===== CALENDAR ===== */

let calY, calM; (()=>{ const d=new Date(); calY=d.getFullYear(); calM=d.getMonth(); })();

const MONTHS=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

function renderCalendar(){

  document.getElementById('calLabel').textContent = `${MONTHS[calM]} ${calY+543}`;

  document.getElementById('calWeekdays').innerHTML = ['อา','จ','อ','พ','พฤ','ศ','ส'].map(d=>`<div class="cal-wd">${d}</div>`).join('');

  const startWd = new Date(calY,calM,1).getDay(); const dim = new Date(calY,calM+1,0).getDate(); const tk=todayKey();

  const proj = projectByDate();

  const shortFood = f => { if(!f) return ''; const w=(f.name||'').replace(/[!&]/g,'').trim().split(' ')[0]; return w.length>9?w.slice(0,9):w; };

  let cells=''; for(let i=0;i<startWd;i++) cells+='<div class="cal-cell empty-cell"></div>';

  for(let d=1;d<=dim;d++){

    const dk=todayKey(new Date(calY,calM,d)); const isToday=dk===tk; const isPast=dk<tk;

    const day=state.logs[dk]||{}; const dots=MEAL_SLOTS.map(s=>`<span class="${day[s.key]&&day[s.key].done?'eaten':''}"></span>`).join('');

    const n=computeNutrition(dk); const sc = n.eatenCount?`<span class="cal-score">${n.score}</span>`:'';

    // ชื่ออาหารหลักของวัน (อดีต=ที่กินจริง / วันนี้+อนาคต=แผน)

    let fid=null; const e=MEAL_SLOTS.map(s=>day[s.key]).find(x=>x&&x.done); if(e)fid=e.foodId; if(!fid&&proj[dk])fid=proj[dk].find(Boolean);

    const fLbl = fid?shortFood(findFood(fid)):'';

    cells+=`<div class="cal-cell ${isToday?'today':''} ${isPast?'past':''}" onclick="openDay('${dk}')">

      <span class="cal-date">${d}</span>${fLbl?`<span class="cal-food" style="background:${CATC[findFood(fid).cat]||'var(--pink)'};color:#fff">${fLbl}</span>`:''}<div class="cal-meals">${dots}</div>${sc}</div>`;

  }

  document.getElementById('calGrid').innerHTML = cells;

  // forecast

  const q = buildQueue(); const days = Math.floor(q.length/3);

  document.getElementById('calForecast').innerHTML = `<div class="block-head"><h2>🛒 คาดการณ์</h2></div>

    <div class="empty" style="padding:6px 0">อาหารที่มีกินได้อีก ~<b style="color:var(--pink-deep)">${days} วัน</b> (${q.length} มื้อ)</div>

    <div class="cal-legend">${CAT_ORDER.map(c=>`<span class="cleg"><i style="background:${CATC[c]}"></i>${CLABEL[c]}</span>`).join('')}</div>`;

}

document.getElementById('calPrev').onclick=()=>{ calM--; if(calM<0){calM=11;calY--;} renderCalendar(); };

document.getElementById('calNext').onclick=()=>{ calM++; if(calM>11){calM=0;calY++;} renderCalendar(); };



// แผนล่วงหน้าตามวัน (Finish-First): { 'YYYY-MM-DD': [foodId, foodId, foodId] }

function projectByDate(maxDays=120){

  const q=buildQueue(); const map={}; const tk=todayKey(); const day=state.logs[tk]||{}; let qi=0;

  map[tk]=MEAL_SLOTS.map(s=>{ const e=day[s.key]; if(e&&e.done) return e.foodId; return q[qi++]||null; });

  let off=1; while(off<maxDays && qi<q.length){ map[addDaysKey(off)]=[q[qi++]||null,q[qi++]||null,q[qi++]||null]; off++; }

  return map;

}

function openDay(dk){

  const tk=todayKey(); const isPast=dk<tk; const isFuture=dk>tk;

  const day=state.logs[dk]||{};

  const [yy,mm,dd]=dk.split('-').map(Number); const dObj=new Date(yy,mm-1,dd);

  const proj = !isPast ? (projectByDate()[dk]||[]) : [];

  const times=state.profile.mealTimes||['08:00','13:00','18:00'];

  const mealsHtml = MEAL_SLOTS.map((s,i)=>{

    const e=day[s.key]; const done=e&&e.done;

    const f = done?findFood(e.foodId):(proj[i]?findFood(proj[i]):null);

    const tag = done?'<span class="mm-tag done">✓ กินแล้ว</span>':(isFuture?'<span class="mm-tag plan">แผน</span>':'');

    return `<div class="mini-meal"><span class="mm-when">${s.emoji} ${s.label} ${times[i]}</span>${f?`<div class="mm-thumb">${pic(f)}</div><span>${f.name}</span>${tag}`:'<span style="color:var(--ink-soft)">— เพิ่มอาหารในคลัง</span>'}</div>`;

  }).join('');

  const pw=powderOfDay(dObj); const tt=todaysTreat(dObj); const n=computeNutrition(dk);

  const eatenFoods=[...new Set(MEAL_SLOTS.map(s=>day[s.key]).filter(e=>e&&e.done).map(e=>e.foodId))].map(findFood).filter(Boolean);

  const planFoods=[...new Set(proj.filter(Boolean))].map(findFood).filter(Boolean);

  const showFoods = eatenFoods.length?eatenFoods:planFoods;

  const benefits=[...new Set(showFoods.flatMap(f=>f.benefits||[]))];

  openModal(`<h3>${dkPretty(dk)}${isFuture?' · แผน':(dk===tk?' · วันนี้':'')}</h3>

    <div class="fd-sec"><h4>🍽 มื้ออาหาร</h4>${mealsHtml}</div>

    <div class="fd-sec"><h4>✨ โรยผง & 🍪 ขนม</h4><div class="benefit-list">

      <div>✨ โรยผง: <b style="margin-left:auto">${pw?pw.name:'—'}</b></div>

      <div style="color:var(--ink-soft);font-size:12.5px">เฉพาะมื้อเช้า ${times[0]} · วันละ 1 (ไม่ต้องทุกมื้อ)</div>

      <div>🍪 ขนม: <b style="margin-left:auto">${tt?tt.name:'—'}</b></div>

      <div style="color:var(--ink-soft);font-size:12.5px">ให้ ~15:00 ช่วงบ่าย · วันละ 1</div></div></div>

    ${(!isFuture&&n.eatenCount)?`<div class="fd-sec"><h4>❤️ โภชนาการ</h4><div class="empty" style="padding:4px">คะแนน <b style="font-size:20px;color:var(--pink-deep)">${n.score}</b>/100 · ${n.kcal} kcal</div></div>`:''}

    ${benefits.length?`<div class="fd-sec"><h4>🌿 ประโยชน์${isFuture?'ที่จะได้รับ':''}</h4><div class="benefit-list">${benefits.map(b=>`<div>✓ ${b}</div>`).join('')}</div></div>`:''}

    <div class="fd-sec"><h4>📝 โน้ต</h4><textarea id="dayNote" rows="2" placeholder="บันทึก...">${state.notes[dk]||''}</textarea>

      <button class="btn-primary mt" onclick="saveNote('${dk}')">บันทึกโน้ต</button></div>`);

}

function saveNote(dk){ state.notes[dk]=document.getElementById('dayNote').value.trim(); save(); closeModal(); toast('บันทึกโน้ตแล้ว'); }

function toggleTreatDone(){ const k=todayKey()+'_day'; state.checks[k]=state.checks[k]||{}; state.checks[k].treat=!state.checks[k].treat; save(); renderHome(); }

// สำรอง/กู้คืนข้อมูล

function exportData(){ const blob=new Blob([JSON.stringify(state)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='cindycare-backup-'+todayKey()+'.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500); toast('ดาวน์โหลดไฟล์สำรองแล้ว ⬇️'); }

function importData(e){ const f=e.target.files&&e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>{ try{ const d=JSON.parse(ev.target.result); if(!d||!d.profile)throw 0; state=Object.assign(fresh(),d); save(); closeModal(); toast('กู้คืนข้อมูลแล้ว 💕'); renderAll(); }catch(err){ toast('ไฟล์ไม่ถูกต้อง'); } }; r.readAsText(f); }



/* ===== FOOD LIBRARY ===== */

let foodCat='all';

function renderFood(){

  const cats=['all',...CAT_ORDER]; const lbl={all:'ทั้งหมด',...CAT};

  document.getElementById('foodTabs').innerHTML = cats.map(c=>`<button class="${foodCat===c?'active':''}" onclick="setFoodCat('${c}')">${lbl[c]}</button>`).join('');

  const items = foodCat==='all'?foods():foods().filter(f=>f.cat===foodCat);

  document.getElementById('foodGrid').innerHTML = items.length ? items.map(foodCard).join('') : '<div class="empty" style="grid-column:1/-1">ไม่มีรายการ</div>';

}

function setFoodCat(c){ foodCat=c; renderFood(); }

function foodCard(f){

  const packs=inv(f.id).packs||0; const lvl=packs<=0?'out':(packs<=2?'low':'ok'); const txt=packs<=0?'หมด':packs;

  const open = state.activePack&&state.activePack.foodId===f.id;

  const meta = f.meals?`${f.meals} มื้อ/ชิ้น`:(f.gramsPerDay?`${f.gramsPerDay} ก./วัน`:'เสริม');

  return `<div class="pcard" onclick="openFood('${f.id}')">

    <div class="pcard-img">${pic(f)}<span class="stock-pill ${lvl}">${txt}</span>${open?'<span class="open-flag">เปิดอยู่</span>':''}<button class="card-del" onclick="event.stopPropagation();confirmDel('${f.id}')" title="ลบ">🗑️</button></div>

    <div class="pcard-body">

      <div class="pcard-name">${f.name}</div>

      <div class="pcard-tags">${f.complete?'<span class="tag complete">ครบส่วน</span>':'<span class="tag supp">เสริม</span>'}${f.urinary?'<span class="tag uri">Urinary</span>':''}</div>

      <div class="pcard-meta">${meta}</div>

    </div></div>`;

}



/* ===== FOOD DETAILS ===== */

function openFood(id){

  const f=findFood(id); if(!f)return; const i=inv(id);

  const nf=(v,u,l)=>`<div class="nf"><b>${v!=null&&v!==''?v+u:'—'}</b><small>${l}</small></div>`;

  const canOpenThis = f.meals && (i.packs||0)>0 && canOpen();

  openModal(`

    <div class="fd-hero">${pic(f)}</div>

    <div class="fd-name">${f.name}</div>

    <div class="pcard-tags" style="margin-top:6px">${f.complete?'<span class="tag complete">อาหารครบส่วน</span>':'<span class="tag supp">อาหารเสริม</span>'}${f.urinary?'<span class="tag uri">Urinary Care</span>':''}</div>

    ${f.desc?`<p class="help" style="margin-top:10px">${f.desc}</p>`:''}

    ${(f.benefits||[]).length?`<div class="fd-sec"><h4>🌿 ประโยชน์</h4><div class="benefit-list">${f.benefits.map(b=>`<div>✓ ${b}</div>`).join('')}</div></div>`:''}

    <div class="fd-sec"><h4>📊 โภชนาการ</h4><div class="nf-grid">

      ${nf(f.protein,'%','โปรตีน')}${nf(f.fat,'%','ไขมัน')}${nf(f.moisture,'%','ความชื้น')}${nf(f.kcal100,'','kcal/100g')}</div></div>

    ${(f.suitable||[]).length?`<div class="fd-sec"><h4>✅ เหมาะกับ</h4><div class="suit-tags">${f.suitable.map(s=>`<span class="suit">${SUIT_LABEL[s]||s}</span>`).join('')}</div></div>`:''}

    <div class="fd-sec"><h4>📦 สต็อก & การคำนวณ</h4>

      <div class="benefit-list">

        <div>คงเหลือ: <b style="margin-left:auto">${(f.dry||f.gramsPerDay)?((i.grams||0)+' ก.'):((i.packs||0)+' ชิ้น')}</b></div>

        ${(f.dry||f.gramsPerDay)

          ? `<div>กิน ${f.gramsPerDay||22} ก./วัน → กินได้อีก <b style="margin-left:auto;color:var(--pink-deep)">${foodDaysLeft(f)} วัน</b></div>`

          : (f.meals ? `<div>${f.meals} มื้อ/ชิ้น · รวม ${(i.packs||0)*f.meals} มื้อ → <b style="margin-left:auto;color:var(--pink-deep)">~${foodDaysLeft(f)} วัน</b></div>` : '<div>อาหารเสริม (ไม่นับเป็นมื้อ)</div>')}

        ${f.daysOpen?`<div>เปิดแล้วเก็บได้ ~${f.daysOpen} วัน</div>`:''}

        ${f.storage?`<div>${f.storage}</div>`:''}

        ${state.activePack&&state.activePack.foodId===f.id?(()=>{const since=daysSince(state.activePack.openedAt);const safe=f.daysOpen||3;const left=safe-since;return `<div style="color:${left<=0?'var(--danger)':'var(--pink-deep)'}">${left<=0?('⚠️ เปิดเกิน '+safe+' วันแล้ว ควรทิ้ง'):('กำลังเปิด · เหลือ '+state.activePack.remaining+' มื้อ · ควรกินหมดใน '+left+' วัน')}</div>`;})():''}

      </div></div>

    <div class="fd-actions">

      ${canOpenThis?`<button class="btn-primary" onclick="openPack('${f.id}')">🥫 เปิดแพ็ค</button>`:''}

      <button class="btn-soft" onclick="openFoodForm('${f.id}')">✏️ แก้ไข/ซื้อ</button>

      <button class="btn-ghost" onclick="confirmDel('${f.id}')">🗑️ ลบ</button>

    </div>`);

}



/* ===== FOOD FORM (เพิ่ม/แก้/ซื้อ) ===== */

function openFoodForm(id){

  const f = findFood(id) || { cat:'wet', complete:true }; const i = id?inv(id):{}; const isNew=!id;

  openModal(`<h3>${isNew?'＋ เพิ่มอาหาร':'✏️ '+f.name}</h3>

    <div class="field"><label>รูป (อัปโหลด)</label>

      <div class="up-area"><div class="sticker-frame" id="ffPrev">${f.img?`<img src="${f.img}">`:'<span class="ph-cam">📷</span>'}</div>

      <div style="flex:1;display:flex;flex-direction:column;gap:8px">

        <button type="button" class="btn-soft" onclick="document.getElementById('ffFile').click()">📷 อัปโหลด</button>

        <button type="button" class="btn-ghost" onclick="document.getElementById('ff-img').value='';document.getElementById('ffPrev').innerHTML='<span class=ph-cam>📷</span>'">ลบรูป</button></div></div>

      <input type="file" id="ffFile" accept="image/*" hidden onchange="pickImg(event)"><input type="hidden" id="ff-img" value="${f.img||''}"></div>

    <div class="field"><label>ชื่อ</label><input id="ff-name" value="${f.name||''}" placeholder="ชื่ออาหาร"></div>

    <div class="field"><label>หมวด</label><select id="ff-cat" onchange="toggleDry()">${CAT_ORDER.map(c=>`<option value="${c}" ${f.cat===c?'selected':''}>${CAT[c]}</option>`).join('')}</select></div>

    <div class="chk-row" style="margin-bottom:12px">

      <label><input type="checkbox" id="ff-complete" ${f.complete?'checked':''}> ครบส่วน</label>

      <label><input type="checkbox" id="ff-uri" ${f.urinary?'checked':''}> Urinary</label>

      <label><input type="checkbox" id="ff-bygram" ${(f.byGram||f.cat==='dry')?'checked':''} onchange="toggleDry()"> ให้เป็นกรัม/วัน</label></div>

    <div class="frow"><div class="field"><label>กรัม/ชิ้น (1 ซอง)</label><input type="number" id="ff-grams" value="${f.grams||''}"></div>

      <div class="field"><label>มื้อ/ชิ้น (1 ซองกินกี่มื้อ)</label><input type="number" id="ff-meals" value="${f.meals||''}"></div></div>

    <div class="field"><label>📊 โภชนาการ — กรอกเอง หรืออ่านจากรูปฉลาก</label>

      <button type="button" class="btn-soft" onclick="document.getElementById('ocrFile').click()">🔍 อ่านฉลากจากรูป (กรอกให้อัตโนมัติ)</button>

      <input type="file" id="ocrFile" accept="image/*" hidden onchange="ocrPick(event)">

      <div id="ocrStatus" class="help" style="margin-top:6px"></div></div>

    <div class="frow"><div class="field"><label>kcal/100g</label><input type="number" id="ff-kcal" value="${f.kcal100||''}"></div>

      <div class="field"><label>โปรตีน %</label><input type="number" step="0.1" id="ff-protein" value="${f.protein||''}"></div></div>

    <div class="frow"><div class="field"><label>ไขมัน %</label><input type="number" step="0.1" id="ff-fat" value="${f.fat||''}"></div>

      <div class="field"><label>ความชื้น %</label><input type="number" step="0.1" id="ff-moist" value="${f.moisture||''}"></div></div>

    <div class="field"><label>ประโยชน์ (คั่นด้วย ,)</label><textarea id="ff-benefits" rows="2" placeholder="ดูแลทางเดินปัสสาวะ, ครบส่วน">${(f.benefits||[]).join(', ')}</textarea></div>

    <hr style="border:none;border-top:1px solid var(--line);margin:6px 0 14px">

    <div class="frow">

      <div class="field" id="packField"><label>จำนวนที่มี (ชิ้น)</label><input type="number" id="ff-packs" value="${i.packs||''}"></div>

      <div class="field" id="gramsField" style="display:none"><label>กรัมคงเหลือ</label><input type="number" id="ff-gramsleft" value="${i.grams||''}"></div>

      <div class="field" id="gpdField" style="display:none"><label>กรัม/วัน</label><input type="number" id="ff-gpd" value="${f.gramsPerDay||''}"></div>

      <div class="field"><label>ราคา ฿</label><input type="number" id="ff-price" value="${i.price||''}"></div></div>

    <div class="frow"><div class="field"><label>ซื้อจาก</label><input list="srcL" id="ff-source" value="${i.source||''}" placeholder="เลือก/พิมพ์"><datalist id="srcL">${SOURCES.map(s=>`<option value="${s}">`).join('')}</datalist></div>

      <div class="field"><label>วันที่ซื้อ</label><input type="date" id="ff-buydate" value="${i.buyDate||todayKey()}"></div></div>

    <button class="btn-primary" onclick="saveFood('${id||''}')">บันทึก</button>`);

  toggleDry();

}

function toggleDry(){ const cat=(document.getElementById('ff-cat')||{}).value; const bg=document.getElementById('ff-bygram'); const dry=cat==='dry'||(bg&&bg.checked); const pf=document.getElementById('packField'),gf=document.getElementById('gramsField'),gp=document.getElementById('gpdField'); if(!pf)return; pf.style.display=dry?'none':''; gf.style.display=dry?'':'none'; gp.style.display=dry?'':'none'; }

function pickImg(e){ const file=e.target.files&&e.target.files[0]; if(!file)return; const r=new FileReader(); r.onload=ev=>resize(ev.target.result,400,d=>{document.getElementById('ff-img').value=d;document.getElementById('ffPrev').innerHTML=`<img src="${d}">`;}); r.readAsDataURL(file); }

function resize(src,max,cb){ const im=new Image(); im.onload=()=>{let w=im.width,h=im.height;const s=Math.min(1,max/Math.max(w,h));w=w*s|0;h=h*s|0;const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0,w,h);try{cb(c.toDataURL('image/jpeg',.82));}catch(e){cb(src);}}; im.onerror=()=>cb(src); im.src=src; }



/* ---------- OCR อ่านฉลาก → กรอกโภชนาการให้ (Tesseract โหลดจาก CDN) ---------- */

function ensureTesseract(){ return new Promise((res,rej)=>{ if(window.Tesseract)return res(); const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'; s.onload=()=>res(); s.onerror=()=>rej(new Error('no-net')); document.head.appendChild(s); }); }

function preprocessOCR(src){ return new Promise(res=>{ const im=new Image(); im.onload=()=>{ const sc=Math.max(1,Math.min(2,1400/Math.max(im.width,im.height))); const w=Math.round(im.width*sc),h=Math.round(im.height*sc); const c=document.createElement('canvas'); c.width=w;c.height=h; const x=c.getContext('2d'); x.drawImage(im,0,0,w,h); try{ const d=x.getImageData(0,0,w,h),p=d.data; for(let i=0;i<p.length;i+=4){let g=.3*p[i]+.59*p[i+1]+.11*p[i+2]; g=g>145?255:(g<95?0:g); p[i]=p[i+1]=p[i+2]=g;} x.putImageData(d,0,0); res(c.toDataURL('image/png')); }catch(e){res(src);} }; im.onerror=()=>res(src); im.src=src; }); }

// เดาชื่อจากบรรทัดตัวอักษรเด่นที่ไม่ใช่คำโภชนาการ

function grabName(text){

  // ข้ามคำโภชนาการ + คำโปรย (tagline) เพื่อให้ได้ "ชื่อแบรนด์" จริง

  const bad=/protein|fat|fibre|fiber|moisture|kcal|analysis|guaranteed|ingredient|net|wt|complete|balanced|care|premium|recipe|formula|flavou?r|grain|natural|nutrition|adult|kitten|โปรตีน|ไขมัน|ความชื้น|เส้นใย|พลังงาน|วิเคราะห์|ส่วนประกอบ|น้ำหนัก|สูตร|พรีเมียม|ครบ|สมบูรณ์/i;

  const lines=(text||'').split('\n');

  for(const raw of lines){ // เลือกบรรทัดแรกที่ดูเป็นชื่อ (แบรนด์มักอยู่บนสุด)

    const l=raw.replace(/[^A-Za-z0-9ก-๙\s&.\-]/g,' ').replace(/\s+/g,' ').trim();

    if(!l||bad.test(l))continue;

    const words=l.split(' ').filter(w=>/[A-Za-zก-๙]{3,}/.test(w)); if(!words.length)continue;

    const cand=words.join(' '); if(!/[A-Za-zก-๙]{4,}/.test(cand))continue;

    if(cand.length>=4&&cand.length<=26)return cand;

  }

  return '';

}

// ตรวจคีย์เวิร์ดประโยชน์จากข้อความฉลาก

const BENEFIT_KW=[

  [/urinary|struvite|crystal|ทางเดินปัสสาวะ|นิ่ว|ผลึก|요로|비뇨/i,'ดูแลทางเดินปัสสาวะ','uri'],

  [/hairball|ก้อนขน|ํ—ค์–ด๋ณผ/i,'ลดก้อนขน'],

  [/complete|สมบูรณ์|ครบ(ถ้วน|ส่วน)|balanced|์ข…ํ•ฉ|완전/i,'อาหารครบส่วน','complete'],

  [/moisture|ความชื้น|hydrat|เพิ่มน้ำ|수분/i,'ความชื้นสูง'],

  [/digest|ย่อย|prebiotic|พรีไบโอ|소화|장 ๊ฑด๊ฐ•/i,'ย่อยง่าย'],

  [/skin|coat|ผิวหนัง|บำรุงขน|ขนสวย|피부|모질|모발/i,'บำรุงผิวหนังและขน'],

  [/kidney|ไต|renal|신장/i,'ดูแลไต'],

  [/immun|ภูมิ|๋ฉด์—ญ/i,'เสริมภูมิคุ้มกัน'],

  [/taurine|ทอรีน|타우린/i,'มีทอรีน บำรุงหัวใจ/ตา'],

  [/omega|โอเมก้า|오메가/i,'มีโอเมก้า'],

];

function fillFromLabel(text){

  const t=(text||'').replace(/\n/g,' '); const cat=(document.getElementById('ff-cat')||{}).value||'wet'; const dry=cat==='dry'; const got=[];

  const grab=re=>{const m=t.match(re);return m?m[m.length-1]:null;};

  const setN=(id,raw,lo,hi,label)=>{ if(!raw)return; const e=document.getElementById(id); if(!e)return; let v=parseFloat(String(raw).replace(',','.')); if(isNaN(v))return; let g=0; while(v>hi&&v/10>=lo&&v/10<=hi*1.2&&g++<3)v=v/10; v=Math.round(v*10)/10; e.value=v; got.push(label+' '+v); };

  setN('ff-kcal',grab(/(\d{2,4}(?:[.,]\d+)?)\s*kcal/i)||grab(/(?:ME|열량|칼로리)[^0-9]{0,8}(\d{2,4})/i),30,600,'kcal');

  setN('ff-protein',grab(/(?:protein|โปรตีน|단백질)[^0-9]{0,14}(\d+(?:[.,]\d+)?)/i),3,55,'โปรตีน');

  setN('ff-fat',grab(/(?:fat|ไขมัน|지방)[^0-9]{0,14}(\d+(?:[.,]\d+)?)/i),dry?3:0.5,dry?28:14,'ไขมัน');

  setN('ff-moist',grab(/(?:moisture|ความชื้น|수분)[^0-9]{0,14}(\d+(?:[.,]\d+)?)/i),dry?2:55,dry?16:90,'ความชื้น');

  // ชื่อ (ถ้าช่องยังว่าง)

  const nameEl=document.getElementById('ff-name');

  if(nameEl && !nameEl.value){ const nm=grabName(text); if(nm){ nameEl.value=nm; got.push('ชื่อ "'+nm+'"'); } }

  // ประโยชน์ + ติ๊ก Complete/Urinary จากคีย์เวิร์ด

  const ben=[]; BENEFIT_KW.forEach(([re,label,flag])=>{ if(re.test(t)){ ben.push(label);

    if(flag==='uri'){const u=document.getElementById('ff-uri');if(u)u.checked=true;}

    if(flag==='complete'){const c=document.getElementById('ff-complete');if(c)c.checked=true;} } });

  if(ben.length){ const be=document.getElementById('ff-benefits'); if(be && !be.value.trim()){ be.value=ben.join(', '); got.push('ประโยชน์ '+ben.length+' ข้อ'); } }

  return got;

}

function ocrPick(e){ const file=e.target.files&&e.target.files[0]; if(!file)return; document.getElementById('ocrStatus').textContent='⏳ กำลังอ่านฉลาก...'; const r=new FileReader(); r.onload=ev=>ocrRun(ev.target.result); r.readAsDataURL(file); }

async function ocrRun(src){

  const st=document.getElementById('ocrStatus');

  try{ await ensureTesseract(); st.textContent='⏳ กำลังอ่าน...'; const proc=await preprocessOCR(src);

    const {data}=await Tesseract.recognize(proc,'eng+tha+kor',{logger:m=>{ if(m.status==='recognizing text') st.textContent='⏳ อ่านอยู่ '+Math.round(m.progress*100)+'%'; }});

    const got=fillFromLabel(data.text||'');

    st.innerHTML = got.length ? '✅ กรอกให้: '+got.join(', ')+' — ตรวจอีกที (จุดทศนิยมเช็กดู)' : '⚠️ อ่านตัวเลขไม่ชัด ลองถ่ายใกล้ๆ ชัดๆ หรือกรอกเอง';

  }catch(e){ st.innerHTML='⚠️ อ่านไม่ได้ตอนนี้ (อาจไม่มีเน็ต) — กรอกเองได้เลย'; }

}

function saveFood(id){

  const name=document.getElementById('ff-name').value.trim(); if(!name){toast('ใส่ชื่อก่อนนะ');return;}

  const cat=document.getElementById('ff-cat').value;

  const data={ name, cat, complete:document.getElementById('ff-complete').checked, urinary:document.getElementById('ff-uri').checked,

    grams:parseFloat(document.getElementById('ff-grams').value)||0, meals:parseInt(document.getElementById('ff-meals').value)||0,

    kcal100:parseFloat(document.getElementById('ff-kcal').value)||0, protein:parseFloat(document.getElementById('ff-protein').value)||0,

    fat:parseFloat(document.getElementById('ff-fat').value)||0, moisture:parseFloat(document.getElementById('ff-moist').value)||0,

    img:document.getElementById('ff-img').value.trim(),

    benefits:document.getElementById('ff-benefits').value.split(',').map(s=>s.trim()).filter(Boolean) };

  let f=findFood(id);

  if(f) Object.assign(f,data); else { f=Object.assign({id:'cf'+Date.now(),supplement:!data.complete,suitable:[]},data); state.foods.push(f); }

  const byg=document.getElementById('ff-bygram')&&document.getElementById('ff-bygram').checked;

  const isDry = cat==='dry' || byg;   // โหมดกรัม/วัน

  f.dry = cat==='dry'; f.byGram = !!byg;

  if(isDry){ f.gramsPerDay=parseFloat(document.getElementById('ff-gpd').value)||20; }

  const price=parseFloat(document.getElementById('ff-price').value)||0, source=document.getElementById('ff-source').value.trim();

  const buyDate=document.getElementById('ff-buydate').value||todayKey();

  const invObj={ price, source, buyDate };

  if(isDry){ const g=parseFloat(document.getElementById('ff-gramsleft').value)||0; invObj.grams=g; invObj.packs=g>0?1:0; }

  else invObj.packs=parseInt(document.getElementById('ff-packs').value)||0;

  state.inventory[f.id]=invObj;

  if (price>0) { state.purchases=state.purchases||[]; state.purchases.push({ foodId:f.id, date:buyDate, packs:invObj.packs, price, source }); }

  save(); closeModal(); toast('บันทึกแล้ว'); renderAll();

}

function confirmDel(id){ const f=findFood(id); openModal(`<h3>ลบ "${f.name}"?</h3><p class="help" style="text-align:center">ลบออกจากคลังถาวร</p><div class="frow"><button class="btn-soft" onclick="closeModal()">ยกเลิก</button><button class="btn-primary" onclick="delFood('${id}')">ลบเลย</button></div>`); }

function delFood(id){ state.foods=state.foods.filter(f=>f.id!==id); delete state.inventory[id]; if(state.activePack&&state.activePack.foodId===id)state.activePack=null; save(); closeModal(); toast('ลบแล้ว'); renderAll(); }



document.getElementById('addFoodBtn').onclick=()=>openFoodForm();

document.getElementById('batchBtn').onclick=()=>openBatch();

function openBatch(){ openModal(`<h3>＋ เพิ่มหลายรายการ</h3><p class="help">กรอกชื่อ+หมวด+จำนวน เว้นว่างได้</p><div id="batchRows"></div><button class="btn-soft" onclick="addBatchRow()">＋ แถว</button><button class="btn-primary mt" onclick="saveBatch()">บันทึกทั้งหมด</button>`); addBatchRow();addBatchRow();addBatchRow(); }

function addBatchRow(){ const w=document.getElementById('batchRows'); const d=document.createElement('div'); d.className='brow'; d.innerHTML=`<input class="b-name" placeholder="ชื่อ"><div class="frow"><select class="b-cat">${CAT_ORDER.map(c=>`<option value="${c}">${CAT[c]}</option>`).join('')}</select><input class="b-qty" type="number" placeholder="จำนวน"></div>`; w.appendChild(d); }

function saveBatch(){ let n=0; document.querySelectorAll('#batchRows .brow').forEach(r=>{ const name=r.querySelector('.b-name').value.trim(); if(!name)return; const cat=r.querySelector('.b-cat').value; const def={wet:{grams:80,meals:3},dry:{grams:1000,meals:0},soup:{grams:40,meals:0},freeze:{meals:0},powder:{meals:0},treat:{meals:0}}[cat]||{}; const id='cf'+Date.now()+(n); const f=Object.assign({id,name,cat,complete:cat==='wet',supplement:cat!=='wet',urinary:false,kcal100:0,benefits:[],suitable:[]},def); state.foods.push(f); state.inventory[id]={packs:parseInt(r.querySelector('.b-qty').value)||0,buyDate:todayKey()}; n++; }); if(!n){toast('ยังไม่ได้กรอก');return;} save();closeModal();toast(`เพิ่ม ${n} รายการ`);renderAll(); }



/* ===== SHOPPING ===== */

function renderShop(){

  const need = foods().filter(f=>(inv(f.id).packs||inv(f.id).grams||f.meals||f.gramsPerDay)&&lowInfo(f).low);

  document.getElementById('shopNeed').innerHTML = `<div class="block-head"><h2>ต้องซื้อ (ใกล้หมด)</h2></div>` + (need.length? need.sort((a,b)=>lowInfo(a).sort-lowInfo(b).sort).map(f=>{ const li=lowInfo(f); const stk=isGramFood(f)?((inv(f.id).grams||0)+' ก.'):((inv(f.id).packs||0)+' ชิ้น');

    return `<div class="shop-row"><div class="shop-thumb">${pic(f)}</div><div><div class="shop-name">${f.name}</div><div class="shop-sub">${CAT[f.cat]} · ${stk}</div></div><span class="ls ${li.out?'out':'low'}">${li.label}</span><button class="btn-soft" style="flex:0 0 auto;padding:8px 12px" onclick="openFoodForm('${f.id}')">ซื้อ</button><button class="btn-ghost" style="flex:0 0 auto;padding:8px 11px" onclick="confirmDel('${f.id}')" title="ลบ">🗑️</button></div>`; }).join('') : '<div class="empty">สต็อกเพียงพอ 👍</div>');

  // stats

  const totalMeals = mealFoods().reduce((s,f)=>s+(inv(f.id).packs||0)*f.meals,0);

  const spent = (state.purchases||[]).reduce((s,p)=>s+(p.price||0),0);

  document.getElementById('shopStats').innerHTML = `<div class="block-head"><h2>ภาพรวม</h2></div><div class="stat-grid">

    <div class="stat"><b>${totalMeals}</b><small>มื้อคงเหลือ</small></div>

    <div class="stat"><b>${Math.floor(totalMeals/3)}</b><small>วันที่กินได้</small></div>

    <div class="stat"><b>${foods().filter(f=>(inv(f.id).packs||0)>0).length}</b><small>ชนิดที่มี</small></div>

    <div class="stat"><b>${spent.toLocaleString()}฿</b><small>ซื้อสะสม</small></div></div>`;

  // history

  const ph = (state.purchases||[]).slice(-8).reverse();

  document.getElementById('shopHistory').innerHTML = `<div class="block-head"><h2>ประวัติการซื้อ</h2></div>` + (ph.length? ph.map(p=>{ const f=findFood(p.foodId); return `<div class="shop-row"><div><div class="shop-name">${f?f.name:'—'}</div><div class="shop-sub">${dkPretty(p.date)} · ${p.source||''}</div></div><span style="margin-left:auto;font-weight:700">${p.price?p.price+'฿':''}</span></div>`; }).join('') : '<div class="empty">ยังไม่มีประวัติ — บันทึกราคาตอนเพิ่มสต็อกจะมาโชว์ที่นี่</div>');

}



/* ===== HEALTH ===== */

function renderHealth(){ renderHealthSummary(); renderTrend(); renderWater(); drawWeight(); renderPoop(); renderPee(); renderMeds(); renderVet(); }



// กราฟโภชนาการ 7 วัน

function renderTrend(){

  const el=document.getElementById('trendCard'); if(!el)return;

  let bars='';

  for(let i=6;i>=0;i--){ const dk=addDaysKey(-i); const n=computeNutrition(dk); const sc=n.eatenCount?n.score:0;

    const col=sc>=75?'var(--good)':(sc>=45?'var(--gold)':(sc>0?'var(--danger)':'var(--line)'));

    const [y,m,d]=dk.split('-').map(Number); const lbl=new Date(y,m-1,d).toLocaleDateString('th-TH',{weekday:'short'});

    bars+=`<div class="tb"><div class="tb-num">${n.eatenCount?sc:''}</div><div class="tb-track"><div class="tb-bar" style="height:${Math.max(3,sc)}%;background:${col}"></div></div><small>${lbl}</small></div>`; }

  el.innerHTML=`<div class="block-head"><h2>📈 โภชนาการ 7 วัน</h2></div><div class="trend">${bars}</div>`;

}

// น้ำดื่ม

function waterTarget(){ return Math.round((state.profile.weight||3.7)*50); }

function renderWater(){

  const el=document.getElementById('waterCard'); if(!el)return; const dk=todayKey(); const ml=state.water[dk]||0; const t=waterTarget(); const pct=Math.min(100,Math.round(ml/t*100));

  el.innerHTML=`<div class="block-head"><h2>💧 น้ำดื่มวันนี้</h2><span class="block-sub">${ml}/${t} มล.</span></div>

    <div class="prog-track"><div class="prog-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--blue-deep),var(--blue))"></div></div>

    <div class="frow mt"><button class="btn-soft" onclick="addWater(20)">+20 มล.</button><button class="btn-soft" onclick="addWater(50)">+50 มล.</button><button class="btn-ghost" onclick="addWater(-20)">−20</button></div>

    <div class="rec-sub" style="margin-top:8px">เป้า ~50 มล./กก./วัน · อาหารเปียกช่วยเพิ่มน้ำได้มาก</div>`;

}

function addWater(ml){ const dk=todayKey(); state.water[dk]=Math.max(0,(state.water[dk]||0)+ml); save(); renderWater(); }

function medStatusOn(dk){ let req=0,done=0; state.meds.forEach(m=>{ const ro=medRunOut(m); const active=(!m.startDate||m.startDate<=dk)&&(!ro||ro.runOut>=dk); if(!active)return; (m.slots||[]).forEach(s=>{req++; const c=state.checks[dk+'_'+s]; if(c&&c['med_'+m.id])done++;}); }); return {req,done}; }

function renderHealthSummary(){ const dk=todayKey(); const w=state.weights.find(x=>x.date===dk); const pooped=(state.poops[dk]||[]).filter(p=>p.t!=='none').length; const pees=(state.pees[dk]||[]).length; const ms=medStatusOn(dk); const medTxt=ms.req===0?'ไม่มียา':(ms.done>=ms.req?'ครบ ✓':`เหลือ ${ms.req-ms.done}`);

  document.getElementById('healthSummary').innerHTML=`<div class="block-head"><h2>📋 สรุปวันนี้</h2></div><div class="sum-grid"><div class="sum"><span>⚖️</span><b>${w?w.kg+' กก.':'—'}</b><small>น้ำหนัก</small></div><div class="sum"><span>💊</span><b>${medTxt}</b><small>ยา</small></div><div class="sum"><span>💩</span><b>${pooped||'—'}</b><small>อุจจาระ</small></div><div class="sum"><span>💧</span><b>${pees}</b><small>ปัสสาวะ</small></div></div>`; }

const POOPS=[{t:'good',e:'💩',l:'ปกติ'},{t:'soft',e:'💧',l:'นิ่ม'},{t:'hard',e:'🪨',l:'แข็ง'},{t:'none',e:'🚫',l:'ไม่ถ่าย'}];

function renderPoop(){ document.getElementById('poopRow').innerHTML=POOPS.map(p=>`<button class="poop-btn" onclick="addPoop('${p.t}','${p.e}','${p.l}')"><span>${p.e}</span>${p.l}</button>`).join(''); const list=state.poops[todayKey()]||[]; document.getElementById('poopHistory').innerHTML=list.length?list.map((p,i)=>`<div class="lr"><time>${p.time}</time> ${p.e} ${p.l}<button class="x" onclick="delPoop(${i})">✕</button></div>`).join(''):'<div class="empty">ยังไม่มีบันทึก</div>'; }

function addPoop(t,e,l){ const dk=todayKey(); state.poops[dk]=state.poops[dk]||[]; state.poops[dk].push({t,e,l,time:new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})}); save(); toast('บันทึกแล้ว '+e); renderPoop(); renderHealthSummary(); renderCalendar(); }

function delPoop(i){ state.poops[todayKey()]?.splice(i,1); save(); renderPoop(); renderHealthSummary(); }

function renderPee(){ const list=state.pees[todayKey()]||[]; document.getElementById('peeCard').innerHTML=`<div class="block-head"><h2>💧 ปัสสาวะวันนี้ (${list.length})</h2></div><button class="btn-primary" onclick="addPee()">💧 ฉี่ +1 ครั้ง</button><div class="mini-log mt">${list.length?list.map((p,i)=>`<div class="lr"><time>${p.time}</time> 💧 ครั้งที่ ${i+1}<button class="x" onclick="delPee(${i})">✕</button></div>`).join(''):'<div class="empty">ยังไม่มีบันทึก</div>'}</div>`; }

function addPee(){ const dk=todayKey(); state.pees[dk]=state.pees[dk]||[]; state.pees[dk].push({time:new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})}); save(); toast('บันทึกฉี่แล้ว 💧'); renderPee(); renderHealthSummary(); }

function delPee(i){ state.pees[todayKey()]?.splice(i,1); save(); renderPee(); renderHealthSummary(); }



document.getElementById('addWeightBtn').onclick=()=>{ const inp=document.getElementById('weightInput'); const kg=parseFloat(inp.value); if(!kg||kg<=0){toast('ใส่น้ำหนักให้ถูก');return;} const dk=todayKey(); const ex=state.weights.find(w=>w.date===dk); if(ex)ex.kg=kg; else state.weights.push({date:dk,kg}); state.profile.weight=kg; inp.value=''; save(); toast('บันทึกน้ำหนัก '+kg); renderHealth(); renderHome(); };

function drawWeight(){ const cv=document.getElementById('weightChart'); if(!cv)return; const ctx=cv.getContext('2d'); const W=cv.width=cv.clientWidth*devicePixelRatio, H=cv.height=160*devicePixelRatio; ctx.clearRect(0,0,W,H); const data=[...state.weights].sort((a,b)=>a.date.localeCompare(b.date)).slice(-12); if(!data.length)return; const pad=28*devicePixelRatio; const kgs=data.map(d=>d.kg); const mn=Math.min(...kgs)-.2,mx=Math.max(...kgs)+.2,rg=(mx-mn)||1; const X=i=>pad+(i/Math.max(1,data.length-1))*(W-pad*2); const Y=k=>H-pad-((k-mn)/rg)*(H-pad*2); const accent=getComputedStyle(document.documentElement).getPropertyValue('--pink-deep')||'#ff6f9c'; if(data.length===1){ctx.fillStyle=accent;ctx.beginPath();ctx.arc(W/2,Y(data[0].kg),6*devicePixelRatio,0,7);ctx.fill();return;} const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'rgba(255,111,156,.3)'); g.addColorStop(1,'rgba(255,111,156,0)'); ctx.beginPath(); data.forEach((d,i)=>{i?ctx.lineTo(X(i),Y(d.kg)):ctx.moveTo(X(i),Y(d.kg));}); ctx.lineTo(X(data.length-1),H-pad);ctx.lineTo(X(0),H-pad);ctx.closePath();ctx.fillStyle=g;ctx.fill(); ctx.beginPath(); data.forEach((d,i)=>{i?ctx.lineTo(X(i),Y(d.kg)):ctx.moveTo(X(i),Y(d.kg));}); ctx.strokeStyle=accent;ctx.lineWidth=3*devicePixelRatio;ctx.lineJoin='round';ctx.stroke(); ctx.fillStyle=accent; data.forEach((d,i)=>{ctx.beginPath();ctx.arc(X(i),Y(d.kg),3.5*devicePixelRatio,0,7);ctx.fill();}); }



/* MEDS */

const SLOTL={morning:'เช้า',lunch:'กลางวัน',dinner:'เย็น'};

function medRunOut(m){ if(!m.startDate)return null; let days=m.days>0?m.days:(m.qty>0?Math.floor(m.qty/((m.slots&&m.slots.length)||1)):null); if(!days)return null; const[y,mo,d]=m.startDate.split('-').map(Number); const ro=new Date(y,mo-1,d); ro.setDate(ro.getDate()+days-1); return {runOut:todayKey(ro)}; }

function medDaysLeft(m){ const r=medRunOut(m); if(!r)return null; const[y,mo,d]=r.runOut.split('-').map(Number); const ro=new Date(y,mo-1,d); const t=new Date(); t.setHours(0,0,0,0); return Math.round((ro-t)/86400000)+1; }

function medActive(m){ const tk=todayKey(); if(m.startDate&&m.startDate>tk)return false; const r=medRunOut(m); if(r&&r.runOut<tk)return false; return true; }

function renderMeds(){ document.getElementById('medCard').innerHTML=`<div class="row-head"><h2>💊 ยาที่กินอยู่</h2><button class="btn-ghost" onclick="openMedForm()">＋ เพิ่ม</button></div>`+(state.meds.length?state.meds.map(m=>{const r=medRunOut(m),left=medDaysLeft(m),slots=(m.slots||[]).map(s=>SLOTL[s]).join(', ')||'—';let st=!r?'<span style="color:var(--ink-soft)">ยังไม่ตั้งจำนวน/วัน</span>':(left>0?`หมด ~<b>${dkPretty(r.runOut)}</b> (เหลือ ${left} วัน)`:'<b style="color:var(--danger)">หมดแล้ว</b>');return `<div class="med-row ${medActive(m)?'':'off'}"><div class="med-ico">💊</div><div class="med-main"><div class="med-name">${m.name}</div><div class="med-meta">${slots} · ${m.afterFood?'หลังอาหาร':'ก่อนอาหาร'}</div><div class="med-status">${st}</div>${m.note?`<div class="note-line">📝 ${m.note}</div>`:''}</div><div class="mini-actions"><button onclick="openMedForm('${m.id}')">✏️</button><button onclick="delMed('${m.id}')">🗑️</button></div></div>`;}).join(''):'<div class="empty">ยังไม่มียา</div>'); }

function openMedForm(id){ const m=state.meds.find(x=>x.id===id)||{slots:[],afterFood:true}; const has=s=>(m.slots||[]).includes(s)?'checked':''; openModal(`<h3>${id?'แก้ไขยา':'💊 เพิ่มยา'}</h3><div class="field"><label>ชื่อยา</label><input id="md-name" value="${m.name||''}"></div><div class="field"><label>กินมื้อไหน</label><div class="chk-row"><label><input type="checkbox" id="md-m" ${has('morning')}> เช้า</label><label><input type="checkbox" id="md-l" ${has('lunch')}> กลางวัน</label><label><input type="checkbox" id="md-d" ${has('dinner')}> เย็น</label></div></div><div class="field"><label><input type="checkbox" id="md-af" ${m.afterFood?'checked':''}> หลังอาหาร</label></div><div class="field"><label>วันเริ่ม</label><input type="date" id="md-start" value="${m.startDate||todayKey()}"></div><p class="help">ใส่จำนวนวัน หรือจำนวนเม็ด/ซอง อย่างใดอย่างหนึ่ง</p><div class="frow"><div class="field"><label>กี่วัน</label><input type="number" id="md-days" value="${m.days||''}"></div><div class="field"><label>จำนวน</label><input type="number" id="md-qty" value="${m.qty||''}"></div></div><div class="field"><label>หมายเหตุ</label><input id="md-note" value="${m.note||''}"></div><button class="btn-primary" onclick="saveMed('${id||''}')">บันทึก</button>`); }

function saveMed(id){ const slots=[]; if(document.getElementById('md-m').checked)slots.push('morning'); if(document.getElementById('md-l').checked)slots.push('lunch'); if(document.getElementById('md-d').checked)slots.push('dinner'); const data={name:document.getElementById('md-name').value.trim()||'ยา',slots,afterFood:document.getElementById('md-af').checked,startDate:document.getElementById('md-start').value,days:parseInt(document.getElementById('md-days').value)||0,qty:parseInt(document.getElementById('md-qty').value)||0,note:document.getElementById('md-note').value.trim()}; if(id){const m=state.meds.find(x=>x.id===id);if(m)Object.assign(m,data);}else{data.id='med'+Date.now();state.meds.push(data);} save();closeModal();toast('บันทึกยาแล้ว');renderHealth(); }

function delMed(id){ state.meds=state.meds.filter(x=>x.id!==id); save(); toast('ลบแล้ว'); renderHealth(); }



/* VET */

function renderVet(){ const v=[...state.vetVisits].sort((a,b)=>(b.date||'').localeCompare(a.date||'')); document.getElementById('vetCard').innerHTML=`<div class="row-head"><h2>🏥 ประวัติหาหมอ</h2><button class="btn-ghost" onclick="openVetForm()">＋</button></div>`+(v.length?v.map(x=>`<div class="vet-row"><div class="vet-date">${x.date?dkPretty(x.date):'—'}</div><div class="vet-main">${x.reason?`<div class="med-name">🩺 ${x.reason}</div>`:''}${x.diagnosis?`<div class="med-meta">${x.diagnosis}</div>`:''}${x.cost?`<div class="med-status">ค่ารักษา: <b>${Number(x.cost).toLocaleString()}฿</b></div>`:''}</div><div class="mini-actions"><button onclick="openVetForm('${x.id}')">✏️</button><button onclick="delVet('${x.id}')">🗑️</button></div></div>`).join(''):'<div class="empty">ยังไม่มีบันทึก</div>'); }

function openVetForm(id){ const v=state.vetVisits.find(x=>x.id===id)||{}; openModal(`<h3>${id?'แก้ไข':'🏥 เพิ่มบันทึก'}</h3><div class="field"><label>วันที่</label><input type="date" id="vt-date" value="${v.date||todayKey()}"></div><div class="field"><label>สาเหตุ</label><input id="vt-reason" value="${v.reason||''}"></div><div class="field"><label>คำวินิจฉัย</label><textarea id="vt-dx" rows="2">${v.diagnosis||''}</textarea></div><div class="field"><label>ค่าใช้จ่าย ฿</label><input type="number" id="vt-cost" value="${v.cost||''}"></div><button class="btn-primary" onclick="saveVet('${id||''}')">บันทึก</button>`); }

function saveVet(id){ const data={date:document.getElementById('vt-date').value,reason:document.getElementById('vt-reason').value.trim(),diagnosis:document.getElementById('vt-dx').value.trim(),cost:parseFloat(document.getElementById('vt-cost').value)||0}; if(id){const v=state.vetVisits.find(x=>x.id===id);if(v)Object.assign(v,data);}else{data.id='vet'+Date.now();state.vetVisits.push(data);} save();closeModal();toast('บันทึกแล้ว');renderVet(); }

function delVet(id){ state.vetVisits=state.vetVisits.filter(x=>x.id!==id); save(); toast('ลบแล้ว'); renderVet(); }



/* ===== SETTINGS / THEME ===== */

function applyTheme(){ document.documentElement.setAttribute('data-theme', state.profile.dark?'dark':'light'); document.getElementById('darkBtn').textContent = state.profile.dark?'☀️':'🌙'; }

document.getElementById('darkBtn').onclick=()=>{ state.profile.dark=!state.profile.dark; save(); applyTheme(); };

document.getElementById('settingsBtn').onclick=()=>{ const p=state.profile; const c=getCloud()||{}; const facts=[[1.2,'ทำหมันแล้ว'],[1.4,'ไม่ทำหมัน'],[1.0,'ลดน้ำหนัก'],[2.5,'ลูกแมว']];

  openModal(`<h3>⚙️ ตั้งค่า</h3>

  <div class="field"><label>รูปน้อง</label><div class="up-area"><div class="sticker-frame" id="pfPrev">${p.photo?`<img src="${p.photo}">`:'<span class="ph-cam">🐱</span>'}</div><div style="flex:1;display:flex;flex-direction:column;gap:8px"><button type="button" class="btn-soft" onclick="document.getElementById('pfFile').click()">📷 อัปโหลด</button><button type="button" class="btn-ghost" onclick="document.getElementById('pf-photo').value='';document.getElementById('pfPrev').innerHTML='<span class=ph-cam>🐱</span>'">ลบ</button></div></div><input type="file" id="pfFile" accept="image/*" hidden onchange="pickPf(event)"><input type="hidden" id="pf-photo" value="${p.photo||''}"></div>

  <div class="field"><label>ชื่อ</label><input id="pf-name" value="${p.name}"></div>

  <div class="field"><label>น้ำหนัก (กก.)</label><input type="number" step="0.1" id="pf-w" value="${p.weight}"></div>

  <div class="field"><label>เวลา 3 มื้อ</label><div class="frow"><input type="time" id="pf-t0" value="${(p.mealTimes||[])[0]||'08:00'}"><input type="time" id="pf-t1" value="${(p.mealTimes||[])[1]||'13:00'}"><input type="time" id="pf-t2" value="${(p.mealTimes||[])[2]||'18:00'}"></div></div>

  <div class="field"><label>ระดับกิจกรรม</label><select id="pf-f">${facts.map(f=>`<option value="${f[0]}" ${p.factor==f[0]?'selected':''}>${f[1]}</option>`).join('')}</select></div>

  <p class="help">เป้า: <b>${targetKcal()} kcal/วัน</b></p>

  <button class="btn-primary" onclick="saveProfile()">บันทึก</button>

  <div class="frow mt"><button class="btn-soft" onclick="exportData()">⬇️ สำรองข้อมูล</button><button class="btn-soft" onclick="document.getElementById('impFile').click()">⬆️ กู้คืน</button></div>

  <input type="file" id="impFile" accept="application/json" hidden onchange="importData(event)">

  <hr style="border:none;border-top:1px solid var(--line);margin:16px 0">

  <div class="field"><label>☁️ Cloud Sync — ซิงก์ข้ามเครื่อง (ไม่บังคับ)</label>

    <textarea id="cl-config" rows="3" placeholder='วาง firebaseConfig จาก Firebase Console เช่น {"apiKey":"...","authDomain":"...","projectId":"..."}'>${c.config?JSON.stringify(c.config):''}</textarea></div>

  <div class="field"><label>รหัสซิงก์ (ตั้งเอง ใช้รหัสเดียวกันทุกเครื่อง)</label><input id="cl-key" value="${c.syncKey||''}" placeholder="เช่น cindy-2026"></div>

  <div class="frow"><button class="btn-soft" onclick="saveCloud()">เชื่อมต่อ & อัปขึ้น ☁️</button><button class="btn-soft" onclick="cloudPull()">ดึงจากคลาวด์ ⬇️</button></div>

  <div id="cl-status" class="help">${cloudReady?'● เชื่อมต่อแล้ว':'○ ยังไม่ได้เชื่อมต่อ'}</div>

  <p class="help">ขอฟรีที่ console.firebase.google.com → สร้างโปรเจกต์ → Firestore Database (เปิด test mode) → Project settings คัดลอก firebaseConfig มาวาง · ใส่รหัสซิงก์เดียวกันทุกเครื่อง</p>

  <button class="btn-ghost mt" style="width:100%" onclick="confirmReset()">🗑️ รีเซ็ตข้อมูลทั้งหมด</button>`); };

function pickPf(e){ const f=e.target.files&&e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>resize(ev.target.result,320,d=>{document.getElementById('pf-photo').value=d;document.getElementById('pfPrev').innerHTML=`<img src="${d}">`;}); r.readAsDataURL(f); }

function saveProfile(){ state.profile.name=document.getElementById('pf-name').value||'Cindy'; const w=parseFloat(document.getElementById('pf-w').value); if(w>0){state.profile.weight=w; const dk=todayKey(); const ex=state.weights.find(x=>x.date===dk); if(ex)ex.kg=w; else state.weights.push({date:dk,kg:w});} state.profile.factor=parseFloat(document.getElementById('pf-f').value)||1.2; state.profile.mealTimes=[document.getElementById('pf-t0').value||'08:00',document.getElementById('pf-t1').value||'13:00',document.getElementById('pf-t2').value||'18:00']; state.profile.photo=document.getElementById('pf-photo').value||''; save(); closeModal(); toast('บันทึกแล้ว 💕'); renderAll(); }

function confirmReset(){ openModal(`<h3>รีเซ็ตข้อมูลทั้งหมด?</h3><p class="help" style="text-align:center">กู้คืนไม่ได้</p><div class="frow"><button class="btn-soft" onclick="closeModal()">ยกเลิก</button><button class="btn-primary" onclick="doReset()">ลบเลย</button></div>`); }

function doReset(){ localStorage.removeItem(KEY); state=fresh(); closeModal(); toast('รีเซ็ตแล้ว'); renderAll(); }



/* ============================================================

   ☁️ CLOUD SYNC (Firebase Firestore) — ไม่บังคับ

   ============================================================ */

function loadScript(src){ return new Promise((res,rej)=>{ const s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=()=>rej(new Error('load')); document.head.appendChild(s); }); }

function parseConfig(txt){ if(!txt)return null; txt=txt.trim().replace(/^const\s+\w+\s*=\s*/,'').replace(/;+\s*$/,''); try{ return JSON.parse(txt); }catch(e){ try{ return Function('return ('+txt+')')(); }catch(e2){ return null; } } }

async function initCloud(silent){

  const c=getCloud(); if(!c||!c.config||!c.syncKey) return;

  try{

    if(!window.firebase){ await loadScript('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js'); await loadScript('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js'); }

    if(!firebase.apps.length) firebase.initializeApp(c.config);

    cloudDoc=firebase.firestore().collection('cindycare').doc(c.syncKey);

    cloudReady=true;

    cloudDoc.onSnapshot(snap=>{ if(!snap.exists)return; const d=snap.data(); if(!d||!d.state||d.src===deviceId)return;

      try{ const remote=JSON.parse(d.state); applyingRemote=true; state=Object.assign(fresh(),remote); if(!state.foods||!state.foods.length)state.foods=JSON.parse(JSON.stringify(SEED_FOODS)); localStorage.setItem(KEY,JSON.stringify(state)); applyingRemote=false; renderAll(); toast('ซิงก์จากคลาวด์แล้ว ☁️'); }catch(e){ applyingRemote=false; } });

    updateCloudStatus(); if(!silent) toast('เชื่อมต่อคลาวด์แล้ว ☁️');

  }catch(e){ cloudReady=false; if(!silent) toast('เชื่อมต่อไม่ได้ — เช็ก config/เน็ต'); updateCloudStatus(); }

}

function cloudPush(){ if(!cloudReady||!cloudDoc||applyingRemote) return; clearTimeout(pushTimer); pushTimer=setTimeout(()=>{ cloudDoc.set({ state:JSON.stringify(state), updated:Date.now(), src:deviceId }).catch(()=>{}); }, 1200); }

function cloudPull(){ if(!cloudReady||!cloudDoc){ toast('ยังไม่ได้เชื่อมต่อคลาวด์'); return; } cloudDoc.get().then(snap=>{ if(!snap.exists){ toast('ยังไม่มีข้อมูลบนคลาวด์'); return; } const d=snap.data(); const remote=JSON.parse(d.state); state=Object.assign(fresh(),remote); if(!state.foods||!state.foods.length)state.foods=JSON.parse(JSON.stringify(SEED_FOODS)); localStorage.setItem(KEY,JSON.stringify(state)); closeModal(); toast('ดึงข้อมูลจากคลาวด์แล้ว ☁️'); renderAll(); }).catch(()=>toast('ดึงไม่สำเร็จ')); }

function updateCloudStatus(){ const el=document.getElementById('cl-status'); if(el) el.innerHTML = cloudReady?'<span style="color:var(--good)">● เชื่อมต่อแล้ว — ซิงก์อัตโนมัติ</span>':'○ ยังไม่ได้เชื่อมต่อ'; }

async function saveCloud(){

  const cfg=parseConfig(document.getElementById('cl-config').value); const key=document.getElementById('cl-key').value.trim();

  if(!cfg||!cfg.apiKey){ toast('config ไม่ถูกต้อง (วาง firebaseConfig)'); return; }

  if(!key){ toast('ตั้งรหัสซิงก์ก่อน'); return; }

  setCloud({ config:cfg, syncKey:key });

  cloudReady=false; cloudDoc=null;

  await initCloud(true);

  if(!cloudReady) return;

  cloudDoc.get().then(snap=>{

    if(snap.exists){

      const d=snap.data();

      if(d&&d.state){

        const remote=JSON.parse(d.state);

        state=Object.assign(fresh(),remote);

        if(!state.foods||!state.foods.length)state.foods=JSON.parse(JSON.stringify(SEED_FOODS));

        localStorage.setItem(KEY,JSON.stringify(state));

        closeModal(); renderAll(); updateCloudStatus();

        toast('เชื่อมต่อแล้ว และดึงข้อมูลจากคลาวด์แล้ว ☁️');

        return;

      }

    }

    cloudDoc.set({ state:JSON.stringify(state), updated:Date.now(), src:deviceId }).then(()=>{ toast('เชื่อมต่อ & อัปขึ้นคลาวด์แล้ว ☁️'); updateCloudStatus(); }).catch(()=>toast('อัปไม่สำเร็จ'));

  }).catch(()=>toast('เชื่อมต่อได้ แต่ตรวจข้อมูลคลาวด์ไม่สำเร็จ'));

}



/* ===== MODAL / TOAST ===== */

const overlay=document.getElementById('modalOverlay');

function openModal(html){ document.getElementById('modalContent').innerHTML=html; overlay.classList.add('open'); }

function closeModal(){ overlay.classList.remove('open'); }

document.getElementById('modalClose').onclick=closeModal;

overlay.addEventListener('click',e=>{ if(e.target===overlay)closeModal(); });

let toastT; function toast(m){ const t=document.getElementById('toast'); t.textContent=m; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2000); }



/* expose for inline handlers */

Object.assign(window, { showView, logMeal, undoMeal, openPack, openDay, saveNote, setFoodCat, openFood, openFoodForm, saveFood, confirmDel, delFood, pickImg, ocrPick, toggleDry, openBatch, addBatchRow, saveBatch, addPoop, delPoop, addPee, delPee, addWater, toggleTreatDone, exportData, importData, saveCloud, cloudPull, openMedForm, saveMed, delMed, openVetForm, saveVet, delVet, saveProfile, confirmReset, doReset, pickPf, closeModal });



/* ===== INIT ===== */

window.addEventListener('resize', drawWeight);

renderAll();

initCloud(true); // เชื่อมต่อคลาวด์อัตโนมัติถ้าเคยตั้งค่าไว้




