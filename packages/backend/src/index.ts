import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { ValidRoutes } from "./shared/ValidRoutes";
import { ImageProvider } from "./ImageProvider";
import { connectMongo } from "./connectMongo";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

const mongoClient = connectMongo();
const imageProvider = new ImageProvider(mongoClient);

const app = express();
app.use(express.static(STATIC_DIR));

function waitDuration(numMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, numMs));
}

app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get(Object.values(ValidRoutes), (req: Request, res: Response) => {
    const frontendDir = path.join(__dirname, "../../frontend/dist");
    res.sendFile(path.join(frontendDir, "index.html"));
});

app.get("/api/images", async (req: Request, res: Response) => {
    try {
        await waitDuration(1000);
        const images = await imageProvider.getAllImages();
        console.log("Backend returned", images.length, "images");
        res.json(images);
    } catch (err) {
        console.error("Error fetching images", err);
        res.status(500).json({ error: "Failed to fetch images" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
