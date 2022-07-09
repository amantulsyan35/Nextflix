import Modal from 'react-modal';
import clsx from 'classnames';
import styles from '../../styles/Video.module.css';
import { useRouter } from 'next/router';
import { getYoutubeVideoById } from '../../lib/videos';
import Navbar from '../../components/nav/navbar';

Modal.setAppElement('#__next');

type VideoObject = {
  id: string;
  title: string;
  imgUrl: string;
  publishTime: string;
  description: string;
  channelTitle: string;
  viewCount: string;
  statistics: any;
};

type VideoProps = {
  video: VideoObject;
};

export async function getStaticProps(context: any) {
  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId);
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: true,
  };
}

export async function getStaticPaths() {
  const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

const Video = ({ video }: VideoProps) => {
  const router = useRouter();

  const { title, publishTime, description, channelTitle, statistics } = video;

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel='Watch the video'
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>
          {' '}
          <iframe
            id='ytplayer'
            className={styles.videoPlayer}
            // type='text/html'
            width='100%'
            height='360'
            src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
            frameBorder='0'
          ></iframe>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>
                  {statistics.viewCount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
