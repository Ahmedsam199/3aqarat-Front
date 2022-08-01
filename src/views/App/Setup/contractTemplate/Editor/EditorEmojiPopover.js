import React, { useState } from "react";
import { Overlay } from "react-bootstrap";

const EditorEmojiPopover = ({ button, onHide }) => {
  return (
    <Overlay
      target={button}
      show={true}
      placement="bottom-start"
      rootClose
      onHide={() => onHide()}
    >
      {({ style, ref }) => (
        <div style={style} ref={ref} className="lia-emoji-overlay">
          Simple tooltip
        </div>
      )}
    </Overlay>
  );
};

export default EditorEmojiPopover;
