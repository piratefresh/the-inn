import React from "react"

export const ImageComponent = () => {
    const imageRef = React.useRef<HTMLImageElement>()

    
    return (
        <img ref={imageRef} />
    )
}