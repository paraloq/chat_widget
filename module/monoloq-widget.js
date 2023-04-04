function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map2[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
function normalizeStyle(value) {
  if (isArray$2(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$2(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$2(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$2(value)) {
    res = value;
  } else if (isArray$2(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString$2(val) ? val : val == null ? "" : isArray$2(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$2(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$2 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString$2 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$1(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$2(target)) {
    const newLength = toNumber(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$2(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$2(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow$1(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$2(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$2(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$2(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow$1(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a$2;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a$2] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a$2 = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$2(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$2(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit("app:unmount", app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$1(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString$2(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$2(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render: render2, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render3 = Component;
      if (attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render3.length > 1 ? render3(props, true ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render3(
        props,
        null
        /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
        }
        if (eventAttrs.length) {
          warn(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root)) {
      warn(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn(`Component inside <Transition> renders non-element root node that cannot be animated.`);
    }
    root.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$2(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn(`injection "${String(key)}" not found.`);
    }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction$1(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$2(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow$1(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction$1(s)) {
        return callWithErrorHandling(
          s,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$2(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment) {
            if (hasFound) {
              warn("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            child = c;
            hasFound = true;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$2(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction$1(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    warn(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction$1(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const COMPONENTS = "components";
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveDynamicComponent(component) {
  if (isString$2(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray$2(source) || isString$2(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot.length > 1) {
    warn(`SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`);
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
function toHandlers(obj, preserveCaseIfNecessary) {
  const ret = {};
  if (!isObject$1(obj)) {
    warn(`v-on with no argument expects an object value.`);
    return ret;
  }
  for (const key in obj) {
    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        markAttrsAccessed();
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString$2(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components: components2,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$1(dataOptions)) {
      warn(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(
      created,
      instance,
      "c"
      /* LifecycleHooks.CREATED */
    );
  }
  function registerLifecycleHook(register2, hook) {
    if (isArray$2(hook)) {
      hook.forEach((_hook) => register2(_hook.bind(publicThis)));
    } else if (hook) {
      register2(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$2(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components2)
    instance.components = components2;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$2(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$2(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$2(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    } else {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$2(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      } else {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$2(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$2(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString$2(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$2(opt) || isFunction$1(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$2(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$2(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$2(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$2(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance) {
      warn(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      {
        warn(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating) {
        extend(slots, children);
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render2, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else {
          warn(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          {
            context.reload = () => {
              render2(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else {
          warn(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app._container);
          {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else {
          warn(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$2(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$2(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$2(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$2(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$2(existing) && remove(existing, refValue);
          } else {
            if (!isArray$2(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else {
          warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else {
      warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
function initFeatureFlags() {
  const needWarn = [];
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else {
          warn("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      if (parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (
      // #5523 dev root fragment may inherit directives
      isHmrUpdating || patchFlag & 2048
    ) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        } else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          {
            endMeasure(instance, `render`);
          }
          {
            startMeasure(instance, `patch`);
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
        {
          devtoolsComponentUpdated(instance);
        }
        {
          popWarningContext();
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    {
      effect.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(
              nextChild,
              container,
              anchor,
              2
              /* MoveType.REORDER */
            );
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$2(ch1) && isArray$2(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    true
    /* isBlock */
  ));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    true
    /* isBlock: prevent a block from tracking itself */
  ));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...args);
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$2(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$2(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$2(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$2(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$2(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray$2(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$2(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray$2(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$2(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$2(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$2(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a2;
  const Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(
            e,
            instance,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a2 = Component.name) !== null && _a2 !== void 0 ? _a2 : "Anonymous";
          warn(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
        {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$1(propsOrChildren) && !isArray$2(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const ssrContextKey = Symbol(`ssrContext`);
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      warn(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
    }
    return ctx;
  }
};
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!isObject$1(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject$1(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction$1(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$2(opts) && opts.includes(key) || isObject$1(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version = "3.2.45";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$2(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString$2(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$2(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    {
      if (semicolonRE.test(val)) {
        warn(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
  !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!needRemove) {
      warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$2(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$2(value)) {
    return false;
  }
  return key in el;
}
function defineCustomElement(options, hydrate) {
  const Comp = defineComponent(options);
  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, hydrate);
    }
  }
  VueCustomElement.def = Comp;
  return VueCustomElement;
}
const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
class VueElement extends BaseClass {
  constructor(_def, _props = {}, hydrate) {
    super();
    this._def = _def;
    this._props = _props;
    this._instance = null;
    this._connected = false;
    this._resolved = false;
    this._numberProps = null;
    if (this.shadowRoot && hydrate) {
      hydrate(this._createVNode(), this.shadowRoot);
    } else {
      if (this.shadowRoot) {
        warn(`Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use \`defineSSRCustomElement\`.`);
      }
      this.attachShadow({ mode: "open" });
      if (!this._def.__asyncLoader) {
        this._resolveProps(this._def);
      }
    }
  }
  connectedCallback() {
    this._connected = true;
    if (!this._instance) {
      if (this._resolved) {
        this._update();
      } else {
        this._resolveDef();
      }
    }
  }
  disconnectedCallback() {
    this._connected = false;
    nextTick(() => {
      if (!this._connected) {
        render(null, this.shadowRoot);
        this._instance = null;
      }
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = true;
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    }
    new MutationObserver((mutations) => {
      for (const m of mutations) {
        this._setAttr(m.attributeName);
      }
    }).observe(this, { attributes: true });
    const resolve2 = (def2, isAsync = false) => {
      const { props, styles } = def2;
      let numberProps;
      if (props && !isArray$2(props)) {
        for (const key in props) {
          const opt = props[key];
          if (opt === Number || opt && opt.type === Number) {
            if (key in this._props) {
              this._props[key] = toNumber(this._props[key]);
            }
            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[camelize(key)] = true;
          }
        }
      }
      this._numberProps = numberProps;
      if (isAsync) {
        this._resolveProps(def2);
      }
      this._applyStyles(styles);
      this._update();
    };
    const asyncDef = this._def.__asyncLoader;
    if (asyncDef) {
      asyncDef().then((def2) => resolve2(def2, true));
    } else {
      resolve2(this._def);
    }
  }
  _resolveProps(def2) {
    const { props } = def2;
    const declaredPropKeys = isArray$2(props) ? props : Object.keys(props || {});
    for (const key of Object.keys(this)) {
      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key], true, false);
      }
    }
    for (const key of declaredPropKeys.map(camelize)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key);
        },
        set(val) {
          this._setProp(key, val);
        }
      });
    }
  }
  _setAttr(key) {
    let value = this.getAttribute(key);
    const camelKey = camelize(key);
    if (this._numberProps && this._numberProps[camelKey]) {
      value = toNumber(value);
    }
    this._setProp(camelKey, value, false);
  }
  /**
   * @internal
   */
  _getProp(key) {
    return this._props[key];
  }
  /**
   * @internal
   */
  _setProp(key, val, shouldReflect = true, shouldUpdate = true) {
    if (val !== this._props[key]) {
      this._props[key] = val;
      if (shouldUpdate && this._instance) {
        this._update();
      }
      if (shouldReflect) {
        if (val === true) {
          this.setAttribute(hyphenate(key), "");
        } else if (typeof val === "string" || typeof val === "number") {
          this.setAttribute(hyphenate(key), val + "");
        } else if (!val) {
          this.removeAttribute(hyphenate(key));
        }
      }
    }
  }
  _update() {
    render(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const vnode = createVNode(this._def, extend({}, this._props));
    if (!this._instance) {
      vnode.ce = (instance) => {
        this._instance = instance;
        instance.isCE = true;
        {
          instance.ceReload = (newStyles) => {
            if (this._styles) {
              this._styles.forEach((s) => this.shadowRoot.removeChild(s));
              this._styles.length = 0;
            }
            this._applyStyles(newStyles);
            this._instance = null;
            this._update();
          };
        }
        const dispatch = (event, args) => {
          this.dispatchEvent(new CustomEvent(event, {
            detail: args
          }));
        };
        instance.emit = (event, ...args) => {
          dispatch(event, args);
          if (hyphenate(event) !== event) {
            dispatch(hyphenate(event), args);
          }
        };
        let parent = this;
        while (parent = parent && (parent.parentNode || parent.host)) {
          if (parent instanceof VueElement) {
            instance.parent = parent._instance;
            instance.provides = parent._instance.provides;
            break;
          }
        }
      };
    }
    return vnode;
  }
  _applyStyles(styles) {
    if (styles) {
      styles.forEach((css) => {
        const s = document.createElement("style");
        s.textContent = css;
        this.shadowRoot.appendChild(s);
        {
          (this._styles || (this._styles = [])).push(s);
        }
      });
    }
  }
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray$2(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$2(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$1(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  validateDuration$1(res);
  return res;
}
function validateDuration$1(val) {
  if (typeof val !== "number") {
    warn(`<transition> explicit duration is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn(`<transition> explicit duration is NaN - the duration expression might be incorrect.`);
  }
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el._moveCb = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else {
          warn(`<TransitionGroup> children must be keyed.`);
        }
      }
      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$2(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el && el.type !== "range") {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number || el.type === "number") && toNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  };
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  return (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  };
};
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const render = (...args) => {
  ensureRenderer().render(...args);
};
function initDev() {
  {
    initCustomFormatter();
  }
}
{
  initDev();
}
const _0x36cec7 = _0x1809;
(function(_0x404443, _0x360249) {
  const _0x37b232 = _0x1809, _0x28d0c1 = _0x404443();
  while (!![]) {
    try {
      const _0x488e37 = parseInt(_0x37b232(392)) / (-9 * -753 + 3571 * 2 + -1 * 13918) * (-parseInt(_0x37b232(386)) / (1 * 5741 + 4834 * -2 + 1 * 3929)) + -parseInt(_0x37b232(383)) / (235 * -33 + -43 * -2 + 7672) * (-parseInt(_0x37b232(399)) / (-5129 * 1 + 772 * -10 + 1 * 12853)) + -parseInt(_0x37b232(400)) / (-4490 + 1663 + -8 * -354) * (parseInt(_0x37b232(402)) / (-1 * -8199 + -9012 + 819)) + parseInt(_0x37b232(406)) / (-93 * 41 + 1227 + -2593 * -1) + parseInt(_0x37b232(391)) / (7915 + 19 * 183 + 4 * -2846) + -parseInt(_0x37b232(397)) / (5092 + 8506 + -13589) + parseInt(_0x37b232(401)) / (-145 * -1 + 2425 + -2560 * 1) * (-parseInt(_0x37b232(403)) / (-1038 + -1614 + 2663));
      if (_0x488e37 === _0x360249)
        break;
      else
        _0x28d0c1["push"](_0x28d0c1["shift"]());
    } catch (_0x5f2375) {
      _0x28d0c1["push"](_0x28d0c1["shift"]());
    }
  }
})(_0x2c8a, 232744 + 121570 + 101 * 1618);
function _0x2c8a() {
  const _0xf29dcd = ["v.d8g529d2", "ifyapp.com", "location", "7611200tiCVyS", "805029iaBqPk", "www.", "hostname", "map", "33/", "769959LEYOpQ", "appearance", "4phmVox", "50HjWZvq", "7165630drrHPc", "358518jqJkVO", "11KbmtGC", "split", "calhost:33", "7113568cyEIHo", ",http://lo", "2264343NeBWIU", "includes", "https://de", "2eVICCK", "owgcy.ampl"];
  _0x2c8a = function() {
    return _0xf29dcd;
  };
  return _0x2c8a();
}
function _0x1809(_0x28fee7, _0x602268) {
  const _0x245d55 = _0x2c8a();
  return _0x1809 = function(_0x19f763, _0x2cb121) {
    _0x19f763 = _0x19f763 - (-3801 + -6907 + 11090);
    let _0x234658 = _0x245d55[_0x19f763];
    return _0x234658;
  }, _0x1809(_0x28fee7, _0x602268);
}
function devHost(_0x234658, _0x299710) {
  const _0x474849 = _0x1809, _0x4303d1 = window[_0x474849(390)][_0x474849(394)], _0x56bee0 = String(_0x474849(385) + _0x474849(388) + _0x474849(387) + _0x474849(389) + _0x474849(382) + _0x474849(405) + _0x474849(396))[_0x474849(404)](",")[_0x474849(395)]((_0x272fc0) => new URL(_0x272fc0)[_0x474849(394)]), _0x5b6c6d = _0x299710 ? _0x474849(393) + _0x4303d1 : _0x4303d1;
  if (!_0x234658)
    return _0x5b6c6d;
  if (!_0x56bee0[_0x474849(384)](_0x4303d1))
    return _0x5b6c6d;
  return _0x234658;
}
function prepareMessage(_0x5b94d4) {
  return "" + _0x5b94d4;
}
const appearance = Symbol(_0x36cec7(398));
var toStringFunction = Function.prototype.toString;
var create = Object.create;
var toStringObject = Object.prototype.toString;
var LegacyCache = (
  /** @class */
  function() {
    function LegacyCache2() {
      this._keys = [];
      this._values = [];
    }
    LegacyCache2.prototype.has = function(key) {
      return !!~this._keys.indexOf(key);
    };
    LegacyCache2.prototype.get = function(key) {
      return this._values[this._keys.indexOf(key)];
    };
    LegacyCache2.prototype.set = function(key, value) {
      this._keys.push(key);
      this._values.push(value);
    };
    return LegacyCache2;
  }()
);
function createCacheLegacy() {
  return new LegacyCache();
}
function createCacheModern() {
  return /* @__PURE__ */ new WeakMap();
}
var createCache = typeof WeakMap !== "undefined" ? createCacheModern : createCacheLegacy;
function getCleanClone(prototype) {
  if (!prototype) {
    return create(null);
  }
  var Constructor = prototype.constructor;
  if (Constructor === Object) {
    return prototype === Object.prototype ? {} : create(prototype);
  }
  if (~toStringFunction.call(Constructor).indexOf("[native code]")) {
    try {
      return new Constructor();
    } catch (_a2) {
    }
  }
  return create(prototype);
}
function getRegExpFlagsLegacy(regExp) {
  var flags = "";
  if (regExp.global) {
    flags += "g";
  }
  if (regExp.ignoreCase) {
    flags += "i";
  }
  if (regExp.multiline) {
    flags += "m";
  }
  if (regExp.unicode) {
    flags += "u";
  }
  if (regExp.sticky) {
    flags += "y";
  }
  return flags;
}
function getRegExpFlagsModern(regExp) {
  return regExp.flags;
}
var getRegExpFlags = /test/g.flags === "g" ? getRegExpFlagsModern : getRegExpFlagsLegacy;
function getTagLegacy(value) {
  var type = toStringObject.call(value);
  return type.substring(8, type.length - 1);
}
function getTagModern(value) {
  return value[Symbol.toStringTag] || getTagLegacy(value);
}
var getTag = typeof Symbol !== "undefined" ? getTagModern : getTagLegacy;
var defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
var _a$1 = Object.prototype, hasOwnProperty = _a$1.hasOwnProperty, propertyIsEnumerable = _a$1.propertyIsEnumerable;
var SUPPORTS_SYMBOL = typeof getOwnPropertySymbols === "function";
function getStrictPropertiesModern(object) {
  return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
var getStrictProperties = SUPPORTS_SYMBOL ? getStrictPropertiesModern : getOwnPropertyNames;
function copyOwnPropertiesStrict(value, clone, state) {
  var properties = getStrictProperties(value);
  for (var index = 0, length_1 = properties.length, property = void 0, descriptor = void 0; index < length_1; ++index) {
    property = properties[index];
    if (property === "callee" || property === "caller") {
      continue;
    }
    descriptor = getOwnPropertyDescriptor(value, property);
    if (!descriptor) {
      clone[property] = state.copier(value[property], state);
      continue;
    }
    if (!descriptor.get && !descriptor.set) {
      descriptor.value = state.copier(descriptor.value, state);
    }
    try {
      defineProperty(clone, property, descriptor);
    } catch (error) {
      clone[property] = descriptor.value;
    }
  }
  return clone;
}
function copyArrayLoose(array, state) {
  var clone = new state.Constructor();
  state.cache.set(array, clone);
  for (var index = 0, length_2 = array.length; index < length_2; ++index) {
    clone[index] = state.copier(array[index], state);
  }
  return clone;
}
function copyArrayStrict(array, state) {
  var clone = new state.Constructor();
  state.cache.set(array, clone);
  return copyOwnPropertiesStrict(array, clone, state);
}
function copyArrayBuffer(arrayBuffer, _state) {
  return arrayBuffer.slice(0);
}
function copyBlob(blob, _state) {
  return blob.slice(0, blob.size, blob.type);
}
function copyDataView(dataView, state) {
  return new state.Constructor(copyArrayBuffer(dataView.buffer));
}
function copyDate(date, state) {
  return new state.Constructor(date.getTime());
}
function copyMapLoose(map2, state) {
  var clone = new state.Constructor();
  state.cache.set(map2, clone);
  map2.forEach(function(value, key) {
    clone.set(key, state.copier(value, state));
  });
  return clone;
}
function copyMapStrict(map2, state) {
  return copyOwnPropertiesStrict(map2, copyMapLoose(map2, state), state);
}
function copyObjectLooseLegacy(object, state) {
  var clone = getCleanClone(state.prototype);
  state.cache.set(object, clone);
  for (var key in object) {
    if (hasOwnProperty.call(object, key)) {
      clone[key] = state.copier(object[key], state);
    }
  }
  return clone;
}
function copyObjectLooseModern(object, state) {
  var clone = getCleanClone(state.prototype);
  state.cache.set(object, clone);
  for (var key in object) {
    if (hasOwnProperty.call(object, key)) {
      clone[key] = state.copier(object[key], state);
    }
  }
  var symbols = getOwnPropertySymbols(object);
  for (var index = 0, length_3 = symbols.length, symbol = void 0; index < length_3; ++index) {
    symbol = symbols[index];
    if (propertyIsEnumerable.call(object, symbol)) {
      clone[symbol] = state.copier(object[symbol], state);
    }
  }
  return clone;
}
var copyObjectLoose = SUPPORTS_SYMBOL ? copyObjectLooseModern : copyObjectLooseLegacy;
function copyObjectStrict(object, state) {
  var clone = getCleanClone(state.prototype);
  state.cache.set(object, clone);
  return copyOwnPropertiesStrict(object, clone, state);
}
function copyPrimitiveWrapper(primitiveObject, state) {
  return new state.Constructor(primitiveObject.valueOf());
}
function copyRegExp(regExp, state) {
  var clone = new state.Constructor(regExp.source, getRegExpFlags(regExp));
  clone.lastIndex = regExp.lastIndex;
  return clone;
}
function copySelf(value, _state) {
  return value;
}
function copySetLoose(set2, state) {
  var clone = new state.Constructor();
  state.cache.set(set2, clone);
  set2.forEach(function(value) {
    clone.add(state.copier(value, state));
  });
  return clone;
}
function copySetStrict(set2, state) {
  return copyOwnPropertiesStrict(set2, copySetLoose(set2, state), state);
}
var isArray$1 = Array.isArray;
var assign = Object.assign, getPrototypeOf = Object.getPrototypeOf;
var DEFAULT_LOOSE_OPTIONS = {
  array: copyArrayLoose,
  arrayBuffer: copyArrayBuffer,
  blob: copyBlob,
  dataView: copyDataView,
  date: copyDate,
  error: copySelf,
  map: copyMapLoose,
  object: copyObjectLoose,
  regExp: copyRegExp,
  set: copySetLoose
};
var DEFAULT_STRICT_OPTIONS = assign({}, DEFAULT_LOOSE_OPTIONS, {
  array: copyArrayStrict,
  map: copyMapStrict,
  object: copyObjectStrict,
  set: copySetStrict
});
function getTagSpecificCopiers(options) {
  return {
    Arguments: options.object,
    Array: options.array,
    ArrayBuffer: options.arrayBuffer,
    Blob: options.blob,
    Boolean: copyPrimitiveWrapper,
    DataView: options.dataView,
    Date: options.date,
    Error: options.error,
    Float32Array: options.arrayBuffer,
    Float64Array: options.arrayBuffer,
    Int8Array: options.arrayBuffer,
    Int16Array: options.arrayBuffer,
    Int32Array: options.arrayBuffer,
    Map: options.map,
    Number: copyPrimitiveWrapper,
    Object: options.object,
    Promise: copySelf,
    RegExp: options.regExp,
    Set: options.set,
    String: copyPrimitiveWrapper,
    WeakMap: copySelf,
    WeakSet: copySelf,
    Uint8Array: options.arrayBuffer,
    Uint8ClampedArray: options.arrayBuffer,
    Uint16Array: options.arrayBuffer,
    Uint32Array: options.arrayBuffer,
    Uint64Array: options.arrayBuffer
  };
}
function createCopier(options) {
  var normalizedOptions = assign({}, DEFAULT_LOOSE_OPTIONS, options);
  var tagSpecificCopiers = getTagSpecificCopiers(normalizedOptions);
  var array = tagSpecificCopiers.Array, object = tagSpecificCopiers.Object;
  function copier(value, state) {
    state.prototype = state.Constructor = void 0;
    if (!value || typeof value !== "object") {
      return value;
    }
    if (state.cache.has(value)) {
      return state.cache.get(value);
    }
    state.prototype = value.__proto__ || getPrototypeOf(value);
    state.Constructor = state.prototype && state.prototype.constructor;
    if (!state.Constructor || state.Constructor === Object) {
      return object(value, state);
    }
    if (isArray$1(value)) {
      return array(value, state);
    }
    var tagSpecificCopier = tagSpecificCopiers[getTag(value)];
    if (tagSpecificCopier) {
      return tagSpecificCopier(value, state);
    }
    return typeof value.then === "function" ? value : object(value, state);
  }
  return function copy(value) {
    return copier(value, {
      Constructor: void 0,
      cache: createCache(),
      copier,
      prototype: void 0
    });
  };
}
function createStrictCopier(options) {
  return createCopier(assign({}, DEFAULT_STRICT_OPTIONS, options));
}
createStrictCopier({});
createCopier({});
var isArray = (value) => Array.isArray(value);
var isObject = (value) => Object.prototype.toString.call(value).includes("Object");
var isNumeric = (value) => typeof value === "number" && !isNaN(value);
var isInteger = (value) => isNumeric(value) && value % 1 === 0;
var isString$1 = (value) => Object.prototype.toString.call(value) === "[object String]";
var clamp = (value, min = -Infinity, max = Infinity) => Math.max(
  min != null ? min : -Infinity,
  Math.min(value, max != null ? max : Infinity)
);
var UPPERCASE = /\p{Lu}/u;
var LOWERCASE = /\p{Ll}/u;
var LEADING_CAPITAL = /^\p{Lu}(?!\p{Lu})/gu;
var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
var SEPARATORS = /[ \-._]+/;
var LEADING_SEPARATORS = new RegExp(`^${SEPARATORS.source}`);
var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
var NUMBERS_AND_IDENTIFIER = new RegExp(`\\d+${IDENTIFIER.source}`, "gu");
var defaultOptions = {
  preserveConsecutiveUppercase: false
};
var preserveCamelCase = (string) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;
  for (let i = 0; i < string.length; i++) {
    const character = string[i];
    if (isLastCharLower && UPPERCASE.test(character)) {
      string = `${string.slice(0, i)}-${string.slice(i)}`;
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
      string = `${string.slice(0, i - 1)}-${string.slice(i - 1)}`;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
    }
  }
  return string;
};
var preserveConsecutiveUppercase = (input) => {
  LEADING_CAPITAL.lastIndex = 0;
  return input.replace(LEADING_CAPITAL, (m1) => m1.toLowerCase());
};
var postProcess = (input) => {
  SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  NUMBERS_AND_IDENTIFIER.lastIndex = 0;
  return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => identifier.toUpperCase()).replace(NUMBERS_AND_IDENTIFIER, (m) => m.toUpperCase());
};
var camelCase = (input, options) => {
  if (!isArray(!input) && !isString$1(input)) {
    throw new TypeError("Expected the input to be `string | string[]`");
  }
  options = { ...defaultOptions, ...options };
  input = isArray(input) ? input.map((v) => v.trim()).filter(Boolean).join("-") : input.trim();
  if (!input.length)
    return "";
  if (input.length === 1)
    return input.toLowerCase();
  if (input !== input.toLowerCase()) {
    input = preserveCamelCase(input);
  }
  input = input.replace(LEADING_SEPARATORS, "");
  input = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input) : input.toLowerCase();
  return postProcess(input);
};
var kebabCase = (input, _options2) => {
  const options = { numbers: false, ..._options2 };
  let result = input.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s._]+/g, "-");
  if (!options.numbers)
    return result.toLowerCase();
  result = result.replace(/\d+/, "-$&").replace(/(\d)([A-Z])/g, "$1-$2");
  return result.startsWith("-") ? result.slice(1).toLowerCase() : result.toLowerCase();
};
var defaultOptions2 = {
  preserveConsecutiveUppercase: false
};
var pascalCase = (input, options) => {
  const base = camelCase(input, { ...defaultOptions2, ...options });
  if (!base.length)
    return "";
  return base[0].toUpperCase() + base.slice(1);
};
const validateEnterLeave = (value, validator) => {
  if (validator(value))
    return true;
  if (!isObject(value))
    return false;
  if (Object.keys(value).length !== 2)
    return false;
  return !Object.entries(value).some(([key, val]) => {
    const wrongKey = !["enter", "leave"].includes(key);
    const wrongValue = !validator(val);
    return wrongKey || wrongValue;
  });
};
const validateDuration = (value) => validateEnterLeave(value, (val) => {
  return isInteger(val) && val >= 0;
});
const validateEasing = (value) => validateEnterLeave(value, (val) => {
  return isString$1(val) && val.trim() !== "";
});
const validateDelay = (value) => validateEnterLeave(value, (val) => {
  return isInteger(val) && val >= 0;
});
const transitionDuration = 300;
const transitionEasing = "cubic-bezier(.25, .8, .5, 1)";
const transitionDelay = 0;
const expandAxis = "y";
const slideOffset = [0, -16];
const scaleAxis = "both";
const scaleOrigin = "50% 50%";
const scaleValue = 0;
const moveDuration = transitionDuration;
const baseTransition = {
  inheritAttrs: false,
  props: {
    duration: {
      validator: validateDuration,
      default: transitionDuration
    },
    easing: {
      validator: validateEasing,
      default: () => transitionEasing
    },
    delay: {
      validator: validateDelay,
      default: transitionDelay
    },
    noOpacity: {
      type: Boolean,
      default: false
    },
    appear: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: void 0
    },
    group: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "span"
    },
    noMove: {
      type: Boolean,
      default: false
    },
    moveDuration: {
      type: Number,
      default: moveDuration
    }
  },
  computed: {
    cComponent() {
      return this.group ? TransitionGroup : Transition;
    },
    cAttrs() {
      const { appear, mode, tag, duration } = this;
      return this.group ? { appear, tag, duration, ...this.$attrs } : { appear, mode, duration };
    },
    cHooks() {
      return {
        beforeEnter: (...args) => {
          this.reduceTransition(...args);
          this.$emit("before-enter", ...args);
        },
        beforeLeave: (...args) => {
          var _a2;
          this.reduceTransition(...args);
          (_a2 = this.initLeaving) == null ? void 0 : _a2.call(this, ...args);
          this.$emit("before-leave", ...args);
        },
        enter: (...args) => {
          var _a2;
          (_a2 = this.onEnter) == null ? void 0 : _a2.call(this, ...args);
          this.$emit("enter", ...args);
        },
        leave: (...args) => {
          var _a2;
          (_a2 = this.onLeave) == null ? void 0 : _a2.call(this, ...args);
          this.$emit("leave", ...args);
        },
        afterEnter: (...args) => {
          var _a2;
          this.resetTransition(...args);
          (_a2 = this.resetElement) == null ? void 0 : _a2.call(this, ...args);
          this.$emit("after-enter", ...args);
        },
        afterLeave: (...args) => {
          var _a2;
          this.resetTransition(...args);
          (_a2 = this.resetElement) == null ? void 0 : _a2.call(this, ...args);
          this.$emit("after-leave", ...args);
        }
      };
    }
  },
  methods: {
    setupTransition(element, event = "enter") {
      var _a2, _b, _c, _d, _e, _f;
      const duration = (_b = (_a2 = this.duration) == null ? void 0 : _a2[event]) != null ? _b : this.duration;
      const easing = (_d = (_c = this.easing) == null ? void 0 : _c[event]) != null ? _d : this.easing;
      const delay = (_f = (_e = this.delay) == null ? void 0 : _e[event]) != null ? _f : this.delay;
      element.style.setProperty("transition-duration", `${duration}ms`, "important");
      element.style.setProperty("transition-timing-function", `${easing}`, "important");
      element.style.setProperty("transition-delay", `${delay}ms`, "important");
    },
    reduceTransition(element) {
      element.style.setProperty("transition-duration", "0ms", "important");
      element.style.setProperty("transition-delay", "0ms", "important");
    },
    resetTransition(element) {
      element.style.removeProperty("transition-duration");
      element.style.removeProperty("transition-timing-function");
      element.style.removeProperty("transition-delay");
    },
    initLeaving(element) {
      if (!this.group || this.noMove)
        return element;
      const styles = getComputedStyle(element);
      const { width, height } = styles;
      const { marginLeft, marginTop } = styles;
      element.style.setProperty("left", `${element.offsetLeft - parseFloat(marginLeft)}px`, "important");
      element.style.setProperty("top", `${element.offsetTop - parseFloat(marginTop)}px`, "important");
      element.style.setProperty("width", `${parseFloat(width)}px`, "important");
      element.style.setProperty("height", `${parseFloat(height)}px`, "important");
      element.style.setProperty("position", "absolute", "important");
      return element;
    },
    setMoveDuration() {
      var _a2;
      if (this.group && this.$el) {
        (_a2 = this.$el.style) == null ? void 0 : _a2.setProperty("--move-duration", `${this.moveDuration}ms`);
      }
    }
  },
  watch: {
    moveDuration() {
      this.setMoveDuration();
    },
    group() {
      this.setMoveDuration();
    }
  },
  mounted() {
    this.setMoveDuration();
  }
};
const validateExpandAxis = (value) => validateEnterLeave(value, (val) => {
  return isString$1(val) && ["x", "y"].includes(val);
});
const _export_sfc$1 = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3$1 = {
  name: "transition-expand",
  mixins: [
    baseTransition
  ],
  props: {
    axis: {
      validator: validateExpandAxis,
      default: expandAxis
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    async onEnter(element) {
      await this.$nextTick();
      await this.$nextTick();
      this.getSizes(element);
      this.collapseElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      this.expandElement(element, "enter");
    },
    onLeave(element) {
      this.getSizes(element);
      this.expandElement(element, "leave");
      element.offsetTop;
      this.setupTransition(element, "leave");
      this.collapseElement(element, "leave");
    },
    expandElement(element, event = "enter") {
      var _a2, _b;
      const axis = (_b = (_a2 = this.axis) == null ? void 0 : _a2[event]) != null ? _b : this.axis;
      const start = axis === "x" ? "left" : "top";
      const end = axis === "x" ? "right" : "bottom";
      const size2 = element.visual.size[axis];
      const margin = element.visual.margin[axis];
      const padding = element.visual.padding[axis];
      if (!this.noOpacity) {
        element.style.setProperty("opacity", element.visual.opacity);
      }
      delete element.visual;
      element.style.setProperty(axis === "x" ? "width" : "height", `${parseFloat(size2)}px`);
      element.style.setProperty(`padding-${start}`, `${parseFloat(padding[0])}px`);
      element.style.setProperty(`padding-${end}`, `${parseFloat(padding[1])}px`);
      element.style.setProperty(`margin-${start}`, `${parseFloat(margin[0])}px`);
      element.style.setProperty(`margin-${end}`, `${parseFloat(margin[1])}px`);
    },
    collapseElement(element, event = "enter") {
      var _a2, _b;
      const axis = (_b = (_a2 = this.axis) == null ? void 0 : _a2[event]) != null ? _b : this.axis;
      const axisProp = axis === "x" ? "width" : "height";
      const start = axis === "x" ? "left" : "top";
      const end = axis === "x" ? "right" : "bottom";
      if (!this.noOpacity) {
        element.style.setProperty("opacity", 0);
      }
      element.style.setProperty(axisProp, "0px");
      element.style.setProperty(`padding-${start}`, "0px");
      element.style.setProperty(`padding-${end}`, "0px");
      element.style.setProperty(`margin-${start}`, "0px");
      element.style.setProperty(`margin-${end}`, "0px");
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("width");
      element.style.removeProperty("height");
      element.style.removeProperty("padding-top");
      element.style.removeProperty("padding-right");
      element.style.removeProperty("padding-bottom");
      element.style.removeProperty("padding-left");
      element.style.removeProperty("margin-top");
      element.style.removeProperty("margin-right");
      element.style.removeProperty("margin-bottom");
      element.style.removeProperty("margin-left");
    },
    getSizes(element) {
      const styles = getComputedStyle(element);
      const { opacity } = styles;
      const { width, height } = styles;
      const { paddingTop, paddingRight, paddingBottom, paddingLeft } = styles;
      const { marginTop, marginRight, marginBottom, marginLeft } = styles;
      element.visual = {
        opacity,
        size: { x: width, y: height },
        padding: { x: [paddingLeft, paddingRight], y: [paddingTop, paddingBottom] },
        margin: { x: [marginLeft, marginRight], y: [marginTop, marginBottom] }
      };
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "expand" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionExpand = /* @__PURE__ */ _export_sfc$1(_sfc_main$3$1, [["render", _sfc_render$3]]);
const _sfc_main$2$1 = {
  name: "transition-fade",
  mixins: [
    baseTransition
  ],
  props: {},
  data: () => ({}),
  computed: {},
  methods: {
    onEnter(element) {
      this.fadeElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      this.$nextTick(() => element.style.removeProperty("opacity"));
    },
    onLeave(element) {
      this.setupTransition(element, "leave");
      this.fadeElement(element, "leave");
    },
    fadeElement(element, event = "enter") {
      element.style.setProperty("opacity", 0);
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "fade" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionFade = /* @__PURE__ */ _export_sfc$1(_sfc_main$2$1, [["render", _sfc_render$2]]);
const validateScaleAxis = (value) => validateEnterLeave(value, (val) => {
  return isString$1(val) && ["x", "y", "both"].includes(val);
});
const validateScaleOrigin = (value) => validateEnterLeave(value, (val) => {
  return isString$1(val) && val.trim() !== "";
});
const validateScaleValue = (value) => validateEnterLeave(value, (val) => {
  return isNumeric(val) && val >= 0 && val <= 1;
});
const getMatrix = (transform) => {
  const matrixType = transform.startsWith("matrix3d") ? "matrix3d" : "matrix";
  const matrix = matrixType === "matrix3d" ? transform.slice(9, -1).split(",").map(Number) : transform.startsWith("matrix") ? transform.slice(7, -1).split(",").map(Number) : [1, 0, 0, 1, 0, 0];
  return [matrixType, matrix];
};
const _sfc_main$1$1 = {
  name: "transition-scale",
  mixins: [
    baseTransition
  ],
  props: {
    axis: {
      validator: validateScaleAxis,
      default: scaleAxis
    },
    origin: {
      validator: validateScaleOrigin,
      default: scaleOrigin
    },
    scale: {
      validator: validateScaleValue,
      default: scaleValue
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    onEnter(element) {
      this.scaleElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      this.$nextTick(() => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      });
    },
    onLeave(element) {
      this.setupTransition(element, "leave");
      this.scaleElement(element, "leave");
    },
    scaleElement(element, event = "enter") {
      var _a2, _b, _c, _d, _e, _f;
      const { transform } = getComputedStyle(element);
      const axis = (_b = (_a2 = this.axis) == null ? void 0 : _a2[event]) != null ? _b : this.axis;
      const origin = (_d = (_c = this.origin) == null ? void 0 : _c[event]) != null ? _d : this.origin;
      const scale = clamp(1e-4, (_f = (_e = this.scale) == null ? void 0 : _e[event]) != null ? _f : this.scale, 0.9999);
      const [matrixType, matrix] = getMatrix(transform);
      if (transform.startsWith("matrix3d")) {
        if (axis !== "y")
          matrix[0] = scale;
        if (axis !== "x")
          matrix[5] = scale;
      } else if (transform.startsWith("matrix")) {
        if (axis !== "y")
          matrix[0] = scale;
        if (axis !== "x")
          matrix[3] = scale;
      } else {
        matrix[0] = axis === "y" ? 1 : scale;
        matrix[3] = axis === "x" ? 1 : scale;
      }
      if (!this.noOpacity) {
        element.style.setProperty("opacity", 0);
      }
      element.style.setProperty("transform", `${matrixType}(${matrix})`);
      element.style.setProperty("transform-origin", `${origin}`);
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.style.removeProperty("transform-origin");
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "scale" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionScale = /* @__PURE__ */ _export_sfc$1(_sfc_main$1$1, [["render", _sfc_render$1]]);
const validateSlideOffset = (value) => validateEnterLeave(value, (val) => {
  if (!isArray(val))
    return false;
  if (val.length !== 2)
    return false;
  return !val.some((v) => {
    if (isInteger(v))
      return false;
    if (isString$1(v)) {
      return isNaN(Number(v.endsWith("%") ? v.slice(0, -1) : v));
    }
    return true;
  });
});
const _sfc_main$b = {
  name: "transition-slide",
  mixins: [
    baseTransition
  ],
  props: {
    offset: {
      validator: validateSlideOffset,
      default: () => slideOffset
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    onEnter(element) {
      this.slideElement(element, "enter");
      element.offsetTop;
      this.setupTransition(element, "enter");
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    },
    onLeave(element) {
      this.setupTransition(element, "leave");
      this.slideElement(element, "leave");
    },
    slideElement(element, event = "enter") {
      var _a2, _b;
      const { width, height, transform } = getComputedStyle(element);
      const offset = (_b = (_a2 = this.offset) == null ? void 0 : _a2[event]) != null ? _b : this.offset;
      let [offsetX, offsetY] = offset;
      if (!isNumeric(offsetX)) {
        const val = offsetX.endsWith("%") ? parseFloat(width) * (parseFloat(offsetX.slice(0, -1)) || 0) / 100 : parseFloat(offsetX);
        offsetX = val;
      }
      if (!isNumeric(offsetY)) {
        const val = offsetY.endsWith("%") ? parseFloat(height) * (parseFloat(offsetY.slice(0, -1)) || 0) / 100 : parseFloat(offsetY);
        offsetY = val;
      }
      const [matrixType, matrix] = getMatrix(transform);
      if (transform.startsWith("matrix3d")) {
        matrix[12] += offsetX;
        matrix[13] += offsetY;
      } else if (transform.startsWith("matrix")) {
        matrix[4] += offsetX;
        matrix[5] += offsetY;
      } else {
        matrix[4] = offsetX;
        matrix[5] = offsetY;
      }
      if (!this.noOpacity) {
        element.style.setProperty("opacity", 0);
      }
      element.style.setProperty("transform", `${matrixType}(${matrix})`);
    },
    resetElement(element) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    }
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.cComponent), mergeProps({ name: "slide" }, _ctx.cAttrs, toHandlers(_ctx.cHooks)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const TransitionSlide = /* @__PURE__ */ _export_sfc$1(_sfc_main$b, [["render", _sfc_render$4]]);
const components = {
  [TransitionExpand.name]: TransitionExpand,
  [TransitionFade.name]: TransitionFade,
  [TransitionScale.name]: TransitionScale,
  [TransitionSlide.name]: TransitionSlide
};
const setProp = (component, prop, value) => {
  var _a2;
  (_a2 = component.props) != null ? _a2 : component.props = {};
  component.props[prop] = {
    default: isArray(value) || isObject(value) ? () => value : value
  };
};
const getComponentDeclaration = (name, options) => {
  var _a2, _b, _c;
  const kebabName = kebabCase(name);
  const pascalName = pascalCase(name);
  const defaultProps = (_a2 = options == null ? void 0 : options.defaultProps) != null ? _a2 : {};
  const componentProps = (_c = (_b = options == null ? void 0 : options.componentDefaultProps) == null ? void 0 : _b[pascalName]) != null ? _c : {};
  Object.entries(defaultProps).forEach(([prop, propValue]) => {
    setProp(components[kebabName], prop, propValue);
  });
  Object.entries(componentProps).forEach(([prop, propValue]) => {
    setProp(components[kebabName], prop, propValue);
  });
  return components[kebabName];
};
const install = function(Vue, options = {}) {
  if (options == null ? void 0 : options.components) {
    Object.entries(options.components).forEach(([originalName, neededName]) => {
      Vue.component(neededName, getComponentDeclaration(originalName, options));
    });
  } else {
    Object.keys(components).forEach((name) => {
      Vue.component(name, getComponentDeclaration(name, options));
    });
  }
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use({ install });
}
var _a;
const isClient = typeof window !== "undefined";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const noop = () => {
};
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve2, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve2).catch(reject);
    });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function throttleFilter(ms, trailing = true, leading = true, rejectOnCancel = false) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  const clear2 = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = resolveUnref(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear2();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      return new Promise((resolve2, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve2;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve2(invoke());
          clear2();
        }, duration - elapsed);
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive, pause, resume, eventFilter };
}
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
  return new Promise((resolve2, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms);
    else
      setTimeout(resolve2, ms);
  });
}
function identity(arg) {
  return arg;
}
function containsProp(obj, ...props) {
  return props.some((k) => k in obj);
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createEventHook() {
  const fns = [];
  const off = (fn) => {
    const index = fns.indexOf(fn);
    if (index !== -1)
      fns.splice(index, 1);
  };
  const on = (fn) => {
    fns.push(fn);
    const offFn = () => off(fn);
    tryOnScopeDispose(offFn);
    return {
      off: offFn
    };
  };
  const trigger2 = (param) => {
    fns.forEach((fn) => fn(param));
  };
  return {
    on,
    off,
    trigger: trigger2
  };
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn);
}
function resolveRef(r) {
  return typeof r === "function" ? computed(r) : ref(r);
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function createUntil(r, isNot = false) {
  function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
    let stop = null;
    const watcher = new Promise((resolve2) => {
      stop = watch(r, (v) => {
        if (condition(v) !== isNot) {
          stop == null ? void 0 : stop();
          resolve2(v);
        }
      }, {
        flush,
        deep,
        immediate: true
      });
    });
    const promises = [watcher];
    if (timeout != null) {
      promises.push(promiseTimeout(timeout, throwOnTimeout).then(() => resolveUnref(r)).finally(() => stop == null ? void 0 : stop()));
    }
    return Promise.race(promises);
  }
  function toBe(value, options) {
    if (!isRef(value))
      return toMatch((v) => v === value, options);
    const { flush = "sync", deep = false, timeout, throwOnTimeout } = options != null ? options : {};
    let stop = null;
    const watcher = new Promise((resolve2) => {
      stop = watch([r, value], ([v1, v2]) => {
        if (isNot !== (v1 === v2)) {
          stop == null ? void 0 : stop();
          resolve2(v1);
        }
      }, {
        flush,
        deep,
        immediate: true
      });
    });
    const promises = [watcher];
    if (timeout != null) {
      promises.push(promiseTimeout(timeout, throwOnTimeout).then(() => resolveUnref(r)).finally(() => {
        stop == null ? void 0 : stop();
        return resolveUnref(r);
      }));
    }
    return Promise.race(promises);
  }
  function toBeTruthy(options) {
    return toMatch((v) => Boolean(v), options);
  }
  function toBeNull(options) {
    return toBe(null, options);
  }
  function toBeUndefined(options) {
    return toBe(void 0, options);
  }
  function toBeNaN(options) {
    return toMatch(Number.isNaN, options);
  }
  function toContains(value, options) {
    return toMatch((v) => {
      const array = Array.from(v);
      return array.includes(value) || array.includes(resolveUnref(value));
    }, options);
  }
  function changed(options) {
    return changedTimes(1, options);
  }
  function changedTimes(n = 1, options) {
    let count = -1;
    return toMatch(() => {
      count += 1;
      return count >= n;
    }, options);
  }
  if (Array.isArray(resolveUnref(r))) {
    const instance = {
      toMatch,
      toContains,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  } else {
    const instance = {
      toMatch,
      toBe,
      toBeTruthy,
      toBeNull,
      toBeNaN,
      toBeUndefined,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  }
}
function until(r) {
  return createUntil(r);
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear2() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear2();
  }
  function start(...args) {
    clear2();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, resolveUnref(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending,
    start,
    stop
  };
}
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$6.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$6.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter = bypassFilter
  } = _a2, watchOptions = __objRest$5(_a2, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchPausable(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter: filter
  } = _a2, watchOptions = __objRest$1(_a2, [
    "eventFilter"
  ]);
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(source, cb, __spreadProps$2(__spreadValues$2({}, watchOptions), {
    eventFilter
  }));
  return { stop, pause, resume, isActive };
}
function unrefElement(elRef) {
  var _a2;
  const plain = resolveUnref(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
}
const defaultWindow = isClient ? window : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register2 = (el, event, listener) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events.flatMap((event) => {
      return listeners.map((listener) => register2(el, event, listener));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useSupported(callback, sync = false) {
  const isSupported2 = ref();
  const update = () => isSupported2.value = Boolean(callback());
  update();
  tryOnMounted(update, sync);
  return isSupported2;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var __defProp$j = Object.defineProperty;
var __getOwnPropSymbols$l = Object.getOwnPropertySymbols;
var __hasOwnProp$l = Object.prototype.hasOwnProperty;
var __propIsEnum$l = Object.prototype.propertyIsEnumerable;
var __defNormalProp$j = (obj, key, value) => key in obj ? __defProp$j(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$j = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$l.call(b, prop))
      __defNormalProp$j(a, prop, b[prop]);
  if (__getOwnPropSymbols$l)
    for (var prop of __getOwnPropSymbols$l(b)) {
      if (__propIsEnum$l.call(b, prop))
        __defNormalProp$j(a, prop, b[prop]);
    }
  return a;
};
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
function useStorage(key, defaults, storage, options = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const data = (shallow ? shallowRef : ref)(defaults);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a22;
        return (_a22 = defaultWindow) == null ? void 0 : _a22.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage)
    return data;
  const rawInit = resolveUnref(defaults);
  const type = guessSerializerType(rawInit);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, () => write(data.value), { flush, deep, eventFilter });
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", update);
  update();
  return data;
  function write(v) {
    try {
      if (v == null) {
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v);
        const oldValue = storage.getItem(key);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          if (window2) {
            window2 == null ? void 0 : window2.dispatchEvent(new StorageEvent("storage", {
              key,
              oldValue,
              newValue: serialized,
              storageArea: storage
            }));
          }
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit !== null)
        storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (isFunction(mergeDefaults))
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return __spreadValues$j(__spreadValues$j({}, rawInit), value);
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      data.value = read(event);
    } catch (e) {
      onError(e);
    } finally {
      if (event)
        nextTick(resumeWatch);
      else
        resumeWatch();
    }
  }
}
var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
var __hasOwnProp$f = Object.prototype.hasOwnProperty;
var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$f.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$f)
    for (var prop of __getOwnPropSymbols$f(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$f.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a2 = options, { window: window2 = defaultWindow } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
  let observer;
  const isSupported2 = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported2.value && window2 && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported: isSupported2,
    stop
  };
}
var __defProp$c = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$d = Object.getOwnPropertySymbols;
var __hasOwnProp$d = Object.prototype.hasOwnProperty;
var __propIsEnum$d = Object.prototype.propertyIsEnumerable;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$c = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$d.call(b, prop))
      __defNormalProp$c(a, prop, b[prop]);
  if (__getOwnPropSymbols$d)
    for (var prop of __getOwnPropSymbols$d(b)) {
      if (__propIsEnum$d.call(b, prop))
        __defNormalProp$c(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
const payloadMapping = {
  json: "application/json",
  text: "text/plain"
};
function isFetchOptions(obj) {
  return containsProp(obj, "immediate", "refetch", "initialData", "timeout", "beforeFetch", "afterFetch", "onFetchError", "fetch");
}
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function headersToObject(headers) {
  if (typeof Headers !== "undefined" && headers instanceof Headers)
    return Object.fromEntries([...headers.entries()]);
  return headers;
}
function combineCallbacks(combination, ...callbacks) {
  if (combination === "overwrite") {
    return async (ctx) => {
      const callback = callbacks[callbacks.length - 1];
      if (callback !== void 0)
        await callback(ctx);
      return ctx;
    };
  } else {
    return async (ctx) => {
      await callbacks.reduce((prevCallback, callback) => prevCallback.then(async () => {
        if (callback)
          ctx = __spreadValues$c(__spreadValues$c({}, ctx), await callback(ctx));
      }), Promise.resolve());
      return ctx;
    };
  }
}
function createFetch(config = {}) {
  const _combination = config.combination || "chain";
  const _options = config.options || {};
  const _fetchOptions = config.fetchOptions || {};
  function useFactoryFetch(url, ...args) {
    const computedUrl = computed(() => {
      const baseUrl = resolveUnref(config.baseUrl);
      const targetUrl = resolveUnref(url);
      return baseUrl && !isAbsoluteURL(targetUrl) ? joinPaths(baseUrl, targetUrl) : targetUrl;
    });
    let options = _options;
    let fetchOptions = _fetchOptions;
    if (args.length > 0) {
      if (isFetchOptions(args[0])) {
        options = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, options), args[0]), {
          beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[0].beforeFetch),
          afterFetch: combineCallbacks(_combination, _options.afterFetch, args[0].afterFetch),
          onFetchError: combineCallbacks(_combination, _options.onFetchError, args[0].onFetchError)
        });
      } else {
        fetchOptions = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, fetchOptions), args[0]), {
          headers: __spreadValues$c(__spreadValues$c({}, headersToObject(fetchOptions.headers) || {}), headersToObject(args[0].headers) || {})
        });
      }
    }
    if (args.length > 1 && isFetchOptions(args[1])) {
      options = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, options), args[1]), {
        beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[1].beforeFetch),
        afterFetch: combineCallbacks(_combination, _options.afterFetch, args[1].afterFetch),
        onFetchError: combineCallbacks(_combination, _options.onFetchError, args[1].onFetchError)
      });
    }
    return useFetch(computedUrl, fetchOptions, options);
  }
  return useFactoryFetch;
}
function useFetch(url, ...args) {
  var _a2;
  const supportsAbort = typeof AbortController === "function";
  let fetchOptions = {};
  let options = { immediate: true, refetch: false, timeout: 0 };
  const config = {
    method: "GET",
    type: "text",
    payload: void 0
  };
  if (args.length > 0) {
    if (isFetchOptions(args[0]))
      options = __spreadValues$c(__spreadValues$c({}, options), args[0]);
    else
      fetchOptions = args[0];
  }
  if (args.length > 1) {
    if (isFetchOptions(args[1]))
      options = __spreadValues$c(__spreadValues$c({}, options), args[1]);
  }
  const {
    fetch: fetch2 = (_a2 = defaultWindow) == null ? void 0 : _a2.fetch,
    initialData,
    timeout
  } = options;
  const responseEvent = createEventHook();
  const errorEvent = createEventHook();
  const finallyEvent = createEventHook();
  const isFinished = ref(false);
  const isFetching = ref(false);
  const aborted = ref(false);
  const statusCode = ref(null);
  const response = shallowRef(null);
  const error = shallowRef(null);
  const data = shallowRef(initialData);
  const canAbort = computed(() => supportsAbort && isFetching.value);
  let controller;
  let timer;
  const abort = () => {
    if (supportsAbort && controller)
      controller.abort();
  };
  const loading = (isLoading) => {
    isFetching.value = isLoading;
    isFinished.value = !isLoading;
  };
  if (timeout)
    timer = useTimeoutFn(abort, timeout, { immediate: false });
  const execute = async (throwOnFailed = false) => {
    var _a22;
    loading(true);
    error.value = null;
    statusCode.value = null;
    aborted.value = false;
    controller = void 0;
    if (supportsAbort) {
      controller = new AbortController();
      controller.signal.onabort = () => aborted.value = true;
      fetchOptions = __spreadProps$3(__spreadValues$c({}, fetchOptions), {
        signal: controller.signal
      });
    }
    const defaultFetchOptions = {
      method: config.method,
      headers: {}
    };
    if (config.payload) {
      const headers = headersToObject(defaultFetchOptions.headers);
      if (config.payloadType)
        headers["Content-Type"] = (_a22 = payloadMapping[config.payloadType]) != null ? _a22 : config.payloadType;
      const payload = resolveUnref(config.payload);
      defaultFetchOptions.body = config.payloadType === "json" ? JSON.stringify(payload) : payload;
    }
    let isCanceled = false;
    const context = {
      url: resolveUnref(url),
      options: __spreadValues$c(__spreadValues$c({}, defaultFetchOptions), fetchOptions),
      cancel: () => {
        isCanceled = true;
      }
    };
    if (options.beforeFetch)
      Object.assign(context, await options.beforeFetch(context));
    if (isCanceled || !fetch2) {
      loading(false);
      return Promise.resolve(null);
    }
    let responseData = null;
    if (timer)
      timer.start();
    return new Promise((resolve2, reject) => {
      var _a3;
      fetch2(context.url, __spreadProps$3(__spreadValues$c(__spreadValues$c({}, defaultFetchOptions), context.options), {
        headers: __spreadValues$c(__spreadValues$c({}, headersToObject(defaultFetchOptions.headers)), headersToObject((_a3 = context.options) == null ? void 0 : _a3.headers))
      })).then(async (fetchResponse) => {
        response.value = fetchResponse;
        statusCode.value = fetchResponse.status;
        responseData = await fetchResponse[config.type]();
        if (options.afterFetch && statusCode.value >= 200 && statusCode.value < 300)
          ({ data: responseData } = await options.afterFetch({ data: responseData, response: fetchResponse }));
        data.value = responseData;
        if (!fetchResponse.ok)
          throw new Error(fetchResponse.statusText);
        responseEvent.trigger(fetchResponse);
        return resolve2(fetchResponse);
      }).catch(async (fetchError) => {
        let errorData = fetchError.message || fetchError.name;
        if (options.onFetchError)
          ({ data: responseData, error: errorData } = await options.onFetchError({ data: responseData, error: fetchError, response: response.value }));
        data.value = responseData;
        error.value = errorData;
        errorEvent.trigger(fetchError);
        if (throwOnFailed)
          return reject(fetchError);
        return resolve2(null);
      }).finally(() => {
        loading(false);
        if (timer)
          timer.stop();
        finallyEvent.trigger(null);
      });
    });
  };
  const refetch = resolveRef(options.refetch);
  watch([
    refetch,
    resolveRef(url)
  ], ([refetch2]) => refetch2 && execute(), { deep: true });
  const shell = {
    isFinished,
    statusCode,
    response,
    error,
    data,
    isFetching,
    canAbort,
    aborted,
    abort,
    execute,
    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    get: setMethod("GET"),
    put: setMethod("PUT"),
    post: setMethod("POST"),
    delete: setMethod("DELETE"),
    patch: setMethod("PATCH"),
    head: setMethod("HEAD"),
    options: setMethod("OPTIONS"),
    json: setType("json"),
    text: setType("text"),
    blob: setType("blob"),
    arrayBuffer: setType("arrayBuffer"),
    formData: setType("formData")
  };
  function setMethod(method) {
    return (payload, payloadType) => {
      if (!isFetching.value) {
        config.method = method;
        config.payload = payload;
        config.payloadType = payloadType;
        if (isRef(config.payload)) {
          watch([
            refetch,
            resolveRef(config.payload)
          ], ([refetch2]) => refetch2 && execute(), { deep: true });
        }
        const rawPayload = resolveUnref(config.payload);
        if (!payloadType && rawPayload && Object.getPrototypeOf(rawPayload) === Object.prototype && !(rawPayload instanceof FormData))
          config.payloadType = "json";
        return __spreadProps$3(__spreadValues$c({}, shell), {
          then(onFulfilled, onRejected) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          }
        });
      }
      return void 0;
    };
  }
  function waitUntilFinished() {
    return new Promise((resolve2, reject) => {
      until(isFinished).toBe(true).then(() => resolve2(shell)).catch((error2) => reject(error2));
    });
  }
  function setType(type) {
    return () => {
      if (!isFetching.value) {
        config.type = type;
        return __spreadProps$3(__spreadValues$c({}, shell), {
          then(onFulfilled, onRejected) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          }
        });
      }
      return void 0;
    };
  }
  if (options.immediate)
    setTimeout(execute, 0);
  return __spreadProps$3(__spreadValues$c({}, shell), {
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    }
  });
}
function joinPaths(start, end) {
  if (!start.endsWith("/") && !end.startsWith("/"))
    return `${start}/${end}`;
  return `${start}${end}`;
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function useTextareaAutosize(options) {
  const textarea = ref(options == null ? void 0 : options.element);
  const input = ref(options == null ? void 0 : options.input);
  function triggerResize() {
    var _a2, _b;
    if (!textarea.value)
      return;
    textarea.value.style.height = "1px";
    textarea.value.style.height = `${(_a2 = textarea.value) == null ? void 0 : _a2.scrollHeight}px`;
    (_b = options == null ? void 0 : options.onResize) == null ? void 0 : _b.call(options);
  }
  watch([input, textarea], triggerResize, { immediate: true });
  useResizeObserver(textarea, () => triggerResize());
  if (options == null ? void 0 : options.watch)
    watch(options.watch, triggerResize, { immediate: true, deep: true });
  return {
    textarea,
    input,
    triggerResize
  };
}
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
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
const _hoisted_1$a = { class: "flex items-center" };
const _hoisted_2$9 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"
}, null, -1);
const _hoisted_3$8 = [
  _hoisted_2$9
];
const _hoisted_4$7 = { class: "avatar" };
const _hoisted_5$7 = { class: "w-8 rounded" };
const _hoisted_6$7 = ["src"];
const _hoisted_7$6 = { class: "flex items-center" };
const _hoisted_8$5 = /* @__PURE__ */ createBaseVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    fill: "currentColor",
    d: "m16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53l-4.95-4.95l-4.95 4.95Z"
  })
], -1);
const _hoisted_9$4 = [
  _hoisted_8$5
];
const _hoisted_10$3 = /* @__PURE__ */ createBaseVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, [
  /* @__PURE__ */ createBaseVNode("path", { d: "M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z" })
], -1);
const _hoisted_11$2 = [
  _hoisted_10$3
];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ChatHeader",
  emits: ["clear", "close", "openSetting"],
  setup(__props, { emit: emit2 }) {
    const provided = inject(appearance);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "flex justify-between rounded-t-2xl items-center px-3 h-16 min-h-16 z-40",
        style: normalizeStyle(unref(provided).style)
      }, [
        createBaseVNode("div", _hoisted_1$a, [
          createBaseVNode("button", {
            class: "icon btn btn-ghost hover:!border-none focus:!border-none btn-sm btn-square w-[32px] h-[32px]",
            "aria-label": "open settings",
            onClick: _cache[0] || (_cache[0] = ($event) => emit2("openSetting"))
          }, [
            (openBlock(), createElementBlock("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: normalizeClass(["h-5 my-auto", unref(provided).textClass]),
              viewBox: "0 0 16 16"
            }, _hoisted_3$8, 2))
          ]),
          createBaseVNode("div", _hoisted_4$7, [
            createBaseVNode("div", _hoisted_5$7, [
              unref(provided).logo_asset_url ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: unref(provided).logo_asset_url
              }, null, 8, _hoisted_6$7)) : createCommentVNode("", true)
            ])
          ])
        ]),
        createBaseVNode("h1", {
          class: normalizeClass(["text-lg text-center py-3 mx-2 hyphens-auto", unref(provided).textClass])
        }, toDisplayString(unref(provided).header_text), 3),
        createBaseVNode("div", _hoisted_7$6, [
          createBaseVNode("button", {
            class: "icon btn btn-ghost hover:!border-none focus:!border-none btn-sm btn-square w-[32px] h-[32px]",
            "aria-label": "clear chat",
            onClick: _cache[1] || (_cache[1] = ($event) => emit2("clear"))
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["w-6 h-6", unref(provided).textClass])
            }, _hoisted_9$4, 2)
          ]),
          createBaseVNode("button", {
            class: "icon btn btn-ghost hover:!border-none focus:!border-none btn-sm btn-square w-[32px] h-[32px]",
            "aria-label": "minimize",
            onClick: _cache[2] || (_cache[2] = ($event) => emit2("close"))
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["w-5 h-5", unref(provided).textClass])
            }, _hoisted_11$2, 2)
          ])
        ])
      ], 4);
    };
  }
});
const _hoisted_1$9 = {
  key: 0,
  class: "chat chat-start !py-1 !gap-x-[12px]"
};
const _hoisted_2$8 = { class: "chat-image avatar" };
const _hoisted_3$7 = { class: "w-8 rounded-full" };
const _hoisted_4$6 = ["src"];
const _hoisted_5$6 = {
  key: 0,
  class: "chat-header"
};
const _hoisted_6$6 = { class: "text-xs opacity-50" };
const _hoisted_7$5 = { class: "rounded-r-lg rounded-tl-lg px-5 bg-[#DDE2EB] text-black leading-[24px] py-4 mr-5 break-words" };
const _hoisted_8$4 = {
  key: 0,
  class: "mt-3 text-xs"
};
const _hoisted_9$3 = ["href"];
const _hoisted_10$2 = {
  key: 1,
  class: "chat chat-end !py-1 !gap-x-[12px]"
};
const _hoisted_11$1 = { key: 0 };
const _hoisted_12$1 = { class: "text-xs opacity-50" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ChatBubble",
  props: {
    message: null,
    timestamp: null,
    isFirst: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const provided = inject(appearance);
    const showTime = computed(() => {
      if (props.isFirst)
        return true;
      const current = Math.floor(props.timestamp / 1e3 / 60);
      const last = Math.floor(props.timestamp / 1e3 / 60);
      if (current === last)
        return false;
      return true;
    });
    const time = computed(() => {
      const date = new Date(props.timestamp);
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const language = navigator.language;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (date.toDateString() === now.toDateString()) {
        return new Intl.DateTimeFormat(language, {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
          timeZone
        }).format(date);
      } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        return new Intl.DateTimeFormat(language, {
          hour12: false,
          day: "numeric",
          month: "short",
          timeZone
        }).format(date);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        "sender" in props.message ? (openBlock(), createElementBlock("div", _hoisted_1$9, [
          createBaseVNode("div", _hoisted_2$8, [
            createBaseVNode("div", _hoisted_3$7, [
              createBaseVNode("img", {
                src: unref(provided).avatar_asset_url
              }, null, 8, _hoisted_4$6)
            ])
          ]),
          unref(showTime) ? (openBlock(), createElementBlock("div", _hoisted_5$6, [
            createBaseVNode("time", _hoisted_6$6, toDisplayString(unref(time)), 1)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_7$5, [
            createBaseVNode("p", null, toDisplayString(props.message.user_language_text), 1),
            props.message.source_links && props.message.source_links.length > 0 ? (openBlock(), createElementBlock("p", _hoisted_8$4, [
              createTextVNode(" See "),
              createBaseVNode("a", {
                href: props.message.source_links[0],
                style: normalizeStyle({ color: unref(provided).mainColor }),
                target: "_blank"
              }, "here", 12, _hoisted_9$3),
              createTextVNode(" for more information. ")
            ])) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        "text" in props.message ? (openBlock(), createElementBlock("div", _hoisted_10$2, [
          unref(showTime) ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
            createBaseVNode("time", _hoisted_12$1, toDisplayString(unref(time)), 1)
          ])) : createCommentVNode("", true),
          createBaseVNode("p", {
            class: normalizeClass(["rounded-l-lg rounded-tr-lg px-5 leading-[24px] py-4 ml-5 !break-words max-w-[316px]", unref(provided).textClass]),
            style: normalizeStyle(unref(provided).style)
          }, toDisplayString(props.message.text), 7)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$8 = { class: "h-full bg-transparent w-full h-max py-2 pr-4" };
const _hoisted_2$7 = ["placeholder"];
const _hoisted_3$6 = ["disabled"];
const _hoisted_4$5 = { class: "w-6 h-6" };
const _hoisted_5$5 = ["fill"];
const _hoisted_6$5 = /* @__PURE__ */ createBaseVNode("path", { d: "m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L6.69 15H18v2H6.69L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78Z" }, null, -1);
const _hoisted_7$4 = [
  _hoisted_6$5
];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ChatInput",
  props: {
    isLoading: { type: Boolean }
  },
  emits: ["send"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const messageInput = ref("");
    const provided = inject(appearance);
    const { textarea } = useTextareaAutosize({ input: messageInput });
    function maybeSend() {
      if (!messageInput.value || messageInput.value.trim() === "" || props.isLoading)
        return;
      emit2("send", messageInput.value);
      messageInput.value = "";
      nextTick(() => {
        textarea.value.style.height = "1px";
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("form", {
          class: "flex items-center",
          onSubmit: _cache[2] || (_cache[2] = withModifiers(($event) => maybeSend(), ["prevent"]))
        }, [
          withDirectives(createBaseVNode("textarea", {
            ref_key: "textarea",
            ref: textarea,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => messageInput.value = $event),
            class: "textarea w-full resize-none focus:outline-none focus:shadow-outline line-3 border-none bg-transparent text-[16px] !leading-[24px] max-h-[144px] align-middle !px-[16px] !py-[8px] min-h-[48px]",
            type: "text",
            placeholder: unref(provided).message_placeholder,
            onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => maybeSend(), ["prevent"]), ["enter"]))
          }, null, 40, _hoisted_2$7), [
            [vModelText, messageInput.value]
          ]),
          createBaseVNode("button", {
            class: "btn btn-ghost hover:!border-none focus:!border-none btn-sm btn-square",
            type: "submit",
            disabled: __props.isLoading
          }, [
            createBaseVNode("div", _hoisted_4$5, [
              (openBlock(), createElementBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: unref(provided).mainColor,
                viewBox: "0 0 32 32"
              }, _hoisted_7$4, 8, _hoisted_5$5))
            ])
          ], 8, _hoisted_3$6)
        ], 32)
      ]);
    };
  }
});
const _hoisted_1$7 = { class: "overlay h-full text-white rounded-t-md" };
const _hoisted_2$6 = { class: "my-auto w-full flex items-center border-b h-16" };
const _hoisted_3$5 = /* @__PURE__ */ createBaseVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-6 h-6",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    fill: "currentColor",
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12l4.58-4.59z"
  })
], -1);
const _hoisted_4$4 = [
  _hoisted_3$5
];
const _hoisted_5$4 = { class: "flex flex-col p-4" };
const _hoisted_6$4 = ["onClick"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ChatLanguage",
  emits: ["setLanguage", "close"],
  setup(__props, { emit: emit2 }) {
    const provided = inject(appearance);
    return (_ctx, _cache) => {
      var _a2;
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", _hoisted_2$6, [
          createBaseVNode("button", {
            class: normalizeClass(["btn btn-ghost btn-square btn-sm ml-3", unref(provided).textClass]),
            "aria-label": "close language settings",
            onClick: _cache[0] || (_cache[0] = ($event) => emit2("close"))
          }, _hoisted_4$4, 2)
        ]),
        createBaseVNode("div", _hoisted_5$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList((_a2 = unref(provided)) == null ? void 0 : _a2.text, ({ language }) => {
            return openBlock(), createElementBlock("button", {
              key: language,
              class: normalizeClass(["btn btn-ghost w-full justify-start capitalize h-[48px] text-[14px]", { "btn-active": language === unref(provided).language }]),
              onClick: ($event) => emit2("setLanguage", language)
            }, toDisplayString(language), 11, _hoisted_6$4);
          }), 128))
        ])
      ]);
    };
  }
});
const _hoisted_1$6 = { class: "overlay h-max text-white rounded-t-md" };
const _hoisted_2$5 = { class: "my-auto w-full flex items-center border-b text-center h-16 relative" };
const _hoisted_3$4 = { class: "absolute left-0 bottom-0 h-full flex flex-col" };
const _hoisted_4$3 = /* @__PURE__ */ createBaseVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-6 h-6",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    fill: "currentColor",
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12l4.58-4.59z"
  })
], -1);
const _hoisted_5$3 = [
  _hoisted_4$3
];
const _hoisted_6$3 = { class: "w-full" };
const _hoisted_7$3 = { class: "flex flex-col p-4 mb-3" };
const _hoisted_8$3 = /* @__PURE__ */ createBaseVNode("span", null, [
  /* @__PURE__ */ createBaseVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5 mr-4",
    viewBox: "0 0 512 512"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      fill: "currentColor",
      d: "m478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4ZM334.83 362L368 281.65L401.17 362Zm-66.99-19.08a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9Z"
    })
  ])
], -1);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ChatSettings",
  emits: ["openLanguage", "toggleSound", "close"],
  setup(__props, { emit: emit2 }) {
    const provided = inject(appearance);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$5, [
          createBaseVNode("div", _hoisted_3$4, [
            createBaseVNode("button", {
              class: normalizeClass(["my-auto btn btn-ghost btn-square btn-sm ml-3", unref(provided).textClass]),
              "aria-label": "close language settings",
              onClick: _cache[0] || (_cache[0] = ($event) => emit2("close"))
            }, _hoisted_5$3, 2)
          ]),
          createBaseVNode("p", _hoisted_6$3, toDisplayString(unref(provided).translation.settings), 1)
        ]),
        createBaseVNode("div", _hoisted_7$3, [
          createBaseVNode("button", {
            class: "btn btn-ghost w-full justify-start capitalize h-[48px] text-[14px]",
            "aria-label": "change assistant language",
            onClick: _cache[1] || (_cache[1] = ($event) => emit2("openLanguage"))
          }, [
            _hoisted_8$3,
            createTextVNode(" " + toDisplayString(unref(provided).translation.language), 1)
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$5 = /* @__PURE__ */ createBaseVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-8 h-8 mx-auto my-auto",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    d: "M20 2H4c-1.103 0-2 .894-2 1.992v12.016C2 17.106 2.897 18 4 18h3v4l6.351-4H20c1.103 0 2-.894 2-1.992V3.992A1.998 1.998 0 0 0 20 2z",
    fill: "currentColor"
  })
], -1);
const _hoisted_2$4 = [
  _hoisted_1$5
];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "WidgetButton.ce",
  props: {
    isOpen: { type: Boolean, default: true }
  },
  emits: ["toggle"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const provided = inject(appearance);
    const cssClasses = computed(() => {
      const classes = [];
      provided.value.chat_button_style === "round" ? classes.push("rounded-full") : classes.push("rounded-md");
      return classes;
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("button", {
        "aria-label": "open shopping assistant chat",
        class: normalizeClass(["flex w-16 h-16 rounded-full cursor-pointer hover:scale-105 duration-200 shadow-xl transition-all z-[2147483647]", [...unref(cssClasses), unref(provided).textClass]]),
        style: normalizeStyle(unref(provided).style),
        onClick: _cache[0] || (_cache[0] = ($event) => emit2("toggle"))
      }, _hoisted_2$4, 6)), [
        [vShow, !props.isOpen]
      ]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = {};
const _hoisted_1$4 = {
  id: "Layer_2",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 107.37 28.44"
};
const _hoisted_2$3 = /* @__PURE__ */ createStaticVNode('<g id="Layer_1-2"><g><path fill="#304a5e" d="M18.6,14.1v7.57c0,.08-.02,.19-.05,.32-.03,.13-.19,.19-.46,.19h-.41c-.08,0-.2-.02-.33-.05s-.21-.19-.21-.46v-7.61c0-.76-.13-1.48-.38-2.17-.25-.69-.68-1.2-1.28-1.55-.6-.35-1.23-.52-1.89-.52s-1.29,.15-1.84,.46c-.55,.31-.98,.78-1.28,1.41s-.46,1.43-.46,2.38v7.61c0,.19-.04,.32-.13,.4-.08,.07-.22,.11-.41,.11h-.38c-.08,0-.2-.02-.33-.05-.14-.03-.21-.19-.21-.46v-7.61c0-.76-.13-1.48-.38-2.17s-.68-1.2-1.28-1.55c-.6-.35-1.23-.52-1.89-.52-.42,0-.91,.1-1.47,.3-.56,.2-1.05,.63-1.46,1.28s-.62,1.54-.62,2.66v7.61c0,.19-.04,.32-.13,.4-.08,.07-.22,.11-.41,.11h-.38c-.08,0-.2-.02-.33-.05-.14-.03-.21-.19-.21-.46v-7.57c0-1.04,.14-1.92,.43-2.65s.67-1.31,1.16-1.74c.49-.43,1.02-.73,1.62-.9,.59-.17,1.16-.25,1.71-.25,.68,0,1.33,.12,1.95,.36,.62,.24,1.14,.61,1.54,1.09,.4,.49,.7,.98,.89,1.49,.19-.51,.49-1,.89-1.47,.4-.48,.92-.84,1.55-1.09,.63-.25,1.3-.38,2-.38,.55,0,1.11,.08,1.7,.25,.58,.17,1.11,.47,1.6,.9,.49,.43,.87,1.01,1.16,1.74s.43,1.61,.43,2.65Z"></path><path fill="#304a5e" d="M35.91,15.56c0,.74-.11,1.51-.33,2.31-.22,.8-.64,1.58-1.25,2.35s-1.41,1.33-2.38,1.71c-.97,.38-1.96,.57-2.98,.57s-1.99-.17-2.85-.51c-.87-.34-1.61-.81-2.22-1.43s-1.08-1.35-1.39-2.2c-.32-.86-.48-1.79-.48-2.8s.16-1.92,.49-2.79c.33-.87,.79-1.62,1.39-2.25,.6-.63,1.34-1.12,2.2-1.46,.87-.34,1.82-.51,2.85-.51,2.07,0,3.74,.66,5.02,1.96,1.28,1.31,1.92,2.99,1.92,5.04Zm-1.49,.03c0-1.71-.5-3.1-1.49-4.17-.99-1.07-2.31-1.6-3.96-1.6s-3.03,.53-4.01,1.6c-.98,1.07-1.47,2.46-1.47,4.17s.49,3.05,1.47,4.09,2.32,1.55,4.01,1.55c.61,0,1.24-.09,1.87-.27,.63-.18,1.21-.49,1.74-.93,.53-.44,.97-1.04,1.31-1.77,.35-.74,.52-1.63,.52-2.66Z"></path><path fill="#304a5e" d="M49.22,21.68v-6.75c0-1.63-.36-2.88-1.09-3.76-.73-.88-1.78-1.31-3.15-1.31s-2.45,.44-3.17,1.31c-.72,.88-1.08,2.13-1.08,3.76v6.75c0,.08-.02,.19-.05,.32-.03,.13-.2,.19-.49,.19h-.38c-.08,0-.2-.02-.33-.05-.14-.03-.21-.19-.21-.46v-6.69c0-2.09,.49-3.69,1.47-4.79,.98-1.1,2.39-1.65,4.23-1.65s3.25,.55,4.23,1.65c.98,1.1,1.47,2.69,1.47,4.79v6.69c0,.08-.02,.19-.05,.32-.03,.13-.19,.19-.46,.19h-.41c-.08,0-.2-.02-.33-.05s-.21-.19-.21-.46Z"></path><path fill="#304a5e" d="M67.95,15.56c0,.74-.11,1.51-.33,2.31-.22,.8-.64,1.58-1.25,2.35s-1.41,1.33-2.38,1.71c-.97,.38-1.96,.57-2.98,.57s-1.99-.17-2.85-.51c-.87-.34-1.61-.81-2.22-1.43s-1.08-1.35-1.39-2.2c-.32-.86-.48-1.79-.48-2.8s.16-1.92,.49-2.79c.33-.87,.79-1.62,1.39-2.25,.6-.63,1.34-1.12,2.2-1.46,.87-.34,1.82-.51,2.85-.51,2.07,0,3.74,.66,5.02,1.96,1.28,1.31,1.92,2.99,1.92,5.04Zm-1.49,.03c0-1.71-.5-3.1-1.49-4.17-.99-1.07-2.31-1.6-3.96-1.6s-3.03,.53-4.01,1.6c-.98,1.07-1.47,2.46-1.47,4.17s.49,3.05,1.47,4.09,2.32,1.55,4.01,1.55c.61,0,1.24-.09,1.87-.27,.63-.18,1.21-.49,1.74-.93,.53-.44,.97-1.04,1.31-1.77,.35-.74,.52-1.63,.52-2.66Z"></path><path fill="#304a5e" d="M71.4,19.3V.54c0-.08,.02-.2,.05-.33,.03-.14,.19-.21,.49-.21h.38c.08,0,.19,.02,.33,.05,.14,.03,.21,.2,.21,.49V19.17c0,.66,.08,1.15,.25,1.47,.17,.33,.46,.49,.89,.49,.25,0,.56-.05,.92-.16,.11-.02,.18-.01,.24,.03,.05,.04,.08,.14,.08,.29v.44c0,.23-.13,.4-.38,.51-.38,.11-.75,.16-1.11,.16-.89,0-1.5-.25-1.84-.74-.34-.5-.51-1.28-.51-2.36Z"></path><path fill="#304a5e" d="M90.83,15.56c0,.74-.11,1.51-.33,2.31-.22,.8-.64,1.58-1.25,2.35s-1.41,1.33-2.38,1.71c-.97,.38-1.96,.57-2.98,.57s-1.99-.17-2.85-.51c-.87-.34-1.61-.81-2.22-1.43s-1.08-1.35-1.39-2.2c-.32-.86-.48-1.79-.48-2.8s.16-1.92,.49-2.79c.33-.87,.79-1.62,1.39-2.25,.6-.63,1.34-1.12,2.2-1.46,.87-.34,1.82-.51,2.85-.51,2.07,0,3.74,.66,5.02,1.96,1.28,1.31,1.92,2.99,1.92,5.04Zm-1.49,.03c0-1.71-.5-3.1-1.49-4.17-.99-1.07-2.31-1.6-3.96-1.6s-3.03,.53-4.01,1.6c-.98,1.07-1.47,2.46-1.47,4.17s.49,3.05,1.47,4.09,2.32,1.55,4.01,1.55c.61,0,1.24-.09,1.87-.27,.63-.18,1.21-.49,1.74-.93,.53-.44,.97-1.04,1.31-1.77,.35-.74,.52-1.63,.52-2.66Z"></path><path fill="currentColor" d="M107.37,15.56v12.11c0,.08-.02,.2-.06,.33-.04,.14-.2,.21-.48,.21h-.35c-.21,0-.35-.04-.43-.13-.07-.08-.11-.22-.11-.41v-8.33c-.53,.99-1.28,1.77-2.27,2.33s-2.12,.84-3.41,.84c-2.03,0-3.66-.65-4.9-1.95-1.24-1.3-1.85-2.97-1.85-5.02,0-1.01,.16-1.95,.49-2.82,.33-.87,.79-1.61,1.39-2.23,.6-.62,1.33-1.1,2.19-1.43,.86-.33,1.78-.49,2.77-.49,2.09,0,3.78,.65,5.07,1.93,1.29,1.29,1.93,2.98,1.93,5.07Zm-1.49-.03c0-.8-.11-1.51-.33-2.12-.22-.61-.51-1.16-.87-1.65-.36-.49-.9-.93-1.63-1.33-.73-.4-1.61-.6-2.65-.6-.61,0-1.24,.09-1.87,.29-.63,.19-1.21,.52-1.73,.98-.52,.46-.95,1.07-1.28,1.81-.34,.74-.51,1.62-.51,2.63,0,.59,.08,1.21,.24,1.85,.16,.64,.44,1.25,.84,1.81,.4,.56,.96,1.04,1.66,1.44s1.58,.6,2.61,.6,2-.24,2.88-.73c.89-.49,1.55-1.19,1.98-2.11,.43-.92,.65-1.87,.65-2.87Z"></path></g></g>', 1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_3$3);
}
const MonoloqLogo = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
const _hoisted_1$3 = { class: "lds-ellipsis" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Loader",
  setup(__props) {
    const provided = inject(appearance);
    const style = computed(() => ({
      backgroundColor: provided.value.mainColor
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", {
          style: normalizeStyle(unref(style))
        }, null, 4),
        createBaseVNode("div", {
          style: normalizeStyle(unref(style))
        }, null, 4),
        createBaseVNode("div", {
          style: normalizeStyle(unref(style))
        }, null, 4),
        createBaseVNode("div", {
          style: normalizeStyle(unref(style))
        }, null, 4)
      ]);
    };
  }
});
const _hoisted_1$2 = /* @__PURE__ */ createBaseVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1);
const _hoisted_2$2 = [
  _hoisted_1$2
];
const _hoisted_3$2 = { class: "w-full h-[510px] carousel carousel-center p-4 space-x-4 my-auto" };
const _hoisted_4$2 = ["id", "onClick"];
const _hoisted_5$2 = { class: "card w-full h-full stuff backdrop-blur-sm card-compact !bg-black/60 group" };
const _hoisted_6$2 = ["src"];
const _hoisted_7$2 = { class: "card-body text-white text-center flex flex-col" };
const _hoisted_8$2 = { class: "mt-4" };
const _hoisted_9$2 = { class: "text-xl font-bold text-opacity-60 group-hover:text-opacity-100 transition-all duration-200 !line-clamp-1" };
const _hoisted_10$1 = { class: "text-base text-white/40 !line-clamp-6" };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_12 = { class: "text-lg flex-none" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ChatProducts",
  props: {
    products: null,
    scrollTo: null
  },
  emits: ["closeProducts", "close", "navigate"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const provided = inject(appearance);
    const chatProducts = ref();
    onMounted(async () => {
      var _a2;
      if (!props.scrollTo)
        return;
      const el = (_a2 = chatProducts.value) == null ? void 0 : _a2.querySelector(`#monoloq-${props.scrollTo}`);
      if (!el)
        return;
      await new Promise((resolve2) => setTimeout(resolve2, 310));
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: "chatProducts",
        ref_key: "chatProducts",
        ref: chatProducts,
        class: "overlay h-full flex"
      }, [
        createBaseVNode("button", {
          class: "btn btn-circle btn-ghost hover:!border-none focus:!border-none btn-sm absolute top-3 right-3 z-50 bg-black/60 text-back",
          "aria-label": "close recommendations",
          onClick: _cache[0] || (_cache[0] = ($event) => emit2("closeProducts"))
        }, _hoisted_2$2),
        createBaseVNode("div", _hoisted_3$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.products, (product) => {
            var _a2, _b;
            return openBlock(), createElementBlock("div", {
              id: `monoloq-${product.item_id}`,
              key: product.item_id,
              class: "carousel-item h-full w-11/12 cursor-pointer",
              onClick: ($event) => emit2("navigate", product.url, product.item_id)
            }, [
              createBaseVNode("div", _hoisted_5$2, [
                createBaseVNode("figure", null, [
                  createBaseVNode("img", {
                    src: (_b = (_a2 = product.images) == null ? void 0 : _a2[product.match_image_idx || 0]) == null ? void 0 : _b.url
                  }, null, 8, _hoisted_6$2)
                ]),
                createBaseVNode("div", _hoisted_7$2, [
                  createBaseVNode("div", _hoisted_8$2, [
                    createBaseVNode("p", _hoisted_9$2, toDisplayString(`${product.title}`), 1)
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", _hoisted_10$1, toDisplayString(product.description), 1)
                  ]),
                  _hoisted_11,
                  createBaseVNode("p", _hoisted_12, toDisplayString(`${unref(provided).currency_symbol}${product.price}`), 1)
                ])
              ])
            ], 8, _hoisted_4$2);
          }), 128))
        ])
      ], 512);
    };
  }
});
const _hoisted_1$1 = { class: "w-full h-max carousel carousel-center px-4 pt-0 pb-3 space-x-4 my-auto relative pl-5" };
const _hoisted_2$1 = ["onClick"];
const _hoisted_3$1 = { class: "flex flex-col text-left flex-1 mt-3" };
const _hoisted_4$1 = { class: "text-sm font-bold line-clamp-3 mr-2" };
const _hoisted_5$1 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_6$1 = { class: "text-md text-neutral/70 mb-4" };
const _hoisted_7$1 = { class: "flex justify-start" };
const _hoisted_8$1 = ["onClick"];
const _hoisted_9$1 = { class: "grid place-items-center" };
const _hoisted_10 = ["src"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MiniPreview",
  props: {
    products: null
  },
  emits: ["scrollTo", "navigate"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const provided = inject(appearance);
    const hideShadow = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.products, (product) => {
          var _a2, _b;
          return openBlock(), createElementBlock("div", {
            key: product.item_id,
            class: "carousel-item w-[284px] cursor-pointer min-h-[160px]",
            onClick: ($event) => emit2("navigate", product.url, product.item_id)
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["w-full h-full flex rounded-lg px-3 py-2 text-center duration-200 bg-[#DDE2EB] transition-all", { recommendation: !hideShadow.value }])
            }, [
              createBaseVNode("div", _hoisted_3$1, [
                createBaseVNode("h2", _hoisted_4$1, toDisplayString(`${product.title}`), 1),
                _hoisted_5$1,
                createBaseVNode("p", _hoisted_6$1, toDisplayString(`${unref(provided).currency_symbol}${product.price}`), 1),
                createBaseVNode("div", _hoisted_7$1, [
                  createBaseVNode("button", {
                    class: normalizeClass(["btn btn-xs hover:opacity-80 text-[12px] px-[8px] h-[24px] capitalize border-none btn-primary", unref(provided).textClass]),
                    style: normalizeStyle({ backgroundColor: unref(provided).mainColor }),
                    onClick: withModifiers(($event) => emit2("scrollTo", product.item_id), ["stop"]),
                    onMouseenter: _cache[0] || (_cache[0] = ($event) => hideShadow.value = true),
                    onMouseleave: _cache[1] || (_cache[1] = ($event) => hideShadow.value = false)
                  }, " Preview ", 46, _hoisted_8$1)
                ])
              ]),
              createBaseVNode("figure", _hoisted_9$1, [
                createBaseVNode("img", {
                  src: (_b = (_a2 = product.images) == null ? void 0 : _a2[product.match_image_idx || 0]) == null ? void 0 : _b.url,
                  class: "max-w-[144px] max-h-[144px] my-auto rounded-md"
                }, null, 8, _hoisted_10)
              ])
            ], 2)
          ], 8, _hoisted_2$1);
        }), 128))
      ]);
    };
  }
});
const useTextClass = (backgroundColor, cutoff = 160) => {
  const brightness = ref(0);
  const textClass = ref("text-black");
  const styleType = ref("backgroundColor");
  const mainColor = ref(unref(backgroundColor));
  const style = ref();
  watch(
    () => unref(backgroundColor),
    (bgColor) => {
      var _a2;
      mainColor.value = ((_a2 = bgColor == null ? void 0 : bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)) == null ? void 0 : _a2[0]) || bgColor;
      style.value = { background: bgColor };
      if (!bgColor) {
        textClass.value = "text-black";
        brightness.value = 0;
        return;
      }
      const hex = bgColor.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      brightness.value = (r * 299 + g * 587 + b * 114) / 1e3;
      if (brightness.value > cutoff)
        return textClass.value = "text-black";
      textClass.value = "text-white";
    },
    { immediate: true }
  );
  return {
    textClass: unref(textClass),
    brightness: unref(brightness),
    styleType: unref(styleType),
    style: unref(style),
    mainColor: unref(mainColor)
  };
};
const translations = {
  af: {
    settings: "Instellings",
    language: "Taal",
    sound: "Klank"
  },
  am: {
    settings: "ቅንብሮች",
    language: "ቋንቋ",
    sound: "ድምፅ"
  },
  ar: {
    settings: "الإعدادات",
    language: "اللغة",
    sound: "الصوت"
  },
  hy: {
    settings: "Կարգավորումներ",
    language: "Լեզու",
    sound: "Ձայն"
  },
  az: {
    settings: "Ayarlar",
    language: "Dil",
    sound: "Səs"
  },
  bn: {
    settings: "সেটিংস",
    language: "ভাষা",
    sound: "শব্দ"
  },
  bs: {
    settings: "Postavke",
    language: "Jezik",
    sound: "Zvuk"
  },
  bg: {
    settings: "Настройки",
    language: "Език",
    sound: "Звук"
  },
  ca: {
    settings: "Configuració",
    language: "Llengua",
    sound: "So"
  },
  sq: {
    settings: "Parametrat",
    language: "Gjuha",
    sound: "Tinguj"
  },
  hr: {
    settings: "Postavke",
    language: "Jezik",
    sound: "Zvuk"
  },
  cs: {
    settings: "Nastavení",
    language: "Jazyk",
    sound: "Zvuk"
  },
  da: {
    settings: "Indstillinger",
    language: "Sprog",
    sound: "Lyd"
  },
  nl: {
    settings: "Instellingen",
    language: "Taal",
    sound: "Geluid"
  },
  en: {
    settings: "Settings",
    language: "Language",
    sound: "Sound"
  },
  et: {
    settings: "Seaded",
    language: "Keel",
    sound: "Heli"
  },
  fi: {
    settings: "Asetukset",
    language: "Kieli",
    sound: "Ääni"
  },
  fr: {
    settings: "Paramètres",
    language: "Langue",
    sound: "Son"
  },
  ka: {
    settings: "პარამეტრები",
    language: "ენა",
    sound: "ხმა"
  },
  de: {
    settings: "Einstellungen",
    language: "Sprache",
    sound: "Ton"
  },
  el: {
    settings: "Ρυθμίσεις",
    language: "Γλώσσα",
    sound: "Ήχος"
  },
  gu: {
    settings: "સેટિંગ્સ",
    language: "ભાષા",
    sound: "ધ્વનિ"
  },
  ha: {
    settings: "Saitin",
    language: "Yaren",
    sound: "Hoto"
  },
  he: {
    settings: "הגדרות",
    language: "שפה",
    sound: "צליל"
  },
  hi: {
    settings: "सेटिंग्स",
    language: "भाषा",
    sound: "ध्वनि"
  },
  hu: {
    settings: "Beállítások",
    language: "Nyelv",
    sound: "Hang"
  },
  is: {
    settings: "Stillingar",
    language: "Tungumál",
    sound: "Hljóð"
  },
  id: {
    settings: "Pengaturan",
    language: "Bahasa",
    sound: "Suara"
  },
  ga: {
    settings: "Socruithe",
    language: "Teanga",
    sound: "Fuaim"
  },
  it: {
    settings: "Impostazioni",
    language: "Lingua",
    sound: "Audio"
  },
  ja: {
    settings: "設定",
    language: "言語",
    sound: "音声"
  },
  kn: {
    settings: "ಸೆಟ್ಟಿಂಗ್ಗಳು",
    language: "ಭಾಷೆ",
    sound: "ಶಬ್ದ"
  },
  kk: {
    settings: "Баптаулар",
    language: "Тіл",
    sound: "Дыбыс"
  },
  ko: {
    settings: "설정",
    language: "언어",
    sound: "소리"
  },
  lv: {
    settings: "Iestatījumi",
    language: "Valoda",
    sound: "Skaņa"
  },
  lt: {
    settings: "Nustatymai",
    language: "Kalba",
    sound: "Garsas"
  },
  mk: {
    settings: "Поставки",
    language: "Јазик",
    sound: "Звук"
  },
  ms: {
    settings: "Tetapan",
    language: "Bahasa",
    sound: "Bunyi"
  },
  ml: {
    settings: "ക്രമീകരണങ്ങൾ",
    language: "ഭാഷ",
    sound: "ശബ്ദം"
  },
  mt: {
    settings: "Settings",
    language: "Lingwa",
    sound: "Ħoss"
  },
  mr: {
    settings: "सेटिंग्ज",
    language: "भाषा",
    sound: "आवाज"
  },
  mn: {
    settings: "Тохиргоо",
    language: "Хэл",
    sound: "Дуу"
  },
  ps: {
    settings: "تنظیمات",
    language: "ژبه",
    sound: "غږ"
  },
  pl: {
    settings: "Ustawienia",
    language: "Język",
    sound: "Dźwięk"
  },
  pa: {
    settings: "ਸੈਟਿੰਗ",
    language: "ਭਾਸ਼ਾ",
    sound: "ਆਵਾਜ਼"
  },
  ro: {
    settings: "Setări",
    language: "Limbă",
    sound: "Sunet"
  },
  ru: {
    settings: "Настройки",
    language: "Язык",
    sound: "Звук"
  },
  sr: {
    settings: "Подешавања",
    language: "Језик",
    sound: "Звук"
  },
  si: {
    settings: "සැකසුම්",
    language: "භාෂාව",
    sound: "ශබ්දය"
  },
  sk: {
    settings: "Nastavenia",
    language: "Jazyk",
    sound: "Zvuk"
  },
  sl: {
    settings: "Nastavitve",
    language: "Jezik",
    sound: "Zvok"
  },
  so: {
    settings: "Dejinta",
    language: "Luqadda",
    sound: "Dhagayso"
  },
  es: {
    settings: "Ajustes",
    language: "Idioma",
    sound: "Sonido"
  },
  sw: {
    settings: "Mipangilio",
    language: "Lugha",
    sound: "Sauti"
  },
  sv: {
    settings: "Inställningar",
    language: "Språk",
    sound: "Ljud"
  },
  ta: {
    settings: "அமைப்புகள்",
    language: "மொழி",
    sound: "ஒலி"
  },
  te: {
    settings: "సెట్టింగులు",
    language: "భాష",
    sound: "శబ్దం"
  },
  th: {
    settings: "การตั้งค่า",
    language: "ภาษา",
    sound: "เสียง"
  },
  tr: {
    settings: "Ayarlar",
    language: "Dil",
    sound: "Ses"
  },
  uk: {
    settings: "Налаштування",
    language: "Мова",
    sound: "Звук"
  },
  ur: {
    settings: "ترتیبات",
    language: "زبان",
    sound: "آواز"
  },
  uz: {
    settings: "Sozlamalar",
    language: "Til",
    sound: "Tovush"
  },
  vi: {
    settings: "Cài đặt",
    language: "Ngôn ngữ",
    sound: "Âm thanh"
  },
  cy: {
    settings: "Gosodiadau",
    language: "Iaith",
    sound: "Sain"
  }
};
const getTranslations = (lang) => translations[lang] || translations.en;
const _hoisted_1 = {
  key: 1,
  class: "absolute w-full"
};
const _hoisted_2 = {
  key: 1,
  class: "absolute w-full"
};
const _hoisted_3 = { class: "relative flex flex-col h-[630px] max-h-[630px] flex-1" };
const _hoisted_4 = {
  key: 1,
  class: "absolute w-full"
};
const _hoisted_5 = {
  key: 0,
  class: "relative flex flex-col pt-3"
};
const _hoisted_6 = { class: "text-center bg-transparent text-xs py-2 flex flex-col justify-center items-center border-b-2 flex-none" };
const _hoisted_7 = {
  href: "https://www.monoloq.ai/",
  target: "_blank",
  class: "flex items-center hover:text-neutral text-neutral"
};
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "mr-2" }, " Powered by ", -1);
const _hoisted_9 = {
  key: 1,
  class: "bottom-0 right-0 w-[372px]"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChatWidget.ce",
  props: {
    base_color: { default: "#4fafe4" },
    avatar_asset_url: { default: "https://cdn.jsdelivr.net/gh/paraloq/chat_widget/umd/stock-avatar.jpeg" },
    logo_asset_url: { default: "https://d1xecltoymgutn.cloudfront.net/monoloq-assets/Asset%2014@4x.png" },
    text: { default: () => [{
      message_placeholder: "Type your message here...",
      language: "en"
    }] },
    chat_button_style: { default: "round" },
    chat_button_label: { type: Boolean, default: false },
    chat_button_text: null,
    chat_button_color: null,
    chat_button_position: { default: "bottom_right" },
    currency_symbol: { default: "$" },
    enable_on_mobile: { type: Boolean, default: false },
    enable_sound: { type: Boolean, default: false },
    show_button_widget: { type: Boolean, default: true },
    fixed: { type: Boolean, default: true },
    host_domain: null,
    language: null,
    _mockLoading: { type: Boolean, default: false },
    _mockMessage: null,
    _isOpen: { type: Boolean, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const currentLanguage = useStorage("monoloqLanguage", "en");
    const provided = computed(() => {
      var _a2;
      const textSettings = ((_a2 = props.text) == null ? void 0 : _a2.find((t) => t.language === currentLanguage.value)) || props.text[0];
      const translation = getTranslations(currentLanguage.value);
      return {
        ...props,
        ...useTextClass(props.base_color),
        ...textSettings,
        translation,
        // isSoundEnabled,
        currentLanguage: currentLanguage.value
      };
    });
    provide(appearance, provided);
    const positionCss = computed(() => {
      const classes = ["bottom-1 "];
      props.chat_button_position === "bottom_right" ? classes.push("right-1 sm:right-5") : classes.push("left-1 sm:left-5");
      props.fixed ? classes.push("fixed sm:ml-0 sm:bottom-5") : classes.push("absolute");
      props.enable_on_mobile ? classes.push("") : classes.push("hidden sm:flex");
      return classes;
    });
    const IS_DEV = false;
    const retries = ref(0);
    const conversationId = useStorage("monoloqConversationId", "");
    const addWww = useStorage("monoloqAddWww", false);
    const messages = useStorage("monoloqChatBotMessages", []);
    const visited = useStorage("monoloqVisited", /* @__PURE__ */ new Set());
    const isSettingOpen = useStorage("monoloqSettingsOpen", false);
    const products = ref();
    const scrollToItemId = ref();
    const setProducts = async (recommendation, itemId) => {
      isSettingOpen.value = false;
      await new Promise((resolve2) => setTimeout(resolve2, 600));
      products.value = recommendation;
      scrollToItemId.value = itemId;
    };
    const closeProducts = () => {
      products.value = void 0;
      scrollToItemId.value = void 0;
    };
    const refChat = ref();
    const showWidget = ref(true);
    const isLoading = ref(false);
    const isChatOpen = useStorage("monoloqIsChatOpen", false);
    const isLanguageSettingsOpen = useStorage("monoloqLanguageSettingsOpen", false);
    watchEffect(() => {
      if (props._isOpen !== void 0)
        isChatOpen.value = props._isOpen;
    });
    function dateFromISO8601(isoDateString) {
      if (!isoDateString || typeof isoDateString !== "string") {
        throw new Error("Invalid input: expecting a non-empty string.");
      }
      const parts = isoDateString.match(/\d+/g);
      const isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
      const isoDate = new Date(isoTime);
      return isoDate;
    }
    const fetch2 = createFetch({
      baseUrl: "https://9qilmdres7.execute-api.eu-west-1.amazonaws.com/prod",
      fetchOptions: {
        method: "GET"
      },
      options: {
        refetch: false,
        async beforeFetch({ options, cancel, url }) {
          const additionalHeaders = { "x-api-key": "thqMbn962S4Sg2r4U6l6Dzx9DTYk9qP9f4RTAB9j", "Content-Type": "application/json" };
          if (retries.value > 30 || !showWidget.value)
            cancel();
          const newOptions = { ...options, headers: { ...options.headers, ...additionalHeaders } };
          url = addWww.value ? url.replace(/host_domain=/, "host_domain=www.") : url;
          return { options: newOptions, url };
        },
        afterFetch(ctx) {
          ctx.data.timestamp = dateFromISO8601(ctx.data.timestamp);
          return ctx;
        }
      }
    });
    function removeQueries() {
      const url = new URL(window.location.href);
      url.hostname = devHost(provided.value.host_domain);
      url.port = "";
      url.search = "";
      return url.toString();
    }
    async function onSend(inputMessage) {
      isLoading.value = true;
      const date = new Date();
      const message = {
        text: prepareMessage(inputMessage),
        timestamp: date.getTime(),
        conversation_id: conversationId.value,
        current_product_url: removeQueries()
      };
      messages.value.push(message);
      if (!refChat.value)
        return;
      if (!conversationId.value)
        return await initiate();
      const serverResponse = await handleMessage(message);
      const maybeRecommendedProduct = serverResponse == null ? void 0 : serverResponse.recommended_products;
      if (!(maybeRecommendedProduct == null ? void 0 : maybeRecommendedProduct.length))
        return;
      isLoading.value = true;
      await new Promise((resolve2) => setTimeout(resolve2, 1e3));
      isLoading.value = false;
      setProducts(maybeRecommendedProduct);
    }
    const comesFromDomain = computed(() => {
      if (!document.referrer)
        return false;
      const refferer = new URL(document.referrer);
      if (window.location.hostname === "localhost" && IS_DEV)
        return true;
      return refferer.hostname === window.location.hostname;
    });
    function scrollToBottom() {
      if (!refChat.value)
        return;
      const start = refChat.value.scrollTop;
      const end = refChat.value.scrollHeight;
      const distance = end - start;
      let elapsed = 0;
      const duration = 100;
      function animate() {
        elapsed += 16;
        const fraction = Math.min(1, elapsed / duration);
        refChat.value.scrollTop = start + distance * fraction;
        if (fraction < 1)
          requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }
    async function requestAndPush(url, params, fetchOptions = {}) {
      var _a2;
      isLoading.value = true;
      url = `prod${url}`;
      const baseUrl = new URL(url, "https://9qilmdres7.execute-api.eu-west-1.amazonaws.com/prod");
      for (const prop in params)
        baseUrl.searchParams.set(prop, String(params[prop]));
      baseUrl.searchParams.set("host_domain", devHost(provided.value.host_domain));
      const { data: msg, execute, statusCode, response } = await fetch2(baseUrl.toString(), fetchOptions).json();
      let retries2 = 0;
      while (statusCode.value && statusCode.value >= 500 && retries2 < 2) {
        await execute();
        retries2 += 1;
      }
      if (statusCode.value === 404 && retries2 < 1) {
        addWww.value = !addWww.value;
        await execute();
        retries2 += 1;
      }
      let errorMessage;
      if (!((_a2 = response.value) == null ? void 0 : _a2.ok)) {
        let errorMsg = "Hello customer! 🌟 Apologies, but we're facing a small hiccup at the moment. 🚧 Our team is working diligently to resolve the issue. Meanwhile, please enjoy exploring our amazing products. Thank you for your understanding! 😊";
        if (statusCode.value === 429) {
          showWidget.value = false;
          throw new Error("Monoloq limit reached. Too many requests.");
        }
        if (statusCode.value === 403) {
          errorMsg = "Dear customer! 🌟 I'm your AI shopping assistant, currently being trained to serve you better. 🎓 Please bear with me, and in the meantime, enjoy browsing our fantastic products. Thank you for your patience! 😊";
          console.info("Monoloq assistant is currently being created. Please wait!");
        }
        errorMessage = {
          bot_language_text: errorMsg,
          conversation_id: conversationId.value,
          sender: "bot",
          timestamp: new Date().getTime(),
          user_language_text: errorMsg,
          recommended_products: void 0
        };
      }
      isLoading.value = false;
      messages.value.push(errorMessage || msg.value);
      return msg.value;
    }
    async function handleMessage(body) {
      return await requestAndPush(
        "/chat/handle_message",
        void 0,
        { method: "POST", body: JSON.stringify(body) }
      );
    }
    async function initiate() {
      const msg = await requestAndPush(
        "/chat/initiate",
        { language: currentLanguage.value }
      );
      conversationId.value = msg == null ? void 0 : msg.conversation_id;
    }
    async function resume() {
      await requestAndPush("/chat/resume", { conversation_id: conversationId.value });
    }
    async function pitch(product_id) {
      await requestAndPush("/chat/pitch_product", { conversation_id: conversationId.value, product_id });
    }
    watchEffect(() => {
      if (!messages.value.length || !refChat.value)
        return;
      scrollToBottom();
    });
    watchEffect(() => {
      if (props.enable_on_mobile)
        return;
      if (window.matchMedia("only screen and (max-width: 480px)").matches)
        showWidget.value = false;
    });
    async function setLanguage(language) {
      const languages = provided.value.text.map((t) => t.language);
      let docLang;
      try {
        docLang = document.documentElement.lang.slice(0, 2);
      } catch {
        docLang = "en";
      }
      language = language || docLang;
      if (languages.includes(language))
        return currentLanguage.value = language;
      if (languages.includes(docLang))
        return currentLanguage.value = docLang;
    }
    async function setLanguageAndInitiate(language) {
      setLanguage(language);
      isLanguageSettingsOpen.value = false;
      await initiate();
    }
    watch(
      () => props.language,
      (newVal, oldVal) => {
        if (newVal === oldVal)
          return;
        setLanguage(props.language);
      }
    );
    watch(
      () => conversationId.value,
      () => {
        if (!conversationId.value)
          return;
        visited.value.clear();
      }
    );
    watch(
      () => props._mockMessage,
      (mockMessage) => {
        if (!mockMessage)
          return;
        messages.value.push(mockMessage);
      },
      { immediate: true }
    );
    async function connect() {
      var _a2, _b;
      if (window.location.hostname === "localhost" && messages.value.length !== 0)
        return;
      if (messages.value.length === 0)
        return await initiate();
      if (!conversationId.value)
        return await initiate();
      if (!comesFromDomain.value) {
        const isStale = messages.value[messages.value.length - 1].timestamp < new Date().getTime() - 1e3 * 60 * 60 * 8;
        if (isStale)
          return await resume();
      }
      const monoloqItemId = (_b = (_a2 = window.history) == null ? void 0 : _a2.state) == null ? void 0 : _b.monoloqItemId;
      if (monoloqItemId) {
        if (visited.value.has(monoloqItemId))
          return;
        await pitch(monoloqItemId);
        visited.value.add(monoloqItemId);
      }
    }
    connect().then();
    const throttledConnect = useThrottleFn(() => {
      messages.value = [];
      connect();
    }, 3e3);
    const onClear = async () => {
      await throttledConnect();
    };
    const onClose = () => {
      isChatOpen.value = false;
    };
    const onToggle = () => {
      isChatOpen.value = true;
    };
    const openSettings = async (setting) => {
      if (products.value) {
        products.value = void 0;
        await new Promise((resolve2) => setTimeout(resolve2, 600));
      }
      if (setting === "main")
        return isSettingOpen.value = !isSettingOpen.value;
      isSettingOpen.value = false;
      isSettingOpen.value = false;
      await new Promise((resolve2) => setTimeout(resolve2, 600));
      isLanguageSettingsOpen.value = true;
    };
    function navigate(productUrl, itemId) {
      if (isLoading.value)
        return;
      const url = new URL(productUrl);
      history.pushState({ monoloqItemId: itemId }, "", url);
      window.location.assign(url);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(unref(TransitionSlide), { offset: [0, 200] }, {
          default: withCtx(() => [
            unref(isChatOpen) && showWidget.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["!font-sans !text-base text-black flex flex-col m-2 sm:m-0 bg-white rounded-2xl my-auto sm:mr-2 h-full w-full max-h-[694px] max-w-[372px] sm:h-[694px] sm:w-[372px] drop-shadow-2xl overflow-hidden", [...unref(positionCss)]]),
              style: {
                zIndex: 2147483647
              }
            }, [
              createVNode(unref(TransitionExpand), {
                duration: 500,
                delay: 100
              }, {
                default: withCtx(() => [
                  unref(isLanguageSettingsOpen) ? (openBlock(), createBlock(_sfc_main$7, {
                    key: 0,
                    onClose: _cache[0] || (_cache[0] = ($event) => isLanguageSettingsOpen.value = false),
                    onSetLanguage: setLanguageAndInitiate
                  })) : (openBlock(), createElementBlock("div", _hoisted_1))
                ]),
                _: 1
              }),
              createVNode(unref(TransitionExpand), {
                duration: 500,
                delay: 100
              }, {
                default: withCtx(() => [
                  unref(isSettingOpen) ? (openBlock(), createBlock(_sfc_main$6, {
                    key: 0,
                    onClose: _cache[1] || (_cache[1] = ($event) => isSettingOpen.value = false),
                    onOpenLanguage: _cache[2] || (_cache[2] = ($event) => openSettings("language"))
                  })) : (openBlock(), createElementBlock("div", _hoisted_2))
                ]),
                _: 1
              }),
              createVNode(_sfc_main$a, {
                class: "!h-[64px] flex-none",
                onClear: _cache[3] || (_cache[3] = ($event) => onClear()),
                onClose: _cache[4] || (_cache[4] = ($event) => onClose()),
                onOpenSetting: _cache[5] || (_cache[5] = ($event) => openSettings("main"))
              }),
              createBaseVNode("div", _hoisted_3, [
                createVNode(unref(TransitionExpand), { duration: 500 }, {
                  default: withCtx(() => [
                    products.value ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      products: products.value,
                      "scroll-to": scrollToItemId.value,
                      onCloseProducts: _cache[6] || (_cache[6] = ($event) => closeProducts()),
                      onNavigate: navigate
                    }, null, 8, ["products", "scroll-to"])) : (openBlock(), createElementBlock("div", _hoisted_4))
                  ]),
                  _: 1
                }),
                createBaseVNode("div", {
                  ref_key: "refChat",
                  ref: refChat,
                  class: "overflow-y-auto scroll-behavior-smooth px-3 py-3 bg-transparent relative flex-1"
                }, [
                  createVNode(unref(TransitionSlide), {
                    group: "",
                    offset: [0, 16]
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(messages), (message, index) => {
                        return openBlock(), createElementBlock(Fragment, {
                          key: message.timestamp
                        }, [
                          createVNode(_sfc_main$9, {
                            timestamp: message.timestamp,
                            message,
                            "is-first": index === 0,
                            onOpenProducts: setProducts
                          }, null, 8, ["timestamp", "message", "is-first"]),
                          "sender" in message && message.recommended_products ? (openBlock(), createElementBlock("div", _hoisted_5, [
                            createVNode(_sfc_main$1, {
                              products: message.recommended_products,
                              onScrollTo: (itemId) => setProducts(message.recommended_products, itemId),
                              onNavigate: navigate
                            }, null, 8, ["products", "onScrollTo"])
                          ])) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  withDirectives(createVNode(_sfc_main$3, { class: "scale-50 ml-9" }, null, 512), [
                    [vShow, isLoading.value || props._mockLoading]
                  ])
                ], 512),
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("a", _hoisted_7, [
                    _hoisted_8,
                    createVNode(MonoloqLogo, {
                      class: "h-4 my-auto",
                      style: normalizeStyle({ color: unref(provided).mainColor })
                    }, null, 8, ["style"])
                  ])
                ]),
                createVNode(_sfc_main$8, {
                  class: "flex-none",
                  "is-loading": isLoading.value,
                  onSend
                }, null, 8, ["is-loading"])
              ])
            ], 2)) : (openBlock(), createElementBlock("div", _hoisted_9))
          ]),
          _: 1
        }),
        renderSlot(_ctx.$slots, "widgetButton", { toggle: onToggle }, () => [
          props.show_button_widget && showWidget.value ? (openBlock(), createBlock(_sfc_main$5, {
            key: 0,
            class: normalizeClass([...unref(positionCss)]),
            chat_button_position: props.chat_button_position,
            "is-open": unref(isChatOpen),
            onToggle: _cache[7] || (_cache[7] = ($event) => onToggle())
          }, null, 8, ["class", "chat_button_position", "is-open"])) : createCommentVNode("", true)
        ])
      ], 64);
    };
  }
});
const _style_0 = `@import url(https://fonts.googleapis.com/css2?family=Nunito&display=swap);


/*
! tailwindcss v3.2.4 | MIT License | https://tailwindcss.com
*/


/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/
*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}
::before,
::after {
  --tw-content: '';
}


/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
*/
html {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: Nunito; /* 4 */
  font-feature-settings: normal; /* 5 */
}


/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/
body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}


/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/
hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}


/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/
abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}


/*
Remove the default font size and weight for headings.
*/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}


/*
Reset links to optimize for opt-in styling instead of opt-out.
*/
a {
  color: inherit;
  text-decoration: inherit;
}


/*
Add the correct font weight in Edge and Safari.
*/
b,
strong {
  font-weight: bolder;
}


/*
1. Use the user's configured \`mono\` font family by default.
2. Correct the odd \`em\` font sizing in all browsers.
*/
code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-size: 1em; /* 2 */
}


/*
Add the correct font size in all browsers.
*/
small {
  font-size: 80%;
}


/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}


/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/
table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}


/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}


/*
Remove the inheritance of text transform in Edge and Firefox.
*/
button,
select {
  text-transform: none;
}


/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}


/*
Use the modern Firefox focus style for all focusable elements.
*/
:-moz-focusring {
  outline: auto;
}


/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/
:-moz-ui-invalid {
  box-shadow: none;
}


/*
Add the correct vertical alignment in Chrome and Firefox.
*/
progress {
  vertical-align: baseline;
}


/*
Correct the cursor style of increment and decrement buttons in Safari.
*/
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}


/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/
[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}


/*
Remove the inner padding in Chrome and Safari on macOS.
*/
::-webkit-search-decoration {
  -webkit-appearance: none;
}


/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}


/*
Add the correct display in Chrome and Safari.
*/
summary {
  display: list-item;
}


/*
Removes the default spacing and border for appropriate elements.
*/
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}
fieldset {
  margin: 0;
  padding: 0;
}
legend {
  padding: 0;
}
ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}


/*
Prevent resizing textareas horizontally by default.
*/
textarea {
  resize: vertical;
}


/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/
input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}
input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}


/*
Set the default cursor for buttons.
*/
button,
[role="button"] {
  cursor: pointer;
}


/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}


/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}


/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/
img,
video {
  max-width: 100%;
  height: auto;
}


/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}
:root,
[data-theme]{
  background-color: hsla(var(--b1) / var(--tw-bg-opacity, 1));
  color: hsla(var(--bc) / var(--tw-text-opacity, 1));
}
html{
  -webkit-tap-highlight-color: transparent;
}
*, ::before, ::after{
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
::backdrop{
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
.avatar{
  position: relative;
  display: inline-flex;
}
.avatar > div{
  display: block;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}
.avatar img{
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
     object-fit: cover;
}
.avatar.placeholder > div{
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn{
  display: inline-flex;
  flex-shrink: 0;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-color: transparent;
  border-color: hsl(var(--n) / var(--tw-border-opacity));
  text-align: center;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--rounded-btn, 0.5rem);
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 1em;
  min-height: 3rem;
  font-weight: 600;
  text-transform: uppercase;
  text-transform: var(--btn-text-case, uppercase);
  text-decoration-line: none;
  border-width: var(--border-btn, 1px);
  animation: button-pop var(--animation-btn, 0.25s) ease-out;
  --tw-border-opacity: 1;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--n) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--nc) / var(--tw-text-opacity));
}
.btn-disabled,
  .btn[disabled]{
  pointer-events: none;
}
.btn-square{
  height: 3rem;
  width: 3rem;
  padding: 0px;
}
.btn-circle{
  height: 3rem;
  width: 3rem;
  border-radius: 9999px;
  padding: 0px;
}
.btn.loading,
    .btn.loading:hover{
  pointer-events: none;
}
.btn.loading:before{
  margin-right: 0.5rem;
  height: 1rem;
  width: 1rem;
  border-radius: 9999px;
  border-width: 2px;
  animation: spin 2s linear infinite;
  content: "";
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: currentColor;
  border-right-color: currentColor;
}
@media (prefers-reduced-motion: reduce){
.btn.loading:before{
    animation: spin 10s linear infinite;
}
}
@keyframes spin{
from{
    transform: rotate(0deg);
}
to{
    transform: rotate(360deg);
}
}
.btn-group > input[type="radio"].btn{
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.btn-group > input[type="radio"].btn:before{
  content: attr(data-title);
}
.card{
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--rounded-box, 1rem);
}
.card:focus{
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.card-body{
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: var(--padding-card, 2rem);
  gap: 0.5rem;
}
.card-body :where(p){
  flex-grow: 1;
}
.card figure{
  display: flex;
  align-items: center;
  justify-content: center;
}
.card.image-full{
  display: grid;
}
.card.image-full:before{
  position: relative;
  content: "";
  z-index: 10;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--n) / var(--tw-bg-opacity));
  opacity: 0.75;
  border-radius: var(--rounded-box, 1rem);
}
.card.image-full:before,
    .card.image-full > *{
  grid-column-start: 1;
  grid-row-start: 1;
}
.card.image-full > figure img{
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
}
.card.image-full > .card-body{
  position: relative;
  z-index: 20;
  --tw-text-opacity: 1;
  color: hsl(var(--nc) / var(--tw-text-opacity));
}
.carousel{
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.carousel-item{
  box-sizing: content-box;
  display: flex;
  flex: none;
  scroll-snap-align: start;
}
.carousel-center .carousel-item{
  scroll-snap-align: center;
}
.carousel-end .carousel-item{
  scroll-snap-align: end;
}
.chat{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  -moz-column-gap: 0.75rem;
       column-gap: 0.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.chat-image{
  grid-row: span 2 / span 2;
  align-self: flex-end;
}
.chat-header{
  grid-row-start: 1;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.chat-start{
  place-items: start;
  grid-template-columns: auto 1fr;
}
.chat-start .chat-header{
  grid-column-start: 2;
}
.chat-start .chat-footer{
  grid-column-start: 2;
}
.chat-start .chat-image{
  grid-column-start: 1;
}
.chat-start .chat-bubble{
  grid-column-start: 2;
  border-bottom-left-radius: 0px;
}
.chat-start .chat-bubble:before{
  -webkit-mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e");
  mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e");
  left: -0.75rem;
}
[dir="rtl"] .chat-start .chat-bubble:before{
  -webkit-mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e");
  mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e");
}
.chat-end{
  place-items: end;
  grid-template-columns: 1fr auto;
}
.chat-end .chat-header{
  grid-column-start: 1;
}
.chat-end .chat-footer{
  grid-column-start: 1;
}
.chat-end .chat-image{
  grid-column-start: 2;
}
.chat-end .chat-bubble{
  grid-column-start: 1;
  border-bottom-right-radius: 0px;
}
.chat-end .chat-bubble:before{
  -webkit-mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e");
  mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e");
  left: 100%;
}
[dir="rtl"] .chat-end .chat-bubble:before{
  -webkit-mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e");
  mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e");
}
.input{
  flex-shrink: 1;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  line-height: 2;
  line-height: 1.5rem;
  border-width: 1px;
  border-color: hsl(var(--bc) / var(--tw-border-opacity));
  --tw-border-opacity: 0;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  border-radius: var(--rounded-btn, 0.5rem);
}
.input-group > .input{
  isolation: isolate;
}
.input-group > *,
  .input-group > .input,
  .input-group > .select{
  border-radius: 0px;
}
.link{
  cursor: pointer;
  text-decoration-line: underline;
}
.menu > :where(li.disabled > *:not(ul):focus){
  cursor: auto;
}
.steps .step{
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-columns: auto;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-rows: 40px 1fr;
  place-items: center;
  text-align: center;
  min-width: 4rem;
}
.swap{
  position: relative;
  display: inline-grid;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  place-content: center;
  cursor: pointer;
}
.swap > *{
  grid-column-start: 1;
  grid-row-start: 1;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, opacity;
}
.swap input{
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.swap .swap-on,
.swap .swap-indeterminate,
.swap input:indeterminate ~ .swap-on{
  opacity: 0;
}
.swap input:checked ~ .swap-off,
.swap.swap-active .swap-off,
.swap input:indeterminate ~ .swap-off{
  opacity: 0;
}
.swap input:checked ~ .swap-on,
.swap-active .swap-on,
.swap input:indeterminate ~ .swap-indeterminate{
  opacity: 1;
}
.tab{
  position: relative;
  display: inline-flex;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 2;
  --tab-padding: 1rem;
  --tw-text-opacity: 0.5;
  --tab-color: hsla(var(--bc) / var(--tw-text-opacity, 1));
  --tab-bg: hsla(var(--b1) / var(--tw-bg-opacity, 1));
  --tab-border-color: hsla(var(--b3) / var(--tw-bg-opacity, 1));
  color: var(--tab-color);
  padding-left: var(--tab-padding, 1rem);
  padding-right: var(--tab-padding, 1rem);
}
.textarea{
  flex-shrink: 1;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 2;
  min-height: 3rem;
  border-width: 1px;
  border-color: hsl(var(--bc) / var(--tw-border-opacity));
  --tw-border-opacity: 0;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  border-radius: var(--rounded-btn, 0.5rem);
}
.toggle{
  flex-shrink: 0;
  --tglbg: hsl(var(--b1));
  --handleoffset: 1.5rem;
  --handleoffsetcalculator: calc(var(--handleoffset) * -1);
  --togglehandleborder: 0 0;
  height: 1.5rem;
  width: 3rem;
  cursor: pointer;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border-width: 1px;
  border-color: hsl(var(--bc) / var(--tw-border-opacity));
  --tw-border-opacity: 0.2;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.5;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--rounded-badge, 1.9rem);
  transition: background, box-shadow var(--animation-input, 0.2s) ease-in-out;
  box-shadow: var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset, var(--togglehandleborder);
}
.avatar-group :where(.avatar){
  overflow: hidden;
  border-radius: 9999px;
  border-width: 4px;
  --tw-border-opacity: 1;
  border-color: hsl(var(--b1) / var(--tw-border-opacity));
}
.btn-outline.btn-primary .badge{
  --tw-border-opacity: 1;
  border-color: hsl(var(--p) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn-outline.btn-primary .badge-outline{
  --tw-border-opacity: 1;
  border-color: hsl(var(--p) / var(--tw-border-opacity));
  background-color: transparent;
  --tw-text-opacity: 1;
  color: hsl(var(--p) / var(--tw-text-opacity));
}
.btn-outline.btn-primary:hover .badge{
  --tw-border-opacity: 1;
  border-color: hsl(var(--pc) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--pc) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--p) / var(--tw-text-opacity));
}
.btn-outline.btn-primary:hover .badge.outline{
  --tw-border-opacity: 1;
  border-color: hsl(var(--pc) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--pf, var(--p)) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btm-nav>*.disabled,
    .btm-nav>*.disabled:hover,
    .btm-nav>*[disabled],
    .btm-nav>*[disabled]:hover{
  pointer-events: none;
  --tw-border-opacity: 0;
  background-color: hsl(var(--n) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
  color: hsl(var(--bc) / var(--tw-text-opacity));
  --tw-text-opacity: 0.2;
}
.btn:active:hover,
  .btn:active:focus{
  animation: none;
  transform: scale(var(--btn-focus-scale, 0.95));
}
.btn:hover,
    .btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--nf, var(--n)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--nf, var(--n)) / var(--tw-bg-opacity));
}
.btn:focus-visible{
  outline: 2px solid hsl(var(--nf));
  outline-offset: 2px;
}
.btn-primary{
  --tw-border-opacity: 1;
  border-color: hsl(var(--p) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn-primary:hover,
    .btn-primary.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--pf, var(--p)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--pf, var(--p)) / var(--tw-bg-opacity));
}
.btn-primary:focus-visible{
  outline: 2px solid hsl(var(--p));
}
.btn-secondary:hover,
    .btn-secondary.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--sf, var(--s)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--sf, var(--s)) / var(--tw-bg-opacity));
}
.btn-accent:hover,
    .btn-accent.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--af, var(--a)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--af, var(--a)) / var(--tw-bg-opacity));
}
.btn-info:hover,
    .btn-info.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--in) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--in) / var(--tw-bg-opacity));
}
.btn-success:hover,
    .btn-success.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--su) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--su) / var(--tw-bg-opacity));
}
.btn-warning:hover,
    .btn-warning.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--wa) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--wa) / var(--tw-bg-opacity));
}
.btn-error:hover,
    .btn-error.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--er) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--er) / var(--tw-bg-opacity));
}
.btn.glass:hover,
    .btn.glass.btn-active{
  --glass-opacity: 25%;
  --glass-border-opacity: 15%;
}
.btn.glass:focus-visible{
  outline: 2px solid currentColor;
}
.btn-ghost{
  border-width: 1px;
  border-color: transparent;
  background-color: transparent;
  color: currentColor;
}
.btn-ghost:hover,
    .btn-ghost.btn-active{
  --tw-border-opacity: 0;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.2;
}
.btn-ghost:focus-visible{
  outline: 2px solid currentColor;
}
.btn-link:hover,
    .btn-link.btn-active{
  border-color: transparent;
  background-color: transparent;
  text-decoration-line: underline;
}
.btn-outline:hover,
    .btn-outline.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--bc) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--b1) / var(--tw-text-opacity));
}
.btn-outline.btn-primary{
  --tw-text-opacity: 1;
  color: hsl(var(--p) / var(--tw-text-opacity));
}
.btn-outline.btn-primary:hover,
      .btn-outline.btn-primary.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--pf, var(--p)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--pf, var(--p)) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn-outline.btn-secondary:hover,
      .btn-outline.btn-secondary.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--sf, var(--s)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--sf, var(--s)) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--sc) / var(--tw-text-opacity));
}
.btn-outline.btn-accent:hover,
      .btn-outline.btn-accent.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--af, var(--a)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--af, var(--a)) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--ac) / var(--tw-text-opacity));
}
.btn-outline.btn-success:hover,
      .btn-outline.btn-success.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--su) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--su) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--suc, var(--nc)) / var(--tw-text-opacity));
}
.btn-outline.btn-info:hover,
      .btn-outline.btn-info.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--in) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--in) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--inc, var(--nc)) / var(--tw-text-opacity));
}
.btn-outline.btn-warning:hover,
      .btn-outline.btn-warning.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--wa) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--wa) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--wac, var(--nc)) / var(--tw-text-opacity));
}
.btn-outline.btn-error:hover,
      .btn-outline.btn-error.btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--er) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--er) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--erc, var(--nc)) / var(--tw-text-opacity));
}
.btn-disabled,
  .btn-disabled:hover,
  .btn[disabled],
  .btn[disabled]:hover{
  --tw-border-opacity: 0;
  background-color: hsl(var(--n) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.2;
  color: hsl(var(--bc) / var(--tw-text-opacity));
  --tw-text-opacity: 0.2;
}
.btn.loading.btn-square:before,
    .btn.loading.btn-circle:before{
  margin-right: 0px;
}
.btn.loading.btn-xl:before,
    .btn.loading.btn-lg:before{
  height: 1.25rem;
  width: 1.25rem;
}
.btn.loading.btn-sm:before,
    .btn.loading.btn-xs:before{
  height: 0.75rem;
  width: 0.75rem;
}
.btn-group > input[type="radio"]:checked.btn,
  .btn-group > .btn-active{
  --tw-border-opacity: 1;
  border-color: hsl(var(--p) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn-group > input[type="radio"]:checked.btn:focus-visible, .btn-group > .btn-active:focus-visible{
  outline: 2px solid hsl(var(--p));
}
@keyframes button-pop{
0%{
    transform: scale(var(--btn-focus-scale, 0.95));
}
40%{
    transform: scale(1.02);
}
100%{
    transform: scale(1);
}
}
.card :where(figure:first-child){
  overflow: hidden;
  border-start-start-radius: inherit;
  border-start-end-radius: inherit;
  border-end-start-radius: unset;
  border-end-end-radius: unset;
}
.card :where(figure:last-child){
  overflow: hidden;
  border-start-start-radius: unset;
  border-start-end-radius: unset;
  border-end-start-radius: inherit;
  border-end-end-radius: inherit;
}
.card:focus-visible{
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
.card.bordered{
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity));
}
.card.compact .card-body{
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.card.image-full :where(figure){
  overflow: hidden;
  border-radius: inherit;
}
.carousel::-webkit-scrollbar{
  display: none;
}
@keyframes checkmark{
0%{
    background-position-y: 5px;
}
50%{
    background-position-y: -2px;
}
100%{
    background-position-y: 0;
}
}
.drawer-toggle:focus-visible ~ .drawer-content .drawer-button.btn-primary{
  outline: 2px solid hsl(var(--p));
}
.drawer-toggle:focus-visible ~ .drawer-content .drawer-button.btn-ghost{
  outline: 2px solid currentColor;
}
.input[list]::-webkit-calendar-picker-indicator{
  line-height: 1em;
}
.input:focus{
  outline: 2px solid hsla(var(--bc) / 0.2);
  outline-offset: 2px;
}
.input-disabled,
  .input[disabled]{
  cursor: not-allowed;
  --tw-border-opacity: 1;
  border-color: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
  --tw-text-opacity: 0.2;
}
.input-disabled::-moz-placeholder, .input[disabled]::-moz-placeholder{
  color: hsl(var(--bc) / var(--tw-placeholder-opacity));
  --tw-placeholder-opacity: 0.2;
}
.input-disabled::placeholder,
  .input[disabled]::placeholder{
  color: hsl(var(--bc) / var(--tw-placeholder-opacity));
  --tw-placeholder-opacity: 0.2;
}
.link:focus{
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.link:focus-visible{
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
.menu li.disabled > *{
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  color: hsl(var(--bc) / var(--tw-text-opacity));
  --tw-text-opacity: 0.2;
}
.menu li.disabled > *:hover{
  background-color: transparent;
}
.mockup-phone .display{
  overflow: hidden;
  border-radius: 40px;
  margin-top: -25px;
}
@keyframes progress-loading{
50%{
    left: 107%;
}
}
@keyframes radiomark{
0%{
    box-shadow: 0 0 0 12px hsl(var(--b1)) inset, 0 0 0 12px hsl(var(--b1)) inset;
}
50%{
    box-shadow: 0 0 0 3px hsl(var(--b1)) inset, 0 0 0 3px hsl(var(--b1)) inset;
}
100%{
    box-shadow: 0 0 0 4px hsl(var(--b1)) inset, 0 0 0 4px hsl(var(--b1)) inset;
}
}
@keyframes rating-pop{
0%{
    transform: translateY(-0.125em);
}
40%{
    transform: translateY(-0.125em);
}
100%{
    transform: translateY(0);
}
}
.steps .step:before{
  top: 0px;
  grid-column-start: 1;
  grid-row-start: 1;
  height: 0.5rem;
  width: 100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--bc) / var(--tw-text-opacity));
  content: "";
  margin-left: -100%;
}
.steps .step:after{
  content: counter(step);
  counter-increment: step;
  z-index: 1;
  position: relative;
  grid-column-start: 1;
  grid-row-start: 1;
  display: grid;
  height: 2rem;
  width: 2rem;
  place-items: center;
  place-self: center;
  border-radius: 9999px;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--bc) / var(--tw-text-opacity));
}
.steps .step:first-child:before{
  content: none;
}
.steps .step[data-content]:after{
  content: attr(data-content);
}
.tab:hover{
  --tw-text-opacity: 1;
}
.tab.tab-active{
  border-color: hsl(var(--bc) / var(--tw-border-opacity));
  --tw-border-opacity: 1;
  --tw-text-opacity: 1;
}
.tab:focus{
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tab:focus-visible{
  outline: 2px solid currentColor;
  outline-offset: -3px;
}
.tab:focus-visible.tab-lifted{
  border-bottom-right-radius: var(--tab-radius, 0.5rem);
  border-bottom-left-radius: var(--tab-radius, 0.5rem);
}
.textarea:focus{
  outline: 2px solid hsla(var(--bc) / 0.2);
  outline-offset: 2px;
}
.textarea-disabled,
  .textarea[disabled]{
  cursor: not-allowed;
  --tw-border-opacity: 1;
  border-color: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
  --tw-text-opacity: 0.2;
}
.textarea-disabled::-moz-placeholder, .textarea[disabled]::-moz-placeholder{
  color: hsl(var(--bc) / var(--tw-placeholder-opacity));
  --tw-placeholder-opacity: 0.2;
}
.textarea-disabled::placeholder,
  .textarea[disabled]::placeholder{
  color: hsl(var(--bc) / var(--tw-placeholder-opacity));
  --tw-placeholder-opacity: 0.2;
}
@keyframes toast-pop{
0%{
    transform: scale(0.9);
    opacity: 0;
}
100%{
    transform: scale(1);
    opacity: 1;
}
}
[dir="rtl"] .toggle{
  --handleoffsetcalculator: calc(var(--handleoffset) * 1);
}
.toggle:focus-visible{
  outline: 2px solid hsl(var(--bc));
  outline-offset: 2px;
}
.toggle:checked,
  .toggle[checked="true"],
  .toggle[aria-checked=true]{
  --handleoffsetcalculator: var(--handleoffset);
  --tw-border-opacity: 1;
  --tw-bg-opacity: 1;
}
[dir="rtl"] .toggle:checked, [dir="rtl"] .toggle[checked="true"], [dir="rtl"] .toggle[aria-checked=true]{
  --handleoffsetcalculator: calc(var(--handleoffset) * -1);
}
.toggle:indeterminate{
  --tw-border-opacity: 1;
  --tw-bg-opacity: 1;
  box-shadow: calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset, calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset;
}
[dir="rtl"] .toggle:indeterminate{
  box-shadow: calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset, calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset;
}
.toggle:disabled{
  cursor: not-allowed;
  --tw-border-opacity: 1;
  border-color: hsl(var(--bc) / var(--tw-border-opacity));
  background-color: transparent;
  opacity: 0.3;
  --togglehandleborder: 0 0 0 3px hsl(var(--bc)) inset, var(--handleoffsetcalculator) 0 0 3px hsl(var(--bc)) inset;
}
.glass,
  .glass:hover,
  .glass.btn-active{
  border: none;
  -webkit-backdrop-filter: blur(var(--glass-blur, 40px));
          backdrop-filter: blur(var(--glass-blur, 40px));
  background-color: transparent;
  background-image: linear-gradient(
        135deg,
        rgb(255 255 255 / var(--glass-opacity, 30%)) 0%,
        rgb(0 0 0 / 0%) 100%
      ),
      linear-gradient(
        var(--glass-reflex-degree, 100deg),
        rgb(255 255 255 / var(--glass-reflex-opacity, 10%)) 25%,
        rgb(0 0 0 / 0%) 25%
      );
  box-shadow: 0 0 0 1px rgb(255 255 255 / var(--glass-border-opacity, 10%))
        inset,
      0 0 0 2px rgb(0 0 0 / 5%);
  text-shadow: 0 1px rgb(0 0 0 / var(--glass-text-shadow-opacity, 5%));
}
.min-h-16{
  min-height: 4rem;
}
.btn-xs{
  height: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  min-height: 1.5rem;
  font-size: 0.75rem;
}
.btn-sm{
  height: 2rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  min-height: 2rem;
  font-size: 0.875rem;
}
.btn-square:where(.btn-xs){
  height: 1.5rem;
  width: 1.5rem;
  padding: 0px;
}
.btn-square:where(.btn-sm){
  height: 2rem;
  width: 2rem;
  padding: 0px;
}
.btn-square:where(.btn-md){
  height: 3rem;
  width: 3rem;
  padding: 0px;
}
.btn-square:where(.btn-lg){
  height: 4rem;
  width: 4rem;
  padding: 0px;
}
.btn-circle:where(.btn-xs){
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 9999px;
  padding: 0px;
}
.btn-circle:where(.btn-sm){
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
  padding: 0px;
}
.btn-circle:where(.btn-md){
  height: 3rem;
  width: 3rem;
  border-radius: 9999px;
  padding: 0px;
}
.btn-circle:where(.btn-lg){
  height: 4rem;
  width: 4rem;
  border-radius: 9999px;
  padding: 0px;
}
.steps-horizontal .step{
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  place-items: center;
  text-align: center;
}
.steps-vertical .step{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
}
.avatar.online:before{
  content: "";
  position: absolute;
  z-index: 10;
  display: block;
  border-radius: 9999px;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--su) / var(--tw-bg-opacity));
  width: 15%;
  height: 15%;
  top: 7%;
  right: 7%;
  box-shadow: 0 0 0 2px hsl(var(--b1));
}
.avatar.offline:before{
  content: "";
  position: absolute;
  z-index: 10;
  display: block;
  border-radius: 9999px;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity));
  width: 15%;
  height: 15%;
  top: 7%;
  right: 7%;
  box-shadow: 0 0 0 2px hsl(var(--b1));
}
.btn-group .btn:not(:first-child):not(:last-child), .btn-group.btn-group-horizontal .btn:not(:first-child):not(:last-child){
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group .btn:first-child:not(:last-child), .btn-group.btn-group-horizontal .btn:first-child:not(:last-child){
  margin-left: -1px;
  margin-top: -0px;
  border-top-left-radius: var(--rounded-btn, 0.5rem);
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--rounded-btn, 0.5rem);
  border-bottom-right-radius: 0;
}
.btn-group .btn:last-child:not(:first-child), .btn-group.btn-group-horizontal .btn:last-child:not(:first-child){
  border-top-left-radius: 0;
  border-top-right-radius: var(--rounded-btn, 0.5rem);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}
.btn-group.btn-group-vertical .btn:first-child:not(:last-child){
  margin-left: -0px;
  margin-top: -1px;
  border-top-left-radius: var(--rounded-btn, 0.5rem);
  border-top-right-radius: var(--rounded-btn, 0.5rem);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group.btn-group-vertical .btn:last-child:not(:first-child){
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--rounded-btn, 0.5rem);
  border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}
.card-compact .card-body{
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.card-compact .card-title{
  margin-bottom: 0.25rem;
}
.card-normal .card-body{
  padding: var(--padding-card, 2rem);
  font-size: 1rem;
  line-height: 1.5rem;
}
.steps-horizontal .step{
  grid-template-rows: 40px 1fr;
  grid-template-columns: auto;
  min-width: 4rem;
}
.steps-horizontal .step:before{
  height: 0.5rem;
  width: 100%;
  --tw-translate-y: 0px;
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  content: "";
  margin-left: -100%;
}
.steps-vertical .step{
  gap: 0.5rem;
  grid-template-columns: 40px 1fr;
  grid-template-rows: auto;
  min-height: 4rem;
  justify-items: start;
}
.steps-vertical .step:before{
  height: 100%;
  width: 0.5rem;
  --tw-translate-y: -50%;
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  margin-left: 50%;
}
.fixed{
  position: fixed;
}
.absolute{
  position: absolute;
}
.relative{
  position: relative;
}
.top-3{
  top: 12px;
}
.right-3{
  right: 12px;
}
.left-0{
  left: 0px;
}
.bottom-0{
  bottom: 0px;
}
.bottom-1{
  bottom: 4px;
}
.right-1{
  right: 4px;
}
.left-1{
  left: 4px;
}
.right-0{
  right: 0px;
}
.z-40{
  z-index: 40;
}
.z-50{
  z-index: 50;
}
.z-\\[2147483647\\]{
  z-index: 2147483647;
}
.m-2{
  margin: 8px;
}
.my-auto{
  margin-top: auto;
  margin-bottom: auto;
}
.mx-2{
  margin-left: 8px;
  margin-right: 8px;
}
.mx-auto{
  margin-left: auto;
  margin-right: auto;
}
.mr-5{
  margin-right: 20px;
}
.mt-3{
  margin-top: 12px;
}
.ml-5{
  margin-left: 20px;
}
.ml-3{
  margin-left: 12px;
}
.mt-4{
  margin-top: 16px;
}
.mb-3{
  margin-bottom: 12px;
}
.mr-4{
  margin-right: 16px;
}
.ml-9{
  margin-left: 36px;
}
.mr-2{
  margin-right: 8px;
}
.mb-4{
  margin-bottom: 16px;
}
.block{
  display: block;
}
.flex{
  display: flex;
}
.grid{
  display: grid;
}
.hidden{
  display: none;
}
.h-full{
  height: 100%;
}
.h-\\[900px\\]{
  height: 900px;
}
.h-16{
  height: 64px;
}
.h-\\[32px\\]{
  height: 32px;
}
.h-5{
  height: 20px;
}
.h-6{
  height: 24px;
}
.h-max{
  height: -moz-max-content;
  height: max-content;
}
.h-\\[48px\\]{
  height: 48px;
}
.h-\\[510px\\]{
  height: 510px;
}
.\\!h-\\[64px\\]{
  height: 64px !important;
}
.h-\\[630px\\]{
  height: 630px;
}
.h-4{
  height: 16px;
}
.h-\\[24px\\]{
  height: 24px;
}
.h-8{
  height: 32px;
}
.max-h-\\[144px\\]{
  max-height: 144px;
}
.max-h-\\[694px\\]{
  max-height: 694px;
}
.max-h-\\[630px\\]{
  max-height: 630px;
}
.min-h-\\[48px\\]{
  min-height: 48px;
}
.min-h-\\[160px\\]{
  min-height: 160px;
}
.w-full{
  width: 100%;
}
.w-52{
  width: 13rem;
}
.w-8{
  width: 32px;
}
.w-\\[32px\\]{
  width: 32px;
}
.w-6{
  width: 24px;
}
.w-5{
  width: 20px;
}
.w-11\\/12{
  width: 91.666667%;
}
.w-\\[372px\\]{
  width: 372px;
}
.w-\\[284px\\]{
  width: 284px;
}
.w-16{
  width: 64px;
}
.max-w-\\[316px\\]{
  max-width: 316px;
}
.max-w-\\[372px\\]{
  max-width: 372px;
}
.max-w-\\[144px\\]{
  max-width: 144px;
}
.flex-1{
  flex: 1 1 0%;
}
.flex-none{
  flex: none;
}
.scale-50{
  --tw-scale-x: .5;
  --tw-scale-y: .5;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.cursor-pointer{
  cursor: pointer;
}
.resize-none{
  resize: none;
}
.grid-cols-2{
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.flex-col{
  flex-direction: column;
}
.place-items-center{
  place-items: center;
}
.items-center{
  align-items: center;
}
.justify-start{
  justify-content: flex-start;
}
.justify-center{
  justify-content: center;
}
.justify-between{
  justify-content: space-between;
}
.justify-around{
  justify-content: space-around;
}
.\\!gap-x-\\[12px\\]{
  -moz-column-gap: 12px !important;
       column-gap: 12px !important;
}
.space-x-4 > :not([hidden]) ~ :not([hidden]){
  --tw-space-x-reverse: 0;
  margin-right: calc(16px * var(--tw-space-x-reverse));
  margin-left: calc(16px * calc(1 - var(--tw-space-x-reverse)));
}
.overflow-hidden{
  overflow: hidden;
}
.overflow-y-auto{
  overflow-y: auto;
}
.break-words{
  overflow-wrap: break-word;
}
.\\!break-words{
  overflow-wrap: break-word !important;
}
.rounded-full{
  border-radius: 9999px;
}
.rounded{
  border-radius: 0.25rem;
}
.rounded-2xl{
  border-radius: 1rem;
}
.rounded-lg{
  border-radius: 0.5rem;
}
.rounded-md{
  border-radius: 0.375rem;
}
.rounded-r-lg{
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.rounded-l-lg{
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.rounded-t-2xl{
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.rounded-t-md{
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.rounded-tl-lg{
  border-top-left-radius: 0.5rem;
}
.rounded-tr-lg{
  border-top-right-radius: 0.5rem;
}
.border-b{
  border-bottom-width: 1px;
}
.border-b-2{
  border-bottom-width: 2px;
}
.border-none{
  border-style: none;
}
.bg-white{
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.bg-base-100{
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
}
.bg-\\[\\#DDE2EB\\]{
  --tw-bg-opacity: 1;
  background-color: rgb(221 226 235 / var(--tw-bg-opacity));
}
.bg-transparent{
  background-color: transparent;
}
.bg-white\\/50{
  background-color: rgb(255 255 255 / 0.5);
}
.bg-black\\/30{
  background-color: rgb(0 0 0 / 0.3);
}
.bg-black\\/60{
  background-color: rgb(0 0 0 / 0.6);
}
.\\!bg-black\\/60{
  background-color: rgb(0 0 0 / 0.6) !important;
}
.p-4{
  padding: 16px;
}
.p-3{
  padding: 12px;
}
.\\!py-1{
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}
.px-5{
  padding-left: 20px;
  padding-right: 20px;
}
.py-4{
  padding-top: 16px;
  padding-bottom: 16px;
}
.px-3{
  padding-left: 12px;
  padding-right: 12px;
}
.py-3{
  padding-top: 12px;
  padding-bottom: 12px;
}
.py-2{
  padding-top: 8px;
  padding-bottom: 8px;
}
.\\!px-\\[16px\\]{
  padding-left: 16px !important;
  padding-right: 16px !important;
}
.\\!py-\\[8px\\]{
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}
.px-4{
  padding-left: 16px;
  padding-right: 16px;
}
.px-\\[8px\\]{
  padding-left: 8px;
  padding-right: 8px;
}
.pt-60{
  padding-top: 15rem;
}
.pl-32{
  padding-left: 8rem;
}
.pr-4{
  padding-right: 16px;
}
.pt-3{
  padding-top: 12px;
}
.pt-0{
  padding-top: 0px;
}
.pb-3{
  padding-bottom: 12px;
}
.pl-5{
  padding-left: 20px;
}
.text-left{
  text-align: left;
}
.text-center{
  text-align: center;
}
.align-middle{
  vertical-align: middle;
}
.\\!font-sans{
  font-family: Nunito !important;
}
.text-xs{
  font-size: 12px;
  line-height: 16px;
}
.text-lg{
  font-size: 18px;
  line-height: 28px;
}
.text-\\[16px\\]{
  font-size: 16px;
}
.text-\\[14px\\]{
  font-size: 14px;
}
.text-xl{
  font-size: 20px;
  line-height: 28px;
}
.text-base{
  font-size: 16px;
  line-height: 24px;
}
.\\!text-base{
  font-size: 16px !important;
  line-height: 24px !important;
}
.text-sm{
  font-size: 14px;
  line-height: 20px;
}
.text-\\[12px\\]{
  font-size: 12px;
}
.font-bold{
  font-weight: 700;
}
.capitalize{
  text-transform: capitalize;
}
.leading-\\[24px\\]{
  line-height: 24px;
}
.\\!leading-\\[24px\\]{
  line-height: 24px !important;
}
.text-black{
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.text-white{
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.text-white\\/40{
  color: rgb(255 255 255 / 0.4);
}
.text-white\\/50{
  color: rgb(255 255 255 / 0.5);
}
.text-neutral{
  --tw-text-opacity: 1;
  color: hsl(var(--n) / var(--tw-text-opacity));
}
.text-neutral\\/70{
  color: hsl(var(--n) / 0.7);
}
.text-opacity-60{
  --tw-text-opacity: 0.6;
}
.opacity-50{
  opacity: 0.5;
}
.shadow-xl{
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.blur{
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.drop-shadow-2xl{
  --tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop-blur-sm{
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.transition-all{
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-200{
  transition-duration: 200ms;
}
.\\!line-clamp-1{
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 1 !important;
}
.\\!line-clamp-6{
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 6 !important;
}
.line-clamp-3{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #4fafe4;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
0% {
    transform: scale(0);
}
100% {
    transform: scale(1);
}
}
@keyframes lds-ellipsis3 {
0% {
    transform: scale(1);
}
100% {
    transform: scale(0);
}
}
@keyframes lds-ellipsis2 {
0% {
    transform: translate(0, 0);
}
100% {
    transform: translate(24px, 0);
}
}
.btn-ghost {
  border-width: 1px;
  border-color: transparent !important;
  background-color: transparent;
  color: currentColor;
}
.btn-ghost:hover,
  .btn-ghost.btn-active {
  --tw-border-opacity: 0;
  background-color: hsl(222 66% 82% / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.2;
  border-width: 0;
  border-color: transparent !important;
}
.btn-ghost:focus-visible {
  outline: 0;
}
.drawer-toggle:focus-visible ~ .drawer-content .drawer-button.btn-ghost {
  outline: 0;
}
:deep(.textarea){
  line-height: 1.25rem;
}
.stuff  {
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12),
              0 4px 4px rgba(0,0,0,0.12),
              0 8px 8px rgba(0,0,0,0.12),
              0 16px 16px rgba(0,0,0,0.12);
}
.recommendation:hover  {
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12),
              0 4px 4px rgba(0,0,0,0.12),
              0 8px 8px rgba(0,0,0,0.12),
              0 16px 16px rgba(0,0,0,0.12);
}
.overlay{
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 50;
  width: 100%;
  overflow: hidden;
  background-color: rgb(0 0 0 / 0.7);
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.hover\\:scale-105:hover{
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.hover\\:\\!border-none:hover{
  border-style: none !important;
}
.hover\\:text-neutral:hover{
  --tw-text-opacity: 1;
  color: hsl(var(--n) / var(--tw-text-opacity));
}
.hover\\:opacity-80:hover{
  opacity: 0.8;
}
.focus\\:\\!border-none:focus{
  border-style: none !important;
}
.focus\\:outline-none:focus{
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.group:hover .group-hover\\:text-opacity-100{
  --tw-text-opacity: 1;
}
@media (min-width: 640px){
.sm\\:right-5{
    right: 20px;
}
.sm\\:left-5{
    left: 20px;
}
.sm\\:bottom-5{
    bottom: 20px;
}
.sm\\:m-0{
    margin: 0px;
}
.sm\\:ml-0{
    margin-left: 0px;
}
.sm\\:mr-2{
    margin-right: 8px;
}
.sm\\:flex{
    display: flex;
}
.sm\\:h-\\[694px\\]{
    height: 694px;
}
.sm\\:w-\\[372px\\]{
    width: 372px;
}
}
`;
const VueChatWidget = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]]]);
const ChatWindow = defineCustomElement(VueChatWidget);
const installWidget = () => customElements.define("monoloq-widget", ChatWindow);
async function register() {
  console.info("%s Installing monoloq widget 1.6...", "🏋️");
  const getSettings = async (addWww) => await fetch(`${String("https://9qilmdres7.execute-api.eu-west-1.amazonaws.com/prod")}/settings?host_domain=${devHost(void 0, addWww)}`);
  try {
    const font = document.createElement("link");
    font.href = "https://fonts.googleapis.com/css2?family=Nunito&display=swap";
    font.rel = "stylesheet";
    document.head.appendChild(font);
    let props;
    let excludedPaths = [];
    const addWww = localStorage.getItem("monoloqAddWww") === "true";
    try {
      let res;
      res = await getSettings(addWww);
      if (!res.ok)
        res = await getSettings(!addWww);
      const settings = await res.json();
      props = {
        ...settings.appearance,
        text: settings.text,
        enable_on_mobile: settings.general.enable_on_mobile,
        currency_symbol: settings.general.currency_symbol
      };
      excludedPaths = settings.general.exclude_bot_paths;
    } catch (e) {
      console.error("Failed to fetch widget config", e);
    }
    if (excludedPaths.includes(window.location.href))
      return;
    customElements.define("monoloq-widget", ChatWindow);
    document.body.appendChild(
      new ChatWindow(props)
    );
    console.info("%s Monoloq widget installed!", "✨");
  } catch {
    console.error("Monoloq widget could not be installed. Please contact the Monoloq support.");
  }
}
export {
  ChatWindow,
  installWidget,
  register
};
//# sourceMappingURL=monoloq-widget.js.map
