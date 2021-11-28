import './ColumnsContainer.css';
import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';
import { SingleColumnItem } from './SingleColumnItem/SingleColumnItem';
import { useFetchData } from 'src/hooks/fetchData';

export const ColumnsContainer = () => {
  const columns = useFetchData('columns', []);

  if (!columns || !columns.length) return null;

  return (
    <div className="columnsContainer" id="columnsContainer">
      <h2>columns</h2>
      <ErrorBoundry>
        {columns.map((item, index) => (
          <SingleColumnItem item={item} key={item.name || index} />
        ))}
      </ErrorBoundry>
    </div>
  );
};
