// Create your About component here
import IMG from '../assets/Detective.png';

const About = () => {
    return (
        <div id="about" className="about">
            <h1 className="about-heading">About Me</h1>
            <div className="about-info">

                <p className="about-desc"> Hello! I’m a dedicated software and web developer with a passion for creating innovative and efficient digital solutions. With a strong foundation in coding and a keen eye for design, I specialize in building responsive, user-friendly websites and robust software applications. My expertise spans across various programming languages and technologies, enabling me to deliver high-quality projects that meet client needs and exceed expectations. Let's work together to bring your ideas to life!
                </p>
                <div className="about-img">
                    <div className="about-img-wrapper">
                        <img src={IMG} alt="Detective" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About;