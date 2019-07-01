import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import { StaticRouter } from 'react-router';
import renderHTML from './html';
import Paths from './components/Paths';

const app = express();

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use((req, res) => {
  const componentHTML = ReactDom.renderToString(
    <StaticRouter location={req.url}>
      <Paths />
    </StaticRouter>
  );

  return res.end(renderHTML(componentHTML));
});

app.use(express.static('dist/public'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
