"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const UpdatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert("Prompt ID not found");

        try {
            const requestBody = JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            });
            const resp = await fetch(`/api/prompts/${promptId}`, { method: "PATCH", body: requestBody });

            if (resp.ok) {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(()=> {
        const fetchPrompt = async (id) => {
            const resp = await fetch(`/api/prompts/${id}`);
            const data = await resp.json();

            setPost(prevState => ({
                prompt: data.prompt,
                tag: data.tag,
            }));
        }

        if(promptId) fetchPrompt(promptId);
    }, [promptId]);

    return (
        <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
    )
}

export default UpdatePrompt;