import './index.css';
import { stream, on } from 'flyd';
import { spring } from 'flyd-spring';

const input$ = stream(0);

[...document.querySelectorAll('input[type=range]')].forEach(range => {
  if (range.id === 'source') return;
  const config = (range.id || '170:26').split(':');
  const spring$ = spring(input$, config);
  on(v => range.value = v, spring$);
});

document.getElementById('source').addEventListener('input', (v) => input$(v.target.valueAsNumber));


