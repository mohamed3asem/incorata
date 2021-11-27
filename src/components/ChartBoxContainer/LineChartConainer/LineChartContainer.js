import { useState, useEffect, memo } from 'react';

import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';
import { LineChart } from 'src/components/Charts/LineChart/LineChart';
import { useFetchData } from 'src/hooks/fetchData';
import { formulateGraphData } from 'src/utils/helperFunctions';

export const LineChartContainer = memo(
  ({ dimension, measures }) => {
    const [chartData, setChartData] = useState([]);

    const rawData = useFetchData(
      'data',
      'post',
      [dimension, measures, 'post', 'data'],
      {
        measures,
        dimension,
      }
    );

    useEffect(() => {
      if (rawData) {
        const chartData = formulateGraphData(rawData, dimension);
        setChartData(chartData);
      }
    }, [rawData]);

    if (!chartData.length || !dimension || !measures.length) return null;

    return (
      <ErrorBoundry>
        <LineChart
          chartData={chartData}
          dimension={dimension}
          measures={measures}
        />
      </ErrorBoundry>
    );
  },
  (prevProps, nextProps) => {
    if (!nextProps.dimension || !nextProps.measures.length) return true;
  }
);
