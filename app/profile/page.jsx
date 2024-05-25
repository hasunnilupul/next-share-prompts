"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
     }
    const handleDelete = async (post) => { 
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompts/${post._id.toString()}`, {method: "DELETE"});
                setPosts(prevState => prevState.filter(item => item._id !== post._id));
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        const fetchPosts = async (userId) => {
            const resp = await fetch(`/api/users/${userId}/posts`);
            const data = await resp.json();
            setPosts(data);
        }

        if (session?.user.id) fetchPosts(session.user.id);
    }, []);

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} />
    )
}

export default MyProfile;