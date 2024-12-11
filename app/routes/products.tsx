import { useEffect, useRef } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";

// Array berisi jalur atau URL gambar yang ingin ditampilkan
const images = [
    "/baju1.jpeg",
    "/baju2.jpeg",
    "/baju3.jpeg",
    "/baju4.jpeg",
    "/baju5.jpeg",
    "/baju6.jpeg",
    "/baju7.jpeg",
    "/baju8.jpeg",
    "/baju9.jpeg",
    "/baju10.jpeg",
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
                backgroundImage: `url('background_produk.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-lg absolute right-[26.25rem] bottom-[12.5rem]"
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="basis-full" >
                            <div className="p-1 ">
                                <Card style={{ borderRadius: "50px", backgroundColor: "white" }}>
                                    <CardContent className="flex items-center justify-center p-2 h-[50rem]">
                                        <img
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            style={{ borderRadius: "40px", height: "49rem" }}
                                            className="w-full h-full object-cover"
                                        />
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