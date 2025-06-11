import { ImageGrid } from "./ImageGrid.tsx";
import type { IApiImageData } from "../../../backend/src/shared/MockAppData.ts";

interface IAllImagesProps {
    images: IApiImageData[];
    isLoading: boolean;
    isError: boolean;
}

export function AllImages({images, isLoading, isError}: IAllImagesProps) {
    
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading images.</p>;
    return (
        <>
            <h2>All Images</h2>
            <ImageGrid images={images} />
        </>
    );
}
