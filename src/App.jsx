import { useEffect, useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import ChatRoom from './components/ChatRoom';
import { io } from 'socket.io-client';

const socket = io('https://chatapp-server-kv5o.onrender.com');

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({ name: '', room: '' });
  const [room, setRoom] = useState({ name: '', users: '' });

  const onNewUserCreated = (newUser, roomData) => {
    console.log(newUser.name);
    setUser(newUser);
    setRoom({ name: roomData.name, users: roomData.users });
    setIsAuth(true);
  };

  useEffect(() => {
    socket.on('updateRoom', (roomData) => {
      setRoom(roomData);
    });
  }, [socket]);

  return (
    <main>
      {isAuth ? (
        <ChatRoom socket={socket} user={user} roomData={room} />
      ) : (
        <Menu socket={socket} onNewUserCreated={onNewUserCreated} />
      )}
    </main>
  );
}

export default App;
