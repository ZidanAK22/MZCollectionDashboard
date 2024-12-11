import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "MZ Collection" },
    { name: "description", content: "Home Page" },
  ];
};

export default function HomePage() {

  return (
    <div className="flex flex-col h-full w-full content-center items-center my-4 ">
      <main className="my-8 w-full space-y-8">
        <div className="text-center space-y-8">
          <h1 className="text-8xl font-bold"> SalesMon </h1>
          <p className="text-gray-100"> Your Plug n' Play Solution for E-Commerce Analytics </p>
          <div className="relative w-3/4 mx-auto -z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
            <img src="/salesmon.png" className="relative w-full" />
          </div>
        </div>
        <div className="p-8 space-y-8">
          <h2 className="text-3xl">
            Integrate all your E-Commerce Data to <span className="italic text-4xl font-bold">ONE APP</span>
          </h2>
          <div className="flex flex-row">
            <img src="Tokopedia_Mascot.png" width={96} />
            <img src={'https://cdn.brandfetch.io/idgVhUUiaD/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B'} width={256} />
          </div>
          <p>
            All the E-Commerce you run, analyzed here. instantly.
          </p>
        </div>
        <div>

        </div>
      </main>
    </div>
  );
}
