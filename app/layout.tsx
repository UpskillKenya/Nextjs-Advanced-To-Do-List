import ProviderFunction from "@components/Context/AppContext";
import { Metadata } from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "To-do-list",
  description: "To-do-list in Next.js",
  icons: {
    icon: "/icons/favicon.png",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className=" bg-slate-100 max-w-2xl mx-auto px-3">
        <ProviderFunction>
          <main>{children}</main>
        </ProviderFunction>
      </body>
    </html> 
  );
};

export default RootLayout;
