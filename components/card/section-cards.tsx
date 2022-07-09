import Link from 'next/link';
import styles from './section-cards.module.css';
import Card from './card';

type VideoProp = {
  id: string;
  title: string;
  imgUrl: string;
};

type SectionCardProps = {
  title: string;
  videos: VideoProp[];
  size: string;
};

const SectionCards = ({ title, videos, size }: SectionCardProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, i) => {
          return (
            <Link href={`/video/${video.id}`} key={video.id}>
              <a>
                <Card key={i} id={i} imgUrl={video.imgUrl} size={size} />;
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
