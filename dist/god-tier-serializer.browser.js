/*! god-tier-serializer 0.5.2 | MIT License | https://github.com/jlachniet/god-tier-serializer */!function(){"use strict";var e={913:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.config=void 0;var n=t(974);r.config={get inferIdentifiers(){return a},get serializePrototypes(){return i},set inferIdentifiers(e){if("boolean"!==(0,n.safeTypeOf)(e))throw new TypeError("config.inferIdentifiers set to invalid value, expected (boolean) but got ("+(0,n.safeTypeOf)(e)+")");a=e},set serializePrototypes(e){if("boolean"!==(0,n.safeTypeOf)(e))throw new TypeError("config.serializePrototypes set to invalid value, expected (boolean) but got ("+(0,n.safeTypeOf)(e)+")");i=e}};var a=!1,i=!1},775:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.deserialize=void 0;var n=t(360),a=t(974),i=t(673);r.deserialize=function(e){if("string"!==(0,a.safeTypeOf)(e))throw new TypeError("deserialize called with invalid arguments, expected (string) but got ("+(0,a.safeTypeOf)(e)+")");for(var r=JSON.parse(e),t=[],o=0;o<r.length;o++)y(o);function y(e){if(!(Object.getOwnPropertyNames(t).indexOf(String(e))>-1)){var i=r[e];switch(i[0]){case"undefined":t[e];break;case"null":t[e]=null;break;case"boolean":case"string":t[e]=i[1];break;case"number":t[e]=Number(i[1]);break;case"bigint":t[e]=BigInt(i[1]);break;case"symbol":void 0===i[2]?t[e]=Symbol(i[1]):t[e]=Symbol.for(i[1]);break;case"reference":t[e]=(0,a.getDefinitionByIdentifier)(i[1])[0];break;default:y(i[1]);switch(i[0]){case"Array":t[e]=new Array;break;case"Int8Array":t[e]=new Int8Array(i[3]);break;case"Uint8Array":t[e]=new Uint8Array(i[3]);break;case"Uint8ClampedArray":t[e]=new Uint8ClampedArray(i[3]);break;case"Int16Array":t[e]=new Int16Array(i[3]);break;case"Uint16Array":t[e]=new Uint16Array(i[3]);break;case"Int32Array":t[e]=new Int32Array(i[3]);break;case"Uint32Array":t[e]=new Uint32Array(i[3]);break;case"Float32Array":t[e]=new Float32Array(i[3]);break;case"Float64Array":t[e]=new Float64Array(i[3]);break;case"BigInt64Array":t[e]=new BigInt64Array(i[3]);break;case"BigUint64Array":t[e]=new BigUint64Array(i[3]);break;case"BigInt":t[e]=new Object(BigInt(i[3]));break;case"Boolean":t[e]=new Boolean(i[3]);break;case"Date":t[e]=new Date(i[3]);break;case"RegExp":var o=i[3].lastIndexOf("/"),s=i[3].substring(1,o),f=i[3].substring(o+1);t[e]=new RegExp(s,f);break;case"String":t[e]=new String(i[3]);break;case"Map":t[e]=new Map;break;case"Set":t[e]=new Set;break;case"Symbol":void 0===i[4]?t[e]=new Object(Symbol(i[3])):t[e]=new Object(Symbol.for(i[3]));break;default:t[e]=Object.create(t[i[1]]),!0}var p=r[i[1]];"Object"===i[0]||"reference"===p[0]&&p[1]===i[0]||(0,n.setPrototypeOf)(t[e],t[i[1]])}}}return r.forEach((function(e,r){(0,i.isGTObject)(e)&&(e[2].forEach((function(e){(0,i.isGTDataProperty)(e)?Object.defineProperty(t[r],t[e[0]],{value:t[e[1]],configurable:e[2],enumerable:e[3],writable:e[4]}):Object.defineProperty(t[r],t[e[0]],{get:t[e[1]],set:t[e[2]],configurable:e[3],enumerable:e[4]})})),"Map"===e[0]&&e[3].forEach((function(e){t[r].set(t[e[0]],t[e[1]])})),"Set"===e[0]&&e[3].forEach((function(e){t[r].add(t[e])})))})),t[0]}},607:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.config=r.register=r.deserialize=r.serialize=void 0;var n=t(485);Object.defineProperty(r,"serialize",{enumerable:!0,get:function(){return n.serialize}});var a=t(775);Object.defineProperty(r,"deserialize",{enumerable:!0,get:function(){return a.deserialize}});var i=t(886);Object.defineProperty(r,"register",{enumerable:!0,get:function(){return i.register}});var o=t(913);Object.defineProperty(r,"config",{enumerable:!0,get:function(){return o.config}})},360:function(e,r){Object.defineProperty(r,"__esModule",{value:!0}),r.setPrototypeOf=r.objectIs=r.arrayFind=void 0,r.arrayFind=function(e,r){for(var t=0;t<e.length;t++)if(r(e[t],t,e))return e[t]},r.objectIs=function(e,r){return e===r?0!==e||1/e==1/r:e!=e&&r!=r},r.setPrototypeOf=function(e,r){if(Object.setPrototypeOf)Object.setPrototypeOf(e,r);else{if(!e.__proto__)throw new Error("Could not set prototype, not supported by environment");e.__proto__=r}}},886:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.register=r.definitions=void 0;var n=t(607),a=t(974);r.definitions=[[Object.prototype,"Object"],[Array.prototype,"Array"],[Boolean.prototype,"Boolean"],[Date.prototype,"Date"],[Number.prototype,"Number"],[RegExp.prototype,"RegExp"],[String.prototype,"String"]],"undefined"!=typeof Int8Array&&r.definitions.push([Int8Array.prototype,"Int8Array"]),"undefined"!=typeof Uint8Array&&r.definitions.push([Uint8Array.prototype,"Uint8Array"]),"undefined"!=typeof Uint8ClampedArray&&r.definitions.push([Uint8ClampedArray.prototype,"Uint8ClampedArray"]),"undefined"!=typeof Int16Array&&r.definitions.push([Int16Array.prototype,"Int16Array"]),"undefined"!=typeof Uint16Array&&r.definitions.push([Uint16Array.prototype,"Uint16Array"]),"undefined"!=typeof Int32Array&&r.definitions.push([Int32Array.prototype,"Int32Array"]),"undefined"!=typeof Uint32Array&&r.definitions.push([Uint32Array.prototype,"Uint32Array"]),"undefined"!=typeof Float32Array&&r.definitions.push([Float32Array.prototype,"Float32Array"]),"undefined"!=typeof Float64Array&&r.definitions.push([Float64Array.prototype,"Float64Array"]),"undefined"!=typeof BigInt64Array&&r.definitions.push([BigInt64Array.prototype,"BigInt64Array"]),"undefined"!=typeof BigUint64Array&&r.definitions.push([BigUint64Array.prototype,"BigUint64Array"]),"undefined"!=typeof BigInt&&r.definitions.push([BigInt.prototype,"BigInt"]),"undefined"!=typeof Map&&r.definitions.push([Map.prototype,"Map"]),"undefined"!=typeof Set&&r.definitions.push([Set.prototype,"Set"]),"undefined"!=typeof Symbol&&r.definitions.push([Symbol.prototype,"Symbol"]),r.register=function(e,t){if("string"!==(0,a.safeTypeOf)(t)&&"undefined"!==(0,a.safeTypeOf)(t))throw new TypeError("register called with invalid arguments, expected (any, string?) but got ("+(0,a.safeTypeOf)(e)+", "+(0,a.safeTypeOf)(t)+")");if(void 0===t){if(!e.constructor||!e.constructor.name)throw new Error("register called without an identifier, and the identifier could not be inferred");if(!n.config.inferIdentifiers)throw new TypeError("register called without an identifier, pass as identifier or set config.inferIdentifiers to true");t=e.constructor.name}if((0,a.getDefinitionByValue)(e))throw new Error("register called with an object that is already registered");if((0,a.getDefinitionByIdentifier)(t))throw new Error("register called with an identifier that is already registered");r.definitions.push([e,t])}},485:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.serialize=void 0;var n=t(913),a=t(974);r.serialize=function(e){var r=[],t=[];return i(e,"(root)"),JSON.stringify(t);function i(e,o){if((0,a.safeIndexOf)(r,e)>-1)return(0,a.safeIndexOf)(r,e);var y,s,f,p,u=(0,a.getDefinitionByValue)(e);if(u)return r.push(e),t.push(["reference",u[1]]),r.length-1;switch((0,a.safeTypeOf)(e)){case"undefined":return r.push(void 0),t.push(["undefined"]),r.length-1;case"null":return r.push(null),t.push(["null"]),r.length-1;case"boolean":return p=e,r.push(p),t.push(["boolean",p]),r.length-1;case"number":return f=e,r.push(f),t.push(["number",(0,a.numberToString)(f)]),r.length-1;case"string":return s=e,r.push(s),t.push(["string",s]),r.length-1;case"bigint":return y=e,r.push(y),t.push(["bigint",String(y)]),r.length-1;case"symbol":return function(e){r.push(e);var n=String(e).substring(7,String(e).length-1);void 0===Symbol.keyFor(e)?t.push(["symbol",n]):t.push(["symbol",n,Symbol.keyFor(e)]);return r.length-1}(e);case"object":return function(e,o){r.push(e);var y,s=r.length-1;switch((0,a.objectTypeOf)(e)){case"AsyncFunction":case"AsyncGeneratorFunction":case"Function":case"GeneratorFunction":throw new Error("Could not serialize unregistered function at "+o);case"BigInt":y=["BigInt",0,[],String(BigInt.prototype.valueOf.call(e))];break;case"Boolean":y=["Boolean",0,[],Boolean.prototype.valueOf.call(e)];break;case"Date":y=["Date",0,[],Date.prototype.valueOf.call(e)];break;case"Number":y=["Number",0,[],(0,a.numberToString)(Number.prototype.valueOf.call(e))];break;case"RegExp":y=["RegExp",0,[],RegExp.prototype.toString.call(e)];break;case"String":y=["String",0,[],String.prototype.valueOf.call(e)];break;case"Symbol":var f=Symbol.prototype.valueOf.call(e),p=String(f).substring(7,String(f).length-1);y=void 0===Symbol.keyFor(f)?["Symbol",0,[],p]:["Symbol",0,[],p,Symbol.keyFor(f)];break;case"Array":y=["Array",0,[]];break;case"Int8Array":y=(0,a.getTypedArrayTemplate)(e,Int8Array);break;case"Uint8Array":y=(0,a.getTypedArrayTemplate)(e,Uint8Array);break;case"Uint8ClampedArray":y=(0,a.getTypedArrayTemplate)(e,Uint8ClampedArray);break;case"Int16Array":y=(0,a.getTypedArrayTemplate)(e,Int16Array);break;case"Uint16Array":y=(0,a.getTypedArrayTemplate)(e,Uint16Array);break;case"Int32Array":y=(0,a.getTypedArrayTemplate)(e,Int32Array);break;case"Uint32Array":y=(0,a.getTypedArrayTemplate)(e,Uint32Array);break;case"Float32Array":y=(0,a.getTypedArrayTemplate)(e,Float32Array);break;case"Float64Array":y=(0,a.getTypedArrayTemplate)(e,Float64Array);break;case"BigInt64Array":y=(0,a.getTypedArrayTemplate)(e,BigInt64Array);break;case"BigUint64Array":y=(0,a.getTypedArrayTemplate)(e,BigUint64Array);break;case"Map":y=["Map",0,[],[]];break;case"Set":y=["Set",0,[],[]];break;default:y=["Object",0,[]]}if(t.push(y),null!==Object.getPrototypeOf(e)&&!(0,a.getDefinitionByValue)(Object.getPrototypeOf(e))&&!n.config.serializePrototypes)throw new Error("Could not serialize value with unregistered prototype at "+o);y[1]=i(Object.getPrototypeOf(e),"");var u=Object.getOwnPropertyNames(e);Object.getOwnPropertySymbols&&(u=u.concat(Object.getOwnPropertySymbols(e)));if(u.forEach((function(r){var t=Object.getOwnPropertyDescriptor(e,r);t.get||t.set?y[2].push([i(r,""),i(t.get,o+'["'+String(r)+'" getter]'),i(t.set,o+'["'+String(r)+'" setter]'),t.configurable,t.enumerable]):y[2].push([i(r,""),i(t.value,o+'["'+String(r)+'"]'),t.configurable,t.enumerable,t.writable])})),"Map"===y[0]){var l=0;Map.prototype.forEach.call(e,(function(e,r){y[3].push([i(r,o+" key#"+l),i(e,o+" val#"+l)]),l++}))}if("Set"===y[0]){var c=0;Set.prototype.forEach.call(e,(function(e){y[3].push(i(e,o+" val#"+c)),c++}))}return s}(e,o);default:throw new TypeError("Failed to serialize value with unknown type "+(0,a.safeTypeOf)(e))}}}},673:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.isGTDataProperty=r.isGTObject=void 0;var n=t(974);r.isGTObject=function(e){return e[0].charAt(0)===e[0].charAt(0).toUpperCase()},r.isGTDataProperty=function(e){return"boolean"===(0,n.safeTypeOf)(e[2])}},974:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.getTypedArrayTemplate=r.numberToString=r.getDefinitionByValue=r.getDefinitionByIdentifier=r.objectTypeOf=r.safeTypeOf=r.safeIndexOf=void 0;var n=t(360),a=t(886);r.safeIndexOf=function(e,r){for(var t=0;t<e.length;t++)if((0,n.objectIs)(e[t],r))return t;return-1},r.safeTypeOf=function(e){return null===e?"null":"function"==typeof e?"object":typeof e},r.objectTypeOf=function(e){return"undefined"!=typeof Symbol&&void 0!==e[Symbol.toStringTag]?"Object":Object.prototype.toString.call(e).slice(8,-1)},r.getDefinitionByIdentifier=function(e){return(0,n.arrayFind)(a.definitions,(function(r){return e===r[1]}))},r.getDefinitionByValue=function(e){return(0,n.arrayFind)(a.definitions,(function(r){return e===r[0]}))},r.numberToString=function(e){return(0,n.objectIs)(e,-0)?"-0":String(e)},r.getTypedArrayTemplate=function(e,r){return[r.name,0,[],r.prototype.toString.call(e).split(",").length]}}},r={};var t=function t(n){var a=r[n];if(void 0!==a)return a.exports;var i=r[n]={exports:{}};return e[n](i,i.exports,t),i.exports}(607);window.GodTierSerializer=t}();