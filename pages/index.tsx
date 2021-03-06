import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner/banner';
import Navbar from '../components/nav/navbar';
import SectionCards from '../components/card/section-cards';
import { getPopularVideos, getVideos } from '../lib/videos';

type VideoProp = {
  id: string;
  title: string;
  imgUrl: string;
};

type HomeProps = {
  disneyVideos: VideoProp[];
  productivityVideos: VideoProp[];
  travelVideos: VideoProp[];
  popularVideos: VideoProp[];
};

export const getServerSideProps = async () => {
  const disneyVideos = await getVideos('disneytrailer');
  const productivityVideos = await getVideos('Productivity');
  const travelVideos = await getVideos('travel');
  // const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      // popularVideos,
    },
  };
};

const Home = ({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}: HomeProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.main}>
        <Navbar />
        <Banner
          videoId='4zH5iYM4wJo'
          title='Clifford the red dog'
          subTitle='a very cute dog'
          imgUrl='/static/clifford.webp'
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' videos={disneyVideos} size='large' />
          <SectionCards title='Travel' videos={travelVideos} size='small' />
          <SectionCards
            title='Productivity'
            videos={productivityVideos}
            size='medium'
          />
          <SectionCards title='Popular' videos={disneyVideos} size='small' />
        </div>
      </div>
    </div>
  );
};

export default Home;
