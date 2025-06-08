import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { ax } from '../api/AxiosInstance'

function NewPost() {
    const [caption, setCaption] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const handlePost = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('caption', caption);
        Array.from(attachments).forEach(file => formData.append('attachments[]', file));
        try {
            await ax.post('posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setCaption("");
            setAttachments([]);
            alert('Post created!');
        } catch (error) {
            alert('Failed to create post');
        }
        setLoading(false);
    }
    return (
        <>
            <Navbar />
            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h5 className="mb-0">Create new post</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handlePost}>
                                        <div className="mb-2">
                                            <label htmlFor="caption">Caption</label>
                                            <textarea className="form-control" name="caption" id="caption" cols="30" rows="3" value={caption} onChange={e => setCaption(e.target.value)}></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="attachments">Image(s)</label>
                                            <input type="file" className="form-control" id="attachments" name="attachments" multiple onChange={e => setAttachments(e.target.files)} />
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                            {loading ? 'Sharing...' : 'Share'}
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NewPost