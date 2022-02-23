import React from 'react';
import NumberList from './numberList';

interface IPaginationProps {
  pageNumbers: number;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  onClick: React.MouseEventHandler<HTMLInputElement> | undefined;
}

const Pagination: React.FC<IPaginationProps> = props => {
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
