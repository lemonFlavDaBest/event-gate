import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>dEvents</title>
        <meta name="description" content="Ticket App" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Dosis&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="flex bg-[url('/assets/gradient-2.png')] bg-[length:100%_100%] flex-col flex-grow pt-10 lg:py-auto max-w-[100vw]">
      
      

      <div className="grid lg:grid-cols-2 items-center justify-items-center mt-4 mb-16">
          <div className="px-5 py-20">
          
            <h1 className="text-center mt-4 mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
              <span className="block text-6xl font-bold mb-2">d<span className="text-8xl">Events</span></span>
              <span className="block text-2xl  font-bold mt-2">Ticketing + Admissions</span>
            </h1>
          
        </div>
        <div className="mt-8">
          <img src="https://cdn-icons-png.flaticon.com/512/2707/2707706.png"></img>  
        </div>
        </div>
        <div className="px-5 py-20">
          <h2 className="text-center mb-8">
            <span className="block text-2xl mb-2">Event Ticketing</span>
            <span className="block text-2xl font-bold">And Admissions</span>
          </h2>   
        </div>
        <div className="px-5 py-20">
          <h2 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-8xl font-bold">dEvents</span>
          </h2>   
        </div>
    
    </div>
    </>
  );
};

export default Home;
