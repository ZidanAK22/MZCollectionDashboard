import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "MZCollection" },
    {
      property: "og:title",
      content: "Showcase",
    },
    {
      name: "description",
      content: "Product showcase",
    },
  ];
};

const images = [
    { src: "/baju1.jpeg", price: "Rp 84.000" },
    { src: "/baju2.jpeg", price: "Rp 84.000" },
    { src: "/baju3.jpeg", price: "Rp 32.000" },
    { src: "/baju4.jpeg", price: "Rp 32.000" },
    { src: "/baju5.jpeg", price: "Rp 84.000" },
    { src: "/baju6.jpeg", price: "Rp 84.000" },
    { src: "/baju7.jpeg", price: "Rp 32.000" },
    { src: "/baju8.jpeg", price: "Rp 84.000" },
    { src: "/baju9.jpeg", price: "Rp 32.000" },
    { src: "/baju10.jpeg", price: "Rp 84.000" },
];

export default function ProductPage() {
    const nextButtonRef = useRef<HTMLButtonElement | null>(null); // Reference for "Next" button
    const previousButtonRef = useRef<HTMLButtonElement | null>(null); // Reference for "Previous" button
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isForward, setIsForward] = useState(true); // Track the direction of the carousel

    useEffect(() => {
        const totalItems = images.length;

        const interval = setInterval(() => {
            if (isForward) {
                if (currentIndex < totalItems - 1) {
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                    nextButtonRef.current?.click(); // Move to the next item
                } else {
                    setIsForward(false); // Switch to backward direction at the end
                }
            } else {
                if (currentIndex > 0) {
                    setCurrentIndex((prevIndex) => prevIndex - 1);
                    previousButtonRef.current?.click(); // Move to the previous item
                } else {
                    setIsForward(true); // Switch to forward direction at the start
                }
            }
        }, 2000); // 2 seconds per slide

        // Clean up on component unmount
        return () => clearInterval(interval);
    }, [currentIndex, isForward]);

    return (
        <main
            className="w-full h-screen gap-12 pt-12 pr-60 bg-produk bg-cover bg-center"            
        >
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-lg absolute right-[24.25rem] bottom-[6.5rem]"
            >
                <CarouselContent>
                    {images.map((item, index) => (
                        <CarouselItem key={index} className="basis-full">
                            <div className="p-1">
                                <Card style={{ borderRadius: "50px", backgroundColor: "white" }}>
                                    <CardContent className="flex flex-col items-center justify-center p-2 h-[45rem]">
                                        <img
                                            src={item.src}
                                            alt={`Image ${index + 1}`}
                                            style={{ borderRadius: "40px", height: "39rem" }}
                                            className="w-full h-full object-cover"
                                        />
                                        <p className="text-[40px] font-semibold text-center mt-4">{item.price}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious ref={previousButtonRef} />
                <CarouselNext ref={nextButtonRef} />
            </Carousel>
        </main>
    );
}
