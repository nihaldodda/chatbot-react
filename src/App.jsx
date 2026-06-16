import { useState, useEffect } from 'react'
import './App.css'
import { ChatMessages } from './components/ChatMessages'
import { ChatInput } from './components/ChatInput'
import LoadingImage from './assets/loading-spinner.gif'
import { Chatbot } from 'supersimpledev'


function App() {
        const [chatMessages, setChatMessages] = useState(
          JSON.parse(localStorage.getItem('messages')) || []
        )
        //const [chatMessages, setChatMessages] = array;
        //const chatMessages = array[0];
        //const setChatMessages = array[1];

        useEffect(() => {
          Chatbot.addResponses({
            'goodbye':'Goodbye. Have a great day!',
            'hi': 'Hello! How can I help you?',
            'tell me a joke': `Why do programmers prefer dark mode? 
                               Because light attracts bugs. 🐛`,
            'give me a uniue id': function() {
              return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
            }
          })
        },[]);

        useEffect(() => {
          localStorage.setItem('messages',JSON.stringify(chatMessages))
        }, [chatMessages]);

        return (
          <div className="app-container">
            {chatMessages.length === 0 && (
              <p className="welcome-message">
                Welcome to the chatbot project! Send a message using the textbox below.
              </p>
            )}

            <ChatMessages 
              chatMessages={chatMessages}
            />

            <ChatInput 
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App
