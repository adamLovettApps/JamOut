import React from 'react';
import SearchBar from '../SearchBar';
import './LandingPage.css';


const LandingPage = () => {
    // const baseURL = "header.jpeg";
    const imageRequest = JSON.stringify({
                    bucket: "jamout",
                    key: "header4.jpeg",
                    edits: {

                        resize: {
                            width: 1400,
                            height:300,
                            fit: "cover"
                        }
                    }
                })
    const encoded = btoa(imageRequest);
    const url = `https://d31oyr2ur6cysk.cloudfront.net/${encoded}`;
    return (
        <div>
            {/* <div className="welcome-header">♫ Welcome to Jam Out ♫</div> */}
        <div className="splash-page-banner">
            <img className="splash-page-banner-image" alt="Splash Banner" src="https://d31oyr2ur6cysk.cloudfront.net/eyJidWNrZXQiOiJqYW1vdXQiLCJrZXkiOiJoZWFkZXI0LmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjE0MDAsImhlaWdodCI6MzAwLCJmaXQiOiJjb3ZlciJ9fX0="></img>
            <div className="splash-text">Find a Friend to Jam Out!</div>
            <SearchBar></SearchBar>
        </div>
        </div>
    )
};

export default LandingPage;