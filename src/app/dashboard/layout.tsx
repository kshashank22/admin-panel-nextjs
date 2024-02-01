import { Inter } from "next/font/google";
import Navbars from "@/components/admin/AdminComponent";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbars/>
        {children}
      </body>
    </html>
  );
}
