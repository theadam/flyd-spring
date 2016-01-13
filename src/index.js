const loop = require('raf-loop');
import { stream, isStream } from 'flyd';
import stepper from './stepper';
import presets from './presets';

export { presets as presets };

const engine = loop();

export function spring(val$, [k, b] = presets.noWobble) {
  let vel = 0;
  let x = val$() || 0;
  const k$ = isStream(k) ? k : stream(k);
  const b$ = isStream(b) ? b : stream(b);

  const output$ = stream();
  engine.on('tick', (delta) => {
    const destX = val$() || 0;
    if (destX === x) return;
    const [newX, newV] = stepper((delta / 1000), x, vel, destX, k$(), b$());
    vel = newV;
    x = newX;
    output$(newX);
  });
  engine.start();
  return output$;
}

