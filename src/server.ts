import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import App from './components/App';
import renderHTML from './html';

const app = express();

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/', (_req, res) => {
  const componentHTML = ReactDom.renderToString(React.createElement(App));

  return res.end(renderHTML(componentHTML));
});

app.use(express.static('dist/public'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
