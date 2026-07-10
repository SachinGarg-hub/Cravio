import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import '../../styles/reels.css';
import ReelFeed from '../../components/ReelFeed';
import toast from 'react-hot-toast';

const Home = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axiosInstance.get("/food")
            .then(response => {
                setVideos(response.data.foodItems);
            })
            .catch(() => { toast.error("Failed to load videos"); });
    }, []);

    async function likeVideo(item) {
        try {
            const response = await axiosInstance.post("/food/like", { foodId: item._id });

            if (response.data.like) {
                toast.success("Liked");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v));
            } else {
                toast.success("Unliked");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to like video");
        }
    }

    async function saveVideo(item) {
        try {
            const response = await axiosInstance.post("/food/save", { foodId: item._id });
            
            if (response.data.save) {
                toast.success("Saved");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v));
            } else {
                toast.success("Unsaved");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save video");
        }
    }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home;