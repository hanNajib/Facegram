import React, { useEffect, useState } from 'react'
import { ax } from '../api/AxiosInstance'
import { Link, useSearchParams } from 'react-router-dom'

function FollowRequest() {
    const username = localStorage.getItem('facegram-username')
    const [loadingUsername, setLoadingUsername] = useState(null)
    const [followers, setFollowers] = useState([])
    const fetchFollower = async () => {
        const res = await ax.get(`users/${username}/followers`)
        setFollowers(res.data.followers.filter(follower => follower.is_requested))
    }

    const handleConfirm = async (username) => {
        try {
            setLoadingUsername(username);
            await ax.put(`users/${username}/accept`);
            setLoadingUsername(null);
            fetchFollower(); // refresh list
        } catch (error) {
            setLoadingUsername(null);
        }
    }

    useEffect(() => {
        fetchFollower();
    })
    return (
        <div className="request-follow mb-4">
            <h6 className="mb-3">Follow Requests</h6>
            <div className="request-follow-list">
                {followers && followers.length > 0 ? followers.map(item => (
                    <div className="card mb-2" key={item.id}>
                        <div className="card-body d-flex align-items-center justify-content-between p-2">
                            <Link to={"/profile/" + item.username}>@{item.username}</Link>
                            <button 
                                onClick={() => handleConfirm(item.username)} 
                                className="btn btn-primary btn-sm"
                                disabled={loadingUsername === item.username}
                            >
                                {loadingUsername === item.username ? 'Loading...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                )
                ) : (
                    <div className="card mb-2">
                        <div className="card-body d-flex align-items-center justify-content-center p-2">
                            -
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FollowRequest