import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req, { params }) => {
    try {
        // create the connection to DB
        await connectToDB();

        // find prompts
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch prompts"), { status: 500 });
    }
}