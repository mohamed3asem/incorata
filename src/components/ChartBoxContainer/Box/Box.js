import './Box.css';

export const Box = ({
  title = '',
  change,
  boxFunction = '',
  dimension,
  measures,
}) => {
  const drop = (e) => {
    const itemFunction = e.dataTransfer.getData('item_function');
    const itemName = e.dataTransfer.getData('item_name');

    if (itemFunction !== boxFunction) return;

    if (boxFunction === 'dimension') {
      change(itemName);
    } else {
      change((prev) => {
        let newArr = [...prev, itemName];
        return newArr;
      });
    }

    const item = document.getElementById(itemName);
    item.style.display = 'block';

    e.target.appendChild(item);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const clear = () => {
    if (boxFunction === 'dimension') {
      const column = document.getElementById('columnsContainer');
      const el = document.getElementById(dimension);
      column.appendChild(el);
      change(null);
    } else {
      measures.forEach((measure) => {
        const column = document.getElementById('columnsContainer');
        const el = document.getElementById(measure);
        column.appendChild(el);
      });
      change([]);
    }
  };

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
};
