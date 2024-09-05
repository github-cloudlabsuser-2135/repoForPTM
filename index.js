import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState('type markdown here');

    const handleMarkdownChange = (event) => {
        setMarkdown(event.target.value);
    };

    return (
        <div>
            <textarea value={markdown} onChange={handleMarkdownChange} />

            <div>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
};
// take a sentence as input
  // reverse the input sentence
  // the start of the sentence must start with a capital
  // for javascript

function reverseSentence(sentence) {
  // split the sentence into words
  // reverse the words
  // join the words into a sentence
  // capitalize the first letter of the sentence
  const words = sentence.split(' ');
  const reversedWords = words.reverse();
  const reversedSentence = reversedWords.join(' ');
  const capitalizedSentence = reversedSentence.charAt(0).toUpperCase() + reversedSentence.slice(1);
  return capitalizedSentence;
}


export default MarkdownEditor;