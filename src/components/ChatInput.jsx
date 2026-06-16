import {useState} from 'react'
import {Chatbot} from 'supersimpledev'
import LoadingImage from '../assets/loading-spinner.gif'
import './ChatInput.css'
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages}) {
        const [inputText, setInputText] = useState('');
        
        function saveInputText(event) {
          setInputText(event.target.value);
        }

        async function sendMessage() {
           setInputText('');

          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID(),
              time: dayjs().valueOf()
            }
          ]

          setChatMessages([
            ...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be remove later, when we add the response.
            {
              message: <img src={LoadingImage} className="loading-spinner" />,
              sender: 'robot',
              id: crypto.randomUUID(),
            }
          ]);

          await new Promise(resolve => setTimeout(resolve, 10));

          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID(),
              time: dayjs().valueOf()
            }
          ]);

          setInputText('');
        }

        function keyPressed(event) {
          if (event.key === 'Enter') {
            sendMessage()
          }
          
          if(event.key === 'Escape') {
            setInputText('')
          }
        }

        function clearMessages() {
          setChatMessages([]);
        }

        return (
          <div className="chat-input-container">
            <input 
              placeholder="Send a message to Chatbot" 
              size="30" 
              onChange={saveInputText}
              value={inputText}
              className="chat-input"
              onKeyDown={keyPressed}
            />
            <button 
              onClick={sendMessage} 
              className="send-button" 
            >Send</button>  

            <button
              onClick={clearMessages}
              className='clear-button'
            >Clear</button>

          </div>
        );
      }