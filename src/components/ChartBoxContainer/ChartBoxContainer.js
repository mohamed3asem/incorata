import { useState } from 'react';
import { Box } from './Box/Box';
import { LineChartContainer } from './LineChartConainer/LineChartContainer';

import './ChartBoxContainer.css';

export const ChartBoxContainer = () => {
  const [measures, setMeasures] = useState([]);
  const [dimension, setDimension] = useState();

  return (
    <div className="chartBoxContainer">
      <Box title="dimension" change={setDimension} boxFunction="dimension" />
      <Box title="measures" change={setMeasures} boxFunction="measure" />

      <LineChartContainer measures={measures} dimension={dimension} />
    </div>
  );
};
