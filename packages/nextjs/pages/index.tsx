import type { NextPage } from "next";
import Head from "next/head";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>dEvents</title>
        <meta name="description" content="Ticket App" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">dEvent</span>
          </h1>
        </div>
        <h3></h3>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              
              <p>
                Start by creating your event {" "}
                <Link href="/create-event" passHref className="link">
                   here
                </Link>
                
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <p>
                View {" "}
                <Link href="/example-ui" passHref className="link">
                  My Events
                </Link>{" "}
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
