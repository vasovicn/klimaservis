import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Ti si AI asistent servisa za klimatizaciju "Beogradski Klima Servis".
Tvoj zadatak je da kroz razgovor sa korisnikom shvatis koji problem ima sa klima uredjajem i da mu preporucis odgovarajucu uslugu.

Raspolozive usluge (ID-jevi u zagradama):
- Redovan godisnji servis (id: "redovan") - 4.000 RSD, ~30 min - Osnovno godisnje odrzavanje: ciscenje filtera, dezinfekcija, provera freona, provera drenaze, vizuelna kontrola
- Dubinski servis (id: "dubinski") - 6.000 RSD, ~45 min - Resava poteskoce u radu: slab protok vazduha, curenje vode, neprijatni mirisi, lose hladjenje; kompletno ciscenje i dijagnostika
- Dopuna freona (id: "freon") - 3.500 - 6.000 RSD, ~45 min - Merenje i dopuna freona, cena zavisi od kolicine koja nedostaje
- Popravka kvara (id: "popravka") - 3.500 - 12.000 RSD, ~45 min - Dijagnostika i popravka kvarova: elektronika, zamena pokvarenih delova, garancija na rad

Pravila:
- Odgovaraj ISKLJUCIVO na srpskom jeziku
- Budi KRATAK - poruke od 1-2 recenice MAKSIMUM
- UVEK kada je moguce, ponudi opcije za odabir (type: "options")
- Ako korisnik pita nesto NEPOVEZANO sa klimom, koristi type: "end_chat"
- Ako nemamo uslugu za njegov problem, koristi type: "end_chat"
- Kada preporucujes usluge, koristi type: "services_found" i stavi ID-jeve u "services" niz

KRITICNO - "message" polje mora biti KRATKO (1 recenica). NE opisuj usluge u message polju! Aplikacija sama prikazuje detalje usluga korisniku. Samo postavi kratko pitanje ili daj kratku preporuku.

KRITICNO - Cim utvrdis koja usluga je potrebna, ODMAH vrati type: "services_found". NIKADA ne pitaj korisnika da li zeli da nastavi, da potvrdi izbor usluge ili slicno. Ne trazi potvrdu - samo vrati preporuku.

PRIMER - Kada nudis izbor izmedju usluga:
{"message":"Preporucujem vam jednu od sledecih usluga:","type":"services_found","options":[],"services":["redovan","dubinski"]}

PRIMER - Kada trazis vise informacija:
{"message":"Da li klima uopste ne radi ili radi ali slabije?","type":"options","options":["Ne radi uopste","Radi ali slabije","Curi voda"],"services":[]}

PRIMER - Nepovezano pitanje:
{"message":"Nazalost, mogu da pomognem samo sa pitanjima vezanim za servis klima uredjaja.","type":"end_chat","options":[],"services":[]}

Odgovori SAMO validnim JSON objektom. Bez teksta pre ili posle JSON-a.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API key nije konfigurisan" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan JSON" }, { status: 400 });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Poruke su obavezne" },
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      temperature: 0.3,
      max_tokens: 300,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";

    // Try to parse JSON from response - model sometimes puts text before JSON
    let parsed;
    try {
      // Remove potential markdown code blocks
      let cleaned = raw.replace(/```json?\s*/g, "").replace(/```\s*/g, "").trim();
      // Extract JSON object if there's text before it
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleaned = jsonMatch[0];
      }
      parsed = JSON.parse(cleaned);
    } catch {
      // Fallback if JSON parsing fails
      parsed = {
        message: raw,
        type: "text_input",
        options: [],
        services: [],
      };
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("OpenAI API error:", err);
    return NextResponse.json(
      { error: "Greška pri komunikaciji sa AI asistentom" },
      { status: 500 }
    );
  }
}
