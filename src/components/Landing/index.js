import { Link } from 'react-router-dom';
import { chatRooms } from '../chatRooms';

import './style.css'
function Landing() {
    return (
        <>
            <h2 className='font-bold text-blue-500 text-5xl mb-5'>Chọn phòng Chat</h2>
            <ul className="chat-room-list">
                {chatRooms.map((room) => (
                    <li className='bg-blue-200' key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export { Landing };