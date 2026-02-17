export interface ServiceDefinition {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  duration: number; // minutes
  description: string;
  features: string[];
}

export const SERVICES: ServiceDefinition[] = [
  {
    id: "mali",
    name: "Mali servis",
    price: "4.000",
    priceValue: 4000,
    duration: 30,
    description: "Osnovno čišćenje i provera klima uređaja",
    features: [
      "Čišćenje filtera",
      "Provera nivoa freona",
      "Dezinfekcija unutrašnje jedinice",
      "Vizuelna kontrola sistema",
    ],
  },
  {
    id: "veliki",
    name: "Veliki servis",
    price: "7.000",
    priceValue: 7000,
    duration: 60,
    description: "Kompletno čišćenje i održavanje klima uređaja",
    features: [
      "Kompletno čišćenje unutrašnje jedinice",
      "Čišćenje spoljašnje jedinice",
      "Dopuna freona",
      "Dezinfekcija i antibakterijski tretman",
      "Provera svih komponenti",
    ],
  },
  {
    id: "kondenzator",
    name: "Zamena kondenzatora",
    price: "5.000",
    priceValue: 5000,
    duration: 45,
    description: "Dijagnostika i zamena kondenzatora",
    features: [
      "Dijagnostika kvara",
      "Zamena kondenzatora",
      "Testiranje sistema",
      "Garancija na rad",
    ],
  },
];

export function calculateDuration(serviceIds: string[]): number {
  const durations = serviceIds
    .map((id) => SERVICES.find((s) => s.id === id)?.duration ?? 0)
    .filter((d) => d > 0);
  return durations.length > 0 ? Math.max(...durations) : 0;
}

export function validateServiceIds(serviceIds: string[]): boolean {
  return (
    serviceIds.length > 0 &&
    serviceIds.every((id) => SERVICES.some((s) => s.id === id))
  );
}
