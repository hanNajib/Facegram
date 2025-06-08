import React from 'react'
import { Link } from 'react-router-dom'

export const NewsCard = ({ full_name, username, created_at, attachments, caption  }) => {
    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                <h6 className="mb-0">{full_name}</h6>
                <small className="text-muted">{created_at}</small>
            </div>
            <div className="card-body">
                <div className="card-images mb-2">
                    {attachments.map(item => (
                        <img key={item.id} src={item.storage_path} alt="image" className="w-100" />
                    ))}
                </div>
                <p className="mb-0 text-muted"><b><Link to={"/profile/" + username}>{username}</Link></b> {caption}</p>
            </div>
        </div>
    )
}
