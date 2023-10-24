"use client"
import Image from "next/image";

import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] sm:w-[350px] sm:h-[350px]">
          <Image
            fill
            src={"https://source.unsplash.com/1600x900/?documents"}
            className="object-contain"
            alt="Document"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            className="object-contain"
            alt="Reading"
            fill
            src={"https://source.unsplash.com/1600x900/?reading"}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
