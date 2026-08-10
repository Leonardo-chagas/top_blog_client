import { Link } from "react-router";

function Header(){
    return(
        <header>
            <Link to={'login'}>Login</Link>
            <Link to={'signup'}>Signup</Link>
        </header>
    );
}

export default Header;