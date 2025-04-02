import {Link} from 'react-router-dom';
import logo from '../data/images/logo.jpg';

function Header() {
    return (
        <div className="Header">
            
            {/* Image in header */}
            <header>
                <img src={logo} height="125px" width="125px"/>
            </header>

            {/* Navigation links using Router*/}
            <nav class="navigation_links">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>

        </div>
    );
}

export default Header;