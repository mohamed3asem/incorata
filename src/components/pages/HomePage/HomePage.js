import { ColumnsContainer } from './ColumnsContainer/ColumnsContainer';
import { ChartBoxContainer } from './ChartBoxContainer/ChartBoxContainer';
import './HomePage.css';

export const HomePage = () => {
  return (
    <main className="root">
      <ColumnsContainer />
      <ChartBoxContainer />
    </main>
  );
};
