import { AllImages } from "./images/AllImages.tsx";
import { ImageDetails } from "./images/ImageDetails.tsx";
import { UploadPage } from "./UploadPage.tsx";
import { LoginPage } from "./LoginPage.tsx";
import { MainLayout } from "./MainLayout.tsx";
import { Routes, Route } from "react-router";
import { fetchDataFromServer } from "./MockAppData.ts";
import { useState } from "react";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts";

function App() {
    const [imageData, _setImageData] = useState(fetchDataFromServer);

    return (
    <Routes>
        <Route path="/" element={<MainLayout />} >
            <Route path={ValidRoutes.HOME} element={<AllImages images={imageData}/>}/>
            <Route path={ValidRoutes.IMAGES} element={<ImageDetails/>}/>
            <Route path={ValidRoutes.UPLOAD} element={<UploadPage />}/>
            <Route path={ValidRoutes.LOGIN} element={<LoginPage />}/>
        </Route>
    </Routes>
    );
}

export default App;
