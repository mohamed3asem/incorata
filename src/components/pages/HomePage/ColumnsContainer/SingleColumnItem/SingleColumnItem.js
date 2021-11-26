import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';

export const SingleColumnItem = ({ item }) => {
  const dragStart = (e, item) => {
    e.dataTransfer.setData('item_function', item.function);
    e.dataTransfer.setData('item_name', item.name);

    //  setTimeout(() => {
    //    target.style.display = 'none';
    //  }, 0);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  return (
    <ErrorBoundry>
      <div
        draggable
        onDragStart={(e) => dragStart(e, item)}
        id={item.function}
        onDragOver={dragOver}
      >
        {item.name || ''}
      </div>
    </ErrorBoundry>
  );
};
