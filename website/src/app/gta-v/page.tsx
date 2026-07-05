import type { Metadata } from "next";
import CopyConnect from "@/components/CopyConnect";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `GTA V — ${site.server.name} FiveM Server`,
  description: `${site.server.shortPitch} Join ${site.server.name}, our GTA V FiveM roleplay server — drag racing, car clubs, custom builds, and up to ${site.server.slots} players.`,
  alternates: { canonical: "/gta-v" },
};

const features = [
  {
    name: "Drag racing",
    detail:
      "Challenge anyone, put money on it, and climb the server leaderboard. Purpose-built drag strips with proper staging.",
  },
  {
    name: "Car culture first",
    detail:
      "Custom builds, tuning, and scheduled car meets with events. This server is built around the cars, not tacked on.",
  },
  {
    name: "Custom HUD",
    detail:
      "Our own clean interface — speed, health, armor, hunger, thirst, and cash without the clutter.",
  },
  {
    name: "Car clubs",
    detail:
      "Create or join a crew, rep your territory, and roll to meets together. Club wars are on the roadmap.",
  },
  {
    name: "Serious RP economy",
    detail:
      "Jobs, businesses, and a balanced economy on the Qbox framework — grind up from a beater to a garage full of builds.",
  },
  {
    name: `${site.server.slots} player slots`,
    detail:
      "OneSync Infinity means big-server energy: full lobbies, busy meets, and rivals who remember you.",
  },
];

const steps = [
  {
    step: "Own GTA V on PC",
    detail: "Any PC copy works (Steam, Epic, or Rockstar Launcher).",
  },
  {
    step: "Install FiveM",
    detail: "Free mod client from fivem.net — it doesn't touch your GTA Online install.",
  },
  {
    step: "Join the server",
    detail: "Click connect below, or paste the command into the FiveM F8 console.",
  },
  {
    step: "Hop in Discord",
    detail: "Whitelisting, rules, meet schedules, and LFG all live there.",
  },
];

export default function GtaVPage() {
  const [lead, ...rest] = site.server.name.split(" ");
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="eyebrow">GTA V · FiveM</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        {lead}
        {rest.length > 0 && (
          <>
            {" "}
            <span className="text-teal">{rest.join(" ")}</span>
          </>
        )}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        {site.server.shortPitch} GTA VI is coming — until then, this is where
        we play.
      </p>

      <div className="mt-8">
        <CopyConnect />
      </div>

      {/* Features */}
      <section className="mt-20">
        <p className="eyebrow">What&apos;s on the server</p>
        <h2 className="display mt-3 text-3xl">Built for car people</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.name} className="neon-card rounded-md p-6">
              <h3 className="display text-lg text-teal">{f.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to join */}
      <section className="mt-20">
        <p className="eyebrow">How to join</p>
        <h2 className="display mt-3 text-3xl">On the server in 10 minutes</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.step} className="neon-card rounded-md p-6">
              <span className="font-mono text-xs text-vice">
                Step {i + 1}
              </span>
              <h3 className="display mt-2 text-lg">{s.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Discord CTA */}
      <section className="mt-20 rounded-md border border-teal/30 bg-panel p-8 text-center sm:p-12">
        <h2 className="display text-3xl">Ready to pull up?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Join the Discord for whitelisting and the next car meet, then connect
          in-game.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={site.server.connectUrl}
            className="btn btn-teal"
          >
            Connect via FiveM
          </a>
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Join Discord
          </a>
        </div>
      </section>
    </div>
  );
}
