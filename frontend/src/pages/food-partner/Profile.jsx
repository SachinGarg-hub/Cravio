import React, { useState, useEffect, useRef } from 'react';
import '../../styles/profile.css';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const { user, userType } = useAuthStore();
    const isOwner = userType === 'partner' && user?._id === id;

    useEffect(() => {
        axiosInstance.get(`/food-partner/${id}`)
            .then(response => {
                setProfile(response.data.foodPartner);
                setVideos(response.data.foodPartner.foodItems || []);
            })
            .catch((error) => {
                toast.error("Failed to load profile");
                console.error(error);
            });
    }, [id]);

    const handleProfilePictureClick = () => {
        if (isOwner) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setIsUploading(true);
        const toastId = toast.loading('Uploading profile picture...');

        try {
            const response = await axiosInstance.put('/food-partner/profile-picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProfile(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
            toast.success(response.data.message, { id: toastId });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to upload picture', { id: toastId });
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = null;
        }
    };

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                    <div 
                        className={`profile-avatar-container ${isOwner ? 'owner-avatar' : ''}`}
                        onClick={handleProfilePictureClick}
                        style={{ cursor: isOwner ? 'pointer' : 'default', position: 'relative' }}
                    >
                        <img 
                            className="profile-avatar" 
                            src={profile?.profilePicture || "https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D"} 
                            alt="Profile" 
                            style={{ opacity: isUploading ? 0.5 : 1 }}
                        />
                        {isOwner && (
                            <div className="avatar-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', opacity: 0, transition: 'opacity 0.2s' }}>
                                <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>Change</span>
                            </div>
                        )}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="profile-info">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <h1 className="profile-pill profile-business" title="Business name" style={{ margin: 0 }}>
                                {profile?.name}
                            </h1>
                            {isOwner && (
                                <button 
                                    className="auth-submit" 
                                    style={{ padding: '0.5rem 1rem', width: 'auto', fontSize: '0.9rem', margin: 0 }}
                                    onClick={() => navigate('/create-food')}
                                >
                                    + Add Food
                                </button>
                            )}
                        </div>
                        <p className="profile-pill profile-address" title="Address">
                            {profile?.address}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">{videos.length}</span>
                    </div>
                    {/* Hiding customers served as it's not implemented dynamically yet */}
                    {/* <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">{profile?.customersServed || 0}</span>
                    </div> */}
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#666', gridColumn: '1 / -1', padding: '2rem' }}>
                        No food items yet.
                    </div>
                )}
                {videos.map((v) => (
                    <div key={v._id || v.id} className="profile-grid-item">
                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} muted 
                        ></video>
                    </div>
                ))}
            </section>

            {/* Basic style for hover effect on avatar */}
            <style>{`
                .owner-avatar:hover .avatar-overlay {
                    opacity: 1 !important;
                }
            `}</style>
        </main>
    );
};

export default Profile;