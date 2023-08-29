import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../configs/firebaseConfig';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

 async function sendMessage(roomId, currentUser, text) {
    try {
        await addDoc(collection (db, 'chat-rooms', roomId, 'messages'), {
            uid: currentUser.id,
            displayName: currentUser.username,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
        console.log("Đã gửi tin nhắn");
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        }
    );
}


export { sendMessage, getMessages }
