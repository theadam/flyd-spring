/** @jsx h */
import './index.css';
import { stream, on, combine, scan, merge } from 'flyd';
import { spring } from 'flyd-spring';
import ReactDOM from 'react-dom';
import { h } from 'react-flyd';
import { dissoc, assoc } from 'ramda';

function Item(text, onClose) {
  const input$ = stream(0);
  const val$ = spring(input$);
  input$(1);

  const click = () => {
    input$(0);
    on((v) => {
      if (!v && val$() === 0) {
        onClose();
      }
    }, val$.moving);
  };

  return (
    <div className="item box" style={ val$.map(v => ({opacity: v, height: 40 * v})) }>
      <span className="text">{text}</span>
      <a onClick={ click } className="close">x</a>
    </div>
  );
}

let i = 0;

function makeItem(id, remove$) {
  return Item(id, () => {
    remove$(id);
  });
}

function Container() {
  const remove$ = stream();
  const add$ = stream();

  const action$ = merge(
    remove$.map(id => dissoc(String(id))),
    add$.map(id => assoc(id, makeItem(id, remove$)))
  );

  const items$ = scan((acc, a) => a(acc), [], action$);

  return (
    <div className="container">
      <div className="box">
        <button onClick={ () => add$(i++) }>Add</button>
      </div>
      <div>
        { items$.map(o => Object.keys(o).map(k => <span key={k}>{o[k]}</span>)) }
      </div>
    </div>
  );
}


ReactDOM.render(Container(), document.getElementById('root'));

