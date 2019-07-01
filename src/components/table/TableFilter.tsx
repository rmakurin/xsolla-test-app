import React from 'react';
import Filter from './Filter';

const TableFilter: React.FC = () => {
  return (
    <div className='table-row table-filter'>
      <div className='table-cell'>
        <Filter />
      </div>
      <div className='table-cell'>
        <Filter />
      </div>
      <div className='table-cell'>
        <Filter />
      </div>
      <div className='table-cell'>
        <Filter />
      </div>
      <div className='table-cell'>
        <Filter />
      </div>
    </div>
  );
};

export default TableFilter;
