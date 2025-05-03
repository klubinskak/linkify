import Image from 'next/image';

interface Slide2Props {
    image: string;
  }
  
  export function Slide2({ image }: Slide2Props) {
      return (
        <div className="slide-content">
           <Image
        src={image}
        alt="Slide 1"
        width={1200}
        height={1200}
        className="absolute inset-0 w-full h-full object-contain"
      />
          <h1>Welcome to Slide 1</h1>
          <p>This is a description for Slide 1.</p>
        </div>
      );
    }
    