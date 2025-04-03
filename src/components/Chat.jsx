import { useEffect, useRef, useState } from 'react';

function Chat({ socket, user, roomData }) {
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef();

  useEffect(() => {
    socket.on('message', ({ name, text, time }) => {
      const newMsg = { name, text, time };
      console.log(user.name + ' ' + name);
      setMessageList((msgs) => [...msgs, newMsg]);
    });
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    const msg = messageRef.current.value;
    if (msg != '') {
      socket.emit('message', { text: msg });
    }
    messageRef.current.value = '';
  };

  const displayMessage = (message, i) => {
    let className = 'post';
    if (message.name === user.name) className = 'post post--left';
    else if (message.name !== user.name && message.name !== 'Admin')
      className = 'post post--right';
    if (message.name !== 'Admin') {
      let divClass =
        'post__header' +
        (message.name === user.name
          ? ' post__header--user'
          : ' post__header--reply');

      return (
        <li className={className} key={i}>
          <div className={divClass}>
            <span className="post__header--name">{message.name}</span>
            <span className="post__header--time">{message.time}</span>
          </div>
          <div className="post__text">{message.text}</div>
        </li>
      );
    } else {
      return (
        <li className={className} key={i}>
          <div className="post__text">{message.text}</div>
        </li>
      );
    }
  };

  const showUsers = () => {
    let text = '';
    roomData.users.forEach((user, i) => {
      text += user.name;
      if (roomData.users.length > 1 && i !== roomData.users.length - 1) {
        text += ',';
      }
    });
    return (
      <p className="user-list">
        <em>Users in {roomData.name}:</em>
        {text}
      </p>
    );
  };

  return (
    <>
      <ul className="chat-display">
        {messageList.map((message, i) => {
          return displayMessage(message, i);
        })}
      </ul>
      {showUsers()}
      <p className="activity"></p>
      <form className="form-message" onSubmit={sendMessage}>
        <input
          type="text"
          id="message"
          placeholder="Enter Message..."
          required
          ref={messageRef}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
export default Chat;
