import HeaderCategory from "@/components/layout/HeaderCategory";

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  return (
    <>
      <HeaderCategory name={params.name} />
      <main className="container-app py-8">{children}</main>
    </>
  );
}
