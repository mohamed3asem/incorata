import { Box } from './Box/Box';
import { LineChart } from 'src/components/Charts/LineChart/LineChart';

import './ChartBoxContainer.css';

export const ChartBoxContainer = () => {
  return (
    <div className="chartBoxContainer">
      <Box title="dimension" />
      <Box title="measure" />

      <LineChart />
    </div>
  );
};
