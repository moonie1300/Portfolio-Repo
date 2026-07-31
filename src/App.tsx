import { useState, useEffect, useRef } from 'react'

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  parchment: '#F2EDE3',
  sage: '#6E8060',
  rose: '#B8836C',
  charcoal: '#26241F',
  blush: '#E3C9BC',
  cream: '#FAF6EE',
  muted: '#7A7268',
  sageLight: '#CDD8C0',
  roseLight: '#EBD4C8',
  tan: '#D6CAB4',
  dark: '#1C1A16',
}

// ── Micro-components ───────────────────────────────────────────────────────

function Sticker({
  children,
  rotate = 0,
  bg = C.blush,
  style = {},
}: {
  children: React.ReactNode
  rotate?: number
  bg?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '5px 13px',
        background: bg,
        borderRadius: '3px',
        fontFamily: '"DM Mono", monospace',
        fontSize: '10.5px',
        fontWeight: 500,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: C.charcoal,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

function Tape({
  color = 'rgba(196,144,123,0.32)',
  style = {},
}: {
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '72px',
        height: '20px',
        background: color,
        zIndex: 10,
        ...style,
      }}
    />
  )
}

function SectionLabel({ label, color = C.rose }: { label: string; color?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '14px',
      }}
    >
      <div style={{ width: '36px', height: '1.5px', background: color }} />
      <span
        style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function ProjectCard({
  title,
  period,
  tags,
  bullets,
  rotate = 0,
  accent = C.sage,
}: {
  title: string
  period: string
  tags: string[]
  bullets: string[]
  rotate?: number
  accent?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: C.cream,
        borderRadius: '1px',
        padding: '32px 28px 24px',
        boxShadow: hovered
          ? '4px 12px 36px rgba(38,36,31,0.16)'
          : '2px 4px 14px rgba(38,36,31,0.09)',
        transform: hovered ? 'rotate(0deg) translateY(-6px)' : `rotate(${rotate}deg)`,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'default',
      }}
    >
      <Tape
        color={`${accent}55`}
        style={{
          top: -11,
          left: '50%',
          transform: 'translateX(-50%) rotate(-2deg)',
        }}
      />
      <div
        style={{
          width: '28px',
          height: '2.5px',
          background: accent,
          marginBottom: '18px',
        }}
      />
      <h3
        style={{
          fontFamily: '"Fraunces", serif',
          fontSize: '16px',
          fontWeight: 700,
          color: C.charcoal,
          marginBottom: '6px',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <span
        style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '9.5px',
          color: C.muted,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '16px',
        }}
      >
        {period}
      </span>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '18px' }}>
        {bullets.slice(0, 2).map((b, i) => (
          <li
            key={i}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '13px',
              color: C.muted,
              marginBottom: '7px',
              paddingLeft: '14px',
              position: 'relative',
              lineHeight: 1.55,
            }}
          >
            <span style={{ position: 'absolute', left: 0, color: accent }}>–</span>
            {b}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {tags.map((t) => (
          <Sticker key={t} bg={`${accent}22`}>
            {t}
          </Sticker>
        ))}
      </div>
    </div>
  )
}

// ── Decorative SVGs ────────────────────────────────────────────────────────

