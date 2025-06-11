import { MongoClient, Collection } from "mongodb";

interface IImageDocument {
    id: string;
    src: string;
    name: string;
    author: string;
}

interface IApiUserData {
    id: string;
    username: string;
}

interface IApiImageData {
    id: string;
    src: string;
    name: string;
    author: IApiUserData;
}

export class ImageProvider {
    private collection: Collection<IImageDocument>

    constructor(private readonly mongoClient: MongoClient) {
        const collectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    async getAllImages(): Promise<IApiImageData[]> {
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $unwind: "$author"
            },
            {
                $project: {
                    id: { $toString: "$_id" },
                    src: 1,
                    name: 1,
                    author: {
                        username: "$author.username"
                    }
                }
            }
        ];

        return await this.collection.aggregate<IApiImageData>(pipeline).toArray();
    }
}