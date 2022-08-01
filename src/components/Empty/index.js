import React from 'react'
import Lottie from 'react-lottie';
import animationData from "./empty.json"

const Empty = ({ style, height = 400, width = 400 }) => {
    const defaultOptionsLottie = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }

    };
    return (
        <div style={style} >
            <Lottie options={defaultOptionsLottie}
                height={height}
                width={width}
            />
        </div>
    )
}

export default Empty