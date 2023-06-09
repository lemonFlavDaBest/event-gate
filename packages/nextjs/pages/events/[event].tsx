import type { NextPage } from "next";

import Head from "next/head";
import { ContractData } from "~~/components/EventInfo";

const EventId: NextPage = () => {
  return (
    <>
      <Head>
        <title>DEvent Info</title>
        <meta name="description" content="Get DEvent info and description" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Dosis&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid flex-grow" data-theme="exampleUi">
        <ContractData />
      </div>
    </>
  );
};

export default EventId;
