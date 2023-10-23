interface SlideItemProps {
  title?: string;
  description?: string;
  image: string;
  filter?: boolean;
}
const SlideItem = ({ image, title, description, filter }: SlideItemProps) => {
  return (
    <>
      <img
        src={image}
        alt={description}
        className={`object-cover w-full h-full ${
          filter ? 'blur-sm' : 'brightness-[0.6]'
        }`}
      />
      <div className="flex h-full flex-col  w-full absolute top-[50%] items-center justify-center gap-10 sm:gap-20 px-14 left-[50%] translate-x-[-50%] translate-y-[-50%]  text-white">
        <h1 className="text-5xl font-bold text-center sm:text-6xl">{title}</h1>
        <p className="text-sm font-medium sm:text-base xl:text-lg">
          {description}
        </p>
      </div>
    </>
  );
};

export default SlideItem;
