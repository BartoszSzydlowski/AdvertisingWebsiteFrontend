import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GetCategory from '../../components/category/categorySelect';

const SearchAdverts: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<number>(1);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<{
    pathname?: string;
    search?: string;
  }>({ pathname: '/search', search: '' });

  useEffect(() => {
    buildUrlParams();
  }, [filter, category, checkbox]);

  const buildUrlParams = () => {
    if (!checkbox) {
      if (filter) {
        const buildUrl = `filter=${filter}`;
        setSearchParams({ ...searchParams, search: buildUrl });
      } else {
        setSearchParams({ ...searchParams, search: '' });
      }
    } else {
      if (filter) {
        const buildUrl = `filter=${filter}&categoryId=${category}`;
        setSearchParams({ ...searchParams, search: buildUrl });
      } else {
        const buildUrl = `categoryId=${category}`;
        setSearchParams({ ...searchParams, search: buildUrl });
      }
    }
  };

  return (
    <>
      <div
        style={{
          height: '70%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>
          <div>Search here</div>
          <div style={{ margin: '5px' }}>
            <textarea
              className="form-control"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div style={{ margin: '5px' }}>
            <input
              className="form-check-label"
              type="checkbox"
              checked={checkbox}
              onChange={e => {
                setCheckbox(e.target.checked);
              }}
            />
            Should include category
          </div>
          {checkbox && (
            <>
              <div>Select category: </div>
              <div style={{ margin: '0 auto' }}>
                <GetCategory
                  onChange={e => {
                    setCategory(parseInt(e.target.value));
                  }}
                />
              </div>
            </>
          )}
        </div>
        <Link to={searchParams}>
          <input className="btn btn-dark" type="submit" value="Search" />
        </Link>
      </div>
    </>
  );
};

export default SearchAdverts;
