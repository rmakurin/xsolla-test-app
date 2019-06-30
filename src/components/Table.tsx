import React from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import transactions from '../../data/data.json';
import TableFilter from './TableFilter';

const headers = {
  projectNameTitle: 'Проект',
  payMethodTitle: 'Платежная система',
  statusTitle: 'Статус',
  userNameTitle: 'Пользователь',
  dateTitle: 'Дата'
};

const Table: React.FC = () => {
  const createTable = () => {
    return transactions.map(el => (
      <TableRow
        key={el.transaction.id}
        projectName={el.transaction.project.name}
        date={new Date(el.transaction.transfer_date)}
        userName={el.user.name}
        payMethod={el.transaction.payment_method.name}
        status={el.transaction.status}
      />
    ));
  };

  return (
    <div className='Table'>
      <TableHeader
        projectNameTitle={headers.projectNameTitle}
        payMethodTitle={headers.payMethodTitle}
        statusTitle={headers.statusTitle}
        userNameTitle={headers.userNameTitle}
        dateTitle={headers.dateTitle}
      />
      <TableFilter />
      {createTable()}
    </div>
  );
};

export default Table;
