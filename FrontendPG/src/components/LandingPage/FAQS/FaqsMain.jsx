import React, { useState } from 'react';
import './Faqs.css';
import { Link } from 'react-router-dom'
import Faqs from './Faqs';
import { faqs } from './faqsData'

const FaqsMain = () => {
    const trending = [0, 1, 2];

    const [trendingQuestionIndex, setTrendingQuestionIndex] = useState(
        trending[Math.floor(Math.random() * trending.length)]
    );


    return (
        <div className="trending-faqs-container">
            <h2>Trending Question</h2>
            <hr/>
           
            <div className="faqs-row row">
                {faqs[trendingQuestionIndex]?.faqs.map((faq, index) => (
                    <div key={index} className="faqs-trending-ques col-sm-12 col-md-6 col-lg-4">
                        <details key={index} className='faqs-details'>
                            <summary>{faq.summary}</summary>
                            <p>{faq.details}</p>
                        </details>
                    </div>))}
                
            </div>
             <Link to={'/faqs'} className='faqs-more-faqs'>View more</Link>
        </div>
    );
};

export default FaqsMain;
