// src/components/MainContent.tsx

import Image from "next/image";
import { TEXT } from "@/app/texts";
import FeatureList from "@/components/FeatureList";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const MainContent: React.FC = () => (
  <div className="flex flex-col items-center justify-center w-full lg:w-1/2 h-screen lg:space-y-4 bg-white">
    <div className="w-full h-1/6 pl-4 pt-4 justify-center flex flex-col items-center lg:items-start">
      <a href="https://inovadata.tech"  className="cursor-pointer">
        <Image src={TEXT.header.logoSrc} alt={TEXT.header.logoAlt} width={100} height={100} />
      </a>
    </div>
    <div className="w-full h-4/6 pl-4 flex flex-col items-center justify-evenly">
      <div className="flex flex-row items-center justify-center -space-x-4">
        <Image src="/novoabare.png" alt={TEXT.header.logoAlt} width={100} height={100} />
        <h1 className="text-3xl font-extrabold text-[#23a4c5]">{TEXT.header.title}</h1>
      </div>
      <p className="text-center pl-16 pr-16 lg:pl-28 lg:pr-28">
        {TEXT.description.main}
      </p>
      <FeatureList />
    </div>
    <div className="w-full h-1/6 pl-4 pb-4 flex flex-col items-center lg:items-start justify-center lg:justify-end text-sm">
      <p>
        {TEXT.footer.poweredBy}{" "}
        <a href="https://inovadata.tech" target="_blank" className="font-bold">
          {TEXT.footer.inovaDataLink}
        </a>
      </p>
      <p>
        {TEXT.footer.copyrights} |
        <span> </span>
        <a href="/termos-de-uso">{TEXT.footer.rightsReserved}</a>
      </p>
      <p>
        {TEXT.footer.contact}
      </p>
      <div className="flex flex-row space-x-4">
        <Button variant="ghost" className="flex flex-row">
          <Phone size={18} />
        </Button>
      </div>
    </div>
  </div>
);

export default MainContent;
