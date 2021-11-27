import { useEffect, useState } from 'react';

import './ColumnsContainer.css';
import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';
import apiAxios from 'src/utils/apiAxios';
import { SingleColumnItem } from './SingleColumnItem/SingleColumnItem';
import { useFetchData } from 'src/hooks/fetchData';

export const ColumnsContainer = () => {
  // const [columns, setColumns] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const data = await apiAxios.get('columns');

  //     setColumns(data.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const columns = useFetchData('columns', ['columns']);

  if (!columns || !columns.length) return null;

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
