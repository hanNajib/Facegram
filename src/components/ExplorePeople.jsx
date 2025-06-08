import React, { useEffect, useState } from 'react'
import { ax } from '../api/AxiosInstance'
import { Link } from 'react-router-dom';

function ExplorePeople() {
    const [User, setUser] = useState([])
    const fetchUser = async () => {
        const res = await ax.get("users");
        setUser(res.data.users)
    }
    useEffect(() => {
        fetchUser()
    })
    return (
        <div className="explore-people">
            <h6 className="mb-3">Explore People</h6>
            <div className="explore-people-list">
                {User && User.length > 0 ? User.map(item => (
                    <div className="card mb-2" key={item.id}>
                        <div className="card-body p-2">
                            <Link to={"profile/" + item.username}>@{item.username}</Link>
                        </div>
                    </div>
                )) : (
                    <div className="card mb-2">
                        <div className="card-body p-2">
                            -
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExplorePeople