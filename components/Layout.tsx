import React, { ReactNode } from "react";
import Meta from "./Meta";
import Header from "./header";
import Footer from "./footer";
import H1Template from "./h1template";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-24 sm:py-24 lg:py-10">
        <div className="mx-auto max-w-7xl px-2 lg:px-4">
      <Meta />

      {children}
      
    </div>
    </div>
    </div>
  );
}