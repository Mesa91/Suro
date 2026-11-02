var d=function(t,e,i,s){var a=arguments.length,r=a<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,o;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)if(o=t[n])r=(a<3?o(r):a>3?o(e,i,r):o(e,i))||r;return a>3&&r&&Object.defineProperty(e,i,r),r};var j=globalThis,D=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),rt=new WeakMap;class q{constructor(t,e,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=rt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&rt.set(e,t))}return t}toString(){return this.cssText}}var nt=(t)=>new q(typeof t=="string"?t:t+"",void 0,Q),v=(t,...e)=>{let i=t.length===1?t[0]:e.reduce((s,a,r)=>s+((o)=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[r+1],t[0]);return new q(i,t,Q)},ot=(t,e)=>{if(D)t.adoptedStyleSheets=e.map((i)=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of e){let s=document.createElement("style"),a=j.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}},K=D?(t)=>t:(t)=>t instanceof CSSStyleSheet?((e)=>{let i="";for(let s of e.cssRules)i+=s.cssText;return nt(i)})(t):t;var{is:Rt,defineProperty:Tt,getOwnPropertyDescriptor:Mt,getOwnPropertyNames:Ot,getOwnPropertySymbols:zt,getPrototypeOf:Lt}=Object,F=globalThis,lt=F.trustedTypes,Nt=lt?lt.emptyScript:"",It=F.reactiveElementPolyfillSupport,M=(t,e)=>t,O={toAttribute(t,e){switch(e){case Boolean:t=t?Nt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},W=(t,e)=>!Rt(t,e),ct={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),F.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ct){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Tt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:a}=Mt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let o=s?.call(this);a?.call(this,r),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ct}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let t=Lt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let e=this.properties,i=[...Ot(e),...zt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(K(s))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t)=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t)=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ot(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t)=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t)=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:O).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:O;this._$Em=s;let o=r.fromAttribute(e,a.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(t!==void 0){let r=this.constructor;if(s===!1&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??W)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:r}=a,o=this[s];r!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,a,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((i)=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e)=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e)=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[M("elementProperties")]=new Map,w[M("finalized")]=new Map,It?.({ReactiveElement:w}),(F.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,dt=(t)=>t,V=J.trustedTypes,pt=V?V.createPolicy("lit-html",{createHTML:(t)=>t}):void 0;var E=`lit$${Math.random().toFixed(9).slice(2)}$`,ft="?"+E,Ut=`<${ft}>`,P=document,L=()=>P.createComment(""),N=(t)=>t===null||typeof t!="object"&&typeof t!="function",G=Array.isArray,Ht=(t)=>G(t)||typeof t?.[Symbol.iterator]=="function";var z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,ut=/>/g,S=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,gt=/"/g,vt=/^(?:script|style|textarea|title)$/i,X=(t)=>(e,...i)=>({_$litType$:t,strings:e,values:i}),c=X(1),Gt=X(2),Xt=X(3),R=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),bt=new WeakMap,C=P.createTreeWalker(P,129);function _t(t,e){if(!G(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(e):e}var Bt=(t,e)=>{let i=t.length-1,s=[],a,r=e===2?"<svg>":e===3?"<math>":"",o=z;for(let n=0;n<i;n++){let l=t[n],b,h,f=-1,x=0;for(;x<l.length&&(o.lastIndex=x,h=o.exec(l),h!==null);)x=o.lastIndex,o===z?h[1]==="!--"?o=ht:h[1]!==void 0?o=ut:h[2]!==void 0?(vt.test(h[2])&&(a=RegExp("</"+h[2],"g")),o=S):h[3]!==void 0&&(o=S):o===S?h[0]===">"?(o=a??z,f=-1):h[1]===void 0?f=-2:(f=o.lastIndex-h[2].length,b=h[1],o=h[3]===void 0?S:h[3]==='"'?gt:mt):o===gt||o===mt?o=S:o===ht||o===ut?o=z:(o=S,a=void 0);let A=o===S&&t[n+1].startsWith("/>")?" ":"";r+=o===z?l+Ut:f>=0?(s.push(b),l.slice(0,f)+"$lit$"+l.slice(f)+E+A):l+E+(f===-2?n:A)}return[_t(t,r+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class I{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0,o=t.length-1,n=this.parts,[l,b]=Bt(t,e);if(this.el=I.createElement(l,i),C.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=C.nextNode())!==null&&n.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith("$lit$")){let f=b[r++],x=s.getAttribute(h).split(E),A=/([.?@])?(.*)/.exec(f);n.push({type:1,index:a,name:A[2],strings:x,ctor:A[1]==="."?yt:A[1]==="?"?xt:A[1]==="@"?kt:H}),s.removeAttribute(h)}else h.startsWith(E)&&(n.push({type:6,index:a}),s.removeAttribute(h));if(vt.test(s.tagName)){let h=s.textContent.split(E),f=h.length-1;if(f>0){s.textContent=V?V.emptyScript:"";for(let x=0;x<f;x++)s.append(h[x],L()),C.nextNode(),n.push({type:2,index:++a});s.append(h[f],L())}}}else if(s.nodeType===8)if(s.data===ft)n.push({type:2,index:a});else{let h=-1;for(;(h=s.data.indexOf(E,h+1))!==-1;)n.push({type:7,index:a}),h+=E.length-1}a++}}static createElement(t,e){let i=P.createElement("template");return i.innerHTML=t,i}}function T(t,e,i=t,s){if(e===R)return e;let a=s!==void 0?i._$Co?.[s]:i._$Cl,r=N(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(t),a._$AT(t,i,s)),s!==void 0?(i._$Co??=[])[s]=a:i._$Cl=a),a!==void 0&&(e=T(t,a._$AS(t,e.values),a,s)),e}class $t{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);C.currentNode=s;let a=C.nextNode(),r=0,o=0,n=i[0];for(;n!==void 0;){if(r===n.index){let l;n.type===2?l=new U(a,a.nextSibling,this,t):n.type===1?l=new n.ctor(a,n.name,n.strings,this,t):n.type===6&&(l=new wt(a,this,t)),this._$AV.push(l),n=i[++o]}r!==n?.index&&(a=C.nextNode(),r++)}return C.currentNode=P,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),N(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=I.createElement(_t(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new $t(s,this),r=a.u(this.options);a.p(e),this.T(r),this._$AH=a}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new I(t)),e}k(t){G(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let a of t)s===e.length?e.push(i=new U(this.O(L()),this.O(L()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=dt(t).nextSibling;dt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,s){let a=this.strings,r=!1;if(a===void 0)t=T(this,t,e,0),r=!N(t)||t!==this._$AH&&t!==R,r&&(this._$AH=t);else{let o=t,n,l;for(t=a[0],n=0;n<a.length-1;n++)l=T(this,o[i+n],e,n),l===R&&(l=this._$AH[n]),r||=!N(l)||l!==this._$AH[n],l===p?t=p:t!==p&&(t+=(l??"")+a[n+1]),this._$AH[n]=l}r&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class yt extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class xt extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class kt extends H{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??p)===R)return;let i=this._$AH,s=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class wt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}}var jt=J.litHtmlPolyfillSupport;jt?.(I,U),(J.litHtmlVersions??=[]).push("3.3.2");var Et=(t,e,i)=>{let s=i?.renderBefore??e,a=s._$litPart$;if(a===void 0){let r=i?.renderBefore??null;s._$litPart$=a=new U(e.insertBefore(L(),r),r,void 0,i??{})}return a._$AI(t),a};var Z=globalThis;class g extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Et(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}}g._$litElement$=!0,g.finalized=!0,Z.litElementHydrateSupport?.({LitElement:g});var Dt=Z.litElementPolyfillSupport;Dt?.({LitElement:g});(Z.litElementVersions??=[]).push("4.2.2");var _=(t)=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var qt={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:W},Ft=(t=qt,e,i)=>{let{kind:s,metadata:a}=i,r=globalThis.litPropertyMetadata.get(a);if(r===void 0&&globalThis.litPropertyMetadata.set(a,r=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),s==="accessor"){let{name:o}=i;return{set(n){let l=e.get.call(this);e.set.call(this,n),this.requestUpdate(o,l,t,!0,n)},init(n){return n!==void 0&&this.C(o,void 0,t,n),n}}}if(s==="setter"){let{name:o}=i;return function(n){let l=this[o];e.call(this,n),this.requestUpdate(o,l,t,!0,n)}}throw Error("Unsupported decorator location: "+s)};function m(t){return(e,i)=>typeof i=="object"?Ft(t,e,i):((s,a,r)=>{let o=a.hasOwnProperty(r);return a.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(a,r):void 0})(t,e,i)}function u(t){return m({...t,state:!0,attribute:!1})}var B=[{key:"name",label:"Nome del vino",kind:"text"},{key:"producer",label:"Produttore",kind:"text"},{key:"vintage",label:"Annata",kind:"year"},{key:"region",label:"Regione / denominazione",kind:"text"},{key:"country",label:"Paese",kind:"text"},{key:"grape",label:"Vitigno",kind:"text"},{key:"drink_from",label:"Da bere dal",kind:"year"},{key:"drink_until",label:"Da bere entro il",kind:"year"},{key:"price",label:"Prezzo (€)",kind:"number"},{key:"notes",label:"Note",kind:"area"}];function k(t){return`${t.name||"Vino"}${t.vintage?` ${t.vintage}`:""}`}function St(t,e){let i=e.find((s)=>s.id===t.rack_id);if(!i||t.row==null||t.col==null)return"Da sistemare";return`${i.name} · fila ${t.row+1}, posto ${t.col+1}`}function Ct(t){if(t.drink_from&&t.drink_until)return`${t.drink_from}–${t.drink_until}`;if(t.drink_until)return`entro il ${t.drink_until}`;if(t.drink_from)return`dal ${t.drink_from}`;return""}function At(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}function Pt(t,e){if(!e)return!0;let i=At([t.name,t.producer,t.vintage,t.region,t.country,t.grape,t.notes,t.code].filter(Boolean).join(" "));return At(e).split(/\s+/).every((s)=>i.includes(s))}var y=v`
  :host {
    --tb-accent: #8e2437;
  }
  .btn {
    border: 1px solid var(--divider-color);
    background: var(--card-background-color, #222);
    color: var(--primary-text-color);
    border-radius: 18px;
    padding: 7px 14px;
    font: inherit;
    font-size: 0.9em;
    cursor: pointer;
    white-space: nowrap;
  }
  .btn:hover {
    filter: brightness(1.15);
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .btn.primary {
    background: var(--tb-accent);
    border-color: var(--tb-accent);
    color: #fff;
  }
  .btn.danger {
    color: #e57373;
  }
  .btn.small {
    padding: 4px 10px;
    font-size: 0.8em;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--divider-color);
    background: none;
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 5px 11px;
    font: inherit;
    font-size: 0.85em;
    cursor: pointer;
  }
  .chip.active {
    background: var(--tb-accent);
    border-color: var(--tb-accent);
    color: #fff;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    flex: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  }

  /* dialogs */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 12px;
  }
  .dialog {
    background: var(--card-background-color, #1e1e1e);
    color: var(--primary-text-color);
    border-radius: 16px;
    width: min(560px, 100%);
    max-height: 92vh;
    overflow: auto;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  }
  .dialog-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 18px 6px;
    gap: 10px;
  }
  .dialog-title {
    font-size: 1.15em;
    font-weight: 600;
  }
  .dialog-body {
    padding: 8px 18px 14px;
  }
  .dialog-foot {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 8px 18px 18px;
  }
  .close {
    background: none;
    border: none;
    color: var(--secondary-text-color);
    font-size: 1.4em;
    cursor: pointer;
  }
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 12px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }
  .field.wide {
    grid-column: 1 / -1;
  }
  .field input,
  .field textarea,
  .field select {
    font: inherit;
    font-size: 1.05em;
    color: var(--primary-text-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 8px 10px;
  }
  .types {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .note {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }
  @media (max-width: 480px) {
    .form {
      grid-template-columns: 1fr;
    }
  }
`;function tt(t,e,i){return c`
    <div class="form">
      <label class="field wide">
        Tipo
        <div class="types">
          ${Object.entries(t.types).map(([s,a])=>c`<button type="button" class="chip ${e.type===s?"active":""}"
              @click=${()=>i("type",s)}><span class="dot" style="background:${a.color}"></span>${a.label}</button>`)}
        </div>
      </label>
      ${B.map((s)=>{let a=s.key==="name"||s.kind==="area",r=e[s.key]??"",o=(n)=>i(s.key,n.target.value);return c`<label class="field ${a?"wide":""}">
          ${s.label}
          ${s.kind==="area"?c`<textarea rows="2" .value=${r} @input=${o}></textarea>`:c`<input
                type=${s.kind==="text"?"text":"number"}
                inputmode=${s.kind==="text"?"text":"numeric"}
                step=${s.kind==="number"?"0.01":"1"}
                .value=${String(r)}
                @input=${o}
              />`}
        </label>`})}
    </div>
  `}class Y extends g{constructor(){super(...arguments);this.rackId=null;this.row=null;this.col=null;this._values={type:"red"};this._quantity=1;this._busy=!1}static styles=y;_close(){this.dispatchEvent(new CustomEvent("close"))}async _save(){if(!String(this._values.name||"").trim()){this.card.toast("Scrivi almeno il nome del vino");return}this._busy=!0;try{let e=(await this.card.ws({type:"taponbon/add_bottles",wine:this._values,quantity:this._quantity,rack_id:this.rackId,row:this.row,col:this.col})).bottles,i=e.filter((s)=>!s.rack_id).length;this.card.toast(i?`Aggiunte ${e.length} bottiglie, ${i} da sistemare: scaffale pieno`:e.length>1?`Aggiunte ${e.length} bottiglie`:"Bottiglia aggiunta"),this._close()}finally{this._busy=!1}}render(){let t=this.data.racks.find((i)=>i.id===this.rackId),e=t&&this.row!=null&&this.col!=null?`${t.name}, fila ${this.row+1}, posto ${this.col+1}`:"nel primo posto libero";return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(i)=>i.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Aggiungi vino</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${tt(this.data,this._values,(i,s)=>this._values={...this._values,[i]:s})}
            <div class="form" style="margin-top:10px">
              <label class="field">
                Quante bottiglie
                <input type="number" min="1" max="100" .value=${String(this._quantity)}
                  @input=${(i)=>this._quantity=Math.max(1,Math.min(100,Number(i.target.value)||1))} />
              </label>
              <div class="field">Dove<span style="color:var(--primary-text-color)">${e}${this._quantity>1?" e i successivi":""}</span></div>
            </div>
            ${this.data.settings.auto_labels?c`<p class="note">Per ogni bottiglia verrà richiesta la stampa dell'etichetta QR.</p>`:p}
          </div>
          <div class="dialog-foot">
            <button class="btn" @click=${this._close}>Annulla</button>
            <button class="btn primary" ?disabled=${this._busy} @click=${this._save}>
              ${this._busy?"Salvo…":`Aggiungi ${this._quantity>1?`${this._quantity} bottiglie`:"bottiglia"}`}
            </button>
          </div>
        </div>
      </div>
    `}}d([m({attribute:!1})],Y.prototype,"card",void 0),d([m({attribute:!1})],Y.prototype,"data",void 0),d([m({attribute:!1})],Y.prototype,"rackId",void 0),d([m({attribute:!1})],Y.prototype,"row",void 0),d([m({attribute:!1})],Y.prototype,"col",void 0),d([u()],Y.prototype,"_values",void 0),d([u()],Y.prototype,"_quantity",void 0),d([u()],Y.prototype,"_busy",void 0),Y=d([_("tb-add-dialog")],Y);class et extends g{constructor(){super(...arguments);this._label=null;this._editing=!1;this._values={};this._sameWine=!0;this._otherReason=!1;this._busy=!1}willUpdate(t){if(t.has("bottle")){if(t.get("bottle")?.id!==this.bottle.id)this._label=null,this._editing=!1,this._loadLabel()}}async _loadLabel(){let t=this.bottle.id;try{let e=await this.card.hass.callWS({type:"taponbon/get_label",bottle_id:t});if(this.bottle.id===t)this._label=e}catch{}}_close(){this.dispatchEvent(new CustomEvent("close"))}_sameWineCount(){let t=(e)=>`${(e.name||"").trim().toLowerCase()}|${(e.producer||"").trim().toLowerCase()}|${e.vintage||""}`;return this.data.bottles.filter((e)=>t(e)===t(this.bottle)).length}async _remove(t){this._busy=!0;try{await this.card.ws({type:"taponbon/remove_bottle",bottle_id:this.bottle.id,reason:t}),this.card.toast(`${k(this.bottle)}: ${this.data.reasons[t]?.toLowerCase()||"tolta"}. La trovi nello storico.`),this._close()}finally{this._busy=!1}}async _saveEdit(){this._busy=!0;try{let t=await this.card.ws({type:"taponbon/update_bottle",bottle_id:this.bottle.id,changes:this._values,same_wine:this._sameWine});this.card.toast(t.updated>1?`Aggiornate ${t.updated} bottiglie`:"Bottiglia aggiornata"),this._editing=!1,this._label=null,this._loadLabel()}finally{this._busy=!1}}async _printOnPrinter(){await this.card.ws({type:"taponbon/request_label",bottle_id:this.bottle.id}),this.card.toast("Etichetta inviata alla stampante")}_printInBrowser(){if(!this._label)return;let t=window.open("","_blank","width=480,height=360");if(!t){this.card.toast("Il browser ha bloccato la finestra di stampa");return}t.document.write(`<!doctype html><html><head><title>Etichetta ${this._label.code}</title>
      <style>@page{size:50mm 30mm;margin:0}html,body{margin:0}img{width:50mm;height:30mm;display:block}</style></head>
      <body><img src="data:image/png;base64,${this._label.png_base64}"
      onload="setTimeout(function(){window.print();window.close();},150)"></body></html>`),t.document.close()}render(){let t=this.bottle,e=this.data.types[t.type];return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(i)=>i.stopPropagation()}>
          <div class="dialog-head">
            <div>
              <div class="dialog-title">${k(t)}</div>
              <div class="note">${t.producer||""}</div>
            </div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this._editing?this._renderEdit():this._renderView(t,e)}
          </div>
          ${this._editing?this._renderEditFoot():this._renderViewFoot()}
        </div>
      </div>
    `}_renderView(t,e){let i=Ct(t);return c`
      <div class="badges">
        <span class="badge" style="background:${e?.color}">${e?.label||t.type}</span>
        ${t.alert==="closing"?c`<span class="badge warn">Da bere presto</span>`:p}
        ${t.alert==="past"?c`<span class="badge bad">Oltre la finestra</span>`:p}
        <span class="where">📍 ${St(t,this.data.racks)}</span>
      </div>
      <dl class="facts">
        ${B.filter((s)=>!["name","producer","vintage","drink_from","drink_until"].includes(s.key)).map((s)=>{let a=t[s.key];if(a==null||a==="")return p;return c`<dt>${s.label}</dt><dd>${s.key==="price"?`${Number(a).toFixed(2)} €`:a}</dd>`})}
        ${i?c`<dt>Finestra di beva</dt><dd>${i}</dd>`:p}
      </dl>
      <div class="label-box">
        ${this._label?c`<img class="label" alt="Etichetta QR" src="data:image/png;base64,${this._label.png_base64}" />`:c`<div class="note">Preparo l'etichetta…</div>`}
        <div class="note">Inquadra il QR con l'app Home Assistant quando prendi la bottiglia: verrà tolta dalla cantina.</div>
        <div class="row">
          <button class="btn small" @click=${this._printOnPrinter}>🖨️ Stampante etichette</button>
          <button class="btn small" ?disabled=${!this._label} @click=${this._printInBrowser}>Stampa dal browser</button>
        </div>
      </div>
      ${this._otherReason?c`<div class="reasons">
            ${Object.entries(this.data.reasons).filter(([s])=>s!=="drank").map(([s,a])=>c`<button class="btn small ${s==="deleted"?"danger":""}" ?disabled=${this._busy}
                @click=${()=>this._remove(s)}>${a}</button>`)}
          </div>`:p}
    `}_renderViewFoot(){return c`<div class="dialog-foot">
      <button class="btn" @click=${()=>this.dispatchEvent(new CustomEvent("move",{detail:{bottle:this.bottle}}))}>↔ Sposta</button>
      <button class="btn" @click=${()=>{this._values=Object.fromEntries(["type",...B.map((t)=>t.key)].map((t)=>[t,this.bottle[t]??""])),this._sameWine=!0,this._editing=!0}}>✏️ Modifica</button>
      <button class="btn" @click=${()=>this._otherReason=!this._otherReason}>Altro…</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${()=>this._remove("drank")}>🍷 Bevuta</button>
    </div>`}_renderEdit(){let t=this._sameWineCount();return c`
      ${tt(this.data,this._values,(e,i)=>this._values={...this._values,[e]:i})}
      ${t>1?c`<label class="check"><input type="checkbox" .checked=${this._sameWine}
            @change=${(e)=>this._sameWine=e.target.checked} />
            Applica a tutte le ${t} bottiglie di questo vino</label>`:p}
    `}_renderEditFoot(){return c`<div class="dialog-foot">
      <button class="btn" @click=${()=>this._editing=!1}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${this._saveEdit}>Salva</button>
    </div>`}static styles=[y,v`
      .badges {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 10px;
      }
      .badge {
        border-radius: 10px;
        padding: 2px 9px;
        font-size: 0.8em;
        color: #111;
        font-weight: 600;
      }
      .badge.warn {
        background: #ffa000;
      }
      .badge.bad {
        background: #e53935;
        color: #fff;
      }
      .where {
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }
      .facts {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 4px 12px;
        margin: 0 0 12px;
        font-size: 0.92em;
      }
      dt {
        color: var(--secondary-text-color);
      }
      dd {
        margin: 0;
        white-space: pre-wrap;
      }
      .label-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border-radius: 12px;
        background: rgba(127, 127, 127, 0.08);
        text-align: center;
      }
      .label {
        width: 100%;
        max-width: 300px;
        background: #fff;
        border-radius: 4px;
        image-rendering: pixelated;
      }
      .row,
      .reasons {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .reasons {
        margin-top: 12px;
      }
      .check {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-top: 12px;
        font-size: 0.9em;
      }
    `]}d([m({attribute:!1})],et.prototype,"card",void 0),d([m({attribute:!1})],et.prototype,"data",void 0),d([m({attribute:!1})],et.prototype,"bottle",void 0),d([u()],et.prototype,"_label",void 0),d([u()],et.prototype,"_editing",void 0),d([u()],et.prototype,"_values",void 0),d([u()],et.prototype,"_sameWine",void 0),d([u()],et.prototype,"_otherReason",void 0),d([u()],et.prototype,"_busy",void 0),et=d([_("tb-bottle-dialog")],et);class it extends g{constructor(){super(...arguments);this._drafts={}}_close(){this.dispatchEvent(new CustomEvent("close"))}_draft(t){return{...t,...this._drafts[t.id]}}_set(t,e,i){this._drafts={...this._drafts,[t]:{...this._drafts[t],[e]:i}}}_count(t){return this.data.bottles.filter((e)=>e.rack_id===t).length}async _save(t){let e=this._draft(t),i=await this.card.ws({type:"taponbon/save_rack",rack:e}),s={...this._drafts};delete s[t.id],this._drafts=s,this.card.toast(i.displaced?`Salvato. ${i.displaced} bottiglie sono finite in "Da sistemare".`:"Scaffale salvato")}async _delete(t){let e=this._count(t.id);if(!confirm(`Eliminare "${t.name}"?${e?` Le sue ${e} bottiglie restano in cantina, in "Da sistemare".`:""}`))return;await this.card.ws({type:"taponbon/delete_rack",rack_id:t.id}),this.card.toast("Scaffale eliminato")}async _add(){await this.card.ws({type:"taponbon/save_rack",rack:{name:`Scaffale ${this.data.racks.length+1}`,rows:7,cols:10}})}async _setting(t,e){await this.card.ws({type:"taponbon/update_settings",[t]:e})}render(){let t=this.data.settings;return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(e)=>e.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Scaffali e impostazioni</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this.data.racks.map((e)=>{let i=this._draft(e),s=!!this._drafts[e.id];return c`<div class="rack">
                <label class="field name">Nome
                  <input .value=${i.name} @input=${(a)=>this._set(e.id,"name",a.target.value)} />
                </label>
                <label class="field">File
                  <input type="number" min="1" max="30" .value=${String(i.rows)}
                    @input=${(a)=>this._set(e.id,"rows",Number(a.target.value))} />
                </label>
                <label class="field">Posti per fila
                  <input type="number" min="1" max="30" .value=${String(i.cols)}
                    @input=${(a)=>this._set(e.id,"cols",Number(a.target.value))} />
                </label>
                <div class="rack-foot">
                  <span class="note">${this._count(e.id)} bottiglie · ${i.rows*i.cols} posti</span>
                  <span>
                    <button class="btn small danger" @click=${()=>this._delete(e)}>Elimina</button>
                    <button class="btn small primary" ?disabled=${!s} @click=${()=>this._save(e)}>Salva</button>
                  </span>
                </div>
              </div>`})}
            <button class="btn" @click=${this._add}>＋ Nuovo scaffale</button>

            <h3>Impostazioni</h3>
            <label class="check">
              <input type="checkbox" .checked=${t.auto_labels}
                @change=${(e)=>this._setting("auto_labels",e.target.checked)} />
              Stampa l'etichetta QR quando aggiungo una bottiglia
            </label>
            <div class="field">Avvisami prima che la finestra di beva si chiuda
              <div class="types">
                ${[[90,"3 mesi"],[180,"6 mesi"],[365,"1 anno"]].map(([e,i])=>c`<button class="chip ${t.alert_days===e?"active":""}"
                    @click=${()=>this._setting("alert_days",e)}>${i}</button>`)}
              </div>
            </div>
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}static styles=[y,v`
      .rack {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 8px;
        padding: 12px;
        border-radius: 12px;
        background: rgba(127, 127, 127, 0.08);
        margin-bottom: 10px;
      }
      .rack-foot {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      h3 {
        margin: 20px 0 8px;
        font-size: 1em;
      }
      .check {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 12px;
      }
      @media (max-width: 480px) {
        .rack {
          grid-template-columns: 1fr 1fr;
        }
        .name {
          grid-column: 1 / -1;
        }
      }
    `]}d([m({attribute:!1})],it.prototype,"card",void 0),d([m({attribute:!1})],it.prototype,"data",void 0),d([u()],it.prototype,"_drafts",void 0),it=d([_("tb-racks-dialog")],it);class st extends g{constructor(){super(...arguments);this._items=null}connectedCallback(){super.connectedCallback(),this._load()}async _load(){let t=await this.card.ws({type:"taponbon/get_history"});this._items=t.history}_close(){this.dispatchEvent(new CustomEvent("close"))}async _restore(t){let e=await this.card.ws({type:"taponbon/restore",history_id:t.history_id});this.card.toast(e.bottle.rack_id?"Rimessa al suo posto":'Rimessa in cantina, in "Da sistemare"'),this._load()}render(){return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(t)=>t.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Storico</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this._items===null?c`<div class="note">Carico…</div>`:!this._items.length?c`<div class="note">Ancora nessuna bottiglia tolta dalla cantina.</div>`:this._items.map((t)=>c`<div class="item">
                    <span class="dot" style="background:${this.data.types[t.type]?.color}"></span>
                    <div class="text">
                      <div>${k(t)}</div>
                      <div class="note">${this.data.reasons[t.reason]||t.reason} · ${new Date(t.removed_at).toLocaleDateString("it-IT")}
                        ${t.producer?c` · ${t.producer}`:p}</div>
                    </div>
                    <button class="btn small" @click=${()=>this._restore(t)}>Rimetti</button>
                  </div>`)}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}static styles=[y,v`
      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
      }
      .text {
        flex: 1;
      }
    `]}d([m({attribute:!1})],st.prototype,"card",void 0),d([m({attribute:!1})],st.prototype,"data",void 0),d([u()],st.prototype,"_items",void 0),st=d([_("tb-history-dialog")],st);class at extends g{constructor(){super(...arguments);this._config={type:"custom:taponbon-card"};this._data=null;this._error="";this._typeFilter="";this._query="";this._dialog=null;this._moving=null;this._toast="";this._subscribing=!1;this._startMove=(t)=>{this._moving=t.detail.bottle,this._dialog=null}}setConfig(t){this._config={...t}}static getStubConfig(){return{type:"custom:taponbon-card"}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}connectedCallback(){if(super.connectedCallback(),this.hass)this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0}updated(t){if(t.has("hass")&&this.hass&&!this._unsub&&!this._subscribing)this._subscribe()}async _subscribe(){if(this._unsub||this._subscribing||!this.hass?.connection)return;this._subscribing=!0;try{this._unsub=await this.hass.connection.subscribeMessage((t)=>{this._data=t,this._error=""},{type:"taponbon/subscribe"})}catch(t){this._error=t?.code==="unknown_command"?"L'integrazione TaponBon non è installata: aggiungila da Impostazioni → Dispositivi e servizi.":`Impossibile caricare la cantina: ${t?.message||t}`}finally{this._subscribing=!1}}async ws(t){try{return await this.hass.callWS(t)}catch(e){throw this.toast(e?.message||"Operazione non riuscita"),e}}toast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",3500)}_onCell(t,e,i,s){if(this._moving){let a=this._moving;if(this._moving=null,s?.id===a.id)return;this.ws({type:"taponbon/move_bottle",bottle_id:a.id,rack_id:t.id,row:e,col:i}).then(()=>this.toast(s?"Bottiglie scambiate di posto":"Bottiglia spostata"));return}this._dialog=s?{kind:"bottle",bottleId:s.id}:{kind:"add",rackId:t.id,row:e,col:i}}render(){let t=this._data;return c`
      <ha-card>
        ${this._error?c`<div class="empty">${this._error}</div>`:!t?c`<div class="empty">Carico la cantina…</div>`:this._renderBody(t)}
        ${this._toast?c`<div class="toast">${this._toast}</div>`:p}
      </ha-card>
      ${t?this._renderDialog(t):p}
    `}_renderBody(t){let e=t.bottles.length,i=t.racks.reduce((l,b)=>l+b.rows*b.cols,0),s=t.bottles.filter((l)=>l.alert==="closing").length,a=t.bottles.filter((l)=>l.alert==="past").length,r=t.bottles.filter((l)=>!l.rack_id),o=Object.fromEntries(Object.keys(t.types).map((l)=>[l,t.bottles.filter((b)=>b.type===l).length])),n=Math.max(1,Math.min(6,Math.round(Number(this._config.columns))||0));return c`
      <div class="header">
        <div class="title">
          <span class="logo">🍷</span>
          <div>
            <div class="name">${this._config.title||"TaponBon"}</div>
            <div class="sub">${e} bottiglie · ${i-t.racks.reduce((l,b)=>l+this._inRack(t,b).length,0)} posti liberi</div>
          </div>
        </div>
        <div class="actions">
          <button class="btn primary" @click=${()=>this._dialog={kind:"add",rackId:null,row:null,col:null}}>
            ＋ Aggiungi
          </button>
          <button class="btn" title="Storico" @click=${()=>this._dialog={kind:"history"}}>🕓 Storico</button>
          <button class="btn" title="Scaffali e impostazioni" @click=${()=>this._dialog={kind:"racks"}}>⚙︎</button>
        </div>
      </div>

      ${s||a?c`<div class="banner">
            ${s?c`<span>🍷 <b>${s}</b> da bere presto</span>`:p}
            ${a?c`<span>⚠️ <b>${a}</b> oltre la finestra di beva</span>`:p}
            <span class="hint">sono evidenziate sullo scaffale</span>
          </div>`:p}

      ${this._moving?c`<div class="banner moving">
            Tocca la nuova posizione per <b>${k(this._moving)}</b>
            <button class="btn small" @click=${()=>this._moving=null}>Annulla</button>
          </div>`:p}

      <div class="filters">
        <button class="chip ${this._typeFilter?"":"active"}" @click=${()=>this._typeFilter=""}>Tutti ${e}</button>
        ${Object.entries(t.types).map(([l,b])=>c`<button
            class="chip ${this._typeFilter===l?"active":""}"
            @click=${()=>this._typeFilter=this._typeFilter===l?"":l}
          ><span class="dot" style="background:${b.color}"></span>${b.label} ${o[l]||0}</button>`)}
        <input class="search" type="search" placeholder="Cerca vino, produttore, annata…"
          .value=${this._query} @input=${(l)=>this._query=l.target.value} />
      </div>

      <div class="racks ${n?"fixed":""}" style=${n?`--tb-columns:${n}`:""}>
        ${t.racks.map((l)=>this._renderRack(t,l))}
      </div>

      ${r.length?c`<div class="unplaced">
            <div class="section-title">Da sistemare (${r.length})</div>
            <div class="list">
              ${r.map((l)=>c`<button class="list-item ${this._dims(l)?"dim":""}"
                  @click=${()=>this._dialog={kind:"bottle",bottleId:l.id}}>
                  <span class="dot" style="background:${t.types[l.type]?.color}"></span>${k(l)}
                </button>`)}
            </div>
          </div>`:p}
      ${!t.racks.length?c`<div class="empty">Nessuno scaffale: creane uno da ⚙︎.</div>`:p}
    `}_inRack(t,e){return t.bottles.filter((i)=>i.rack_id===e.id&&i.row!=null&&i.col!=null)}_dims(t){return this._typeFilter&&t.type!==this._typeFilter||!Pt(t,this._query)}_renderRack(t,e){let i=this._inRack(t,e),s=new Map(i.map((r)=>[`${r.row}:${r.col}`,r])),a=[];for(let r=0;r<e.rows;r++)for(let o=0;o<e.cols;o++){let n=s.get(`${r}:${o}`),l=n?t.types[n.type]?.color||"#888":"";a.push(c`<button
          class="cell ${n?"full":"free"} ${n&&this._dims(n)?"dim":""} ${n?.alert||""} ${this._moving?.id===n?.id&&n?"moving":""}"
          style=${n?`--bottle:${l}`:""}
          title=${n?`${k(n)}${n.producer?` · ${n.producer}`:""}`:`Fila ${r+1}, posto ${o+1}: libero`}
          @click=${()=>this._onCell(e,r,o,n)}
        ></button>`)}return c`
      <div class="rack">
        <div class="rack-head"><span>${e.name}</span><span class="muted">${i.length}/${e.rows*e.cols}</span></div>
        <div class="grid" style="grid-template-columns: repeat(${e.cols}, minmax(0, 52px))">${a}</div>
      </div>
    `}_renderDialog(t){let e=this._dialog;if(!e)return p;let i=()=>this._dialog=null;switch(e.kind){case"add":return c`<tb-add-dialog .card=${this} .data=${t} .rackId=${e.rackId} .row=${e.row} .col=${e.col} @close=${i}></tb-add-dialog>`;case"bottle":{let s=t.bottles.find((a)=>a.id===e.bottleId);if(!s)return p;return c`<tb-bottle-dialog .card=${this} .data=${t} .bottle=${s} @close=${i} @move=${this._startMove}></tb-bottle-dialog>`}case"racks":return c`<tb-racks-dialog .card=${this} .data=${t} @close=${i}></tb-racks-dialog>`;case"history":return c`<tb-history-dialog .card=${this} .data=${t} @close=${i}></tb-history-dialog>`}}static styles=[y,v`
      ha-card {
        overflow: hidden;
        position: relative;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 16px 16px 8px;
        flex-wrap: wrap;
      }
      .title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .logo {
        font-size: 1.8em;
      }
      .name {
        font-size: 1.3em;
        font-weight: 600;
      }
      .sub,
      .muted {
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }
      .actions {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .banner {
        margin: 4px 16px 8px;
        padding: 8px 12px;
        border-radius: 10px;
        background: rgba(255, 152, 0, 0.12);
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        align-items: center;
        font-size: 0.9em;
      }
      .banner.moving {
        background: rgba(33, 150, 243, 0.15);
        justify-content: space-between;
      }
      .hint {
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }
      .filters {
        display: flex;
        gap: 6px;
        padding: 4px 16px 10px;
        flex-wrap: wrap;
        align-items: center;
      }
      .search {
        flex: 1 1 180px;
        min-width: 150px;
        padding: 7px 10px;
        border-radius: 18px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font: inherit;
      }
      .racks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 14px;
        padding: 4px 16px 16px;
      }
      @media (min-width: 600px) {
        .racks.fixed {
          grid-template-columns: repeat(var(--tb-columns), minmax(0, 1fr));
        }
      }
      .rack {
        border-radius: 12px;
        padding: 10px;
        background: linear-gradient(180deg, #5b3a22, #3e2716);
        box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.25);
      }
      .rack-head {
        display: flex;
        justify-content: space-between;
        color: #f3e2c7;
        font-weight: 600;
        padding: 0 2px 8px;
      }
      .rack-head .muted {
        color: #d8c2a0;
      }
      .grid {
        display: grid;
        gap: 4px;
        justify-content: center;
      }
      .cell {
        aspect-ratio: 1;
        border-radius: 50%;
        border: none;
        padding: 0;
        cursor: pointer;
        position: relative;
        transition: transform 0.1s, opacity 0.2s;
      }
      .cell.free {
        background: rgba(0, 0, 0, 0.35);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6);
      }
      .cell.free:hover {
        background: rgba(255, 255, 255, 0.15);
      }
      .cell.full {
        background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.45), var(--bottle) 45%, rgba(0, 0, 0, 0.55));
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      }
      .cell.full:hover {
        transform: scale(1.12);
      }
      .cell.dim {
        opacity: 0.18;
      }
      .cell.closing::after,
      .cell.past::after {
        content: "";
        position: absolute;
        top: -2px;
        right: -2px;
        width: 34%;
        height: 34%;
        border-radius: 50%;
        border: 1.5px solid #3e2716;
        background: #ffa000;
      }
      .cell.past::after {
        background: #e53935;
      }
      .cell.moving {
        outline: 3px solid #2196f3;
        outline-offset: 1px;
      }
      .unplaced {
        padding: 0 16px 16px;
      }
      .section-title {
        font-weight: 600;
        margin-bottom: 6px;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .list-item {
        display: flex;
        align-items: center;
        gap: 6px;
        border: 1px solid var(--divider-color);
        background: none;
        color: inherit;
        border-radius: 16px;
        padding: 5px 10px;
        cursor: pointer;
        font: inherit;
      }
      .list-item.dim {
        opacity: 0.3;
      }
      .empty {
        padding: 24px 16px;
        text-align: center;
        color: var(--secondary-text-color);
      }
      .toast {
        position: absolute;
        left: 50%;
        bottom: 14px;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.85);
        color: #fff;
        padding: 8px 14px;
        border-radius: 18px;
        font-size: 0.9em;
        z-index: 2;
      }
    `]}d([m({attribute:!1})],at.prototype,"hass",void 0),d([u()],at.prototype,"_config",void 0),d([u()],at.prototype,"_data",void 0),d([u()],at.prototype,"_error",void 0),d([u()],at.prototype,"_typeFilter",void 0),d([u()],at.prototype,"_query",void 0),d([u()],at.prototype,"_dialog",void 0),d([u()],at.prototype,"_moving",void 0),d([u()],at.prototype,"_toast",void 0),at=d([_("taponbon-card")],at);window.customCards=window.customCards||[];window.customCards.push({type:"taponbon-card",name:"TaponBon",description:"La tua cantina: scaffali, bottiglie, QR e finestre di beva",preview:!1});export{at as TaponBonCard};
