"use client";

import React, { Suspense } from "react";
import { SparklesCore } from "../components/Backgrounds/sparkles";
import Link from "next/link";
import { getAssetUrl } from '../config/assets';
import ChangingWordHero from "./ChangingWordHero";

const Hero: React.FC = () => {
    return (
        <section className="relative flex flex-col items-center justify-center bg-[#111111] text-center sm:px-4 sm:py-20 py-8  min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]" id="home">
            {/* Sparkles Background */}
            <Suspense fallback={<div className="w-full absolute inset-0 bg-[#111111] h-full" />}>
                <div className="w-full absolute inset-0 bg-[#111111] h-full">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={50}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
            </Suspense>

            {/* Character GIF with transparent background for aesthetics */}
            <div className="relative w-full sm:max-w-md max-w-sm">
                <video
                    src={getAssetUrl("/videos/doll.mp4")}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    loading="eager"
                    className="z-10 w-full sm:h-full h-90 object-contain"
                />


                {/* Mobile fade overlay */}
                <div
                    className="absolute inset-x-0 bottom-0 h-24 sm:hidden"
                    style={{
                        background:
                            "linear-gradient(to top, #111111 40%, rgba(17,17,17,0) 100%)",
                    }}
                />

                {/* Desktop fade overlay (your old one) */}
                <div
                    className="absolute inset-0 pointer-events-none sm:block hidden"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(17, 17, 17, 0) 35.17%, #111111 90.42%)",
                    }}
                />
            </div>

            {/* Headline */}
            <ChangingWordHero />

            {/* Subtext */}
            <p className="sm:mt-4 mt-2 text-[#A0A0A0] z-20 relative sm:px-0 px-2">
                Choose a character, customize their world, and start real conversations
                powered by AI.
            </p>

            {/* Buttons */}
            <div className=" mt-8 flex gap-4 flex-wrap justify-center">
                <Link
                    href="https://app.tokyoproject.ai"
                    className="sm:px-9 sm:py-3 z-20 px-6 py-2 rounded-full bg-[#0071E3] hover:bg-blue-700 text-white text-sm md:text-base transition flex items-center justify-center"
                >
                    Launch App
                </Link>
            </div>
        </section>
    );
};

export default Hero;
