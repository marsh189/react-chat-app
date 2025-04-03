import { useEffect, useState, useRef } from 'react';
import Room from './Room';

function Menu({ socket, onNewUserCreated }) {
  const [mode, setMode] = useState('');
  const [openRooms, setOpenRooms] = useState([]);

  const usernameRef = useRef();
  const roomRef = useRef();

  useEffect(() => {
    socket.on('error', (message) => {
      alert(message);
    });

    socket.on('joinedRoom', (roomData) => {
      const username = usernameRef.current.value;
      onNewUserCreated({ name: username, room: roomData.name }, roomData);
    });

    socket.on('roomsList', (roomsList) => {
      setOpenRooms(roomsList);
    });
  }, [socket, openRooms]);

  const createNewRoom = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const room = roomRef.current.value;
    socket.emit('createRoom', { name: username, roomName: room });
  };

  const onRoomClicked = (room) => {
    const username = usernameRef.current.value;

    if (username !== '') {
      console.log(room.name);
      socket.emit('joinRoom', { name: username, roomName: room.name });
    } else {
      alert('Please Enter a Username!');
    }
  };

  const handleModeSwitch = () => {
    if (mode === 'create') {
      return (
        <div className="menu">
          <form onSubmit={createNewRoom}>
            <input required ref={usernameRef} placeholder="Enter Username..." />
            <input required ref={roomRef} placeholder="Enter Room Name..." />
            <button type="submit">Create</button>
          </form>
          <button
            className="back"
            onClick={() => {
              setMode('');
            }}
          >
            Back
          </button>
        </div>
      );
    } else if (mode === 'join') {
      console.log(openRooms);
      return (
        <div className="menu">
          <input
            className="usernameInpt"
            ref={usernameRef}
            placeholder="Enter Username..."
          />
          <h3>Open Rooms</h3>
          {openRooms.map((room, i) => {
            return <Room key={i} data={room} onRoomClicked={onRoomClicked} />;
          })}
          <button
            className="back"
            onClick={() => {
              setMode('');
            }}
          >
            Back
          </button>
        </div>
      );
    } else {
      return (
        <div className="menu">
          <button
            onClick={() => {
              setMode('create');
            }}
          >
            Create a Room
          </button>
          <button
            onClick={() => {
              setMode('join');
            }}
          >
            Join a Room
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      {handleModeSwitch()}
    </div>
  );
}
export default Menu;
