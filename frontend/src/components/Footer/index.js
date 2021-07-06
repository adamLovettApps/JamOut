import React from 'react';
import './Footer.css';


const Footer = () => {

    return (
        <div className="footer-container">
            <div className="footer-info-container">
                <div>Developed By:</div>
                <div>Adam Lovett</div>
                <div className="footer-links">
                    <a className='contact-link' href='https://github.com/adamLovettApps'>Github</a> |
                    <a className='contact-link' href='https://www.linkedin.com/in/adam-lovett-896455196/'> LinkedIn</a> |
                    <a className='contact-link' href='mailto:adamlovett@alumni.usc.edu'> Email</a>
                </div>
            </div>
        </div>
    )

}

export default Footer;