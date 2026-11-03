var c=function(t,e,i,s){var a=arguments.length,o=a<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,n;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)if(n=t[l])o=(a<3?n(o):a>3?n(e,i,o):n(e,i))||o;return a>3&&o&&Object.defineProperty(e,i,o),o};var Y=globalThis,Q=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),mt=new WeakMap;class K{constructor(t,e,i){if(this._$cssResult$=!0,i!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Q&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=mt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&mt.set(e,t))}return t}toString(){return this.cssText}}var ft=(t)=>new K(typeof t=="string"?t:t+"",void 0,et),v=(t,...e)=>{let i=t.length===1?t[0]:e.reduce((s,a,o)=>s+((n)=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[o+1],t[0]);return new K(i,t,et)},vt=(t,e)=>{if(Q)t.adoptedStyleSheets=e.map((i)=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of e){let s=document.createElement("style"),a=Y.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}},it=Q?(t)=>t:(t)=>t instanceof CSSStyleSheet?((e)=>{let i="";for(let s of e.cssRules)i+=s.cssText;return ft(i)})(t):t;var{is:qt,defineProperty:Vt,getOwnPropertyDescriptor:Gt,getOwnPropertyNames:Wt,getOwnPropertySymbols:Yt,getPrototypeOf:Qt}=Object,J=globalThis,_t=J.trustedTypes,Kt=_t?_t.emptyScript:"",Jt=J.reactiveElementPolyfillSupport,H=(t,e)=>t,N={toAttribute(t,e){switch(e){case Boolean:t=t?Kt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},X=(t,e)=>!qt(t,e),$t={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;class z extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Vt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:a}=Gt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let n=s?.call(this);a?.call(this,o),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$t}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;let t=Qt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){let e=this.properties,i=[...Wt(e),...Yt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(it(s))}else t!==void 0&&e.push(it(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t)=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t)=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t)=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t)=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:N).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:N;this._$Em=s;let n=o.fromAttribute(e,a.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(t!==void 0){let o=this.constructor;if(s===!1&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??X)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:o}=a,n=this[s];o!==!0||this._$AL.has(s)||n===void 0||this.C(s,void 0,a,n)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((i)=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e)=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e)=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}}z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[H("elementProperties")]=new Map,z[H("finalized")]=new Map,Jt?.({ReactiveElement:z}),(J.reactiveElementVersions??=[]).push("2.1.2");var st=globalThis,xt=(t)=>t,Z=st.trustedTypes,yt=Z?Z.createPolicy("lit-html",{createHTML:(t)=>t}):void 0;var R=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+R,Xt=`<${Ct}>`,L=document,B=()=>L.createComment(""),D=(t)=>t===null||typeof t!="object"&&typeof t!="function",at=Array.isArray,Zt=(t)=>at(t)||typeof t?.[Symbol.iterator]=="function";var U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,kt=/-->/g,wt=/>/g,P=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Et=/'/g,St=/"/g,zt=/^(?:script|style|textarea|title)$/i,rt=(t)=>(e,...i)=>({_$litType$:t,strings:e,values:i}),r=rt(1),x=rt(2),ge=rt(3),O=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),At=new WeakMap,T=L.createTreeWalker(L,129);function Rt(t,e){if(!at(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return yt!==void 0?yt.createHTML(e):e}var te=(t,e)=>{let i=t.length-1,s=[],a,o=e===2?"<svg>":e===3?"<math>":"",n=U;for(let l=0;l<i;l++){let h=t[l],p,u,f=-1,_=0;for(;_<h.length&&(n.lastIndex=_,u=n.exec(h),u!==null);)_=n.lastIndex,n===U?u[1]==="!--"?n=kt:u[1]!==void 0?n=wt:u[2]!==void 0?(zt.test(u[2])&&(a=RegExp("</"+u[2],"g")),n=P):u[3]!==void 0&&(n=P):n===P?u[0]===">"?(n=a??U,f=-1):u[1]===void 0?f=-2:(f=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?P:u[3]==='"'?St:Et):n===St||n===Et?n=P:n===kt||n===wt?n=U:(n=P,a=void 0);let C=n===P&&t[l+1].startsWith("/>")?" ":"";o+=n===U?h+Xt:f>=0?(s.push(p),h.slice(0,f)+"$lit$"+h.slice(f)+R+C):h+R+(f===-2?l:C)}return[Rt(t,o+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class F{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0,n=t.length-1,l=this.parts,[h,p]=te(t,e);if(this.el=F.createElement(h,i),T.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=T.nextNode())!==null&&l.length<n;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith("$lit$")){let f=p[o++],_=s.getAttribute(u).split(R),C=/([.?@])?(.*)/.exec(f);l.push({type:1,index:a,name:C[2],strings:_,ctor:C[1]==="."?Pt:C[1]==="?"?Tt:C[1]==="@"?Lt:q}),s.removeAttribute(u)}else u.startsWith(R)&&(l.push({type:6,index:a}),s.removeAttribute(u));if(zt.test(s.tagName)){let u=s.textContent.split(R),f=u.length-1;if(f>0){s.textContent=Z?Z.emptyScript:"";for(let _=0;_<f;_++)s.append(u[_],B()),T.nextNode(),l.push({type:2,index:++a});s.append(u[f],B())}}}else if(s.nodeType===8)if(s.data===Ct)l.push({type:2,index:a});else{let u=-1;for(;(u=s.data.indexOf(R,u+1))!==-1;)l.push({type:7,index:a}),u+=R.length-1}a++}}static createElement(t,e){let i=L.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,s){if(e===O)return e;let a=s!==void 0?i._$Co?.[s]:i._$Cl,o=D(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),o===void 0?a=void 0:(a=new o(t),a._$AT(t,i,s)),s!==void 0?(i._$Co??=[])[s]=a:i._$Cl=a),a!==void 0&&(e=I(t,a._$AS(t,e.values),a,s)),e}class Mt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);T.currentNode=s;let a=T.nextNode(),o=0,n=0,l=i[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new j(a,a.nextSibling,this,t):l.type===1?h=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(h=new Ot(a,this,t)),this._$AV.push(h),l=i[++n]}o!==l?.index&&(a=T.nextNode(),o++)}return T.currentNode=L,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class j{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),D(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=F.createElement(Rt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new Mt(s,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(t){let e=At.get(t.strings);return e===void 0&&At.set(t.strings,e=new F(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let a of t)s===e.length?e.push(i=new j(this.O(B()),this.O(B()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=xt(t).nextSibling;xt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){let a=this.strings,o=!1;if(a===void 0)t=I(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==O,o&&(this._$AH=t);else{let n=t,l,h;for(t=a[0],l=0;l<a.length-1;l++)h=I(this,n[i+l],e,l),h===O&&(h=this._$AH[l]),o||=!D(h)||h!==this._$AH[l],h===d?t=d:t!==d&&(t+=(h??"")+a[l+1]),this._$AH[l]=h}o&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pt extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Tt extends q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Lt extends q{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=I(this,t,e,0)??d)===O)return;let i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}var ee=st.litHtmlPolyfillSupport;ee?.(F,j),(st.litHtmlVersions??=[]).push("3.3.2");var It=(t,e,i)=>{let s=i?.renderBefore??e,a=s._$litPart$;if(a===void 0){let o=i?.renderBefore??null;s._$litPart$=a=new j(e.insertBefore(B(),o),o,void 0,i??{})}return a._$AI(t),a};var ot=globalThis;class m extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=It(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}}m._$litElement$=!0,m.finalized=!0,ot.litElementHydrateSupport?.({LitElement:m});var ie=ot.litElementPolyfillSupport;ie?.({LitElement:m});(ot.litElementVersions??=[]).push("4.2.2");var y=(t)=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var se={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:X},ae=(t=se,e,i)=>{let{kind:s,metadata:a}=i,o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),s==="accessor"){let{name:n}=i;return{set(l){let h=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,h,t,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,t,l),l}}}if(s==="setter"){let{name:n}=i;return function(l){let h=this[n];e.call(this,l),this.requestUpdate(n,h,t,!0,l)}}throw Error("Unsupported decorator location: "+s)};function g(t){return(e,i)=>typeof i=="object"?ae(t,e,i):((s,a,o)=>{let n=a.hasOwnProperty(o);return a.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(a,o):void 0})(t,e,i)}function b(t){return g({...t,state:!0,attribute:!1})}function V(t){return t.shelves?.length?t.shelves:Array(t.rows).fill(t.cols)}function G(t){return V(t).reduce((e,i)=>e+i,0)}var W=[{key:"name",label:"Nome del vino",kind:"text"},{key:"producer",label:"Produttore",kind:"text"},{key:"vintage",label:"Annata",kind:"year"},{key:"region",label:"Regione / denominazione",kind:"text"},{key:"country",label:"Paese",kind:"text"},{key:"grape",label:"Vitigno",kind:"text"},{key:"drink_from",label:"Da bere dal",kind:"year"},{key:"drink_until",label:"Da bere entro il",kind:"year"},{key:"alcohol",label:"Gradazione",kind:"text"},{key:"price",label:"Prezzo (€)",kind:"number"},{key:"food_pairings",label:"Abbinamenti",kind:"area"},{key:"description",label:"Descrizione",kind:"area"},{key:"notes",label:"Note personali",kind:"area"}];function w(t){return`${t.name||"Vino"}${t.vintage?` ${t.vintage}`:""}`}function Nt(t,e){let i=e.find((s)=>s.id===t.rack_id);if(!i||t.row==null||t.col==null)return"Da sistemare";return`${i.name} · mensola ${t.row+1}, posto ${t.col+1}`}function Ut(t){if(t.drink_from&&t.drink_until)return`${t.drink_from}–${t.drink_until}`;if(t.drink_until)return`entro il ${t.drink_until}`;if(t.drink_from)return`dal ${t.drink_from}`;return""}function Ht(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}function Bt(t,e){if(!e)return!0;let i=Ht([t.name,t.producer,t.vintage,t.region,t.country,t.grape,t.notes,t.code].filter(Boolean).join(" "));return Ht(e).split(/\s+/).every((s)=>i.includes(s))}var k=v`
  :host {
    --tb-accent: #9b2c3f;
    --tb-accent-2: #6b1424;
    --tb-gold: #d8b46a;
    --tb-ink: #f2ebe3;
    --tb-ink-2: #a89d93;
    --tb-line: rgba(255, 255, 255, 0.08);
    --tb-panel: linear-gradient(180deg, #211c1d 0%, #151213 100%);
    --tb-field: rgba(255, 255, 255, 0.045);
    --tb-serif: "Playfair Display", "Cormorant Garamond", Georgia, "Times New Roman", serif;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  .btn {
    border: 1px solid var(--tb-line);
    background: rgba(255, 255, 255, 0.04);
    color: var(--tb-ink, var(--primary-text-color));
    border-radius: 999px;
    padding: 8px 16px;
    font: inherit;
    font-size: 0.9em;
    letter-spacing: 0.01em;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }
  .btn:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.16);
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .btn.primary {
    background: linear-gradient(180deg, var(--tb-accent), var(--tb-accent-2));
    border-color: rgba(255, 255, 255, 0.12);
    color: #fff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 6px 16px rgba(155, 44, 63, 0.35);
  }
  .btn.primary:hover {
    filter: brightness(1.1);
  }
  .btn.danger {
    color: #ff8a80;
  }
  .btn.small {
    padding: 5px 12px;
    font-size: 0.82em;
  }
  .btn.icon {
    width: 36px;
    height: 36px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid var(--tb-line);
    background: rgba(255, 255, 255, 0.03);
    color: var(--tb-ink, var(--primary-text-color));
    border-radius: 999px;
    padding: 6px 13px;
    font: inherit;
    font-size: 0.85em;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .chip:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
  .chip.active {
    background: rgba(155, 44, 63, 0.28);
    border-color: rgba(216, 120, 136, 0.55);
    color: #fff;
  }
  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
    flex: none;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
  }

  /* dialogs */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(6, 4, 5, 0.62);
    backdrop-filter: blur(10px) saturate(120%);
    -webkit-backdrop-filter: blur(10px) saturate(120%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 14px;
    animation: tb-fade 0.18s ease-out;
  }
  .dialog {
    background: var(--tb-panel);
    color: var(--tb-ink);
    border: 1px solid var(--tb-line);
    border-radius: 24px;
    width: min(580px, 100%);
    max-height: 92vh;
    overflow: auto;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    animation: tb-rise 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
    scrollbar-width: thin;
  }
  @keyframes tb-fade {
    from { opacity: 0; }
  }
  @keyframes tb-rise {
    from { opacity: 0; transform: translateY(14px) scale(0.98); }
  }
  .dialog-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 22px 24px 8px;
    gap: 12px;
  }
  .eyebrow {
    font-size: 0.7em;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--tb-gold);
    margin-bottom: 4px;
  }
  .dialog-title {
    font-family: var(--tb-serif);
    font-size: 1.55em;
    font-weight: 600;
    line-height: 1.15;
  }
  .dialog-body {
    padding: 10px 24px 16px;
  }
  .dialog-foot {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 14px 24px 22px;
    border-top: 1px solid var(--tb-line);
  }
  .close {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--tb-line);
    color: var(--tb-ink-2);
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font-size: 1em;
    cursor: pointer;
    flex: none;
  }
  .close:hover {
    color: var(--tb-ink);
    background: rgba(255, 255, 255, 0.1);
  }
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 14px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.74em;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--tb-ink-2);
  }
  .field.wide {
    grid-column: 1 / -1;
  }
  .form > *,
  .field {
    min-width: 0;
  }
  .field input,
  .field textarea {
    width: 100%;
    min-width: 0;
  }
  .field input,
  .field textarea,
  .field select {
    font: inherit;
    font-size: 1.32em;
    letter-spacing: normal;
    text-transform: none;
    color: var(--tb-ink);
    background: var(--tb-field);
    border: 1px solid var(--tb-line);
    border-radius: 12px;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .field input:focus,
  .field textarea:focus {
    border-color: rgba(216, 120, 136, 0.6);
    box-shadow: 0 0 0 3px rgba(155, 44, 63, 0.25);
  }
  .types {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    text-transform: none;
    letter-spacing: normal;
  }
  .field .types {
    font-size: 1.3em;
  }
  .note {
    font-size: 0.85em;
    color: var(--tb-ink-2);
  }
  .section {
    font-size: 0.72em;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--tb-gold);
    margin: 22px 0 10px;
  }
  .stepper {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--tb-line);
    border-radius: 999px;
    background: var(--tb-field);
    overflow: hidden;
  }
  .stepper button {
    width: 34px;
    height: 32px;
    border: none;
    background: none;
    color: var(--tb-ink);
    font-size: 1.1em;
    cursor: pointer;
  }
  .stepper button:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  .stepper span {
    min-width: 30px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }
  @media (max-width: 480px) {
    .form {
      grid-template-columns: 1fr;
    }
    .dialog-head,
    .dialog-body,
    .dialog-foot {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  .stars {
    display: inline-flex;
    gap: 1px;
    line-height: 1;
    vertical-align: -1px;
  }
  .star {
    color: rgba(255, 255, 255, 0.18);
    font-size: 0.95em;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
  }
  .star.on {
    color: #e3b341;
  }
  .star.half {
    background: linear-gradient(90deg, #e3b341 50%, rgba(255, 255, 255, 0.18) 50%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .stars.big .star {
    font-size: 2.1em;
    padding: 0 3px;
  }
  .stars.edit .star {
    cursor: pointer;
    transition: transform 0.12s ease;
  }
  .stars.edit .star:hover {
    transform: scale(1.15);
  }
`;var Dt={red:{shape:"bordeaux",glass:"tb-glass-red",clear:!1,foil:"tb-foil-wine"},white:{shape:"burgundy",glass:"tb-wine-white",clear:!0,foil:"tb-foil-silver"},rose:{shape:"bordeaux",glass:"tb-wine-rose",clear:!0,foil:"tb-foil-rose"},sparkling:{shape:"champagne",glass:"tb-glass-green",clear:!1,foil:"tb-foil-gold"},dessert:{shape:"bordeaux",glass:"tb-glass-amber",clear:!1,foil:"tb-foil-gold"}},nt={bordeaux:{body:"M9.7 1h4.6v16.5c0 3.4 6.7 4.8 6.7 11.5v31.2c0 1.5-1.2 2.8-2.8 2.8H5.8C4.2 63 3 61.7 3 60.2V29c0-6.7 6.7-8.1 6.7-11.5z",foil:"M9.5 1.4c0-.8.5-1.4 1.3-1.4h2.4c.8 0 1.3.6 1.3 1.4V13H9.5z",label:[4.4,35,15.2,16.5],neckY:15,fillY:22},burgundy:{body:"M9.8 1h4.4v13c0 5 7 9 7 18v28.2c0 1.5-1.2 2.8-2.8 2.8H5.6c-1.6 0-2.8-1.3-2.8-2.8V32c0-9 7-13 7-18z",foil:"M9.6 1.4c0-.8.5-1.4 1.3-1.4h2.2c.8 0 1.3.6 1.3 1.4V12H9.6z",label:[4.2,36,15.6,16],neckY:13.5,fillY:19},champagne:{body:"M9.4 1h5.2v11c0 6 7.6 9.5 7.6 19v29.4c0 1.4-1.2 2.6-2.6 2.6H4.4C3 63 1.8 61.8 1.8 60.4V31c0-9.5 7.6-13 7.6-19z",foil:"M9 1.6C9 .7 9.7 0 10.6 0h2.8c.9 0 1.6.7 1.6 1.6V12c0 2.4 2.6 4.4 4.3 6.6l-14.6.1C6.4 16.4 9 14.4 9 12z",label:[3.6,37,16.8,13],neckY:20,fillY:20},half:{body:"M10 20h4v9c0 2.6 5.2 3.6 5.2 8.8v22.6c0 1.4-1.1 2.6-2.5 2.6H7.3c-1.4 0-2.5-1.2-2.5-2.6V37.8c0-5.2 5.2-6.2 5.2-8.8z",foil:"M9.8 20.9c0-.5.4-.9.9-.9h2.6c.5 0 .9.4.9.9V28H9.8z",label:[6,44,12,11],neckY:30,fillY:33}};function S(t,e){let i=Dt[t]||Dt.red,s=nt[i.shape],[a,o,n,l]=s.label,h=a+n/2;return x`<svg viewBox="0 0 24 64" aria-hidden="true">
    <ellipse cx="12" cy="63.2" rx="9.5" ry="1" fill="rgba(0,0,0,.55)" filter="url(#tb-soft)"/>
    ${i.clear?x`<path d=${s.body} fill="url(#tb-glass-clear)"/>
            <path d=${s.body} fill=${`url(#${i.glass})`} clip-path=${`url(#tb-fill-${i.shape})`}/>
            <rect x="0" y=${s.fillY} width="24" height=".5" fill="rgba(255,255,255,.35)" clip-path=${`url(#tb-in-${i.shape})`}/>`:x`<path d=${s.body} fill=${`url(#${i.glass})`}/>`}
    <path d=${s.body} fill="url(#tb-cylinder)"/>
    <path d=${s.body} fill="none" stroke="rgba(255,255,255,.18)" stroke-width=".35"/>
    <ellipse cx="12" cy="61.4" rx="6.5" ry="1.3" fill="rgba(0,0,0,.35)" clip-path=${`url(#tb-in-${i.shape})`}/>
    <g class="label-group">
      <rect x=${a} y=${o} width=${n} height=${l} rx=".5" fill="url(#tb-paper)"/>
      <rect x=${a} y=${o} width=${n} height=${l} rx=".5" fill="url(#tb-label-curve)"/>
      <rect x=${a+0.9} y=${o+0.9} width=${n-1.8} height=${l-1.8} rx=".3" fill="none" stroke="rgba(120,90,50,.55)" stroke-width=".25"/>
      <circle cx=${h} cy=${o+l*0.3} r=${Math.min(n,l)*0.12} fill="none" stroke="rgba(120,80,30,.8)" stroke-width=".3"/>
      <rect x=${h-n*0.3} y=${o+l*0.55} width=${n*0.6} height=".9" rx=".45" fill="rgba(40,20,15,.75)"/>
      <rect x=${h-n*0.22} y=${o+l*0.7} width=${n*0.44} height=".5" rx=".25" fill="rgba(40,20,15,.45)"/>
      <rect x=${h-n*0.15} y=${o+l*0.8} width=${n*0.3} height=".5" rx=".25" fill="rgba(40,20,15,.35)"/>
    </g>
    <path d=${s.foil} fill=${`url(#${i.foil})`}/>
    <path d=${s.foil} fill="url(#tb-cylinder)" opacity=".6"/>
    <path d="M5.4 30c.6-3.8 2.6-5.6 3.6-6.8V59.5H5.4z" fill="url(#tb-spec)" clip-path=${`url(#tb-in-${i.shape})`} opacity=".9"/>
    <rect x="17.6" y="31" width=".9" height="27" rx=".45" fill="rgba(255,255,255,.18)" clip-path=${`url(#tb-in-${i.shape})`}/>
    ${e?re(s.neckY,e):d}
  </svg>`}function re(t,e){let i=e==="past"?"url(#tb-tag-past)":"url(#tb-tag-soon)";return x`<g class="tag">
    <path d=${`M12 ${t}c3 .2 4.6 1 5.4 2.6`} fill="none" stroke="rgba(240,230,210,.85)" stroke-width=".35"/>
    <g transform=${`translate(16.4 ${t+2}) rotate(14)`}>
      <rect x="0" y="0" width="6.4" height="8.6" rx="1.1" fill=${i} stroke="rgba(0,0,0,.35)" stroke-width=".25"/>
      <circle cx="3.2" cy="1.4" r=".55" fill="rgba(0,0,0,.45)"/>
      ${e==="past"?x`<path d="M3.2 3.3v2.6M3.2 7v.1" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>`:x`<circle cx="3.2" cy="5.4" r="1.9" fill="none" stroke="#3b2200" stroke-width=".45"/>
              <path d="M3.2 4.3v1.2l.8.6" fill="none" stroke="#3b2200" stroke-width=".45" stroke-linecap="round"/>`}
    </g>
  </g>`}var Ft=x`<svg viewBox="0 0 24 64" aria-hidden="true">
  <path d=${nt.bordeaux.body} fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" stroke-width=".45" stroke-dasharray="1.4 1.2"/>
</svg>`,oe=(t)=>{let e=nt[t];return x`
    <clipPath id=${`tb-in-${t}`}><path d=${e.body}/></clipPath>
    <clipPath id=${`tb-fill-${t}`}><rect x="0" y=${e.fillY} width="24" height="64"/></clipPath>`},E=(t,e)=>x`<linearGradient id=${t} x1="0" x2="1" y1="0" y2="0">
  ${e.map(([i,s])=>x`<stop offset=${i} stop-color=${s}/>`)}
</linearGradient>`,A=x`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="tb-soft" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation=".6"/></filter>
  ${["bordeaux","burgundy","champagne","half"].map(oe)}

  <!-- glass and wine -->
  ${E("tb-glass-red",[[0,"#060404"],[0.18,"#1c0a0d"],[0.42,"#3b0f18"],[0.6,"#2a0a11"],[1,"#050303"]])}
  ${E("tb-glass-green",[[0,"#030603"],[0.2,"#0e2412"],[0.42,"#1d4223"],[0.62,"#12301a"],[1,"#020402"]])}
  ${E("tb-glass-amber",[[0,"#160902"],[0.2,"#5a2c08"],[0.42,"#9c5714"],[0.62,"#6e3a0c"],[1,"#120701"]])}
  ${E("tb-wine-white",[[0,"#5a4a12"],[0.2,"#b9a043"],[0.42,"#ecd98e"],[0.62,"#cdb158"],[1,"#4d3e0e"]])}
  ${E("tb-wine-rose",[[0,"#b87a6d"],[0.2,"#d9917c"],[0.42,"#f0b3a0"],[0.62,"#e39a83"],[1,"#c48a7c"]])}
  ${E("tb-glass-clear",[[0,"rgba(190,215,200,.30)"],[0.3,"rgba(230,245,235,.10)"],[0.7,"rgba(230,245,235,.08)"],[1,"rgba(160,190,175,.35)"]])}

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
  ${E("tb-foil-wine",[[0,"#1d0508"],[0.3,"#7a1d2b"],[0.45,"#c4515f"],[0.6,"#6a1523"],[1,"#150305"]])}
  ${E("tb-foil-gold",[[0,"#5a3a08"],[0.3,"#c9962e"],[0.45,"#ffe7a1"],[0.6,"#b88421"],[1,"#4a2f05"]])}
  ${E("tb-foil-silver",[[0,"#3c3c3c"],[0.3,"#a9a9a9"],[0.45,"#f2f2f2"],[0.6,"#9a9a9a"],[1,"#2e2e2e"]])}
  ${E("tb-foil-rose",[[0,"#5e2d24"],[0.3,"#c47e6c"],[0.45,"#f6cdbd"],[0.6,"#b46e5d"],[1,"#4d241c"]])}

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
</defs></svg>`;function dt(t,e,i){return r`
    <div class="form">
      <label class="field wide">
        Tipo
        <div class="types">
          ${Object.entries(t.types).map(([s,a])=>r`<button type="button" class="chip ${e.type===s?"active":""}"
              @click=${()=>i("type",s)}><span class="dot" style="background:${a.color}"></span>${a.label}</button>`)}
        </div>
      </label>
      ${W.map((s)=>{let a=s.key==="name"||s.kind==="area",o=e[s.key]??"",n=(l)=>i(s.key,l.target.value);return r`<label class="field ${a?"wide":""}">
          ${s.label}
          ${s.kind==="area"?r`<textarea rows="2" .value=${o} @input=${n}></textarea>`:r`<input
                type=${s.kind==="text"?"text":"number"}
                inputmode=${s.kind==="text"?"text":"numeric"}
                step=${s.kind==="number"?"0.01":"1"}
                .value=${String(o)}
                @input=${n}
              />`}
        </label>`})}
    </div>
  `}class lt extends m{constructor(){super(...arguments);this.rackId=null;this.row=null;this.col=null;this._values={type:"red"};this._quantity=1;this._busy=!1;this._reading="";this._front="";this._back=""}static styles=[k,v`
      .ai {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        align-items: center;
        padding: 14px;
        margin-bottom: 16px;
        border-radius: 16px;
        border: 1px solid rgba(216, 180, 106, 0.25);
        background:
          radial-gradient(120% 140% at 0% 0%, rgba(216, 180, 106, 0.12), transparent 55%),
          rgba(255, 255, 255, 0.025);
      }
      .ai-title {
        font-weight: 600;
      }
      .ai .note {
        margin-top: 2px;
      }
      .slots {
        display: flex;
        gap: 8px;
      }
      .slot {
        position: relative;
        width: 74px;
        height: 96px;
        border-radius: 12px;
        border: 1px dashed rgba(216, 180, 106, 0.45);
        background: rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        cursor: pointer;
        overflow: hidden;
        transition: border-color 0.15s, background 0.15s;
      }
      .slot:hover {
        border-color: var(--tb-gold);
        background: rgba(216, 180, 106, 0.08);
      }
      .slot.has {
        border-style: solid;
      }
      .slot.off {
        opacity: 0.4;
        cursor: default;
      }
      .slot img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .slot .plus {
        font-size: 1.4em;
      }
      .slot-label {
        position: relative;
        font-size: 0.72em;
        text-align: center;
        line-height: 1.15;
        padding: 2px 6px;
        border-radius: 8px;
      }
      .slot.has .slot-label {
        margin-top: auto;
        margin-bottom: 6px;
        background: rgba(0, 0, 0, 0.65);
      }
      .slot-label small {
        display: block;
        color: var(--tb-ink-2);
        font-size: 0.9em;
      }
      .reading {
        grid-column: 1 / -1;
        height: 3px;
        border-radius: 2px;
        background: linear-gradient(90deg, transparent, var(--tb-gold), transparent);
        background-size: 40% 100%;
        background-repeat: no-repeat;
        animation: tb-scan 1.1s linear infinite;
      }
      @keyframes tb-scan {
        from { background-position: -40% 0; }
        to { background-position: 140% 0; }
      }
      input[type="file"] {
        display: none;
      }
    `];_merge(t,e){let i={...this._values};for(let[s,a]of Object.entries(t)){if(a===null||a===void 0||a==="")continue;if(e||i[s]===void 0||i[s]===null||String(i[s]).trim()==="")i[s]=a}this._values=i}async _photo(t,e){let i=t.target,s=i.files?.[0];if(i.value="",!s)return;let a=await ne(s);if(e==="front")this._front=a;else this._back=a;if(this._front)await this._read()}async _read(){this._reading=this._back?"Leggo fronte e retro…":"Leggo l'etichetta…";try{let t=await this.card.ws({type:"taponbon/ai_recognize",image:this._front,...this._back?{back_image:this._back}:{}});this._merge(t.wine,!0),this.card.toast(this._back?"Fronte e retro letti: controlla i dati":"Etichetta letta: controlla i dati")}catch{}finally{this._reading=""}}_slot(t){let e=t==="front"?this._front:this._back,i=t==="front"?"Fronte":"Retro",s=!!this._reading||t==="back"&&!this._front;return r`<label class="slot ${e?"has":""} ${s?"off":""}"
        title=${t==="back"&&!this._front?"Prima fotografa il fronte":`Foto ${i.toLowerCase()}`}>
      ${e?r`<img src=${e} alt=${i} />`:r`<span class="plus">📷</span>`}
      <span class="slot-label">${i}${t==="back"&&!e?r`<small>facoltativo</small>`:d}</span>
      <input type="file" accept="image/*" capture="environment" ?disabled=${s}
        @change=${(a)=>this._photo(a,t)} />
    </label>`}async _fill(){if(!String(this._values.name||"").trim()){this.card.toast("Scrivi almeno il nome del vino");return}this._reading="Completo i dati…";try{let t=await this.card.ws({type:"taponbon/ai_fill",wine:this._values});this._merge(t.wine,!1),this.card.toast("Dati completati")}catch{}finally{this._reading=""}}_renderAI(){if(!this.data.ai)return r`<div class="ai"><div>
        <div class="ai-title">✨ Compilazione automatica</div>
        <div class="note">Aggiungi una chiave Gemini (gratuita) in Impostazioni → Dispositivi e servizi → TaponBon → Configura per leggere le etichette con una foto.</div>
      </div></div>`;return r`<div class="ai">
      <div class="slots">${this._slot("front")}${this._slot("back")}</div>
      <div class="ai-side">
        <div class="ai-title">✨ Compilazione automatica</div>
        <div class="note">${this._reading||(this._front?"Fatto. Se in etichetta mancava qualcosa, aggiungi il retro.":"Fotografa il fronte dell'etichetta; il retro è facoltativo.")}</div>
        <button class="btn small" style="margin-top:8px" ?disabled=${!!this._reading} @click=${this._fill}>Oppure completa dal nome</button>
      </div>
      ${this._reading?r`<div class="reading"></div>`:d}
    </div>`}_close(){this.dispatchEvent(new CustomEvent("close"))}async _save(){if(!String(this._values.name||"").trim()){this.card.toast("Scrivi almeno il nome del vino");return}this._busy=!0;try{let e=(await this.card.ws({type:"taponbon/add_bottles",wine:this._values,quantity:this._quantity,rack_id:this.rackId,row:this.row,col:this.col})).bottles,i=e.filter((s)=>!s.rack_id).length;this.card.toast(i?`Aggiunte ${e.length} bottiglie, ${i} da sistemare: scaffale pieno`:e.length>1?`Aggiunte ${e.length} bottiglie`:"Bottiglia aggiunta"),this._close()}finally{this._busy=!1}}render(){let t=this.data.racks.find((i)=>i.id===this.rackId),e=t&&this.row!=null&&this.col!=null?`${t.name}, mensola ${this.row+1}, posto ${this.col+1}`:"nel primo posto libero";return r`
      ${A}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(i)=>i.stopPropagation()}>
          <div class="dialog-head">
            <div style="display:flex;gap:16px;align-items:flex-end">
              <div style="width:34px;flex:none;filter:drop-shadow(0 8px 10px rgba(0,0,0,.55))">${S(this._values.type||"red")}</div>
              <div>
                <div class="eyebrow">Nuovo in cantina</div>
                <div class="dialog-title">${String(this._values.name||"").trim()||"Aggiungi vino"}</div>
              </div>
            </div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this._renderAI()}
            ${dt(this.data,this._values,(i,s)=>this._values={...this._values,[i]:s})}
            <div class="form" style="margin-top:10px">
              <label class="field">
                Quante bottiglie
                <input type="number" min="1" max="100" .value=${String(this._quantity)}
                  @input=${(i)=>this._quantity=Math.max(1,Math.min(100,Number(i.target.value)||1))} />
              </label>
              <div class="field">Dove<span style="color:var(--tb-ink);text-transform:none;letter-spacing:normal;font-size:1.3em">${e}${this._quantity>1?" e i successivi":""}</span></div>
            </div>
            ${this.data.settings.auto_labels?r`<p class="note">Per ogni bottiglia verrà richiesta la stampa dell'etichetta QR.</p>`:d}
          </div>
          <div class="dialog-foot">
            <button class="btn" @click=${this._close}>Annulla</button>
            <button class="btn primary" ?disabled=${this._busy} @click=${this._save}>
              ${this._busy?"Salvo…":`Aggiungi ${this._quantity>1?`${this._quantity} bottiglie`:"bottiglia"}`}
            </button>
          </div>
        </div>
      </div>
    `}}c([g({attribute:!1})],lt.prototype,"card",void 0),c([g({attribute:!1})],lt.prototype,"data",void 0),c([g({attribute:!1})],lt.prototype,"rackId",void 0),c([g({attribute:!1})],lt.prototype,"row",void 0),c([g({attribute:!1})],lt.prototype,"col",void 0),c([b()],lt.prototype,"_values",void 0),c([b()],lt.prototype,"_quantity",void 0),c([b()],lt.prototype,"_busy",void 0),c([b()],lt.prototype,"_reading",void 0),c([b()],lt.prototype,"_front",void 0),c([b()],lt.prototype,"_back",void 0),lt=c([y("tb-add-dialog")],lt);async function ne(t,e=1280){let i=URL.createObjectURL(t);try{let s=new Image;s.src=i,await s.decode();let a=Math.min(1,e/Math.max(s.naturalWidth,s.naturalHeight)),o=document.createElement("canvas");return o.width=Math.round(s.naturalWidth*a),o.height=Math.round(s.naturalHeight*a),o.getContext("2d").drawImage(s,0,0,o.width,o.height),o.toDataURL("image/jpeg",0.85)}finally{URL.revokeObjectURL(i)}}function M(t,e,i=!1){let s=Number(t)||0;return r`<span class="stars ${i?"big":""} ${e?"edit":""}" role=${e?"radiogroup":d}
    aria-label=${s?`${s} su 5`:"Nessun voto"}>
    ${[1,2,3,4,5].map((a)=>{let o=s>=a?"on":s>=a-0.5?"half":"";return e?r`<button type="button" class="star ${o}" title="${a} su 5" @click=${()=>e(s===a?null:a)}>★</button>`:r`<span class="star ${o}">★</span>`})}
  </span>`}function tt(t){return t?t.toLocaleString("it-IT",{maximumFractionDigits:1}):""}class ct extends m{constructor(){super(...arguments);this._label=null;this._editing=!1;this._values={};this._sameWine=!0;this._otherReason=!1;this._busy=!1;this._rating=!1;this._stars=null;this._tasting=""}willUpdate(t){if(t.has("data")&&this._label&&this.data.settings.label_format!==this._label.label_format)this._label=null,this._loadLabel();if(t.has("bottle")){if(t.get("bottle")?.id!==this.bottle.id)this._label=null,this._editing=!1,this._rating=!1,this._loadLabel()}}async _loadLabel(){let t=this.bottle.id;try{let e=await this.card.hass.callWS({type:"taponbon/get_label",bottle_id:t});if(this.bottle.id===t)this._label=e}catch{}}_close(){this.dispatchEvent(new CustomEvent("close"))}_sameWineCount(){let t=(e)=>`${(e.name||"").trim().toLowerCase()}|${(e.producer||"").trim().toLowerCase()}|${e.vintage||""}`;return this.data.bottles.filter((e)=>t(e)===t(this.bottle)).length}async _remove(t,e=!1){this._busy=!0;try{let i={type:"taponbon/remove_bottle",bottle_id:this.bottle.id,reason:t};if(e){if(this._stars)i.rating=this._stars;if(this._tasting.trim())i.tasting_notes=this._tasting.trim()}await this.card.ws(i),this.card.toast(e&&this._stars?`${w(this.bottle)}: bevuta, voto ${this._stars}/5. Salute!`:`${w(this.bottle)}: ${this.data.reasons[t]?.toLowerCase()||"tolta"}. La trovi nello storico.`),this._close()}finally{this._busy=!1}}async _saveEdit(){this._busy=!0;try{let t=await this.card.ws({type:"taponbon/update_bottle",bottle_id:this.bottle.id,changes:this._values,same_wine:this._sameWine});this.card.toast(t.updated>1?`Aggiornate ${t.updated} bottiglie`:"Bottiglia aggiornata"),this._editing=!1,this._label=null,this._loadLabel()}finally{this._busy=!1}}async _printOnPrinter(){let t=await this.card.ws({type:"taponbon/request_label",bottle_id:this.bottle.id});this.card.toast(t.printed?"Etichetta stampata":this.data.printer?"Stampa non riuscita: guarda le notifiche di Home Assistant":"Richiesta inviata. Per stampare da solo, scegli la stampante nelle opzioni di TaponBon.")}_printInBrowser(){if(!this._label)return;let t=window.open("","_blank","width=480,height=360");if(!t){this.card.toast("Il browser ha bloccato la finestra di stampa");return}let{width_mm:e,height_mm:i}=this._label;t.document.write(`<!doctype html><html><head><title>Etichetta ${this._label.code}</title>
      <style>@page{size:${e}mm ${i}mm;margin:0}html,body{margin:0}img{width:${e}mm;height:${i}mm;display:block}</style></head>
      <body><img src="data:image/png;base64,${this._label.png_base64}"
      onload="setTimeout(function(){window.print();window.close();},150)"></body></html>`),t.document.close()}render(){let t=this.bottle,e=this.data.types[t.type];return r`
      ${A}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(i)=>i.stopPropagation()}>
          <div class="hero">
            <div class="hero-bottle">${S(t.type,t.alert)}</div>
            <div class="hero-text">
              <div class="eyebrow">${e?.label||""}${t.region?` · ${t.region}`:""}</div>
              <div class="dialog-title">${t.name||"Vino"}</div>
              ${t.producer?r`<div class="producer">${t.producer}</div>`:d}
              <div class="vintage">${t.vintage||"s.a."}</div>
            </div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this._rating?this._renderRate():this._editing?this._renderEdit():this._renderView(t,e)}
          </div>
          ${this._rating?this._renderRateFoot():this._editing?this._renderEditFoot():this._renderViewFoot()}
        </div>
      </div>
    `}_renderView(t,e){let i=Ut(t);return r`
      <div class="badges">
        ${t.alert==="closing"?r`<span class="badge warn">Da bere presto</span>`:d}
        ${t.alert==="past"?r`<span class="badge bad">Oltre la finestra</span>`:d}
        <span class="where">📍 ${Nt(t,this.data.racks)}</span>
      </div>
      ${t.past_count||t.past_notes?r`<div class="past">
            <span class="past-head">Già bevuto${t.past_count?r` ${t.past_count===1?"una volta":`${t.past_count} volte`}`:d}</span>
            ${t.past_rating?r`${M(t.past_rating)} <b>${tt(t.past_rating)}</b>`:d}
            ${t.past_notes?r`<div class="past-notes">«${t.past_notes}»</div>`:d}
          </div>`:d}
      <dl class="facts">
        ${W.filter((s)=>!["name","producer","vintage","drink_from","drink_until"].includes(s.key)).map((s)=>{let a=t[s.key];if(a==null||a==="")return d;return r`<dt>${s.label}</dt><dd>${s.key==="price"?`${Number(a).toFixed(2)} €`:a}</dd>`})}
        ${i?r`<dt>Finestra di beva</dt><dd>${i}</dd>`:d}
      </dl>
      <div class="label-box">
        ${this._label?r`<img class="label ${this._label.label_format}" alt="Etichetta QR" src="data:image/png;base64,${this._label.png_base64}" />`:r`<div class="note">Preparo l'etichetta…</div>`}
        <div class="note">Inquadra il QR con l'app Home Assistant quando prendi la bottiglia: verrà tolta dalla cantina.</div>
        <div class="row">
          <button class="btn small" @click=${this._printOnPrinter}>🖨️ Stampante etichette</button>
          <button class="btn small" ?disabled=${!this._label} @click=${this._printInBrowser}>Stampa dal browser</button>
        </div>
      </div>
      ${this._otherReason?r`<div class="reasons">
            ${Object.entries(this.data.reasons).filter(([s])=>s!=="drank").map(([s,a])=>r`<button class="btn small ${s==="deleted"?"danger":""}" ?disabled=${this._busy}
                @click=${()=>this._remove(s)}>${a}</button>`)}
          </div>`:d}
    `}_renderViewFoot(){return r`<div class="dialog-foot">
      <button class="btn" @click=${()=>this.dispatchEvent(new CustomEvent("move",{detail:{bottle:this.bottle}}))}>↔ Sposta</button>
      <button class="btn" @click=${()=>{this._values=Object.fromEntries(["type",...W.map((t)=>t.key)].map((t)=>[t,this.bottle[t]??""])),this._sameWine=!0,this._editing=!0}}>✏️ Modifica</button>
      <button class="btn" @click=${()=>this._otherReason=!this._otherReason}>Altro…</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${()=>{this._stars=null,this._tasting="",this._rating=!0}}>🍷 Bevuta</button>
    </div>`}_renderRate(){return r`<div class="rate">
      <div class="rate-q">Com'era?</div>
      ${M(this._stars,(t)=>this._stars=t,!0)}
      <div class="rate-hint">${["Tocca le stelle per votarla","Deludente","Così così","Buono","Molto buono","Eccezionale"][this._stars||0]}</div>
      <textarea class="tasting" rows="3" maxlength="1000"
        placeholder="Note di degustazione (facoltative): profumi, con cosa l'avete bevuta, se ricomprarla…"
        .value=${this._tasting} @input=${(t)=>this._tasting=t.target.value}></textarea>
      <div class="note">Il voto resta nello storico e aiuta gli abbinamenti a proporti i vini che ti sono piaciuti di più.</div>
    </div>`}_renderRateFoot(){let t=!this._stars&&!this._tasting.trim();return r`<div class="dialog-foot">
      <button class="btn" ?disabled=${this._busy} @click=${()=>this._rating=!1}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${()=>this._remove("drank",!0)}>
        ${t?"Togli senza voto":"\uD83C\uDF77 Salva e togli"}
      </button>
    </div>`}_renderEdit(){let t=this._sameWineCount();return r`
      ${dt(this.data,this._values,(e,i)=>this._values={...this._values,[e]:i})}
      ${t>1?r`<label class="check"><input type="checkbox" .checked=${this._sameWine}
            @change=${(e)=>this._sameWine=e.target.checked} />
            Applica a tutte le ${t} bottiglie di questo vino</label>`:d}
    `}_renderEditFoot(){return r`<div class="dialog-foot">
      <button class="btn" @click=${()=>this._editing=!1}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${this._saveEdit}>Salva</button>
    </div>`}static styles=[k,v`
      .past {
        margin: 2px 0 14px;
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(227, 179, 65, 0.08);
        border: 1px solid rgba(227, 179, 65, 0.22);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        font-size: 0.92em;
      }
      .past-head {
        color: var(--secondary-text-color);
      }
      .past-notes {
        width: 100%;
        font-style: italic;
        color: var(--secondary-text-color);
      }
      .rate {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        text-align: center;
        padding: 4px 0;
      }
      .rate-q {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 1.35em;
      }
      .rate-hint {
        min-height: 1.2em;
        color: #e3b341;
        font-size: 0.9em;
      }
      .tasting {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid var(--tb-line, var(--divider-color));
        background: rgba(255, 255, 255, 0.04);
        color: var(--primary-text-color);
        font: inherit;
        resize: vertical;
      }
      .hero {
        display: flex;
        gap: 18px;
        align-items: flex-end;
        padding: 26px 24px 18px;
        background:
          radial-gradient(90% 120% at 15% 100%, rgba(155, 44, 63, 0.25), transparent 60%),
          radial-gradient(60% 80% at 100% 0%, rgba(216, 180, 106, 0.08), transparent 60%);
        border-bottom: 1px solid var(--tb-line);
        position: relative;
      }
      .hero .close {
        position: absolute;
        top: 16px;
        right: 16px;
      }
      .hero-bottle {
        width: 62px;
        flex: none;
        filter: drop-shadow(0 12px 14px rgba(0, 0, 0, 0.6));
      }
      .hero-bottle svg {
        width: 100%;
        display: block;
        overflow: visible;
      }
      .hero-text {
        min-width: 0;
        padding-bottom: 6px;
      }
      .producer {
        color: var(--tb-ink-2);
        margin-top: 4px;
      }
      .vintage {
        font-family: var(--tb-serif);
        font-size: 2.1em;
        color: var(--tb-gold);
        line-height: 1;
        margin-top: 10px;
      }
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
        color: var(--tb-ink-2);
      }
      .facts {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 4px 12px;
        margin: 0 0 12px;
        font-size: 0.92em;
      }
      dt {
        color: var(--tb-ink-2);
        font-size: 0.85em;
        letter-spacing: 0.04em;
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
        padding: 16px;
        border-radius: 16px;
        border: 1px solid var(--tb-line);
        background: rgba(255, 255, 255, 0.025);
        text-align: center;
      }
      .label.qr,
      .label.qr30 {
        max-width: 140px;
        padding: 6px;
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
    `]}c([g({attribute:!1})],ct.prototype,"card",void 0),c([g({attribute:!1})],ct.prototype,"data",void 0),c([g({attribute:!1})],ct.prototype,"bottle",void 0),c([b()],ct.prototype,"_label",void 0),c([b()],ct.prototype,"_editing",void 0),c([b()],ct.prototype,"_values",void 0),c([b()],ct.prototype,"_sameWine",void 0),c([b()],ct.prototype,"_otherReason",void 0),c([b()],ct.prototype,"_busy",void 0),c([b()],ct.prototype,"_rating",void 0),c([b()],ct.prototype,"_stars",void 0),c([b()],ct.prototype,"_tasting",void 0),ct=c([y("tb-bottle-dialog")],ct);var pt=30;class ht extends m{constructor(){super(...arguments);this._drafts={};this._open=null}_close(){this.dispatchEvent(new CustomEvent("close"))}_draft(t){return this._drafts[t.id]||{name:t.name,shelves:[...V(t)]}}_edit(t,e){let i=this._draft(t),s={name:i.name,shelves:[...i.shelves]};e(s),this._drafts={...this._drafts,[t.id]:s}}_setShelfCount(t,e){this._edit(t,(i)=>{e=Math.max(1,Math.min(pt,e));let s=i.shelves[i.shelves.length-1]||6;while(i.shelves.length<e)i.shelves.push(s);i.shelves.length=e})}_setShelf(t,e,i){this._edit(t,(s)=>s.shelves[e]=Math.max(1,Math.min(pt,i)))}_setAll(t,e){this._edit(t,(i)=>i.shelves=i.shelves.map(()=>Math.max(1,Math.min(pt,e))))}_count(t){return this.data.bottles.filter((e)=>e.rack_id===t).length}async _save(t){let e=this._draft(t),i=await this.card.ws({type:"taponbon/save_rack",rack:{id:t.id,name:e.name,shelves:e.shelves}}),s={...this._drafts};delete s[t.id],this._drafts=s,this.card.toast(i.displaced?`Salvato. ${i.displaced} bottiglie sono finite in "Da sistemare".`:"Scaffale salvato")}async _delete(t){let e=this._count(t.id);if(!confirm(`Eliminare "${t.name}"?${e?` Le sue ${e} bottiglie restano in cantina, in "Da sistemare".`:""}`))return;await this.card.ws({type:"taponbon/delete_rack",rack_id:t.id}),this.card.toast("Scaffale eliminato")}async _add(){let t=await this.card.ws({type:"taponbon/save_rack",rack:{name:`Scaffale ${this.data.racks.length+1}`,shelves:[8,8,8,8,8]}});this._open=t.rack.id}async _setting(t,e){await this.card.ws({type:"taponbon/update_settings",[t]:e})}_stepper(t,e){return r`<span class="stepper">
      <button @click=${()=>e(t-1)} aria-label="meno">−</button>
      <span>${t}</span>
      <button @click=${()=>e(t+1)} aria-label="più">+</button>
    </span>`}_preview(t){let e=Math.max(...t);return r`<div class="preview">
      ${t.map((i)=>r`<div class="pv-shelf">
        <div class="pv-row" style="grid-template-columns: repeat(${i}, 1fr); width: ${i/e*100}%">
          ${Array.from({length:i},()=>r`<i></i>`)}
        </div>
        <div class="pv-board"></div>
      </div>`)}
    </div>`}_renderRack(t){let e=this._draft(t),i=!!this._drafts[t.id],s=this._open===t.id||i,a=e.shelves.every((n)=>n===e.shelves[0]),o=e.shelves.reduce((n,l)=>n+l,0);return r`<div class="rack ${s?"open":""}">
      <button class="rack-sum" @click=${()=>this._open=s&&!i?null:t.id}>
        <span class="rack-name">${e.name}</span>
        <span class="note">${e.shelves.length} mensole · ${o} posti · ${this._count(t.id)} bottiglie</span>
        <span class="chev">${s?"▴":"▾"}</span>
      </button>
      ${s?r`<div class="rack-edit">
            <div class="cols">
              <div class="controls">
                <label class="field">Nome
                  <input .value=${e.name} @input=${(n)=>this._edit(t,(l)=>l.name=n.target.value)} />
                </label>
                <div class="line"><span>Mensole</span>${this._stepper(e.shelves.length,(n)=>this._setShelfCount(t,n))}</div>
                <div class="line">
                  <span>Bottiglie per mensola${a?"":r` <em class="note">(diverse)</em>`}</span>
                  ${this._stepper(a?e.shelves[0]:Math.max(...e.shelves),(n)=>this._setAll(t,n))}
                </div>
                <details ?open=${!a}>
                  <summary>Personalizza ogni mensola</summary>
                  ${e.shelves.map((n,l)=>r`<div class="line small">
                    <span>Mensola ${l+1}${l===0?" (in alto)":l===e.shelves.length-1?" (in basso)":""}</span>
                    ${this._stepper(n,(h)=>this._setShelf(t,l,h))}
                  </div>`)}
                </details>
              </div>
              ${this._preview(e.shelves)}
            </div>
            <div class="rack-foot">
              <button class="btn small danger" @click=${()=>this._delete(t)}>Elimina scaffale</button>
              <span>
                ${i?r`<button class="btn small" @click=${()=>{let n={...this._drafts};delete n[t.id],this._drafts=n}}>Annulla</button>`:d}
                <button class="btn small primary" ?disabled=${!i} @click=${()=>this._save(t)}>Salva</button>
              </span>
            </div>
          </div>`:d}
    </div>`}render(){let t=this.data.settings,e=this.data.racks.reduce((i,s)=>i+G(s),0);return r`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(i)=>i.stopPropagation()}>
          <div class="dialog-head">
            <div>
              <div class="eyebrow">La tua cantina</div>
              <div class="dialog-title">Scaffali e impostazioni</div>
            </div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            <div class="section" style="margin-top:4px">Scaffali · ${e} posti</div>
            ${this.data.racks.map((i)=>this._renderRack(i))}
            <button class="btn" @click=${this._add}>＋ Nuovo scaffale</button>

            <div class="section">Etichette</div>
            <div class="types" style="margin-bottom:12px">
              ${[["qr","Solo QR · 23 × 23 mm"],["qr30","Solo QR · 30 × 30 mm"],["full","QR e dati del vino · 50 × 30 mm"]].map(([i,s])=>r`<button class="chip ${t.label_format===i?"active":""}"
                  @click=${()=>this._setting("label_format",i)}>${s}</button>`)}
            </div>
            <label class="check">
              <input type="checkbox" .checked=${t.auto_labels}
                @change=${(i)=>this._setting("auto_labels",i.target.checked)} />
              Stampa l'etichetta QR quando aggiungo una bottiglia
            </label>

            <div class="section">Finestra di beva</div>
            <div class="note" style="margin-bottom:8px">Avvisami prima che si chiuda:</div>
            <div class="types">
              ${[[90,"3 mesi"],[180,"6 mesi"],[365,"1 anno"]].map(([i,s])=>r`<button class="chip ${t.alert_days===i?"active":""}"
                  @click=${()=>this._setting("alert_days",i)}>${s}</button>`)}
            </div>
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}static styles=[k,v`
      .rack {
        border: 1px solid var(--tb-line);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.025);
        margin-bottom: 10px;
        overflow: hidden;
      }
      .rack.open {
        background: rgba(255, 255, 255, 0.04);
      }
      .rack-sum {
        width: 100%;
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding: 14px 16px;
        background: none;
        border: none;
        color: var(--tb-ink);
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .rack-name {
        font-family: var(--tb-serif);
        font-size: 1.15em;
        font-weight: 600;
      }
      .chev {
        margin-left: auto;
        color: var(--tb-ink-2);
      }
      .rack-edit {
        padding: 0 16px 14px;
      }
      .cols {
        display: grid;
        grid-template-columns: 1fr 160px;
        gap: 18px;
        align-items: start;
      }
      .controls {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        font-size: 0.92em;
      }
      .line.small {
        font-size: 0.85em;
        margin-top: 8px;
        color: var(--tb-ink-2);
      }
      details summary {
        cursor: pointer;
        color: var(--tb-gold);
        font-size: 0.85em;
      }
      .preview {
        padding: 12px 10px 10px;
        border-radius: 12px;
        background: linear-gradient(180deg, #1d1a1a, #110f10);
        border: 1px solid var(--tb-line);
        display: flex;
        flex-direction: column;
        gap: 7px;
        align-items: center;
      }
      .pv-shelf {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .pv-row {
        display: grid;
        gap: 2px;
      }
      .pv-row i {
        display: block;
        height: 12px;
        border-radius: 2px 2px 1px 1px;
        background: linear-gradient(180deg, rgba(216, 180, 106, 0.25), rgba(155, 44, 63, 0.55));
      }
      .pv-board {
        width: 100%;
        height: 2px;
        margin-top: 2px;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 1px;
      }
      .rack-foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        margin-top: 14px;
      }
      .check {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      @media (max-width: 480px) {
        .cols {
          grid-template-columns: 1fr;
        }
      }
    `]}c([g({attribute:!1})],ht.prototype,"card",void 0),c([g({attribute:!1})],ht.prototype,"data",void 0),c([b()],ht.prototype,"_drafts",void 0),c([b()],ht.prototype,"_open",void 0),ht=c([y("tb-racks-dialog")],ht);class ut extends m{constructor(){super(...arguments);this._items=null;this._editing=null;this._stars=null;this._tasting=""}connectedCallback(){super.connectedCallback(),this._load()}async _load(){let t=await this.card.ws({type:"taponbon/get_history"});this._items=t.history}_close(){this.dispatchEvent(new CustomEvent("close"))}async _restore(t){let e=await this.card.ws({type:"taponbon/restore",history_id:t.history_id});this.card.toast(e.bottle.rack_id?"Rimessa al suo posto":'Rimessa in cantina, in "Da sistemare"'),this._load()}_edit(t){this._editing=this._editing===t.history_id?null:t.history_id,this._stars=t.rating??null,this._tasting=t.tasting_notes||""}async _saveRating(t){await this.card.ws({type:"taponbon/rate_history",history_id:t.history_id,rating:this._stars,tasting_notes:this._tasting.trim()}),this._editing=null,this.card.toast("Voto salvato"),this._load()}render(){return r`
      ${A}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(t)=>t.stopPropagation()}>
          <div class="dialog-head">
            <div><div class="eyebrow">Bottiglie stappate e non solo</div><div class="dialog-title">Storico</div></div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this._items===null?r`<div class="note">Carico…</div>`:!this._items.length?r`<div class="note">Ancora nessuna bottiglia tolta dalla cantina.</div>`:this._items.map((t)=>this._renderItem(t))}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}_renderItem(t){let e=t.reason==="drank",i=this._editing===t.history_id;return r`<div class="item ${i?"open":""}">
      <div class="line">
        <span class="mini">${S(t.type)}</span>
        <div class="text">
          <div>${w(t)}</div>
          <div class="note">${this.data.reasons[t.reason]||t.reason} · ${new Date(t.removed_at).toLocaleDateString("it-IT")}
            ${t.producer?r` · ${t.producer}`:d}</div>
          ${e&&!i?r`<button class="vote" @click=${()=>this._edit(t)} title="Vota o scrivi una nota">
                ${t.rating?M(t.rating):r`<span class="add-vote">☆ Vota</span>`}
                ${t.tasting_notes?r`<span class="tn">«${t.tasting_notes}»</span>`:d}
              </button>`:d}
        </div>
        <button class="btn small" @click=${()=>this._restore(t)}>Rimetti</button>
      </div>
      ${i?r`<div class="editor">
            ${M(this._stars,(s)=>this._stars=s,!0)}
            <textarea rows="2" maxlength="1000" placeholder="Note di degustazione…" .value=${this._tasting}
              @input=${(s)=>this._tasting=s.target.value}></textarea>
            <div class="row">
              <button class="btn small" @click=${()=>this._editing=null}>Annulla</button>
              <button class="btn small primary" @click=${()=>this._saveRating(t)}>Salva</button>
            </div>
          </div>`:d}
    </div>`}static styles=[k,v`
      .item {
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
      }
      .line {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .vote {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-top: 4px;
        padding: 0;
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
        min-width: 0;
      }
      .add-vote {
        font-size: 0.82em;
        color: #e3b341;
      }
      .tn {
        font-size: 0.82em;
        font-style: italic;
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .editor {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 10px 0 4px;
      }
      .editor textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 10px;
        border-radius: 10px;
        border: 1px solid var(--tb-line, var(--divider-color));
        background: rgba(255, 255, 255, 0.04);
        color: var(--primary-text-color);
        font: inherit;
      }
      .editor .row {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        width: 100%;
      }
      .text {
        flex: 1;
        min-width: 0;
      }
      .mini {
        width: 14px;
        flex: none;
      }
      .mini svg {
        width: 100%;
        display: block;
        overflow: visible;
      }
      .item {
        border-bottom-color: var(--tb-line) !important;
      }
    `]}c([g({attribute:!1})],ut.prototype,"card",void 0),c([g({attribute:!1})],ut.prototype,"data",void 0),c([b()],ut.prototype,"_items",void 0),c([b()],ut.prototype,"_editing",void 0),c([b()],ut.prototype,"_stars",void 0),c([b()],ut.prototype,"_tasting",void 0),ut=c([y("tb-history-dialog")],ut);var le=["Antipasto","Primo","Secondo","Dolce"],de=["Brasato","Pesce al forno","Crudi di mare","Pizza","Formaggi stagionati","Risotto ai funghi","Dolce"];class bt extends m{constructor(){super(...arguments);this._dish="";this._busy=!1;this._result=null;this._asked="";this._mode="dish";this._courses=["","","",""]}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}_close(){this.dispatchEvent(new CustomEvent("close"))}async _ask(t=this._dish){if(t=t.trim(),!t||this._busy)return;this._dish=t,this._busy=!0,this._result=null;try{this._result=await this.card.ws({type:"taponbon/pair",dish:t}),this._asked=t}catch{}finally{this._busy=!1}}async _askMenu(){let t=this._courses.map((e)=>e.trim()).filter(Boolean);if(!t.length||this._busy)return;this._busy=!0,this._result=null;try{this._result=await this.card.ws({type:"taponbon/pair",courses:t}),this._asked=t.join(" · ")}catch{}finally{this._busy=!1}}_setMode(t){if(this._mode===t)return;this._mode=t,this._result=null}_open(t){this.dispatchEvent(new CustomEvent("open-bottle",{detail:{bottleId:t.bottle_ids[0]}}))}render(){let t=this._result;return r`
      ${A}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(e)=>e.stopPropagation()}>
          <div class="dialog-head">
            <div><div class="eyebrow">Dalla tua cantina</div><div class="dialog-title">Cosa si mangia?</div></div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            <div class="modes">
              <button class="chip ${this._mode==="dish"?"active":""}" @click=${()=>this._setMode("dish")}>Un piatto</button>
              <button class="chip ${this._mode==="menu"?"active":""}" @click=${()=>this._setMode("menu")}>Menu della serata</button>
            </div>
            ${this._mode==="dish"?this._renderDishForm(t):this._renderMenuForm()}
            ${this._busy?r`<div class="note waiting">Il sommelier sta guardando gli scaffali…</div>`:d}
            ${t?t.courses?this._renderMenuResult(t):this._renderResult(t):d}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}_renderDishForm(t){return r`
      <form class="ask" @submit=${(e)=>{e.preventDefault(),this._ask()}}>
        <input class="dish" type="text" placeholder="Es. tagliata al rosmarino, spaghetti alle vongole…"
          .value=${this._dish} maxlength="300"
          @input=${(e)=>this._dish=e.target.value} />
        <button class="btn primary" type="submit" ?disabled=${this._busy||!this._dish.trim()}>
          ${this._busy?"Ci penso…":"Consiglia"}
        </button>
      </form>
      ${!t&&!this._busy?r`<div class="quick">
            ${de.map((e)=>r`<button class="chip" @click=${()=>this._ask(e)}>${e}</button>`)}
          </div>`:d}
    `}_renderMenuForm(){let t=(i,s)=>this._courses=this._courses.map((a,o)=>o===i?s:a),e=this._courses.some((i)=>i.trim());return r`
      <form class="menu" @submit=${(i)=>{i.preventDefault(),this._askMenu()}}>
        ${this._courses.map((i,s)=>r`<div class="course">
          <span class="num">${s+1}</span>
          <input class="dish" type="text" maxlength="200" .value=${i}
            placeholder=${`${le[s]||"Portata"}${s===0?", es. crudi di mare":s===1?", es. risotto ai funghi":s===2?", es. brasato":", es. crostata"}`}
            @input=${(a)=>t(s,a.target.value)} />
          ${this._courses.length>1?r`<button type="button" class="close mini-x" title="Togli portata"
                @click=${()=>this._courses=this._courses.filter((a,o)=>o!==s)}>✕</button>`:d}
        </div>`)}
        <div class="menu-actions">
          ${this._courses.length<8?r`<button type="button" class="btn small" @click=${()=>this._courses=[...this._courses,""]}>＋ Portata</button>`:r`<span></span>`}
          <button class="btn primary" type="submit" ?disabled=${this._busy||!e}>
            ${this._busy?"Ci penso…":"Componi i vini"}
          </button>
        </div>
        <div class="note">Lascia vuote le portate che non ci sono.</div>
      </form>
    `}_wineCard(t,e={}){let i={closing:"Da bere presto",past:"Oltre la finestra",wait:"Ancora giovane"},s=e.reason??t.reason;return r`<button class="pick ${e.best?"best":""} ${e.compact?"compact":""}" @click=${()=>this._open(t)}>
      <span class="mini">${S(t.type,t.status==="closing"||t.status==="past"?t.status:null)}</span>
      <div class="text">
        <div class="wine">
          ${e.best?r`<span class="badge">Il migliore</span>`:d}
          ${w(t)}
          ${i[t.status]?r`<span class="state ${t.status}">${i[t.status]}</span>`:d}
        </div>
        ${t.producer||t.rating?r`<div class="note">${t.producer||""}${t.rating?r`<span class="your">${t.producer?" · ":""}il tuo voto ${M(t.rating)} ${tt(t.rating)}</span>`:d}</div>`:d}
        ${s?r`<div class="reason">${s}</div>`:d}
        <div class="where">📍 ${t.locations[0]}${t.bottles>1?r` · ${t.bottles} bottiglie`:d}</div>
      </div>
      <span class="go">›</span>
    </button>`}_renderMenuResult(t){let e=t.courses||[];return r`
      <div class="eyebrow small">Il percorso</div>
      <div class="path">
        ${e.map((i,s)=>r`<div class="step">
          <div class="step-head"><span class="num">${s+1}</span>${i.course.charAt(0).toUpperCase()+i.course.slice(1)}</div>
          ${i.wine?this._wineCard(i.wine,{compact:!0,reason:i.reason}):r`<div class="note nothing">Nessun vino della cantina è adatto a questa portata.</div>`}
        </div>`)}
      </div>
      ${t.one?r`<div class="eyebrow small">Oppure un vino per tutta la cena</div>${this._wineCard(t.one,{best:!0})}`:d}
      ${t.advice?r`<div class="advice ${t.source}">${t.source==="ai"?"\uD83C\uDF77 ":"ℹ️ "}${t.advice}</div>`:d}
    `}_renderResult(t){return r`
      ${!(t.picks||[]).length?r`<div class="note">Nessun vino della cantina è davvero adatto a «${this._asked}».</div>`:r`<div class="eyebrow small">Per «${this._asked}»</div>`}
      ${(t.picks||[]).map((e,i)=>this._wineCard(e,{best:i===0}))}
      ${t.advice?r`<div class="advice ${t.source}">${t.source==="ai"?"\uD83C\uDF77 ":"ℹ️ "}${t.advice}</div>`:d}
    `}static styles=[k,v`
      .ask {
        display: flex;
        gap: 8px;
      }
      .dish {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--tb-line, var(--divider-color));
        background: rgba(255, 255, 255, 0.04);
        color: var(--primary-text-color);
        font: inherit;
      }
      .modes {
        display: flex;
        gap: 6px;
        margin-bottom: 12px;
      }
      .menu {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .course {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .num {
        flex: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: inline-grid;
        place-items: center;
        font-size: 0.8em;
        font-weight: 600;
        background: rgba(227, 179, 65, 0.16);
        color: #e3b341;
      }
      .mini-x {
        flex: none;
        width: 30px;
        height: 30px;
        font-size: 0.8em;
      }
      .menu-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
      }
      .path {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;
      }
      .step-head {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        margin: 6px 0;
      }
      .pick.compact {
        margin-left: 32px;
        width: calc(100% - 32px);
        margin-bottom: 4px;
      }
      .nothing {
        margin-left: 32px;
      }
      .your {
        white-space: nowrap;
      }
      .quick {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .waiting {
        margin-top: 16px;
        animation: pulse 1.4s ease-in-out infinite;
      }
      @keyframes pulse {
        50% {
          opacity: 0.45;
        }
      }
      .eyebrow.small {
        margin: 18px 0 8px;
      }
      .pick {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        text-align: left;
        margin-bottom: 10px;
        padding: 12px 14px;
        border-radius: 14px;
        border: 1px solid var(--tb-line, var(--divider-color));
        background: rgba(255, 255, 255, 0.03);
        color: inherit;
        font: inherit;
        cursor: pointer;
      }
      .pick:hover {
        background: rgba(255, 255, 255, 0.06);
      }
      .pick.best {
        border-color: rgba(201, 162, 39, 0.55);
        background: linear-gradient(135deg, rgba(201, 162, 39, 0.1), rgba(255, 255, 255, 0.02));
      }
      .mini {
        width: 22px;
        flex: none;
      }
      .mini svg {
        width: 100%;
        display: block;
        overflow: visible;
      }
      .text {
        flex: 1;
        min-width: 0;
      }
      .wine {
        font-weight: 600;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
      }
      .badge,
      .state {
        font-size: 0.72em;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 999px;
        letter-spacing: 0.02em;
      }
      .badge {
        background: rgba(201, 162, 39, 0.22);
        color: #e8c766;
      }
      .state {
        background: rgba(255, 255, 255, 0.08);
        color: var(--secondary-text-color);
      }
      .state.closing {
        background: rgba(201, 162, 39, 0.18);
        color: #e8c766;
      }
      .state.past {
        background: rgba(229, 57, 53, 0.18);
        color: #ef7a77;
      }
      .reason {
        margin-top: 6px;
        line-height: 1.4;
      }
      .where {
        margin-top: 6px;
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }
      .go {
        font-size: 1.6em;
        color: var(--secondary-text-color);
      }
      .advice {
        margin-top: 6px;
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.04);
        font-size: 0.9em;
        line-height: 1.4;
      }
      .advice.local {
        color: var(--secondary-text-color);
      }
    `]}c([g({attribute:!1})],bt.prototype,"card",void 0),c([g({attribute:!1})],bt.prototype,"data",void 0),c([b()],bt.prototype,"_dish",void 0),c([b()],bt.prototype,"_busy",void 0),c([b()],bt.prototype,"_result",void 0),c([b()],bt.prototype,"_asked",void 0),c([b()],bt.prototype,"_mode",void 0),c([b()],bt.prototype,"_courses",void 0),bt=c([y("tb-pair-dialog")],bt);class gt extends m{constructor(){super(...arguments);this._config={type:"custom:taponbon-card"};this._data=null;this._error="";this._typeFilter="";this._query="";this._dialog=null;this._moving=null;this._toast="";this._subscribing=!1;this._startMove=(t)=>{this._moving=t.detail.bottle,this._dialog=null}}setConfig(t){this._config={...t}}static getStubConfig(){return{type:"custom:taponbon-card"}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}connectedCallback(){if(super.connectedCallback(),this.hass)this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0}updated(t){if(t.has("hass")&&this.hass&&!this._unsub&&!this._subscribing)this._subscribe()}async _subscribe(){if(this._unsub||this._subscribing||!this.hass?.connection)return;this._subscribing=!0;try{this._unsub=await this.hass.connection.subscribeMessage((t)=>{this._data=t,this._error=""},{type:"taponbon/subscribe"})}catch(t){this._error=t?.code==="unknown_command"?"L'integrazione TaponBon non è installata: aggiungila da Impostazioni → Dispositivi e servizi.":`Impossibile caricare la cantina: ${t?.message||t}`}finally{this._subscribing=!1}}async ws(t){try{return await this.hass.callWS(t)}catch(e){throw this.toast(e?.message||"Operazione non riuscita"),e}}toast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",3500)}_onCell(t,e,i,s){if(this._moving){let a=this._moving;if(this._moving=null,s?.id===a.id)return;this.ws({type:"taponbon/move_bottle",bottle_id:a.id,rack_id:t.id,row:e,col:i}).then(()=>this.toast(s?"Bottiglie scambiate di posto":"Bottiglia spostata"));return}this._dialog=s?{kind:"bottle",bottleId:s.id}:{kind:"add",rackId:t.id,row:e,col:i}}render(){let t=this._data;return r`
      <ha-card>
        ${A}
        ${this._error?r`<div class="empty">${this._error}</div>`:!t?r`<div class="empty">Carico la cantina…</div>`:this._renderBody(t)}
        ${this._toast?r`<div class="toast">${this._toast}</div>`:d}
      </ha-card>
      ${t?this._renderDialog(t):d}
    `}_renderBody(t){let e=t.bottles.length,i=t.racks.reduce((p,u)=>p+G(u),0),s=t.bottles.filter((p)=>p.alert==="closing").length,a=t.bottles.filter((p)=>p.alert==="past").length,o=t.bottles.filter((p)=>!p.rack_id),n=Object.fromEntries(Object.keys(t.types).map((p)=>[p,t.bottles.filter((u)=>u.type===p).length])),l=Math.round(Number(this._config.columns))||0,h=l?Math.max(1,Math.min(6,l,t.racks.length||1)):0;return r`
      <div class="header">
        <div class="title">
          <span class="logo">🍷</span>
          <div>
            <div class="name">${this._config.title||"TaponBon"}</div>
            <div class="sub">${e} bottiglie · ${i-t.racks.reduce((p,u)=>p+this._inRack(t,u).length,0)} posti liberi${this._renderValue(t)}</div>
          </div>
        </div>
        ${this._renderClimate(t)}
        <div class="actions">
          <button class="btn primary" @click=${()=>this._dialog={kind:"add",rackId:null,row:null,col:null}}>
            ＋ Aggiungi
          </button>
          <button class="btn" title="Che vino apro con questo piatto?" @click=${()=>this._dialog={kind:"pair"}}>🍽 Abbina</button>
          <button class="btn" title="Storico" @click=${()=>this._dialog={kind:"history"}}>🕓 Storico</button>
          <button class="btn" title="Scaffali e impostazioni" @click=${()=>this._dialog={kind:"racks"}}>⚙︎</button>
        </div>
      </div>

      ${s||a?r`<div class="banner">
            ${s?r`<span>🍷 <b>${s}</b> da bere presto</span>`:d}
            ${a?r`<span>⚠️ <b>${a}</b> oltre la finestra di beva</span>`:d}
            <span class="hint">cartellino dorato: da bere presto · rosso: oltre la finestra</span>
          </div>`:d}

      ${this._moving?r`<div class="banner moving">
            Tocca la nuova posizione per <b>${w(this._moving)}</b>
            <button class="btn small" @click=${()=>this._moving=null}>Annulla</button>
          </div>`:d}

      <div class="filters">
        <button class="chip ${this._typeFilter?"":"active"}" @click=${()=>this._typeFilter=""}>Tutti ${e}</button>
        ${Object.entries(t.types).map(([p,u])=>r`<button
            class="chip ${this._typeFilter===p?"active":""}"
            @click=${()=>this._typeFilter=this._typeFilter===p?"":p}
          ><span class="dot" style="background:${u.color}"></span>${u.label} ${n[p]||0}</button>`)}
        <input class="search" type="search" placeholder="Cerca vino, produttore, annata…"
          .value=${this._query} @input=${(p)=>this._query=p.target.value} />
      </div>

      <div class="racks ${h?"fixed":""}" style=${h?`--tb-columns:${h}`:""}>
        ${t.racks.map((p)=>this._renderRack(t,p))}
      </div>

      ${o.length?r`<div class="unplaced">
            <div class="section-title">Da sistemare (${o.length})</div>
            <div class="list">
              ${o.map((p)=>r`<button class="list-item ${this._dims(p)?"dim":""}"
                  @click=${()=>this._dialog={kind:"bottle",bottleId:p.id}}>
                  <span class="dot" style="background:${t.types[p.type]?.color}"></span>${w(p)}
                </button>`)}
            </div>
          </div>`:d}
      ${!t.racks.length?r`<div class="empty">Nessuno scaffale: creane uno da ⚙︎.</div>`:d}
    `}_renderValue(t){let e=t.value;if(!e||!e.priced)return d;let i=e.total.toLocaleString("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}),s=e.bottles-e.priced;return r` · <span class="value" title=${s?`Valore delle ${e.priced} bottiglie con prezzo (${s} senza prezzo)`:"Valore della cantina"}>${i}${s?"*":""}</span>`}_renderClimate(t){let e=t.climate;if(!e||!e.temperature_entity&&!e.humidity_entity)return d;let i=(s,a,o,n,l,h)=>{if(!s)return d;let p=this.hass?.states?.[s],u=p?Number(p.state):NaN,f=!isNaN(u),_=!f?"na":u<n?"low":u>l?"high":"ok",C=f?u.toLocaleString("it-IT",{maximumFractionDigits:1}):"—",jt=_==="ok"?`${h} ideale (${n}–${l} ${o})`:_==="na"?`${h} non disponibile`:`${h} troppo ${_==="low"?"bassa":"alta"}: ideale ${n}–${l} ${o}`;return r`<button class="climate ${_}" title=${jt}
        @click=${()=>this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:s},bubbles:!0,composed:!0}))}>
        <span class="ci">${a}</span><b>${C}</b><span class="cu">${o}</span>
      </button>`};return r`<div class="climates">
      ${i(e.temperature_entity,"\uD83C\uDF21","°C",e.temperature_min,e.temperature_max,"Temperatura")}
      ${i(e.humidity_entity,"\uD83D\uDCA7","%",e.humidity_min,e.humidity_max,"Umidità")}
    </div>`}_inRack(t,e){return t.bottles.filter((i)=>i.rack_id===e.id&&i.row!=null&&i.col!=null)}_dims(t){return this._typeFilter&&t.type!==this._typeFilter||!Bt(t,this._query)}_renderRack(t,e){let i=this._inRack(t,e),s=new Map(i.map((o)=>[`${o.row}:${o.col}`,o])),a=V(e);return r`
      <div class="rack">
        <div class="rack-head"><span>${e.name}</span><span class="muted">${i.length}/${G(e)}</span></div>
        <div class="shelves">
          ${a.map((o,n)=>r`<div class="shelf">
            <div class="grid" style="grid-template-columns: repeat(${o}, minmax(0, 34px))">
              ${Array.from({length:o},(l,h)=>{let p=s.get(`${n}:${h}`);return r`<button
                  class="cell ${p?"full":"free"} ${p&&this._dims(p)?"dim":""} ${p&&this._moving?.id===p.id?"moving":""}"
                  title=${p?`${w(p)}${p.producer?` · ${p.producer}`:""}`:`Mensola ${n+1}, posto ${h+1}: libero`}
                  @click=${()=>this._onCell(e,n,h,p)}
                >${p?S(p.type,p.alert):Ft}</button>`})}
            </div>
            <div class="board"></div>
          </div>`)}
        </div>
      </div>
    `}_renderDialog(t){let e=this._dialog;if(!e)return d;let i=()=>this._dialog=null;switch(e.kind){case"add":return r`<tb-add-dialog .card=${this} .data=${t} .rackId=${e.rackId} .row=${e.row} .col=${e.col} @close=${i}></tb-add-dialog>`;case"bottle":{let s=t.bottles.find((a)=>a.id===e.bottleId);if(!s)return d;return r`<tb-bottle-dialog .card=${this} .data=${t} .bottle=${s} @close=${i} @move=${this._startMove}></tb-bottle-dialog>`}case"racks":return r`<tb-racks-dialog .card=${this} .data=${t} @close=${i}></tb-racks-dialog>`;case"pair":return r`<tb-pair-dialog .card=${this} .data=${t} @close=${i}
          @open-bottle=${(s)=>this._dialog={kind:"bottle",bottleId:s.detail.bottleId}}></tb-pair-dialog>`;case"history":return r`<tb-history-dialog .card=${this} .data=${t} @close=${i}></tb-history-dialog>`}}static styles=[k,v`
      :host {
        display: block;
        min-width: 0;
        max-width: 100%;
      }
      ha-card {
        overflow: hidden;
        position: relative;
        container-type: inline-size;
        container-name: tb;
        max-width: 100%;
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
      .value {
        color: #e3b341;
        font-variant-numeric: tabular-nums;
      }
      .sub,
      .muted {
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }
      .climates {
        display: flex;
        gap: 6px;
        margin-left: auto;
        margin-right: 6px;
      }
      .climate {
        display: inline-flex;
        align-items: baseline;
        gap: 4px;
        padding: 7px 12px;
        border-radius: 999px;
        border: 1px solid var(--tb-line);
        background: rgba(255, 255, 255, 0.04);
        color: var(--tb-ink, var(--primary-text-color));
        font: inherit;
        cursor: pointer;
      }
      .climate b {
        font-size: 1.05em;
        font-variant-numeric: tabular-nums;
      }
      .climate .cu,
      .climate .ci {
        font-size: 0.8em;
        color: var(--tb-ink-2);
      }
      .climate.low,
      .climate.high {
        border-color: rgba(255, 160, 0, 0.6);
        background: rgba(255, 160, 0, 0.12);
      }
      .climate.na {
        opacity: 0.5;
      }
      @container tb (max-width: 599px) {
        .climates {
          margin-left: 0;
          order: 3;
          width: 100%;
        }
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
        grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
        gap: 14px;
        padding: 4px 16px 16px;
      }
      /* Colonne decise dalla larghezza reale della scheda (non dello schermo):
         al massimo --tb-columns, ma vanno a capo quando ogni rastrelliera
         scenderebbe sotto i 240px (es. barra laterale di HA aperta). */
      .racks.fixed {
        grid-template-columns: repeat(
          auto-fit,
          minmax(max(min(240px, 100%), calc((100% - (var(--tb-columns) - 1) * 14px) / var(--tb-columns))), 1fr)
        );
      }
      .rack {
        min-width: 0;
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
      .shelves {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .shelf {
        position: relative;
      }
      .board {
        height: 5px;
        margin: 2px -6px 0;
        border-radius: 2px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04) 60%, rgba(0, 0, 0, 0.4));
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.35);
      }
      .grid {
        display: grid;
        gap: 7px;
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
        position: fixed;
        left: 50%;
        bottom: 28px;
        max-width: min(520px, 90vw);
        text-align: center;
        transform: translateX(-50%);
        background: rgba(20, 16, 17, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        color: #f2ebe3;
        padding: 10px 18px;
        border-radius: 999px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 1001;
        font-size: 0.9em;
        z-index: 2;
      }
    `]}c([g({attribute:!1})],gt.prototype,"hass",void 0),c([b()],gt.prototype,"_config",void 0),c([b()],gt.prototype,"_data",void 0),c([b()],gt.prototype,"_error",void 0),c([b()],gt.prototype,"_typeFilter",void 0),c([b()],gt.prototype,"_query",void 0),c([b()],gt.prototype,"_dialog",void 0),c([b()],gt.prototype,"_moving",void 0),c([b()],gt.prototype,"_toast",void 0),gt=c([y("taponbon-card")],gt);window.customCards=window.customCards||[];window.customCards.push({type:"taponbon-card",name:"TaponBon",description:"La tua cantina: scaffali, bottiglie, QR e finestre di beva",preview:!1});export{gt as TaponBonCard};
