import React from "react";

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progressDisplay: false };
  }

  triggleFileUpload = () => {
    this.refs.uploader.click();
  };

  componentDidMount() {}

  render() {
    const fileHandler = this.props.fileHandler;

    if (this.props.src === undefined) {
      return (
        <input
          type="file"
          className="avatar-uploader"
          accept="image/png, image/jpeg"
          onChange={e => {
            fileHandler(e);
          }}
        />
      );
    } else {
      return (
        <div>
          <input
            type="image"
            className="avatar uploader"
            style={{ width: 128, height: 128 }}
            src={this.props.src}
            onClick={this.triggleFileUpload}
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref="uploader"
            className="avatar-uploader"
            accept="image/png, image/jpeg"
            onChange={e => {
              fileHandler(e);
            }}
          />
          <progress value={this.props.progress} ref="progress" max="100" />
        </div>
      );
    }
  }
}
