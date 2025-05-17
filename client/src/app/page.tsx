'use client'

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from '../utils/axios'
import Header from "@/components/Header/Header";


export default function Home() {
  const router = useRouter();

  function isAccessTokenValid(token: string): boolean {
        try {
            const decoded: { exp: number } = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        } catch (error) {
            return false;
        }
    }

    const tokenSearch = async()=>{
        const localToken = localStorage.getItem('accessToken');
        
        if(!localToken){
            console.log('Токен не знайдений');
            router.push('/auth');
        }else if(localToken !== null){
          if(!isAccessTokenValid(localToken)){
            try {
                const res = await axios.get('/auth/refresh',
                {
                    withCredentials: true
                }
                );
                if (res.data.accessToken) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                }
            } catch (error: any) {
                console.log(error)
            }
        }
      }
    }

  useEffect(() => {
    tokenSearch()
  }, []);

  return (
    <>
      <Header></Header>
    </>
  );
}
