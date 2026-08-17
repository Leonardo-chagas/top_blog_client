import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import type { PostData } from "../types";

function PostSelection(){
    const [posts, setPosts] = useState<PostData[]>([]);
    const {id} = useParams();
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios.get(apiUrl + 'posts/' + id).then(
            response => {
                const apiInfo = response.data;
                const parsedData = JSON.parse(apiInfo);
                let data : PostData[] = []

                parsedData.forEach((post:PostData) => {
                    data.push({id: post.id, title: post.title, text: post.text});
                })
                setPosts(data);
            }
        ).catch(error => {
            console.log(error)
        })
    }, [])

    return(
        <div>
            {
            posts.map((post, index) => (
                <h2 key={index}>{post.title}</h2>
            ))
            }
        </div>
    );
}

export default PostSelection;