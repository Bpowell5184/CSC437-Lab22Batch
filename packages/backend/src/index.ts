import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

const app = express();
app.use(express.static(STATIC_DIR));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/login", (req: Request, res: Response) => {
    console.log("__dirname", __dirname);
    console.log("Sending file:", path.join(__dirname, "../../frontend/dist"));

    const frontendDir = path.join(__dirname, "../../frontend/dist");
    res.sendFile(path.join(frontendDir, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
