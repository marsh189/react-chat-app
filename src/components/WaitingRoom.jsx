import { useEffect, useState } from 'react';

function WaitingRoom({ roomData, isReady, startChat }) {
  const [users, setUsers] = useState([roomData.users]);

  useEffect(() => {
    console.log(roomData.users);
    setUsers(roomData.users);
  }, [roomData]);
  return (
    <div>
      <h1>Waiting Area</h1>
      <ul>
        {users.map((user, i) => {
          return <li key={i}>{user.name}</li>;
        })}
      </ul>
      <div>
        <button>Leave Room</button>
        {isReady ? (
          <button
            onClick={() => {
              startChat();
            }}
          >
            Start Chatting
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default WaitingRoom;
