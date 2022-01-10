import React from 'react';

interface INumberListProps { 
  numbers: number[],
  activePage: number,
  onClick: React.MouseEventHandler<HTMLInputElement> | undefined
}

const NumberList: React.FC<INumberListProps> = (props) => {
  const numbers = props.numbers;
  const listItems = numbers.map((number: number) => (
    <li
      key={number.toString()}
      className={props.activePage === number ? 'page-item active' : 'page-item'}
    >
      <input
        type="submit"
        value={number}
        className="page-link"
        onClick={props.onClick}
      />
    </li>
  ));
  return <>{listItems}</>;
};

export default NumberList;