var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// Button/index.tsx
import * as React from "react";
function Button(_a) {
  var _b = _a, { children, variant } = _b, props = __objRest(_b, ["children", "variant"]);
  return /* @__PURE__ */ React.createElement("button", __spreadValues({}, props), children);
}

// FormInput/index.tsx
import * as React2 from "react";
function FormInput(_a) {
  var _b = _a, {
    name,
    id,
    type = "text",
    label,
    register
  } = _b, props = __objRest(_b, [
    "name",
    "id",
    "type",
    "label",
    "register"
  ]);
  return /* @__PURE__ */ React2.createElement("div", null, !!label && /* @__PURE__ */ React2.createElement("label", {
    htmlFor: id || name
  }, label), /* @__PURE__ */ React2.createElement("input", __spreadValues(__spreadValues({
    id,
    name,
    type
  }, register), props)));
}
export {
  Button,
  FormInput
};
