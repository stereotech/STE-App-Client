(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{405:function(t,e,n){"use strict";n.r(e);n(31),n(32),n(22);var r,o=n(12),c=(n(30),n(6)),l=n(18),f=(r=function(t,b){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,b){t.__proto__=b}||function(t,b){for(var p in b)b.hasOwnProperty(p)&&(t[p]=b[p])})(t,b)},function(t,b){function e(){this.constructor=t}r(t,b),t.prototype=null===b?Object.create(b):(e.prototype=b.prototype,new e)}),h=function(t,e,n,desc){var r,c=arguments.length,l=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(o.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(l=(c<3?r(l):c>3?r(e,n,l):r(e,n))||l);return c>3&&l&&Object.defineProperty(e,n,l),l},y=function(t,e,n,r){return new(n||(n=Promise))(function(o,c){function l(t){try{h(r.next(t))}catch(t){c(t)}}function f(t){try{h(r.throw(t))}catch(t){c(t)}}function h(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(l,f)}h((r=r.apply(t,e||[])).next())})},d=function(t,body){var e,n,r,g,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return g={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function c(c){return function(l){return function(c){if(e)throw new TypeError("Generator is already executing.");for(;o;)try{if(e=1,n&&(r=2&c[0]?n.return:c[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,c[1])).done)return r;switch(n=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,n=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!(r=(r=o.trys).length>0&&r[r.length-1])&&(6===c[0]||2===c[0])){o=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){o.label=c[1];break}if(6===c[0]&&o.label<r[1]){o.label=r[1],r=c;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(c);break}r[2]&&o.ops.pop(),o.trys.pop();continue}c=body.call(t,o)}catch(t){c=[6,t],n=0}finally{e=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,l])}}},v=Object(l.namespace)("settingsState"),w=Object(l.namespace)("printersState"),_=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return f(e,t),e.prototype.layout=function(){return"solid"},e.prototype.head=function(){return{title:"STE App Client"}},e.prototype.disconnect=function(){var t=this.printer(this.settings.systemId).apiKey;this.disconnectPrinter(t)},e.prototype.pollData=function(){return y(this,void 0,void 0,function(){return d(this,function(t){return this.$store.dispatch("printersState/fetchPrinters"),[2]})})},e.prototype.mounted=function(){return y(this,void 0,void 0,function(){return d(this,function(t){switch(t.label){case 0:return[4,this.pollData()];case 1:return t.sent(),[2]}})})},e.prototype.beforeDestroy=function(){clearInterval(this.pollingStatus)},h([v.Getter],e.prototype,"settings",void 0),h([w.Getter],e.prototype,"printer",void 0),h([w.Action],e.prototype,"disconnectPrinter",void 0),e=h([Object(c.Component)({})],e)}(c.Vue),m=n(13),O=n(14),x=n.n(O),j=n(132),P=n(118),component=Object(m.a)(_,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-flex",{attrs:{xs12:"","text-xs-center":""}},[n("h1",{staticClass:"display-4"},[t._v("Client 3D Printer")]),t._v(" "),n("h4",{staticClass:"display-1"},[t._v("This printer is connected to "+t._s(t.settings.hostname)+" printer. Please use that printer to control this one")]),t._v(" "),n("v-btn",{attrs:{large:"",color:"accent"},on:{click:t.disconnect}},[t._v("Disconnect from "+t._s(t.settings.hostname))])],1)},[],!1,null,null,null);e.default=component.exports;x()(component,{VBtn:j.a,VFlex:P.a})}}]);