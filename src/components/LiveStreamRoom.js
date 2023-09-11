import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Entry from './Entry';
import Bell from './Bell';
import Apis, { authApi, endpoints } from '../configs/Apis';
import { toastError, toastSuccess } from './Toast/Notification';

import { format, getTimezoneOffset } from 'date-fns-tz';
import parse from "date-fns/parse";
import ModalCreateQuestion from './ModalCreateQuestion';
import { ToastContainer } from 'react-toastify';
import QuestionPage from './QuestionPage';

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  
  export function getUrlParams(
    url = window.location.href
  ) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
  }
    

const LiveStreamRoom = () => {
  const [showModal, setShowModal] = useState(false);
  const [liveStreams, setLiveStreams] = useState([]);
  const [livestreamStarted, setLivestreamStarted] = useState(false); // Biến để theo dõi xem livestream đã bắt đầu chưa
  const [selectedLiveId, setSelectedLiveId] = useState(null); // Tạo state để lưu selectedLiveId
  const [selectedLiveName, setSelectedLiveName] = useState(null); 
  
  const [timeLivestream, setTimeLivestream] = useState();
  const [dateLivestream, setDateLivestream] = useState();
  const [thumbnailLive, setThumbnailLive] = useState(null)

  const updateTimeLivestream = async (livestream,time,date) => {
    console.log(date);
    console.log(time);
    const formData = new FormData();
    formData.append("id", 6); 
    formData.append("date", date); 
    formData.append("time", time); 
    formData.append("facultyId", 2); 

     // Kiểm tra nếu thumbnailArticle có giá trị (đã thay đổi) thì mới thêm vào FormData
  if (thumbnailLive) {
    formData.append("thumbnail", thumbnailLive);
  } else {
    // Nếu không thay đổi thì sử dụng giá trị từ article.thumbnail
    const blob = await fetch(livestream.thumbnail).then((res) => res.blob());
    const file = new File([blob], "thumbnail.jpg"); // Đặt tên và loại tệp theo ý muốn
    formData.append("thumbnail", file);
  }

    try {
      let res = await authApi().post(endpoints['update_livestream'] , formData)
      console.log(res.data);  
      console.log("Update data");
      toastSuccess("CẬP NHẬT THÀNH CÔNG")
    } catch (ex) {
        console.error(ex);
        toastError("CẬP NHẬT THẤT BẠI")
    } 
   }

   const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; // Lấy tệp được chọn
    setThumbnailLive(selectedFile); // Lưu File object vào state
  };
  

  const loadLiveStreams = async () => {
    try {
      let res = await Apis.get(endpoints['livestreams']);
      const formattedLive = res.data.map((live) => ({
        ...live,
        date: format(new Date(live.date), 'yyyy-MM-dd HH:mm:ss'),
      }));
      setLiveStreams(formattedLive);
      console.log(formattedLive);
    } catch (ex) {
      console.error(ex);
      toastError('Lỗi khi tải danh sách');
    }
  };

  useEffect(() => {
    loadLiveStreams();
  }, []);

  const roomID = getUrlParams().get('roomID') || randomID(5);
  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:
        window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Cohost',
    });
  }
  sharedLinks.push({
    name: 'Join as audience',
    url:
     window.location.protocol + '//' + 
     window.location.host + window.location.pathname +
      '?roomID=' +
      roomID +
      '&role=Audience',
  });
 // generate Kit Token
  const appID = 119723348;
  const serverSecret = "3d9eaa6ae6e84e3613405b378f9a22c0";
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


    // start the call
    let myMeeting = async (element) => {
      {liveStreams.map((livestream) => {
        console.log(livestream.date);
    // Định nghĩa múi giờ của bạn (ví dụ: 'Asia/Ho_Chi_Minh' cho múi giờ GMT+7)
    const yourTimezone = 'Asia/Ho_Chi_Minh';

    // Chuỗi thời gian của livestream
    const livestreamDateStr = livestream.date;

    // Chuyển đổi chuỗi thời gian thành đối tượng Date với múi giờ cụ thể
    const livestreamDate = parse(livestreamDateStr, 'yyyy-MM-dd HH:mm:ss', new Date(), { timeZone: yourTimezone });

    // Lấy thời gian Unix timestamp (milliseconds) với múi giờ cụ thể
    const livestreamTime = livestreamDate.getTime();

    // Định dạng thời gian theo ngày/giờ/phút/giây
    const formattedLivestreamTime = format(livestreamDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: yourTimezone });

    // Lấy thời gian hiện tại
    const currentTime = new Date().getTime();

    // Tính thời gian còn lại đến thời gian livestream
    const timeToLivestream = livestreamTime - currentTime;
    console.log(livestreamTime);
    console.log(currentTime);
    console.log(timeToLivestream);
    let livestreamTimeStarted = null
    if (timeToLivestream <= 0) {  
         // Create instance object from Kit Token.
         const zp = ZegoUIKitPrebuilt.create(kitToken);
         // start the call
         zp.joinRoom({
             container: element,
             scenario: {
             mode: ZegoUIKitPrebuilt.LiveStreaming,
             config: {
                 role,
                 liveStreamingMode: ZegoUIKitPrebuilt.LiveStreamingMode.LiveStreaming 
             },
             },
             sharedLinks,
             onLiveStart: () => {
                  if (!livestreamTimeStarted) {
                    livestreamTimeStarted = new Date().getTime();
                    setLivestreamStarted(true);
                  }
                 alert("Start Streaiminggg...");
             },

             onLiveEnd: () => {
              if (livestreamTimeStarted) {
                console.log(livestream.date);
                const livestreamEndTime = new Date().getTime();
                const totalTimeLive = livestreamEndTime - livestreamTimeStarted;
                livestream.time = totalTimeLive
                console.log("Thời gian livestream (milliseconds):", totalTimeLive);
                console.log("kiểu dữ liệu time livestream (milliseconds):", typeof totalTimeLive);
                const formattedTimeLive = new Date(totalTimeLive).toISOString();
                // updateTimeLivestream(livestream, totalTimeLive, livestream.date)
              }
              alert("End Streaiminggg...");
             },
 
             onJoinRoom: () => {
                 // Add your custom logic
                 alert("Room");
             },
             onLeaveRoom: () => {
                 alert("Room");
             }
         });
         setSelectedLiveId(livestream.id);
         setSelectedLiveName(livestream.title)
    }   else {
      setShowModal(true);
    }
      })}
    };

  
    return <>
    <ToastContainer />
        <div
        className="myCallContainer"
        ref={myMeeting}
        ></div>
        <div className='text-center mt-5'>
           <ModalCreateQuestion selectedLiveId={selectedLiveId} selectedLiveName={selectedLiveName}  />
        </div>
        <div className='text-center mt-3'>
            <Button variant='dark' className='w-3/6 !font-bold' href="/home">QUAY VỀ TRANG CHỦ</Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chưa đến giờ phát Livestream</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Livestream chưa đến thời gian. Vui lòng quay lại sau.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" href="/home">
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default LiveStreamRoom
