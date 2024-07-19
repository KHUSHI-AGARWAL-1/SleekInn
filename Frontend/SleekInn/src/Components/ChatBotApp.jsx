// import React, { useState } from 'react';
// import ChatBot from 'react-simple-chatbot';
// import { Segment ,Icon} from 'semantic-ui-react';
// import '../styles/chatbot.css'
// const ChatBotApp = ({onClose}) => {
//   const [userDetails, setUserDetails] = useState({});
//   const steps = [
//     {
//       id: 'Greet',
//       message: 'Hello, Welcome to SleekInn',
//       trigger: 'Ask Name',
//     },
//     {
//       id: 'Ask Name',
//       message: 'May I know your good name?',
//       trigger: 'waiting1',
//     },
//     {
//       id: 'waiting1',
//       user: true,
//       trigger: ({ value }) => {
//         setUserDetails((prevDetails) => ({ ...prevDetails, name: value }));
//         return 'Save Name';
//       },
//     },
//     {
//       id: 'Save Name',
//       message: 'Nice to meet you, {previousValue}!',
//       trigger: 'Ask Email',
//     },
//     {
//       id: 'Ask Email',
//       message: 'Can I have your email address?',
//       trigger: 'waiting2',
//     },
//     {
//       id: 'waiting2',
//       user: true,
//       trigger: ({ value }) => {
//         setUserDetails((prevDetails) => ({ ...prevDetails, email: value }));
//         return 'Save Email';
//       },
//     },
//     {
//       id: 'Save Email',
//       message: 'Thank you for providing your email, {previousValue}.',
//       trigger: 'Ask Query',
//     },
//     {
//       id: 'Ask Query',
//       message: 'How can I assist you today?',
//       trigger: 'UserInput', // Start with user input
//     },
//     {
//       id: 'UserInput',
//       user: true,
//       trigger: 'Handle Input', // Handle user input
//     },
//     {
//       id: 'Handle Input',
//       message: 'Thank you for your query. We will respond to "{previousValue}" shortly.',
//       trigger: 'Show Options', // After handling input, show issue options
//     },
//     {
//       id: 'Show Options',
//       options: [
//         {
//           value: 'Tell me about your tour packages.',
//           label: 'Tell me about your tour packages.',
//           trigger: 'About',
//         },
//         {
//           value: 'What destinations do you cover?',
//           label: 'What destinations do you cover?',
//           trigger: 'Dest',
//         },
//         {
//           value: 'How can I book a tour?',
//           label: 'How can I book a tour?',
//           trigger: 'Booking',
//         },
//         {
//           value: 'Ask another question',
//           label: 'Ask another question',
//           trigger: 'UserInput', // Allow user to ask another question
//         },
//       ],
//     },
//     {
//       id: 'About',
//       message: 'We offer a variety of tour packages to exotic destinations around the world. You can explore our packages on our website.',
//       trigger: 'Follow Up',
//     },
//     {
//       id: 'Dest',
//       message: 'Our tours cover destinations across Europe, Asia, Africa, and the Americas. Each destination offers unique experiences.',
//       trigger: 'Follow Up',
//     },
//     {
//       id: 'Booking',
//       message: 'Booking a tour is easy! Visit our website, select your desired destination and dates, and follow the booking instructions.',
//       trigger: 'Follow Up',
//     },
//     {
//       id: 'Follow Up',
//       message: 'Is there anything else I can help you with?',
//       trigger: 'additionalHelp',
//     },
//     {
//       id: 'additionalHelp',
//       options: [
//         {
//           value: 'Yes',
//           label: 'Yes',
//           trigger: 'UserInput', // Allow user to input another query
//         },
//         {
//           value: 'No',
//           label: 'No',
//           trigger: 'End',
//         },
//       ],
//     },
//     {
//       id: 'End',
//       message: 'Thank you for chatting with us. Have a great day!',
//       end: true,
//     },
//   ];
//   return (
//       <Segment floated="right" style={{ position: 'fixed', bottom: '20px', right: '20px' }} className='segmented'>
//       <ChatBot steps={steps}
//        headerTitle={
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <span>Welcome to SleekInn Support</span>
//           <i class="ri-close-large-line" onClick={onClose} style={{ cursor: 'pointer', position:'fixed',right:'10px'}}></i>
//         </div>
//       }
//        botAvatar={'https://img.favpng.com/18/13/12/runescape-internet-bot-chatbot-avatar-clip-art-png-favpng-0fWQWr3tBQFRyKiiExWYvnt9d.jpg'}
//       className="chatbot-container"
//       />
//     </Segment>
//   );
// };
// export default ChatBotApp;


import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import '../styles/chatbot.css';

