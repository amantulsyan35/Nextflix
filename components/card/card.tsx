import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import cls from 'classnames';
import styles from './card.module.css';

type CardProps = {
  imgUrl: string;
  size: string;
  id?: number;
};

const Card = ({
  imgUrl = '/static/clifford.webp',
  size = 'medium',
  id,
}: CardProps) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap: any = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc('/static/clifford.webp');
  };

  const scale =
    id === 0
      ? { scaleY: 1.1 }
      : {
          scale: 1.1,
        };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          alt='image'
          layout='fill'
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
