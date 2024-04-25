import React, { useState } from 'react';
import './Faqs.css'; // Assuming you have a CSS file for styling
import { faqs } from './faqsData'

const Faqs = () => {
  const [selectedOption, setSelectedOption] = useState(faqs[0].option);
  const [question, setQuestion] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className="faqs-container">
        <div className="faqs-options">
          <div className='faqs-header'>
            <h1>FAQs</h1>
            <p>Unlock Answers to Your Most Pressing Questions</p>
          </div>
          {faqs.map((faqGroup, index) => (
            <div
              key={index}
              className={`faqs-option ${selectedOption === faqGroup.option ? 'active' : ''}`}
              onClick={() => handleOptionClick(faqGroup.option)}
            >
              {faqGroup.icon}
              {faqGroup.option}
            </div>
          ))}
        </div>
        <div className="faqs-content">
          {/* <form action="" className='faqs-question-form'>
            <label>
              <input
                type="text"
                name="question"
                className='faqs-question'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </label>
            <button id='faqs-ask'>Ask</button>
          </form> */}
          {selectedOption && faqs.find(faqGroup => faqGroup.option === selectedOption)?.faqs.map((faq, index) => (
            <details key={index} className='faqs-details'>
              <summary>{faq.summary}</summary>
              <p>{faq.details}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faqs;
