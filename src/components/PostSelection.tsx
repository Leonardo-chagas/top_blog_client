import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CategoriesNav from "./CategoriesNav";
import axios from "axios";
import type { PostData, CategoryData } from "../types";

type PostSelectionProps = {
    username: string
}

function PostSelection({username}:PostSelectionProps){
    const [posts, setPosts] = useState<PostData[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        Promise.all([
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
        }),
        axios.get(apiUrl + 'categories').then(
            response => {
                const apiInfo = response.data;
                const parsedData = JSON.parse(apiInfo)
                let data : CategoryData[] = []
                
                parsedData.forEach((category:CategoryData) => {
                    data.push({id: category.id, category: category.category})
                })

                console.log(data)
                setCategories(data);
            }
        ).catch(error => {
            console.log(error);
        })
        ])
    }, [id])

    const selectPost = (id:string) => {
        navigate('/post/' + id);
    }

    return(
        <div>
            <CategoriesNav categories={categories}/>
            {
            posts.map((post, index) => (
                <div onClick={() => selectPost(post.id.toString())}>
                    <h2 key={index}>{post.title}</h2>
                </div>
            ))
            }
        </div>
    );
}

export default PostSelection;