import Link from "next/link";
import { Layers3 } from "lucide-react";

export function AboutSection() {
  return (
    <section className="section about reveal" aria-labelledby="about-heading">
      <p className="sectionLabel">/ About</p>
      <div className="sectionContent aboutCopy">
        <h2 className="sr-only" id="about-heading">About</h2>
        <p>
          Hi there! I’m Ronnie, a full stack <Layers3 aria-hidden /> software
          engineer who enjoys working where product, design and engineering
          overlap. I care about how something feels to use just as much as how
          it behaves when things go wrong.
        </p>
        <p className="socialLine">
          You can find me on{" "}
          <Link href="https://linkedin.com/in/ronniekiyegga" target="_blank" rel="noreferrer">LinkedIn</Link>,{" "}
          <span>Instagram</span> and <span>Apple</span>
        </p>
        <p>
          Most of my work has involved building products end-to-end, from
          interfaces and design systems to APIs, databases and real-time
          systems. I tend to get curious about the decisions underneath the
          implementation: why this architecture, what happens when it fails,
          and whether the added complexity has actually earned its place.
        </p>
        <p>
          Outside of shipping products, I spend a lot of time learning through
          building, writing about engineering problems I&apos;ve encountered, and
          occasionally disappearing too far down a Figma rabbit hole.
        </p>
      </div>
    </section>
  );
}
