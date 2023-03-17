import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/db";

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const { id } = req.query;
        console.log("id deleted", id);

        try {
            const { db } = await connectToDatabase();
            const comment = await db.collection("comments").findOne({ id: id });

            if (!comment) {
                res.status(404).json({ message: "Comment not found" });
                return;
            }

            await db.collection("comments").deleteOne({ id: id });

            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            console.error("Error in deleteComment API:", error);
            res.status(500).json({ message: "Error deleting comment", error: (error as Error).message });
        }
    } else {
        res.setHeader("Allow", "DELETE");
        res.status(405).end("Method Not Allowed");
    }
}
