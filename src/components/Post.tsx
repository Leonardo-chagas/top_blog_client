import { useParams } from "react-router";
import { useEffect, useState } from "react";
import CategoriesNav from "./CategoriesNav";
import Comments from "./Comments";
import axios from "axios";
import type { CategoryData, PostData, CommentData } from "../types";

function Post(){
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [post, setPost] = useState<PostData>();
    const [comments, setComments] = useState<CommentData[]>([]);
    const [showForm, setShowForm] = useState(false);
    const {id} = useParams();
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        Promise.all([
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
        }),
        axios.get(apiUrl + 'posts/view/' + id).then(
            response => {
                const apiInfo = response.data;
                const parsedData : PostData = JSON.parse(apiInfo)
                setPost(parsedData);
            }
        ).catch(error => {
            console.log(error);
        }),
        axios.get(apiUrl + 'comments/' + id).then(
            response => {
                const apiInfo = response.data;
                const parsedData = JSON.parse(apiInfo)
                let data : CommentData[] = []

                parsedData.forEach((comment:CommentData) => {
                    data.push({id: comment.id, text: comment.text, username: comment.username});
                })
                setComments(data);
            }
        )
        ])
    }, [id])

    return(
        <div>
            <CategoriesNav categories={categories}/>
            <div>
                <h1>{post?.title}</h1>
                <p>{post?.text}</p>
            </div>
            {showForm ? 
            <form>
                <textarea></textarea>
                <button type="submit">Post Comment</button>
            </form> :
            <button onClick={() => setShowForm(true)}>Comment</button>}
            <Comments comments={comments}/>
        </div>
    );
}

export default Post;