import { useEffect, useRef, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PhotoList() {
    const curPage = useRef(1);
    const [photos, setPhotos] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isEoL, setEoL] = useState(false)
    const navigate = useNavigate()
    const [isBottom, setIsBottom] = useState(false);

    async function GetPhotos() {
        try {
            if (isEoL) {
                return
            }

            setLoading(true)
            const response = await axios.get(`https://api.unsplash.com/photos?page=${curPage.current}`, {
                headers: {
                    'Accept-Version': 'v1',
                    'Authorization': `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
                    'X-Per-Page': 10,
                }
            })

            if (response.status !== 200) {
                return
            }

            curPage.current += 1
            if (curPage.current === 10) {
                setEoL(true)
            }

            setPhotos(curPhotos => [...curPhotos, ...response.data])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        GetPhotos()
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (isBottom) {
            GetPhotos()
        }
    }, [isBottom]);

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            setIsBottom(true);
        } else {
            setIsBottom(false);
        }
    };

    return (
        <div className="flex flex-col p-5 gap-2">
            <h1 className='font-bold text-center text-6xl'>Photo Gallery</h1>
            <div className="flex justify-center p-2">
                <div className='w-2/3 columns-[300px] gap-0.5'>
                    {photos.map((photo, index) => (
                        <div onClick={() => navigate(`/photos/${photo.id}`)} className='w-full mb-0.5 group relative' key={index} >
                            <img loading='lazy' className='w-full' src={photo.urls.thumb} alt='image' />
                            <div className='p-2 text-white group-hover:opacity-100 opacity-0 bg-black/40 absolute bottom-0 left-0 right-0 z-100'>
                                <p>Photo: {photo.alt_description}</p>
                                <p>Author: {photo.user.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isLoading && <div className='text-center'>Loading more images...</div>}
            {isEoL && <div className='text-center text-red-500'>No more images to show</div>}
        </div>
    );
}

export default PhotoList;
