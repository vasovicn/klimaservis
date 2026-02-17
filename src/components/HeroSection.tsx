"use client";

import BookingButton from "./booking/BookingButton";
import {Snowflake, Wrench, Sparkles, Handshake} from "lucide-react";

export default function HeroSection() {
    return (
        <section
            id="pocetna"
            className="relative min-h-screen bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat text-white"
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-brand-900/75"/>

            {/* Blur decorative shapes */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"/>
                <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl"/>
            </div>

            <div className="relative z-10 flex min-h-screen flex-col justify-center px-4 py-32">
                {/* HERO CONTENT */}
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Profesionalni klima servis
                        <span className="block text-brand-200">
              u Beogradu
            </span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-lg text-brand-100 sm:text-xl">
                        Servis, popravka i čišćenje klima uređaja. Brzo,
                        pouzdano i po najpovoljnijim cenama.
                    </p>

                    <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <BookingButton variant="hero"/>
                        <a
                            href="#cene"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                        >
                            Pogledajte cene
                        </a>
                    </div>
                </div>

                {/* ZAŠTO BAŠ MI */}
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
                        Zašto baš mi?
                    </h2>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div
                            className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md transition-all hover:bg-white/20">
                            <Snowflake className="mx-auto mb-6 h-10 w-10 text-brand-200"/>
                            <h3 className="mb-3 text-xl font-semibold">
                                Brza intervencija
                            </h3>
                            <p className="text-sm text-brand-100">
                                Dolazak na adresu u Beogradu u najkraćem roku.
                            </p>
                        </div>

                        <div
                            className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md transition-all hover:bg-white/20">
                            <Wrench className="mx-auto mb-6 h-10 w-10 text-brand-200"/>
                            <h3 className="mb-3 text-xl font-semibold">
                                Iskusni majstori
                            </h3>
                            <p className="text-sm text-brand-100">
                                Više od 10 godina iskustva sa svim tipovima klima uređaja.
                            </p>
                        </div>

                        <div
                            className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md transition-all hover:bg-white/20">
                            <Sparkles className="mx-auto mb-6 h-10 w-10 text-brand-200"/>
                            <h3 className="mb-3 text-xl font-semibold">
                                Detaljno čišćenje
                            </h3>
                            <p className="text-sm text-brand-100">
                                Uklanjanje bakterija, buđi i neprijatnih mirisa.
                            </p>
                        </div>

                        <div
                            className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md transition-all hover:bg-white/20">
                            <Handshake className="mx-auto mb-6 h-10 w-10 text-brand-200"/>
                            <h3 className="mb-3 text-xl font-semibold">
                                Transparentne cene
                            </h3>
                            <p className="text-sm text-brand-100">
                                Bez skrivenih troškova – sve unapred dogovoreno.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
