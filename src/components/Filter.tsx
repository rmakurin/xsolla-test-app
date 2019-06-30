import React from 'react';

const SortTypes = {
  up: '↑',
  down: '↓',
  none: '↕'
};

const Filter: React.FC = () => {
  return (
    <div className='filter cell-content'>
      <input type='text' className='filter__input' placeholder='(фильтр)' />
      <div className='filter__sort_wrapper'>
        <div className='filter__sort'>{SortTypes.none}</div>
      </div>
    </div>
  );
};

export default Filter;
