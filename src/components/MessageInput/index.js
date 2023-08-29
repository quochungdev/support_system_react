import React, { useContext } from 'react';
import './style.css';
import { MyUserContext } from '../../App';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../configs/firebaseConfig';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { sendMessage } from '../../services/firebase';
import { Button } from 'react-bootstrap';



function MessageInput({ roomId }) {
    const [currentUser] = useContext(MyUserContext);
    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(roomId, currentUser, value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Nhập tin nhắn ..."
                value={value}
                onChange={handleChange}
                className="message-input bg-slate-200 mb-2"
                required
                minLength={1}
            />
            <Button type="submit" disabled={value < 1} className="send-message !bg-blue-800">
                Send
            </Button>
        </form>
    );
}
export { MessageInput };