"use client";

import Image from "next/image";

const ITEMS = [
  {
    src: "/mg.png",
    alt: "OpenHands merged PR",
    prUrl: "https://github.com/OpenHands/OpenHands/pull/12702",
    label: "OpenHands #12702",
  },
  {
    src: "/mg1.png",
    alt: "tldraw merged PR",
    prUrl: "https://github.com/tldraw/tldraw/pull/6987",
    label: "tldraw #6987",
  },
  {
    src: "/mg2.png",
    alt: "shadcn/ui merged PR",
    prUrl: "https://github.com/shadcn-ui/ui/pull/8878",
    label: "shadcn-ui/ui #8878",
  },
  {
    src: "/mg3.png",
    alt: "Next.js merged PR",
    prUrl: "https://github.com/vercel/next.js/pull/88653",
    label: "vercel/next.js #88653",
  },
  {
    src: "/mg4.png",
    alt: "OpenHands merged PR",
    prUrl: "https://github.com/deepset-ai/haystack-core-integrations/pull/3016",
    label: "haystack-core-integrations #3016",
  },
  {
    src: "/mg5.png",
    alt: "PostHog merged PR",
    prUrl: "https://github.com/PostHog/posthog/pull/34946",
    label: "PostHog/posthog #34946",
  },
  {
    src: "/mg6.png",
    alt: "PrefectHQ merged PR",
    prUrl: "https://github.com/PrefectHQ/prefect/pull/19548",
    label: "PrefectHQ/prefect #19548",
  },
  {
    src: "/mg7.png",
    alt: "OpenHands merged PR",
    prUrl:
      "https://github.com/OpenHands/OpenHands/pull/13418",
    label: "OpenHands #13418",
  },
];

function Cell({ src, alt, prUrl, label }) {
  const overlay = (
    <div className="recognition-overlay" aria-hidden="true">
      <span className="recognition-badge">PR merged</span>
      {label ? (
        <span className="recognition-pr-label">{label}</span>
      ) : (
        <span className="recognition-pr-label recognition-pr-label--muted">
          Set link in PrRecognitionGallery.jsx
        </span>
      )}
      {prUrl ? (
        <span className="recognition-cta">Open PR →</span>
      ) : null}
    </div>
  );

  const inner = (
    <>
      <div className="recognition-thumb">
        <Image
          src={src}
          alt={alt}
          width={200}
          height={112}
          sizes="(max-width: 480px) 42vw, 180px"
          className="recognition-img-inner"
        />
      </div>
      {overlay}
    </>
  );

  if (prUrl) {
    return (
      <a
        href={prUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="recognition-card recognition-card--link"
      >
        {inner}
      </a>
    );
  }

  return <div className="recognition-card recognition-card--static">{inner}</div>;
}

export default function PrRecognitionGallery() {
  return (
    <div className="recognition-wrap">
      <p className="recognition-lead">
        Screenshots from merged work—hover for details, click to open the pull
        request on GitHub.
      </p>
      <div className="recognition-grid">
        {ITEMS.map((item, i) => (
          <Cell key={item.src + i} {...item} />
        ))}
      </div>
    </div>
  );
}
