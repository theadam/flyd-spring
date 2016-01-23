import loop from 'raf-loop';
import { stream, isStream, on } from 'flyd';
import stepper from 'react-motion/lib/stepper';
import presets from 'react-motion/lib/presets';

export { presets as presets };

const engine = loop();

const isSpring = (value) => value.__spring === true;
function wrapSpring(dest, config) {
  return {
    __spring: true,
    dest,
    config,
    vel: 0,
  };
}


function updateInput(vals, springs, input, config) {
  if (Array.isArray(input)) {
    const newSprings = springs || [];
    const newVals = vals || [];
    input.forEach((v, k) => {
      const [nv, ns] = updateInput(newVals[k], newSprings[k], v, config);
      if (ns === false) {
        delete(newSprings[k]);
        newVals[k] = nv;
      } else {
        delete(newVals[k]);
        newSprings[k] = ns;
      }
    });
    return [newVals.length === 0 ? false : newVals, newSprings.length === 0 ? false : newSprings];
  }
  if (isSpring(input)) {
    if (typeof input.dest === 'object') return updateInput(vals, springs, input.dest, input.config);
    if (springs && isSpring(springs)) {
      springs.dest = input.dest;
      springs.config = input.config;
      return [false, springs];
    }
    return [false, input];
  }
  if (typeof input === 'object') {
    const newSprings = springs || {};
    const newVals = vals || {};
    Object.keys(input).forEach(k => {
      const [nv, ns] = updateInput(newVals[k], newSprings[k], input[k], config);
      if (ns === false) {
        delete(newSprings[k]);
        newVals[k] = nv;
      } else {
        delete(newVals[k]);
        newSprings[k] = ns;
      }
    });
    return [Object.keys(newVals).length === 0 ? false : newVals, Object.keys(newSprings).length === 0 ? false : newSprings];
  }
  if (config) {
    return updateInput(vals, springs, wrapSpring(input, config), config);
  }
  return [input, false];
}

const baseObj = from => Array.isArray(from) ? [] : {};
const base = from => typeof from === 'object' ? baseObj(from) : undefined;

function stepSprings(springs, values, last, delta) {
  if (!isSpring(springs)) {
    let updateCount = 0;
    for (const k in springs) {
      if (springs.hasOwnProperty(k)) {
        const [val, updated] = stepSprings(springs[k], values[k] || base(last[k]), last[k], delta);
        if (updated === false) {
          delete(springs[k]);
        } else {
          updateCount += 1;
        }
        values[k] = val;
      }
    }
    return [values, updateCount > 0];
  }
  if (last === springs.dest && springs.vel === 0) return [last, false];
  const [newX, newV] = stepper(delta / 1000, last, springs.vel,
                               springs.dest, springs.config[0],
                               springs.config[1]);
  springs.vel = newV;
  return [newX, true];
}

function stepVals(vals, values) {
  if (typeof vals === 'object') {
    for (const k in vals) {
      if (vals.hasOwnProperty(k)) {
        const val = stepVals(vals[k], values[k] || base(vals[k]));
        delete(vals[k]);
        values[k] = val;
      }
    }
    return values;
  }
  return vals;
}

export function springable(input$, config) {
  const output$ = stream(input$());
  output$.moving = stream(false);
  let springs;
  let vals;

  on(v => {
    const updateInfo = updateInput(vals, springs, v, config);
    vals = updateInfo[0];
    springs = updateInfo[1];
  }, input$);

  engine.on('tick', (delta) => {
    if (delta > 1000) return;
    if (springs === false && vals === false) return;
    let next = base(output$());

    if (springs) {
      const [val, updated] = stepSprings(springs, next, output$(), delta);
      if (updated === false) {
        springs = false;
        if (output$.moving() === true) output$.moving(false);
      } else {
        if (output$.moving() === false) output$.moving(true);
      }
      next = val;
    }
    if (springs === false && vals === false) return;
    if (vals !== false) {
      next = stepVals(vals, next);
      vals = false;
    }
    output$(next);
  });
  engine.start();
  return output$;
}

export function spring(val$, config = presets.noWobble) {
  if (isStream(val$)) {
    const input$ = stream(val$() || 0);
    let skip = true;
    on(v => {
      if (skip) {
        skip = false;
        return;
      }
      input$(v);
    }, val$);
    return springable(input$, config);
  }
  return wrapSpring(val$, config);
}

