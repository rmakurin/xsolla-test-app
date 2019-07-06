import React, { Component } from 'react';
import Wrapper from './Wrapper';

const Projects = [
  'Red Sauce 3',
  'God of Peace',
  'Super Farm',
  'World of Xsolla',
  'Half-Life 3',
  'Storefront',
  'Awesome Game 2',
  'LiF',
  'Gemini'
];

class List extends Component {
  render() {
    return (
      <Wrapper>
        <ul className='List'>
          {Projects.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </Wrapper>
    );
  }
}

export default List;
