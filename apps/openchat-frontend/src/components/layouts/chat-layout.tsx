import { DrawerLeft } from "./drawer-left";
import { DrawerRight } from "./drawer-right";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <div className="flex min-h-screen w-screen">
        <div className="bg-gray-100 dark:bg-[#181818] fixed left-0 hidden md:block h-screen w-[300px]">
          <DrawerLeft />
        </div>
        <div className="absolute dark:bg-[#1B1B1B] top-0 bottom-0 overflow-auto custom-scrollbar md:left-[300px] right-[360px] p-12 pl-20 pr-20">
          {children}
        </div>
        <div className="bg-gray-100 h-screen fixed right-0 w-[360px] dark:bg-[#181818]">
          <DrawerRight />
        </div>
      </div>
  );
};
