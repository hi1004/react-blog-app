import SlideItem from '@/components/carousel/SlideItem';
import { IMAGES, carouselData, settings1, settings2 } from '@/data/dummyData';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Carousel = () => {
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);
  const slider1Ref = useRef<Slider | null>(null);
  const slider2Ref = useRef<Slider | null>(null);

  useEffect(() => {
    if (slider1Ref.current && slider2Ref.current) {
      setNav1(slider1Ref.current);
      setNav2(slider2Ref.current);
    }
  }, []);

  return (
    <div>
      <div className="bg__slider">
        <Slider {...settings2} asNavFor={nav1} ref={slider2Ref}>
          {IMAGES.map((image) => (
            <div key={image} className="w-full h-[400px]">
              <SlideItem image={image} filter />
            </div>
          ))}
        </Slider>
      </div>
      <Slider {...settings1} asNavFor={nav2} ref={slider1Ref}>
        {carouselData.map((data) => (
          <div key={data.id} className="w-full h-[400px] relative">
            <SlideItem
              image={data.image}
              title={data.title}
              description={data.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
