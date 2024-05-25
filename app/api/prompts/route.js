import { connectToDB } from "@utils/database"
import Prompt from "@models/Prompt";

const createPrompt = async (req, res) => {
    const { userId, prompt, tag } = await req.json();

    try {
        // create the connection to DB
        await connectToDB();

        // create new object
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });
        // do the transaction
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify("Failed to create a new prompt"), { status: 500 });
    }
}

const getAllPrompts = async (req) => {
    try {
        // create the connection to DB
        await connectToDB();

        // find prompts
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch prompts"), { status: 500 });
    }
}

const handler = (req, res) => {
    if (req.method === "POST") {
        return createPrompt(req, res);
    } else if (req.method === "GET") {
        return getAllPrompts(req);
    } else {
        return new Response(JSON.stringify("Not found"), { status: 404 });
    }
}

export { handler as GET, handler as POST };