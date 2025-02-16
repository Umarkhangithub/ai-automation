import React, { memo } from "react";

const DemoVideo = () => {
  return (
    <div className="w-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
      <iframe
        className="w-full h-64 md:h-96 border-2 border-white rounded-lg"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="AI Automate Demo"
        allowFullScreen
        
      ></iframe>
    </div>
  );
};

export default memo(DemoVideo);
