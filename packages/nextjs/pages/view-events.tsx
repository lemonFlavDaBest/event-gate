import type { NextPage } from "next";
import Head from "next/head";
import { ContractData } from "~~/components/ViewEvents";

const ViewEvents: NextPage = () => {
  return (
    <>
      <Head>
        <title>View My Events</title>
        <meta name="description" content="View your events you have created" />
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

export default ViewEvents;