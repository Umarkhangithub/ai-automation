import React, { memo } from "react";

const DemoVideo = () => {
  return (
    <div className="w-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
    
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/yMtQEFXMp34"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default memo(DemoVideo);
