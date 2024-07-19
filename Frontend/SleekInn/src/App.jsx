import React, { useState } from 'react'
import "./App.css";
import 'semantic-ui-css/semantic.min.css'; 
import { Button } from 'semantic-ui-react';
import Layout from './Components/Layout/Layout'
import ChatBotApp from './Components/ChatBotApp';

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  return (
    <div>
      <Layout/>
      {!showChatbot && (
        <Button
          style={{ position: 'fixed', bottom: '50px', right: '40px',
            backgroundColor: 'transparent',
    
          }}
          onClick={toggleChatbot}
          

        >
       <i class="ri-chat-3-fill" style={{color:'orange',fontSize:'2.5rem'}}></i>
        </Button>
      )}

      {showChatbot && <ChatBotApp onClose={toggleChatbot} />}
  
    </div>
  )
}

export default App