function Room({ data, onRoomClicked }) {
  return (
    <div
      className="roomItem"
      onClick={() => {
        onRoomClicked(data);
      }}
    >
      <h3>{data.name}</h3>
      <p>{data.users.length} currently in room.</p>
    </div>
  );
}
export default Room;
