import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FollowRequest from '../components/FollowRequest'
import ExplorePeople from '../components/ExplorePeople'
import { NewsCard } from '../components/NewsCard'
import { ax } from '../api/AxiosInstance'

const Homepage = () => {
    const [Posts, setPosts] = useState([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchPost = async (pageNum = 1) => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await ax.get(`posts?page=${pageNum}&size=7`);
            const newPosts = res.data.posts;  
            if (newPosts.length < 7) setHasMore(false);
            setPosts(prev => pageNum === 1 ? newPosts : [...prev, ...newPosts]);
        } catch (error) {
            setHasMore(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPost(1);
        setPage(1);
        setHasMore(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 && !loading && hasMore
            ) {
                fetchPost(page + 1);
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, loading, hasMore]);
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
                            {loading && <div className="text-center py-3">Loading...</div>}
                            {!hasMore && <div className="text-center py-3">No more posts</div>}
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