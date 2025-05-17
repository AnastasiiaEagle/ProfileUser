'use client'

import axios from "@/utils/axios";
import { useState } from "react";

export default function SaveImgForm(){
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0])
        }
    }

    const uploadAvatar = async (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file); // "avatar" має збігатися з полем у FileInterceptor

        const response = await axios.post('/avatar/file', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // { url: '/uploadd/...' }
    }

    const handleUpload = async () => {
        if (!file) return;
        try {
        const result = await uploadAvatar(file);
        setImageUrl(result.url); // Наприклад: "/uploadd/filename.jpg"
        } catch (err) {
        console.error('Upload failed:', err);
        }
    }

    return(
        <div className="space-y-4">
            <input type="file" accept="image/*" onChange={handleChange} />
            <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Завантажити
            </button>
            {imageUrl && (
                <div>
                <p className="text-sm">Попередній перегляд:</p>
                <img src={imageUrl} alt="Аватар" className="w-32 h-32 rounded-full object-cover" />
                </div>
            )}
        </div>
    )
}