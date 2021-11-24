import { ColumnsContainer } from './ColumnsContainer/ColumnsContainer';

import './HomePage.css';

export const HomePage = () => {
  return (
    <div className="root">
      <ColumnsContainer />
      <div style={{ flex: 5 }}></div>
    </div>
  );
};
