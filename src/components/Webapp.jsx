import React, { useRef, useEffect, useState } from "react";
import { videoArr } from "../common/common.js";
import "./style.css";

const Webapp = () => {
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState();

  useEffect(() => {
    if (currentVideo) {
      currentVideo.muted = true;
      currentVideo.play();
      
    }
  }, [currentVideo]);

  useEffect(() => {
    const handleScroll = () => {
      const videos = videoRefs.current;

      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2;
        if (isVisible) {
          setCurrentVideo(video);
        } else {
          video.pause();
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleVideoClick = (index) => {
    const clickedVideo = videoRefs.current[index];
    setCurrentVideo(clickedVideo);
    if (clickedVideo.paused) {
      clickedVideo.play();
    } else {
      clickedVideo.pause();
    }
  };

  return (
    <div className="container">
      {videoArr.map((arr, index) => {
        const recommendation = arr.data.recommendation;
        return recommendation.map((video, index) => (
          <div
            className="wrap-video"
            key={video.video_url.med + index}
            onClick={() => handleVideoClick(index)}
          >
            <video
              className="container-video"
              key={video.video_url.med}
              ref={(ref) => (videoRefs.current[index] = ref)}
              autoPlay={index === 0 ? true : false}
              muted={index === 0 ? true : false}
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
