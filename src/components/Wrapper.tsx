import React from 'react';
import { NavLink } from 'react-router-dom';

const Wrapper: React.FC = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App-link-wrapper'>
          <NavLink className='App-link' activeClassName='Selected' exact to='/'>
            Список транзакций
          </NavLink>
        </div>
        <div className='App-link-wrapper'>
          <NavLink
            className='App-link'
            activeClassName='Selected'
            exact
            to='/rating'
          >
            Рейтинг платежных систем
          </NavLink>
        </div>
        <div className='App-link-wrapper'>
          <NavLink
            className='App-link'
            activeClassName='Selected'
            exact
            to='/list'
          >
            Список проектов
          </NavLink>
        </div>
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Wrapper;
