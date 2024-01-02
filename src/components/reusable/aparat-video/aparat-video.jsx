import React, { Component } from "react";
class AparatVideo extends Component {
  state = {};
  render() {
    const { src } = this.props;
    return (
      <div className="aparat-video-wrapper">
        <div className="h_iframe-aparat_embed_frame">
          <span style={{ display: "block", paddingTop: "57%" }}></span>
          <iframe
            allowFullScreen={true}
            webkitallowfullscreen={true.toString()}
            mozallowfullscreen={true.toString()}
            src={src}
          ></iframe>
        </div>
      </div>
    );
  }
}

export default AparatVideo;