function Squiggle({ color = C.rose, style = {} }: { color?: string; style?: React.CSSProperties }) {
  return (
    <svg width="100" height="16" viewBox="0 0 100 16" style={style}>
      <path
        d="M0,8 C12,0 25,16 38,8 C51,0 64,16 76,8 C88,0 100,16 100,8"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Sparkle({ color = C.rose, size = 20, style = {} }: { color?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={style}>
      <path
        d="M10,1 L11.2,8.8 L19,10 L11.2,11.2 L10,19 L8.8,11.2 L1,10 L8.8,8.8 Z"
        fill={color}
      />
    </svg>
  )
}

function Lotus({ color = C.rose, size = 28, style = {} }: { color?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <ellipse cx="14" cy="18" rx="3" ry="6" fill={color} opacity="0.7" transform="rotate(-20 14 18)" />
      <ellipse cx="14" cy="18" rx="3" ry="6" fill={color} opacity="0.8" />
      <ellipse cx="14" cy="18" rx="3" ry="6" fill={color} opacity="0.7" transform="rotate(20 14 18)" />
      <ellipse cx="14" cy="22" rx="5" ry="3" fill={color} opacity="0.5" transform="rotate(-35 14 22)" />
      <ellipse cx="14" cy="22" rx="5" ry="3" fill={color} opacity="0.5" transform="rotate(35 14 22)" />
      <circle cx="14" cy="16" r="2" fill={color} />
    </svg>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navLinks = ['about', 'projects', 'experience', 'contact']

  // ── RENDER ─────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        fontFamily: '"DM Sans", sans-serif',
        background: C.parchment,
        color: C.charcoal,
        overflowX: 'hidden',
      }}
    >
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: '18px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? `${C.parchment}f0` : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.blush}80` : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <button
          onClick={() => scrollTo('hero')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: '"Fraunces", serif',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: '22px',
            color: C.charcoal,
            letterSpacing: '-0.01em',
          }}
        >
          hj.
        </button>

        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {navLinks.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: '"DM Mono", monospace',
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.muted,
                transition: 'color 0.2s',
                padding: '4px 0',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              {s}
            </button>
          ))}
          <a
            href="mailto:hannahej02@gmail.com"
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '10.5px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: C.cream,
              background: C.charcoal,
              padding: '8px 18px',
              borderRadius: '2px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.rose)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.charcoal)}
          >
            Say hello
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: C.parchment,
        }}
      >
        {/* ── Background geometric blocks (mood board feel) ── */}
        <div
          style={{
            position: 'absolute',
            top: '6%',
            left: '-3%',
            width: '38%',
            height: '78%',
            background: C.sage,
            opacity: 0.13,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '22%',
            left: '14%',
            width: '22%',
            height: '40%',
            background: C.tan,
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '28%',
            width: '18%',
            height: '8%',
            background: C.cream,
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '18%',
            right: '5%',
            width: '30%',
            height: '52%',
            background: C.rose,
            opacity: 0.09,
          }}
        />

        {/* ── Decorative numbers (mood board) ── */}
        <span
          style={{
            position: 'absolute',
            top: '4%',
            left: '3%',
            fontFamily: '"Fraunces", serif',
            fontSize: '160px',
            fontWeight: 900,
            color: C.charcoal,
            opacity: 0.035,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          01
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '3%',
            fontFamily: '"Fraunces", serif',
            fontSize: '100px',
            fontWeight: 900,
            color: C.charcoal,
            opacity: 0.04,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          27
        </span>

        {/* ── Rock climbing photo (right column) ── */}
        <div
          className="hero-photo-col"
          style={{
            position: 'absolute',
            top: '10%',
            right: '7%',
            zIndex: 6,
          }}
        >
          {/* Main photo card */}
          <div
            style={{
              position: 'relative',
              width: '300px',
              height: '400px',
              transform: 'rotate(3deg)',
              boxShadow: '6px 12px 40px rgba(38,36,31,0.20)',
              overflow: 'hidden',
              clipPath: 'polygon(0 0, 100% 3%, 97% 100%, 2% 97%)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1577434150790-3bfe143fe4f2?w=600&h=800&fit=crop&auto=format"
              alt="Rock climbing"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(0.65) sepia(0.12)',
              }}
            />
            <Tape
              color="rgba(196,144,123,0.38)"
              style={{ top: -8, left: '50%', transform: 'translateX(-50%) rotate(-4deg)' }}
            />
          </div>

          {/* Secondary small photo */}
          <div
            style={{
              position: 'absolute',
              bottom: '-70px',
              left: '-90px',
              width: '160px',
              height: '130px',
              transform: 'rotate(-5deg)',
              boxShadow: '4px 6px 20px rgba(38,36,31,0.16)',
              overflow: 'hidden',
              border: `6px solid ${C.cream}`,
              zIndex: 7,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=320&h=260&fit=crop&auto=format"
              alt="Mountain"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(0.5) sepia(0.1)',
              }}
            />
            <Tape
              color="rgba(123,140,106,0.45)"
              style={{ top: -8, left: '50%', transform: 'translateX(-50%) rotate(3deg)' }}
            />
          </div>

          {/* Floating stickers near photo */}
          <div
            className="float-sticker"
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              '--r': '12deg',
              zIndex: 8,
            } as React.CSSProperties}
          >
            <Sticker bg={C.blush} rotate={12}>
              🧗 climber
            </Sticker>
          </div>
          <div
            className="float-sticker"
            style={{
              position: 'absolute',
              bottom: '-85px',
              right: '-10px',
              '--r': '-7deg',
              animationDelay: '1.2s',
              zIndex: 8,
            } as React.CSSProperties}
          >
            <Sticker bg={C.sageLight} rotate={-7}>
              qut '27
            </Sticker>
          </div>
          <div
            className="float-sticker"
            style={{
              position: 'absolute',
              top: '44%',
              left: '-110px',
              '--r': '4deg',
              animationDelay: '0.6s',
              zIndex: 8,
            } as React.CSSProperties}
          >
            <Sticker bg={C.roseLight} rotate={4}>
              🎮 gamer
            </Sticker>
          </div>

          {/* Color block accent behind photos */}
          <div
            style={{
              position: 'absolute',
              top: '55%',
              left: '-60px',
              width: '180px',
              height: '120px',
              background: C.blush,
              zIndex: 4,
              transform: 'rotate(1.5deg)',
            }}
          />
        </div>

        {/* ── Hero text ── */}
        <div
          className="hero-inner"
          style={{
            position: 'relative',
            zIndex: 10,
            paddingLeft: '8%',
            paddingRight: '46%',
            paddingTop: '90px',
          }}
        >
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sticker bg={C.sageLight}>Software + Robotics @ QUT</Sticker>
            <Sparkle color={C.rose} size={14} />
          </div>

          <h1
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: 'clamp(56px, 8.5vw, 118px)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 0.9,
              color: C.charcoal,
              marginBottom: '24px',
              letterSpacing: '-0.025em',
            }}
          >
            Hannah
            <br />
            <span style={{ color: C.rose }}>John.</span>
          </h1>

          <Squiggle color={C.rose} style={{ marginBottom: '24px', opacity: 0.5 }} />

          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '15.5px',
              color: C.muted,
              maxWidth: '400px',
              lineHeight: 1.75,
              marginBottom: '36px',
            }}
          >
            Final-year engineer who builds things that work — from PLC logic for battery
            management systems to full-stack web apps and ML pipelines. I care about
            aesthetics as much as algorithms.
          </p>

          {/* Currently strip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: C.sage,
              color: C.cream,
              padding: '10px 18px',
              borderRadius: '2px',
              fontFamily: '"DM Mono", monospace',
              fontSize: '10.5px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#A8DFA0',
                animation: 'float 2s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            Currently @ CHARG Energy — BMS Development
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => scrollTo('projects')}
              style={{
                background: C.charcoal,
                color: C.cream,
                border: 'none',
                padding: '13px 28px',
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.rose)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.charcoal)}
            >
              See my work →
            </button>
            <a
              href="https://github.com/moon1300"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: C.charcoal,
                border: `1.5px solid ${C.charcoal}`,
                padding: '12px 28px',
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                display: 'inline-block',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.rose
                e.currentTarget.style.borderColor = C.rose
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.charcoal
                e.currentTarget.style.borderColor = C.charcoal
              }}
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Scroll nudge */}
        <div
          style={{
            position: 'absolute',
            bottom: '36px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.35,
          }}
        >
          <span
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: C.muted,
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '36px',
              background: `linear-gradient(to bottom, ${C.muted}, transparent)`,
            }}
          />
        </div>
      </section>

      {/* ── BRAIN DUMP TICKER ────────────────────────────────────────────── */}
      <div
        style={{
          background: C.charcoal,
          padding: '14px 0',
          overflow: 'hidden',
          position: 'relative',
          borderTop: `1px solid ${C.dark}`,
          borderBottom: `1px solid ${C.dark}`,
        }}
      >
        <div className="ticker-track">
          {[
            'software engineering',
            '✦',
            'robotics',
            '✦',
            'machine learning',
            '✦',
            'PLC systems',
            '✦',
            'react',
            '✦',
            'rock climbing',
            '✦',
            'embedded systems',
            '✦',
            'aesthetics',
            '✦',
            'modbus tcp',
            '✦',
            'fullstack',
            '✦',
            'gaming',
            '✦',
            'piano',
            '✦',
            'qut 2027',
            '✦',
            'software engineering',
            '✦',
            'robotics',
            '✦',
            'machine learning',
            '✦',
            'PLC systems',
            '✦',
            'react',
            '✦',
            'rock climbing',
            '✦',
            'embedded systems',
            '✦',
            'aesthetics',
            '✦',
            'modbus tcp',
            '✦',
            'fullstack',
            '✦',
            'gaming',
            '✦',
            'piano',
            '✦',
            'qut 2027',
            '✦',
          ].map((word, i) => (
            <span
              key={i}
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: word === '✦' ? C.rose : '#9E9890',
                padding: '0 16px',
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ───────────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: '110px 8% 90px',
          background: C.cream,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '30%',
            height: '100%',
            background: C.parchment,
            opacity: 0.5,
          }}
        />

        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Left: collage */}
          <div
            className="about-collage"
            style={{ position: 'relative', height: '540px' }}
          >
            {/* Colour block behind photos */}
            <div
              style={{
                position: 'absolute',
                top: '12%',
                right: '-2%',
                width: '52%',
                height: '35%',
                background: C.blush,
                zIndex: 1,
                transform: 'rotate(1.5deg)',
              }}
            />

            {/* Primary photo — editorial portrait */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '65%',
                height: '72%',
                overflow: 'hidden',
                boxShadow: '4px 8px 28px rgba(38,36,31,0.15)',
                transform: 'rotate(-2deg)',
                zIndex: 2,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1628620835051-8f40f48c928d?w=480&h=580&fit=crop&auto=format"
                alt="Portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(0.72)',
                }}
              />
              <Tape
                color="rgba(123,140,106,0.42)"
                style={{ top: -9, left: '50%', transform: 'translateX(-50%) rotate(-3deg)' }}
              />
            </div>

            {/* Secondary photo — climbing */}
            <div
              style={{
                position: 'absolute',
                bottom: '2%',
                right: '-2%',
                width: '56%',
                height: '52%',
                overflow: 'hidden',
                boxShadow: '4px 8px 24px rgba(38,36,31,0.14)',
                transform: 'rotate(3deg)',
                zIndex: 3,
                border: `7px solid ${C.cream}`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1578886141033-b9f066572135?w=420&h=380&fit=crop&auto=format"
                alt="Hiking outdoors"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(0.6) sepia(0.08)',
                }}
              />
              <Tape
                color="rgba(196,144,123,0.42)"
                style={{ bottom: -9, right: 16, transform: 'rotate(-4deg)' }}
              />
            </div>

            {/* Floating stickers */}
            <div
              className="float-sticker"
              style={{
                position: 'absolute',
                top: '6%',
                right: '-14px',
                zIndex: 6,
                '--r': '14deg',
                animationDelay: '0.8s',
              } as React.CSSProperties}
            >
              <Sticker bg={C.roseLight} rotate={14}>
                🎹 piano
              </Sticker>
            </div>
            <div
              className="float-sticker"
              style={{
                position: 'absolute',
                bottom: '4%',
                left: '-4px',
                zIndex: 6,
                '--r': '-6deg',
                animationDelay: '1.6s',
              } as React.CSSProperties}
            >
              <Sticker bg={C.sageLight} rotate={-6}>
                🤖 robotics
              </Sticker>
            </div>

            {/* Lotus decoration */}
            <Lotus
              color={C.rose}
              size={32}
              style={{
                position: 'absolute',
                top: '46%',
                left: '62%',
                zIndex: 5,
                opacity: 0.55,
              }}
            />
          </div>

          {/* Right: text */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <SectionLabel label="about me" color={C.rose} />
            <h2
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: 'clamp(34px, 3.8vw, 50px)',
                fontWeight: 800,
                fontStyle: 'italic',
                color: C.charcoal,
                lineHeight: 1.08,
                marginBottom: '26px',
              }}
            >
              engineer by degree,
              <br />
              <span style={{ color: C.sage }}>curious by nature.</span>
            </h2>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.78,
                color: C.muted,
                marginBottom: '18px',
              }}
            >
              {"I'm Hannah — a final-year Software & Robotics Engineering student at QUT, currently building a commercial battery management system at CHARG Energy. I work across the stack: from PLC ladder logic and Modbus TCP comms to React frontends and ML pipelines."}
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.78,
                color: C.muted,
                marginBottom: '32px',
              }}
            >
              Outside of engineering, my Indian background, love of aesthetics, and life on the wall at the climbing gym shape how I see and build things. I care deeply about what something looks like as much as how it works.
            </p>

            {/* Interest stickers */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
              {[
                { label: '🧗 rock climbing', bg: C.sageLight, r: -2 },
                { label: '🎮 gaming', bg: C.blush, r: 1.5 },
                { label: '🎹 piano', bg: C.roseLight, r: -1.5 },
                { label: '✨ aesthetics', bg: '#E2DDD5', r: 2 },
                { label: '🤖 robotics', bg: C.sageLight, r: -2.5 },
                { label: '🪷 indian roots', bg: C.roseLight, r: 1 },
              ].map(({ label, bg, r }) => (
                <Sticker key={label} bg={bg} rotate={r}>
                  {label}
                </Sticker>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                color: C.muted,
                letterSpacing: '0.06em',
              }}
            >
              <span>📍 Brisbane, QLD</span>
              <span style={{ color: C.blush }}>·</span>
              <a
                href="tel:+61421001050"
                style={{ color: C.muted, textDecoration: 'none' }}
              >
                +61 421 001 050
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      <section
        id="projects"
        style={{ padding: '110px 8% 90px', background: C.parchment, position: 'relative', overflow: 'hidden' }}
      >
        {/* Large background number */}
        <span
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '3%',
            fontFamily: '"Fraunces", serif',
            fontSize: '200px',
            fontWeight: 900,
            color: C.charcoal,
            opacity: 0.025,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          06
        </span>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '60px',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <SectionLabel label="selected work" color={C.sage} />
              <h2
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontSize: 'clamp(36px, 4.5vw, 60px)',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  color: C.charcoal,
                  lineHeight: 1.0,
                }}
              >
                things i&apos;ve built.
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkle color={C.rose} size={18} />
              <Sparkle color={C.sage} size={12} />
              <Sparkle color={C.tan} size={10} />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            <ProjectCard
              title="UAV Sensor Dashboard"
              period="Sem 2, 2025 — Team Project"
              tags={['JavaScript', 'REST API', 'React']}
              bullets={[
                'Real-time dashboard for live UAV sensor data from 8 Enviro+ sensors.',
                'Connected frontend to live API endpoints with realtime graphing.',
              ]}
              rotate={-1.2}
              accent={C.sage}
            />
            <ProjectCard
              title="Rental Management App"
              period="Sem 1, 2026 — Individual"
              tags={['React', 'Vite', 'REST API', 'SQL']}
              bullets={[
                'Full-stack rental property app with auth, filtering, and ratings.',
                'Responsive UI with dynamic API data handling and search.',
              ]}
              rotate={0.8}
              accent={C.rose}
            />
            <ProjectCard
              title="Embedded Motor Control"
              period="Sem 1, 2025 — Team Project"
              tags={['FreeRTOS', 'C', 'Tiva TM4C1294']}
              bullets={[
                'Motor control, ADC filtering, and realtime telemetry on microcontroller.',
                'UART debugging, RPM monitoring, hardware/software integration.',
              ]}
              rotate={-1.5}
              accent="#9B8C6A"
            />
            <ProjectCard
              title="ML Email Classifier"
              period="Sem 1, 2026 — Individual"
              tags={['Python', 'Transformers', 'ML']}
              bullets={[
                'Transformer-based model to classify emails by author.',
                'Feature engineering, preprocessing, and performance evaluation.',
              ]}
              rotate={1.8}
              accent={C.sage}
            />
            <ProjectCard
              title="Person Re-ID System"
              period="Sem 1, 2026 — Individual"
              tags={['TensorFlow', 'Keras', 'Siamese CNN']}
              bullets={[
                'PCA and Siamese CNN for person re-identification.',
                'Top-N retrieval, embedding generation, and ranking evaluation.',
              ]}
              rotate={-0.6}
              accent={C.rose}
            />
            <ProjectCard
              title="BMS PLC Software"
              period="May 2026 – Present · CHARG Energy"
              tags={['Omron CX', 'Modbus TCP', 'Ladder Logic']}
              bullets={[
                'Commercial battery management system on Omron PLC.',
                'Pump/sensor/safety ladder logic + reliable Modbus TCP comms.',
              ]}
              rotate={1.2}
              accent="#9B8C6A"
            />
          </div>

          {/* View GitHub nudge */}
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <a
              href="https://github.com/moon1300"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: C.muted,
                textDecoration: 'none',
                borderBottom: `1px solid ${C.muted}60`,
                paddingBottom: '3px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.rose
                e.currentTarget.style.borderBottomColor = C.rose
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.muted
                e.currentTarget.style.borderBottomColor = `${C.muted}60`
              }}
            >
              More on GitHub → github.com/moon1300
            </a>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────────────────── */}
      <section
        id="experience"
        style={{
          padding: '110px 8% 90px',
          background: C.cream,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '28%',
            height: '100%',
            background: C.parchment,
            opacity: 0.45,
          }}
        />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <SectionLabel label="experience" color={C.rose} />
          <h2
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: C.charcoal,
              lineHeight: 1.05,
              marginBottom: '60px',
            }}
          >
            where i&apos;ve been.
          </h2>

          {/* Experience items */}
          {[
            {
              company: 'CHARG Energy',
              role: 'Student Engineer — BMS Development',
              period: 'May 2026 – Present',
              points: [
                'Developed PLC software for a commercial BMS using Omron CX-Programmer.',
                'Led the initial BMS prototype, coordinating PLC software development and system integration.',
                'Designed ladder logic for pumps, sensors and safety systems.',
                'Implemented reliable Modbus TCP communication between PLC and external devices.',
              ],
              accent: C.sage,
              current: true,
            },
            {
              company: 'Finlaysons Timber & Hardware',
              role: 'Dispatch Administration',
              period: 'Aug 2023 – Mar 2024',
              points: [
                'Developed a dispatch tracking system for deliveries, suppliers and scheduling.',
                'Managed invoices, customer orders and supplier communication.',
              ],
              accent: C.rose,
              current: false,
            },
            {
              company: 'Kathron Dry Cleaners',
              role: 'Administration & Operations',
              period: 'Jun 2021 – Apr 2026',
              points: [
                'Resolved customer enquiries and supported efficient day-to-day store operations.',
                'Organised records and improved administrative workflow accuracy.',
              ],
              accent: '#9B8C6A',
              current: false,
            },
          ].map((exp, i) => (
            <div
              key={i}
              className="exp-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                gap: '44px',
                paddingBottom: '52px',
                position: 'relative',
              }}
            >
              {/* Timeline line */}
              <div
                className="exp-line"
                style={{
                  position: 'absolute',
                  left: '180px',
                  top: '8px',
                  bottom: 0,
                  width: '1px',
                  background: `${C.blush}`,
                  marginLeft: '20px',
                }}
              />
              {/* Timeline dot */}
              <div
                className="exp-dot"
                style={{
                  position: 'absolute',
                  left: '180px',
                  top: '8px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: exp.accent,
                  marginLeft: '15px',
                  boxShadow: `0 0 0 4px ${exp.accent}28`,
                }}
              />

              {/* Period */}
              <div
                className="exp-left"
                style={{ paddingTop: '4px', textAlign: 'right' }}
              >
                <span
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '10px',
                    letterSpacing: '0.06em',
                    color: exp.accent,
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  {exp.period}
                </span>
                {exp.current && (
                  <span
                    style={{
                      marginTop: '8px',
                      display: 'inline-block',
                      background: `${exp.accent}20`,
                      color: exp.accent,
                      fontFamily: '"DM Mono", monospace',
                      fontSize: '9px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '2px',
                    }}
                  >
                    current
                  </span>
                )}
              </div>

              {/* Content */}
              <div style={{ paddingLeft: '24px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '2px',
                    background: exp.accent,
                    marginBottom: '14px',
                  }}
                />
                <h3
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: C.charcoal,
                    marginBottom: '4px',
                  }}
                >
                  {exp.company}
                </h3>
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    color: C.muted,
                    marginBottom: '16px',
                    fontStyle: 'italic',
                  }}
                >
                  {exp.role}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {exp.points.map((p, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '13.5px',
                        color: C.muted,
                        marginBottom: '8px',
                        paddingLeft: '16px',
                        position: 'relative',
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: exp.accent }}>
                        –
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Education card */}
          <div
            style={{
              marginTop: '8px',
              background: C.parchment,
              border: `1.5px solid ${C.blush}`,
              borderRadius: '2px',
              padding: '28px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              position: 'relative',
            }}
          >
            <Tape
              color="rgba(123,140,106,0.38)"
              style={{ top: -10, left: 32, transform: 'rotate(-3deg)' }}
            />
            <div>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '9.5px',
                  letterSpacing: '0.1em',
                  color: C.sage,
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Education
              </span>
              <h3
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: C.charcoal,
                  marginBottom: '4px',
                }}
              >
                Bachelor of Engineering — Software &amp; Robotics
              </h3>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  color: C.muted,
                }}
              >
                Queensland University of Technology
              </p>
            </div>
            <Sticker bg={C.sageLight} rotate={-1.5}>
              Expected 06/2027
            </Sticker>
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '110px 8% 90px',
          background: C.parchment,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Big decorative symbol */}
        <span
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '2%',
            fontFamily: '"Fraunces", serif',
            fontSize: '260px',
            fontWeight: 900,
            color: C.charcoal,
            opacity: 0.025,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          ∞
        </span>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <SectionLabel label="toolkit" color={C.sage} />
          <h2
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: C.charcoal,
              lineHeight: 1.05,
              marginBottom: '56px',
            }}
          >
            what i work with.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {[
              {
                label: 'Programming Languages',
                accent: C.sage,
                bg: C.sageLight,
                skills: ['JavaScript', 'Python', 'C / C++', 'HTML & CSS', 'SQL'],
              },
              {
                label: 'Frameworks & Dev Tools',
                accent: C.rose,
                bg: C.roseLight,
                skills: ['React', 'Vite', 'REST APIs', 'Git', 'GitHub', 'Linux', 'MySQL', 'VS Code', 'Cursor'],
              },
              {
                label: 'Industrial & Embedded',
                accent: '#9B8C6A',
                bg: '#E6DFD3',
                skills: ['Omron PLCs', 'CX-Programmer', 'Modbus TCP', 'FreeRTOS', 'Embedded Systems', 'AutoCAD'],
              },
              {
                label: 'ML & Data Science',
                accent: '#5E7A8A',
                bg: '#D0DDE4',
                skills: ['TensorFlow', 'Keras', 'PyTorch', 'Siamese CNN', 'Transformers', 'scikit-learn'],
              },
            ].map((cat, i) => (
              <div key={i}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '14px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: '9.5px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: cat.accent,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cat.label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '1px',
                      background: `${cat.accent}30`,
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
                  {cat.skills.map((skill, j) => (
                    <Sticker key={skill} bg={cat.bg} rotate={((j % 5) - 2) * 0.9}>
                      {skill}
                    </Sticker>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: '110px 8% 80px',
          background: C.charcoal,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background geometric shapes */}
        <div
          style={{
            position: 'absolute',
            top: '-8%',
            right: '-4%',
            width: '38%',
            height: '72%',
            background: C.sage,
            opacity: 0.07,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '-2%',
            width: '22%',
            height: '38%',
            background: C.rose,
            opacity: 0.07,
          }}
        />

        {/* Decorative "hi." in background */}
        <span
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            fontFamily: '"Fraunces", serif',
            fontSize: '200px',
            fontWeight: 900,
            fontStyle: 'italic',
            color: C.cream,
            opacity: 0.03,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          hi.
        </span>

        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <SectionLabel label="get in touch" color={C.rose} />
          <h2
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: 'clamp(52px, 8vw, 104px)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: C.cream,
              lineHeight: 0.92,
              marginBottom: '28px',
              letterSpacing: '-0.02em',
            }}
          >
            {"let's talk."}
          </h2>
          <Squiggle color={C.rose} style={{ marginBottom: '28px', opacity: 0.5 }} />
          <p
            style={{
              fontSize: '15.5px',
              color: '#9E9A94',
              lineHeight: 1.75,
              maxWidth: '480px',
              marginBottom: '52px',
            }}
          >
            Open to grad roles, internships, and interesting conversations. Currently finishing my final year at QUT and available from mid-2027.
          </p>

          <div
            className="contact-links"
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '72px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="mailto:hannahej02@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: C.rose,
                color: C.cream,
                padding: '15px 30px',
                borderRadius: '2px',
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#A67260')}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.rose)}
            >
              hannahej02@gmail.com ↗
            </a>
            <a
              href="https://github.com/moon1300"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: `1.5px solid ${C.cream}28`,
                color: '#B8B4AE',
                padding: '14px 30px',
                borderRadius: '2px',
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.cream
                e.currentTarget.style.borderColor = `${C.cream}60`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B8B4AE'
                e.currentTarget.style.borderColor = `${C.cream}28`
              }}
            >
              github.com/moon1300 ↗
            </a>
            <a
              href="tel:+61421001050"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: `1.5px solid ${C.cream}28`,
                color: '#B8B4AE',
                padding: '14px 30px',
                borderRadius: '2px',
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.cream
                e.currentTarget.style.borderColor = `${C.cream}60`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B8B4AE'
                e.currentTarget.style.borderColor = `${C.cream}28`
              }}
            >
              +61 421 001 050
            </a>
          </div>

          {/* Footer strip */}
          <div
            style={{
              borderTop: `1px solid ${C.cream}12`,
              paddingTop: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <button
              onClick={() => scrollTo('hero')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: '"Fraunces", serif',
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: '24px',
                color: C.cream,
                opacity: 0.3,
                letterSpacing: '-0.01em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.3')}
            >
              hj.
            </button>
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '9.5px',
                letterSpacing: '0.08em',
                color: '#4A4844',
                textTransform: 'uppercase',
              }}
            >
              Hannah John · Brisbane, QLD · 2026
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