const ChatBotApp = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState({});
  const [answer, setAnswer] = useState('');
  
  const CustomComponent = ({ steps, triggerNextStep }) => {
    const query = steps.UserInput.value;
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAnswer = async () => {
        try {
          const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCgbjy-SZQOisDM-6ueW5TLLa7UQIlWP3E`,
            method: 'post',
            data: {
              contents: [{ parts: [{ text: query }] }],
            },
          });

          const fetchedAnswer = response.data.candidates[0].content.parts[0].text;
          const linesLimit = 5;
          const lines = fetchedAnswer.split('\n').slice(0, linesLimit);
          const formattedLines = lines.map(line => line.replace(/^\s*[*-]\s*/gm, '').replace(/\*/g, '').replace(/\*\*/g, ''));
          const formattedText = formattedLines.join('\n');
          console.log(formattedText);
          setAnswer(formattedText);
          setLoading(false);
          triggerNextStep({value: formattedText});
        } catch (error) {
          console.error('Error fetching answer:', error);
          setAnswer('Sorry - Something went wrong. Please try again!');
          setLoading(false);
          triggerNextStep({ value: 'Sorry - Something went wrong. Please try again!' });
        }
        finally{
          setLoading(false);
        }

      };

      fetchAnswer();
    }, [query, triggerNextStep]);

    if (loading) {
      return ("Fetching your answer...");
    }

    return null;
  };

  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to SleekInn',
      trigger: 'Ask Name',
    },
    {
      id: 'Ask Name',
      message: 'May I know your good name?',
      trigger: 'waiting1',
    },
    {
      id: 'waiting1',
      user: true,
      trigger: ({ value }) => {
        setUserDetails((prevDetails) => ({ ...prevDetails, name: value }));
        return 'Save Name';
      },
    },
    {
      id: 'Save Name',
      message: 'Nice to meet you, {previousValue}!',
      trigger: 'Ask Email',
    },
    {
      id: 'Ask Email',
      message: 'Can I have your email address?',
      trigger: 'waiting2',
    },
    {
      id: 'waiting2',
      user: true,
      trigger: ({ value }) => {
        setUserDetails((prevDetails) => ({ ...prevDetails, email: value }));
        return 'Save Email';
      },
    },
    {
      id: 'Save Email',
      message: 'Thank you for providing your email, {previousValue}.',
      trigger: 'Ask Query',
    },
    {
      id: 'Ask Query',
      message: 'How can I assist you today?',
      trigger: 'UserInput',
    },
    {
      id: 'UserInput',
      user: true,
      trigger: 'handleUserInput',
    },
    {
      id: 'handleUserInput',
      component: <CustomComponent />,
      waitAction: true,
      trigger: 'Display Answer',
    },
    {
      id: 'Display Answer',
      message: ({ previousValue }) => previousValue,
      trigger: 'Show Options',
    },
    {
      id: 'Show Options',
      options: [
        {
          value: 'Tell me about your tour packages.',
          label: 'Tell me about your tour packages.',
          trigger: 'About',
        },
        {
          value: 'What destinations do you cover?',
          label: 'What destinations do you cover?',
          trigger: 'Dest',
        },
        {
          value: 'How can I book a tour?',
          label: 'How can I book a tour?',
          trigger: 'Booking',
        },
        {
          value: 'Ask another question',
          label: 'Ask another question',
          trigger: 'UserInput',
        },
      ],
    },
    {
      id: 'About',
      message: 'We offer a variety of tour packages to exotic destinations around the world. You can explore our packages on our website.',
      trigger: 'Follow Up',
    },
    {
      id: 'Dest',
      message: 'Our tours cover destinations across Europe, Asia, Africa, and the Americas. Each destination offers unique experiences.',
      trigger: 'Follow Up',
    },
    {
      id: 'Booking',
      message: 'Booking a tour is easy! Visit our website, select your desired destination and dates, and follow the booking instructions.',
      trigger: 'Follow Up',
    },
    {
      id: 'Follow Up',
      message: 'Is there anything else I can help you with?',
      trigger: 'additionalHelp',
    },
    {
      id: 'additionalHelp',
      options: [
        {
          value: 'Yes',
          label: 'Yes',
          trigger: 'UserInput',
        },
        {
          value: 'No',
          label: 'No',
          trigger: 'End',
        },
      ],
    },
    {
      id: 'End',
      message: 'Thank you for chatting with us. Have a great day!',
      end: true,
    },
  ];

  return (
    <Segment floated="right" style={{ position: 'fixed', bottom: '20px', right: '20px' }} className='segmented'>
      <ChatBot
        steps={steps}
        headerTitle={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Welcome to SleekInn Support</span>
            <i className="ri-close-large-line" onClick={onClose} style={{ cursor: 'pointer', position: 'fixed', right: '10px' }}></i>
          </div>
        }
        botAvatar={'https://img.favpng.com/18/13/12/runescape-internet-bot-chatbot-avatar-clip-art-png-favpng-0fWQWr3tBQFRyKiiExWYvnt9d.jpg'}
        className="chatbot-container"
      />
    </Segment>
  );
};

export default ChatBotApp;
