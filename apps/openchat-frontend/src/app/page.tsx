"use client";
import Chat from '@/components/chat';

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen h-full sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col">
          <Chat />
      </main>
    </div>
  );
}
