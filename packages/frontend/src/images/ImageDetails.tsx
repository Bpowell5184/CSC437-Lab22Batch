import { useParams } from "react-router";
import { fetchDataFromServer } from "../MockAppData.ts";

export function ImageDetails() {
    const { imageId } = useParams();
    const imageData = fetchDataFromServer();
    const image = imageData.find(image => imageId === image.id);
    if (!image) {
        return <h2>Image not found</h2>;
    }

    return (
        <>
            <h2>{image.name}</h2>
            <p>By {image.author.username}</p>
            <img className="ImageDetails-img" src={image.src} alt={image.name} />
        </>
    )
}
