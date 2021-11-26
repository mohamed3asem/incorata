import { useState } from 'react';
import { Box } from './Box/Box';
import { LineChartContainer } from './LineChartConainer/LineChartContainer';

import './ChartBoxContainer.css';

export const ChartBoxContainer = () => {
  const [measure, setMeasures] = useState([]);
  const [dimension, setDimension] = useState();

  console.log(measure);
  console.log(dimension);
  return (
    <div className="chartBoxContainer">
      <Box title="dimension" change={setDimension} />
      <Box title="measure" change={setMeasures} />

      <LineChartContainer />
    </div>
  );
};
