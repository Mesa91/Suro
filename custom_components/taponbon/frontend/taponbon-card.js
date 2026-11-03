function t(t,e,i,s){var a,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(r=(o<3?a(r):o>3?a(e,i,r):a(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:b}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=b(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??_)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=t=>t,A=k.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+C,P=`<${z}>`,M=document,R=()=>M.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,j=/>/g,D=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,q=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=B(1),V=B(2),G=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,Q=M.createTreeWalker(M,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===N?"!--"===l[1]?r=H:void 0!==l[1]?r=j:void 0!==l[2]?(q.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=a??N,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?D:'"'===l[3]?L:I):r===L||r===I?r=D:r===H||r===j?r=N:(r=D,a=void 0);const p=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+P:d>=0?(s.push(n),i.slice(0,d)+S+i.slice(d)+C+p):i+C+(-2===d?e:p)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const r=t.length-1,n=this.parts,[l,d]=K(t,e);if(this.el=Z.createElement(l,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&n.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?at:"@"===r[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:a}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),Q.nextNode(),n.push({type:2,index:++a});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===z)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)n.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===G)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);Q.currentNode=s;let a=Q.nextNode(),o=0,r=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new et(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new rt(a,this,t)),this._$AV.push(e),n=i[++r]}o!==n?.index&&(a=Q.nextNode(),o++)}return Q.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new et(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=X(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const s=t;let r,n;for(t=a[0],r=0;r<a.length-1;r++)n=X(this,s[i+r],e,r),n===G&&(n=this._$AH[r]),o||=!O(n)||n!==this._$AH[r],n===W?t=W:t!==W&&(t+=(n??"")+a[r+1]),this._$AH[r]=n}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class ot extends it{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??W)===G)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=k.litHtmlPolyfillSupport;nt?.(Z,et),(k.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class dt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new et(e.insertBefore(R(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:_},bt=(t=ht,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?bt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ut({...t,state:!0,attribute:!1})}function ft(t){return t.shelves?.length?t.shelves:Array(t.rows).fill(t.cols)}function mt(t){return ft(t).reduce((t,e)=>t+e,0)}const vt=[{key:"name",label:"Nome del vino",kind:"text"},{key:"producer",label:"Produttore",kind:"text"},{key:"vintage",label:"Annata",kind:"year"},{key:"region",label:"Regione / denominazione",kind:"text"},{key:"country",label:"Paese",kind:"text"},{key:"grape",label:"Vitigno",kind:"text"},{key:"drink_from",label:"Da bere dal",kind:"year"},{key:"drink_until",label:"Da bere entro il",kind:"year"},{key:"alcohol",label:"Gradazione",kind:"text"},{key:"price",label:"Prezzo (€)",kind:"number"},{key:"food_pairings",label:"Abbinamenti",kind:"area"},{key:"description",label:"Descrizione",kind:"area"},{key:"notes",label:"Note personali",kind:"area"}];function $t(t){return`${t.name||"Vino"}${t.vintage?` ${t.vintage}`:""}`}function _t(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}const yt=r`
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
`,xt={red:{shape:"bordeaux",glass:"tb-glass-red",clear:!1,foil:"tb-foil-wine"},white:{shape:"burgundy",glass:"tb-wine-white",clear:!0,foil:"tb-foil-silver"},rose:{shape:"bordeaux",glass:"tb-wine-rose",clear:!0,foil:"tb-foil-rose"},sparkling:{shape:"champagne",glass:"tb-glass-green",clear:!1,foil:"tb-foil-gold"},dessert:{shape:"bordeaux",glass:"tb-glass-amber",clear:!1,foil:"tb-foil-gold"}},kt={bordeaux:{body:"M9.7 1h4.6v16.5c0 3.4 6.7 4.8 6.7 11.5v31.2c0 1.5-1.2 2.8-2.8 2.8H5.8C4.2 63 3 61.7 3 60.2V29c0-6.7 6.7-8.1 6.7-11.5z",foil:"M9.5 1.4c0-.8.5-1.4 1.3-1.4h2.4c.8 0 1.3.6 1.3 1.4V13H9.5z",label:[4.4,35,15.2,16.5],neckY:15,fillY:22},burgundy:{body:"M9.8 1h4.4v13c0 5 7 9 7 18v28.2c0 1.5-1.2 2.8-2.8 2.8H5.6c-1.6 0-2.8-1.3-2.8-2.8V32c0-9 7-13 7-18z",foil:"M9.6 1.4c0-.8.5-1.4 1.3-1.4h2.2c.8 0 1.3.6 1.3 1.4V12H9.6z",label:[4.2,36,15.6,16],neckY:13.5,fillY:19},champagne:{body:"M9.4 1h5.2v11c0 6 7.6 9.5 7.6 19v29.4c0 1.4-1.2 2.6-2.6 2.6H4.4C3 63 1.8 61.8 1.8 60.4V31c0-9.5 7.6-13 7.6-19z",foil:"M9 1.6C9 .7 9.7 0 10.6 0h2.8c.9 0 1.6.7 1.6 1.6V12c0 2.4 2.6 4.4 4.3 6.6l-14.6.1C6.4 16.4 9 14.4 9 12z",label:[3.6,37,16.8,13],neckY:20,fillY:20},half:{body:"M10 20h4v9c0 2.6 5.2 3.6 5.2 8.8v22.6c0 1.4-1.1 2.6-2.5 2.6H7.3c-1.4 0-2.5-1.2-2.5-2.6V37.8c0-5.2 5.2-6.2 5.2-8.8z",foil:"M9.8 20.9c0-.5.4-.9.9-.9h2.6c.5 0 .9.4.9.9V28H9.8z",label:[6,44,12,11],neckY:30,fillY:33}};function wt(t,e){const i=xt[t]||xt.red,s=kt[i.shape],[a,o,r,n]=s.label,l=a+r/2;return V`<svg viewBox="0 0 24 64" aria-hidden="true">
    <ellipse cx="12" cy="63.2" rx="9.5" ry="1" fill="rgba(0,0,0,.55)" filter="url(#tb-soft)"/>
    ${i.clear?V`<path d=${s.body} fill="url(#tb-glass-clear)"/>
            <path d=${s.body} fill=${`url(#${i.glass})`} clip-path=${`url(#tb-fill-${i.shape})`}/>
            <rect x="0" y=${s.fillY} width="24" height=".5" fill="rgba(255,255,255,.35)" clip-path=${`url(#tb-in-${i.shape})`}/>`:V`<path d=${s.body} fill=${`url(#${i.glass})`}/>`}
    <path d=${s.body} fill="url(#tb-cylinder)"/>
    <path d=${s.body} fill="none" stroke="rgba(255,255,255,.18)" stroke-width=".35"/>
    <ellipse cx="12" cy="61.4" rx="6.5" ry="1.3" fill="rgba(0,0,0,.35)" clip-path=${`url(#tb-in-${i.shape})`}/>
    <g class="label-group">
      <rect x=${a} y=${o} width=${r} height=${n} rx=".5" fill="url(#tb-paper)"/>
      <rect x=${a} y=${o} width=${r} height=${n} rx=".5" fill="url(#tb-label-curve)"/>
      <rect x=${a+.9} y=${o+.9} width=${r-1.8} height=${n-1.8} rx=".3" fill="none" stroke="rgba(120,90,50,.55)" stroke-width=".25"/>
      <circle cx=${l} cy=${o+.3*n} r=${.12*Math.min(r,n)} fill="none" stroke="rgba(120,80,30,.8)" stroke-width=".3"/>
      <rect x=${l-.3*r} y=${o+.55*n} width=${.6*r} height=".9" rx=".45" fill="rgba(40,20,15,.75)"/>
      <rect x=${l-.22*r} y=${o+.7*n} width=${.44*r} height=".5" rx=".25" fill="rgba(40,20,15,.45)"/>
      <rect x=${l-.15*r} y=${o+.8*n} width=${.3*r} height=".5" rx=".25" fill="rgba(40,20,15,.35)"/>
    </g>
    <path d=${s.foil} fill=${`url(#${i.foil})`}/>
    <path d=${s.foil} fill="url(#tb-cylinder)" opacity=".6"/>
    <path d="M5.4 30c.6-3.8 2.6-5.6 3.6-6.8V59.5H5.4z" fill="url(#tb-spec)" clip-path=${`url(#tb-in-${i.shape})`} opacity=".9"/>
    <rect x="17.6" y="31" width=".9" height="27" rx=".45" fill="rgba(255,255,255,.18)" clip-path=${`url(#tb-in-${i.shape})`}/>
    ${e?function(t,e){const i="past"===e?"url(#tb-tag-past)":"url(#tb-tag-soon)";return V`<g class="tag">
    <path d=${`M12 ${t}c3 .2 4.6 1 5.4 2.6`} fill="none" stroke="rgba(240,230,210,.85)" stroke-width=".35"/>
    <g transform=${`translate(16.4 ${t+2}) rotate(14)`}>
      <rect x="0" y="0" width="6.4" height="8.6" rx="1.1" fill=${i} stroke="rgba(0,0,0,.35)" stroke-width=".25"/>
      <circle cx="3.2" cy="1.4" r=".55" fill="rgba(0,0,0,.45)"/>
      ${"past"===e?V`<path d="M3.2 3.3v2.6M3.2 7v.1" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>`:V`<circle cx="3.2" cy="5.4" r="1.9" fill="none" stroke="#3b2200" stroke-width=".45"/>
              <path d="M3.2 4.3v1.2l.8.6" fill="none" stroke="#3b2200" stroke-width=".45" stroke-linecap="round"/>`}
    </g>
  </g>`}(s.neckY,e):W}
  </svg>`}const At=V`<svg viewBox="0 0 24 64" aria-hidden="true">
  <path d=${kt.bordeaux.body} fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" stroke-width=".45" stroke-dasharray="1.4 1.2"/>
</svg>`,Et=(t,e)=>V`<linearGradient id=${t} x1="0" x2="1" y1="0" y2="0">
  ${e.map(([t,e])=>V`<stop offset=${t} stop-color=${e}/>`)}
</linearGradient>`,St=V`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="tb-soft" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation=".6"/></filter>
  ${["bordeaux","burgundy","champagne","half"].map(t=>{const e=kt[t];return V`
    <clipPath id=${`tb-in-${t}`}><path d=${e.body}/></clipPath>
    <clipPath id=${`tb-fill-${t}`}><rect x="0" y=${e.fillY} width="24" height="64"/></clipPath>`})}

  <!-- glass and wine -->
  ${Et("tb-glass-red",[[0,"#060404"],[.18,"#1c0a0d"],[.42,"#3b0f18"],[.6,"#2a0a11"],[1,"#050303"]])}
  ${Et("tb-glass-green",[[0,"#030603"],[.2,"#0e2412"],[.42,"#1d4223"],[.62,"#12301a"],[1,"#020402"]])}
  ${Et("tb-glass-amber",[[0,"#160902"],[.2,"#5a2c08"],[.42,"#9c5714"],[.62,"#6e3a0c"],[1,"#120701"]])}
  ${Et("tb-wine-white",[[0,"#5a4a12"],[.2,"#b9a043"],[.42,"#ecd98e"],[.62,"#cdb158"],[1,"#4d3e0e"]])}
  ${Et("tb-wine-rose",[[0,"#b87a6d"],[.2,"#d9917c"],[.42,"#f0b3a0"],[.62,"#e39a83"],[1,"#c48a7c"]])}
  ${Et("tb-glass-clear",[[0,"rgba(190,215,200,.30)"],[.3,"rgba(230,245,235,.10)"],[.7,"rgba(230,245,235,.08)"],[1,"rgba(160,190,175,.35)"]])}

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
  ${Et("tb-foil-wine",[[0,"#1d0508"],[.3,"#7a1d2b"],[.45,"#c4515f"],[.6,"#6a1523"],[1,"#150305"]])}
  ${Et("tb-foil-gold",[[0,"#5a3a08"],[.3,"#c9962e"],[.45,"#ffe7a1"],[.6,"#b88421"],[1,"#4a2f05"]])}
  ${Et("tb-foil-silver",[[0,"#3c3c3c"],[.3,"#a9a9a9"],[.45,"#f2f2f2"],[.6,"#9a9a9a"],[1,"#2e2e2e"]])}
  ${Et("tb-foil-rose",[[0,"#5e2d24"],[.3,"#c47e6c"],[.45,"#f6cdbd"],[.6,"#b46e5d"],[1,"#4d241c"]])}

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
</defs></svg>`;function Ct(t,e,i){return F`
    <div class="form">
      <label class="field wide">
        Tipo
        <div class="types">
          ${Object.entries(t.types).map(([t,s])=>F`<button type="button" class="chip ${e.type===t?"active":""}"
              @click=${()=>i("type",t)}><span class="dot" style="background:${s.color}"></span>${s.label}</button>`)}
        </div>
      </label>
      ${vt.map(t=>{const s="name"===t.key||"area"===t.kind,a=e[t.key]??"",o=e=>i(t.key,e.target.value);return F`<label class="field ${s?"wide":""}">
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
  `}let zt=class extends dt{constructor(){super(...arguments),this.rackId=null,this.row=null,this.col=null,this._values={type:"red"},this._quantity=1,this._busy=!1,this._reading="",this._front="",this._back=""}_merge(t,e){const i={...this._values};for(const[s,a]of Object.entries(t))null!=a&&""!==a&&(e||void 0===i[s]||null===i[s]||""===String(i[s]).trim())&&(i[s]=a);this._values=i}async _photo(t,e){const i=t.target,s=i.files?.[0];if(i.value="",!s)return;const a=await async function(t,e=1280){const i=URL.createObjectURL(t);try{const t=new Image;t.src=i,await t.decode();const s=Math.min(1,e/Math.max(t.naturalWidth,t.naturalHeight)),a=document.createElement("canvas");return a.width=Math.round(t.naturalWidth*s),a.height=Math.round(t.naturalHeight*s),a.getContext("2d").drawImage(t,0,0,a.width,a.height),a.toDataURL("image/jpeg",.85)}finally{URL.revokeObjectURL(i)}}(s);"front"===e?this._front=a:this._back=a,this._front&&await this._read()}async _read(){this._reading=this._back?"Leggo fronte e retro…":"Leggo l'etichetta…";try{const t=await this.card.ws({type:"taponbon/ai_recognize",image:this._front,...this._back?{back_image:this._back}:{}});this._merge(t.wine,!0),this.card.toast(this._back?"Fronte e retro letti: controlla i dati":"Etichetta letta: controlla i dati")}catch{}finally{this._reading=""}}_slot(t){const e="front"===t?this._front:this._back,i="front"===t?"Fronte":"Retro",s=!!this._reading||"back"===t&&!this._front;return F`<label class="slot ${e?"has":""} ${s?"off":""}"
        title=${"back"!==t||this._front?`Foto ${i.toLowerCase()}`:"Prima fotografa il fronte"}>
      ${e?F`<img src=${e} alt=${i} />`:F`<span class="plus">📷</span>`}
      <span class="slot-label">${i}${"back"!==t||e?W:F`<small>facoltativo</small>`}</span>
      <input type="file" accept="image/*" capture="environment" ?disabled=${s}
        @change=${e=>this._photo(e,t)} />
    </label>`}async _fill(){if(String(this._values.name||"").trim()){this._reading="Completo i dati…";try{const t=await this.card.ws({type:"taponbon/ai_fill",wine:this._values});this._merge(t.wine,!1),this.card.toast("Dati completati")}catch{}finally{this._reading=""}}else this.card.toast("Scrivi almeno il nome del vino")}_renderAI(){return this.data.ai?F`<div class="ai">
      <div class="slots">${this._slot("front")}${this._slot("back")}</div>
      <div class="ai-side">
        <div class="ai-title">✨ Compilazione automatica</div>
        <div class="note">${this._reading||(this._front?"Fatto. Se in etichetta mancava qualcosa, aggiungi il retro.":"Fotografa il fronte dell'etichetta; il retro è facoltativo.")}</div>
        <button class="btn small" style="margin-top:8px" ?disabled=${!!this._reading} @click=${this._fill}>Oppure completa dal nome</button>
      </div>
      ${this._reading?F`<div class="reading"></div>`:W}
    </div>`:F`<div class="ai"><div>
        <div class="ai-title">✨ Compilazione automatica</div>
        <div class="note">Aggiungi una chiave Gemini (gratuita) in Impostazioni → Dispositivi e servizi → TaponBon → Configura per leggere le etichette con una foto.</div>
      </div></div>`}_close(){this.dispatchEvent(new CustomEvent("close"))}async _save(){if(String(this._values.name||"").trim()){this._busy=!0;try{const t=(await this.card.ws({type:"taponbon/add_bottles",wine:this._values,quantity:this._quantity,rack_id:this.rackId,row:this.row,col:this.col})).bottles,e=t.filter(t=>!t.rack_id).length;this.card.toast(e?`Aggiunte ${t.length} bottiglie, ${e} da sistemare: scaffale pieno`:t.length>1?`Aggiunte ${t.length} bottiglie`:"Bottiglia aggiunta"),this._close()}finally{this._busy=!1}}else this.card.toast("Scrivi almeno il nome del vino")}render(){const t=this.data.racks.find(t=>t.id===this.rackId),e=t&&null!=this.row&&null!=this.col?`${t.name}, mensola ${this.row+1}, posto ${this.col+1}`:"nel primo posto libero";return F`
      ${St}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div style="display:flex;gap:16px;align-items:flex-end">
              <div style="width:34px;flex:none;filter:drop-shadow(0 8px 10px rgba(0,0,0,.55))">${wt(this._values.type||"red")}</div>
              <div>
                <div class="eyebrow">Nuovo in cantina</div>
                <div class="dialog-title">${String(this._values.name||"").trim()||"Aggiungi vino"}</div>
              </div>
            </div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this._renderAI()}
            ${Ct(this.data,this._values,(t,e)=>this._values={...this._values,[t]:e})}
            <div class="form" style="margin-top:10px">
              <label class="field">
                Quante bottiglie
                <input type="number" min="1" max="100" .value=${String(this._quantity)}
                  @input=${t=>this._quantity=Math.max(1,Math.min(100,Number(t.target.value)||1))} />
              </label>
              <div class="field">Dove<span style="color:var(--tb-ink);text-transform:none;letter-spacing:normal;font-size:1.3em">${e}${this._quantity>1?" e i successivi":""}</span></div>
            </div>
            ${this.data.settings.auto_labels?F`<p class="note">Per ogni bottiglia verrà richiesta la stampa dell'etichetta QR.</p>`:W}
          </div>
          <div class="dialog-foot">
            <button class="btn" @click=${this._close}>Annulla</button>
            <button class="btn primary" ?disabled=${this._busy} @click=${this._save}>
              ${this._busy?"Salvo…":"Aggiungi "+(this._quantity>1?`${this._quantity} bottiglie`:"bottiglia")}
            </button>
          </div>
        </div>
      </div>
    `}};zt.styles=[yt,r`
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
    `],t([ut({attribute:!1})],zt.prototype,"card",void 0),t([ut({attribute:!1})],zt.prototype,"data",void 0),t([ut({attribute:!1})],zt.prototype,"rackId",void 0),t([ut({attribute:!1})],zt.prototype,"row",void 0),t([ut({attribute:!1})],zt.prototype,"col",void 0),t([gt()],zt.prototype,"_values",void 0),t([gt()],zt.prototype,"_quantity",void 0),t([gt()],zt.prototype,"_busy",void 0),t([gt()],zt.prototype,"_reading",void 0),t([gt()],zt.prototype,"_front",void 0),t([gt()],zt.prototype,"_back",void 0),zt=t([pt("tb-add-dialog")],zt);let Pt=class extends dt{constructor(){super(...arguments),this._label=null,this._editing=!1,this._values={},this._sameWine=!0,this._otherReason=!1,this._busy=!1}willUpdate(t){if(t.has("data")&&this._label&&this.data.settings.label_format!==this._label.label_format&&(this._label=null,this._loadLabel()),t.has("bottle")){const e=t.get("bottle");e?.id!==this.bottle.id&&(this._label=null,this._editing=!1,this._loadLabel())}}async _loadLabel(){const t=this.bottle.id;try{const e=await this.card.hass.callWS({type:"taponbon/get_label",bottle_id:t});this.bottle.id===t&&(this._label=e)}catch{}}_close(){this.dispatchEvent(new CustomEvent("close"))}_sameWineCount(){const t=t=>`${(t.name||"").trim().toLowerCase()}|${(t.producer||"").trim().toLowerCase()}|${t.vintage||""}`;return this.data.bottles.filter(e=>t(e)===t(this.bottle)).length}async _remove(t){this._busy=!0;try{await this.card.ws({type:"taponbon/remove_bottle",bottle_id:this.bottle.id,reason:t}),this.card.toast(`${$t(this.bottle)}: ${this.data.reasons[t]?.toLowerCase()||"tolta"}. La trovi nello storico.`),this._close()}finally{this._busy=!1}}async _saveEdit(){this._busy=!0;try{const t=await this.card.ws({type:"taponbon/update_bottle",bottle_id:this.bottle.id,changes:this._values,same_wine:this._sameWine});this.card.toast(t.updated>1?`Aggiornate ${t.updated} bottiglie`:"Bottiglia aggiornata"),this._editing=!1,this._label=null,this._loadLabel()}finally{this._busy=!1}}async _printOnPrinter(){const t=await this.card.ws({type:"taponbon/request_label",bottle_id:this.bottle.id});this.card.toast(t.printed?"Etichetta stampata":this.data.printer?"Stampa non riuscita: guarda le notifiche di Home Assistant":"Richiesta inviata. Per stampare da solo, scegli la stampante nelle opzioni di TaponBon.")}_printInBrowser(){if(!this._label)return;const t=window.open("","_blank","width=480,height=360");if(!t)return void this.card.toast("Il browser ha bloccato la finestra di stampa");const{width_mm:e,height_mm:i}=this._label;t.document.write(`<!doctype html><html><head><title>Etichetta ${this._label.code}</title>\n      <style>@page{size:${e}mm ${i}mm;margin:0}html,body{margin:0}img{width:${e}mm;height:${i}mm;display:block}</style></head>\n      <body><img src="data:image/png;base64,${this._label.png_base64}"\n      onload="setTimeout(function(){window.print();window.close();},150)"></body></html>`),t.document.close()}render(){const t=this.bottle,e=this.data.types[t.type];return F`
      ${St}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="hero">
            <div class="hero-bottle">${wt(t.type,t.alert)}</div>
            <div class="hero-text">
              <div class="eyebrow">${e?.label||""}${t.region?` · ${t.region}`:""}</div>
              <div class="dialog-title">${t.name||"Vino"}</div>
              ${t.producer?F`<div class="producer">${t.producer}</div>`:W}
              <div class="vintage">${t.vintage||"s.a."}</div>
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
        ${"closing"===t.alert?F`<span class="badge warn">Da bere presto</span>`:W}
        ${"past"===t.alert?F`<span class="badge bad">Oltre la finestra</span>`:W}
        <span class="where">📍 ${function(t,e){const i=e.find(e=>e.id===t.rack_id);return i&&null!=t.row&&null!=t.col?`${i.name} · mensola ${t.row+1}, posto ${t.col+1}`:"Da sistemare"}(t,this.data.racks)}</span>
      </div>
      <dl class="facts">
        ${vt.filter(t=>!["name","producer","vintage","drink_from","drink_until"].includes(t.key)).map(e=>{const i=t[e.key];return null==i||""===i?W:F`<dt>${e.label}</dt><dd>${"price"===e.key?`${Number(i).toFixed(2)} €`:i}</dd>`})}
        ${i?F`<dt>Finestra di beva</dt><dd>${i}</dd>`:W}
      </dl>
      <div class="label-box">
        ${this._label?F`<img class="label ${this._label.label_format}" alt="Etichetta QR" src="data:image/png;base64,${this._label.png_base64}" />`:F`<div class="note">Preparo l'etichetta…</div>`}
        <div class="note">Inquadra il QR con l'app Home Assistant quando prendi la bottiglia: verrà tolta dalla cantina.</div>
        <div class="row">
          <button class="btn small" @click=${this._printOnPrinter}>🖨️ Stampante etichette</button>
          <button class="btn small" ?disabled=${!this._label} @click=${this._printInBrowser}>Stampa dal browser</button>
        </div>
      </div>
      ${this._otherReason?F`<div class="reasons">
            ${Object.entries(this.data.reasons).filter(([t])=>"drank"!==t).map(([t,e])=>F`<button class="btn small ${"deleted"===t?"danger":""}" ?disabled=${this._busy}
                @click=${()=>this._remove(t)}>${e}</button>`)}
          </div>`:W}
    `}_renderViewFoot(){return F`<div class="dialog-foot">
      <button class="btn" @click=${()=>this.dispatchEvent(new CustomEvent("move",{detail:{bottle:this.bottle}}))}>↔ Sposta</button>
      <button class="btn" @click=${()=>{this._values=Object.fromEntries(["type",...vt.map(t=>t.key)].map(t=>[t,this.bottle[t]??""])),this._sameWine=!0,this._editing=!0}}>✏️ Modifica</button>
      <button class="btn" @click=${()=>this._otherReason=!this._otherReason}>Altro…</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${()=>this._remove("drank")}>🍷 Bevuta</button>
    </div>`}_renderEdit(){const t=this._sameWineCount();return F`
      ${Ct(this.data,this._values,(t,e)=>this._values={...this._values,[t]:e})}
      ${t>1?F`<label class="check"><input type="checkbox" .checked=${this._sameWine}
            @change=${t=>this._sameWine=t.target.checked} />
            Applica a tutte le ${t} bottiglie di questo vino</label>`:W}
    `}_renderEditFoot(){return F`<div class="dialog-foot">
      <button class="btn" @click=${()=>this._editing=!1}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${this._saveEdit}>Salva</button>
    </div>`}};Pt.styles=[yt,r`
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
    `],t([ut({attribute:!1})],Pt.prototype,"card",void 0),t([ut({attribute:!1})],Pt.prototype,"data",void 0),t([ut({attribute:!1})],Pt.prototype,"bottle",void 0),t([gt()],Pt.prototype,"_label",void 0),t([gt()],Pt.prototype,"_editing",void 0),t([gt()],Pt.prototype,"_values",void 0),t([gt()],Pt.prototype,"_sameWine",void 0),t([gt()],Pt.prototype,"_otherReason",void 0),t([gt()],Pt.prototype,"_busy",void 0),Pt=t([pt("tb-bottle-dialog")],Pt);let Mt=class extends dt{constructor(){super(...arguments),this._drafts={},this._open=null}_close(){this.dispatchEvent(new CustomEvent("close"))}_draft(t){return this._drafts[t.id]||{name:t.name,shelves:[...ft(t)]}}_edit(t,e){const i=this._draft(t),s={name:i.name,shelves:[...i.shelves]};e(s),this._drafts={...this._drafts,[t.id]:s}}_setShelfCount(t,e){this._edit(t,t=>{e=Math.max(1,Math.min(30,e));const i=t.shelves[t.shelves.length-1]||6;for(;t.shelves.length<e;)t.shelves.push(i);t.shelves.length=e})}_setShelf(t,e,i){this._edit(t,t=>t.shelves[e]=Math.max(1,Math.min(30,i)))}_setAll(t,e){this._edit(t,t=>t.shelves=t.shelves.map(()=>Math.max(1,Math.min(30,e))))}_count(t){return this.data.bottles.filter(e=>e.rack_id===t).length}async _save(t){const e=this._draft(t),i=await this.card.ws({type:"taponbon/save_rack",rack:{id:t.id,name:e.name,shelves:e.shelves}}),s={...this._drafts};delete s[t.id],this._drafts=s,this.card.toast(i.displaced?`Salvato. ${i.displaced} bottiglie sono finite in "Da sistemare".`:"Scaffale salvato")}async _delete(t){const e=this._count(t.id);confirm(`Eliminare "${t.name}"?${e?` Le sue ${e} bottiglie restano in cantina, in "Da sistemare".`:""}`)&&(await this.card.ws({type:"taponbon/delete_rack",rack_id:t.id}),this.card.toast("Scaffale eliminato"))}async _add(){const t=await this.card.ws({type:"taponbon/save_rack",rack:{name:`Scaffale ${this.data.racks.length+1}`,shelves:[8,8,8,8,8]}});this._open=t.rack.id}async _setting(t,e){await this.card.ws({type:"taponbon/update_settings",[t]:e})}_stepper(t,e){return F`<span class="stepper">
      <button @click=${()=>e(t-1)} aria-label="meno">−</button>
      <span>${t}</span>
      <button @click=${()=>e(t+1)} aria-label="più">+</button>
    </span>`}_preview(t){const e=Math.max(...t);return F`<div class="preview">
      ${t.map(t=>F`<div class="pv-shelf">
        <div class="pv-row" style="grid-template-columns: repeat(${t}, 1fr); width: ${t/e*100}%">
          ${Array.from({length:t},()=>F`<i></i>`)}
        </div>
        <div class="pv-board"></div>
      </div>`)}
    </div>`}_renderRack(t){const e=this._draft(t),i=!!this._drafts[t.id],s=this._open===t.id||i,a=e.shelves.every(t=>t===e.shelves[0]),o=e.shelves.reduce((t,e)=>t+e,0);return F`<div class="rack ${s?"open":""}">
      <button class="rack-sum" @click=${()=>this._open=s&&!i?null:t.id}>
        <span class="rack-name">${e.name}</span>
        <span class="note">${e.shelves.length} mensole · ${o} posti · ${this._count(t.id)} bottiglie</span>
        <span class="chev">${s?"▴":"▾"}</span>
      </button>
      ${s?F`<div class="rack-edit">
            <div class="cols">
              <div class="controls">
                <label class="field">Nome
                  <input .value=${e.name} @input=${e=>this._edit(t,t=>t.name=e.target.value)} />
                </label>
                <div class="line"><span>Mensole</span>${this._stepper(e.shelves.length,e=>this._setShelfCount(t,e))}</div>
                <div class="line">
                  <span>Bottiglie per mensola${a?"":F` <em class="note">(diverse)</em>`}</span>
                  ${this._stepper(a?e.shelves[0]:Math.max(...e.shelves),e=>this._setAll(t,e))}
                </div>
                <details ?open=${!a}>
                  <summary>Personalizza ogni mensola</summary>
                  ${e.shelves.map((i,s)=>F`<div class="line small">
                    <span>Mensola ${s+1}${0===s?" (in alto)":s===e.shelves.length-1?" (in basso)":""}</span>
                    ${this._stepper(i,e=>this._setShelf(t,s,e))}
                  </div>`)}
                </details>
              </div>
              ${this._preview(e.shelves)}
            </div>
            <div class="rack-foot">
              <button class="btn small danger" @click=${()=>this._delete(t)}>Elimina scaffale</button>
              <span>
                ${i?F`<button class="btn small" @click=${()=>{const e={...this._drafts};delete e[t.id],this._drafts=e}}>Annulla</button>`:W}
                <button class="btn small primary" ?disabled=${!i} @click=${()=>this._save(t)}>Salva</button>
              </span>
            </div>
          </div>`:W}
    </div>`}render(){const t=this.data.settings,e=this.data.racks.reduce((t,e)=>t+mt(e),0);return F`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div>
              <div class="eyebrow">La tua cantina</div>
              <div class="dialog-title">Scaffali e impostazioni</div>
            </div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            <div class="section" style="margin-top:4px">Scaffali · ${e} posti</div>
            ${this.data.racks.map(t=>this._renderRack(t))}
            <button class="btn" @click=${this._add}>＋ Nuovo scaffale</button>

            <div class="section">Etichette</div>
            <div class="types" style="margin-bottom:12px">
              ${[["qr","Solo QR · 23 × 23 mm"],["qr30","Solo QR · 30 × 30 mm"],["full","QR e dati del vino · 50 × 30 mm"]].map(([e,i])=>F`<button class="chip ${t.label_format===e?"active":""}"
                  @click=${()=>this._setting("label_format",e)}>${i}</button>`)}
            </div>
            <label class="check">
              <input type="checkbox" .checked=${t.auto_labels}
                @change=${t=>this._setting("auto_labels",t.target.checked)} />
              Stampa l'etichetta QR quando aggiungo una bottiglia
            </label>

            <div class="section">Finestra di beva</div>
            <div class="note" style="margin-bottom:8px">Avvisami prima che si chiuda:</div>
            <div class="types">
              ${[[90,"3 mesi"],[180,"6 mesi"],[365,"1 anno"]].map(([e,i])=>F`<button class="chip ${t.alert_days===e?"active":""}"
                  @click=${()=>this._setting("alert_days",e)}>${i}</button>`)}
            </div>
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}};Mt.styles=[yt,r`
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
    `],t([ut({attribute:!1})],Mt.prototype,"card",void 0),t([ut({attribute:!1})],Mt.prototype,"data",void 0),t([gt()],Mt.prototype,"_drafts",void 0),t([gt()],Mt.prototype,"_open",void 0),Mt=t([pt("tb-racks-dialog")],Mt);let Rt=class extends dt{constructor(){super(...arguments),this._items=null}connectedCallback(){super.connectedCallback(),this._load()}async _load(){const t=await this.card.ws({type:"taponbon/get_history"});this._items=t.history}_close(){this.dispatchEvent(new CustomEvent("close"))}async _restore(t){const e=await this.card.ws({type:"taponbon/restore",history_id:t.history_id});this.card.toast(e.bottle.rack_id?"Rimessa al suo posto":'Rimessa in cantina, in "Da sistemare"'),this._load()}render(){return F`
      ${St}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-head">
            <div><div class="eyebrow">Bottiglie stappate e non solo</div><div class="dialog-title">Storico</div></div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${null===this._items?F`<div class="note">Carico…</div>`:this._items.length?this._items.map(t=>F`<div class="item">
                    <span class="mini">${wt(t.type)}</span>
                    <div class="text">
                      <div>${$t(t)}</div>
                      <div class="note">${this.data.reasons[t.reason]||t.reason} · ${new Date(t.removed_at).toLocaleDateString("it-IT")}
                        ${t.producer?F` · ${t.producer}`:W}</div>
                    </div>
                    <button class="btn small" @click=${()=>this._restore(t)}>Rimetti</button>
                  </div>`):F`<div class="note">Ancora nessuna bottiglia tolta dalla cantina.</div>`}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `}};Rt.styles=[yt,r`
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
    `],t([ut({attribute:!1})],Rt.prototype,"card",void 0),t([ut({attribute:!1})],Rt.prototype,"data",void 0),t([gt()],Rt.prototype,"_items",void 0),Rt=t([pt("tb-history-dialog")],Rt);let Ot=class extends dt{constructor(){super(...arguments),this._config={type:"custom:taponbon-card"},this._data=null,this._error="",this._typeFilter="",this._query="",this._dialog=null,this._moving=null,this._toast="",this._subscribing=!1,this._startMove=t=>{this._moving=t.detail.bottle,this._dialog=null}}setConfig(t){this._config={...t}}static getStubConfig(){return{type:"custom:taponbon-card"}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}connectedCallback(){super.connectedCallback(),this.hass&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.(),this._unsub=void 0}updated(t){t.has("hass")&&this.hass&&!this._unsub&&!this._subscribing&&this._subscribe()}async _subscribe(){if(!this._unsub&&!this._subscribing&&this.hass?.connection){this._subscribing=!0;try{this._unsub=await this.hass.connection.subscribeMessage(t=>{this._data=t,this._error=""},{type:"taponbon/subscribe"})}catch(t){this._error="unknown_command"===t?.code?"L'integrazione TaponBon non è installata: aggiungila da Impostazioni → Dispositivi e servizi.":`Impossibile caricare la cantina: ${t?.message||t}`}finally{this._subscribing=!1}}}async ws(t){try{return await this.hass.callWS(t)}catch(t){throw this.toast(t?.message||"Operazione non riuscita"),t}}toast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",3500)}_onCell(t,e,i,s){if(this._moving){const a=this._moving;if(this._moving=null,s?.id===a.id)return;return void this.ws({type:"taponbon/move_bottle",bottle_id:a.id,rack_id:t.id,row:e,col:i}).then(()=>this.toast(s?"Bottiglie scambiate di posto":"Bottiglia spostata"))}this._dialog=s?{kind:"bottle",bottleId:s.id}:{kind:"add",rackId:t.id,row:e,col:i}}render(){const t=this._data;return F`
      <ha-card>
        ${St}
        ${this._error?F`<div class="empty">${this._error}</div>`:t?this._renderBody(t):F`<div class="empty">Carico la cantina…</div>`}
        ${this._toast?F`<div class="toast">${this._toast}</div>`:W}
      </ha-card>
      ${t?this._renderDialog(t):W}
    `}_renderBody(t){const e=t.bottles.length,i=t.racks.reduce((t,e)=>t+mt(e),0),s=t.bottles.filter(t=>"closing"===t.alert).length,a=t.bottles.filter(t=>"past"===t.alert).length,o=t.bottles.filter(t=>!t.rack_id),r=Object.fromEntries(Object.keys(t.types).map(e=>[e,t.bottles.filter(t=>t.type===e).length])),n=Math.round(Number(this._config.columns))||0,l=n?Math.max(1,Math.min(6,n,t.racks.length||1)):0;return F`
      <div class="header">
        <div class="title">
          <span class="logo">🍷</span>
          <div>
            <div class="name">${this._config.title||"TaponBon"}</div>
            <div class="sub">${e} bottiglie · ${i-t.racks.reduce((e,i)=>e+this._inRack(t,i).length,0)} posti liberi</div>
          </div>
        </div>
        ${this._renderClimate(t)}
        <div class="actions">
          <button class="btn primary" @click=${()=>this._dialog={kind:"add",rackId:null,row:null,col:null}}>
            ＋ Aggiungi
          </button>
          <button class="btn" title="Storico" @click=${()=>this._dialog={kind:"history"}}>🕓 Storico</button>
          <button class="btn" title="Scaffali e impostazioni" @click=${()=>this._dialog={kind:"racks"}}>⚙︎</button>
        </div>
      </div>

      ${s||a?F`<div class="banner">
            ${s?F`<span>🍷 <b>${s}</b> da bere presto</span>`:W}
            ${a?F`<span>⚠️ <b>${a}</b> oltre la finestra di beva</span>`:W}
            <span class="hint">cartellino dorato: da bere presto · rosso: oltre la finestra</span>
          </div>`:W}

      ${this._moving?F`<div class="banner moving">
            Tocca la nuova posizione per <b>${$t(this._moving)}</b>
            <button class="btn small" @click=${()=>this._moving=null}>Annulla</button>
          </div>`:W}

      <div class="filters">
        <button class="chip ${this._typeFilter?"":"active"}" @click=${()=>this._typeFilter=""}>Tutti ${e}</button>
        ${Object.entries(t.types).map(([t,e])=>F`<button
            class="chip ${this._typeFilter===t?"active":""}"
            @click=${()=>this._typeFilter=this._typeFilter===t?"":t}
          ><span class="dot" style="background:${e.color}"></span>${e.label} ${r[t]||0}</button>`)}
        <input class="search" type="search" placeholder="Cerca vino, produttore, annata…"
          .value=${this._query} @input=${t=>this._query=t.target.value} />
      </div>

      <div class="racks ${l?"fixed":""}" style=${l?`--tb-columns:${l}`:""}>
        ${t.racks.map(e=>this._renderRack(t,e))}
      </div>

      ${o.length?F`<div class="unplaced">
            <div class="section-title">Da sistemare (${o.length})</div>
            <div class="list">
              ${o.map(e=>F`<button class="list-item ${this._dims(e)?"dim":""}"
                  @click=${()=>this._dialog={kind:"bottle",bottleId:e.id}}>
                  <span class="dot" style="background:${t.types[e.type]?.color}"></span>${$t(e)}
                </button>`)}
            </div>
          </div>`:W}
      ${t.racks.length?W:F`<div class="empty">Nessuno scaffale: creane uno da ⚙︎.</div>`}
    `}_renderClimate(t){const e=t.climate;if(!e||!e.temperature_entity&&!e.humidity_entity)return W;const i=(t,e,i,s,a,o)=>{if(!t)return W;const r=this.hass?.states?.[t],n=r?Number(r.state):NaN,l=!isNaN(n),d=l?n<s?"low":n>a?"high":"ok":"na",c=l?n.toLocaleString("it-IT",{maximumFractionDigits:1}):"—";return F`<button class="climate ${d}" title=${"ok"===d?`${o} ideale (${s}–${a} ${i})`:"na"===d?`${o} non disponibile`:`${o} troppo ${"low"===d?"bassa":"alta"}: ideale ${s}–${a} ${i}`}
        @click=${()=>this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}>
        <span class="ci">${e}</span><b>${c}</b><span class="cu">${i}</span>
      </button>`};return F`<div class="climates">
      ${i(e.temperature_entity,"🌡","°C",e.temperature_min,e.temperature_max,"Temperatura")}
      ${i(e.humidity_entity,"💧","%",e.humidity_min,e.humidity_max,"Umidità")}
    </div>`}_inRack(t,e){return t.bottles.filter(t=>t.rack_id===e.id&&null!=t.row&&null!=t.col)}_dims(t){return this._typeFilter&&t.type!==this._typeFilter||!function(t,e){if(!e)return!0;const i=_t([t.name,t.producer,t.vintage,t.region,t.country,t.grape,t.notes,t.code].filter(Boolean).join(" "));return _t(e).split(/\s+/).every(t=>i.includes(t))}(t,this._query)}_renderRack(t,e){const i=this._inRack(t,e),s=new Map(i.map(t=>[`${t.row}:${t.col}`,t])),a=ft(e);return F`
      <div class="rack">
        <div class="rack-head"><span>${e.name}</span><span class="muted">${i.length}/${mt(e)}</span></div>
        <div class="shelves">
          ${a.map((t,i)=>F`<div class="shelf">
            <div class="grid" style="grid-template-columns: repeat(${t}, minmax(0, 34px))">
              ${Array.from({length:t},(t,a)=>{const o=s.get(`${i}:${a}`);return F`<button
                  class="cell ${o?"full":"free"} ${o&&this._dims(o)?"dim":""} ${o&&this._moving?.id===o.id?"moving":""}"
                  title=${o?`${$t(o)}${o.producer?` · ${o.producer}`:""}`:`Mensola ${i+1}, posto ${a+1}: libero`}
                  @click=${()=>this._onCell(e,i,a,o)}
                >${o?wt(o.type,o.alert):At}</button>`})}
            </div>
            <div class="board"></div>
          </div>`)}
        </div>
      </div>
    `}_renderDialog(t){const e=this._dialog;if(!e)return W;const i=()=>this._dialog=null;switch(e.kind){case"add":return F`<tb-add-dialog .card=${this} .data=${t} .rackId=${e.rackId} .row=${e.row} .col=${e.col} @close=${i}></tb-add-dialog>`;case"bottle":{const s=t.bottles.find(t=>t.id===e.bottleId);return s?F`<tb-bottle-dialog .card=${this} .data=${t} .bottle=${s} @close=${i} @move=${this._startMove}></tb-bottle-dialog>`:W}case"racks":return F`<tb-racks-dialog .card=${this} .data=${t} @close=${i}></tb-racks-dialog>`;case"history":return F`<tb-history-dialog .card=${this} .data=${t} @close=${i}></tb-history-dialog>`}}};Ot.styles=[yt,r`
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
    `],t([ut({attribute:!1})],Ot.prototype,"hass",void 0),t([gt()],Ot.prototype,"_config",void 0),t([gt()],Ot.prototype,"_data",void 0),t([gt()],Ot.prototype,"_error",void 0),t([gt()],Ot.prototype,"_typeFilter",void 0),t([gt()],Ot.prototype,"_query",void 0),t([gt()],Ot.prototype,"_dialog",void 0),t([gt()],Ot.prototype,"_moving",void 0),t([gt()],Ot.prototype,"_toast",void 0),Ot=t([pt("taponbon-card")],Ot),window.customCards=window.customCards||[],window.customCards.push({type:"taponbon-card",name:"TaponBon",description:"La tua cantina: scaffali, bottiglie, QR e finestre di beva",preview:!1});export{Ot as TaponBonCard};
