import { useEffect, useRef } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";

// Array berisi jalur atau URL gambar yang ingin ditampilkan beserta harga
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
    const nextButtonRef = useRef<HTMLButtonElement | null>(null); // Referensi untuk tombol "Next"

    useEffect(() => {
        // Fungsi untuk menggerakkan carousel
        const interval = setInterval(() => {
            if (nextButtonRef.current) {
                nextButtonRef.current.click(); // Klik tombol "Next" secara otomatis
            }
        }, 2000); // 2000ms = 2 detik

        // Membersihkan interval saat komponen unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <main
            className="w-full h-screen gap-12 pt-12 pr-60"
            style={{
                backgroundImage: `url('background.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-lg absolute right-[24.25rem] bottom-[6.5rem]"
            >
                <CarouselContent>
                    {images.map((item, index) => (
                        <CarouselItem key={index} className="basis-full"                        >
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
                <CarouselPrevious />
                <CarouselNext ref={nextButtonRef} />
            </Carousel>
        </main>
    );
}
