'use client'

import Container from '@/components/Container'
import theme from '@/theme';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { ShowDataProvider } from '@/context/ShowDataProvider';

export default function Home() {
  const { theme: currentTheme } = useTheme();
  const isLightTheme = currentTheme === "light";


  return (
    <ShowDataProvider>
      <main className={`flex min-h-screen ${isLightTheme ? 'bg-[#f6f8ff]' : 'bg-[#141d2f]'} flex-col font-mono items-center justify-start p-[75px_96px]`}>
        <Container />
      </main>
    </ShowDataProvider>
  )
}