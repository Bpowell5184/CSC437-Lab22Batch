import { AllImages } from "./images/AllImages.tsx";
import { ImageDetails } from "./images/ImageDetails.tsx";
import { UploadPage } from "./UploadPage.tsx";
import { LoginPage } from "./LoginPage.tsx";
import { MainLayout } from "./MainLayout.tsx";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts";
import { useEffect } from "react";
import type { IApiImageData } from "../../backend/src/shared/MockAppData.ts";

function App() {
    const [imageData, setImageData] = useState<IApiImageData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch("/api/images");
                if (!response.ok) throw new Error("Failed to fetch");
                
                const data = await response.json();
                setImageData(data);
            } catch (err) {
                console.error(err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
    
        fetchImages();
    }, []);

    return (
    <Routes>
        <Route path="/" element={<MainLayout />} >
            <Route path={ValidRoutes.HOME} element={<AllImages images={imageData} isLoading={isLoading} isError={isError}/>}/>
            <Route path={ValidRoutes.IMAGES} element={<ImageDetails images={imageData} 
            isLoading={isLoading} 
            isError={isError}
            onNameChange={(imageId, newName) => {
                setImageData(prev =>
                    prev.map(img =>
                        img.id === imageId ? { ...img, name: newName } : img
                    )
                );
            }}
            />}/>
            <Route path={ValidRoutes.UPLOAD} element={<UploadPage />}/>
            <Route path={ValidRoutes.LOGIN} element={<LoginPage />}/>
        </Route>
    </Routes>
    );
}

export default App;
