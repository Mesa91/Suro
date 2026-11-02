function t(t,e,i,s){var o,a=arguments.length,r=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(a<3?o(r):a>3?o(e,i,r):o(e,i))||r);return a>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,b=globalThis,g=b.trustedTypes,f=g?g.emptyScript:"",$=b.reactiveElementPolyfillSupport,y=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!l(t,e),v={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);o?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const a=o.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const a=this.constructor;if(!1===s&&(o=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??_)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,$?.({ReactiveElement:x}),(b.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,z=document,O=()=>z.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,D=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,B=/"/g,q=/^(?:script|style|textarea|title)$/i,L=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=L(1),F=L(2),G=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,Q=z.createTreeWalker(z,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,a=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===H?"!--"===l[1]?r=N:void 0!==l[1]?r=j:void 0!==l[2]?(q.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=o??H,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?D:'"'===l[3]?B:I):r===B||r===I?r=D:r===N||r===j?r=H:(r=D,o=void 0);const p=r===D&&t[e+1].startsWith("/>")?" ":"";a+=r===H?i+M:d>=0?(s.push(n),i.slice(0,d)+S+i.slice(d)+C+p):i+C+(-2===d?e:p)}return[J(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,a=0;const r=t.length-1,n=this.parts,[l,d]=K(t,e);if(this.el=Z.createElement(l,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&n.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[a++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?ot:"@"===r[1]?at:it}),s.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:o}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),Q.nextNode(),n.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)n.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===G)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const a=R(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);Q.currentNode=s;let o=Q.nextNode(),a=0,r=0,n=i[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new et(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new rt(o,this,t)),this._$AV.push(e),n=i[++r]}a!==n?.index&&(o=Q.nextNode(),a++)}return Q.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),R(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let a=!1;if(void 0===o)t=X(this,t,e,0),a=!R(t)||t!==this._$AH&&t!==G,a&&(this._$AH=t);else{const s=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=X(this,s[i+r],e,r),n===G&&(n=this._$AH[r]),a||=!R(n)||n!==this._$AH[r],n===W?t=W:t!==W&&(t+=(n??"")+o[r+1]),this._$AH[r]=n}a&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class at extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??W)===G)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(Z,et),(w.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class dt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:_},ut=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function bt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return bt({...t,state:!0,attribute:!1})}const ft=[{key:"name",label:"Nome del vino",kind:"text"},{key:"producer",label:"Produttore",kind:"text"},{key:"vintage",label:"Annata",kind:"year"},{key:"region",label:"Regione / denominazione",kind:"text"},{key:"country",label:"Paese",kind:"text"},{key:"grape",label:"Vitigno",kind:"text"},{key:"drink_from",label:"Da bere dal",kind:"year"},{key:"drink_until",label:"Da bere entro il",kind:"year"},{key:"price",label:"Prezzo (€)",kind:"number"},{key:"notes",label:"Note",kind:"area"}];function $t(t){return`${t.name||"Vino"}${t.vintage?` ${t.vintage}`:""}`}function yt(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}const mt=r`
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
`,_t={red:{shape:"bordeaux",glass:"tb-glass-red",clear:!1,foil:"tb-foil-wine"},white:{shape:"burgundy",glass:"tb-wine-white",clear:!0,foil:"tb-foil-silver"},rose:{shape:"bordeaux",glass:"tb-wine-rose",clear:!0,foil:"tb-foil-rose"},sparkling:{shape:"champagne",glass:"tb-glass-green",clear:!1,foil:"tb-foil-gold"},dessert:{shape:"bordeaux",glass:"tb-glass-amber",clear:!1,foil:"tb-foil-gold"}},vt={bordeaux:{body:"M9.7 1h4.6v16.5c0 3.4 6.7 4.8 6.7 11.5v31.2c0 1.5-1.2 2.8-2.8 2.8H5.8C4.2 63 3 61.7 3 60.2V29c0-6.7 6.7-8.1 6.7-11.5z",foil:"M9.5 1.4c0-.8.5-1.4 1.3-1.4h2.4c.8 0 1.3.6 1.3 1.4V13H9.5z",label:[4.4,35,15.2,16.5],neckY:15,fillY:22},burgundy:{body:"M9.8 1h4.4v13c0 5 7 9 7 18v28.2c0 1.5-1.2 2.8-2.8 2.8H5.6c-1.6 0-2.8-1.3-2.8-2.8V32c0-9 7-13 7-18z",foil:"M9.6 1.4c0-.8.5-1.4 1.3-1.4h2.2c.8 0 1.3.6 1.3 1.4V12H9.6z",label:[4.2,36,15.6,16],neckY:13.5,fillY:19},champagne:{body:"M9.4 1h5.2v11c0 6 7.6 9.5 7.6 19v29.4c0 1.4-1.2 2.6-2.6 2.6H4.4C3 63 1.8 61.8 1.8 60.4V31c0-9.5 7.6-13 7.6-19z",foil:"M9 1.6C9 .7 9.7 0 10.6 0h2.8c.9 0 1.6.7 1.6 1.6V12c0 2.4 2.6 4.4 4.3 6.6l-14.6.1C6.4 16.4 9 14.4 9 12z",label:[3.6,37,16.8,13],neckY:20,fillY:20},half:{body:"M10 20h4v9c0 2.6 5.2 3.6 5.2 8.8v22.6c0 1.4-1.1 2.6-2.5 2.6H7.3c-1.4 0-2.5-1.2-2.5-2.6V37.8c0-5.2 5.2-6.2 5.2-8.8z",foil:"M9.8 20.9c0-.5.4-.9.9-.9h2.6c.5 0 .9.4.9.9V28H9.8z",label:[6,44,12,11],neckY:30,fillY:33}};function xt(t,e){const i=_t[t]||_t.red,s=vt[i.shape],[o,a,r,n]=s.label,l=o+r/2;return F`<svg viewBox="0 0 24 64" aria-hidden="true">
    <ellipse cx="12" cy="63.2" rx="9.5" ry="1" fill="rgba(0,0,0,.55)" filter="url(#tb-soft)"/>
    ${i.clear?F`<path d=${s.body} fill="url(#tb-glass-clear)"/>
            <path d=${s.body} fill=${`url(#${i.glass})`} clip-path=${`url(#tb-fill-${i.shape})`}/>
            <rect x="0" y=${s.fillY} width="24" height=".5" fill="rgba(255,255,255,.35)" clip-path=${`url(#tb-in-${i.shape})`}/>`:F`<path d=${s.body} fill=${`url(#${i.glass})`}/>`}
    <path d=${s.body} fill="url(#tb-cylinder)"/>
    <path d=${s.body} fill="none" stroke="rgba(255,255,255,.18)" stroke-width=".35"/>
    <ellipse cx="12" cy="61.4" rx="6.5" ry="1.3" fill="rgba(0,0,0,.35)" clip-path=${`url(#tb-in-${i.shape})`}/>
    <g class="label-group">
      <rect x=${o} y=${a} width=${r} height=${n} rx=".5" fill="url(#tb-paper)"/>
      <rect x=${o} y=${a} width=${r} height=${n} rx=".5" fill="url(#tb-label-curve)"/>
      <rect x=${o+.9} y=${a+.9} width=${r-1.8} height=${n-1.8} rx=".3" fill="none" stroke="rgba(120,90,50,.55)" stroke-width=".25"/>
      <circle cx=${l} cy=${a+.3*n} r=${.12*Math.min(r,n)} fill="none" stroke="rgba(120,80,30,.8)" stroke-width=".3"/>
      <rect x=${l-.3*r} y=${a+.55*n} width=${.6*r} height=".9" rx=".45" fill="rgba(40,20,15,.75)"/>
      <rect x=${l-.22*r} y=${a+.7*n} width=${.44*r} height=".5" rx=".25" fill="rgba(40,20,15,.45)"/>
      <rect x=${l-.15*r} y=${a+.8*n} width=${.3*r} height=".5" rx=".25" fill="rgba(40,20,15,.35)"/>
    </g>
    <path d=${s.foil} fill=${`url(#${i.foil})`}/>
    <path d=${s.foil} fill="url(#tb-cylinder)" opacity=".6"/>
    <path d="M5.4 30c.6-3.8 2.6-5.6 3.6-6.8V59.5H5.4z" fill="url(#tb-spec)" clip-path=${`url(#tb-in-${i.shape})`} opacity=".9"/>
    <rect x="17.6" y="31" width=".9" height="27" rx=".45" fill="rgba(255,255,255,.18)" clip-path=${`url(#tb-in-${i.shape})`}/>
    ${e?function(t,e){const i="past"===e?"url(#tb-tag-past)":"url(#tb-tag-soon)";return F`<g class="tag">
    <path d=${`M12 ${t}c3 .2 4.6 1 5.4 2.6`} fill="none" stroke="rgba(240,230,210,.85)" stroke-width=".35"/>
    <g transform=${`translate(16.4 ${t+2}) rotate(14)`}>
      <rect x="0" y="0" width="6.4" height="8.6" rx="1.1" fill=${i} stroke="rgba(0,0,0,.35)" stroke-width=".25"/>
      <circle cx="3.2" cy="1.4" r=".55" fill="rgba(0,0,0,.45)"/>
      ${"past"===e?F`<path d="M3.2 3.3v2.6M3.2 7v.1" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>`:F`<circle cx="3.2" cy="5.4" r="1.9" fill="none" stroke="#3b2200" stroke-width=".45"/>
              <path d="M3.2 4.3v1.2l.8.6" fill="none" stroke="#3b2200" stroke-width=".45" stroke-linecap="round"/>`}
    </g>
  </g>`}(s.neckY,e):W}
  </svg>`}const wt=F`<svg viewBox="0 0 24 64" aria-hidden="true">
  <path d=${vt.bordeaux.body} fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" stroke-width=".45" stroke-dasharray="1.4 1.2"/>
</svg>`,kt=(t,e)=>F`<linearGradient id=${t} x1="0" x2="1" y1="0" y2="0">
  ${e.map(([t,e])=>F`<stop offset=${t} stop-color=${e}/>`)}
</linearGradient>`,At=F`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="tb-soft" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation=".6"/></filter>
  ${["bordeaux","burgundy","champagne","half"].map(t=>{const e=vt[t];return F`
    <clipPath id=${`tb-in-${t}`}><path d=${e.body}/></clipPath>
    <clipPath id=${`tb-fill-${t}`}><rect x="0" y=${e.fillY} width="24" height="64"/></clipPath>`})}

  <!-- glass and wine -->
  ${kt("tb-glass-red",[[0,"#060404"],[.18,"#1c0a0d"],[.42,"#3b0f18"],[.6,"#2a0a11"],[1,"#050303"]])}
  ${kt("tb-glass-green",[[0,"#030603"],[.2,"#0e2412"],[.42,"#1d4223"],[.62,"#12301a"],[1,"#020402"]])}
  ${kt("tb-glass-amber",[[0,"#160902"],[.2,"#5a2c08"],[.42,"#9c5714"],[.62,"#6e3a0c"],[1,"#120701"]])}
  ${kt("tb-wine-white",[[0,"#5a4a12"],[.2,"#b9a043"],[.42,"#ecd98e"],[.62,"#cdb158"],[1,"#4d3e0e"]])}
  ${kt("tb-wine-rose",[[0,"#9a6a64"],[.2,"#e6b9ad"],[.42,"#fbe3da"],[.62,"#efc8bd"],[1,"#8a5c56"]])}
  ${kt("tb-glass-clear",[[0,"rgba(190,215,200,.30)"],[.3,"rgba(230,245,235,.10)"],[.7,"rgba(230,245,235,.08)"],[1,"rgba(160,190,175,.35)"]])}

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
  ${kt("tb-foil-wine",[[0,"#1d0508"],[.3,"#7a1d2b"],[.45,"#c4515f"],[.6,"#6a1523"],[1,"#150305"]])}
  ${kt("tb-foil-gold",[[0,"#5a3a08"],[.3,"#c9962e"],[.45,"#ffe7a1"],[.6,"#b88421"],[1,"#4a2f05"]])}
  ${kt("tb-foil-silver",[[0,"#3c3c3c"],[.3,"#a9a9a9"],[.45,"#f2f2f2"],[.6,"#9a9a9a"],[1,"#2e2e2e"]])}
  ${kt("tb-foil-rose",[[0,"#5e2d24"],[.3,"#c47e6c"],[.45,"#f6cdbd"],[.6,"#b46e5d"],[1,"#4d241c"]])}

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
</defs></svg>`;function Et(t,e,i){return V`
    <div class="form">
      <label class="field wide">
        Tipo
        <div class="types">
          ${Object.entries(t.types).map(([t,s])=>V`<button type="button" class="chip ${e.type===t?"active":""}"
              @click=${()=>i("type",t)}><span class="dot" style="background:${s.color}"></span>${s.label}</button>`)}
        </div>
      </label>
      ${ft.map(t=>{const s="name"===t.key||"area"===t.kind,o=e[t.key]??"",a=e=>i(t.key,e.target.value);return V`<label class="field ${s?"wide":""}">
          ${t.label}
          ${"area"===t.kind?V`<textarea rows="2" .value=${o} @input=${a}></textarea>`:V`<input
                type=${"text"===t.kind?"text":"number"}
                inputmode=${"text"===t.kind?"text":"numeric"}
                step=${"number"===t.kind?"0.01":"1"}
                .value=${String(o)}
                @input=${a}
              />`}
        </label>`})}
    </div>
  `}let St=class extends dt{constructor(){super(...arguments),this.rackId=null,this.row=null,this.col=null,this._values={type:"red"},this._quantity=1,this._busy=!1}_close(){this.dispatchEvent(new CustomEvent("close"))}async _save(){if(String(this._values.name||"").trim()){this._busy=!0;try{const t=(await this.card.ws({type:"taponbon/add_bottles",wine:this._values,quantity:this._quantity,rack_id:this.rackId,row:this.row,col:this.col})).bottles,e=t.filter(t=>!t.rack_id).length;this.card.toast(e?`Aggiunte ${t.length} bottiglie, ${e} da sistemare: scaffale pieno`:t.length>1?`Aggiunte ${t.length} bottiglie`:"Bottiglia aggiunta"),this._close()}finally{this._busy=!1}}else this.card.toast("Scrivi almeno il nome del vino")}render(){const t=this.data.racks.find(t=>t.id===this.rackId),e=t&&null!=this.row&&null!=this.col?`${t.name}, fila ${this.row+1}, posto ${this.col+1}`:"nel primo posto libero";return V`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Aggiungi vino</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${Et(this.data,this._values,(t,e)=>this._values={...this._values,[t]:e})}
            <div class="form" style="margin-top:10px">
              <label class="field">
                Quante bottiglie
                <input type="number" min="1" max="100" .value=${String(this._quantity)}
                  @input=${t=>this._quantity=Math.max(1,Math.min(100,Number(t.target.value)||1))} />
              </label>
              <div class="field">Dove<span style="color:var(--primary-text-color)">${e}${this._quantity>1?" e i successivi":""}</span></div>
            </div>
            ${this.data.settings.auto_labels?V`<p class="note">Per ogni bottiglia verrà richiesta la stampa dell'etichetta QR.</p>`:W}
          </div>
          <div class="dialog-foot">
            <button class="btn" @click=${this._close}>Annulla</button>
            <button class="btn primary" ?disabled=${this._busy} @click=${this._save}>
              ${this._busy?"Salvo…":"Aggiungi "+(this._quantity>1?`${this._quantity} bottiglie`:"bottiglia")}
            </button>
          </div>
        </div>
      </div>
    `}};St.styles=mt,t([bt({attribute:!1})],St.prototype,"card",void 0),t([bt({attribute:!1})],St.prototype,"data",void 0),t([bt({attribute:!1})],St.prototype,"rackId",void 0),t([bt({attribute:!1})],St.prototype,"row",void 0),t([bt({attribute:!1})],St.prototype,"col",void 0),t([gt()],St.prototype,"_values",void 0),t([gt()],St.prototype,"_quantity",void 0),t([gt()],St.prototype,"_busy",void 0),St=t([pt("tb-add-dialog")],St);let Ct=class extends dt{constructor(){super(...arguments),this._label=null,this._editing=!1,this._values={},this._sameWine=!0,this._otherReason=!1,this._busy=!1}willUpdate(t){if(t.has("bottle")){const e=t.get("bottle");e?.id!==this.bottle.id&&(this._label=null,this._editing=!1,this._loadLabel())}}async _loadLabel(){const t=this.bottle.id;try{const e=await this.card.hass.callWS({type:"taponbon/get_label",bottle_id:t});this.bottle.id===t&&(this._label=e)}catch{}}_close(){this.dispatchEvent(new CustomEvent("close"))}_sameWineCount(){const t=t=>`${(t.name||"").trim().toLowerCase()}|${(t.producer||"").trim().toLowerCase()}|${t.vintage||""}`;return this.data.bottles.filter(e=>t(e)===t(this.bottle)).length}async _remove(t){this._busy=!0;try{await this.card.ws({type:"taponbon/remove_bottle",bottle_id:this.bottle.id,reason:t}),this.card.toast(`${$t(this.bottle)}: ${this.data.reasons[t]?.toLowerCase()||"tolta"}. La trovi nello storico.`),this._close()}finally{this._busy=!1}}async _saveEdit(){this._busy=!0;try{const t=await this.card.ws({type:"taponbon/update_bottle",bottle_id:this.bottle.id,changes:this._values,same_wine:this._sameWine});this.card.toast(t.updated>1?`Aggiornate ${t.updated} bottiglie`:"Bottiglia aggiornata"),this._editing=!1,this._label=null,this._loadLabel()}finally{this._busy=!1}}async _printOnPrinter(){await this.card.ws({type:"taponbon/request_label",bottle_id:this.bottle.id}),this.card.toast("Etichetta inviata alla stampante")}_printInBrowser(){if(!this._label)return;const t=window.open("","_blank","width=480,height=360");t?(t.document.write(`<!doctype html><html><head><title>Etichetta ${this._label.code}</title>\n      <style>@page{size:50mm 30mm;margin:0}html,body{margin:0}img{width:50mm;height:30mm;display:block}</style></head>\n      <body><img src="data:image/png;base64,${this._label.png_base64}"\n      onload="setTimeout(function(){window.print();window.close();},150)"></body></html>`),t.document.close()):this.card.toast("Il browser ha bloccato la finestra di stampa")}render(){const t=this.bottle,e=this.data.types[t.type];return V`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div>
              <div class="dialog-title">${$t(t)}</div>
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
    `}_renderView(t,e){const i=function(t){return t.drink_from&&t.drink_until?`${t.drink_from}–${t.drink_until}`:t.drink_until?`entro il ${t.drink_until}`:t.drink_from?`dal ${t.drink_from}`:""}(t);return V`
      <div class="badges">
        <span class="badge" style="background:${e?.color}">${e?.label||t.type}</span>
        ${"closing"===t.alert?V`<span class="badge warn">Da bere presto</span>`:W}
        ${"past"===t.alert?V`<span class="badge bad">Oltre la finestra</span>`:W}
        <span class="where">📍 ${function(t,e){const i=e.find(e=>e.id===t.rack_id);return i&&null!=t.row&&null!=t.col?`${i.name} · fila ${t.row+1}, posto ${t.col+1}`:"Da sistemare"}(t,this.data.racks)}</span>
      </div>
      <dl class="facts">
        ${ft.filter(t=>!["name","producer","vintage","drink_from","drink_until"].includes(t.key)).map(e=>{const i=t[e.key];return null==i||""===i?W:V`<dt>${e.label}</dt><dd>${"price"===e.key?`${Number(i).toFixed(2)} €`:i}</dd>`})}
        ${i?V`<dt>Finestra di beva</dt><dd>${i}</dd>`:W}
      </dl>
      <div class="label-box">
        ${this._label?V`<img class="label" alt="Etichetta QR" src="data:image/png;base64,${this._label.png_base64}" />`:V`<div class="note">Preparo l'etichetta…</div>`}
        <div class="note">Inquadra il QR con l'app Home Assistant quando prendi la bottiglia: verrà tolta dalla cantina.</div>
        <div class="row">
          <button class="btn small" @click=${this._printOnPrinter}>🖨️ Stampante etichette</button>
          <button class="btn small" ?disabled=${!this._label} @click=${this._printInBrowser}>Stampa dal browser</button>
        </div>
      </div>
      ${this._otherReason?V`<div class="reasons">
            ${Object.entries(this.data.reasons).filter(([t])=>"drank"!==t).map(([t,e])=>V`<button class="btn small ${"deleted"===t?"danger":""}" ?disabled=${this._busy}
                @click=${()=>this._remove(t)}>${e}</button>`)}
          </div>`:W}
    `}_renderViewFoot(){return V`<div class="dialog-foot">
      <button class="btn" @click=${()=>this.dispatchEvent(new CustomEvent("move",{detail:{bottle:this.bottle}}))}>↔ Sposta</button>
      <button class="btn" @click=${()=>{this._values=Object.fromEntries(["type",...ft.map(t=>t.key)].map(t=>[t,this.bottle[t]??""])),this._sameWine=!0,this._editing=!0}}>✏️ Modifica</button>
      <button class="btn" @click=${()=>this._otherReason=!this._otherReason}>Altro…</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${()=>this._remove("drank")}>🍷 Bevuta</button>
    </div>`}_renderEdit(){const t=this._sameWineCount();return V`
      ${Et(this.data,this._values,(t,e)=>this._values={...this._values,[t]:e})}
      ${t>1?V`<label class="check"><input type="checkbox" .checked=${this._sameWine}
            @change=${t=>this._sameWine=t.target.checked} />
            Applica a tutte le ${t} bottiglie di questo vino</label>`:W}
    `}_renderEditFoot(){return V`<div class="dialog-foot">
      <button class="btn" @click=${()=>this._editing=!1}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${this._saveEdit}>Salva</button>
    </div>`}};Ct.styles=[mt,r`
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
    `],t([bt({attribute:!1})],Ct.prototype,"card",void 0),t([bt({attribute:!1})],Ct.prototype,"data",void 0),t([bt({attribute:!1})],Ct.prototype,"bottle",void 0),t([gt()],Ct.prototype,"_label",void 0),t([gt()],Ct.prototype,"_editing",void 0),t([gt()],Ct.prototype,"_values",void 0),t([gt()],Ct.prototype,"_sameWine",void 0),t([gt()],Ct.prototype,"_otherReason",void 0),t([gt()],Ct.prototype,"_busy",void 0),Ct=t([pt("tb-bottle-dialog")],Ct);let Pt=class extends dt{constructor(){super(...arguments),this._drafts={}}_close(){this.dispatchEvent(new CustomEvent("close"))}_draft(t){return{...t,...this._drafts[t.id]}}_set(t,e,i){this._drafts={...this._drafts,[t]:{...this._drafts[t],[e]:i}}}_count(t){return this.data.bottles.filter(e=>e.rack_id===t).length}async _save(t){const e=this._draft(t),i=await this.card.ws({type:"taponbon/save_rack",rack:e}),s={...this._drafts};delete s[t.id],this._drafts=s,this.card.toast(i.displaced?`Salvato. ${i.displaced} bottiglie sono finite in "Da sistemare".`:"Scaffale salvato")}async _delete(t){const e=this._count(t.id);confirm(`Eliminare "${t.name}"?${e?` Le sue ${e} bottiglie restano in cantina, in "Da sistemare".`:""}`)&&(await this.card.ws({type:"taponbon/delete_rack",rack_id:t.id}),this.card.toast("Scaffale eliminato"))}async _add(){await this.card.ws({type:"taponbon/save_rack",rack:{name:`Scaffale ${this.data.racks.length+1}`,rows:7,cols:10}})}async _setting(t,e){await this.card.ws({type:"taponbon/update_settings",[t]:e})}render(){const t=this.data.settings;return V`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Scaffali e impostazioni</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this.data.racks.map(t=>{const e=this._draft(t),i=!!this._drafts[t.id];return V`<div class="rack">
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
                ${[[90,"3 mesi"],[180,"6 mesi"],[365,"1 anno"]].map(([e,i])=>V`<button class="chip ${t.alert_days===e?"active":""}"
                    @click=${()=>this._setting("alert_days",e)}>${i}</button>`)}
              </div>
            </div>
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}};Pt.styles=[mt,r`
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
    `],t([bt({attribute:!1})],Pt.prototype,"card",void 0),t([bt({attribute:!1})],Pt.prototype,"data",void 0),t([gt()],Pt.prototype,"_drafts",void 0),Pt=t([pt("tb-racks-dialog")],Pt);let Mt=class extends dt{constructor(){super(...arguments),this._items=null}connectedCallback(){super.connectedCallback(),this._load()}async _load(){const t=await this.card.ws({type:"taponbon/get_history"});this._items=t.history}_close(){this.dispatchEvent(new CustomEvent("close"))}async _restore(t){const e=await this.card.ws({type:"taponbon/restore",history_id:t.history_id});this.card.toast(e.bottle.rack_id?"Rimessa al suo posto":'Rimessa in cantina, in "Da sistemare"'),this._load()}render(){return V`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Storico</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${null===this._items?V`<div class="note">Carico…</div>`:this._items.length?this._items.map(t=>V`<div class="item">
                    <span class="dot" style="background:${this.data.types[t.type]?.color}"></span>
                    <div class="text">
                      <div>${$t(t)}</div>
                      <div class="note">${this.data.reasons[t.reason]||t.reason} · ${new Date(t.removed_at).toLocaleDateString("it-IT")}
                        ${t.producer?V` · ${t.producer}`:W}</div>
                    </div>
                    <button class="btn small" @click=${()=>this._restore(t)}>Rimetti</button>
                  </div>`):V`<div class="note">Ancora nessuna bottiglia tolta dalla cantina.</div>`}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}};Mt.styles=[mt,r`
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
    `],t([bt({attribute:!1})],Mt.prototype,"card",void 0),t([bt({attribute:!1})],Mt.prototype,"data",void 0),t([gt()],Mt.prototype,"_items",void 0),Mt=t([pt("tb-history-dialog")],Mt);let zt=class extends dt{constructor(){super(...arguments),this._config={type:"custom:taponbon-card"},this._data=null,this._error="",this._typeFilter="",this._query="",this._dialog=null,this._moving=null,this._toast="",this._subscribing=!1,this._startMove=t=>{this._moving=t.detail.bottle,this._dialog=null}}setConfig(t){this._config={...t}}static getStubConfig(){return{type:"custom:taponbon-card"}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}connectedCallback(){super.connectedCallback(),this.hass&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0}updated(t){t.has("hass")&&this.hass&&!this._unsub&&!this._subscribing&&this._subscribe()}async _subscribe(){if(!this._unsub&&!this._subscribing&&this.hass?.connection){this._subscribing=!0;try{this._unsub=await this.hass.connection.subscribeMessage(t=>{this._data=t,this._error=""},{type:"taponbon/subscribe"})}catch(t){this._error="unknown_command"===t?.code?"L'integrazione TaponBon non è installata: aggiungila da Impostazioni → Dispositivi e servizi.":`Impossibile caricare la cantina: ${t?.message||t}`}finally{this._subscribing=!1}}}async ws(t){try{return await this.hass.callWS(t)}catch(t){throw this.toast(t?.message||"Operazione non riuscita"),t}}toast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",3500)}_onCell(t,e,i,s){if(this._moving){const o=this._moving;if(this._moving=null,s?.id===o.id)return;return void this.ws({type:"taponbon/move_bottle",bottle_id:o.id,rack_id:t.id,row:e,col:i}).then(()=>this.toast(s?"Bottiglie scambiate di posto":"Bottiglia spostata"))}this._dialog=s?{kind:"bottle",bottleId:s.id}:{kind:"add",rackId:t.id,row:e,col:i}}render(){const t=this._data;return V`
      <ha-card>
        ${At}
        ${this._error?V`<div class="empty">${this._error}</div>`:t?this._renderBody(t):V`<div class="empty">Carico la cantina…</div>`}
        ${this._toast?V`<div class="toast">${this._toast}</div>`:W}
      </ha-card>
      ${t?this._renderDialog(t):W}
    `}_renderBody(t){const e=t.bottles.length,i=t.racks.reduce((t,e)=>t+e.rows*e.cols,0),s=t.bottles.filter(t=>"closing"===t.alert).length,o=t.bottles.filter(t=>"past"===t.alert).length,a=t.bottles.filter(t=>!t.rack_id),r=Object.fromEntries(Object.keys(t.types).map(e=>[e,t.bottles.filter(t=>t.type===e).length])),n=Math.max(1,Math.min(6,Math.round(Number(this._config.columns))||0));return V`
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

      ${s||o?V`<div class="banner">
            ${s?V`<span>🍷 <b>${s}</b> da bere presto</span>`:W}
            ${o?V`<span>⚠️ <b>${o}</b> oltre la finestra di beva</span>`:W}
            <span class="hint">cartellino dorato: da bere presto · rosso: oltre la finestra</span>
          </div>`:W}

      ${this._moving?V`<div class="banner moving">
            Tocca la nuova posizione per <b>${$t(this._moving)}</b>
            <button class="btn small" @click=${()=>this._moving=null}>Annulla</button>
          </div>`:W}

      <div class="filters">
        <button class="chip ${this._typeFilter?"":"active"}" @click=${()=>this._typeFilter=""}>Tutti ${e}</button>
        ${Object.entries(t.types).map(([t,e])=>V`<button
            class="chip ${this._typeFilter===t?"active":""}"
            @click=${()=>this._typeFilter=this._typeFilter===t?"":t}
          ><span class="dot" style="background:${e.color}"></span>${e.label} ${r[t]||0}</button>`)}
        <input class="search" type="search" placeholder="Cerca vino, produttore, annata…"
          .value=${this._query} @input=${t=>this._query=t.target.value} />
      </div>

      <div class="racks ${n?"fixed":""}" style=${n?`--tb-columns:${n}`:""}>
        ${t.racks.map(e=>this._renderRack(t,e))}
      </div>

      ${a.length?V`<div class="unplaced">
            <div class="section-title">Da sistemare (${a.length})</div>
            <div class="list">
              ${a.map(e=>V`<button class="list-item ${this._dims(e)?"dim":""}"
                  @click=${()=>this._dialog={kind:"bottle",bottleId:e.id}}>
                  <span class="dot" style="background:${t.types[e.type]?.color}"></span>${$t(e)}
                </button>`)}
            </div>
          </div>`:W}
      ${t.racks.length?W:V`<div class="empty">Nessuno scaffale: creane uno da ⚙︎.</div>`}
    `}_inRack(t,e){return t.bottles.filter(t=>t.rack_id===e.id&&null!=t.row&&null!=t.col)}_dims(t){return this._typeFilter&&t.type!==this._typeFilter||!function(t,e){if(!e)return!0;const i=yt([t.name,t.producer,t.vintage,t.region,t.country,t.grape,t.notes,t.code].filter(Boolean).join(" "));return yt(e).split(/\s+/).every(t=>i.includes(t))}(t,this._query)}_renderRack(t,e){const i=this._inRack(t,e),s=new Map(i.map(t=>[`${t.row}:${t.col}`,t])),o=[];for(let i=0;i<e.rows;i++)for(let a=0;a<e.cols;a++){const r=s.get(`${i}:${a}`),n=r?t.types[r.type]?.color||"#888":"";o.push(V`<button
          class="cell ${r?"full":"free"} ${r&&this._dims(r)?"dim":""} ${r?.alert||""} ${this._moving?.id===r?.id&&r?"moving":""}"
          style=${r?`--bottle:${n}`:""}
          title=${r?`${$t(r)}${r.producer?` · ${r.producer}`:""}`:`Fila ${i+1}, posto ${a+1}: libero`}
          @click=${()=>this._onCell(e,i,a,r)}
        >${r?xt(r.type,r.alert):wt}</button>`)}return V`
      <div class="rack">
        <div class="rack-head"><span>${e.name}</span><span class="muted">${i.length}/${e.rows*e.cols}</span></div>
        <div class="grid" style="grid-template-columns: repeat(${e.cols}, minmax(0, 34px))">${o}</div>
      </div>
    `}_renderDialog(t){const e=this._dialog;if(!e)return W;const i=()=>this._dialog=null;switch(e.kind){case"add":return V`<tb-add-dialog .card=${this} .data=${t} .rackId=${e.rackId} .row=${e.row} .col=${e.col} @close=${i}></tb-add-dialog>`;case"bottle":{const s=t.bottles.find(t=>t.id===e.bottleId);return s?V`<tb-bottle-dialog .card=${this} .data=${t} .bottle=${s} @close=${i} @move=${this._startMove}></tb-bottle-dialog>`:W}case"racks":return V`<tb-racks-dialog .card=${this} .data=${t} @close=${i}></tb-racks-dialog>`;case"history":return V`<tb-history-dialog .card=${this} .data=${t} @close=${i}></tb-history-dialog>`}}};zt.styles=[mt,r`
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
    `],t([bt({attribute:!1})],zt.prototype,"hass",void 0),t([gt()],zt.prototype,"_config",void 0),t([gt()],zt.prototype,"_data",void 0),t([gt()],zt.prototype,"_error",void 0),t([gt()],zt.prototype,"_typeFilter",void 0),t([gt()],zt.prototype,"_query",void 0),t([gt()],zt.prototype,"_dialog",void 0),t([gt()],zt.prototype,"_moving",void 0),t([gt()],zt.prototype,"_toast",void 0),zt=t([pt("taponbon-card")],zt),window.customCards=window.customCards||[],window.customCards.push({type:"taponbon-card",name:"TaponBon",description:"La tua cantina: scaffali, bottiglie, QR e finestre di beva",preview:!1});export{zt as TaponBonCard};
