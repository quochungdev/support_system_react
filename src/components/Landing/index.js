import { Link } from 'react-router-dom';
import { chatRooms } from '../chatRooms';

import './style.css'
import { useContext } from 'react';
import { MyUserContext } from '../../App';
function Landing() {
    const [user] = useContext(MyUserContext);

    return (
        <>
            <h2 className='font-bold text-blue-500 text-5xl mb-5'>Chọn phòng Chat</h2>
            <ul className="chat-room-list">
                { user ? chatRooms.map((room) => (
                    <li className='bg-blue-200' key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                )) : <Link className='text-2xl' to={'/dangnhap'}>VUI LÒNG ĐĂNG NHẬP ĐỂ SỬ DỤNG PHÒNG CHAT</Link>
            }
            </ul>
        </>
    );
}

export { Landing };