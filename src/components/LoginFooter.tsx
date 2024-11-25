// src/components/Footer.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { TEXT } from "@/app/texts";

const LoginFooter: React.FC = () => (
  <div className="w-full h-1/6 pl-4 pb-4 flex flex-col items-center lg:items-start justify-center lg:justify-end text-sm">
    <p>
      {TEXT.footer.poweredBy}
      <a href="https://inovadata.tech" target="_blank" className="font-bold">
        {TEXT.footer.inovaDataLink}
      </a>
    </p>
    <p>
      {TEXT.footer.copyrights} |
      <span> </span>
      <Link href="/termos-de-uso">{TEXT.footer.rightsReserved}</Link>
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
);

export default LoginFooter;
