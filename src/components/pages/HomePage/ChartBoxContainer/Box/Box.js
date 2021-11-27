import './Box.css';

export const Box = ({ title = '', change, boxFunction = '' }) => {
  const drop = (e) => {
    const itemFunction = e.dataTransfer.getData('item_function');
    const itemName = e.dataTransfer.getData('item_name');

    if (itemFunction !== boxFunction) return;

    if (title === 'dimension') {
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

  //   const clear = () => {
  //    const item = document.getElementById(itemName);
  //   }
  return (
    <div className="boxContainer">
      <h6 className="title">{title}</h6>
      <div className="box" id="board" onDrop={drop} onDragOver={dragOver}></div>
      {/* <button onClick={clear}>clear</button> */}
    </div>
  );
};
