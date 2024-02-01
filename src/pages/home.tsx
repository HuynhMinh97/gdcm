import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform client-side data fetching
      // ...
    }
  }, []);
  return <></>;
};

export default Home;
