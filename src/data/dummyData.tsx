// carousel data
const IMAGE_1_URL =
  'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const IMAGE_2_URL =
  'https://www.freecodecamp.org/news/content/images/2022/08/pexels-antonio-batinic--4164418--1-.jpg';

const IMAGE_3_URL =
  'https://miro.medium.com/v2/resize:fit:1200/0*XCgoYU9sqt95P8J0.png';
export const IMAGES = [IMAGE_1_URL, IMAGE_2_URL, IMAGE_3_URL];

export const carouselData = [
  {
    id: 1,
    image: IMAGES[0],
    title: 'FrontEnd',
    description:
      'フロントエンドは、ウェブアプリケーションのユーザーインターフェースとユーザーエクスペリエンスを管理する領域です。ウェブサイトのデザイン、レイアウト、コンテンツの表示などを担当し、主にHTML、CSS、JavaScriptを使用してウェブページを作成します。',
  },
  {
    id: 2,
    image: IMAGES[1],
    title: 'JavaScript',
    description:
      'JavaScriptは、ウェブ開発で最も広く使用されているプログラミング言語の1つで、クライアントサイドのスクリプト言語です。ウェブページ内で要素を動的に操作したり、ユーザーと対話したりするために使用されます。',
  },
  {
    id: 3,
    image: IMAGES[2],
    title: 'React',
    description:
      'ReactはFacebookによって開発されたJavaScriptライブラリで、ユーザーインターフェースを作成するためのライブラリです。コンポーネントベースのアーキテクチャを使用し、ウェブアプリケーション開発を簡素化し、より効率的に行うのに役立つツールです。',
  },
];

// slider settings
const commonSetting = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
};

export const settings1 = {
  dots: true,
  fade: true,
  autoplay: true,
  autoplaySpeed: 5000,
  ...commonSetting,
};
export const settings2 = {
  dots: false,
  fade: false,
  ...commonSetting,
};
