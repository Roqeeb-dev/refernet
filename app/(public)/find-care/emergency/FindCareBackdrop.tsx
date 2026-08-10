import Image from "next/image";

export default function FindCareBackdrop({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden p-base sm:p-xl">
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-green-900/20" />
      <div className="relative z-10 w-full max-w-[380px]">{children}</div>
    </div>
  );
}
