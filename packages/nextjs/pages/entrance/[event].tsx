import type { NextPage } from "next";
import Head from "next/head";
import { ContractData} from "~~/components/EnterEvent";

const EnterEvent: NextPage = () => {
  return (
    <>
      <Head>
        <title>dEvent Entrance</title>
        <meta name="description" content="Enter your dEvent" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid flex-grow" data-theme="exampleUi">
        <ContractData />
      </div>
    </>
  );
};

export default EnterEvent;