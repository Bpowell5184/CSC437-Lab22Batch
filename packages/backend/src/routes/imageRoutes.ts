import { ImageProvider } from "../ImageProvider";
import express, { Request, Response } from "express";

function waitDuration(numMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, numMs));
}

export function registerImageRoutes(app: express.Application, imageProvider: ImageProvider) {
    app.get("/api/images", async (req: Request, res: Response) => {

        const searchTerm = req.query.search;

        if (searchTerm && typeof searchTerm !== "string") {
            res.status(400).json({ error: "search must be a string" });
            return;
        }
        console.log("Image search term:", searchTerm ?? "(none)");

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
}