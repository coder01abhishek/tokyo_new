'use client';
 
import React from 'react';
import { getAssetUrl } from '../config/assets';
 
export default function AICharacterSection() {

    return (
        <section className="md:py-16 py-10 bg-[#111111]">
            <div className='relative overflow-hidden flex items-center '>
                <div className="relative container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
 
                        {/* <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                            <div
                                className="relative w-80 h-[350px] md:w-[1096px] md:h-[700px] bg-contain bg-no-repeat bg-center"
                                style={{
                                    backgroundImage: `url(${getAssetUrl('/hand.png')})`,
                                }}
                            >
                                <div className="absolute inset-0 rounded-[23px] overflow-hidden doll-videoo">
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover"
                                        loop
                                        muted
                                        playsInline
                                        autoPlay
                                        controls={false}
                                    >
                                        <source className='' src={getAssetUrl("/videos/doll2.mp4")} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
 
                        </div> */}
                        <video
                            src={getAssetUrl("/videos/AICharactor.mp4")}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls={false}
                            className="w-full h-auto object-contain"
                        />
 
                        <div className="space-y-8 order-1 md:order-2 text-center md:text-left relative z-10">
                            <div className="space-y-6">
                                <h2 className="text-white">
                                    Your Perfect AI Companion
                                    <span className="text-white"> Awaits</span>
                                </h2>
 
                                <p className="text-[#A0A0A0] max-w-md mx-auto lg:mx-0">
                                    Pick one of our 3 characters today, make them your own, and start the conversation.
                                </p>
                            </div>
 
                            <div className="space-y-6">
                                <button
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-full"
                                >
                                    Create Your Character
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            <div className="w-full max-w-[1920px] h-[100px] max-h-[250px] -mt-[80px] relative bg-gradient-to-b from-[#11111100_10%] to-[#111111]"></div>
 
        </section>
    );
}
 