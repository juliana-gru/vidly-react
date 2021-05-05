const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>      
      {items.map(item => {
        return <li 
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={ selectedItem[textProperty] === item[textProperty] ? "list-group-item active" : "list-group-item"} 
          >{item[textProperty]}
        </li>
      })}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};
 
export default ListGroup;