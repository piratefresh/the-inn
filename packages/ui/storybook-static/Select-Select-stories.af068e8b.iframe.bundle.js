"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[9851],{"./src/Select/Select.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Select_stories});var react=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js");function disposables_m(){let n=[],i=[],r={enqueue(e){i.push(e)},addEventListener:(e,t,a,o)=>(e.addEventListener(t,a,o),r.add((()=>e.removeEventListener(t,a,o)))),requestAnimationFrame(...e){let t=requestAnimationFrame(...e);return r.add((()=>cancelAnimationFrame(t)))},nextFrame:(...e)=>r.requestAnimationFrame((()=>r.requestAnimationFrame(...e))),setTimeout(...e){let t=setTimeout(...e);return r.add((()=>clearTimeout(t)))},microTask(...e){let t={current:!0};return function micro_task_t(e){"function"==typeof queueMicrotask?queueMicrotask(e):Promise.resolve().then(e).catch((o=>setTimeout((()=>{throw o}))))}((()=>{t.current&&e[0]()})),r.add((()=>{t.current=!1}))},add:e=>(n.push(e),()=>{let t=n.indexOf(e);if(t>=0){let[a]=n.splice(t,1);a()}}),dispose(){for(let e of n.splice(0))e()},async workQueue(){for(let e of i.splice(0))await e()}};return r}function use_disposables_p(){let[e]=(0,react.useState)(disposables_m);return(0,react.useEffect)((()=>()=>e.dispose()),[e]),e}const e="undefined"==typeof window||"undefined"==typeof document;let use_iso_morphic_effect_s=e?react.useEffect:react.useLayoutEffect,r={serverHandoffComplete:!1};var u;let l=0;function use_id_r(){return++l}let I=null!=(u=react.useId)?u:function(){let n=function a(){let[e,f]=(0,react.useState)(r.serverHandoffComplete);return(0,react.useEffect)((()=>{!0!==e&&f(!0)}),[e]),(0,react.useEffect)((()=>{!1===r.serverHandoffComplete&&(r.serverHandoffComplete=!0)}),[]),e}(),[e,o]=react.useState(n?use_id_r:null);return use_iso_morphic_effect_s((()=>{null===e&&o(use_id_r())}),[e]),null!=e?""+e:void 0};function use_latest_value_s(e){let r=(0,react.useRef)(e);return use_iso_morphic_effect_s((()=>{r.current=e}),[e]),r}function use_computed_i(e,o){let[u,t]=(0,react.useState)(e),r=use_latest_value_s(e);return use_iso_morphic_effect_s((()=>t(r.current)),[r,t,...o]),u}let use_event_o=function(t){let e=use_latest_value_s(t);return react.useCallback(((...r)=>e.current(...r)),[e])},use_sync_refs_u=Symbol();function use_sync_refs_y(...t){let n=(0,react.useRef)(t);(0,react.useEffect)((()=>{n.current=t}),[t]);let c=use_event_o((e=>{for(let o of n.current)null!=o&&("function"==typeof o?o(e):o.current=e)}));return t.every((e=>null==e||(null==e?void 0:e[use_sync_refs_u])))?void 0:c}function match_u(r,n,...a){if(r in n){let e=n[r];return"function"==typeof e?e(...a):e}let t=new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map((e=>`"${e}"`)).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,match_u),t}var S=(a=>(a[a.None=0]="None",a[a.RenderStrategy=1]="RenderStrategy",a[a.Static=2]="Static",a))(S||{}),j=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(j||{});function $({ourProps:r,theirProps:t,slot:e,defaultTag:a,features:o,visible:n=!0,name:l}){let s=render_T(t,r);if(n)return p(s,e,a,l);let u=null!=o?o:0;if(2&u){let{static:i=!1,...d}=s;if(i)return p(d,e,a,l)}if(1&u){let{unmount:i=!0,...d}=s;return match_u(i?0:1,{0:()=>null,1:()=>p({...d,hidden:!0,style:{display:"none"}},e,a,l)})}return p(s,e,a,l)}function p(r,t={},e,a){let{as:o=e,children:n,refName:l="ref",...s}=render_m(r,["unmount","static"]),u=void 0!==r.ref?{[l]:r.ref}:{},i="function"==typeof n?n(t):n;s.className&&"function"==typeof s.className&&(s.className=s.className(t));let d={};if(t){let f=!1,y=[];for(let[h,g]of Object.entries(t))"boolean"==typeof g&&(f=!0),!0===g&&y.push(h);f&&(d["data-headlessui-state"]=y.join(" "))}if(o===react.Fragment&&Object.keys(F(s)).length>0){if(!(0,react.isValidElement)(i)||Array.isArray(i)&&i.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${a} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(s).map((f=>`  - ${f}`)).join("\n"),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map((f=>`  - ${f}`)).join("\n")].join("\n"));return(0,react.cloneElement)(i,Object.assign({},render_T(i.props,F(render_m(s,["ref"]))),d,u,function w(...r){return{ref:r.every((t=>null==t))?void 0:t=>{for(let e of r)null!=e&&("function"==typeof e?e(t):e.current=t)}}}(i.ref,u.ref)))}return(0,react.createElement)(o,Object.assign({},render_m(s,["ref"]),o!==react.Fragment&&u,o!==react.Fragment&&d),i)}function render_T(...r){if(0===r.length)return{};if(1===r.length)return r[0];let t={},e={};for(let o of r)for(let n in o)n.startsWith("on")&&"function"==typeof o[n]?(null!=e[n]||(e[n]=[]),e[n].push(o[n])):t[n]=o[n];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(e).map((o=>[o,void 0]))));for(let o in e)Object.assign(t,{[o](n,...l){let s=e[o];for(let u of s){if((n instanceof Event||(null==n?void 0:n.nativeEvent)instanceof Event)&&n.defaultPrevented)return;u(n,...l)}}});return t}function C(r){var t;return Object.assign((0,react.forwardRef)(r),{displayName:null!=(t=r.displayName)?t:r.name})}function F(r){let t=Object.assign({},r);for(let e in t)void 0===t[e]&&delete t[e];return t}function render_m(r,t=[]){let e=Object.assign({},r);for(let a of t)a in e&&delete e[a];return e}var keyboard_o=(r=>(r.Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r))(keyboard_o||{});var calculate_active_index_a=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(calculate_active_index_a||{});function x(r,n){let t=n.resolveItems();if(t.length<=0)return null;let l=n.resolveActiveIndex(),s=null!=l?l:-1,d=(()=>{switch(r.focus){case 0:return t.findIndex((e=>!n.resolveDisabled(e)));case 1:{let e=t.slice().reverse().findIndex(((i,c,u)=>!(-1!==s&&u.length-c-1>=s)&&!n.resolveDisabled(i)));return-1===e?e:t.length-1-e}case 2:return t.findIndex(((e,i)=>!(i<=s)&&!n.resolveDisabled(e)));case 3:{let e=t.slice().reverse().findIndex((i=>!n.resolveDisabled(i)));return-1===e?e:t.length-1-e}case 4:return t.findIndex((e=>n.resolveId(e)===r.id));case 5:return null;default:!function f(r){throw new Error("Unexpected object: "+r)}(r)}})();return-1===d?l:d}function bugs_r(n){let e=n.parentElement,l=null;for(;e&&!(e instanceof HTMLFieldSetElement);)e instanceof HTMLLegendElement&&(l=e),e=e.parentElement;let t=""===(null==e?void 0:e.getAttribute("disabled"));return(!t||!function i(n){if(!n)return!1;let e=n.previousElementSibling;for(;null!==e;){if(e instanceof HTMLLegendElement)return!1;e=e.previousElementSibling}return!0}(l))&&t}function owner_e(r){return e?null:r instanceof Node?r.ownerDocument:null!=r&&r.hasOwnProperty("current")&&r.current instanceof Node?r.current.ownerDocument:document}let focus_management_f=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map((e=>`${e}:not([tabindex='-1'])`)).join(",");var n,L=((n=L||{})[n.First=1]="First",n[n.Previous=2]="Previous",n[n.Next=4]="Next",n[n.Last=8]="Last",n[n.WrapAround=16]="WrapAround",n[n.NoScroll=32]="NoScroll",n),N=(o=>(o[o.Error=0]="Error",o[o.Overflow=1]="Overflow",o[o.Success=2]="Success",o[o.Underflow=3]="Underflow",o))(N||{}),focus_management_T=(r=>(r[r.Previous=-1]="Previous",r[r.Next=1]="Next",r))(focus_management_T||{});var focus_management_F=(r=>(r[r.Strict=0]="Strict",r[r.Loose=1]="Loose",r))(focus_management_F||{});function focus_management_h(e,t=0){var r;return e!==(null==(r=owner_e(e))?void 0:r.body)&&match_u(t,{0:()=>e.matches(focus_management_f),1(){let l=e;for(;null!==l;){if(l.matches(focus_management_f))return!0;l=l.parentElement}return!1}})}["textarea","input"].join(",");function A(e,t=(r=>r)){return e.slice().sort(((r,l)=>{let o=t(r),i=t(l);if(null===o||null===i)return 0;let n=o.compareDocumentPosition(i);return n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0}))}let o=(0,react.createContext)(null);o.displayName="OpenClosedContext";var open_closed_p=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(open_closed_p||{});function open_closed_s(){return(0,react.useContext)(o)}function open_closed_C({value:t,children:n}){return react.createElement(o.Provider,{value:t},n)}function use_resolve_button_type_i(t){var n;if(t.type)return t.type;let e=null!=(n=t.as)?n:"button";return"string"==typeof e&&"button"===e.toLowerCase()?"button":void 0}function s(t,e){let[n,u]=(0,react.useState)((()=>use_resolve_button_type_i(t)));return use_iso_morphic_effect_s((()=>{u(use_resolve_button_type_i(t))}),[t.type,t.as]),use_iso_morphic_effect_s((()=>{n||!e.current||e.current instanceof HTMLButtonElement&&!e.current.hasAttribute("type")&&u("button")}),[n,e]),n}function d(e,r,n){let o=use_latest_value_s(r);(0,react.useEffect)((()=>{function t(u){o.current(u)}return document.addEventListener(e,t,n),()=>document.removeEventListener(e,t,n)}),[e,n])}function use_outside_click_L(m,E,c=!0){let i=(0,react.useRef)(!1);function f(e,o){if(!i.current||e.defaultPrevented)return;let l=function r(t){return"function"==typeof t?r(t()):Array.isArray(t)||t instanceof Set?t:[t]}(m),n=o(e);if(null!==n&&n.getRootNode().contains(n)){for(let r of l){if(null===r)continue;let t=r instanceof HTMLElement?r:r.current;if(null!=t&&t.contains(n)||e.composed&&e.composedPath().includes(t))return}return!focus_management_h(n,focus_management_F.Loose)&&-1!==n.tabIndex&&e.preventDefault(),E(e,n)}}(0,react.useEffect)((()=>{requestAnimationFrame((()=>{i.current=c}))}),[c]);let u=(0,react.useRef)(null);d("mousedown",(e=>{var o,l;i.current&&(u.current=(null==(l=null==(o=e.composedPath)?void 0:o.call(e))?void 0:l[0])||e.target)}),!0),d("click",(e=>{!u.current||(f(e,(()=>u.current)),u.current=null)}),!0),d("blur",(e=>f(e,(()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null))),!0)}var hidden_s=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(hidden_s||{});let hidden_h=C((function(t,o){let{features:e=1,...r}=t;return $({ourProps:{ref:o,"aria-hidden":2==(2&e)||void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...4==(4&e)&&2!=(2&e)&&{display:"none"}}},theirProps:r,slot:{},defaultTag:"div",name:"Hidden"})}));function form_e(n={},r=null,t=[]){for(let[i,o]of Object.entries(n))form_f(t,form_s(r,i),o);return t}function form_s(n,r){return n?n+"["+r+"]":r}function form_f(n,r,t){if(Array.isArray(t))for(let[i,o]of t.entries())form_f(n,form_s(r,i.toString()),o);else t instanceof Date?n.push([r,t.toISOString()]):"boolean"==typeof t?n.push([r,t?"1":"0"]):"string"==typeof t?n.push([r,t]):"number"==typeof t?n.push([r,`${t}`]):null==t?n.push([r,""]):form_e(t,r,n)}function t(e){return[e.screenX,e.screenY]}function use_tracked_pointer_u(){let e=(0,react.useRef)([-1,-1]);return{wasMoved(r){let n=t(r);return(e.current[0]!==n[0]||e.current[1]!==n[1])&&(e.current=n,!0)},update(r){e.current=t(r)}}}var Ue=(o=>(o[o.Open=0]="Open",o[o.Closed=1]="Closed",o))(Ue||{}),Be=(o=>(o[o.Single=0]="Single",o[o.Multi=1]="Multi",o))(Be||{}),He=(o=>(o[o.Pointer=0]="Pointer",o[o.Other=1]="Other",o))(He||{}),Ge=(n=>(n[n.OpenListbox=0]="OpenListbox",n[n.CloseListbox=1]="CloseListbox",n[n.GoToOption=2]="GoToOption",n[n.Search=3]="Search",n[n.ClearSearch=4]="ClearSearch",n[n.RegisterOption=5]="RegisterOption",n[n.UnregisterOption=6]="UnregisterOption",n[n.RegisterLabel=7]="RegisterLabel",n))(Ge||{});function q(e,r=(o=>o)){let o=null!==e.activeOptionIndex?e.options[e.activeOptionIndex]:null,p=A(r(e.options.slice()),(c=>c.dataRef.current.domRef.current)),i=o?p.indexOf(o):null;return-1===i&&(i=null),{options:p,activeOptionIndex:i}}let je={1:e=>e.dataRef.current.disabled||1===e.listboxState?e:{...e,activeOptionIndex:null,listboxState:1},0(e){if(e.dataRef.current.disabled||0===e.listboxState)return e;let r=e.activeOptionIndex,{isSelected:o}=e.dataRef.current,p=e.options.findIndex((i=>o(i.dataRef.current.value)));return-1!==p&&(r=p),{...e,listboxState:0,activeOptionIndex:r}},2(e,r){var i;if(e.dataRef.current.disabled||1===e.listboxState)return e;let o=q(e),p=x(r,{resolveItems:()=>o.options,resolveActiveIndex:()=>o.activeOptionIndex,resolveId:c=>c.id,resolveDisabled:c=>c.dataRef.current.disabled});return{...e,...o,searchQuery:"",activeOptionIndex:p,activationTrigger:null!=(i=r.trigger)?i:1}},3:(e,r)=>{if(e.dataRef.current.disabled||1===e.listboxState)return e;let p=""!==e.searchQuery?0:1,i=e.searchQuery+r.value.toLowerCase(),t=(null!==e.activeOptionIndex?e.options.slice(e.activeOptionIndex+p).concat(e.options.slice(0,e.activeOptionIndex+p)):e.options).find((n=>{var T;return!n.dataRef.current.disabled&&(null==(T=n.dataRef.current.textValue)?void 0:T.startsWith(i))})),u=t?e.options.indexOf(t):-1;return-1===u||u===e.activeOptionIndex?{...e,searchQuery:i}:{...e,searchQuery:i,activeOptionIndex:u,activationTrigger:1}},4:e=>e.dataRef.current.disabled||1===e.listboxState||""===e.searchQuery?e:{...e,searchQuery:""},5:(e,r)=>{let o={id:r.id,dataRef:r.dataRef},p=q(e,(i=>[...i,o]));return null===e.activeOptionIndex&&e.dataRef.current.isSelected(r.dataRef.current.value)&&(p.activeOptionIndex=p.options.indexOf(o)),{...e,...p}},6:(e,r)=>{let o=q(e,(p=>{let i=p.findIndex((c=>c.id===r.id));return-1!==i&&p.splice(i,1),p}));return{...e,...o,activationTrigger:1}},7:(e,r)=>({...e,labelId:r.id})},X=(0,react.createContext)(null);function B(e){let r=(0,react.useContext)(X);if(null===r){let o=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,B),o}return r}X.displayName="ListboxActionsContext";let J=(0,react.createContext)(null);function listbox_H(e){let r=(0,react.useContext)(J);if(null===r){let o=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,listbox_H),o}return r}function Ke(e,r){return match_u(r.type,je,e,r)}J.displayName="ListboxDataContext";let Ve=react.Fragment,Ne=C((function(r,o){let{value:p,defaultValue:i,name:c,onChange:t,by:u=((l,f)=>l===f),disabled:n=!1,horizontal:T=!1,multiple:g=!1,...A}=r;const m=T?"horizontal":"vertical";let P=use_sync_refs_y(o),[y=(g?[]:void 0),S]=function use_controllable_T(l,r,c){let[i,s]=(0,react.useState)(c),e=void 0!==l,t=(0,react.useRef)(e),u=(0,react.useRef)(!1),d=(0,react.useRef)(!1);return!e||t.current||u.current?!e&&t.current&&!d.current&&(d.current=!0,t.current=e,console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")):(u.current=!0,t.current=e,console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")),[e?l:i,use_event_o((n=>(e||s(n),null==r?void 0:r(n))))]}(p,t,i),[h,s]=(0,react.useReducer)(Ke,{dataRef:(0,react.createRef)(),listboxState:1,options:[],searchQuery:"",labelId:null,activeOptionIndex:null,activationTrigger:1}),a=(0,react.useRef)({static:!1,hold:!1}),x=(0,react.useRef)(null),D=(0,react.useRef)(null),Q=(0,react.useRef)(null),M=use_event_o("string"==typeof u?(l,f)=>{let v=u;return(null==l?void 0:l[v])===(null==f?void 0:f[v])}:u),L=(0,react.useCallback)((l=>match_u(d.mode,{1:()=>y.some((f=>M(f,l))),0:()=>M(y,l)})),[y]),d=(0,react.useMemo)((()=>({...h,value:y,disabled:n,mode:g?1:0,orientation:m,compare:M,isSelected:L,optionsPropsRef:a,labelRef:x,buttonRef:D,optionsRef:Q})),[y,n,g,h]);use_iso_morphic_effect_s((()=>{h.dataRef.current=d}),[d]),use_outside_click_L([d.buttonRef,d.optionsRef],((l,f)=>{var v;s({type:1}),focus_management_h(f,focus_management_F.Loose)||(l.preventDefault(),null==(v=d.buttonRef.current)||v.focus())}),0===d.listboxState);let G=(0,react.useMemo)((()=>({open:0===d.listboxState,disabled:n,value:y})),[d,n,y]),ie=use_event_o((l=>{let f=d.options.find((v=>v.id===l));!f||k(f.dataRef.current.value)})),re=use_event_o((()=>{if(null!==d.activeOptionIndex){let{dataRef:l,id:f}=d.options[d.activeOptionIndex];k(l.current.value),s({type:2,focus:calculate_active_index_a.Specific,id:f})}})),ae=use_event_o((()=>s({type:0}))),le=use_event_o((()=>s({type:1}))),se=use_event_o(((l,f,v)=>l===calculate_active_index_a.Specific?s({type:2,focus:calculate_active_index_a.Specific,id:f,trigger:v}):s({type:2,focus:l,trigger:v}))),ue=use_event_o(((l,f)=>(s({type:5,id:l,dataRef:f}),()=>s({type:6,id:l})))),pe=use_event_o((l=>(s({type:7,id:l}),()=>s({type:7,id:null})))),k=use_event_o((l=>match_u(d.mode,{0:()=>null==S?void 0:S(l),1(){let f=d.value.slice(),v=f.findIndex((w=>M(w,l)));return-1===v?f.push(l):f.splice(v,1),null==S?void 0:S(f)}}))),de=use_event_o((l=>s({type:3,value:l}))),ce=use_event_o((()=>s({type:4}))),fe=(0,react.useMemo)((()=>({onChange:k,registerOption:ue,registerLabel:pe,goToOption:se,closeListbox:le,openListbox:ae,selectActiveOption:re,selectOption:ie,search:de,clearSearch:ce})),[]),be={ref:P},j=(0,react.useRef)(null),Te=use_disposables_p();return(0,react.useEffect)((()=>{!j.current||void 0!==i&&Te.addEventListener(j.current,"reset",(()=>{k(i)}))}),[j,k]),react.createElement(X.Provider,{value:fe},react.createElement(J.Provider,{value:d},react.createElement(open_closed_C,{value:match_u(d.listboxState,{0:open_closed_p.Open,1:open_closed_p.Closed})},null!=c&&null!=y&&form_e({[c]:y}).map((([l,f],v)=>react.createElement(hidden_h,{features:hidden_s.Hidden,ref:0===v?w=>{var Y;j.current=null!=(Y=null==w?void 0:w.closest("form"))?Y:null}:void 0,...F({key:l,as:"input",type:"hidden",hidden:!0,readOnly:!0,name:l,value:f})}))),$({ourProps:be,theirProps:A,slot:G,defaultTag:Ve,name:"Listbox"}))))})),Qe=C((function(r,o){var h;let p=I(),{id:i=`headlessui-listbox-button-${p}`,...c}=r,t=listbox_H("Listbox.Button"),u=B("Listbox.Button"),n=use_sync_refs_y(t.buttonRef,o),T=use_disposables_p(),g=use_event_o((s=>{switch(s.key){case keyboard_o.Space:case keyboard_o.Enter:case keyboard_o.ArrowDown:s.preventDefault(),u.openListbox(),T.nextFrame((()=>{t.value||u.goToOption(calculate_active_index_a.First)}));break;case keyboard_o.ArrowUp:s.preventDefault(),u.openListbox(),T.nextFrame((()=>{t.value||u.goToOption(calculate_active_index_a.Last)}))}})),A=use_event_o((s=>{if(s.key===keyboard_o.Space)s.preventDefault()})),m=use_event_o((s=>{if(bugs_r(s.currentTarget))return s.preventDefault();0===t.listboxState?(u.closeListbox(),T.nextFrame((()=>{var a;return null==(a=t.buttonRef.current)?void 0:a.focus({preventScroll:!0})}))):(s.preventDefault(),u.openListbox())})),P=use_computed_i((()=>{if(t.labelId)return[t.labelId,i].join(" ")}),[t.labelId,i]),y=(0,react.useMemo)((()=>({open:0===t.listboxState,disabled:t.disabled,value:t.value})),[t]);return $({ourProps:{ref:n,id:i,type:s(r,t.buttonRef),"aria-haspopup":"listbox","aria-controls":null==(h=t.optionsRef.current)?void 0:h.id,"aria-expanded":t.disabled?void 0:0===t.listboxState,"aria-labelledby":P,disabled:t.disabled,onKeyDown:g,onKeyUp:A,onClick:m},theirProps:c,slot:y,defaultTag:"button",name:"Listbox.Button"})})),ze=C((function(r,o){let p=I(),{id:i=`headlessui-listbox-label-${p}`,...c}=r,t=listbox_H("Listbox.Label"),u=B("Listbox.Label"),n=use_sync_refs_y(t.labelRef,o);use_iso_morphic_effect_s((()=>u.registerLabel(i)),[i]);let T=use_event_o((()=>{var m;return null==(m=t.buttonRef.current)?void 0:m.focus({preventScroll:!0})})),g=(0,react.useMemo)((()=>({open:0===t.listboxState,disabled:t.disabled})),[t]);return $({ourProps:{ref:n,id:i,onClick:T},theirProps:c,slot:g,defaultTag:"label",name:"Listbox.Label"})})),Xe=S.RenderStrategy|S.Static,Je=C((function(r,o){var s;let p=I(),{id:i=`headlessui-listbox-options-${p}`,...c}=r,t=listbox_H("Listbox.Options"),u=B("Listbox.Options"),n=use_sync_refs_y(t.optionsRef,o),T=use_disposables_p(),g=use_disposables_p(),A=open_closed_s(),m=null!==A?A===open_closed_p.Open:0===t.listboxState;(0,react.useEffect)((()=>{var x;let a=t.optionsRef.current;!a||0===t.listboxState&&a!==(null==(x=owner_e(a))?void 0:x.activeElement)&&a.focus({preventScroll:!0})}),[t.listboxState,t.optionsRef]);let P=use_event_o((a=>{switch(g.dispose(),a.key){case keyboard_o.Space:if(""!==t.searchQuery)return a.preventDefault(),a.stopPropagation(),u.search(a.key);case keyboard_o.Enter:if(a.preventDefault(),a.stopPropagation(),null!==t.activeOptionIndex){let{dataRef:x}=t.options[t.activeOptionIndex];u.onChange(x.current.value)}0===t.mode&&(u.closeListbox(),disposables_m().nextFrame((()=>{var x;return null==(x=t.buttonRef.current)?void 0:x.focus({preventScroll:!0})})));break;case match_u(t.orientation,{vertical:keyboard_o.ArrowDown,horizontal:keyboard_o.ArrowRight}):return a.preventDefault(),a.stopPropagation(),u.goToOption(calculate_active_index_a.Next);case match_u(t.orientation,{vertical:keyboard_o.ArrowUp,horizontal:keyboard_o.ArrowLeft}):return a.preventDefault(),a.stopPropagation(),u.goToOption(calculate_active_index_a.Previous);case keyboard_o.Home:case keyboard_o.PageUp:return a.preventDefault(),a.stopPropagation(),u.goToOption(calculate_active_index_a.First);case keyboard_o.End:case keyboard_o.PageDown:return a.preventDefault(),a.stopPropagation(),u.goToOption(calculate_active_index_a.Last);case keyboard_o.Escape:return a.preventDefault(),a.stopPropagation(),u.closeListbox(),T.nextFrame((()=>{var x;return null==(x=t.buttonRef.current)?void 0:x.focus({preventScroll:!0})}));case keyboard_o.Tab:a.preventDefault(),a.stopPropagation();break;default:1===a.key.length&&(u.search(a.key),g.setTimeout((()=>u.clearSearch()),350))}})),y=use_computed_i((()=>{var a,x,D;return null!=(D=null==(a=t.labelRef.current)?void 0:a.id)?D:null==(x=t.buttonRef.current)?void 0:x.id}),[t.labelRef.current,t.buttonRef.current]),S=(0,react.useMemo)((()=>({open:0===t.listboxState})),[t]);return $({ourProps:{"aria-activedescendant":null===t.activeOptionIndex||null==(s=t.options[t.activeOptionIndex])?void 0:s.id,"aria-multiselectable":1===t.mode||void 0,"aria-labelledby":y,"aria-orientation":t.orientation,id:i,onKeyDown:P,role:"listbox",tabIndex:0,ref:n},theirProps:c,slot:S,defaultTag:"ul",features:Xe,visible:m,name:"Listbox.Options"})})),Ze=C((function(r,o){let p=I(),{id:i=`headlessui-listbox-option-${p}`,disabled:c=!1,value:t,...u}=r,n=listbox_H("Listbox.Option"),T=B("Listbox.Option"),g=null!==n.activeOptionIndex&&n.options[n.activeOptionIndex].id===i,A=n.isSelected(t),m=(0,react.useRef)(null),P=use_latest_value_s({disabled:c,value:t,domRef:m,get textValue(){var L,d;return null==(d=null==(L=m.current)?void 0:L.textContent)?void 0:d.toLowerCase()}}),y=use_sync_refs_y(o,m);use_iso_morphic_effect_s((()=>{if(0!==n.listboxState||!g||0===n.activationTrigger)return;let L=disposables_m();return L.requestAnimationFrame((()=>{var d,G;null==(G=null==(d=m.current)?void 0:d.scrollIntoView)||G.call(d,{block:"nearest"})})),L.dispose}),[m,g,n.listboxState,n.activationTrigger,n.activeOptionIndex]),use_iso_morphic_effect_s((()=>T.registerOption(i,P)),[P,i]);let S=use_event_o((L=>{if(c)return L.preventDefault();T.onChange(t),0===n.mode&&(T.closeListbox(),disposables_m().nextFrame((()=>{var d;return null==(d=n.buttonRef.current)?void 0:d.focus({preventScroll:!0})})))})),h=use_event_o((()=>{if(c)return T.goToOption(calculate_active_index_a.Nothing);T.goToOption(calculate_active_index_a.Specific,i)})),s=use_tracked_pointer_u(),a=use_event_o((L=>s.update(L))),x=use_event_o((L=>{!s.wasMoved(L)||c||g||T.goToOption(calculate_active_index_a.Specific,i,0)})),D=use_event_o((L=>{!s.wasMoved(L)||c||!g||T.goToOption(calculate_active_index_a.Nothing)})),Q=(0,react.useMemo)((()=>({active:g,selected:A,disabled:c})),[g,A,c]);return $({ourProps:{id:i,ref:y,role:"option",tabIndex:!0===c?void 0:-1,"aria-disabled":!0===c||void 0,"aria-selected":A,disabled:void 0,onClick:S,onFocus:h,onPointerEnter:a,onMouseEnter:a,onPointerMove:x,onMouseMove:x,onPointerLeave:D,onMouseLeave:D},theirProps:u,slot:Q,defaultTag:"li",name:"Listbox.Option"})})),Mt=Object.assign(Ne,{Button:Qe,Label:ze,Options:Je,Option:Ze});var react_icons_esm=__webpack_require__("../../node_modules/.pnpm/@radix-ui+react-icons@1.1.1_react@18.2.0/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js"),theme=__webpack_require__("./src/theme/index.ts"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const StyledRoot=(0,theme.zo)("div",{position:"relative",marginTop:"$space$2"}),StyledButton=(0,theme.zo)(Mt.Button,{position:"relative",all:"reset",border:"1px solid $yellowBrand",backgroundColor:"$loContrast",padding:"$space$4",width:"100%",borderRadius:"$radii$md",display:"flex",justifyContent:"flex-start",fontSize:theme.rS.fontSizes.base.value,variants:{gold:{true:{borderRadius:"$radii$md",border:"3px solid transparent",backgroundOrigin:"border-box",backgroundClip:"padding-box, border-box",backgroundImage:"linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)"}}}}),StyledOptions=(0,theme.zo)(Mt.Options,{position:"absolute",width:"100%",paddingLeft:0,marginTop:"$space$4",listStyle:"none",borderRadius:"$radii$md",border:"1px solid $yellowBrand",borderTop:"none",backgroundColor:"$loContrast",padding:"$space$4",maxHeight:"$sizes$5xl",zIndex:"$zIndices$dropdown",fontSize:theme.rS.fontSizes.base.value,variants:{gold:{true:{borderRadius:"$radii$md",border:"3px solid transparent",backgroundOrigin:"border-box",backgroundClip:"padding-box, border-box",backgroundImage:"linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)"}}}}),StyledOption=(0,theme.zo)(Mt.Option,{cursor:"pointer","&::disabled":{backgroundColor:"$hiContrast"},"&::hover":{backgroundColor:"$yellowBrand",color:"$loContrast"}}),StyledItem=(0,theme.zo)("div",{py:"$space$2",px:"$space$4",variants:{active:{true:{backgroundColor:"$yellowBrand",color:"$loContrast"}},disabled:{true:{textDecoration:"line-through",cursor:"auto"}}}}),StyledTitle=(0,theme.zo)("span",{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block",paddingRight:"$space$10"}),StyledIcon=(0,theme.zo)("span",{position:"absolute",top:0,bottom:0,right:0,display:"flex",alignItems:"center",paddingRight:"$space$4"}),Select=({options,onChange,selected,isDisabled,error,...props})=>(0,jsx_runtime.jsx)(Mt,{value:selected,onChange,disabled:isDisabled,...props,children:({open})=>(0,jsx_runtime.jsxs)(StyledRoot,{children:[(0,jsx_runtime.jsxs)(StyledButton,{gold:!0,error,children:[(0,jsx_runtime.jsx)(StyledTitle,{children:selected.name}),(0,jsx_runtime.jsx)(StyledIcon,{children:open?(0,jsx_runtime.jsx)(react_icons_esm.g8U,{}):(0,jsx_runtime.jsx)(react_icons_esm.v4q,{})})]}),(0,jsx_runtime.jsx)(StyledOptions,{gold:!0,error,children:options.map((option=>(0,jsx_runtime.jsx)(StyledOption,{value:option,disabled:option.unavailable,children:({active,selected})=>(0,jsx_runtime.jsx)(StyledItem,{active,disabled:option.unavailable,children:option.name})},option.value)))})]})});Select.displayName="Select";try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"SelectOption[]"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(option: SelectOption) => void"}},selected:{defaultValue:null,description:"",name:"selected",required:!0,type:{name:"SelectOption"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},isDisabled:{defaultValue:null,description:"",name:"isDisabled",required:!1,type:{name:"boolean"}},placeholder:{defaultValue:null,description:"",name:"placeholder",required:!1,type:{name:"string"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Select/Select.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/Select/Select.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}const OPTIONS=[{value:1,name:"Dungeon and Dragons"},{value:2,name:"Pathfinder"},{value:3,name:"Star Wars FFG"},{value:4,name:"Hero System"},{value:5,name:"Shadowrun"}],Select_stories={title:"MGUI/Form/Select",component:Select},Primary={args:{},render:args=>{const[option,setSelectedOption]=react.useState(OPTIONS[0]);return(0,jsx_runtime.jsx)("div",{style:{maxWidth:"300px"},children:(0,jsx_runtime.jsx)(Select,{options:OPTIONS,onChange:setSelectedOption,selected:option})})}};Primary.parameters={...Primary.parameters,storySource:{source:'{\n  args: {},\n  render: args => {\n    const [option, setSelectedOption] = React.useState(OPTIONS[0]);\n    return <div style={{\n      maxWidth: "300px"\n    }}>\r\n        <Select options={OPTIONS} onChange={setSelectedOption} selected={option} />\r\n      </div>;\n  }\n}',...Primary.parameters?.storySource}};const __namedExportsOrder=["Primary"]},"./src/theme/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{zo:()=>styled,rS:()=>theme});var colors=__webpack_require__("../../node_modules/.pnpm/@radix-ui+colors@0.1.8/node_modules/@radix-ui/colors/index.mjs"),dist=__webpack_require__("../../node_modules/.pnpm/@stitches+react@1.2.8_react@18.2.0/node_modules/@stitches/react/dist/index.mjs");const font_fonts={body:"system-ui, sans-serif",heading:"Georgia, serif",mono:"Menlo, monospace",sans:'"Alegreya Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',serif:'"Staatliches", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',oldfenris:"OldFenris",alegreyasans:"'Alegreya Sans'",trejan:"trajan-sans-pro, sans-serif",cinzel:'"Cinzel", serif'},font_fontSizes={xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem","6xl":"3.75rem","7xl":"4.5rem","8xl":"6rem","9xl":"8rem"},font_fontWeights={hairline:100,thin:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900},font_lineHeights={normal:"normal",none:1,shorter:1.25,short:1.375,base:1.5,tall:1.625,taller:"2",3:".75rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem"},font_letterSpacings={tighter:"-0.05em",tight:"-0.025em",normal:"0",wide:"0.025em",wider:"0.05em",widest:"0.1em"},spacing={space:{px:"1px",1:"0.125rem",2:"0.25rem",3:"0.375rem",4:"0.5rem",5:"0.625rem",6:"0.75rem",7:"0.875rem",8:"1rem",9:"1.25rem",10:"1.5rem",11:"1.75rem",12:"2rem",13:"2.25rem",14:"2.5rem",15:"3rem",16:"3.5rem",17:"4rem",18:"5rem",19:"6rem",20:"7rem",21:"8rem",22:"9rem",23:"10rem",24:"11rem",25:"12rem",26:"13rem",27:"14rem",28:"15rem",29:"16rem",30:"18rem",31:"20rem",32:"24rem"}},{config,css,styled,createTheme,theme}=(0,dist.Th)({theme:{colors:{yellowBrand:"#FFD166",orangeBrand:"#9f5e25",whiteBrand:"#fcfcfc",grayBrand:"#273435",lightBlackBrand:"hsl(0, 0%, 9%)",...colors.MA,...colors.iN,...colors.Q6,...colors.ek,...colors.er,...colors.ae,...colors.F9,...colors.U2,gold1:"#FFD166",gold2:"#FFD166",hiContrast:"$slate12",loContrast:"white"},space:spacing.space,fontSizes:{...font_fontSizes},fonts:{untitled:"Untitled Sans, apple-system, sans-serif",mono:"Söhne Mono, menlo, monospace",sans:font_fonts.sans,serif:font_fonts.serif,oldfenris:font_fonts.oldfenris,alegreyasans:font_fonts.alegreyasans,trejan:font_fonts.cinzel,cinzel:font_fonts.cinzel},fontWeights:{...font_fontWeights},lineHeights:{...font_lineHeights},letterSpacings:{...font_letterSpacings},sizes:{...spacing.space,max:"max-content",min:"min-content",full:"100%","3xs":"14rem","2xs":"16rem",xs:"20rem",sm:"24rem",base:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem","8xl":"90rem"},borderWidths:{0:0,1:"1px",2:"2px",4:"4px",8:"8px"},borderStyles:{solid:"solid",dashed:"dashed",dotted:"dotted",double:"double",hidden:"hidden",none:"none"},radii:{none:"0",sm:"0.125rem",base:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"},shadows:{xs:"0 0 0 1px rgba(0, 0, 0, 0.05)",sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",base:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)","2xl":"0 25px 50px -12px rgba(0, 0, 0, 0.25)",outline:"0 0 0 3px rgba(66, 153, 225, 0.6)",inner:"inset 0 2px 4px 0 rgba(0,0,0,0.06)",none:"none","dark-lg":"rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"},zIndices:{hide:-1,auto:"auto",base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},utils:{p:value=>({padding:value}),pt:value=>({paddingTop:value}),pr:value=>({paddingRight:value}),pb:value=>({paddingBottom:value}),pl:value=>({paddingLeft:value}),px:value=>({paddingLeft:value,paddingRight:value}),py:value=>({paddingTop:value,paddingBottom:value}),m:value=>({margin:value}),mt:value=>({marginTop:value}),mr:value=>({marginRight:value}),mb:value=>({marginBottom:value}),ml:value=>({marginLeft:value}),mx:value=>({marginLeft:value,marginRight:value}),my:value=>({marginTop:value,marginBottom:value}),ta:value=>({textAlign:value}),fd:value=>({flexDirection:value}),fw:value=>({flexWrap:value}),ai:value=>({alignItems:value}),ac:value=>({alignContent:value}),jc:value=>({justifyContent:value}),as:value=>({alignSelf:value}),fg:value=>({flexGrow:value}),fs:value=>({flexShrink:value}),fb:value=>({flexBasis:value}),bc:value=>({backgroundColor:value}),br:value=>({borderRadius:value}),btrr:value=>({borderTopRightRadius:value}),bbrr:value=>({borderBottomRightRadius:value}),bblr:value=>({borderBottomLeftRadius:value}),btlr:value=>({borderTopLeftRadius:value}),bs:value=>({boxShadow:value}),lh:value=>({lineHeight:value}),ox:value=>({overflowX:value}),oy:value=>({overflowY:value}),pe:value=>({pointerEvents:value}),us:value=>({WebkitUserSelect:value,userSelect:value}),userSelect:value=>({WebkitUserSelect:value,userSelect:value}),size:value=>({width:value,height:value}),appearance:value=>({WebkitAppearance:value,appearance:value}),backgroundClip:value=>({WebkitBackgroundClip:value,backgroundClip:value})},media:{xs:"@media (min-width: 0px)",sm:"@media (min-width: 640px)",md:"@media (min-width: 768px)",lg:"@media (min-width: 1024px)",xl:"@media (min-width: 1280px)","2xl":"@media (min-width: 1536px)"}});createTheme({colors:{yellowBrand:"#FFD166",...colors.hU,...colors.qn,...colors.nA,...colors.u7,...colors.f3,...colors.L0}})}}]);