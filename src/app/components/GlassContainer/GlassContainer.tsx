import React, {ReactNode} from 'react';
import styles from './GlassContainer.module.css';

interface GlassContainerProps {
  children: ReactNode;
  maxHeight?: string;
  maxWidth?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  maxHeight,
  maxWidth,
}) => {
  return (
    <div className={styles.glassContainer}>
      <div className={styles.innerContainer} style={{maxHeight, maxWidth}}>
        <div className={styles.background}>
          <div className={styles.shape}></div>
          <div className={styles.shape}></div>
        </div>
        <div className={styles.glassBox}>{children}</div>
      </div>
    </div>
  );
};

export default GlassContainer;
