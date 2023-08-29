import { Link, useParams } from "react-router-dom";
import { chatRooms } from "../chatRooms";
import './style.css'
import { MessageInput } from "../MessageInput";
import { MessageList } from "../MessageList";

function ChatRoom() {
  const params = useParams();
  const room = chatRooms.find((x) => x.id === params.id);
  if(!room){
    //404
  }

  

 return (
        <>
            <h2>{room.title}</h2>
            <div>
                <Link to="/">⬅️ Back to all rooms</Link>
            </div>
            <div className="messages-container ">
              <MessageInput roomId={room.id}/>
              <MessageList roomId={room.id}/>
            </div>
        </>
    );
}

export { ChatRoom };