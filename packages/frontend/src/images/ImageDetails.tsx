import { useParams } from "react-router";
import type { IApiImageData } from "../../../backend/src/shared/MockAppData.ts";
import { ImageNameEditor } from "./ImageNameEditor.tsx";

interface IImageDetailsProps {
    images: IApiImageData[];
    isLoading: boolean;
    isError: boolean;
    onNameChange: (imageId: string, newName: string) => void;
}

export function ImageDetails({images, isLoading, isError, onNameChange} : IImageDetailsProps) {
    const { imageId } = useParams();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading image.</p>;

    const image = images.find(image => imageId === image.id);
    if (!image) {
        return <h2>Image not found</h2>;
    }

    return (
        <>
            <h2>{image.name}</h2>
            <p>By {image.author.username}</p>
            <ImageNameEditor 
                initialValue="" 
                imageId={image.id}
                onNameChange={onNameChange}
                />
            <img className="ImageDetails-img" src={image.src} alt={image.name} />
        </>
    )
}
