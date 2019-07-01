import React from 'react';
import { NavLink } from 'react-router-dom';

const Wrapper: React.FC = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <NavLink
          className='App-link'
          activeClassName='Selected'
          exact
          to='/'
          href='#List'
        >
          Список транзакций
        </NavLink>
        <NavLink
          className='App-link'
          activeClassName='Selected'
          exact
          to='/rating'
          href='#PaymentRaiting'
        >
          Рейтинг платежных систем
        </NavLink>
        <NavLink
          className='App-link'
          activeClassName='Selected'
          exact
          to='/chart'
          href='#PaymentGraph'
        >
          График популярности
        </NavLink>
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Wrapper;
