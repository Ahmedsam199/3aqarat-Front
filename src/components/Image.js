import React from 'react';

export default function Image({ src, base64, ...rest }) {
  if (src === null || src === undefined || src === '')
    return <img src="./../assets/empty.png" {...rest} />;
  else
    return (
      <img src={base64 ? `data:image/jpeg;base64,${src}` : src} {...rest} />
    );
}
