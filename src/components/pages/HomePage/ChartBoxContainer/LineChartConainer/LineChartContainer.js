import { useState, useEffect } from 'react';

import apiAxios from 'src/utils/apiAxios';
import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';
import { LineChart } from 'src/components/Charts/LineChart/LineChart';

export const LineChartContainer = () => {
  const [charData, setChartData] = useState([]);
  const fetchData = async () => {
    let data = await apiAxios.post('data', {
      measures: ['Cost'],
      dimension: 'Year',
    });
    data = data.data;

    // this need to be redited accoring to product
    let dimension = data.find((item) =>
      ['Product', 'Year', 'Country'].includes(item.name)
    );

    let chartData = [];
    dimension.values.forEach((element) => {
      chartData.push({ dimension: element });
    });

    data.forEach(({ name, values }) => {
      name = name === 'Units sold' ? 'UnitsSold' : name;
      if (['Product', 'Year', 'Country'].includes(name)) return;
      values.forEach((item, index) => {
        chartData[index][name] = +item.toFixed(1);
      });
    });

    console.log(chartData);
    setChartData(chartData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!charData.length) return null;
  return (
    <ErrorBoundry>
      <LineChart chartData={charData} />
    </ErrorBoundry>
  );
};
