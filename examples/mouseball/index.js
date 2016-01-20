import './index.css';
import raf from 'raf';
import { reverse, init, repeat } from 'ramda';
import { stream, on } from 'flyd';
import { spring, springable } from 'flyd-spring';

const pos$ = stream({x: 0, y: 0});

document.addEventListener('mousemove', ({pageX, pageY}) => {
  pos$({x: pageX - 30, y: pageY - 30});
});

const balls = reverse([...document.getElementsByClassName('ball')]);

const springFrom = (v, i) => spring(v, [30 * (i + 1), 5 * (i + 1)]);
const toSpring = ({x, y}, i) => ({x: springFrom(x, i), y: springFrom(y, i)});

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

on((poss) => poss.forEach(({x, y}, i) => moveBall(balls[i], x, y)), stagger(pos$, balls.length));

