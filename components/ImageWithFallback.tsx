import { useEffect, useState } from "react";
import { Image } from "react-native";

interface Props {
    source: { uri: string };
    alt?: string;
}
export type ImageProps = Props & Image['props'];

const ImageWithFallback = ({ source, alt, ...props }: ImageProps) => {
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(source);

    const getRandomImageURI = () => {
        return "https://picsum.photos/" + (Math.random() * (100) + 200).toFixed(0);
    }

    const handleImageError = () => {
        setImageError(true);
        if (alt)
            setImageSrc({ uri: alt });
        else {
            setImageSrc({ uri: getRandomImageURI() });
        }
    };
    return (
        <Image
            source={imageSrc}
            onError={handleImageError}
            {...props}
        />
    );
}

export default ImageWithFallback;