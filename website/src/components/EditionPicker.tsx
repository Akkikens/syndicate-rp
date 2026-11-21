"use client";

import { useState, useSyncExternalStore } from "react";

// Recommends Standard or Ultimate using only facts already on /pre-order:
// Standard is the full game; Ultimate adds the listed items for $20 more.
// The server-rendered comparison table on the page is the no-JS baseline, so
// this picker stays hidden until the page has hydrated.
const subscribe = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(subscribe, () => true, () => false);

type Answer = "yes" | "no" | "";

const questions = [
  {
    id: "vehicles",
    label: "Do you want the extra vehicles and weapons (such as the '95 Grotti Cheetah)?",
  },
  {
    id: "style",
    label: "Do you want the Vice City-style outfits, hairstyles and tattoos?",
  },
  {
    id: "extras",
    label: "Do you want the classic car collection and the Ultimate-only services?",
  },
  { id: "budget", label: "Is spending $20 more okay for you?" },
] as const;

type Id = (typeof questions)[number]["id"];

export default function EditionPicker() {
  const hydrated = useHydrated();
  const [answers, setAnswers] = useState<Record<Id, Answer>>({
    vehicles: "",
    style: "",
    extras: "",
    budget: "",
  });

  if (!hydrated) return null;

  const done = questions.every((q) => answers[q.id] !== "");
  const wantsExtras =
    answers.vehicles === "yes" || answers.style === "yes" || answers.extras === "yes";

  let result = "";
  if (done) {
    if (!wantsExtras) {
      result =
        "Standard Edition ($79.99). It is the full game, and you said you do not want the Ultimate-only items.";
    } else if (answers.budget === "yes") {
      result =
        "Ultimate Edition ($99.99). It adds the items you picked for $20 more than Standard. The story is the same in both.";
    } else {
      result =
        "Standard Edition ($79.99). You want some Ultimate items but $20 more is not okay, and Standard is the full game.";
    }
  }

  return (
    <section className="neon-card mt-12 rounded-md p-6 sm:p-8">
      <h2 className="display text-2xl">Edition picker</h2>
      <p className="mt-2 text-sm text-muted">
        Four quick questions. It uses only the editions and prices above.
      </p>
      <form className="mt-6 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        {questions.map((q) => (
          <fieldset key={q.id} className="flex flex-col gap-2">
            <legend className="text-sm text-cream">{q.label}</legend>
            <div className="mt-2 flex gap-6">
              {(["yes", "no"] as const).map((v) => (
                <label key={v} className="flex cursor-pointer items-center gap-2 text-sm text-muted">
                  <input
                    type="radio"
                    name={q.id}
                    value={v}
                    checked={answers[q.id] === v}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: v }))}
                    className="h-4 w-4 accent-teal"
                  />
                  {v === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </form>
      <div aria-live="polite" className="mt-6 min-h-6">
        {done && (
          <p className="rounded-md border border-teal/30 bg-panel p-4 text-sm leading-relaxed text-cream">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal">
              Suggestion
            </span>
            <br />
            {result}
          </p>
        )}
      </div>
    </section>
  );
}
