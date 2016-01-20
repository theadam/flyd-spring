import './index.css';
import fps from 'fps';
import raf from 'raf';
import { reverse, init, repeat } from 'ramda';
import { stream, on } from 'flyd';
import { spring, springable, presets } from 'flyd-spring';

const pos$ = stream({x: 0, y: 0});

document.addEventListener('mousemove', ({pageX, pageY}) => {
  pos$({x: pageX - 30, y: pageY - 30});
});

const balls = reverse([...document.getElementsByClassName('ball')]);

const springFrom = v => spring(v, presets.gentle);
const toSpring = ({x, y}) => ({x: springFrom(x), y: springFrom(y)});

function stagger(src$, num) {
  const input$ = stream(repeat(src$(), num));
  const output$ = springable(input$);

  const cb = () => {
    raf(cb);
    input$([src$(), ...init(output$()).map(toSpring)]);
  };
  cb();

  return output$;
}

function moveBall(ball, x, y) {
  ball.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0)`;
  ball.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

const spring$ = stagger(pos$, balls.length);

on((poss) => poss.forEach(({x, y}, i) => moveBall(balls[i], x, y)), spring$);


const fpsBox = document.getElementById('fps');
const ticker = fps({ every: 30 });
on(() => ticker.tick(), spring$);

ticker.on('data', (data) => fpsBox.innerHTML = data + ' fps');

