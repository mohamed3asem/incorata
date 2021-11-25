import ErrorBoundry from 'src/components/ErrorBounderies/ErrorBoundary';

export const SingleColumnItem = ({ item }) => {
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData('item_id', target.id);

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
        onDragStart={dragStart}
        id={item.function}
        onDragOver={dragOver}
      >
        {item.name || ''}
      </div>
    </ErrorBoundry>
  );
};
