import { useEffect, useState } from 'react';

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
    <div className="columnsContainer">
      <h2>columns</h2>
      {columns.map((item) => (
        <SingleColumnItem item={item} key={item.name} />
      ))}
    </div>
  );
};
