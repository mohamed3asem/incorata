import { useState } from 'react';
import { Box } from './Box/Box';
import { LineChartContainer } from './LineChartConainer/LineChartContainer';

import './ChartBoxContainer.css';

export const ChartBoxContainer = () => {
  const [measures, setMeasures] = useState([]);
  const [dimension, setDimension] = useState();

  return (
    <div className="chartBoxContainer">
      <Box
        title="dimension"
        changeData={setDimension}
        boxFunction="dimension"
        dimension={dimension}
        measures={measures}
      />
      <Box
        title="measures"
        changeData={setMeasures}
        boxFunction="measure"
        measures={measures}
        dimension={dimension}
      />

      <LineChartContainer measures={measures} dimension={dimension} />
    </div>
  );
};
