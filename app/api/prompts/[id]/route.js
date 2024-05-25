import { connectToDB } from "@utils/database"
import Prompt from "@models/Prompt";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        // create the connection to DB
        await connectToDB();

        // find prompt
        const prompt = await Prompt.findById(params.id).populate('creator');

        // Prompt not found
        if (!prompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch prompt"), { status: 500 });
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const {prompt, tag} = await req.json();
    try {
        // create the connection to DB
        await connectToDB();

        // find prompt
        const existingPrompt = await Prompt.findById(params.id);

        // Prompt not found
        if (!existingPrompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 });

        // update exiting object
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        // do the transaction
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Failed to update prompt"), { status: 500 });
    }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
    try {
        // create the connection to DB
        await connectToDB();

        // do the transaction
        await Prompt.findByIdAndDelete(params.id);

        return new Response(JSON.stringify("Prompt deleted successfully"), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Failed to delete prompt"), { status: 500 });
    }
}