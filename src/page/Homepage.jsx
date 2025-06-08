import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FollowRequest from '../components/FollowRequest'
import ExplorePeople from '../components/ExplorePeople'
import { NewsCard } from '../components/NewsCard'
import { ax } from '../api/AxiosInstance'

const Homepage = () => {
    const [Posts, setPosts] = useState([])
    const fetchPost = async () => {
        try {
            const res = await ax.get("posts");
            setPosts(res.data.posts)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchPost();
    })
    return (
        <>
            <Navbar />
            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-between">
                        <div className="col-md-8">
                            <h5 className="mb-3">News Feed</h5>
                            {Posts && Posts.map((item) => (
                                <NewsCard key={item.id} attachments={item.attachments} caption={item.caption} created_at={item.created_at} full_name={item.user.full_name} username={item.user.username} />
                            ))}
                        </div>
                        <div className="col-md-4">
                            <FollowRequest />
                            <ExplorePeople />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Homepage