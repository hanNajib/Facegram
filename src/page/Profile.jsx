import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ax } from '../api/AxiosInstance';
import Navbar from '../components/Navbar';

function Profile() {
    const param = useParams();
    const [UserData, setUserData] = useState({});
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const fetchUser = async () => {
        try {
            const res = await ax.get('users/' + param.username)
            setUserData(res.data)
        } catch (error) {

        }
    }

    const handleFollow = async (type) => {
        try {
            if (type === 'follow') {
                const res = await ax.post(`users/${param.username}/${type}`)
            } else {
                const res = await ax.delete(`users/${param.username}/${type}`)
            }
        } catch (error) {
        }
    }

    const fetchFollow = async () => {
        try {
            const follower = await ax.get(`users/${param.username}/followers`)
            const following = await ax.get(`users/${param.username}/following`)
            setFollowers(follower.data.followers)
            setFollowing(following.data.following)
        } catch (error) {
            setFollowers([])
            setFollowing([])
        }
    }

    useEffect(() => {
        fetchUser();
        fetchFollow();
    }, [param, followers, following])
    return (
        <>
        <Navbar />
        <main className="mt-5">
            <div className="container py-5">
                <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <h5 className="mb-0">{UserData.full_name ?? "-"}</h5>
                            <span>@{UserData.username ?? '-'}</span>
                        </div>
                        <small className="mb-0 text-muted">
                            {UserData.bio ?? '-'}
                        </small>
                    </div>
                    <div>
                       {UserData.is_your_account ? (
                        <Link to={'/new-post'} className="btn btn-primary w-100 mb-2">+ Create new post</Link>
                       ) : (() => {
                            switch (UserData.following_status) {
                                case "not-following":
                                    return (
                                        <a onClick={() => handleFollow("follow")} className="btn btn-primary w-100 mb-2">
                                            Follow
                                        </a>
                                    );
                                    break
                                case "following":
                                    return (
                                        <a onClick={() => handleFollow("unfollow")} className="btn btn-primary w-100 mb-2">
                                            Following
                                        </a>
                                    );
                                    break
                                case "requested":
                                    return (
                                        <a onClick={() => handleFollow("unfollow")} className="btn btn-secondary w-100 mb-2">
                                            Requested
                                        </a>
                                    );
                                    break
                                default:
                                    return null;
                            }
                        })()}
                        <div className="d-flex gap-3">
                            <div>
                                <div className="profile-label"><b>{UserData.post_count}</b> posts</div>
                            </div>
                            <div className="profile-dropdown">
                                <div className="profile-label"><b>{UserData.followers_count}</b> followers</div>
                                <div className="profile-list">
                                    <div className="card">
                                        <div className="card-body">
                                            {followers && followers.length > 0 ? followers.map(item => (
                                                <div className="profile-user" key={item.id}>
                                                    <Link to={"/profile/" + item.username}>@{item.username}</Link>
                                                </div>
                                            )) : (
                                                <div className="profile-user">
                                                    This Account Is Private
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-dropdown">
                                <div className="profile-label"><b>{UserData.following_count}</b> following</div>
                                <div className="profile-list">
                                    <div className="card">
                                        <div className="card-body">
                                            {following && following.length > 0 ? following.map(item => (
                                                <div className="profile-user" key={item.id}>
                                                    <Link to={"/profile/" + item.username}>@{item.username}</Link>
                                                </div>
                                            )) : (
                                                <div className="profile-user">
                                                    This Account Is Private
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {UserData && UserData.is_private && UserData.following_status !== "following" && !UserData.is_your_account ? (
                    <div className="card py-4">
                        <div className="card-body text-center">
                            &#128274; This account is private
                        </div>
                    </div>
                ) : (
                    <div className="row justify-content-center" >
                        {UserData && UserData.posts && UserData.posts.map(item => (
                            <div className="col-md-4" key={item.id}>
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="card-images mb-2">
                                            {
                                                item.attachments.map(val => (
                                                    <img src={val.storage_path} alt="image" className="w-100" />
                                                ))
                                            }
                                        </div>
                                        <p className="mb-0 text-muted">{item.caption}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    </>
    )
}

export default Profile