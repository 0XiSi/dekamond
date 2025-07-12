import localFont from "next/font/local";

export const vazirmatn = localFont({
  src: [
    {
      path: '../../public/fonts/Vazirmatn-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Vazirmatn-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Vazirmatn-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})