import Image from 'next/image';

interface Slide2Props {
    image: string;
  }
  
  export function Slide2({ image }: Slide2Props) {
      return (
        <div className="slide-content">
          <Image src={image} alt="Slide 2" width={250} height={250} className="slide-image" />
          <h1>Welcome to Slide 1</h1>
          <p>This is a description for Slide 1.</p>
        </div>
      );
    }
    