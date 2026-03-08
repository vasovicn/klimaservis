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
    id: "redovan",
    name: "Redovan godišnji servis",
    price: "4.000",
    priceValue: 4000,
    duration: 30,
    description: "Osnovno godišnje održavanje klima uređaja za dugotrajnu pouzdanost i efikasnost",
    features: [
      "Čišćenje filtera",
      "Dezinfekcija unutrašnje jedinice",
      "Provera nivoa freona",
      "Provera drenažnog sistema",
      "Vizuelna kontrola svih komponenti",
    ],
  },
  {
    id: "dubinski",
    name: "Dubinski servis",
    price: "6.000",
    priceValue: 6000,
    duration: 45,
    description: "Rešava poteškoće u radu klime: slab protok vazduha, curenje vode, neprijatni mirisi, loše hlađenje",
    features: [
      "Kompletno čišćenje unutrašnje jedinice",
      "Čišćenje spoljašnje jedinice",
      "Dijagnostika uzroka problema",
      "Dezinfekcija i antibakterijski tretman",
      "Provera i čišćenje drenažnog sistema",
      "Testiranje rada sistema",
    ],
  },
  {
    id: "freon",
    name: "Dopuna freona",
    price: "od 3.500",
    priceValue: 3500,
    duration: 45,
    description: "Cena zavisi od količine freona koji nedostaje u sistemu — od 3.500 do 6.000 RSD",
    features: [
      "Merenje nivoa freona",
      "Provera curenja sistema",
      "Dopuna odgovarajuće količine freona",
      "Testiranje rada klime nakon dopune",
    ],
  },
  {
    id: "popravka",
    name: "Popravka kvara",
    price: "od 3.500",
    priceValue: 3500,
    duration: 45,
    description: "Dijagnostika i otklanjanje raznih kvarova — od elektronike do zamene pokvarenih delova, od 3.500 do 12.000 RSD",
    features: [
      "Dijagnostika kvara",
      "Zamena pokvarenog dela",
      "Popravka elektronike",
      "Testiranje sistema",
      "Garancija na izvršeni rad",
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
