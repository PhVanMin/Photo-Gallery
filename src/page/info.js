import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PhotoInfo() {
    const { id } = useParams();
    const [info, setInfo] = useState(null)
    useEffect(() => {
        async function GetPhoto() {
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
                    headers: {
                        'Accept-Version': 'v1',
                        'Authorization': `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
                    }
                })

                if (response.status === 200) {
                    setInfo(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        GetPhoto()
    }, [])

    if (!info) {
        return <div>Loading...  </div>
    }

    return (
        <div className="p-5 flex justify-center gap-x-2">
            <img className="max-w-lg" src={info.urls.regular ?? "https://placehold.co/600x400/png"} alt="img" />
            <div>
                <p>Title: {info.alt_description ?? "None"}</p>
                <p>Author: {info.user.name ?? "None"}</p>
                <p>Description: {info.alt_description ?? "None"}</p>
            </div>
        </div>
    )
}

export default PhotoInfo