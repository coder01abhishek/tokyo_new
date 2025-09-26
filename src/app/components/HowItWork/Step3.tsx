// components/Step3.jsx
import React from 'react';
import Image from 'next/image';
import { getAssetUrl } from '../../config/assets';

const Step3 = () => {
    return (
        <div className="flex items-center bg-[#1D1D1D] rounded-2xl sm:flex-row flex-col justify-center">
            <div className=" p-6 flex justify-center items-center min-w-[276px]" style={{ minHeight: '300px' }}>
                {/* Mobile Frame */}
                <div className="relative max-w-[120px]">
                    <div className='max-w-[120px]'>
                        <div className="relative w-full max-w-sm mx-auto overflow-hidden">
                            <video
                                src={getAssetUrl("/videos/step3.mp4")}
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                className="w-full h-full object-cover rounded-lg rounded-sm"
                            />
                            {/* <div
                                className="absolute inset-0 pointer-events-none scale-150"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(17, 17, 17, 0) 35.17%, #111111 95.42%)',
                                }}
                            /> */}
                        </div>
                        {/* <div className="text-content -mt-16 w-full text-center p-4 z-40 relative">
                            <p className="font-medium text-white text-[10px]">Kai</p>
                            <p className="mt-1 text-[6px] text-center w-[95%] mx-auto">Energetic & fun, perfect for gaming and casual chats.</p>
                        </div> */}

                    </div>
                    {/* <span className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
                        <Image
                            src={getAssetUrl("/iPhone14Pro.svg")}
                            alt="Swiper frame decoration"
                            width={200}
                            height={300}
                            priority
                        />
                    </span> */}
                </div>
            </div>

            {/* Step Info */}
            <div className="text-center sm:text-left sm:px-none px-6 sm:pb-none pb-6">
                <div className="inline-flex items-center gap-2 border border-[#3B82F6] px-5 py-2 rounded-full">
                    <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                    <span className="text-white font-semibold">Step 3</span>
                </div>
                <h3 className="text-[32px] text-white mb-3 mt-7">Talk</h3>
                <p className="text-[#A0A0A0] text-[20px]">Have real conversations that feel natural and alive.</p>
            </div>

        </div>
    );
};

export default Step3;
