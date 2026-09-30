import { SiPostgresql } from "react-icons/si";

export function FigmaMark({ className = "toolMarkSvg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 38 57" fill="none" aria-hidden>
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 1 1-19 0Z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

export function ReactMark() {
  return (
    <svg className="toolMarkSvg" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10.5" ry="4.1" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4.1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4.1" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

export function TypescriptMark() {
  return (
    <svg className="toolMarkSvg" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <radialGradient
          id="typescript-tool-mark-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 12) scale(12 5.4)"
        >
          <stop offset="0.3" stopColor="#FFF" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <text
        x="12"
        y="16.8"
        textAnchor="middle"
        fill="url(#typescript-tool-mark-gradient)"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="-0.05em"
      >
        TS
      </text>
    </svg>
  );
}

export function NodejsMark() {
  return (
    <svg className="toolMarkSvg" viewBox="0 0 19 19" fill="none" aria-hidden>
      <defs>
        <linearGradient id="node-frame-gradient" x1="3" y1="9.5" x2="16" y2="9.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F0AC" />
          <stop offset="0.5" stopColor="#ACF7F0" />
          <stop offset="1" stopColor="#F0ACF7" />
        </linearGradient>
        <linearGradient id="node-s-gradient" x1="8" y1="10.1" x2="14" y2="8.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2BC0E4" />
          <stop offset="0.9816" stopColor="#EAECC6" />
        </linearGradient>
      </defs>
      <path
        d="M9.372 16.552c-.198 0-.383-.053-.555-.146L7.06 15.362c-.264-.145-.132-.198-.053-.225.357-.119.423-.145.793-.357.04-.026.093-.013.132.014l1.348.806c.053.027.119.027.159 0l5.274-3.053c.053-.027.079-.08.079-.146V6.308c0-.066-.026-.119-.08-.145l-5.273-3.04c-.053-.027-.119-.027-.159 0l-5.274 3.04c-.053.026-.079.092-.079.145v6.093c0 .053.026.119.08.146l1.44.832c.78.397 1.269-.066 1.269-.528V6.837c0-.08.066-.159.158-.159h.674c.08 0 .159.066.159.159v6.014c0 1.044-.569 1.652-1.56 1.652-.304 0-.542 0-1.216-.33l-1.388-.794a1.11 1.11 0 0 1-.555-.964V6.32c0-.397.211-.767.555-.965l5.274-3.053c.33-.185.78-.185 1.11 0l5.274 3.053c.344.198.555.568.555.965v6.093c0 .397-.211.767-.555.965l-5.274 3.053c-.172.08-.37.12-.555.12Z"
        fill="url(#node-frame-gradient)"
      />
      <path
        d="M10.998 12.362c-2.313 0-2.789-1.058-2.789-1.956 0-.08.066-.159.159-.159h.687c.08 0 .146.053.146.132.105.7.409 1.044 1.81 1.044 1.11 0 1.587-.251 1.587-.846 0-.343-.133-.594-1.864-.766-1.441-.146-2.34-.463-2.34-1.613 0-1.07.899-1.705 2.406-1.705 1.692 0 2.524.582 2.63 1.85 0 .04-.013.08-.04.12a.21.21 0 0 1-.105.052h-.687c-.067 0-.133-.052-.146-.119-.159-.727-.568-.964-1.652-.964-1.216 0-1.362.423-1.362.74 0 .383.172.502 1.811.714 1.626.211 2.393.515 2.393 1.652-.014 1.163-.965 1.824-2.644 1.824Z"
        fill="url(#node-s-gradient)"
      />
    </svg>
  );
}

export function AwsMark() {
  return (
    <svg className="toolMarkSvg" viewBox="0 0 24 24" fill="none" aria-hidden>
      <text
        x="12"
        y="13.2"
        textAnchor="middle"
        fill="#232F3E"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="-0.03em"
      >
        aws
      </text>
      <path
        d="M5.4 16.2c2.2 1.9 7.6 2.6 13.2.1"
        stroke="#FF9900"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.6 15.2 18.8 17.4"
        stroke="#FF9900"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RonnieMark() {
  return (
    <svg className="toolMarkSvg" viewBox="0 0 32 16" fill="none" aria-hidden>
      <defs>
        <linearGradient id="ronnie-tool-mark" x1="29" y1="1" x2="4" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#69EACB" />
          <stop offset="0.4464" stopColor="#EACCF8" />
          <stop offset="1" stopColor="#6654F1" />
        </linearGradient>
      </defs>
      <path d="M5.3 3h6.2l-4.8 9H.5l4.8-9Z" fill="url(#ronnie-tool-mark)" />
      <path d="M12.8 3H19l-4.8 9H8l4.8-9Z" fill="url(#ronnie-tool-mark)" />
      <path d="M20.3 3h6.2l-4.8 9h-6.2l4.8-9Z" fill="url(#ronnie-tool-mark)" />
      <circle cx="29" cy="4.7" r="2.3" fill="#69EACB" />
    </svg>
  );
}

// The Simple Icons glyph is outline-only (the body is a cut-out), so its outer
// contour is filled separately underneath to give the elephant a solid body.
const postgresqlSilhouette =
  "M23.5594 14.7228a0.5269 0.5269 0 0 0 -0.0563 -0.1191c-0.139 -0.2632 -0.4768 -0.3418 -1.0074 -0.2321c-1.6533 0.3411 -2.2935 0.1312 -2.5256 -0.0191c1.342 -2.0482 2.445 -4.522 3.0411 -6.8297c0.2714 -1.0507 0.7982 -3.5237 0.1222 -4.7316a1.5641 1.5641 0 0 0 -0.1509 -0.235C21.6931 0.9086 19.8007 0.0248 17.5099 0.0005c-1.4947 -0.0158 -2.7705 0.3461 -3.1161 0.4794a9.449 9.449 0 0 0 -0.5159 -0.0816a8.044 8.044 0 0 0 -1.3114 -0.1278c-1.1822 -0.0184 -2.2038 0.2642 -3.0498 0.8406c-0.8573 -0.3211 -4.7888 -1.645 -7.2219 0.0788C0.9359 2.1526 0.3086 3.8733 0.4302 6.3043c0.0409 0.818 0.5069 3.334 1.2423 5.7436c0.4598 1.5065 0.9387 2.7019 1.4334 3.582c0.553 0.9942 1.1259 1.5933 1.7143 1.7895c0.4474 0.1491 1.1327 0.1441 1.8581 -0.7279c0.8012 -0.9635 1.5903 -1.8258 1.9446 -2.2069c0.4351 0.2355 0.9064 0.3625 1.39 0.3772a0.0569 0.0569 0 0 0 0.0004 0.0041a11.0312 11.0312 0 0 0 -0.2472 0.3054c-0.3389 0.4302 -0.4094 0.5197 -1.5002 0.7443c-0.3102 0.064 -1.1344 0.2339 -1.1464 0.8115c-0.0025 0.1224 0.0329 0.2309 0.0919 0.3268c0.2269 0.4231 0.9216 0.6097 1.015 0.6331c1.3345 0.3335 2.5044 0.092 3.3714 -0.6787c-0.017 2.231 0.0775 4.4174 0.3454 5.0874c0.2212 0.5529 0.7618 1.9045 2.4692 1.9043c0.2505 0 0.5263 -0.0291 0.8296 -0.0941c1.7819 -0.3821 2.5557 -1.1696 2.855 -2.9059c0.1503 -0.8707 0.4016 -2.8753 0.5388 -4.1012c0.0169 -0.0703 0.0357 -0.1207 0.057 -0.1362c0.0007 -0.0005 0.0697 -0.0471 0.4272 0.0307a0.3673 0.3673 0 0 0 0.0443 0.0068l0.2539 0.0223l0.0149 0.001c0.8468 0.0384 1.9114 -0.1426 2.5312 -0.4308c0.6438 -0.2988 1.8057 -1.0323 1.5951 -1.6698z";

export function PostgresqlMark() {
  return (
    <span className="postgresqlMark" aria-hidden>
      <svg className="postgresqlMarkBody" viewBox="0 0 24 24">
        <defs>
          <linearGradient
            id="postgresql-tool-mark-body"
            x1="0"
            y1="0.62"
            x2="1"
            y2="0.38"
          >
            <stop stopColor="#1A2980" />
            <stop offset="1" stopColor="#26D0CE" />
          </linearGradient>
        </defs>
        <path d={postgresqlSilhouette} fill="url(#postgresql-tool-mark-body)" />
      </svg>
      <SiPostgresql className="toolMarkSvg" />
    </span>
  );
}

export function PythonMark() {
  return (
    <svg className="toolMarkSvg" viewBox="0 0 19 19" fill="none" aria-hidden>
      <defs>
        <linearGradient
          id="python-upper-tool-mark-gradient"
          x1="4"
          y1="12"
          x2="14"
          y2="2"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.119" stopColor="#7C14B8" />
          <stop offset="0.8598" stopColor="#6AE5E6" />
        </linearGradient>
        <linearGradient
          id="python-lower-tool-mark-gradient"
          x1="7.6"
          y1="8"
          x2="15.6"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE052" />
          <stop offset="1" stopColor="#FFC331" />
        </linearGradient>
      </defs>
      <path
        d="M9.31 2.06c-3.735 0-3.499 1.615-3.499 1.615v1.678h3.552v.526H4.397S2.006 5.584 2.006 9.374s2.111 3.637 2.111 3.637h1.219v-1.769s-.069-2.111 2.051-2.111h3.557s1.985.032 1.985-1.921V4.006s.3-1.953-3.6-1.953l-.019.007ZM7.347 3.184a.647.647 0 1 1 .016 1.294.647.647 0 0 1-.016-1.294Z"
        fill="url(#python-upper-tool-mark-gradient)"
      />
      <path
        d="M9.416 16.689c3.735 0 3.499-1.621 3.499-1.621v-1.672H9.364v-.527h4.981s2.391.268 2.391-3.5c0-3.768-2.111-3.636-2.111-3.636H13.39v1.745s.069 2.111-2.051 2.111H7.78s-1.986-.03-1.986 1.922v3.226s-.3 1.953 3.6 1.953l.022-.001Zm1.964-1.13a.647.647 0 1 1-.017-1.294.647.647 0 0 1 .017 1.294Z"
        fill="url(#python-lower-tool-mark-gradient)"
      />
    </svg>
  );
}
