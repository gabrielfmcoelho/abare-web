// src/app/page.tsx

"use client";

import LoginContentPage from "@/components/LoginContentPage";
import LoginForm from "@/components/LoginForm";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full bg-slate-100">
      <LoginContentPage />
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
