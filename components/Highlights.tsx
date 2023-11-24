import Image from "next/image";

export default function Highlights() {
    return (
        <div className="flex flex-col flex-wrap place-items-center h-[812px] bg-gradient-to-b from-Mosque to-Wheat font-sans">
            <h1 className=" font-bold tracking-wide">Information about the website and data</h1>
            <div className="h-[600px] w-8/12 my-auto border-white border-2">Dashboard Highlights</div>
            {/* <Image src="/app/assets/Highlights-Image.png" width={400} height={400} alt="Dashboard Screenshot" /> */}
        </div>
    );
}
