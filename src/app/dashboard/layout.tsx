import Navbars from "@/components/admin/AdminComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbars pages={children} />
    </div>
  );
}
