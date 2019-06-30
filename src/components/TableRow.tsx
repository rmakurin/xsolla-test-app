import React from 'react';

interface ITableRowProps {
  projectName: string;
  userName: string | null;
  payMethod: string;
  date: Date;
  status: string;
}

const dateFormatter = (date: Date) => {
  return `${date.getFullYear()}/\
${`0${date.getMonth() + 1}`.slice(-2)}/\
${`0${date.getDate()}`.slice(-2)} - \
${`0${date.getHours()}`.slice(-2)}:\
${`0${date.getMinutes()}`.slice(-2)}:\
${`0${date.getSeconds()}`.slice(-2)}`;
};

const TableRow: React.FC<ITableRowProps> = props => {
  return (
    <div className='transaction table-row'>
      <div className='table-cell'>
        <div className='transaction__name cell-content'>
          {props.projectName}
        </div>
      </div>
      <div className='table-cell'>
        <div className='transaction__username cell-content'>
          {props.userName}
        </div>
      </div>
      <div className='table-cell'>
        <div className='transaction__pay-method cell-content'>
          {props.payMethod}
        </div>
      </div>
      <div className='table-cell'>
        <div className='transaction__date cell-content'>
          {dateFormatter(props.date)}
        </div>
      </div>
      <div className='table-cell'>
        <div className='transaction__status cell-content'>{props.status}</div>
      </div>
    </div>
  );
};

export default TableRow;
