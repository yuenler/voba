import React, { useState, useEffect, useRef } from 'react';
import AdventureOptions from './AdventureOptions';
import VocabChecklist from './VocabChecklist';
import vocabWords from './vocabWords';

const Story = ({ userDetails }) => {
  const [story, setStory] = useState('');
  const [options, setOptions] = useState([]);
  const [usedVocab, setUsedVocab] = useState([]);
  const endOfStoryRef = useRef(null); // Create a ref for scrolling

  const fetchStoryContinuation = async (selectedOption = '') => {
    try {
      let response = await fetch('/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story, option: selectedOption }),
      });
      if (!response.ok) {
        // Simulate a response for demonstration
        response = {
          json: async () => ({
            newStoryPart: 'John strolled into the quaint corner store, his footsteps echoing against the polished linoleum floor. With a casual glance around, he spotted a shiny, crimson apple nestled among a pile of fresh produce. Grasping it gently, he felt the smooth skin beneath his fingertips, imagining the crisp, juicy bite to come. As he approached the checkout counter, a faint smile tugged at the corners of his lips, a simple pleasure found in the ordinary act of buying fruit. With a friendly nod to the cashier, he exchanged a few coins for his prize, savoring the anticipation of his next snack.',
            // Assuming your response structure here
            newOptions: [
              { text: 'Eat the apple' },
              { text: 'Put the apple in his bag' },
              { text: 'Leave the store' },
            ],
          }),
        };
      }

      const { newStoryPart, newOptions } = await response.json();
      setStory(prev => prev + ' ' + newStoryPart);
      setOptions(newOptions);
    } catch (error) {
      console.error('Error fetching story continuation:', error);
    }
  };

  useEffect(() => {
    fetchStoryContinuation();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the page when options are updated
    endOfStoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [options]);

  const handleOptionSelect = (option) => {
    fetchStoryContinuation(option.text);
    setStory(prev => prev + '\n\n' + option.text + '\n\n');
    setUsedVocab([...usedVocab, option.vocab]);
  };

  return (
    <div className="flex">
      <div className="w-1/3">
        <VocabChecklist usedVocab={usedVocab} vocabWords={vocabWords[userDetails.grade]} />
      </div>
      <div className="w-2/3 p-4">
        <p>{story.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>
        <AdventureOptions options={options} onOptionSelect={handleOptionSelect} userDetails={userDetails} />
        {/* This element is used as an anchor for scrolling */}
        <div ref={endOfStoryRef} />
      </div>
    </div>
  );
};

export default Story;
