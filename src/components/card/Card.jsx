import "./card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: "Quoc Hung",
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src="https://i.pinimg.com/564x/39/44/6c/39446caa52f53369b92bc97253d2b2f1.jpg" alt="" className="cardIcon" />
        ) : (
          <img
            src="https://i.pinimg.com/564x/39/44/6c/39446caa52f53369b92bc97253d2b2f1.jpg"            
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src="https://i.pinimg.com/564x/39/44/6c/39446caa52f53369b92bc97253d2b2f1.jpg"          alt=""
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src="https://i.pinimg.com/564x/39/44/6c/39446caa52f53369b92bc97253d2b2f1.jpg"
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img src="https://i.pinimg.com/564x/39/44/6c/39446caa52f53369b92bc97253d2b2f1.jpg" alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
