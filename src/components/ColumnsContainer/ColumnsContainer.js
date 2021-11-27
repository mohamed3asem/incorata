import { useEffect, useState } from 'react';

import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';
import apiAxios from 'src/utils/apiAxios';
import { SingleColumnItem } from './SingleColumnItem/SingleColumnItem';
import './ColumnsContainer.css';

export const ColumnsContainer = () => {
  const [columns, setColumns] = useState([]);

  const fetchData = async () => {
    try {
      const data = await apiAxios.get('columns');

      setColumns(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="columnsContainer" id="columnsContainer">
      <h2>columns</h2>
      <ErrorBoundry>
        {columns.map((item, index) => (
          <SingleColumnItem item={item} key={item.name || index} />
        ))}
      </ErrorBoundry>
    </div>
  );
};
