import { useEffect, useState } from "react";
import axios from "axios";
import CategoriesNav from "./CategoriesNav";
import Header from "./Header";
import type { CategoryData } from "../types";

function Home(){
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios.get(apiUrl + 'categories').then(
            response => {
                const apiInfo = response.data;
                const parsedData = JSON.parse(apiInfo)
                let data : CategoryData[] = []
                
                //Object.values(apiInfo).forEach((category) => {
                 //   data.push({id: category.id, category: category.category})
                //})
                parsedData.forEach((category:CategoryData) => {
                    data.push({id: category.id, category: category.category})
                })

                console.log(data)
                setCategories(data);
            }
        ).catch(error => {
            console.log(error);
        })
    }, [])

    return(
        <div>
            <Header/>
            <CategoriesNav categories={categories}/>
            <main>
                <h2>Aplicação de blog</h2>
                <p>Bem vindo a aplicação de blog</p>
            </main>
        </div>
    );
}

export default Home;