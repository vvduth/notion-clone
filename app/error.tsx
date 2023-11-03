"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import React from "react";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      
      <Image
        src={"https://source.unsplash.com/1600x900/?error"}
        height={"300"}
        alt="Error"
        width={"300"}
        className="dark:hidden"
      />
      <Image
        src={"https://source.unsplash.com/1600x900/?wrong"}
        height={"300"}
        alt="Error"
        width={"300"}
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">Something went wrong</h2>
      <Button asChild>
        <Link href={"/documents"}>
            Go back
        </Link>
      </Button>
    </div>
  );
};

export default Error;
