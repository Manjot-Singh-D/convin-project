import React, { useState, useRef } from "react";
import { Modal } from "antd";
import "../Stylesheets/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { addHistory } from "../store/slices/historySlices";
import { CloseOutlined } from "@ant-design/icons";

const ModalContainer = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.users;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = useRef(null);

  let { name, link, edit } =
    data[props.bucketIndex]["cardDetails"][props.cardIndex];

  const getEmbedLink = (youtubeUrl) => {
    var videoId = youtubeUrl.split("v=")[1];
    var ampersandPosition = videoId?.indexOf("&");
    if (ampersandPosition !== -1) {
      videoId = videoId?.substring(0, ampersandPosition);
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  };
  const stopVideo = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    }
  };
  let youtube_link = getEmbedLink(link);

  const showModal = () => {
    setIsModalOpen(true);

    const newHistory = {
      bucketName: data[props.bucketIndex].bucketName,
      cardName: name,
      time: new Date().toLocaleTimeString(),
      link: link,
    };
    dispatch(addHistory(newHistory));
  };

  const handleCancel = () => {
    stopVideo();
    setIsModalOpen(false);
  };
  return (
    <>
      <a
        className="modalButton"
        onClick={
          !props.selectBtn
            ? showModal
            : () =>
                props.selectValue(
                  props.bucketIndex,
                  props.cardIndex,
                  props.selected
                )
        }
      ></a>
      <div className="modalContainer">
        <Modal
          title={`${name}`}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          closeIcon={<CloseOutlined style={{ color: "#000000" }} />}
        >
          <iframe
            ref={iframeRef}
            width="100%"
            height="400"
            allow="autoplay"
            allowFullScreen
            src={`${youtube_link}`}
          ></iframe>
        </Modal>
      </div>
    </>
  );
};
export default ModalContainer;
