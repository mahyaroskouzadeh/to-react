export const TaskItem = ({ item, onDelete, oncheck }) => {
  return (
    <li>
      <span className={`${item.isDone ? "checkinput" : ""}`}>{item.name}</span>
      <span style={{ marginLeft: "90px" }} onClick={() => onDelete(item.id)}>
        ashghal
      </span>
      <input
        type="checkbox"
        checked={item.isDone}
        onClick={() => oncheck(item.id)}
      />
    </li>
  );
};
