import { useCallback } from 'react';
import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';

export const SingleColumnItem = ({ item }) => {
  const dragStart = useCallback((e, item) => {
    if (!item.function || !item.name) return;
    e.dataTransfer.setData('item_function', item.function);
    e.dataTransfer.setData('item_name', item.name);
  }, []);

  const dragOver = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <ErrorBoundry>
      <div
        draggable
        data-testid={`column-${item.name}`}
        onDragStart={(e) => dragStart(e, item)}
        id={item.name}
        onDragOver={dragOver}
        style={{
          background: item.function === 'dimension' ? '#CFFCFF' : '#AAEFDF',
        }}
      >
        {item.name || ''}
      </div>
    </ErrorBoundry>
  );
};
