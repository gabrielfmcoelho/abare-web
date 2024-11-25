// src/components/Header.tsx

import Image from "next/image";
import { TEXT } from "@/app/texts";

const LoginHeader: React.FC = () => (
  <div className="w-full h-1/6 pl-4 pt-4 justify-center flex flex-col items-center lg:items-start">
    <Image src={TEXT.header.logoSrc} alt={TEXT.header.logoAlt} width={100} height={100} />
  </div>
);

export default LoginHeader;
