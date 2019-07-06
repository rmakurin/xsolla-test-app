import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import { StaticRouter } from 'react-router';
import renderHTML from './html';
import Paths from './components/Paths';
import transactions from '../data/data.json';
import { transaction } from './itansaction';

const app = express();

interface sort {
  id: string;
  desc: boolean;
}

interface filter {
  id: string;
  value: string;
}

interface fields {
  [propName: string]: any;
}

const safeGetter = (value: string | null) => {
  return value ? value : '';
};

const Sorter = (arr: transaction[], sorted: sort[]) => {
  const sortFields: fields = {
    projectName: 0,
    paymentName: 0,
    status: 0,
    userName: 0,
    date: 0
  };

  for (let i = 0; i < sorted.length; i++) {
    sortFields[sorted[i].id] = sorted[i].desc ? -1 : 1;
  }
  arr.sort(
    (a: transaction, b: transaction) =>
      a.transaction.project.name.localeCompare(b.transaction.project.name) *
        sortFields.projectName ||
      a.transaction.payment_method.name.localeCompare(
        b.transaction.payment_method.name
      ) * sortFields.paymentName ||
      a.transaction.status.localeCompare(b.transaction.status) *
        sortFields.status ||
      safeGetter(a.user.name).localeCompare(safeGetter(b.user.name)) *
        sortFields.userName ||
      a.transaction.transfer_date.localeCompare(b.transaction.transfer_date) *
        sortFields.date
  );
  return arr;
};

const Filter = (arr: transaction[], filtered: filter[]) => {
  let newArr = arr;

  for (let i = 0; i < filtered.length; i++) {
    newArr = newArr.filter(el => {
      let val;

      switch (filtered[i].id) {
        case 'projectName':
          val = el.transaction.project.name;
          break;
        case 'paymentName':
          val = el.transaction.payment_method.name;
          break;
        case 'status':
          val = el.transaction.status;
          break;
        case 'userName':
          val = el.user.name;
          break;
        case 'date':
          val = el.transaction.transfer_date;
          break;
        default:
          val = '';
      }
      return !val
        ? false
        : val.toLowerCase().includes(filtered[i].value.toLowerCase());
    });
  }
  return newArr;
};

const trsFormatter = (sorted: sort[], filtered: filter[]) => {
  let result: transaction[] = transactions.slice();

  result = Filter(result, filtered);
  if (sorted.length > 0) {
    result = Sorter(result, sorted);
  }
  return result;
};

app.use(express.json());

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.post('/data', (req, res) => {
  const page = req.body.page ? req.body.page : 0;
  const pageSize = req.body.pageSize ? req.body.pageSize : 20;

  res.end(
    JSON.stringify({
      data: trsFormatter(req.body.sorted, req.body.filtered).slice(
        page * pageSize,
        (page + 1) * pageSize
      ),
      pages: Math.ceil(transactions.length / pageSize)
    })
  );
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
