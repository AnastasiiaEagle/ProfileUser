'use client'

import axios from "@/utils/axios";
import { useEffect, useState } from "react";

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
        formData.append('avatar', file);

        const response = await axios.post('/avatar/file', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    }

    const handleUpload = async () => {
        if (!file) return;
        try {
        const result = await uploadAvatar(file);
        console.log(result)
        setImageUrl(result);
        } catch (err) {
        console.error('Upload failed:', err);
        }
    }

    useEffect(()=>{
        console.log(imageUrl)
    },[imageUrl])

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
                <img src={`http://localhost:3000/uploads/${imageUrl}`} alt="Аватар" className="w-32 h-32 rounded-full object-cover" />
                </div>
            )}
        </div>
    )
}