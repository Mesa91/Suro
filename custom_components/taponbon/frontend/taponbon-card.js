var d=function(t,e,s,i){var a=arguments.length,r=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,n;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)if(n=t[o])r=(a<3?n(r):a>3?n(e,s,r):n(e,s))||r;return a>3&&r&&Object.defineProperty(e,s,r),r};var j=globalThis,D=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),ot=new WeakMap;class q{constructor(t,e,s){if(this._$cssResult$=!0,s!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ot.set(e,t))}return t}toString(){return this.cssText}}var nt=(t)=>new q(typeof t=="string"?t:t+"",void 0,G),v=(t,...e)=>{let s=t.length===1?t[0]:e.reduce((i,a,r)=>i+((n)=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[r+1],t[0]);return new q(s,t,G)},lt=(t,e)=>{if(D)t.adoptedStyleSheets=e.map((s)=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(let s of e){let i=document.createElement("style"),a=j.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=s.cssText,t.appendChild(i)}},Q=D?(t)=>t:(t)=>t instanceof CSSStyleSheet?((e)=>{let s="";for(let i of e.cssRules)s+=i.cssText;return nt(s)})(t):t;var{is:Tt,defineProperty:Mt,getOwnPropertyDescriptor:zt,getOwnPropertyNames:Ot,getOwnPropertySymbols:Lt,getPrototypeOf:Nt}=Object,F=globalThis,ct=F.trustedTypes,Ht=ct?ct.emptyScript:"",It=F.reactiveElementPolyfillSupport,M=(t,e)=>t,z={toAttribute(t,e){switch(e){case Boolean:t=t?Ht:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(i){s=null}}return s}},V=(t,e)=>!Tt(t,e),dt={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),F.litPropertyMetadata??=new WeakMap;class k extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Mt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:a}=zt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let n=i?.call(this);a?.call(this,r),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let t=Nt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let e=this.properties,s=[...Ot(e),...Lt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(Q(i))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t)=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t)=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t)=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t)=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let a=(s.converter?.toAttribute!==void 0?s.converter:z).toAttribute(e,s.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let a=s.getPropertyOptions(i),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:z;this._$Em=i;let n=r.fromAttribute(e,a.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,a){if(t!==void 0){let r=this.constructor;if(i===!1&&(a=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??V)(a,e)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:a},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,a]of s){let{wrapped:r}=a,n=this[i];r!==!0||this._$AL.has(i)||n===void 0||this.C(i,void 0,a,n)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s)=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e)=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e)=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}}k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[M("elementProperties")]=new Map,k[M("finalized")]=new Map,It?.({ReactiveElement:k}),(F.reactiveElementVersions??=[]).push("2.1.2");var K=globalThis,pt=(t)=>t,W=K.trustedTypes,ht=W?W.createPolicy("lit-html",{createHTML:(t)=>t}):void 0;var E=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+E,Ut=`<${vt}>`,P=document,L=()=>P.createComment(""),N=(t)=>t===null||typeof t!="object"&&typeof t!="function",J=Array.isArray,Bt=(t)=>J(t)||typeof t?.[Symbol.iterator]=="function";var O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,gt=/>/g,S=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,mt=/"/g,_t=/^(?:script|style|textarea|title)$/i,X=(t)=>(e,...s)=>({_$litType$:t,strings:e,values:s}),c=X(1),Y=X(2),Zt=X(3),R=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ft=new WeakMap,C=P.createTreeWalker(P,129);function yt(t,e){if(!J(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(e):e}var jt=(t,e)=>{let s=t.length-1,i=[],a,r=e===2?"<svg>":e===3?"<math>":"",n=O;for(let o=0;o<s;o++){let l=t[o],m,h,f=-1,x=0;for(;x<l.length&&(n.lastIndex=x,h=n.exec(l),h!==null);)x=n.lastIndex,n===O?h[1]==="!--"?n=ut:h[1]!==void 0?n=gt:h[2]!==void 0?(_t.test(h[2])&&(a=RegExp("</"+h[2],"g")),n=S):h[3]!==void 0&&(n=S):n===S?h[0]===">"?(n=a??O,f=-1):h[1]===void 0?f=-2:(f=n.lastIndex-h[2].length,m=h[1],n=h[3]===void 0?S:h[3]==='"'?mt:bt):n===mt||n===bt?n=S:n===ut||n===gt?n=O:(n=S,a=void 0);let A=n===S&&t[o+1].startsWith("/>")?" ":"";r+=n===O?l+Ut:f>=0?(i.push(m),l.slice(0,f)+"$lit$"+l.slice(f)+E+A):l+E+(f===-2?o:A)}return[yt(t,r+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class H{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let a=0,r=0,n=t.length-1,o=this.parts,[l,m]=jt(t,e);if(this.el=H.createElement(l,s),C.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=C.nextNode())!==null&&o.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith("$lit$")){let f=m[r++],x=i.getAttribute(h).split(E),A=/([.?@])?(.*)/.exec(f);o.push({type:1,index:a,name:A[2],strings:x,ctor:A[1]==="."?xt:A[1]==="?"?wt:A[1]==="@"?kt:U}),i.removeAttribute(h)}else h.startsWith(E)&&(o.push({type:6,index:a}),i.removeAttribute(h));if(_t.test(i.tagName)){let h=i.textContent.split(E),f=h.length-1;if(f>0){i.textContent=W?W.emptyScript:"";for(let x=0;x<f;x++)i.append(h[x],L()),C.nextNode(),o.push({type:2,index:++a});i.append(h[f],L())}}}else if(i.nodeType===8)if(i.data===vt)o.push({type:2,index:a});else{let h=-1;for(;(h=i.data.indexOf(E,h+1))!==-1;)o.push({type:7,index:a}),h+=E.length-1}a++}}static createElement(t,e){let s=P.createElement("template");return s.innerHTML=t,s}}function T(t,e,s=t,i){if(e===R)return e;let a=i!==void 0?s._$Co?.[i]:s._$Cl,r=N(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(t),a._$AT(t,s,i)),i!==void 0?(s._$Co??=[])[i]=a:s._$Cl=a),a!==void 0&&(e=T(t,a._$AS(t,e.values),a,i)),e}class $t{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);C.currentNode=i;let a=C.nextNode(),r=0,n=0,o=s[0];for(;o!==void 0;){if(r===o.index){let l;o.type===2?l=new I(a,a.nextSibling,this,t):o.type===1?l=new o.ctor(a,o.name,o.strings,this,t):o.type===6&&(l=new Et(a,this,t)),this._$AV.push(l),o=s[++n]}r!==o?.index&&(a=C.nextNode(),r++)}return C.currentNode=P,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class I{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),N(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(yt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let a=new $t(i,this),r=a.u(this.options);a.p(e),this.T(r),this._$AH=a}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new H(t)),e}k(t){J(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let a of t)i===e.length?e.push(s=new I(this.O(L()),this.O(L()),this,this.options)):s=e[i],s._$AI(a),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=pt(t).nextSibling;pt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class U{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,a){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){let a=this.strings,r=!1;if(a===void 0)t=T(this,t,e,0),r=!N(t)||t!==this._$AH&&t!==R,r&&(this._$AH=t);else{let n=t,o,l;for(t=a[0],o=0;o<a.length-1;o++)l=T(this,n[s+o],e,o),l===R&&(l=this._$AH[o]),r||=!N(l)||l!==this._$AH[o],l===p?t=p:t!==p&&(t+=(l??"")+a[o+1]),this._$AH[o]=l}r&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class xt extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class wt extends U{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class kt extends U{constructor(t,e,s,i,a){super(t,e,s,i,a),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??p)===R)return;let s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Et{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}}var Dt=K.litHtmlPolyfillSupport;Dt?.(H,I),(K.litHtmlVersions??=[]).push("3.3.2");var At=(t,e,s)=>{let i=s?.renderBefore??e,a=i._$litPart$;if(a===void 0){let r=s?.renderBefore??null;i._$litPart$=a=new I(e.insertBefore(L(),r),r,void 0,s??{})}return a._$AI(t),a};var Z=globalThis;class b extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=At(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}}b._$litElement$=!0,b.finalized=!0,Z.litElementHydrateSupport?.({LitElement:b});var qt=Z.litElementPolyfillSupport;qt?.({LitElement:b});(Z.litElementVersions??=[]).push("4.2.2");var _=(t)=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Ft={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:V},Vt=(t=Ft,e,s)=>{let{kind:i,metadata:a}=s,r=globalThis.litPropertyMetadata.get(a);if(r===void 0&&globalThis.litPropertyMetadata.set(a,r=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),i==="accessor"){let{name:n}=s;return{set(o){let l=e.get.call(this);e.set.call(this,o),this.requestUpdate(n,l,t,!0,o)},init(o){return o!==void 0&&this.C(n,void 0,t,o),o}}}if(i==="setter"){let{name:n}=s;return function(o){let l=this[n];e.call(this,o),this.requestUpdate(n,l,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function g(t){return(e,s)=>typeof s=="object"?Vt(t,e,s):((i,a,r)=>{let n=a.hasOwnProperty(r);return a.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(a,r):void 0})(t,e,s)}function u(t){return g({...t,state:!0,attribute:!1})}var B=[{key:"name",label:"Nome del vino",kind:"text"},{key:"producer",label:"Produttore",kind:"text"},{key:"vintage",label:"Annata",kind:"year"},{key:"region",label:"Regione / denominazione",kind:"text"},{key:"country",label:"Paese",kind:"text"},{key:"grape",label:"Vitigno",kind:"text"},{key:"drink_from",label:"Da bere dal",kind:"year"},{key:"drink_until",label:"Da bere entro il",kind:"year"},{key:"price",label:"Prezzo (€)",kind:"number"},{key:"notes",label:"Note",kind:"area"}];function w(t){return`${t.name||"Vino"}${t.vintage?` ${t.vintage}`:""}`}function Ct(t,e){let s=e.find((i)=>i.id===t.rack_id);if(!s||t.row==null||t.col==null)return"Da sistemare";return`${s.name} · fila ${t.row+1}, posto ${t.col+1}`}function Pt(t){if(t.drink_from&&t.drink_until)return`${t.drink_from}–${t.drink_until}`;if(t.drink_until)return`entro il ${t.drink_until}`;if(t.drink_from)return`dal ${t.drink_from}`;return""}function St(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}function Rt(t,e){if(!e)return!0;let s=St([t.name,t.producer,t.vintage,t.region,t.country,t.grape,t.notes,t.code].filter(Boolean).join(" "));return St(e).split(/\s+/).every((i)=>s.includes(i))}var y=v`
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
`;function et(t,e,s){return c`
    <div class="form">
      <label class="field wide">
        Tipo
        <div class="types">
          ${Object.entries(t.types).map(([i,a])=>c`<button type="button" class="chip ${e.type===i?"active":""}"
              @click=${()=>s("type",i)}><span class="dot" style="background:${a.color}"></span>${a.label}</button>`)}
        </div>
      </label>
      ${B.map((i)=>{let a=i.key==="name"||i.kind==="area",r=e[i.key]??"",n=(o)=>s(i.key,o.target.value);return c`<label class="field ${a?"wide":""}">
          ${i.label}
          ${i.kind==="area"?c`<textarea rows="2" .value=${r} @input=${n}></textarea>`:c`<input
                type=${i.kind==="text"?"text":"number"}
                inputmode=${i.kind==="text"?"text":"numeric"}
                step=${i.kind==="number"?"0.01":"1"}
                .value=${String(r)}
                @input=${n}
              />`}
        </label>`})}
    </div>
  `}class tt extends b{constructor(){super(...arguments);this.rackId=null;this.row=null;this.col=null;this._values={type:"red"};this._quantity=1;this._busy=!1}static styles=y;_close(){this.dispatchEvent(new CustomEvent("close"))}async _save(){if(!String(this._values.name||"").trim()){this.card.toast("Scrivi almeno il nome del vino");return}this._busy=!0;try{let e=(await this.card.ws({type:"taponbon/add_bottles",wine:this._values,quantity:this._quantity,rack_id:this.rackId,row:this.row,col:this.col})).bottles,s=e.filter((i)=>!i.rack_id).length;this.card.toast(s?`Aggiunte ${e.length} bottiglie, ${s} da sistemare: scaffale pieno`:e.length>1?`Aggiunte ${e.length} bottiglie`:"Bottiglia aggiunta"),this._close()}finally{this._busy=!1}}render(){let t=this.data.racks.find((s)=>s.id===this.rackId),e=t&&this.row!=null&&this.col!=null?`${t.name}, fila ${this.row+1}, posto ${this.col+1}`:"nel primo posto libero";return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(s)=>s.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Aggiungi vino</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${et(this.data,this._values,(s,i)=>this._values={...this._values,[s]:i})}
            <div class="form" style="margin-top:10px">
              <label class="field">
                Quante bottiglie
                <input type="number" min="1" max="100" .value=${String(this._quantity)}
                  @input=${(s)=>this._quantity=Math.max(1,Math.min(100,Number(s.target.value)||1))} />
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
    `}}d([g({attribute:!1})],tt.prototype,"card",void 0),d([g({attribute:!1})],tt.prototype,"data",void 0),d([g({attribute:!1})],tt.prototype,"rackId",void 0),d([g({attribute:!1})],tt.prototype,"row",void 0),d([g({attribute:!1})],tt.prototype,"col",void 0),d([u()],tt.prototype,"_values",void 0),d([u()],tt.prototype,"_quantity",void 0),d([u()],tt.prototype,"_busy",void 0),tt=d([_("tb-add-dialog")],tt);class st extends b{constructor(){super(...arguments);this._label=null;this._editing=!1;this._values={};this._sameWine=!0;this._otherReason=!1;this._busy=!1}willUpdate(t){if(t.has("bottle")){if(t.get("bottle")?.id!==this.bottle.id)this._label=null,this._editing=!1,this._loadLabel()}}async _loadLabel(){let t=this.bottle.id;try{let e=await this.card.hass.callWS({type:"taponbon/get_label",bottle_id:t});if(this.bottle.id===t)this._label=e}catch{}}_close(){this.dispatchEvent(new CustomEvent("close"))}_sameWineCount(){let t=(e)=>`${(e.name||"").trim().toLowerCase()}|${(e.producer||"").trim().toLowerCase()}|${e.vintage||""}`;return this.data.bottles.filter((e)=>t(e)===t(this.bottle)).length}async _remove(t){this._busy=!0;try{await this.card.ws({type:"taponbon/remove_bottle",bottle_id:this.bottle.id,reason:t}),this.card.toast(`${w(this.bottle)}: ${this.data.reasons[t]?.toLowerCase()||"tolta"}. La trovi nello storico.`),this._close()}finally{this._busy=!1}}async _saveEdit(){this._busy=!0;try{let t=await this.card.ws({type:"taponbon/update_bottle",bottle_id:this.bottle.id,changes:this._values,same_wine:this._sameWine});this.card.toast(t.updated>1?`Aggiornate ${t.updated} bottiglie`:"Bottiglia aggiornata"),this._editing=!1,this._label=null,this._loadLabel()}finally{this._busy=!1}}async _printOnPrinter(){await this.card.ws({type:"taponbon/request_label",bottle_id:this.bottle.id}),this.card.toast("Etichetta inviata alla stampante")}_printInBrowser(){if(!this._label)return;let t=window.open("","_blank","width=480,height=360");if(!t){this.card.toast("Il browser ha bloccato la finestra di stampa");return}t.document.write(`<!doctype html><html><head><title>Etichetta ${this._label.code}</title>
      <style>@page{size:50mm 30mm;margin:0}html,body{margin:0}img{width:50mm;height:30mm;display:block}</style></head>
      <body><img src="data:image/png;base64,${this._label.png_base64}"
      onload="setTimeout(function(){window.print();window.close();},150)"></body></html>`),t.document.close()}render(){let t=this.bottle,e=this.data.types[t.type];return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(s)=>s.stopPropagation()}>
          <div class="dialog-head">
            <div>
              <div class="dialog-title">${w(t)}</div>
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
    `}_renderView(t,e){let s=Pt(t);return c`
      <div class="badges">
        <span class="badge" style="background:${e?.color}">${e?.label||t.type}</span>
        ${t.alert==="closing"?c`<span class="badge warn">Da bere presto</span>`:p}
        ${t.alert==="past"?c`<span class="badge bad">Oltre la finestra</span>`:p}
        <span class="where">📍 ${Ct(t,this.data.racks)}</span>
      </div>
      <dl class="facts">
        ${B.filter((i)=>!["name","producer","vintage","drink_from","drink_until"].includes(i.key)).map((i)=>{let a=t[i.key];if(a==null||a==="")return p;return c`<dt>${i.label}</dt><dd>${i.key==="price"?`${Number(a).toFixed(2)} €`:a}</dd>`})}
        ${s?c`<dt>Finestra di beva</dt><dd>${s}</dd>`:p}
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
            ${Object.entries(this.data.reasons).filter(([i])=>i!=="drank").map(([i,a])=>c`<button class="btn small ${i==="deleted"?"danger":""}" ?disabled=${this._busy}
                @click=${()=>this._remove(i)}>${a}</button>`)}
          </div>`:p}
    `}_renderViewFoot(){return c`<div class="dialog-foot">
      <button class="btn" @click=${()=>this.dispatchEvent(new CustomEvent("move",{detail:{bottle:this.bottle}}))}>↔ Sposta</button>
      <button class="btn" @click=${()=>{this._values=Object.fromEntries(["type",...B.map((t)=>t.key)].map((t)=>[t,this.bottle[t]??""])),this._sameWine=!0,this._editing=!0}}>✏️ Modifica</button>
      <button class="btn" @click=${()=>this._otherReason=!this._otherReason}>Altro…</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${()=>this._remove("drank")}>🍷 Bevuta</button>
    </div>`}_renderEdit(){let t=this._sameWineCount();return c`
      ${et(this.data,this._values,(e,s)=>this._values={...this._values,[e]:s})}
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
    `]}d([g({attribute:!1})],st.prototype,"card",void 0),d([g({attribute:!1})],st.prototype,"data",void 0),d([g({attribute:!1})],st.prototype,"bottle",void 0),d([u()],st.prototype,"_label",void 0),d([u()],st.prototype,"_editing",void 0),d([u()],st.prototype,"_values",void 0),d([u()],st.prototype,"_sameWine",void 0),d([u()],st.prototype,"_otherReason",void 0),d([u()],st.prototype,"_busy",void 0),st=d([_("tb-bottle-dialog")],st);class it extends b{constructor(){super(...arguments);this._drafts={}}_close(){this.dispatchEvent(new CustomEvent("close"))}_draft(t){return{...t,...this._drafts[t.id]}}_set(t,e,s){this._drafts={...this._drafts,[t]:{...this._drafts[t],[e]:s}}}_count(t){return this.data.bottles.filter((e)=>e.rack_id===t).length}async _save(t){let e=this._draft(t),s=await this.card.ws({type:"taponbon/save_rack",rack:e}),i={...this._drafts};delete i[t.id],this._drafts=i,this.card.toast(s.displaced?`Salvato. ${s.displaced} bottiglie sono finite in "Da sistemare".`:"Scaffale salvato")}async _delete(t){let e=this._count(t.id);if(!confirm(`Eliminare "${t.name}"?${e?` Le sue ${e} bottiglie restano in cantina, in "Da sistemare".`:""}`))return;await this.card.ws({type:"taponbon/delete_rack",rack_id:t.id}),this.card.toast("Scaffale eliminato")}async _add(){await this.card.ws({type:"taponbon/save_rack",rack:{name:`Scaffale ${this.data.racks.length+1}`,rows:7,cols:10}})}async _setting(t,e){await this.card.ws({type:"taponbon/update_settings",[t]:e})}render(){let t=this.data.settings;return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(e)=>e.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Scaffali e impostazioni</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this.data.racks.map((e)=>{let s=this._draft(e),i=!!this._drafts[e.id];return c`<div class="rack">
                <label class="field name">Nome
                  <input .value=${s.name} @input=${(a)=>this._set(e.id,"name",a.target.value)} />
                </label>
                <label class="field">File
                  <input type="number" min="1" max="30" .value=${String(s.rows)}
                    @input=${(a)=>this._set(e.id,"rows",Number(a.target.value))} />
                </label>
                <label class="field">Posti per fila
                  <input type="number" min="1" max="30" .value=${String(s.cols)}
                    @input=${(a)=>this._set(e.id,"cols",Number(a.target.value))} />
                </label>
                <div class="rack-foot">
                  <span class="note">${this._count(e.id)} bottiglie · ${s.rows*s.cols} posti</span>
                  <span>
                    <button class="btn small danger" @click=${()=>this._delete(e)}>Elimina</button>
                    <button class="btn small primary" ?disabled=${!i} @click=${()=>this._save(e)}>Salva</button>
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
                ${[[90,"3 mesi"],[180,"6 mesi"],[365,"1 anno"]].map(([e,s])=>c`<button class="chip ${t.alert_days===e?"active":""}"
                    @click=${()=>this._setting("alert_days",e)}>${s}</button>`)}
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
    `]}d([g({attribute:!1})],it.prototype,"card",void 0),d([g({attribute:!1})],it.prototype,"data",void 0),d([u()],it.prototype,"_drafts",void 0),it=d([_("tb-racks-dialog")],it);class at extends b{constructor(){super(...arguments);this._items=null}connectedCallback(){super.connectedCallback(),this._load()}async _load(){let t=await this.card.ws({type:"taponbon/get_history"});this._items=t.history}_close(){this.dispatchEvent(new CustomEvent("close"))}async _restore(t){let e=await this.card.ws({type:"taponbon/restore",history_id:t.history_id});this.card.toast(e.bottle.rack_id?"Rimessa al suo posto":'Rimessa in cantina, in "Da sistemare"'),this._load()}render(){return c`
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
                      <div>${w(t)}</div>
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
    `]}d([g({attribute:!1})],at.prototype,"card",void 0),d([g({attribute:!1})],at.prototype,"data",void 0),d([u()],at.prototype,"_items",void 0),at=d([_("tb-history-dialog")],at);var Wt=Y`<svg viewBox="0 0 24 64" aria-hidden="true">
  <path class="glass" d="M9.6 6h4.8v12.5c0 3.2 6.6 4.6 6.6 11.5V60.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 60.5V30c0-6.9 6.6-8.3 6.6-11.5z"/>
  <path class="shade" d="M9.6 6h4.8v12.5c0 3.2 6.6 4.6 6.6 11.5V60.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 60.5V30c0-6.9 6.6-8.3 6.6-11.5z"/>
  <path class="capsule" d="M9.3 1.2c0-.7.5-1.2 1.2-1.2h3c.7 0 1.2.5 1.2 1.2v12.3H9.3z"/>
  <rect class="capsule-ring" x="9.3" y="11.6" width="5.4" height="1.2"/>
  <rect class="label" x="4.6" y="36" width="14.8" height="15" rx="0.8"/>
  <rect class="label-ink" x="7.5" y="40" width="9" height="1.4" rx="0.7"/>
  <rect class="label-ink thin" x="8.5" y="43.4" width="7" height="0.8" rx="0.4"/>
  <rect class="label-ink thin" x="9.5" y="46" width="5" height="0.8" rx="0.4"/>
  <path class="gloss" d="M5.6 31c.4-3.4 2.6-5 3.6-6v34.5H5.6z"/>
</svg>`,Gt=Y`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="tb-shade" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity=".55"/>
    <stop offset=".22" stop-color="#fff" stop-opacity=".18"/>
    <stop offset=".42" stop-color="#000" stop-opacity="0"/>
    <stop offset=".78" stop-color="#000" stop-opacity=".25"/>
    <stop offset="1" stop-color="#000" stop-opacity=".6"/>
  </linearGradient>
  <linearGradient id="tb-capsule" x1="0" x2="1">
    <stop offset="0" stop-color="#1b1412"/><stop offset=".35" stop-color="#5a4a42"/>
    <stop offset=".55" stop-color="#2a201c"/><stop offset="1" stop-color="#120c0a"/>
  </linearGradient>
  <linearGradient id="tb-capsule-warn" x1="0" x2="1">
    <stop offset="0" stop-color="#8a5300"/><stop offset=".35" stop-color="#ffcf6b"/>
    <stop offset=".55" stop-color="#d98a00"/><stop offset="1" stop-color="#6b3f00"/>
  </linearGradient>
  <linearGradient id="tb-capsule-past" x1="0" x2="1">
    <stop offset="0" stop-color="#6b0f12"/><stop offset=".35" stop-color="#ff7b72"/>
    <stop offset=".55" stop-color="#c62828"/><stop offset="1" stop-color="#4a0a0c"/>
  </linearGradient>
  <linearGradient id="tb-label" x1="0" x2="1">
    <stop offset="0" stop-color="#cfc2a8"/><stop offset=".3" stop-color="#f7f0e1"/>
    <stop offset=".75" stop-color="#ece2cc"/><stop offset="1" stop-color="#b9ab90"/>
  </linearGradient>
</defs></svg>`;class rt extends b{constructor(){super(...arguments);this._config={type:"custom:taponbon-card"};this._data=null;this._error="";this._typeFilter="";this._query="";this._dialog=null;this._moving=null;this._toast="";this._subscribing=!1;this._startMove=(t)=>{this._moving=t.detail.bottle,this._dialog=null}}setConfig(t){this._config={...t}}static getStubConfig(){return{type:"custom:taponbon-card"}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}connectedCallback(){if(super.connectedCallback(),this.hass)this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0}updated(t){if(t.has("hass")&&this.hass&&!this._unsub&&!this._subscribing)this._subscribe()}async _subscribe(){if(this._unsub||this._subscribing||!this.hass?.connection)return;this._subscribing=!0;try{this._unsub=await this.hass.connection.subscribeMessage((t)=>{this._data=t,this._error=""},{type:"taponbon/subscribe"})}catch(t){this._error=t?.code==="unknown_command"?"L'integrazione TaponBon non è installata: aggiungila da Impostazioni → Dispositivi e servizi.":`Impossibile caricare la cantina: ${t?.message||t}`}finally{this._subscribing=!1}}async ws(t){try{return await this.hass.callWS(t)}catch(e){throw this.toast(e?.message||"Operazione non riuscita"),e}}toast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",3500)}_onCell(t,e,s,i){if(this._moving){let a=this._moving;if(this._moving=null,i?.id===a.id)return;this.ws({type:"taponbon/move_bottle",bottle_id:a.id,rack_id:t.id,row:e,col:s}).then(()=>this.toast(i?"Bottiglie scambiate di posto":"Bottiglia spostata"));return}this._dialog=i?{kind:"bottle",bottleId:i.id}:{kind:"add",rackId:t.id,row:e,col:s}}render(){let t=this._data;return c`
      <ha-card>
        ${Gt}
        ${this._error?c`<div class="empty">${this._error}</div>`:!t?c`<div class="empty">Carico la cantina…</div>`:this._renderBody(t)}
        ${this._toast?c`<div class="toast">${this._toast}</div>`:p}
      </ha-card>
      ${t?this._renderDialog(t):p}
    `}_renderBody(t){let e=t.bottles.length,s=t.racks.reduce((l,m)=>l+m.rows*m.cols,0),i=t.bottles.filter((l)=>l.alert==="closing").length,a=t.bottles.filter((l)=>l.alert==="past").length,r=t.bottles.filter((l)=>!l.rack_id),n=Object.fromEntries(Object.keys(t.types).map((l)=>[l,t.bottles.filter((m)=>m.type===l).length])),o=Math.max(1,Math.min(6,Math.round(Number(this._config.columns))||0));return c`
      <div class="header">
        <div class="title">
          <span class="logo">🍷</span>
          <div>
            <div class="name">${this._config.title||"TaponBon"}</div>
            <div class="sub">${e} bottiglie · ${s-t.racks.reduce((l,m)=>l+this._inRack(t,m).length,0)} posti liberi</div>
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

      ${i||a?c`<div class="banner">
            ${i?c`<span>🍷 <b>${i}</b> da bere presto</span>`:p}
            ${a?c`<span>⚠️ <b>${a}</b> oltre la finestra di beva</span>`:p}
            <span class="hint">capsula dorata: da bere presto · capsula rossa: oltre la finestra</span>
          </div>`:p}

      ${this._moving?c`<div class="banner moving">
            Tocca la nuova posizione per <b>${w(this._moving)}</b>
            <button class="btn small" @click=${()=>this._moving=null}>Annulla</button>
          </div>`:p}

      <div class="filters">
        <button class="chip ${this._typeFilter?"":"active"}" @click=${()=>this._typeFilter=""}>Tutti ${e}</button>
        ${Object.entries(t.types).map(([l,m])=>c`<button
            class="chip ${this._typeFilter===l?"active":""}"
            @click=${()=>this._typeFilter=this._typeFilter===l?"":l}
          ><span class="dot" style="background:${m.color}"></span>${m.label} ${n[l]||0}</button>`)}
        <input class="search" type="search" placeholder="Cerca vino, produttore, annata…"
          .value=${this._query} @input=${(l)=>this._query=l.target.value} />
      </div>

      <div class="racks ${o?"fixed":""}" style=${o?`--tb-columns:${o}`:""}>
        ${t.racks.map((l)=>this._renderRack(t,l))}
      </div>

      ${r.length?c`<div class="unplaced">
            <div class="section-title">Da sistemare (${r.length})</div>
            <div class="list">
              ${r.map((l)=>c`<button class="list-item ${this._dims(l)?"dim":""}"
                  @click=${()=>this._dialog={kind:"bottle",bottleId:l.id}}>
                  <span class="dot" style="background:${t.types[l.type]?.color}"></span>${w(l)}
                </button>`)}
            </div>
          </div>`:p}
      ${!t.racks.length?c`<div class="empty">Nessuno scaffale: creane uno da ⚙︎.</div>`:p}
    `}_inRack(t,e){return t.bottles.filter((s)=>s.rack_id===e.id&&s.row!=null&&s.col!=null)}_dims(t){return this._typeFilter&&t.type!==this._typeFilter||!Rt(t,this._query)}_renderRack(t,e){let s=this._inRack(t,e),i=new Map(s.map((r)=>[`${r.row}:${r.col}`,r])),a=[];for(let r=0;r<e.rows;r++)for(let n=0;n<e.cols;n++){let o=i.get(`${r}:${n}`),l=o?t.types[o.type]?.color||"#888":"";a.push(c`<button
          class="cell ${o?"full":"free"} ${o&&this._dims(o)?"dim":""} ${o?.alert||""} ${this._moving?.id===o?.id&&o?"moving":""}"
          style=${o?`--bottle:${l}`:""}
          title=${o?`${w(o)}${o.producer?` · ${o.producer}`:""}`:`Fila ${r+1}, posto ${n+1}: libero`}
          @click=${()=>this._onCell(e,r,n,o)}
        >${Wt}</button>`)}return c`
      <div class="rack">
        <div class="rack-head"><span>${e.name}</span><span class="muted">${s.length}/${e.rows*e.cols}</span></div>
        <div class="grid" style="grid-template-columns: repeat(${e.cols}, minmax(0, 30px))">${a}</div>
      </div>
    `}_renderDialog(t){let e=this._dialog;if(!e)return p;let s=()=>this._dialog=null;switch(e.kind){case"add":return c`<tb-add-dialog .card=${this} .data=${t} .rackId=${e.rackId} .row=${e.row} .col=${e.col} @close=${s}></tb-add-dialog>`;case"bottle":{let i=t.bottles.find((a)=>a.id===e.bottleId);if(!i)return p;return c`<tb-bottle-dialog .card=${this} .data=${t} .bottle=${i} @close=${s} @move=${this._startMove}></tb-bottle-dialog>`}case"racks":return c`<tb-racks-dialog .card=${this} .data=${t} @close=${s}></tb-racks-dialog>`;case"history":return c`<tb-history-dialog .card=${this} .data=${t} @close=${s}></tb-history-dialog>`}}static styles=[y,v`
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
        border-radius: 18px;
        padding: 14px 14px 18px;
        background:
          radial-gradient(120% 60% at 50% 0%, rgba(255, 255, 255, 0.06), transparent 60%),
          linear-gradient(180deg, #1d1a1a, #121011);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.35);
      }
      .rack-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        color: #f1e9df;
        font-weight: 600;
        letter-spacing: 0.02em;
        padding: 0 2px 14px;
      }
      .rack-head .muted {
        color: #9b928a;
        font-variant-numeric: tabular-nums;
      }
      .grid {
        display: grid;
        gap: 14px 7px;
        justify-content: center;
      }
      .cell {
        aspect-ratio: 24 / 64;
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        position: relative;
        transition: transform 0.18s ease, opacity 0.2s, filter 0.2s;
      }
      .cell::before {
        /* the shelf the bottle stands on */
        content: "";
        position: absolute;
        left: -4px;
        right: -4px;
        bottom: -7px;
        height: 3px;
        border-radius: 2px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
      }
      .cell svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }
      .cell .shade { fill: url(#tb-shade); }
      .cell .capsule, .cell .capsule-ring { fill: url(#tb-capsule); }
      .cell .capsule-ring { opacity: 0.6; }
      .cell .label { fill: url(#tb-label); }
      .cell .label-ink { fill: rgba(60, 30, 20, 0.55); }
      .cell .label-ink.thin { fill: rgba(60, 30, 20, 0.35); }
      .cell .gloss { fill: rgba(255, 255, 255, 0.22); }
      .cell.full .glass { fill: var(--bottle); }
      .cell.full {
        filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.55));
      }
      .cell.full:hover {
        transform: translateY(-4px);
        filter: drop-shadow(0 8px 6px rgba(0, 0, 0, 0.6));
      }
      .cell.free .glass {
        fill: rgba(255, 255, 255, 0.035);
        stroke: rgba(255, 255, 255, 0.14);
        stroke-width: 0.5;
        stroke-dasharray: 1.6 1.4;
      }
      .cell.free .shade, .cell.free .capsule, .cell.free .capsule-ring,
      .cell.free .label, .cell.free .label-ink, .cell.free .gloss { display: none; }
      .cell.free:hover .glass {
        fill: rgba(255, 255, 255, 0.1);
        stroke: rgba(255, 255, 255, 0.4);
      }
      .cell.closing .capsule, .cell.closing .capsule-ring { fill: url(#tb-capsule-warn); }
      .cell.past .capsule, .cell.past .capsule-ring { fill: url(#tb-capsule-past); }
      .cell.closing { filter: drop-shadow(0 0 5px rgba(255, 190, 70, 0.55)) drop-shadow(0 3px 3px rgba(0, 0, 0, 0.5)); }
      .cell.past { filter: drop-shadow(0 0 5px rgba(255, 90, 80, 0.55)) drop-shadow(0 3px 3px rgba(0, 0, 0, 0.5)); }
      .cell.dim {
        opacity: 0.15;
        filter: grayscale(0.6);
      }
      .cell.moving {
        outline: 2px solid #2196f3;
        outline-offset: 2px;
        border-radius: 4px;
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
    `]}d([g({attribute:!1})],rt.prototype,"hass",void 0),d([u()],rt.prototype,"_config",void 0),d([u()],rt.prototype,"_data",void 0),d([u()],rt.prototype,"_error",void 0),d([u()],rt.prototype,"_typeFilter",void 0),d([u()],rt.prototype,"_query",void 0),d([u()],rt.prototype,"_dialog",void 0),d([u()],rt.prototype,"_moving",void 0),d([u()],rt.prototype,"_toast",void 0),rt=d([_("taponbon-card")],rt);window.customCards=window.customCards||[];window.customCards.push({type:"taponbon-card",name:"TaponBon",description:"La tua cantina: scaffali, bottiglie, QR e finestre di beva",preview:!1});export{rt as TaponBonCard};
