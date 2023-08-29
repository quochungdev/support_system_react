// import { initializeApp } from 'firebase/app';
// import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
// import { firebaseConfig } from '../configs/firebaseConfig';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

//  async function sendMessage(roomId, currentUser, text) {
//     try {
//         await addDoc(collection (db, 'chat-rooms', roomId, 'messages'), {
//             uid: currentUser.id,
//             displayName: currentUser.username,
//             text: text.trim(),
//             timestamp: serverTimestamp(),
//         });
//         console.log("Đã gửi tin nhắn");
//     } catch (error) {
//         console.error(error);
//     }
// }

// export { sendMessage }
