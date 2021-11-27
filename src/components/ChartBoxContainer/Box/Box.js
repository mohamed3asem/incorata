import { useCallback, memo } from 'react';
import './Box.css';

export const Box = memo(
  ({ title = '', changeData, boxFunction = '', dimension, measures }) => {
    const drop = useCallback(
      (e) => {
        const itemFunction = e.dataTransfer.getData('item_function');
        const itemName = e.dataTransfer.getData('item_name');

        if (itemFunction !== boxFunction) return;

        if (boxFunction === 'dimension') {
          changeData(itemName);
        } else {
          changeData((prev) => {
            let newArr = [...prev, itemName];
            return newArr;
          });
        }

        const item = document.getElementById(itemName);
        item.style.display = 'block';

        e.target.appendChild(item);
      },
      [boxFunction]
    );

    const dragOver = useCallback((e) => {
      e.preventDefault();
    }, []);

    const clear = useCallback(() => {
      const columnsContainer = document.getElementById('columnsContainer');
      if (!columnsContainer) return;
      if (boxFunction === 'dimension') {
        const transferedElement = document.getElementById(dimension);
        if (!transferedElement) return;
        columnsContainer.appendChild(transferedElement);
        changeData(null);
      } else {
        measures.forEach((measure) => {
          const transferedElement = document.getElementById(measure);
          if (!transferedElement) return;
          columnsContainer.appendChild(transferedElement);
        });
        changeData([]);
      }
    }, [dimension, measures, boxFunction]);

    return (
      <div className="boxContainer">
        <h6 className="title">{title}</h6>
        <div
          className="box"
          id="board"
          onDrop={drop}
          onDragOver={dragOver}
          style={{
            background: boxFunction === 'dimension' ? '#CFFCFF' : '#AAEFDF',
          }}
        ></div>
        <button onClick={clear} className="clearBtn">
          clear
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (nextProps.boxFunction === 'dimension') {
      if (prevProps.dimension === nextProps.dimension) return true;
    } else {
      if (prevProps.measures.length === nextProps.measures.length) return true;
    }
  }
);
