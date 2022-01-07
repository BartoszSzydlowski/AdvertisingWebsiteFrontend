import React from 'react';

const NumberList = (props: any) => {
  const numbers = props.numbers;
  const listItems = numbers.map((number: any) => (
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
  return listItems;
};

const Pagination = (props: any) => {
  //const [activePage, setActivePage] = useState(1);
  const pageNumbers = props.pageNumbers;
  const numbers: number[] = [];

  for (let i = 1; i <= pageNumbers; i++) {
    numbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className="pagination justify-content-center mt-5">
          <li className="page-item">
            <input
              type="submit"
              value="Previous"
              className="page-link"
              onClick={() => {
                if (props.activePage > 1) {
                  props.setActivePage(props.activePage - 1);
                }
              }}
            />
          </li>
          <NumberList
            numbers={numbers}
            activePage={props.activePage}
            onClick={props.onClick}
          />
          <li className="page-item">
            <input
              type="submit"
              value="Next"
              className="page-link"
              onClick={() => {
                if (props.activePage < pageNumbers) {
                  props.setActivePage(props.activePage + 1);
                }
              }}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
