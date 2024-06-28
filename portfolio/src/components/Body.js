// Create your Body component here
import {FaGithub, FaLinkedin} from "react-icons/fa";
import Avatar from '../assets/Screenshot 2024-06-26 101615.png';

const Body = () => {
    return (
        <div id="body" className="body">
            <div className="body-container">
                <div className="body-profile">
                    <img className="body-img" alt='avatar' src={Avatar} />

                    <div className="body-content">
                        <div className="body-headline"> Lisa Ochieng'</div>
                        <div className="body-text">Software Engineer</div>
                    </div>

                    <div className="body-icons">
                        <a href="https://github.com/lisaochieng" target="_blank" rel="noreferrer" className="icon-link"><i><FaGithub /></i></a>
                        <a href="https://www.linkedin.com/in/lisa-ochieng-5096b0261/" target="_blank" rel="noreferrer" className="icon-link"><i><FaLinkedin /></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body;