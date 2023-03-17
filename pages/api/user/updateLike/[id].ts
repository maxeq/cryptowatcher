import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/db";

export default async function updateLike(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { id } = req.query;
        console.log("id", id);
        const { uid } = req.body;
        console.log("author", uid);

        try {
            const { db } = await connectToDatabase();
            const comment = await db.collection("comments").findOne({ id: id });

            if (!comment) {
                res.status(404).json({ message: "Comment not found" });
                return;
            }

            const { likedBy } = comment;
            const isLiked = likedBy.includes(uid);

            // If author already liked this id, then put -1 like. If they didn't like it, then +1 like.
            const incrementValue = isLiked ? -1 : 1;
            const updateObj = {
                $inc: { likes: incrementValue },
                [isLiked ? "$pull" : "$push"]: { likedBy: uid },
            };

            await db.collection("comments").updateOne({ id: id }, updateObj);

            res.status(200).json({ message: "Like updated successfully" });
        } catch (error) {
            console.error("Error in updateLike API:", error);
            res.status(500).json({ message: "Error updating like", error: (error as Error).message });
        }
    } else {
        res.setHeader("Allow", "PUT");
        res.status(405).end("Method Not Allowed");
    }
}
