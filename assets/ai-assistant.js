(()=>{
"use strict";
if(window.__lhAssistantLoaded)return;
window.__lhAssistantLoaded=true;
const current=document.currentScript;
const source=current&&current.src?current.src:new URL("assets/ai-assistant.js",location.href).href;
const asset=(p)=>new URL(p,source).href;
const HOME=new URL("../",source).href;
const style=document.createElement("link");
style.rel="stylesheet";style.href=asset("ai-assistant.css");document.head.appendChild(style);
let kb=null,opened=false,historyCount=0;
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const root=make("div","lh-ai-root");document.body.appendChild(root);
const openBtn=make("button","lh-ai-launch");
openBtn.type="button";openBtn.setAttribute("aria-label","打开 LINK HEALTH 在线服务助手");
openBtn.innerHTML='<span class="lh-ai-launch-icon" aria-hidden="true">✦</span><span>在线咨询</span>';
root.appendChild(openBtn);
const panel=make("section","lh-ai-panel");
panel.setAttribute("role","dialog");panel.setAttribute("aria-label","LINK HEALTH 智能服务助手");
panel.setAttribute("aria-modal","false");panel.hidden=true;
const header=make("div","lh-ai-head");
const top=make("div","lh-ai-headline");
const mark=make("div","lh-ai-mark","LH");
const headText=make("div","lh-ai-headtext");
const title=make("strong",null,"LINK HEALTH 智能服务助手");
const subtitle=make("span",null,"24小时 · 知识库试运行 · 不代替医生");
headText.append(title,subtitle);top.append(mark,headText);
const close=make("button","lh-ai-close","×");close.type="button";close.setAttribute("aria-label","关闭咨询窗口");
header.append(top,close);panel.appendChild(header);
const messages=make("div","lh-ai-messages");messages.setAttribute("role","log");messages.setAttribute("aria-live","polite");messages.setAttribute("aria-relevant","additions");panel.appendChild(messages);
const suggestions=make("div","lh-ai-suggestions");panel.appendChild(suggestions);
const composer=make("form","lh-ai-compose");
const input=make("input","lh-ai-input");
input.type="text";input.name="question";input.maxLength=240;input.autocomplete="off";input.placeholder="请询问服务、流程或项目安排";input.setAttribute("aria-label","请输入咨询问题");
const send=make("button","lh-ai-send","发送");send.type="submit";composer.append(input,send);panel.appendChild(composer);
const foot=make("div","lh-ai-foot");
const privacy=make("p",null,"请勿发送姓名、电话、病历等隐私信息。聊天不自动保存至CRM。");
const actions=make("div","lh-ai-foot-actions");
const human=make("a",null,"联系人工顾问 ↗");human.href=new URL("#contact",HOME).href;
const reset=make("button",null,"清空对话");reset.type="button";
actions.append(human,reset);foot.append(privacy,actions);panel.appendChild(foot);
root.appendChild(panel);
function scrollEnd(){messages.scrollTop=messages.scrollHeight}
function bubble(role,text,link,linkText){
  const row=make("div","lh-ai-row lh-ai-"+role);
  const b=make("div","lh-ai-bubble",text);
  row.appendChild(b);
  if(link&&role==="bot"){
    const a=make("a","lh-ai-result-link",linkText||"了解详情 ↗");
    a.href=new URL(link,HOME).href;a.target="_self";row.appendChild(a);
  }
  messages.appendChild(row);historyCount++;scrollEnd();
}
function quickOptions(){
  suggestions.replaceChildren();
  const arr=(kb&&kb.suggestions)||["肠道健康计划","国际第二诊疗意见","日本精密体检","联系人工顾问"];
  for(const label of arr){
    const b=make("button",null,label);b.type="button";
    b.addEventListener("click",()=>respond(label));
    suggestions.appendChild(b);
  }
}
function greeting(){
  messages.replaceChildren();historyCount=0;
  bubble("bot",(kb&&kb.intro)||"您好，欢迎来到 LINK HEALTH。您可以咨询我们的服务项目、预约流程或联系人工顾问。");
  const note=make("p","lh-ai-caution",(kb&&kb.notice)||"目前为已审核知识库问答试运行，请勿输入个人病历与联系方式。");
  messages.appendChild(note);quickOptions();
}
const normalize=s=>String(s||"").toLowerCase().replace(/[\s\-\u3000，。？！、；：,.!?]/g,"");
const has=(s,terms)=>terms.some(w=>s.includes(w));
function decide(raw){
  const q=normalize(raw);
  if(!q)return {answer:"请输入您希望了解的服务问题。"};
  if(/(?:1[3-9]\d{9})|(?:\b\d{17}[\dxX]\b)|(?:[\w.+-]+@[\w.-]+\.[a-z]{2,})/.test(raw)){
    return {answer:"为了保护隐私，请不要在本窗口输入手机号、邮箱、身份证号或病历内容。如需提交资料，请直接联系人工顾问。",link:"/#contact",linkText:"联系人工顾问 ↗"};
  }
  if(has(q,["胸痛","呼吸困难","昏迷","意识不清","大量便血","剧烈腹痛","急救","晕厥","大出血"])){
    return {answer:(kb&&kb.emergency)||"如出现紧急症状，请立即联系当地急救服务或前往急诊。"};
  }
  if(has(q,["怎么开药","帮我开药","替我诊断","帮我诊断","吃什么药","用什么药","我得了什么病","可以治好吗","能治好吗","保证治好","是不是癌症"])){
    return {answer:"这是需要专业医生根据个人检查和病史判断的医疗问题，我不能在这里诊断、开药或保证疗效。建议先咨询接诊医生；如需了解国际医疗资源与就诊协调，可以联系人工顾问。",link:"/#contact",linkText:"联系人工顾问 ↗"};
  }
  if(has(q,["多少钱","收费","费用","报价","付款","价格","预算","折扣","有名额","能预约吗","什么时候能预约","实时预约"])){
    const choice=(kb?.topics||[]).find(x=>x.id=== (has(q,["有名额","能预约吗","什么时候能预约","实时预约"])?"availability":"price"));
    return choice?{answer:choice.answer,link:"/#contact",linkText:"请人工核实 ↗"}:{answer:kb?.human};
  }
  if(q.length<=4&&has(q,["你好","您好","hi","hello","在吗","谢谢"])){
    return {answer:"您好！我可以介绍 LINK HEALTH 的服务、四天三晚肠道健康计划以及国际二诊流程。请点击下方快捷问题，或直接说您想了解哪项服务。"};
  }
  const topics=kb?.topics||[];
  let best=null,score=0,second=0;
  for(const t of topics){
    let val=0;
    for(const word of t.triggers||[]){
      const w=normalize(word);
      if(w&&q.includes(w)){
        val+=Math.min(9,Math.max(2,w.length));
        if(q===w)val+=5;
      }
    }
    if(val>score){second=score;score=val;best=t}
    else if(val>second)second=val;
  }
  if(best&&score>=3&&!(score===second&&score<9)){
    return {answer:best.answer,link:best.handoff?"/#contact":best.link,linkText:best.handoff?"联系人工顾问 ↗":best.link_text};
  }
  return {answer:(kb&&kb.human)||"这项信息还需要人工确认，请联系 LINK HEALTH 顾问。",link:"/#contact",linkText:"联系人工顾问 ↗"};
}
function respond(value){
  const raw=String(value||"").trim();if(!raw)return;
  if(raw.length>240){bubble("bot","问题太长，请简短描述您希望了解的服务方向。");return}
  bubble("user",raw);
  const result=decide(raw);
  bubble("bot",result.answer||kb?.human||"请联系人工顾问。",result.link,result.linkText);
  input.value="";
  if(historyCount>42){bubble("bot","为了保持页面流畅，可以点击下方“清空对话”重新咨询。");input.disabled=true;send.disabled=true}
}
openBtn.addEventListener("click",()=>{
  opened=!opened;panel.hidden=!opened;openBtn.setAttribute("aria-expanded",String(opened));
  if(opened){if(messages.childElementCount===0)greeting();input.focus()}else openBtn.focus();
});
close.addEventListener("click",()=>{opened=false;panel.hidden=true;openBtn.setAttribute("aria-expanded","false");openBtn.focus()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&opened){opened=false;panel.hidden=true;openBtn.setAttribute("aria-expanded","false");openBtn.focus()}});
composer.addEventListener("submit",e=>{e.preventDefault();respond(input.value)});
reset.addEventListener("click",()=>{input.disabled=false;send.disabled=false;greeting();input.focus()});
quickOptions();
fetch(asset("../assistant/knowledge.json"),{credentials:"omit",cache:"no-store"})
  .then(r=>{if(!r.ok)throw new Error("Knowledge unavailable");return r.json()})
  .then(data=>{if(!data||!Array.isArray(data.topics))throw new Error("Invalid KB");kb=data;if(historyCount===0&&opened)greeting();else if(!opened)quickOptions()})
  .catch(()=>{kb=null;if(opened&&historyCount===0)greeting()});
})();