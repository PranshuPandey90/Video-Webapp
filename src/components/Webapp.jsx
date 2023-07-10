import React, { useRef, useEffect, useState } from "react";
import { videoArr } from "../common/common.js";
import "./style.css";
import "video.js/dist/video-js.css";

const Webapp = () => {
  const videoRef = useRef([]);
  const [selectedVideo, setSelectedVideo] = useState();

  useEffect(() => {
    if (selectedVideo) {
      selectedVideo.muted = false;
    }
  }, [selectedVideo]);

  useEffect(() => {
    const handleScroll = () => {
      const videos = videoRef.current;

      videos.forEach((video) => {
        const screen = video.getBoundingClientRect();
        const isVisible =
        screen.top < window.innerHeight / 2 &&
        screen.bottom >= window.innerHeight / 2;

        if (isVisible) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const container = document.querySelector(".container");

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleVideoClick = (index) => {
    const clickedVideo = videoRef.current[index];
    setSelectedVideo(clickedVideo);
    if (clickedVideo.paused) {
      clickedVideo.play();
    } else {
      clickedVideo.pause();
    }
  };

  return (
    <div className="container">
      {videoArr.map((vid, index) => {
        const recommendation = vid.data.recommendation;
        return recommendation.map((video, index) => (
          <div
            className="wrap-video  y mandatory-scroll-snapping"
            key={video.video_url.med + index}
            dir="ltr"
          >
            <video
              loop
              className="inner-container"
              key={video.video_url.med}
              ref={(ref) => (videoRef.current[index] = ref)}
              autoPlay={index === 0 ? true : false}
              muted={true}
              onClick={() => handleVideoClick(index)}
            >
              <source
                src={video.video_url.med}
                type="video/mp4"
                className="video"
              />
            </video>
          </div>
        ));
      })}
    </div>
  );
};

export default Webapp;
