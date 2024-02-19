import { Drawer } from '@mui/material';

import styles from './CallScreen.module.css';
import { Button } from './Button';
import { useState } from 'react';
import { DrawerContent } from './DrawerContent';

type Props = {
  reactions: string[];
  onReaction: (reaction: string) => void;
  onDisconnect: () => void;
  remoteRef: React.RefObject<HTMLVideoElement>;
  localRef: React.RefObject<HTMLVideoElement>;
};

const emojis = ['❤️', '😆', '😲', '😢', '😠'];

export function CallScreen({
  reactions,
  onReaction,
  onDisconnect,
  remoteRef,
  localRef,
}: Props) {
  const lastReaction = reactions[reactions.length - 1];
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <video
        className={styles['remote-video']}
        ref={remoteRef}
        autoPlay
        playsInline
      />
      <video
        className={styles['local-video']}
        ref={localRef}
        autoPlay
        playsInline
        muted
      />
      <div className={styles.controls}>
        <div className={styles.reactions}>
          {emojis.map((reaction) => (
            <button
              className={styles.reaction}
              key={reaction}
              onClick={() => onReaction(reaction)}
            >
              {reaction}
            </button>
          ))}
        </div>
        <Button onClick={() => {setIsOpened(state => !state)}}>Open Messages</Button>
        <Button variant="danger" onClick={onDisconnect}>
          End call
        </Button>
        {lastReaction && (
          <div key={reactions.length} className={styles['last-reaction']}>
            {lastReaction}
          </div>
        )}
         <Drawer
            anchor={'right'}
            open={isOpened}
            onClose={() => {setIsOpened(false)}}
          >
            <DrawerContent />
          </Drawer>
      </div>
    </>
  );
}
