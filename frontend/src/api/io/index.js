import { io } from "socket.io-client";

let socket;
if (process.env.NODE_ENV === 'development') {
  const URL = "http://localhost:3000";
  socket = io(URL, { autoConnect: false });
} else {
  socket = io();
}

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;