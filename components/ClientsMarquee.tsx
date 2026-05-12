"use client";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

type Client = {
  name: string;
  logo?: string;
};

const CLIENTS: Client[] = [
  { name: "Brand 1", logo: "/brand1.avif" },
  { name: "Brand 2", logo: "/brand2.avif" },
  { name: "Brand 3", logo: "/brand3.avif" },
  { name: "Brand 4", logo: "/brand4.avif" },
  { name: "Brand 5", logo: "/brand5.avif" },
  { name: "Brand 6", logo: "/brand6.avif" },
  { name: "Brand 7", logo: "/brand7.avif" },
  { name: "Brand 8", logo: "/brand8.avif" },
  { name: "Brand 9", logo: "/brand9.avif" },
];

function LogoTile({ client }: { client: Client }) {
  return (
    <div className="mx-2 md:mx-3 flex h-14 md:h-16 w-[144px] md:w-[180px] shrink-0 items-center justify-center rounded-lg border border-black/15 bg-white px-4">
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          className="max-h-8 md:max-h-9 w-auto max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="montserrat-medium text-[11px] md:text-xs uppercase tracking-[0.17em] text-black/75">
          {client.name}
        </span>
      )}
    </div>
  );
}

export default function ClientsMarquee() {
  const firstRow = CLIENTS.slice(0, 4);
  const secondRow = CLIENTS.slice(4);

  return (
    <section id="clients" className="relative z-10 w-full overflow-hidden bg-white my-14 md:my-20 py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">
        <h2 className="montserrat-medium font-[400] text-center text-[clamp(2rem,5vw,4.4rem)] leading-[0.95] tracking-tighter text-black">
          We Work With the{" "}
          <span className="cormorant-font italic text-[#C8A2D4] normal-case">
            Best
          </span>
        </h2>
        <p className="montserrat-medium mx-auto mt-4 max-w-2xl text-center text-sm md:text-base text-black/70">
          Brands that care about real growth, strong storytelling, and long-term
          results.
        </p>
      </div>

      <ScrollVelocityContainer className="mt-9 md:mt-12 space-y-3 md:space-y-4">
        <ScrollVelocityRow
          baseVelocity={3.2}
          direction={1}
          className="py-1.5 md:py-2"
        >
          {firstRow.map((client) => (
            <LogoTile key={client.name} client={client} />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow
          baseVelocity={2.9}
          direction={-1}
          className="py-1.5 md:py-2"
        >
          {secondRow.map((client) => (
            <LogoTile key={client.name} client={client} />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}
