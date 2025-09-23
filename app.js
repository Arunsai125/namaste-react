const element = React.createElement('h1', {id:"heading"}, 'Hello, world!');
        ReactDOM.render(element, document.getElementById('root'));

const tree = React.createElement('div', {id:"parent"}, 
        React.createElement('div', {className:"heading"}), 
        [React.createElement('h1', {id:"child2"}, "Hello, I'm h1 tag"), React.createElement('h2', {id:"child3"}, "Hello, I'm h2 tag")]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(tree);