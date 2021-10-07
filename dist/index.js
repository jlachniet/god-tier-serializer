/*! god-tier-serializer 0.3.0 | MIT License | https://github.com/jlachniet/god-tier-serializer */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.GodTierSerializer=t():e.GodTierSerializer=t()}(this,(function(){return function(){"use strict";var e={913:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0;var n=r(593);t.config={get inferIdentifiers(){return i},get serializePrototypes(){return o},set inferIdentifiers(e){if("boolean"!==(0,n.safeTypeOf)(e))throw new TypeError("config.inferIdentifiers set to invalid value, expected (boolean) but got ("+(0,n.safeTypeOf)(e)+")");i=e},set serializePrototypes(e){if("boolean"!==(0,n.safeTypeOf)(e))throw new TypeError("config.serializePrototypes set to invalid value, expected (boolean) but got ("+(0,n.safeTypeOf)(e)+")");o=e}};var i=!1,o=!1},775:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.deserialize=void 0;var n=r(360),i=r(593);t.deserialize=function(e){if("string"!==(0,i.safeTypeOf)(e))throw new TypeError("deserialize called with invalid arguments, expected (string) but got ("+(0,i.safeTypeOf)(e)+")");for(var t=JSON.parse(e),r=[],o=0;o<t.length;o++)a(o);function a(e){if(!(Object.getOwnPropertyNames(r).indexOf(String(e))>-1)){var o=t[e];switch(o[0]){case"undefined":r[e];break;case"null":r[e]=null;break;case"boolean":case"string":r[e]=o[1];break;case"number":r[e]=Number(o[1]);break;case"bigint":r[e]=BigInt(o[1]);break;case"reference":r[e]=(0,i.getDefinitionByIdentifier)(o[1])[0];break;default:a(o[1]);switch(o[0]){case"Array":r[e]=new Array;break;case"BigInt":r[e]=new Object(BigInt(o[3]));break;case"Boolean":r[e]=new Boolean(o[3]);break;case"Date":r[e]=new Date(o[3]);break;case"RegExp":var f=o[3].lastIndexOf("/"),s=o[3].substring(1,f),u=o[3].substring(f+1);r[e]=new RegExp(s,u);break;case"String":r[e]=new String(o[3]);break;default:r[e]=Object.create(r[o[1]]),!0}var c=t[o[1]];"reference"===c[0]&&c[1]===o[0]||(0,n.setPrototypeOf)(r[e],r[o[1]])}}}return t.forEach((function(e,t){(0,i.isGTObject)(e)&&e[2].forEach((function(e){Object.defineProperty(r[t],r[e[0]],{value:r[e[1]],configurable:e[2],enumerable:e[3],writable:e[4]})}))})),r[0]}},607:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.deserialize=t.serialize=t.register=t.config=void 0;var n=r(913);Object.defineProperty(t,"config",{enumerable:!0,get:function(){return n.config}});var i=r(886);Object.defineProperty(t,"register",{enumerable:!0,get:function(){return i.register}});var o=r(485);Object.defineProperty(t,"serialize",{enumerable:!0,get:function(){return o.serialize}});var a=r(775);Object.defineProperty(t,"deserialize",{enumerable:!0,get:function(){return a.deserialize}})},360:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.setPrototypeOf=t.objectIs=t.arrayFind=void 0,t.arrayFind=function(e,t){for(var r=0;r<e.length;r++)if(t(e[r],r,e))return e[r]},t.objectIs=function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t},t.setPrototypeOf=function(e,t){if(Object.setPrototypeOf)Object.setPrototypeOf(e,t);else{if(!e.__proto__)throw new Error("Could not set prototype, not supported by environment");e.__proto__=t}}},886:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.register=t.definitions=void 0;var n=r(607),i=r(593);t.definitions=[[Object.prototype,"Object"],[Array.prototype,"Array"],[BigInt.prototype,"BigInt"],[Boolean.prototype,"Boolean"],[Date.prototype,"Date"],[Number.prototype,"Number"],[RegExp.prototype,"RegExp"],[String.prototype,"String"]],t.register=function(e,r){if("object"!==(0,i.safeTypeOf)(e)||"string"!==(0,i.safeTypeOf)(r)&&"undefined"!==(0,i.safeTypeOf)(r))throw new TypeError("register called with invalid arguments, expected (object, string?) but got ("+(0,i.safeTypeOf)(e)+", "+(0,i.safeTypeOf)(r)+")");if(void 0===r){if(!e.constructor||!e.constructor.name)throw new Error("register called without an identifier, and the identifier could not be inferred");if(!n.config.inferIdentifiers)throw new TypeError("register called without an identifier, pass as identifier or set config.inferIdentifiers to true");r=e.constructor.name}if(r="@"+r,(0,i.getDefinitionByObject)(e))throw new Error("register called with an object that is already registered");if((0,i.getDefinitionByIdentifier)(r))throw new Error("register called with an identifier that is already registered");t.definitions.push([e,r])}},485:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.serialize=void 0;var n=r(913),i=r(593);t.serialize=function(e){var t=[],r=[];return o(e),JSON.stringify(r);function o(e){if((0,i.safeIndexOf)(t,e)>-1)return(0,i.safeIndexOf)(t,e);switch((0,i.safeTypeOf)(e)){case"undefined":return t.push(void 0),r.push(["undefined"]),t.length-1;case"null":return t.push(null),r.push(["null"]),t.length-1;case"boolean":return u=e,t.push(u),r.push(["boolean",u]),t.length-1;case"number":return s=e,t.push(s),r.push(["number",(0,i.numberToString)(s)]),t.length-1;case"string":return f=e,t.push(f),r.push(["string",f]),t.length-1;case"bigint":return a=e,t.push(a),r.push(["bigint",String(a)]),t.length-1;case"object":return function(e){t.push(e);var a=t.length-1,f=(0,i.getDefinitionByObject)(e);if(f)r.push(["reference",f[1]]);else{var s;switch((0,i.objectTypeOf)(e)){case"AsyncFunction":case"AsyncGeneratorFunction":case"Function":case"GeneratorFunction":throw new Error("Could not serialize unregistered function");case"Array":s=["Array",0,[]];break;case"BigInt":s=["BigInt",0,[],String(BigInt.prototype.valueOf.call(e))];break;case"Boolean":s=["Boolean",0,[],Boolean.prototype.valueOf.call(e)];break;case"Date":s=["Date",0,[],Date.prototype.valueOf.call(e)];break;case"Number":s=["Number",0,[],(0,i.numberToString)(Number.prototype.valueOf.call(e))];break;case"RegExp":s=["RegExp",0,[],RegExp.prototype.toString.call(e)];break;case"String":s=["String",0,[],String.prototype.valueOf.call(e)];break;default:s=["Object",0,[]]}if(r.push(s),null!==Object.getPrototypeOf(e)&&!(0,i.getDefinitionByObject)(Object.getPrototypeOf(e))&&!n.config.serializePrototypes)throw new Error("Could not serialize value with unregistered prototype, register the prototype or set config.serializePrototypes to true");s[1]=o(Object.getPrototypeOf(e)),Object.getOwnPropertyNames(e).forEach((function(t){var r=Object.getOwnPropertyDescriptor(e,t);s[2].push([o(t),o(r.value),r.configurable,r.enumerable,r.writable])}))}return a}(e);default:throw new TypeError("Failed to serialize value with unknown type "+(0,i.safeTypeOf)(e))}var a,f,s,u}}},593:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.numberToString=t.isGTObject=t.getDefinitionByObject=t.getDefinitionByIdentifier=t.objectTypeOf=t.safeTypeOf=t.safeIndexOf=void 0;var n=r(360),i=r(886);t.safeIndexOf=function(e,t){for(var r=0;r<e.length;r++)if((0,n.objectIs)(e[r],t))return r;return-1},t.safeTypeOf=function(e){return null===e?"null":"function"==typeof e?"object":typeof e},t.objectTypeOf=function(e){return Object.prototype.toString.call(e).slice(8,-1)},t.getDefinitionByIdentifier=function(e){return(0,n.arrayFind)(i.definitions,(function(t){return e===t[1]}))},t.getDefinitionByObject=function(e){return(0,n.arrayFind)(i.definitions,(function(t){return e===t[0]}))},t.isGTObject=function(e){return e.length>2},t.numberToString=function(e){return(0,n.objectIs)(e,-0)?"-0":String(e)}}},t={};var r=function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}(607);return r}()}));