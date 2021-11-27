import { useEffect, useState, useLayoutEffect } from 'react';

import apiAxios from 'src/utils/apiAxios';

export const useFetchData = (
  url = '',
  method = 'get',
  dependancies = [],
  queryObject = {}
) => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      if (method === 'post') {
        let data = await apiAxios.post('data', queryObject);

        setData(data.data);
      } else {
        const data = await apiAxios.get(url);

        setData(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!url) return;
    if (
      method === 'post' &&
      (!queryObject.dimension || !queryObject.measures.length)
    )
      return;
    fetchData();
  }, dependancies);

  return data;
};
