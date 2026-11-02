var d=function(t,e,i,s){var a=arguments.length,r=a<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,n;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)if(n=t[o])r=(a<3?n(r):a>3?n(e,i,r):n(e,i))||r;return a>3&&r&&Object.defineProperty(e,i,r),r};var V=globalThis,F=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),lt=new WeakMap;class q{constructor(t,e,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(F&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=lt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&lt.set(e,t))}return t}toString(){return this.cssText}}var ct=(t)=>new q(typeof t=="string"?t:t+"",void 0,Q),y=(t,...e)=>{let i=t.length===1?t[0]:e.reduce((s,a,r)=>s+((n)=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[r+1],t[0]);return new q(i,t,Q)},dt=(t,e)=>{if(F)t.adoptedStyleSheets=e.map((i)=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of e){let s=document.createElement("style"),a=V.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}},K=F?(t)=>t:(t)=>t instanceof CSSStyleSheet?((e)=>{let i="";for(let s of e.cssRules)i+=s.cssText;return ct(i)})(t):t;var{is:Nt,defineProperty:It,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:Bt,getOwnPropertySymbols:jt,getPrototypeOf:Dt}=Object,G=globalThis,pt=G.trustedTypes,Vt=pt?pt.emptyScript:"",Ft=G.reactiveElementPolyfillSupport,O=(t,e)=>t,H={toAttribute(t,e){switch(e){case Boolean:t=t?Vt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},W=(t,e)=>!Nt(t,e),ht={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;class S extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&It(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:a}=Ut(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let n=s?.call(this);a?.call(this,r),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=Dt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,i=[...Bt(e),...jt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(K(s))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t)=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t)=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t)=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t)=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:H).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:H;this._$Em=s;let n=r.fromAttribute(e,a.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(t!==void 0){let r=this.constructor;if(s===!1&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??W)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:r}=a,n=this[s];r!==!0||this._$AL.has(s)||n===void 0||this.C(s,void 0,a,n)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((i)=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e)=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e)=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}}S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[O("elementProperties")]=new Map,S[O("finalized")]=new Map,Ft?.({ReactiveElement:S}),(G.reactiveElementVersions??=[]).push("2.1.2");var J=globalThis,ut=(t)=>t,Y=J.trustedTypes,gt=Y?Y.createPolicy("lit-html",{createHTML:(t)=>t}):void 0;var A=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+A,qt=`<${yt}>`,M=document,N=()=>M.createComment(""),I=(t)=>t===null||typeof t!="object"&&typeof t!="function",X=Array.isArray,Gt=(t)=>X(t)||typeof t?.[Symbol.iterator]=="function";var L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,ft=/>/g,P=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,vt=/"/g,_t=/^(?:script|style|textarea|title)$/i,Z=(t)=>(e,...i)=>({_$litType$:t,strings:e,values:i}),c=Z(1),v=Z(2),re=Z(3),T=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$t=new WeakMap,R=M.createTreeWalker(M,129);function xt(t,e){if(!X(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return gt!==void 0?gt.createHTML(e):e}var Wt=(t,e)=>{let i=t.length-1,s=[],a,r=e===2?"<svg>":e===3?"<math>":"",n=L;for(let o=0;o<i;o++){let l=t[o],f,h,m=-1,k=0;for(;k<l.length&&(n.lastIndex=k,h=n.exec(l),h!==null);)k=n.lastIndex,n===L?h[1]==="!--"?n=bt:h[1]!==void 0?n=ft:h[2]!==void 0?(_t.test(h[2])&&(a=RegExp("</"+h[2],"g")),n=P):h[3]!==void 0&&(n=P):n===P?h[0]===">"?(n=a??L,m=-1):h[1]===void 0?m=-2:(m=n.lastIndex-h[2].length,f=h[1],n=h[3]===void 0?P:h[3]==='"'?vt:mt):n===vt||n===mt?n=P:n===bt||n===ft?n=L:(n=P,a=void 0);let C=n===P&&t[o+1].startsWith("/>")?" ":"";r+=n===L?l+qt:m>=0?(s.push(f),l.slice(0,m)+"$lit$"+l.slice(m)+A+C):l+A+(m===-2?o:C)}return[xt(t,r+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class U{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0,n=t.length-1,o=this.parts,[l,f]=Wt(t,e);if(this.el=U.createElement(l,i),R.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=R.nextNode())!==null&&o.length<n;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith("$lit$")){let m=f[r++],k=s.getAttribute(h).split(A),C=/([.?@])?(.*)/.exec(m);o.push({type:1,index:a,name:C[2],strings:k,ctor:C[1]==="."?kt:C[1]==="?"?Et:C[1]==="@"?St:j}),s.removeAttribute(h)}else h.startsWith(A)&&(o.push({type:6,index:a}),s.removeAttribute(h));if(_t.test(s.tagName)){let h=s.textContent.split(A),m=h.length-1;if(m>0){s.textContent=Y?Y.emptyScript:"";for(let k=0;k<m;k++)s.append(h[k],N()),R.nextNode(),o.push({type:2,index:++a});s.append(h[m],N())}}}else if(s.nodeType===8)if(s.data===yt)o.push({type:2,index:a});else{let h=-1;for(;(h=s.data.indexOf(A,h+1))!==-1;)o.push({type:7,index:a}),h+=A.length-1}a++}}static createElement(t,e){let i=M.createElement("template");return i.innerHTML=t,i}}function z(t,e,i=t,s){if(e===T)return e;let a=s!==void 0?i._$Co?.[s]:i._$Cl,r=I(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(t),a._$AT(t,i,s)),s!==void 0?(i._$Co??=[])[s]=a:i._$Cl=a),a!==void 0&&(e=z(t,a._$AS(t,e.values),a,s)),e}class wt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);R.currentNode=s;let a=R.nextNode(),r=0,n=0,o=i[0];for(;o!==void 0;){if(r===o.index){let l;o.type===2?l=new B(a,a.nextSibling,this,t):o.type===1?l=new o.ctor(a,o.name,o.strings,this,t):o.type===6&&(l=new At(a,this,t)),this._$AV.push(l),o=i[++n]}r!==o?.index&&(a=R.nextNode(),r++)}return R.currentNode=M,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class B{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),I(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=U.createElement(xt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new wt(s,this),r=a.u(this.options);a.p(e),this.T(r),this._$AH=a}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new U(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let a of t)s===e.length?e.push(i=new B(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ut(t).nextSibling;ut(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,s){let a=this.strings,r=!1;if(a===void 0)t=z(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==T,r&&(this._$AH=t);else{let n=t,o,l;for(t=a[0],o=0;o<a.length-1;o++)l=z(this,n[i+o],e,o),l===T&&(l=this._$AH[o]),r||=!I(l)||l!==this._$AH[o],l===p?t=p:t!==p&&(t+=(l??"")+a[o+1]),this._$AH[o]=l}r&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class kt extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class Et extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class St extends j{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=z(this,t,e,0)??p)===T)return;let i=this._$AH,s=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class At{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}var Yt=J.litHtmlPolyfillSupport;Yt?.(U,B),(J.litHtmlVersions??=[]).push("3.3.2");var Ct=(t,e,i)=>{let s=i?.renderBefore??e,a=s._$litPart$;if(a===void 0){let r=i?.renderBefore??null;s._$litPart$=a=new B(e.insertBefore(N(),r),r,void 0,i??{})}return a._$AI(t),a};var tt=globalThis;class b extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ct(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}}b._$litElement$=!0,b.finalized=!0,tt.litElementHydrateSupport?.({LitElement:b});var Qt=tt.litElementPolyfillSupport;Qt?.({LitElement:b});(tt.litElementVersions??=[]).push("4.2.2");var _=(t)=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Kt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W},Jt=(t=Kt,e,i)=>{let{kind:s,metadata:a}=i,r=globalThis.litPropertyMetadata.get(a);if(r===void 0&&globalThis.litPropertyMetadata.set(a,r=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),s==="accessor"){let{name:n}=i;return{set(o){let l=e.get.call(this);e.set.call(this,o),this.requestUpdate(n,l,t,!0,o)},init(o){return o!==void 0&&this.C(n,void 0,t,o),o}}}if(s==="setter"){let{name:n}=i;return function(o){let l=this[n];e.call(this,o),this.requestUpdate(n,l,t,!0,o)}}throw Error("Unsupported decorator location: "+s)};function g(t){return(e,i)=>typeof i=="object"?Jt(t,e,i):((s,a,r)=>{let n=a.hasOwnProperty(r);return a.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(a,r):void 0})(t,e,i)}function u(t){return g({...t,state:!0,attribute:!1})}var D=[{key:"name",label:"Nome del vino",kind:"text"},{key:"producer",label:"Produttore",kind:"text"},{key:"vintage",label:"Annata",kind:"year"},{key:"region",label:"Regione / denominazione",kind:"text"},{key:"country",label:"Paese",kind:"text"},{key:"grape",label:"Vitigno",kind:"text"},{key:"drink_from",label:"Da bere dal",kind:"year"},{key:"drink_until",label:"Da bere entro il",kind:"year"},{key:"price",label:"Prezzo (€)",kind:"number"},{key:"notes",label:"Note",kind:"area"}];function E(t){return`${t.name||"Vino"}${t.vintage?` ${t.vintage}`:""}`}function Rt(t,e){let i=e.find((s)=>s.id===t.rack_id);if(!i||t.row==null||t.col==null)return"Da sistemare";return`${i.name} · fila ${t.row+1}, posto ${t.col+1}`}function Mt(t){if(t.drink_from&&t.drink_until)return`${t.drink_from}–${t.drink_until}`;if(t.drink_until)return`entro il ${t.drink_until}`;if(t.drink_from)return`dal ${t.drink_from}`;return""}function Pt(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}function Tt(t,e){if(!e)return!0;let i=Pt([t.name,t.producer,t.vintage,t.region,t.country,t.grape,t.notes,t.code].filter(Boolean).join(" "));return Pt(e).split(/\s+/).every((s)=>i.includes(s))}var x=y`
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
`;var zt={red:{shape:"bordeaux",glass:"tb-glass-red",clear:!1,foil:"tb-foil-wine"},white:{shape:"burgundy",glass:"tb-wine-white",clear:!0,foil:"tb-foil-silver"},rose:{shape:"bordeaux",glass:"tb-wine-rose",clear:!0,foil:"tb-foil-rose"},sparkling:{shape:"champagne",glass:"tb-glass-green",clear:!1,foil:"tb-foil-gold"},dessert:{shape:"bordeaux",glass:"tb-glass-amber",clear:!1,foil:"tb-foil-gold"}},et={bordeaux:{body:"M9.7 1h4.6v16.5c0 3.4 6.7 4.8 6.7 11.5v31.2c0 1.5-1.2 2.8-2.8 2.8H5.8C4.2 63 3 61.7 3 60.2V29c0-6.7 6.7-8.1 6.7-11.5z",foil:"M9.5 1.4c0-.8.5-1.4 1.3-1.4h2.4c.8 0 1.3.6 1.3 1.4V13H9.5z",label:[4.4,35,15.2,16.5],neckY:15,fillY:22},burgundy:{body:"M9.8 1h4.4v13c0 5 7 9 7 18v28.2c0 1.5-1.2 2.8-2.8 2.8H5.6c-1.6 0-2.8-1.3-2.8-2.8V32c0-9 7-13 7-18z",foil:"M9.6 1.4c0-.8.5-1.4 1.3-1.4h2.2c.8 0 1.3.6 1.3 1.4V12H9.6z",label:[4.2,36,15.6,16],neckY:13.5,fillY:19},champagne:{body:"M9.4 1h5.2v11c0 6 7.6 9.5 7.6 19v29.4c0 1.4-1.2 2.6-2.6 2.6H4.4C3 63 1.8 61.8 1.8 60.4V31c0-9.5 7.6-13 7.6-19z",foil:"M9 1.6C9 .7 9.7 0 10.6 0h2.8c.9 0 1.6.7 1.6 1.6V12c0 2.4 2.6 4.4 4.3 6.6l-14.6.1C6.4 16.4 9 14.4 9 12z",label:[3.6,37,16.8,13],neckY:20,fillY:20},half:{body:"M10 20h4v9c0 2.6 5.2 3.6 5.2 8.8v22.6c0 1.4-1.1 2.6-2.5 2.6H7.3c-1.4 0-2.5-1.2-2.5-2.6V37.8c0-5.2 5.2-6.2 5.2-8.8z",foil:"M9.8 20.9c0-.5.4-.9.9-.9h2.6c.5 0 .9.4.9.9V28H9.8z",label:[6,44,12,11],neckY:30,fillY:33}};function Ot(t,e){let i=zt[t]||zt.red,s=et[i.shape],[a,r,n,o]=s.label,l=a+n/2;return v`<svg viewBox="0 0 24 64" aria-hidden="true">
    <ellipse cx="12" cy="63.2" rx="9.5" ry="1" fill="rgba(0,0,0,.55)" filter="url(#tb-soft)"/>
    ${i.clear?v`<path d=${s.body} fill="url(#tb-glass-clear)"/>
            <path d=${s.body} fill=${`url(#${i.glass})`} clip-path=${`url(#tb-fill-${i.shape})`}/>
            <rect x="0" y=${s.fillY} width="24" height=".5" fill="rgba(255,255,255,.35)" clip-path=${`url(#tb-in-${i.shape})`}/>`:v`<path d=${s.body} fill=${`url(#${i.glass})`}/>`}
    <path d=${s.body} fill="url(#tb-cylinder)"/>
    <path d=${s.body} fill="none" stroke="rgba(255,255,255,.18)" stroke-width=".35"/>
    <ellipse cx="12" cy="61.4" rx="6.5" ry="1.3" fill="rgba(0,0,0,.35)" clip-path=${`url(#tb-in-${i.shape})`}/>
    <g class="label-group">
      <rect x=${a} y=${r} width=${n} height=${o} rx=".5" fill="url(#tb-paper)"/>
      <rect x=${a} y=${r} width=${n} height=${o} rx=".5" fill="url(#tb-label-curve)"/>
      <rect x=${a+0.9} y=${r+0.9} width=${n-1.8} height=${o-1.8} rx=".3" fill="none" stroke="rgba(120,90,50,.55)" stroke-width=".25"/>
      <circle cx=${l} cy=${r+o*0.3} r=${Math.min(n,o)*0.12} fill="none" stroke="rgba(120,80,30,.8)" stroke-width=".3"/>
      <rect x=${l-n*0.3} y=${r+o*0.55} width=${n*0.6} height=".9" rx=".45" fill="rgba(40,20,15,.75)"/>
      <rect x=${l-n*0.22} y=${r+o*0.7} width=${n*0.44} height=".5" rx=".25" fill="rgba(40,20,15,.45)"/>
      <rect x=${l-n*0.15} y=${r+o*0.8} width=${n*0.3} height=".5" rx=".25" fill="rgba(40,20,15,.35)"/>
    </g>
    <path d=${s.foil} fill=${`url(#${i.foil})`}/>
    <path d=${s.foil} fill="url(#tb-cylinder)" opacity=".6"/>
    <path d="M5.4 30c.6-3.8 2.6-5.6 3.6-6.8V59.5H5.4z" fill="url(#tb-spec)" clip-path=${`url(#tb-in-${i.shape})`} opacity=".9"/>
    <rect x="17.6" y="31" width=".9" height="27" rx=".45" fill="rgba(255,255,255,.18)" clip-path=${`url(#tb-in-${i.shape})`}/>
    ${e?Xt(s.neckY,e):p}
  </svg>`}function Xt(t,e){let i=e==="past"?"url(#tb-tag-past)":"url(#tb-tag-soon)";return v`<g class="tag">
    <path d=${`M12 ${t}c3 .2 4.6 1 5.4 2.6`} fill="none" stroke="rgba(240,230,210,.85)" stroke-width=".35"/>
    <g transform=${`translate(16.4 ${t+2}) rotate(14)`}>
      <rect x="0" y="0" width="6.4" height="8.6" rx="1.1" fill=${i} stroke="rgba(0,0,0,.35)" stroke-width=".25"/>
      <circle cx="3.2" cy="1.4" r=".55" fill="rgba(0,0,0,.45)"/>
      ${e==="past"?v`<path d="M3.2 3.3v2.6M3.2 7v.1" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>`:v`<circle cx="3.2" cy="5.4" r="1.9" fill="none" stroke="#3b2200" stroke-width=".45"/>
              <path d="M3.2 4.3v1.2l.8.6" fill="none" stroke="#3b2200" stroke-width=".45" stroke-linecap="round"/>`}
    </g>
  </g>`}var Ht=v`<svg viewBox="0 0 24 64" aria-hidden="true">
  <path d=${et.bordeaux.body} fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" stroke-width=".45" stroke-dasharray="1.4 1.2"/>
</svg>`,Zt=(t)=>{let e=et[t];return v`
    <clipPath id=${`tb-in-${t}`}><path d=${e.body}/></clipPath>
    <clipPath id=${`tb-fill-${t}`}><rect x="0" y=${e.fillY} width="24" height="64"/></clipPath>`},w=(t,e)=>v`<linearGradient id=${t} x1="0" x2="1" y1="0" y2="0">
  ${e.map(([i,s])=>v`<stop offset=${i} stop-color=${s}/>`)}
</linearGradient>`,Lt=v`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="tb-soft" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation=".6"/></filter>
  ${["bordeaux","burgundy","champagne","half"].map(Zt)}

  <!-- glass and wine -->
  ${w("tb-glass-red",[[0,"#060404"],[0.18,"#1c0a0d"],[0.42,"#3b0f18"],[0.6,"#2a0a11"],[1,"#050303"]])}
  ${w("tb-glass-green",[[0,"#030603"],[0.2,"#0e2412"],[0.42,"#1d4223"],[0.62,"#12301a"],[1,"#020402"]])}
  ${w("tb-glass-amber",[[0,"#160902"],[0.2,"#5a2c08"],[0.42,"#9c5714"],[0.62,"#6e3a0c"],[1,"#120701"]])}
  ${w("tb-wine-white",[[0,"#5a4a12"],[0.2,"#b9a043"],[0.42,"#ecd98e"],[0.62,"#cdb158"],[1,"#4d3e0e"]])}
  ${w("tb-wine-rose",[[0,"#9a6a64"],[0.2,"#e6b9ad"],[0.42,"#fbe3da"],[0.62,"#efc8bd"],[1,"#8a5c56"]])}
  ${w("tb-glass-clear",[[0,"rgba(190,215,200,.30)"],[0.3,"rgba(230,245,235,.10)"],[0.7,"rgba(230,245,235,.08)"],[1,"rgba(160,190,175,.35)"]])}

  <!-- light on a cylinder -->
  <linearGradient id="tb-cylinder" x1="0" x2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".55"/>
    <stop offset=".12" stop-color="#000" stop-opacity=".1"/>
    <stop offset=".3" stop-color="#fff" stop-opacity=".1"/>
    <stop offset=".5" stop-color="#000" stop-opacity="0"/>
    <stop offset=".85" stop-color="#000" stop-opacity=".3"/>
    <stop offset="1" stop-color="#000" stop-opacity=".65"/>
  </linearGradient>
  <linearGradient id="tb-spec" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".15" stop-color="#fff" stop-opacity=".55"/>
    <stop offset=".6" stop-color="#fff" stop-opacity=".25"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>

  <!-- capsules -->
  ${w("tb-foil-wine",[[0,"#1d0508"],[0.3,"#7a1d2b"],[0.45,"#c4515f"],[0.6,"#6a1523"],[1,"#150305"]])}
  ${w("tb-foil-gold",[[0,"#5a3a08"],[0.3,"#c9962e"],[0.45,"#ffe7a1"],[0.6,"#b88421"],[1,"#4a2f05"]])}
  ${w("tb-foil-silver",[[0,"#3c3c3c"],[0.3,"#a9a9a9"],[0.45,"#f2f2f2"],[0.6,"#9a9a9a"],[1,"#2e2e2e"]])}
  ${w("tb-foil-rose",[[0,"#5e2d24"],[0.3,"#c47e6c"],[0.45,"#f6cdbd"],[0.6,"#b46e5d"],[1,"#4d241c"]])}

  <!-- label paper -->
  <linearGradient id="tb-paper" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0" stop-color="#f8f2e4"/><stop offset="1" stop-color="#e8dcc2"/>
  </linearGradient>
  <linearGradient id="tb-label-curve" x1="0" x2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".4"/>
    <stop offset=".18" stop-color="#000" stop-opacity="0"/>
    <stop offset=".35" stop-color="#fff" stop-opacity=".25"/>
    <stop offset=".55" stop-color="#000" stop-opacity="0"/>
    <stop offset=".88" stop-color="#000" stop-opacity=".18"/>
    <stop offset="1" stop-color="#000" stop-opacity=".45"/>
  </linearGradient>

  <!-- hanging tags -->
  <linearGradient id="tb-tag-soon" x1="0" x2="1" y1="0" y2="1">
    <stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#e09a1a"/>
  </linearGradient>
  <linearGradient id="tb-tag-past" x1="0" x2="1" y1="0" y2="1">
    <stop offset="0" stop-color="#ff7a6e"/><stop offset="1" stop-color="#b3201f"/>
  </linearGradient>
</defs></svg>`;function st(t,e,i){return c`
    <div class="form">
      <label class="field wide">
        Tipo
        <div class="types">
          ${Object.entries(t.types).map(([s,a])=>c`<button type="button" class="chip ${e.type===s?"active":""}"
              @click=${()=>i("type",s)}><span class="dot" style="background:${a.color}"></span>${a.label}</button>`)}
        </div>
      </label>
      ${D.map((s)=>{let a=s.key==="name"||s.kind==="area",r=e[s.key]??"",n=(o)=>i(s.key,o.target.value);return c`<label class="field ${a?"wide":""}">
          ${s.label}
          ${s.kind==="area"?c`<textarea rows="2" .value=${r} @input=${n}></textarea>`:c`<input
                type=${s.kind==="text"?"text":"number"}
                inputmode=${s.kind==="text"?"text":"numeric"}
                step=${s.kind==="number"?"0.01":"1"}
                .value=${String(r)}
                @input=${n}
              />`}
        </label>`})}
    </div>
  `}class it extends b{constructor(){super(...arguments);this.rackId=null;this.row=null;this.col=null;this._values={type:"red"};this._quantity=1;this._busy=!1}static styles=x;_close(){this.dispatchEvent(new CustomEvent("close"))}async _save(){if(!String(this._values.name||"").trim()){this.card.toast("Scrivi almeno il nome del vino");return}this._busy=!0;try{let e=(await this.card.ws({type:"taponbon/add_bottles",wine:this._values,quantity:this._quantity,rack_id:this.rackId,row:this.row,col:this.col})).bottles,i=e.filter((s)=>!s.rack_id).length;this.card.toast(i?`Aggiunte ${e.length} bottiglie, ${i} da sistemare: scaffale pieno`:e.length>1?`Aggiunte ${e.length} bottiglie`:"Bottiglia aggiunta"),this._close()}finally{this._busy=!1}}render(){let t=this.data.racks.find((i)=>i.id===this.rackId),e=t&&this.row!=null&&this.col!=null?`${t.name}, fila ${this.row+1}, posto ${this.col+1}`:"nel primo posto libero";return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(i)=>i.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Aggiungi vino</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${st(this.data,this._values,(i,s)=>this._values={...this._values,[i]:s})}
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
    `}}d([g({attribute:!1})],it.prototype,"card",void 0),d([g({attribute:!1})],it.prototype,"data",void 0),d([g({attribute:!1})],it.prototype,"rackId",void 0),d([g({attribute:!1})],it.prototype,"row",void 0),d([g({attribute:!1})],it.prototype,"col",void 0),d([u()],it.prototype,"_values",void 0),d([u()],it.prototype,"_quantity",void 0),d([u()],it.prototype,"_busy",void 0),it=d([_("tb-add-dialog")],it);class at extends b{constructor(){super(...arguments);this._label=null;this._editing=!1;this._values={};this._sameWine=!0;this._otherReason=!1;this._busy=!1}willUpdate(t){if(t.has("bottle")){if(t.get("bottle")?.id!==this.bottle.id)this._label=null,this._editing=!1,this._loadLabel()}}async _loadLabel(){let t=this.bottle.id;try{let e=await this.card.hass.callWS({type:"taponbon/get_label",bottle_id:t});if(this.bottle.id===t)this._label=e}catch{}}_close(){this.dispatchEvent(new CustomEvent("close"))}_sameWineCount(){let t=(e)=>`${(e.name||"").trim().toLowerCase()}|${(e.producer||"").trim().toLowerCase()}|${e.vintage||""}`;return this.data.bottles.filter((e)=>t(e)===t(this.bottle)).length}async _remove(t){this._busy=!0;try{await this.card.ws({type:"taponbon/remove_bottle",bottle_id:this.bottle.id,reason:t}),this.card.toast(`${E(this.bottle)}: ${this.data.reasons[t]?.toLowerCase()||"tolta"}. La trovi nello storico.`),this._close()}finally{this._busy=!1}}async _saveEdit(){this._busy=!0;try{let t=await this.card.ws({type:"taponbon/update_bottle",bottle_id:this.bottle.id,changes:this._values,same_wine:this._sameWine});this.card.toast(t.updated>1?`Aggiornate ${t.updated} bottiglie`:"Bottiglia aggiornata"),this._editing=!1,this._label=null,this._loadLabel()}finally{this._busy=!1}}async _printOnPrinter(){await this.card.ws({type:"taponbon/request_label",bottle_id:this.bottle.id}),this.card.toast("Etichetta inviata alla stampante")}_printInBrowser(){if(!this._label)return;let t=window.open("","_blank","width=480,height=360");if(!t){this.card.toast("Il browser ha bloccato la finestra di stampa");return}t.document.write(`<!doctype html><html><head><title>Etichetta ${this._label.code}</title>
      <style>@page{size:50mm 30mm;margin:0}html,body{margin:0}img{width:50mm;height:30mm;display:block}</style></head>
      <body><img src="data:image/png;base64,${this._label.png_base64}"
      onload="setTimeout(function(){window.print();window.close();},150)"></body></html>`),t.document.close()}render(){let t=this.bottle,e=this.data.types[t.type];return c`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(i)=>i.stopPropagation()}>
          <div class="dialog-head">
            <div>
              <div class="dialog-title">${E(t)}</div>
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
    `}_renderView(t,e){let i=Mt(t);return c`
      <div class="badges">
        <span class="badge" style="background:${e?.color}">${e?.label||t.type}</span>
        ${t.alert==="closing"?c`<span class="badge warn">Da bere presto</span>`:p}
        ${t.alert==="past"?c`<span class="badge bad">Oltre la finestra</span>`:p}
        <span class="where">📍 ${Rt(t,this.data.racks)}</span>
      </div>
      <dl class="facts">
        ${D.filter((s)=>!["name","producer","vintage","drink_from","drink_until"].includes(s.key)).map((s)=>{let a=t[s.key];if(a==null||a==="")return p;return c`<dt>${s.label}</dt><dd>${s.key==="price"?`${Number(a).toFixed(2)} €`:a}</dd>`})}
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
      <button class="btn" @click=${()=>{this._values=Object.fromEntries(["type",...D.map((t)=>t.key)].map((t)=>[t,this.bottle[t]??""])),this._sameWine=!0,this._editing=!0}}>✏️ Modifica</button>
      <button class="btn" @click=${()=>this._otherReason=!this._otherReason}>Altro…</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${()=>this._remove("drank")}>🍷 Bevuta</button>
    </div>`}_renderEdit(){let t=this._sameWineCount();return c`
      ${st(this.data,this._values,(e,i)=>this._values={...this._values,[e]:i})}
      ${t>1?c`<label class="check"><input type="checkbox" .checked=${this._sameWine}
            @change=${(e)=>this._sameWine=e.target.checked} />
            Applica a tutte le ${t} bottiglie di questo vino</label>`:p}
    `}_renderEditFoot(){return c`<div class="dialog-foot">
      <button class="btn" @click=${()=>this._editing=!1}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${this._saveEdit}>Salva</button>
    </div>`}static styles=[x,y`
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
    `]}d([g({attribute:!1})],at.prototype,"card",void 0),d([g({attribute:!1})],at.prototype,"data",void 0),d([g({attribute:!1})],at.prototype,"bottle",void 0),d([u()],at.prototype,"_label",void 0),d([u()],at.prototype,"_editing",void 0),d([u()],at.prototype,"_values",void 0),d([u()],at.prototype,"_sameWine",void 0),d([u()],at.prototype,"_otherReason",void 0),d([u()],at.prototype,"_busy",void 0),at=d([_("tb-bottle-dialog")],at);class rt extends b{constructor(){super(...arguments);this._drafts={}}_close(){this.dispatchEvent(new CustomEvent("close"))}_draft(t){return{...t,...this._drafts[t.id]}}_set(t,e,i){this._drafts={...this._drafts,[t]:{...this._drafts[t],[e]:i}}}_count(t){return this.data.bottles.filter((e)=>e.rack_id===t).length}async _save(t){let e=this._draft(t),i=await this.card.ws({type:"taponbon/save_rack",rack:e}),s={...this._drafts};delete s[t.id],this._drafts=s,this.card.toast(i.displaced?`Salvato. ${i.displaced} bottiglie sono finite in "Da sistemare".`:"Scaffale salvato")}async _delete(t){let e=this._count(t.id);if(!confirm(`Eliminare "${t.name}"?${e?` Le sue ${e} bottiglie restano in cantina, in "Da sistemare".`:""}`))return;await this.card.ws({type:"taponbon/delete_rack",rack_id:t.id}),this.card.toast("Scaffale eliminato")}async _add(){await this.card.ws({type:"taponbon/save_rack",rack:{name:`Scaffale ${this.data.racks.length+1}`,rows:7,cols:10}})}async _setting(t,e){await this.card.ws({type:"taponbon/update_settings",[t]:e})}render(){let t=this.data.settings;return c`
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
    `}static styles=[x,y`
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
    `]}d([g({attribute:!1})],rt.prototype,"card",void 0),d([g({attribute:!1})],rt.prototype,"data",void 0),d([u()],rt.prototype,"_drafts",void 0),rt=d([_("tb-racks-dialog")],rt);class ot extends b{constructor(){super(...arguments);this._items=null}connectedCallback(){super.connectedCallback(),this._load()}async _load(){let t=await this.card.ws({type:"taponbon/get_history"});this._items=t.history}_close(){this.dispatchEvent(new CustomEvent("close"))}async _restore(t){let e=await this.card.ws({type:"taponbon/restore",history_id:t.history_id});this.card.toast(e.bottle.rack_id?"Rimessa al suo posto":'Rimessa in cantina, in "Da sistemare"'),this._load()}render(){return c`
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
                      <div>${E(t)}</div>
                      <div class="note">${this.data.reasons[t.reason]||t.reason} · ${new Date(t.removed_at).toLocaleDateString("it-IT")}
                        ${t.producer?c` · ${t.producer}`:p}</div>
                    </div>
                    <button class="btn small" @click=${()=>this._restore(t)}>Rimetti</button>
                  </div>`)}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}static styles=[x,y`
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
    `]}d([g({attribute:!1})],ot.prototype,"card",void 0),d([g({attribute:!1})],ot.prototype,"data",void 0),d([u()],ot.prototype,"_items",void 0),ot=d([_("tb-history-dialog")],ot);class nt extends b{constructor(){super(...arguments);this._config={type:"custom:taponbon-card"};this._data=null;this._error="";this._typeFilter="";this._query="";this._dialog=null;this._moving=null;this._toast="";this._subscribing=!1;this._startMove=(t)=>{this._moving=t.detail.bottle,this._dialog=null}}setConfig(t){this._config={...t}}static getStubConfig(){return{type:"custom:taponbon-card"}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}connectedCallback(){if(super.connectedCallback(),this.hass)this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0}updated(t){if(t.has("hass")&&this.hass&&!this._unsub&&!this._subscribing)this._subscribe()}async _subscribe(){if(this._unsub||this._subscribing||!this.hass?.connection)return;this._subscribing=!0;try{this._unsub=await this.hass.connection.subscribeMessage((t)=>{this._data=t,this._error=""},{type:"taponbon/subscribe"})}catch(t){this._error=t?.code==="unknown_command"?"L'integrazione TaponBon non è installata: aggiungila da Impostazioni → Dispositivi e servizi.":`Impossibile caricare la cantina: ${t?.message||t}`}finally{this._subscribing=!1}}async ws(t){try{return await this.hass.callWS(t)}catch(e){throw this.toast(e?.message||"Operazione non riuscita"),e}}toast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",3500)}_onCell(t,e,i,s){if(this._moving){let a=this._moving;if(this._moving=null,s?.id===a.id)return;this.ws({type:"taponbon/move_bottle",bottle_id:a.id,rack_id:t.id,row:e,col:i}).then(()=>this.toast(s?"Bottiglie scambiate di posto":"Bottiglia spostata"));return}this._dialog=s?{kind:"bottle",bottleId:s.id}:{kind:"add",rackId:t.id,row:e,col:i}}render(){let t=this._data;return c`
      <ha-card>
        ${Lt}
        ${this._error?c`<div class="empty">${this._error}</div>`:!t?c`<div class="empty">Carico la cantina…</div>`:this._renderBody(t)}
        ${this._toast?c`<div class="toast">${this._toast}</div>`:p}
      </ha-card>
      ${t?this._renderDialog(t):p}
    `}_renderBody(t){let e=t.bottles.length,i=t.racks.reduce((l,f)=>l+f.rows*f.cols,0),s=t.bottles.filter((l)=>l.alert==="closing").length,a=t.bottles.filter((l)=>l.alert==="past").length,r=t.bottles.filter((l)=>!l.rack_id),n=Object.fromEntries(Object.keys(t.types).map((l)=>[l,t.bottles.filter((f)=>f.type===l).length])),o=Math.max(1,Math.min(6,Math.round(Number(this._config.columns))||0));return c`
      <div class="header">
        <div class="title">
          <span class="logo">🍷</span>
          <div>
            <div class="name">${this._config.title||"TaponBon"}</div>
            <div class="sub">${e} bottiglie · ${i-t.racks.reduce((l,f)=>l+this._inRack(t,f).length,0)} posti liberi</div>
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
            <span class="hint">cartellino dorato: da bere presto · rosso: oltre la finestra</span>
          </div>`:p}

      ${this._moving?c`<div class="banner moving">
            Tocca la nuova posizione per <b>${E(this._moving)}</b>
            <button class="btn small" @click=${()=>this._moving=null}>Annulla</button>
          </div>`:p}

      <div class="filters">
        <button class="chip ${this._typeFilter?"":"active"}" @click=${()=>this._typeFilter=""}>Tutti ${e}</button>
        ${Object.entries(t.types).map(([l,f])=>c`<button
            class="chip ${this._typeFilter===l?"active":""}"
            @click=${()=>this._typeFilter=this._typeFilter===l?"":l}
          ><span class="dot" style="background:${f.color}"></span>${f.label} ${n[l]||0}</button>`)}
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
                  <span class="dot" style="background:${t.types[l.type]?.color}"></span>${E(l)}
                </button>`)}
            </div>
          </div>`:p}
      ${!t.racks.length?c`<div class="empty">Nessuno scaffale: creane uno da ⚙︎.</div>`:p}
    `}_inRack(t,e){return t.bottles.filter((i)=>i.rack_id===e.id&&i.row!=null&&i.col!=null)}_dims(t){return this._typeFilter&&t.type!==this._typeFilter||!Tt(t,this._query)}_renderRack(t,e){let i=this._inRack(t,e),s=new Map(i.map((r)=>[`${r.row}:${r.col}`,r])),a=[];for(let r=0;r<e.rows;r++)for(let n=0;n<e.cols;n++){let o=s.get(`${r}:${n}`),l=o?t.types[o.type]?.color||"#888":"";a.push(c`<button
          class="cell ${o?"full":"free"} ${o&&this._dims(o)?"dim":""} ${o?.alert||""} ${this._moving?.id===o?.id&&o?"moving":""}"
          style=${o?`--bottle:${l}`:""}
          title=${o?`${E(o)}${o.producer?` · ${o.producer}`:""}`:`Fila ${r+1}, posto ${n+1}: libero`}
          @click=${()=>this._onCell(e,r,n,o)}
        >${o?Ot(o.type,o.alert):Ht}</button>`)}return c`
      <div class="rack">
        <div class="rack-head"><span>${e.name}</span><span class="muted">${i.length}/${e.rows*e.cols}</span></div>
        <div class="grid" style="grid-template-columns: repeat(${e.cols}, minmax(0, 34px))">${a}</div>
      </div>
    `}_renderDialog(t){let e=this._dialog;if(!e)return p;let i=()=>this._dialog=null;switch(e.kind){case"add":return c`<tb-add-dialog .card=${this} .data=${t} .rackId=${e.rackId} .row=${e.row} .col=${e.col} @close=${i}></tb-add-dialog>`;case"bottle":{let s=t.bottles.find((a)=>a.id===e.bottleId);if(!s)return p;return c`<tb-bottle-dialog .card=${this} .data=${t} .bottle=${s} @close=${i} @move=${this._startMove}></tb-bottle-dialog>`}case"racks":return c`<tb-racks-dialog .card=${this} .data=${t} @close=${i}></tb-racks-dialog>`;case"history":return c`<tb-history-dialog .card=${this} .data=${t} @close=${i}></tb-history-dialog>`}}static styles=[x,y`
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
        font-family: "Playfair Display", "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 1.55em;
        font-weight: 600;
        letter-spacing: 0.01em;
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
      .cell.full {
        filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5));
      }
      .cell.full:hover {
        transform: translateY(-5px);
        filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.6));
      }
      .cell.free:hover svg path {
        fill: rgba(255, 255, 255, 0.08);
        stroke: rgba(255, 255, 255, 0.45);
      }
      .cell .tag {
        transform-box: fill-box;
        transform-origin: 0 0;
        animation: tb-sway 4s ease-in-out infinite;
      }
      @keyframes tb-sway {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-4deg); }
      }
      .cell.dim {
        opacity: 0.15;
        filter: grayscale(0.7);
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
    `]}d([g({attribute:!1})],nt.prototype,"hass",void 0),d([u()],nt.prototype,"_config",void 0),d([u()],nt.prototype,"_data",void 0),d([u()],nt.prototype,"_error",void 0),d([u()],nt.prototype,"_typeFilter",void 0),d([u()],nt.prototype,"_query",void 0),d([u()],nt.prototype,"_dialog",void 0),d([u()],nt.prototype,"_moving",void 0),d([u()],nt.prototype,"_toast",void 0),nt=d([_("taponbon-card")],nt);window.customCards=window.customCards||[];window.customCards.push({type:"taponbon-card",name:"TaponBon",description:"La tua cantina: scaffali, bottiglie, QR e finestre di beva",preview:!1});export{nt as TaponBonCard};
