import { ZenportEatsProvider } from '@modules/ZenportEats/hooks/useZenportEats';

import Head from 'next/head';
import Header from '@components/Header';
import type { NextPage } from 'next';
import { useState } from 'react';
import ZenportEats from '../modules/ZenportEats';

const Home: NextPage = () => {
  let [newPageNumber, setNewPageNumber] = useState(1); // Creating a new local state which will be passed to ZenportEats
  const nextBtnHandler = (num: number) => {
    setNewPageNumber(num);
  };
  return (
    <>
      <Head>
        <title>Zenport Eats Inc.</title>
        <meta name="description" content="A zenport App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        onIconClick={() => {
          setNewPageNumber(1);
        }}
      />

      <ZenportEatsProvider>
        <ZenportEats page={newPageNumber} onNextClick={nextBtnHandler} />
      </ZenportEatsProvider>
    </>
  );
};

export default Home;
