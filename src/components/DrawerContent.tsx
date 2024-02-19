import { MessageList, Input, Button } from 'react-chat-elements';
import styles from './DrawerContent.module.css';
import { useRef, useState } from 'react';
import { Message } from '../App';

export const DrawerContent = ({ messages, myId, onSend }: { messages: Message[], myId: string, onSend: (message: Message) => void }) => {
    const messageListRef = useRef(null);
    const inputRef = useRef(null);

    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input) {
            onSend({ id: myId, body: input, ts: Date.now() });
            setInput('');
        }
    };

    return (
        <div className={`${styles.drawerContent}`}>
            <MessageList
                referance={messageListRef}
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={messages.map(message => (
                    {
                        id: message.id,
                        position: myId === message.id ? 'left' : 'right',
                        type: 'text',
                        text: message.body,
                        date: new Date(message.ts),
                        replyButton: false,
                        focus: false,
                        forwarded: false,
                        notch: false,
                        removeButton: false,
                        retracted: false,
                        title: '',
                        titleColor: 'grey',
                        status: 'sent'
                    }
                ))}
            />
            <Input
                referance={inputRef}
                placeholder="Type here..."
                value={input}
                maxHeight={50}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSend();
                    }
                }}
                rightButtons={
                    <Button
                        text='Send'
                        onClick={handleSend}
                    />
                }
            />
        </div>
    )
}