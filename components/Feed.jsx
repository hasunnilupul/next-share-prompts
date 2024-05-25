"use client"

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ prompts, handleTagClick }) => {
  return (<div className='mt-16 prompt_layout'>
    {
      prompts.map(item => (
        <PromptCard
          key={item._id}
          post={item}
          handleTagClick={handleTagClick} />
      ))
    }
  </div>)
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearch = (e) => { }

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("/api/prompts");
      console.log(resp);
      const data = await resp.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search for a tag or username' value={searchText} onChange={handleSearch} required className='search_input peer' />
      </form>

      <PromptCardList prompts={posts} handleTagClick={() => { }} />
    </section>
  )
}

export default Feed