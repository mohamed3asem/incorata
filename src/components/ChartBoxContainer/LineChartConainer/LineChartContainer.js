import { useState, useEffect } from 'react';

import apiAxios from 'src/utils/apiAxios';
import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';
import { LineChart } from 'src/components/Charts/LineChart/LineChart';

export const LineChartContainer = ({ dimension, measures }) => {
  const [charData, setChartData] = useState([]);

  const fetchData = async (dimension, measures) => {
    let data = await apiAxios.post('data', {
      measures,
      dimension,
    });
    data = data.data;

    let dimensions = data.find(({ name }) => name === dimension);

    let chartData = [];
    dimensions.values.forEach((element) => {
      chartData.push({ dimension: element });
    });

    data.forEach(({ name, values }) => {
      name = name === 'Units sold' ? 'UnitsSold' : name;
      if (name === dimension) return;
      values.forEach((item, index) => {
        chartData[index][name] = +item.toFixed(1);
      });
    });

    setChartData(chartData);
  };

  useEffect(() => {
    if (dimension && measures.length) {
      fetchData(dimension, measures);
    }
  }, [dimension, measures]);

  if (!charData.length) return null;
  return (
    <ErrorBoundry>
      <LineChart
        chartData={charData}
        dimension={dimension}
        measures={measures}
      />
    </ErrorBoundry>
  );
};
