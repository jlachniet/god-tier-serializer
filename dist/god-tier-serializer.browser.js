/*! god-tier-serializer 0.5.1 | MIT License | https://github.com/jlachniet/god-tier-serializer */!function(){"use strict";var e={913:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.config=void 0;var n=t(593);r.config={get inferIdentifiers(){return i},get serializePrototypes(){return a},set inferIdentifiers(e){if("boolean"!==(0,n.safeTypeOf)(e))throw new TypeError("config.inferIdentifiers set to invalid value, expected (boolean) but got ("+(0,n.safeTypeOf)(e)+")");i=e},set serializePrototypes(e){if("boolean"!==(0,n.safeTypeOf)(e))throw new TypeError("config.serializePrototypes set to invalid value, expected (boolean) but got ("+(0,n.safeTypeOf)(e)+")");a=e}};var i=!1,a=!1},775:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.deserialize=void 0;var n=t(360),i=t(593);r.deserialize=function(e){if("string"!==(0,i.safeTypeOf)(e))throw new TypeError("deserialize called with invalid arguments, expected (string) but got ("+(0,i.safeTypeOf)(e)+")");for(var r=JSON.parse(e),t=[],a=0;a<r.length;a++)o(a);function o(e){if(!(Object.getOwnPropertyNames(t).indexOf(String(e))>-1)){var a=r[e];switch(a[0]){case"undefined":t[e];break;case"null":t[e]=null;break;case"boolean":case"string":t[e]=a[1];break;case"number":t[e]=Number(a[1]);break;case"bigint":t[e]=BigInt(a[1]);break;case"symbol":void 0===a[2]?t[e]=Symbol(a[1]):t[e]=Symbol.for(a[1]);break;case"reference":t[e]=(0,i.getDefinitionByIdentifier)(a[1])[0];break;default:o(a[1]);switch(a[0]){case"Array":t[e]=new Array;break;case"Int8Array":t[e]=new Int8Array(a[3]);break;case"Uint8Array":t[e]=new Uint8Array(a[3]);break;case"Uint8ClampedArray":t[e]=new Uint8ClampedArray(a[3]);break;case"Int16Array":t[e]=new Int16Array(a[3]);break;case"Uint16Array":t[e]=new Uint16Array(a[3]);break;case"Int32Array":t[e]=new Int32Array(a[3]);break;case"Uint32Array":t[e]=new Uint32Array(a[3]);break;case"Float32Array":t[e]=new Float32Array(a[3]);break;case"Float64Array":t[e]=new Float64Array(a[3]);break;case"BigInt64Array":t[e]=new BigInt64Array(a[3]);break;case"BigUint64Array":t[e]=new BigUint64Array(a[3]);break;case"BigInt":t[e]=new Object(BigInt(a[3]));break;case"Boolean":t[e]=new Boolean(a[3]);break;case"Date":t[e]=new Date(a[3]);break;case"RegExp":var s=a[3].lastIndexOf("/"),y=a[3].substring(1,s),u=a[3].substring(s+1);t[e]=new RegExp(y,u);break;case"String":t[e]=new String(a[3]);break;case"Map":t[e]=new Map;break;case"Set":t[e]=new Set;break;case"Symbol":void 0===a[4]?t[e]=new Object(Symbol(a[3])):t[e]=new Object(Symbol.for(a[3]));break;default:t[e]=Object.create(t[a[1]]),!0}var f=r[a[1]];"Object"===a[0]||"reference"===f[0]&&f[1]===a[0]||(0,n.setPrototypeOf)(t[e],t[a[1]])}}}return r.forEach((function(e,r){(0,i.isGTObject)(e)&&(e[2].forEach((function(e){(0,i.isGTDataDescriptor)(e)?Object.defineProperty(t[r],t[e[0]],{value:t[e[1]],configurable:e[2],enumerable:e[3],writable:e[4]}):Object.defineProperty(t[r],t[e[0]],{get:t[e[1]],set:t[e[2]],configurable:e[3],enumerable:e[4]})})),"Map"===e[0]&&e[3].forEach((function(e){t[r].set(t[e[0]],t[e[1]])})),"Set"===e[0]&&e[3].forEach((function(e){t[r].add(t[e])})))})),t[0]}},607:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.deserialize=r.serialize=r.register=r.config=void 0;var n=t(913);Object.defineProperty(r,"config",{enumerable:!0,get:function(){return n.config}});var i=t(886);Object.defineProperty(r,"register",{enumerable:!0,get:function(){return i.register}});var a=t(485);Object.defineProperty(r,"serialize",{enumerable:!0,get:function(){return a.serialize}});var o=t(775);Object.defineProperty(r,"deserialize",{enumerable:!0,get:function(){return o.deserialize}})},360:function(e,r){Object.defineProperty(r,"__esModule",{value:!0}),r.setPrototypeOf=r.objectIs=r.arrayFind=void 0,r.arrayFind=function(e,r){for(var t=0;t<e.length;t++)if(r(e[t],t,e))return e[t]},r.objectIs=function(e,r){return e===r?0!==e||1/e==1/r:e!=e&&r!=r},r.setPrototypeOf=function(e,r){if(Object.setPrototypeOf)Object.setPrototypeOf(e,r);else{if(!e.__proto__)throw new Error("Could not set prototype, not supported by environment");e.__proto__=r}}},886:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.register=r.definitions=void 0;var n=t(607),i=t(593);r.definitions=[[Object.prototype,"Object"],[Array.prototype,"Array"],[Boolean.prototype,"Boolean"],[Date.prototype,"Date"],[Number.prototype,"Number"],[RegExp.prototype,"RegExp"],[String.prototype,"String"]],"undefined"!=typeof Int8Array&&r.definitions.push([Int8Array.prototype,"Int8Array"]),"undefined"!=typeof Uint8Array&&r.definitions.push([Uint8Array.prototype,"Uint8Array"]),"undefined"!=typeof Uint8ClampedArray&&r.definitions.push([Uint8ClampedArray.prototype,"Uint8ClampedArray"]),"undefined"!=typeof Int16Array&&r.definitions.push([Int16Array.prototype,"Int16Array"]),"undefined"!=typeof Uint16Array&&r.definitions.push([Uint16Array.prototype,"Uint16Array"]),"undefined"!=typeof Int32Array&&r.definitions.push([Int32Array.prototype,"Int32Array"]),"undefined"!=typeof Uint32Array&&r.definitions.push([Uint32Array.prototype,"Uint32Array"]),"undefined"!=typeof Float32Array&&r.definitions.push([Float32Array.prototype,"Float32Array"]),"undefined"!=typeof Float64Array&&r.definitions.push([Float64Array.prototype,"Float64Array"]),"undefined"!=typeof BigInt64Array&&r.definitions.push([BigInt64Array.prototype,"BigInt64Array"]),"undefined"!=typeof BigUint64Array&&r.definitions.push([BigUint64Array.prototype,"BigUint64Array"]),"undefined"!=typeof BigInt&&r.definitions.push([BigInt.prototype,"BigInt"]),"undefined"!=typeof Map&&r.definitions.push([Map.prototype,"Map"]),"undefined"!=typeof Set&&r.definitions.push([Set.prototype,"Set"]),"undefined"!=typeof Symbol&&r.definitions.push([Symbol.prototype,"Symbol"]),r.register=function(e,t){if("string"!==(0,i.safeTypeOf)(t)&&"undefined"!==(0,i.safeTypeOf)(t))throw new TypeError("register called with invalid arguments, expected (any, string?) but got ("+(0,i.safeTypeOf)(e)+", "+(0,i.safeTypeOf)(t)+")");if(void 0===t){if(!e.constructor||!e.constructor.name)throw new Error("register called without an identifier, and the identifier could not be inferred");if(!n.config.inferIdentifiers)throw new TypeError("register called without an identifier, pass as identifier or set config.inferIdentifiers to true");t=e.constructor.name}if(t="@"+t,(0,i.getDefinitionByValue)(e))throw new Error("register called with an object that is already registered");if((0,i.getDefinitionByIdentifier)(t))throw new Error("register called with an identifier that is already registered");r.definitions.push([e,t])}},485:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.serialize=void 0;var n=t(913),i=t(593);r.serialize=function(e){var r=[],t=[];return a(e),JSON.stringify(t);function a(e){if((0,i.safeIndexOf)(r,e)>-1)return(0,i.safeIndexOf)(r,e);var o,s,y,u,f=(0,i.getDefinitionByValue)(e);if(f)return r.push(e),t.push(["reference",f[1]]),r.length-1;switch((0,i.safeTypeOf)(e)){case"undefined":return r.push(void 0),t.push(["undefined"]),r.length-1;case"null":return r.push(null),t.push(["null"]),r.length-1;case"boolean":return u=e,r.push(u),t.push(["boolean",u]),r.length-1;case"number":return y=e,r.push(y),t.push(["number",(0,i.numberToString)(y)]),r.length-1;case"string":return s=e,r.push(s),t.push(["string",s]),r.length-1;case"bigint":return o=e,r.push(o),t.push(["bigint",String(o)]),r.length-1;case"symbol":return function(e){r.push(e);var n=String(e).substring(7,String(e).length-1);void 0===Symbol.keyFor(e)?t.push(["symbol",n]):t.push(["symbol",n,Symbol.keyFor(e)]);return r.length-1}(e);case"object":return function(e){r.push(e);var o,s=r.length-1;switch((0,i.objectTypeOf)(e)){case"AsyncFunction":case"AsyncGeneratorFunction":case"Function":case"GeneratorFunction":throw new Error("Could not serialize unregistered function");case"BigInt":o=["BigInt",0,[],String(BigInt.prototype.valueOf.call(e))];break;case"Boolean":o=["Boolean",0,[],Boolean.prototype.valueOf.call(e)];break;case"Date":o=["Date",0,[],Date.prototype.valueOf.call(e)];break;case"Number":o=["Number",0,[],(0,i.numberToString)(Number.prototype.valueOf.call(e))];break;case"RegExp":o=["RegExp",0,[],RegExp.prototype.toString.call(e)];break;case"String":o=["String",0,[],String.prototype.valueOf.call(e)];break;case"Symbol":var y=Symbol.prototype.valueOf.call(e),u=String(y).substring(7,String(y).length-1);o=void 0===Symbol.keyFor(y)?["Symbol",0,[],u]:["Symbol",0,[],u,Symbol.keyFor(y)];break;case"Array":o=["Array",0,[]];break;case"Int8Array":o=(0,i.structureTypedArray)(e,Int8Array);break;case"Uint8Array":o=(0,i.structureTypedArray)(e,Uint8Array);break;case"Uint8ClampedArray":o=(0,i.structureTypedArray)(e,Uint8ClampedArray);break;case"Int16Array":o=(0,i.structureTypedArray)(e,Int16Array);break;case"Uint16Array":o=(0,i.structureTypedArray)(e,Uint16Array);break;case"Int32Array":o=(0,i.structureTypedArray)(e,Int32Array);break;case"Uint32Array":o=(0,i.structureTypedArray)(e,Uint32Array);break;case"Float32Array":o=(0,i.structureTypedArray)(e,Float32Array);break;case"Float64Array":o=(0,i.structureTypedArray)(e,Float64Array);break;case"BigInt64Array":o=(0,i.structureTypedArray)(e,BigInt64Array);break;case"BigUint64Array":o=(0,i.structureTypedArray)(e,BigUint64Array);break;case"Map":o=["Map",0,[],[]];break;case"Set":o=["Set",0,[],[]];break;default:o=["Object",0,[]]}if(t.push(o),null!==Object.getPrototypeOf(e)&&!(0,i.getDefinitionByValue)(Object.getPrototypeOf(e))&&!n.config.serializePrototypes)throw new Error("Could not serialize value with unregistered prototype, register the prototype or set config.serializePrototypes to true");o[1]=a(Object.getPrototypeOf(e));var f=Object.getOwnPropertyNames(e);Object.getOwnPropertySymbols&&(f=f.concat(Object.getOwnPropertySymbols(e)));f.forEach((function(r){var t=Object.getOwnPropertyDescriptor(e,r);t.get||t.set?o[2].push([a(r),a(t.get),a(t.set),t.configurable,t.enumerable]):o[2].push([a(r),a(t.value),t.configurable,t.enumerable,t.writable])})),"Map"===o[0]&&Map.prototype.forEach.call(e,(function(e,r){o[3].push([a(e),a(r)])}));"Set"===o[0]&&Set.prototype.forEach.call(e,(function(e){o[3].push(a(e))}));return s}(e);default:throw new TypeError("Failed to serialize value with unknown type "+(0,i.safeTypeOf)(e))}}}},593:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.structureTypedArray=r.numberToString=r.isGTDataDescriptor=r.isGTObject=r.getDefinitionByValue=r.getDefinitionByIdentifier=r.objectTypeOf=r.safeTypeOf=r.safeIndexOf=void 0;var n=t(360),i=t(886);function a(e){return null===e?"null":"function"==typeof e?"object":typeof e}r.safeIndexOf=function(e,r){for(var t=0;t<e.length;t++)if((0,n.objectIs)(e[t],r))return t;return-1},r.safeTypeOf=a,r.objectTypeOf=function(e){return Object.prototype.toString.call(e).slice(8,-1)},r.getDefinitionByIdentifier=function(e){return(0,n.arrayFind)(i.definitions,(function(r){return e===r[1]}))},r.getDefinitionByValue=function(e){return(0,n.arrayFind)(i.definitions,(function(r){return e===r[0]}))},r.isGTObject=function(e){return"symbol"!==e[0]&&e.length>2},r.isGTDataDescriptor=function(e){return"boolean"===a(e[2])},r.numberToString=function(e){return(0,n.objectIs)(e,-0)?"-0":String(e)},r.structureTypedArray=function(e,r){return[r.name,0,[],r.prototype.toString.call(e).split(",").length]}}},r={};var t=function t(n){var i=r[n];if(void 0!==i)return i.exports;var a=r[n]={exports:{}};return e[n](a,a.exports,t),a.exports}(607);window.GodTierSerializer=t}();