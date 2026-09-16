import Image from "next/image";
import slider1 from "@/assets/images/slider-1.png";
import slider2 from "@/assets/images/slider-2.png";
import slider3 from "@/assets/images/slider-3.png";
import slider4 from "@/assets/images/slider-4.png";

const slides = [slider1, slider2, slider3, slider4];

export default function SliderMask() {
  return (
    <section className="home-mask-slider" aria-labelledby="home-mask-title">
      <div className="home-mask-slider__window" aria-hidden="true">
        <div className="home-mask-slider__track">
          {[...slides, ...slides].map((src, index) => (
            <div className="home-mask-slider__slide" key={`${src}-${index}`}>
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 767px) 58vw, 30vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
