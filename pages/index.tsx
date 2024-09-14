// pages/index.js
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/dashboard',
      permanent: false, // Set to true for permanent redirects (301)
    },
  };
};

const Home = () => {
  return null; // The component won't render because of the redirect
};

export default Home;
