import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const NavigationMobile = () => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-950 p-4 flex justify-around items-center z-[555]">
      <Link href={"/"} className="flex flex-col items-center">
        <Icon icon="mdi:home" width={24} height={24} />
        <span className="text-sm">Home</span>
      </Link>
      <Link href={"/deleted"} className="flex flex-col items-center">
        <Icon icon="mdi:history" width={24} height={24} />
        <span className="text-sm">History</span>
      </Link>
      <Link href={"/add-video"} className="flex flex-col items-center">
        <Icon icon="mdi:add" width={24} height={24} />
        <span className="text-sm">Add</span>
      </Link>
    </div>
  );
};

export default NavigationMobile;
