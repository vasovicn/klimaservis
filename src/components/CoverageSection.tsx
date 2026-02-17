const municipalities = [
  "Novi Beograd",
  "Zemun",
  "Vračar",
  "Voždovac",
  "Stari Grad",
  "Savski Venac",
  "Čukarica",
  "Rakovica",
  "Palilula",
  "Zvezdara",
  "Surčin",
  "Grocka",
  "Mladenovac",
  "Lazarevac",
  "Obrenovac",
  "Barajevo",
  "Sopot",
];

export default function CoverageSection() {
  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Pokrivamo ceo Beograd
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">
          Naš klima servis dolazi na vašu adresu u svim delovima Beograda.
          Brza intervencija bez obzira na lokaciju.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {municipalities.map((m) => (
            <span
              key={m}
              className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
