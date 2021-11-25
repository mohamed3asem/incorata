import './Box.css';

export const Box = ({ title = '' }) => {
  const drop = (e) => {
    console.log('pass');
    e.preventDefault();

    const itemId = e.dataTransfer.getData('item_id');
    if (itemId !== title) return;
    const item = document.getElementById(itemId);
    item.style.display = 'block';

    e.target.appendChild(item);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="boxContainer">
      <h6 className="title">{title}</h6>
      <div className="box" id="board" onDrop={drop} onDragOver={dragOver}></div>
    </div>
  );
};
