function t(t,e,i,s){var a,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(r=(o<3?a(r):o>3?a(e,i,r):a(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,b=globalThis,g=b.trustedTypes,_=g?g.emptyScript:"",m=b.reactiveElementPolyfillSupport,v=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(b.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=t=>t,A=k.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,O=`<${P}>`,z=document,R=()=>z.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,j=/>/g,D=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,q=/"/g,L=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=B(1),W=B(2),V=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),J=new WeakMap,K=z.createTreeWalker(z,129);function Z(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===N?"!--"===l[1]?r=H:void 0!==l[1]?r=j:void 0!==l[2]?(L.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=a??N,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?D:'"'===l[3]?q:I):r===q||r===I?r=D:r===H||r===j?r=N:(r=D,a=void 0);const p=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+O:d>=0?(s.push(n),i.slice(0,d)+S+i.slice(d)+C+p):i+C+(-2===d?e:p)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const r=t.length-1,n=this.parts,[l,d]=G(t,e);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&n.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?at:"@"===r[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:a}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),K.nextNode(),n.push({type:2,index:++a});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)n.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===V)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=Y(t,a._$AS(t,e.values),a,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);K.currentNode=s;let a=K.nextNode(),o=0,r=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new et(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new rt(a,this,t)),this._$AV.push(e),n=i[++r]}o!==n?.index&&(a=K.nextNode(),o++)}return K.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),M(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new X(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new et(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=Y(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==V,o&&(this._$AH=t);else{const s=t;let r,n;for(t=a[0],r=0;r<a.length-1;r++)n=Y(this,s[i+r],e,r),n===V&&(n=this._$AH[r]),o||=!M(n)||n!==this._$AH[r],n===Q?t=Q:t!==Q&&(t+=(n??"")+a[r+1]),this._$AH[r]=n}o&&!s&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Q)}}class ot extends it{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??Q)===V)return;const i=this._$AH,s=t===Q&&i!==Q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==Q&&(i===Q||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=k.litHtmlPolyfillSupport;nt?.(X,et),(k.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class dt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new et(e.insertBefore(R(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:$},ut=(t=ht,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function bt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return bt({...t,state:!0,attribute:!1})}const _t=[{key:"name",label:"Nome del vino",kind:"text"},{key:"producer",label:"Produttore",kind:"text"},{key:"vintage",label:"Annata",kind:"year"},{key:"region",label:"Regione / denominazione",kind:"text"},{key:"country",label:"Paese",kind:"text"},{key:"grape",label:"Vitigno",kind:"text"},{key:"drink_from",label:"Da bere dal",kind:"year"},{key:"drink_until",label:"Da bere entro il",kind:"year"},{key:"price",label:"Prezzo (€)",kind:"number"},{key:"notes",label:"Note",kind:"area"}];function mt(t){return`${t.name||"Vino"}${t.vintage?` ${t.vintage}`:""}`}function vt(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}const ft=r`
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
`;function $t(t,e,i){return F`
    <div class="form">
      <label class="field wide">
        Tipo
        <div class="types">
          ${Object.entries(t.types).map(([t,s])=>F`<button type="button" class="chip ${e.type===t?"active":""}"
              @click=${()=>i("type",t)}><span class="dot" style="background:${s.color}"></span>${s.label}</button>`)}
        </div>
      </label>
      ${_t.map(t=>{const s="name"===t.key||"area"===t.kind,a=e[t.key]??"",o=e=>i(t.key,e.target.value);return F`<label class="field ${s?"wide":""}">
          ${t.label}
          ${"area"===t.kind?F`<textarea rows="2" .value=${a} @input=${o}></textarea>`:F`<input
                type=${"text"===t.kind?"text":"number"}
                inputmode=${"text"===t.kind?"text":"numeric"}
                step=${"number"===t.kind?"0.01":"1"}
                .value=${String(a)}
                @input=${o}
              />`}
        </label>`})}
    </div>
  `}let yt=class extends dt{constructor(){super(...arguments),this.rackId=null,this.row=null,this.col=null,this._values={type:"red"},this._quantity=1,this._busy=!1}_close(){this.dispatchEvent(new CustomEvent("close"))}async _save(){if(String(this._values.name||"").trim()){this._busy=!0;try{const t=(await this.card.ws({type:"taponbon/add_bottles",wine:this._values,quantity:this._quantity,rack_id:this.rackId,row:this.row,col:this.col})).bottles,e=t.filter(t=>!t.rack_id).length;this.card.toast(e?`Aggiunte ${t.length} bottiglie, ${e} da sistemare: scaffale pieno`:t.length>1?`Aggiunte ${t.length} bottiglie`:"Bottiglia aggiunta"),this._close()}finally{this._busy=!1}}else this.card.toast("Scrivi almeno il nome del vino")}render(){const t=this.data.racks.find(t=>t.id===this.rackId),e=t&&null!=this.row&&null!=this.col?`${t.name}, fila ${this.row+1}, posto ${this.col+1}`:"nel primo posto libero";return F`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Aggiungi vino</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${$t(this.data,this._values,(t,e)=>this._values={...this._values,[t]:e})}
            <div class="form" style="margin-top:10px">
              <label class="field">
                Quante bottiglie
                <input type="number" min="1" max="100" .value=${String(this._quantity)}
                  @input=${t=>this._quantity=Math.max(1,Math.min(100,Number(t.target.value)||1))} />
              </label>
              <div class="field">Dove<span style="color:var(--primary-text-color)">${e}${this._quantity>1?" e i successivi":""}</span></div>
            </div>
            ${this.data.settings.auto_labels?F`<p class="note">Per ogni bottiglia verrà richiesta la stampa dell'etichetta QR.</p>`:Q}
          </div>
          <div class="dialog-foot">
            <button class="btn" @click=${this._close}>Annulla</button>
            <button class="btn primary" ?disabled=${this._busy} @click=${this._save}>
              ${this._busy?"Salvo…":"Aggiungi "+(this._quantity>1?`${this._quantity} bottiglie`:"bottiglia")}
            </button>
          </div>
        </div>
      </div>
    `}};yt.styles=ft,t([bt({attribute:!1})],yt.prototype,"card",void 0),t([bt({attribute:!1})],yt.prototype,"data",void 0),t([bt({attribute:!1})],yt.prototype,"rackId",void 0),t([bt({attribute:!1})],yt.prototype,"row",void 0),t([bt({attribute:!1})],yt.prototype,"col",void 0),t([gt()],yt.prototype,"_values",void 0),t([gt()],yt.prototype,"_quantity",void 0),t([gt()],yt.prototype,"_busy",void 0),yt=t([pt("tb-add-dialog")],yt);let xt=class extends dt{constructor(){super(...arguments),this._label=null,this._editing=!1,this._values={},this._sameWine=!0,this._otherReason=!1,this._busy=!1}willUpdate(t){if(t.has("bottle")){const e=t.get("bottle");e?.id!==this.bottle.id&&(this._label=null,this._editing=!1,this._loadLabel())}}async _loadLabel(){const t=this.bottle.id;try{const e=await this.card.hass.callWS({type:"taponbon/get_label",bottle_id:t});this.bottle.id===t&&(this._label=e)}catch{}}_close(){this.dispatchEvent(new CustomEvent("close"))}_sameWineCount(){const t=t=>`${(t.name||"").trim().toLowerCase()}|${(t.producer||"").trim().toLowerCase()}|${t.vintage||""}`;return this.data.bottles.filter(e=>t(e)===t(this.bottle)).length}async _remove(t){this._busy=!0;try{await this.card.ws({type:"taponbon/remove_bottle",bottle_id:this.bottle.id,reason:t}),this.card.toast(`${mt(this.bottle)}: ${this.data.reasons[t]?.toLowerCase()||"tolta"}. La trovi nello storico.`),this._close()}finally{this._busy=!1}}async _saveEdit(){this._busy=!0;try{const t=await this.card.ws({type:"taponbon/update_bottle",bottle_id:this.bottle.id,changes:this._values,same_wine:this._sameWine});this.card.toast(t.updated>1?`Aggiornate ${t.updated} bottiglie`:"Bottiglia aggiornata"),this._editing=!1,this._label=null,this._loadLabel()}finally{this._busy=!1}}async _printOnPrinter(){await this.card.ws({type:"taponbon/request_label",bottle_id:this.bottle.id}),this.card.toast("Etichetta inviata alla stampante")}_printInBrowser(){if(!this._label)return;const t=window.open("","_blank","width=480,height=360");t?(t.document.write(`<!doctype html><html><head><title>Etichetta ${this._label.code}</title>\n      <style>@page{size:50mm 30mm;margin:0}html,body{margin:0}img{width:50mm;height:30mm;display:block}</style></head>\n      <body><img src="data:image/png;base64,${this._label.png_base64}"\n      onload="setTimeout(function(){window.print();window.close();},150)"></body></html>`),t.document.close()):this.card.toast("Il browser ha bloccato la finestra di stampa")}render(){const t=this.bottle,e=this.data.types[t.type];return F`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div>
              <div class="dialog-title">${mt(t)}</div>
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
    `}_renderView(t,e){const i=function(t){return t.drink_from&&t.drink_until?`${t.drink_from}–${t.drink_until}`:t.drink_until?`entro il ${t.drink_until}`:t.drink_from?`dal ${t.drink_from}`:""}(t);return F`
      <div class="badges">
        <span class="badge" style="background:${e?.color}">${e?.label||t.type}</span>
        ${"closing"===t.alert?F`<span class="badge warn">Da bere presto</span>`:Q}
        ${"past"===t.alert?F`<span class="badge bad">Oltre la finestra</span>`:Q}
        <span class="where">📍 ${function(t,e){const i=e.find(e=>e.id===t.rack_id);return i&&null!=t.row&&null!=t.col?`${i.name} · fila ${t.row+1}, posto ${t.col+1}`:"Da sistemare"}(t,this.data.racks)}</span>
      </div>
      <dl class="facts">
        ${_t.filter(t=>!["name","producer","vintage","drink_from","drink_until"].includes(t.key)).map(e=>{const i=t[e.key];return null==i||""===i?Q:F`<dt>${e.label}</dt><dd>${"price"===e.key?`${Number(i).toFixed(2)} €`:i}</dd>`})}
        ${i?F`<dt>Finestra di beva</dt><dd>${i}</dd>`:Q}
      </dl>
      <div class="label-box">
        ${this._label?F`<img class="label" alt="Etichetta QR" src="data:image/png;base64,${this._label.png_base64}" />`:F`<div class="note">Preparo l'etichetta…</div>`}
        <div class="note">Inquadra il QR con l'app Home Assistant quando prendi la bottiglia: verrà tolta dalla cantina.</div>
        <div class="row">
          <button class="btn small" @click=${this._printOnPrinter}>🖨️ Stampante etichette</button>
          <button class="btn small" ?disabled=${!this._label} @click=${this._printInBrowser}>Stampa dal browser</button>
        </div>
      </div>
      ${this._otherReason?F`<div class="reasons">
            ${Object.entries(this.data.reasons).filter(([t])=>"drank"!==t).map(([t,e])=>F`<button class="btn small ${"deleted"===t?"danger":""}" ?disabled=${this._busy}
                @click=${()=>this._remove(t)}>${e}</button>`)}
          </div>`:Q}
    `}_renderViewFoot(){return F`<div class="dialog-foot">
      <button class="btn" @click=${()=>this.dispatchEvent(new CustomEvent("move",{detail:{bottle:this.bottle}}))}>↔ Sposta</button>
      <button class="btn" @click=${()=>{this._values=Object.fromEntries(["type",..._t.map(t=>t.key)].map(t=>[t,this.bottle[t]??""])),this._sameWine=!0,this._editing=!0}}>✏️ Modifica</button>
      <button class="btn" @click=${()=>this._otherReason=!this._otherReason}>Altro…</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${()=>this._remove("drank")}>🍷 Bevuta</button>
    </div>`}_renderEdit(){const t=this._sameWineCount();return F`
      ${$t(this.data,this._values,(t,e)=>this._values={...this._values,[t]:e})}
      ${t>1?F`<label class="check"><input type="checkbox" .checked=${this._sameWine}
            @change=${t=>this._sameWine=t.target.checked} />
            Applica a tutte le ${t} bottiglie di questo vino</label>`:Q}
    `}_renderEditFoot(){return F`<div class="dialog-foot">
      <button class="btn" @click=${()=>this._editing=!1}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${this._saveEdit}>Salva</button>
    </div>`}};xt.styles=[ft,r`
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
    `],t([bt({attribute:!1})],xt.prototype,"card",void 0),t([bt({attribute:!1})],xt.prototype,"data",void 0),t([bt({attribute:!1})],xt.prototype,"bottle",void 0),t([gt()],xt.prototype,"_label",void 0),t([gt()],xt.prototype,"_editing",void 0),t([gt()],xt.prototype,"_values",void 0),t([gt()],xt.prototype,"_sameWine",void 0),t([gt()],xt.prototype,"_otherReason",void 0),t([gt()],xt.prototype,"_busy",void 0),xt=t([pt("tb-bottle-dialog")],xt);let kt=class extends dt{constructor(){super(...arguments),this._drafts={}}_close(){this.dispatchEvent(new CustomEvent("close"))}_draft(t){return{...t,...this._drafts[t.id]}}_set(t,e,i){this._drafts={...this._drafts,[t]:{...this._drafts[t],[e]:i}}}_count(t){return this.data.bottles.filter(e=>e.rack_id===t).length}async _save(t){const e=this._draft(t),i=await this.card.ws({type:"taponbon/save_rack",rack:e}),s={...this._drafts};delete s[t.id],this._drafts=s,this.card.toast(i.displaced?`Salvato. ${i.displaced} bottiglie sono finite in "Da sistemare".`:"Scaffale salvato")}async _delete(t){const e=this._count(t.id);confirm(`Eliminare "${t.name}"?${e?` Le sue ${e} bottiglie restano in cantina, in "Da sistemare".`:""}`)&&(await this.card.ws({type:"taponbon/delete_rack",rack_id:t.id}),this.card.toast("Scaffale eliminato"))}async _add(){await this.card.ws({type:"taponbon/save_rack",rack:{name:`Scaffale ${this.data.racks.length+1}`,rows:7,cols:10}})}async _setting(t,e){await this.card.ws({type:"taponbon/update_settings",[t]:e})}render(){const t=this.data.settings;return F`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Scaffali e impostazioni</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this.data.racks.map(t=>{const e=this._draft(t),i=!!this._drafts[t.id];return F`<div class="rack">
                <label class="field name">Nome
                  <input .value=${e.name} @input=${e=>this._set(t.id,"name",e.target.value)} />
                </label>
                <label class="field">File
                  <input type="number" min="1" max="30" .value=${String(e.rows)}
                    @input=${e=>this._set(t.id,"rows",Number(e.target.value))} />
                </label>
                <label class="field">Posti per fila
                  <input type="number" min="1" max="30" .value=${String(e.cols)}
                    @input=${e=>this._set(t.id,"cols",Number(e.target.value))} />
                </label>
                <div class="rack-foot">
                  <span class="note">${this._count(t.id)} bottiglie · ${e.rows*e.cols} posti</span>
                  <span>
                    <button class="btn small danger" @click=${()=>this._delete(t)}>Elimina</button>
                    <button class="btn small primary" ?disabled=${!i} @click=${()=>this._save(t)}>Salva</button>
                  </span>
                </div>
              </div>`})}
            <button class="btn" @click=${this._add}>＋ Nuovo scaffale</button>

            <h3>Impostazioni</h3>
            <label class="check">
              <input type="checkbox" .checked=${t.auto_labels}
                @change=${t=>this._setting("auto_labels",t.target.checked)} />
              Stampa l'etichetta QR quando aggiungo una bottiglia
            </label>
            <div class="field">Avvisami prima che la finestra di beva si chiuda
              <div class="types">
                ${[[90,"3 mesi"],[180,"6 mesi"],[365,"1 anno"]].map(([e,i])=>F`<button class="chip ${t.alert_days===e?"active":""}"
                    @click=${()=>this._setting("alert_days",e)}>${i}</button>`)}
              </div>
            </div>
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}};kt.styles=[ft,r`
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
    `],t([bt({attribute:!1})],kt.prototype,"card",void 0),t([bt({attribute:!1})],kt.prototype,"data",void 0),t([gt()],kt.prototype,"_drafts",void 0),kt=t([pt("tb-racks-dialog")],kt);let wt=class extends dt{constructor(){super(...arguments),this._items=null}connectedCallback(){super.connectedCallback(),this._load()}async _load(){const t=await this.card.ws({type:"taponbon/get_history"});this._items=t.history}_close(){this.dispatchEvent(new CustomEvent("close"))}async _restore(t){const e=await this.card.ws({type:"taponbon/restore",history_id:t.history_id});this.card.toast(e.bottle.rack_id?"Rimessa al suo posto":'Rimessa in cantina, in "Da sistemare"'),this._load()}render(){return F`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Storico</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${null===this._items?F`<div class="note">Carico…</div>`:this._items.length?this._items.map(t=>F`<div class="item">
                    <span class="dot" style="background:${this.data.types[t.type]?.color}"></span>
                    <div class="text">
                      <div>${mt(t)}</div>
                      <div class="note">${this.data.reasons[t.reason]||t.reason} · ${new Date(t.removed_at).toLocaleDateString("it-IT")}
                        ${t.producer?F` · ${t.producer}`:Q}</div>
                    </div>
                    <button class="btn small" @click=${()=>this._restore(t)}>Rimetti</button>
                  </div>`):F`<div class="note">Ancora nessuna bottiglia tolta dalla cantina.</div>`}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}};wt.styles=[ft,r`
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
    `],t([bt({attribute:!1})],wt.prototype,"card",void 0),t([bt({attribute:!1})],wt.prototype,"data",void 0),t([gt()],wt.prototype,"_items",void 0),wt=t([pt("tb-history-dialog")],wt);const At=W`<svg viewBox="0 0 20 52" aria-hidden="true">
  <path class="glass" d="M8 1h4v3h-.4v9c0 2.5 6.4 4.5 6.4 10.5V49a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V23.5C2 17.5 8.4 15.5 8.4 13V4H8z"/>
  <rect class="capsule" x="7.6" y="1" width="4.8" height="7" rx="1"/>
  <rect class="label" x="3.5" y="29" width="13" height="11" rx="1"/>
  <path class="shine" d="M4.3 24c0-3 2-4.5 3.4-5.6V47H4.3z"/>
</svg>`;let Et=class extends dt{constructor(){super(...arguments),this._config={type:"custom:taponbon-card"},this._data=null,this._error="",this._typeFilter="",this._query="",this._dialog=null,this._moving=null,this._toast="",this._subscribing=!1,this._startMove=t=>{this._moving=t.detail.bottle,this._dialog=null}}setConfig(t){this._config={...t}}static getStubConfig(){return{type:"custom:taponbon-card"}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}connectedCallback(){super.connectedCallback(),this.hass&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0}updated(t){t.has("hass")&&this.hass&&!this._unsub&&!this._subscribing&&this._subscribe()}async _subscribe(){if(!this._unsub&&!this._subscribing&&this.hass?.connection){this._subscribing=!0;try{this._unsub=await this.hass.connection.subscribeMessage(t=>{this._data=t,this._error=""},{type:"taponbon/subscribe"})}catch(t){this._error="unknown_command"===t?.code?"L'integrazione TaponBon non è installata: aggiungila da Impostazioni → Dispositivi e servizi.":`Impossibile caricare la cantina: ${t?.message||t}`}finally{this._subscribing=!1}}}async ws(t){try{return await this.hass.callWS(t)}catch(t){throw this.toast(t?.message||"Operazione non riuscita"),t}}toast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",3500)}_onCell(t,e,i,s){if(this._moving){const a=this._moving;if(this._moving=null,s?.id===a.id)return;return void this.ws({type:"taponbon/move_bottle",bottle_id:a.id,rack_id:t.id,row:e,col:i}).then(()=>this.toast(s?"Bottiglie scambiate di posto":"Bottiglia spostata"))}this._dialog=s?{kind:"bottle",bottleId:s.id}:{kind:"add",rackId:t.id,row:e,col:i}}render(){const t=this._data;return F`
      <ha-card>
        ${this._error?F`<div class="empty">${this._error}</div>`:t?this._renderBody(t):F`<div class="empty">Carico la cantina…</div>`}
        ${this._toast?F`<div class="toast">${this._toast}</div>`:Q}
      </ha-card>
      ${t?this._renderDialog(t):Q}
    `}_renderBody(t){const e=t.bottles.length,i=t.racks.reduce((t,e)=>t+e.rows*e.cols,0),s=t.bottles.filter(t=>"closing"===t.alert).length,a=t.bottles.filter(t=>"past"===t.alert).length,o=t.bottles.filter(t=>!t.rack_id),r=Object.fromEntries(Object.keys(t.types).map(e=>[e,t.bottles.filter(t=>t.type===e).length])),n=Math.max(1,Math.min(6,Math.round(Number(this._config.columns))||0));return F`
      <div class="header">
        <div class="title">
          <span class="logo">🍷</span>
          <div>
            <div class="name">${this._config.title||"TaponBon"}</div>
            <div class="sub">${e} bottiglie · ${i-t.racks.reduce((e,i)=>e+this._inRack(t,i).length,0)} posti liberi</div>
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

      ${s||a?F`<div class="banner">
            ${s?F`<span>🍷 <b>${s}</b> da bere presto</span>`:Q}
            ${a?F`<span>⚠️ <b>${a}</b> oltre la finestra di beva</span>`:Q}
            <span class="hint">sono evidenziate sullo scaffale</span>
          </div>`:Q}

      ${this._moving?F`<div class="banner moving">
            Tocca la nuova posizione per <b>${mt(this._moving)}</b>
            <button class="btn small" @click=${()=>this._moving=null}>Annulla</button>
          </div>`:Q}

      <div class="filters">
        <button class="chip ${this._typeFilter?"":"active"}" @click=${()=>this._typeFilter=""}>Tutti ${e}</button>
        ${Object.entries(t.types).map(([t,e])=>F`<button
            class="chip ${this._typeFilter===t?"active":""}"
            @click=${()=>this._typeFilter=this._typeFilter===t?"":t}
          ><span class="dot" style="background:${e.color}"></span>${e.label} ${r[t]||0}</button>`)}
        <input class="search" type="search" placeholder="Cerca vino, produttore, annata…"
          .value=${this._query} @input=${t=>this._query=t.target.value} />
      </div>

      <div class="racks ${n?"fixed":""}" style=${n?`--tb-columns:${n}`:""}>
        ${t.racks.map(e=>this._renderRack(t,e))}
      </div>

      ${o.length?F`<div class="unplaced">
            <div class="section-title">Da sistemare (${o.length})</div>
            <div class="list">
              ${o.map(e=>F`<button class="list-item ${this._dims(e)?"dim":""}"
                  @click=${()=>this._dialog={kind:"bottle",bottleId:e.id}}>
                  <span class="dot" style="background:${t.types[e.type]?.color}"></span>${mt(e)}
                </button>`)}
            </div>
          </div>`:Q}
      ${t.racks.length?Q:F`<div class="empty">Nessuno scaffale: creane uno da ⚙︎.</div>`}
    `}_inRack(t,e){return t.bottles.filter(t=>t.rack_id===e.id&&null!=t.row&&null!=t.col)}_dims(t){return this._typeFilter&&t.type!==this._typeFilter||!function(t,e){if(!e)return!0;const i=vt([t.name,t.producer,t.vintage,t.region,t.country,t.grape,t.notes,t.code].filter(Boolean).join(" "));return vt(e).split(/\s+/).every(t=>i.includes(t))}(t,this._query)}_renderRack(t,e){const i=this._inRack(t,e),s=new Map(i.map(t=>[`${t.row}:${t.col}`,t])),a=[];for(let i=0;i<e.rows;i++)for(let o=0;o<e.cols;o++){const r=s.get(`${i}:${o}`),n=r?t.types[r.type]?.color||"#888":"";a.push(F`<button
          class="cell ${r?"full":"free"} ${r&&this._dims(r)?"dim":""} ${r?.alert||""} ${this._moving?.id===r?.id&&r?"moving":""}"
          style=${r?`--bottle:${n}`:""}
          title=${r?`${mt(r)}${r.producer?` · ${r.producer}`:""}`:`Fila ${i+1}, posto ${o+1}: libero`}
          @click=${()=>this._onCell(e,i,o,r)}
        >${At}</button>`)}return F`
      <div class="rack">
        <div class="rack-head"><span>${e.name}</span><span class="muted">${i.length}/${e.rows*e.cols}</span></div>
        <div class="grid" style="grid-template-columns: repeat(${e.cols}, minmax(0, 34px))">${a}</div>
      </div>
    `}_renderDialog(t){const e=this._dialog;if(!e)return Q;const i=()=>this._dialog=null;switch(e.kind){case"add":return F`<tb-add-dialog .card=${this} .data=${t} .rackId=${e.rackId} .row=${e.row} .col=${e.col} @close=${i}></tb-add-dialog>`;case"bottle":{const s=t.bottles.find(t=>t.id===e.bottleId);return s?F`<tb-bottle-dialog .card=${this} .data=${t} .bottle=${s} @close=${i} @move=${this._startMove}></tb-bottle-dialog>`:Q}case"racks":return F`<tb-racks-dialog .card=${this} .data=${t} @close=${i}></tb-racks-dialog>`;case"history":return F`<tb-history-dialog .card=${this} .data=${t} @close=${i}></tb-history-dialog>`}}};Et.styles=[ft,r`
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
        gap: 8px 5px;
        justify-content: center;
      }
      .cell {
        aspect-ratio: 20 / 52;
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        position: relative;
        transition: transform 0.1s, opacity 0.2s;
      }
      .cell svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }
      .cell.free .glass {
        fill: rgba(0, 0, 0, 0.28);
        stroke: rgba(255, 255, 255, 0.12);
        stroke-width: 0.6;
      }
      .cell.free .capsule,
      .cell.free .label,
      .cell.free .shine {
        display: none;
      }
      .cell.free:hover .glass {
        fill: rgba(255, 255, 255, 0.15);
      }
      .cell.full .glass {
        fill: var(--bottle);
        stroke: rgba(0, 0, 0, 0.5);
        stroke-width: 0.6;
      }
      .cell.full .capsule {
        fill: #2a1a10;
      }
      .cell.full .label {
        fill: #f4ead6;
        opacity: 0.9;
      }
      .cell.full .shine {
        fill: rgba(255, 255, 255, 0.28);
      }
      .cell.full:hover {
        transform: translateY(-3px);
      }
      .cell.dim {
        opacity: 0.18;
      }
      .cell.closing::after,
      .cell.past::after {
        content: "";
        position: absolute;
        top: -3px;
        right: -4px;
        width: 45%;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1.5px solid #3e2716;
        background: #ffa000;
      }
      .cell.past::after {
        background: #e53935;
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
    `],t([bt({attribute:!1})],Et.prototype,"hass",void 0),t([gt()],Et.prototype,"_config",void 0),t([gt()],Et.prototype,"_data",void 0),t([gt()],Et.prototype,"_error",void 0),t([gt()],Et.prototype,"_typeFilter",void 0),t([gt()],Et.prototype,"_query",void 0),t([gt()],Et.prototype,"_dialog",void 0),t([gt()],Et.prototype,"_moving",void 0),t([gt()],Et.prototype,"_toast",void 0),Et=t([pt("taponbon-card")],Et),window.customCards=window.customCards||[],window.customCards.push({type:"taponbon-card",name:"TaponBon",description:"La tua cantina: scaffali, bottiglie, QR e finestre di beva",preview:!1});export{Et as TaponBonCard};
