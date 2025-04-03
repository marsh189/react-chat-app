import { useEffect, useState } from 'react';
import Chat from './Chat';
import WaitingRoom from './WaitingRoom';

function ChatRoom({ socket, user, roomData }) {
  const [isReady, setIsReady] = useState(false);
  const [chatting, setChatting] = useState(false);

  useEffect(() => {
    socket.on('ready', () => {
      setIsReady(true);
    });

    socket.on('chatStarted', () => {
      setChatting(true);
    });
  }, [socket]);

  const startChat = () => {
    socket.emit('startRoom', roomData.name);
    setChatting(true);
  };

  return (
    <>
      {chatting ? (
        <Chat socket={socket} user={user} roomData={roomData} />
      ) : (
        <WaitingRoom
          roomData={roomData}
          isReady={isReady}
          startChat={startChat}
        />
      )}
    </>
  );
}
export default ChatRoom;
