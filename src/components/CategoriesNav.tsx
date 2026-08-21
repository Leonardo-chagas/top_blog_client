import { Link } from "react-router";
import type { CategoryData } from "../types";

type CategoriesNavProps = {
    categories: CategoryData[]
}

function CategoriesNav({categories}:CategoriesNavProps){
    return(
        <nav>
            {
                categories.map((category, index) => (
                    <Link to={`/category/${category.id}`} key={index}>{category.category}</Link>
                ))
            }
        </nav>
    );
}

export default CategoriesNav;