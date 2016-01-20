import loop from 'raf-loop';
import clone from 'ramda/src/clone';
import { stream, isStream, on } from 'flyd';

import stepper from './stepper';
import presets from './presets';

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


function updateInput(vals, springs, input) {
  if (Array.isArray(input)) {
    const newSprings = springs || [];
    const newVals = vals || [];
    input.forEach((v, k) => {
      const [nv, ns] = updateInput(newVals[k], newSprings[k], v);
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
      const [nv, ns] = updateInput(newVals[k], newSprings[k], input[k]);
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
  return [input, false];
}

function stepSprings(springs, inputValues, delta) {
  const values = clone(inputValues);
  if (!isSpring(springs)) {
    Object.keys(springs).forEach(k => {
      const val = stepSprings(springs[k], values[k], delta);
      if (val === false) {
        delete(springs[k]);
      } else {
        values[k] = val;
      }
    });
    return Object.keys(springs).length === 0 ? false : values;
  }
  if (values === springs.dest && springs.vel === 0) return false;
  const [newX, newV] = stepper(delta / 1000, values, springs.vel,
                               springs.dest, springs.config[0],
                               springs.config[1]);
  springs.vel = newV;
  return newX;
}

function stepVals(vals, inputValues) {
  if (typeof vals === 'object') {
    const values = clone(inputValues);
    Object.keys(vals).forEach(k => {
      const val = stepVals(vals[k], values[k]);
      delete(vals[k]);
      values[k] = val;
    });
    return values;
  }
  return vals;
}

export function springable(input$) {
  const output$ = stream(input$());
  let springs;
  let vals;
  on(v => {
    const updateInfo = updateInput(vals, springs, v);
    vals = updateInfo[0];
    springs = updateInfo[1];
  }, input$);

  engine.on('tick', (delta) => {
    if (delta > 1000) return;
    if (!springs && !vals) return;
    let next = clone(output$());
    if (springs) {
      const updated = stepSprings(springs, next, delta);
      if (updated === false) {
        springs = false;
      } else {
        next = updated;
      }
    }
    if (!springs && !vals) return;
    if (vals) {
      next = stepVals(vals, next);
      vals = false;
    }
    output$(next);
  });
  engine.start();
  return output$;
}

export function spring(val$, config = presets.noWobble) {
  if (isStream(val$ || 0)) {
    const input$ = stream(val$());
    let skip = true;
    on(v => {
      if (skip) {
        skip = false;
        return;
      }
      input$(wrapSpring(v, config));
    }, val$);
    return springable(input$);
  }
  return wrapSpring(val$, config);
}

