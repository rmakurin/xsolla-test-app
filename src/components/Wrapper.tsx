import React from 'react';
import { NavLink } from 'react-router-dom';

const Wrapper: React.FC = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App-link-wrapper'>
          <NavLink
            className='App-link'
            activeClassName='Selected'
            exact
            to='/'
            href='#List'
          >
            Список транзакций
          </NavLink>
        </div>
        <div className='App-link-wrapper'>
          <NavLink
            className='App-link'
            activeClassName='Selected'
            exact
            to='/rating'
            href='#PaymentRaiting'
          >
            Рейтинг платежных систем
          </NavLink>
        </div>
        <div className='App-link-wrapper'>
          <NavLink
            className='App-link'
            activeClassName='Selected'
            exact
            to='/chart'
            href='#PaymentGraph'
          >
            График популярности
          </NavLink>
        </div>
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Wrapper;
