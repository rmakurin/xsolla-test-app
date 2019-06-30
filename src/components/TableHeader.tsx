import React from 'react';

interface ITableHeaderProps {
  projectNameTitle: string;
  payMethodTitle: string;
  statusTitle: string;
  userNameTitle: string;
  dateTitle: string;
}

const TableHeader: React.FC<ITableHeaderProps> = props => {
  return (
    <div className='table-header table-row'>
      <div className='table-cell'>
        <div className='transaction__name cell-content'>
          {props.projectNameTitle}
        </div>
      </div>
      <div className='table-cell'>
        <div className='transaction__username cell-content'>
          {props.userNameTitle}
        </div>
      </div>
      <div className='table-cell'>
        <div className='transaction__pay-method cell-content'>
          {props.payMethodTitle}
        </div>
      </div>
      <div className='table-cell'>
        <div className='transaction__date cell-content'>{props.dateTitle}</div>
      </div>
      <div className='table-cell'>
        <div className='transaction__status cell-content'>
          {props.statusTitle}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
