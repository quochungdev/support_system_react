
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const LiveStreamRoom = () => {
    const { roomId } = useParams()

    const myMeeting = async (element) => {
        const appID = 119723348;
        const serverSecret = "3d9eaa6ae6e84e3613405b378f9a22c0";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
            roomId,
            Date.now().toString(),
            "QuocHung"
            );
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
     // start the call
        zp.joinRoom({
            container: element,
            scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
            },
        });
        
    }

    return <>
        <div
        className="myCallContainer"
        ref={myMeeting}
        ></div>

        <div className='text-center mt-5'>
            <Button variant='dark' className='w-3/6 !font-bold' href="/home">QUAY VỀ TRANG CHỦ</Button>
        </div>
    </>
}

export default LiveStreamRoom