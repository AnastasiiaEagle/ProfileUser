'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '../../utils/axios'
import { useEffect, useState } from 'react';

export default function Header() {
    const router = useRouter();

    const handleExit = async() => {
         try {
            const res = await axios.get('/auth/logout',
            {
                withCredentials: true
            }
            );
            localStorage.removeItem('accessToken');
            router.push('/auth');

        } catch (error: any) {
            console.log(error)
        }
    }


    return(
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <ul className="flex space-x-4">
            </ul>
            <button onClick={handleExit} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Вихід
            </button>
        </header>
    )
}