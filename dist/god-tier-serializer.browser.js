/*! god-tier-serializer 1.1.0 | MIT License | https://github.com/jlachniet/god-tier-serializer */!function(){"use strict";var e={913:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.config=void 0;var n=t(974);r.config={get inferIdentifiers(){return a},get serializePrototypes(){return i},set inferIdentifiers(e){if("boolean"!==(0,n.safeTypeOf)(e))throw new TypeError("config.inferIdentifiers set to invalid value, expected (boolean) but got ("+(0,n.safeTypeOf)(e)+")");a=e},set serializePrototypes(e){if("boolean"!==(0,n.safeTypeOf)(e))throw new TypeError("config.serializePrototypes set to invalid value, expected (boolean) but got ("+(0,n.safeTypeOf)(e)+")");i=e}};var a=!1,i=!1},775:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.deserialize=void 0;var n=t(360),a=t(886),i=t(673),o=t(974);r.deserialize=function(e){if((0,a.registerBuiltIns)(),"string"!==(0,o.safeTypeOf)(e))throw new TypeError("deserialize called with invalid arguments, expected (string) but got ("+(0,o.safeTypeOf)(e)+")");for(var r=JSON.parse(e),t=[],y=0;y<r.length;y++)p(y);function p(e){if(!(Object.getOwnPropertyNames(t).indexOf(String(e))>-1)){var a=r[e];switch(a[0]){case"undefined":t[e]=void 0;break;case"null":t[e]=null;break;case"boolean":case"string":t[e]=a[1];break;case"number":t[e]=Number(a[1]);break;case"bigint":t[e]=BigInt(a[1]);break;case"symbol":void 0===a[2]?t[e]=Symbol(null!==a[1]?a[1]:void 0):t[e]=Symbol.for(a[2]);break;case"reference":t[e]=(0,o.getDefinitionByIdentifier)(a[1])[0];break;default:switch(p(a[1]),a[0]){case"Array":t[e]=new Array;break;case"Int8Array":t[e]=new Int8Array(a[3]);break;case"Uint8Array":t[e]=new Uint8Array(a[3]);break;case"Uint8ClampedArray":t[e]=new Uint8ClampedArray(a[3]);break;case"Int16Array":t[e]=new Int16Array(a[3]);break;case"Uint16Array":t[e]=new Uint16Array(a[3]);break;case"Int32Array":t[e]=new Int32Array(a[3]);break;case"Uint32Array":t[e]=new Uint32Array(a[3]);break;case"Float32Array":t[e]=new Float32Array(a[3]);break;case"Float64Array":t[e]=new Float64Array(a[3]);break;case"BigInt64Array":t[e]=new BigInt64Array(a[3]);break;case"BigUint64Array":t[e]=new BigUint64Array(a[3]);break;case"Set":t[e]=new Set;break;case"Map":t[e]=new Map;break;case"Date":t[e]=new Date(a[3]);break;case"RegExp":var i=a[3].lastIndexOf("/"),y=a[3].substring(1,i),s=a[3].substring(i+1);t[e]=new RegExp(y,s);break;case"Boolean":t[e]=new Boolean(a[3]);break;case"Number":t[e]=new Number(a[3]);break;case"String":t[e]=new String(a[3]);break;case"Symbol":void 0===a[4]?t[e]=new Object(Symbol(null!==a[3]?a[3]:void 0)):t[e]=new Object(Symbol.for(a[4]));break;case"BigInt":t[e]=new Object(BigInt(a[3]));break;default:t[e]=Object.create(t[a[1]])}var f=r[a[1]];"Object"===a[0]||"reference"===f[0]&&f[1]===a[0]||(0,n.setPrototypeOf)(t[e],t[a[1]])}}}return r.forEach((function(e,r){(0,i.isGTObject)(e)&&(e[2].forEach((function(e){(0,i.isGTDataProperty)(e)?Object.defineProperty(t[r],t[e[0]],{value:t[e[1]],configurable:e[2],enumerable:e[3],writable:e[4]}):Object.defineProperty(t[r],t[e[0]],{get:t[e[1]],set:t[e[2]],configurable:e[3],enumerable:e[4]})})),"Set"===e[0]&&e[3].forEach((function(e){t[r].add(t[e])})),"Map"===e[0]&&e[3].forEach((function(e){t[r].set(t[e[0]],t[e[1]])})))})),t[0]}},607:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.config=r.register=r.deserialize=r.serialize=void 0;var n=t(485);Object.defineProperty(r,"serialize",{enumerable:!0,get:function(){return n.serialize}});var a=t(775);Object.defineProperty(r,"deserialize",{enumerable:!0,get:function(){return a.deserialize}});var i=t(886);Object.defineProperty(r,"register",{enumerable:!0,get:function(){return i.register}});var o=t(913);Object.defineProperty(r,"config",{enumerable:!0,get:function(){return o.config}})},360:function(e,r){Object.defineProperty(r,"__esModule",{value:!0}),r.setPrototypeOf=r.objectIs=r.arrayFind=void 0,r.arrayFind=function(e,r){for(var t=0;t<e.length;t++)if(r(e[t],t,e))return e[t]},r.objectIs=function(e,r){return e===r?0!==e||1/e==1/r:e!=e&&r!=r},r.setPrototypeOf=function(e,r){if(Object.setPrototypeOf)Object.setPrototypeOf(e,r);else{if(!e.__proto__)throw new Error("Could not set prototype, not supported by environment");e.__proto__=r}}},886:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.registerBuiltIns=r.register=r.definitions=void 0;var n=t(607),a=t(974);r.definitions=[];var i=!1;function o(e,t){if(i||y(),"string"!==(0,a.safeTypeOf)(t)&&"undefined"!==(0,a.safeTypeOf)(t))throw new TypeError("register called with invalid arguments, expected (any, string?) but got ("+(0,a.safeTypeOf)(e)+", "+(0,a.safeTypeOf)(t)+")");if(void 0===t){if(!e.constructor||!e.constructor.name)throw new Error("register called without an identifier, and the identifier could not be inferred");if(!n.config.inferIdentifiers)throw new TypeError("register called without an identifier, pass as identifier or set config.inferIdentifiers to true");t=e.constructor.name}(0,a.getDefinitionByIdentifier)(t)?(0,a.getDefinitionByIdentifier)(t)[0]=e:r.definitions.push([e,t])}function y(){i||(i=!0,o(Object.prototype,"Object"),o(Array.prototype,"Array"),o(Boolean.prototype,"Boolean"),o(Date.prototype,"Date"),o(Number.prototype,"Number"),o(RegExp.prototype,"RegExp"),o(String.prototype,"String"),"undefined"!=typeof Int8Array&&o(Int8Array.prototype,"Int8Array"),"undefined"!=typeof Uint8Array&&o(Uint8Array.prototype,"Uint8Array"),"undefined"!=typeof Uint8ClampedArray&&o(Uint8ClampedArray.prototype,"Uint8ClampedArray"),"undefined"!=typeof Int16Array&&o(Int16Array.prototype,"Int16Array"),"undefined"!=typeof Uint16Array&&o(Uint16Array.prototype,"Uint16Array"),"undefined"!=typeof Int32Array&&o(Int32Array.prototype,"Int32Array"),"undefined"!=typeof Uint32Array&&o(Uint32Array.prototype,"Uint32Array"),"undefined"!=typeof Float32Array&&o(Float32Array.prototype,"Float32Array"),"undefined"!=typeof Float64Array&&o(Float64Array.prototype,"Float64Array"),"undefined"!=typeof BigInt64Array&&o(BigInt64Array.prototype,"BigInt64Array"),"undefined"!=typeof BigUint64Array&&o(BigUint64Array.prototype,"BigUint64Array"),"undefined"!=typeof BigInt&&o(BigInt.prototype,"BigInt"),"undefined"!=typeof Map&&o(Map.prototype,"Map"),"undefined"!=typeof Set&&o(Set.prototype,"Set"),"undefined"!=typeof Symbol&&o(Symbol.prototype,"Symbol"))}r.register=o,r.registerBuiltIns=y},485:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.serialize=void 0;var n=t(913),a=t(886),i=t(974);r.serialize=function(e){(0,a.registerBuiltIns)();var r=[],t=[];return o(e,"(root)"),JSON.stringify(t);function o(e,a){if((0,i.safeIndexOf)(r,e)>-1)return(0,i.safeIndexOf)(r,e);var y,p,s,f,u=(0,i.getDefinitionByValue)(e);if(u)return r.push(e),t.push(["reference",u[1]]),r.length-1;switch((0,i.safeTypeOf)(e)){case"undefined":return r.push(void 0),t.push(["undefined"]),r.length-1;case"null":return r.push(null),t.push(["null"]),r.length-1;case"boolean":return f=e,r.push(f),t.push(["boolean",f]),r.length-1;case"number":return s=e,r.push(s),t.push(["number",(0,i.numberToString)(s)]),r.length-1;case"string":return p=e,r.push(p),t.push(["string",p]),r.length-1;case"bigint":return y=e,r.push(y),t.push(["bigint",String(y)]),r.length-1;case"symbol":return function(e){r.push(e),void 0===Symbol.keyFor(e)?t.push(["symbol",void 0!==e.description?e.description:null]):t.push(["symbol",e.description,Symbol.keyFor(e)]);return r.length-1}(e);case"object":return function(e,a){r.push(e);var y,p=r.length-1;switch((0,i.objectTypeOf)(e)){case"Array":y=["Array",0,[]];break;case"Int8Array":y=(0,i.getTypedArrayTemplate)(e,Int8Array);break;case"Uint8Array":y=(0,i.getTypedArrayTemplate)(e,Uint8Array);break;case"Uint8ClampedArray":y=(0,i.getTypedArrayTemplate)(e,Uint8ClampedArray);break;case"Int16Array":y=(0,i.getTypedArrayTemplate)(e,Int16Array);break;case"Uint16Array":y=(0,i.getTypedArrayTemplate)(e,Uint16Array);break;case"Int32Array":y=(0,i.getTypedArrayTemplate)(e,Int32Array);break;case"Uint32Array":y=(0,i.getTypedArrayTemplate)(e,Uint32Array);break;case"Float32Array":y=(0,i.getTypedArrayTemplate)(e,Float32Array);break;case"Float64Array":y=(0,i.getTypedArrayTemplate)(e,Float64Array);break;case"BigInt64Array":y=(0,i.getTypedArrayTemplate)(e,BigInt64Array);break;case"BigUint64Array":y=(0,i.getTypedArrayTemplate)(e,BigUint64Array);break;case"Set":y=["Set",0,[],[]];break;case"Map":y=["Map",0,[],[]];break;case"Date":y=["Date",0,[],Date.prototype.valueOf.call(e)];break;case"RegExp":y=["RegExp",0,[],RegExp.prototype.toString.call(e)];break;case"Boolean":y=["Boolean",0,[],Boolean.prototype.valueOf.call(e)];break;case"Number":y=["Number",0,[],(0,i.numberToString)(Number.prototype.valueOf.call(e))];break;case"String":y=["String",0,[],String.prototype.valueOf.call(e)];break;case"Symbol":var s=Symbol.prototype.valueOf.call(e);y=void 0===Symbol.keyFor(s)?["Symbol",0,[],s.description]:["Symbol",0,[],void 0!==s.description?s.description:null,Symbol.keyFor(s)];break;case"BigInt":y=["BigInt",0,[],String(BigInt.prototype.valueOf.call(e))];break;case"AsyncFunction":case"AsyncGeneratorFunction":case"Function":case"GeneratorFunction":throw new Error("Could not serialize unregistered function at "+a);default:y=["Object",0,[]]}if(t.push(y),null!==Object.getPrototypeOf(e)&&!(0,i.getDefinitionByValue)(Object.getPrototypeOf(e))&&!n.config.serializePrototypes)throw new Error("Could not serialize value with unregistered prototype at "+a);y[1]=o(Object.getPrototypeOf(e),"");var f=Object.getOwnPropertyNames(e);Object.getOwnPropertySymbols&&(f=f.concat(Object.getOwnPropertySymbols(e)));if(f.forEach((function(r){var t=Object.getOwnPropertyDescriptor(e,r);t.get||t.set?y[2].push([o(r,""),o(t.get,a+'["'+String(r)+'" getter]'),o(t.set,a+'["'+String(r)+'" setter]'),t.configurable,t.enumerable]):y[2].push([o(r,""),o(t.value,a+'["'+String(r)+'"]'),t.configurable,t.enumerable,t.writable])})),"Set"===y[0]){var u=0;Set.prototype.forEach.call(e,(function(e){y[3].push(o(e,a+" val#"+u)),u++}))}if("Map"===y[0]){var l=0;Map.prototype.forEach.call(e,(function(e,r){y[3].push([o(r,a+" key#"+l),o(e,a+" val#"+l)]),l++}))}return p}(e,a);default:throw new TypeError("Failed to serialize value with unknown type "+(0,i.safeTypeOf)(e))}}}},673:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.isGTDataProperty=r.isGTObject=void 0;var n=t(974);r.isGTObject=function(e){return e[0].charAt(0)===e[0].charAt(0).toUpperCase()},r.isGTDataProperty=function(e){return"boolean"===(0,n.safeTypeOf)(e[2])}},974:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.getTypedArrayTemplate=r.numberToString=r.getDefinitionByValue=r.getDefinitionByIdentifier=r.objectTypeOf=r.safeTypeOf=r.safeIndexOf=void 0;var n=t(360),a=t(886);function i(e){return(0,n.arrayFind)(a.definitions,(function(r){return e===r[0]}))}r.safeIndexOf=function(e,r){for(var t=0;t<e.length;t++)if((0,n.objectIs)(e[t],r))return t;return-1},r.safeTypeOf=function(e){return null===e?"null":"function"==typeof e?"object":typeof e},r.objectTypeOf=function(e){return i(e)&&console.log(),Object.prototype.toString.call(e).slice(8,-1)},r.getDefinitionByIdentifier=function(e){return(0,n.arrayFind)(a.definitions,(function(r){return e===r[1]}))},r.getDefinitionByValue=i,r.numberToString=function(e){return(0,n.objectIs)(e,-0)?"-0":String(e)},r.getTypedArrayTemplate=function(e,r){return[r.name,0,[],r.prototype.toString.call(e).split(",").length]}}},r={};var t=function t(n){var a=r[n];if(void 0!==a)return a.exports;var i=r[n]={exports:{}};return e[n](i,i.exports,t),i.exports}(607);window.GodTierSerializer=t}();