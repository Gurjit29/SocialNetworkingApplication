import React from 'react';

const LandingPage = () => {

    return <div style={{'textAlign':'center','width':'95%'}}>
        <h2>Welcome to QA Engine App!</h2>
        <p>Feel free the explore the app. There are variety of things you can do here: </p>
        <ul style={{'listStyle':'none'}}>
           <button className="btn btn-dark" style={{'width':'800px','padding':'30px'}}><li>Post Questions for virtually any topic ranging from mathematics to coding!</li></button><br/><br/>
           <button className="btn btn-dark" style={{'width':'800px','padding':'30px'}}> <li>Answer Questions - Sharing Is Caring!</li></button><br/><br/>
           <button className="btn btn-dark" style={{'width':'800px','padding':'30px'}}><li>Get personalized content by subscribing hashtags!</li></button>
        </ul>
    </div>

}

export default LandingPage;