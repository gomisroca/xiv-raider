import { twMerge } from 'tailwind-merge';

export function LayoutBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-x-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Main Radial Burst Pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
          {/* Radiating Lines */}
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 h-0.5 w-96 origin-left bg-gradient-to-r from-sky-500 to-transparent opacity-60"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Halftone Dot Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_2px_2px,rgba(14,165,233,0.8)_1px,transparent_0)] bg-[length:20px_20px] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(14,165,233,0.8)_1px,transparent_0)]"></div>
      </div>

      {/* Geometric Shapes - Art Nouveau Style */}
      <div className="pointer-events-none absolute top-16 right-16 h-32 w-32 rotate-45 border-4 border-sky-500 opacity-80 dark:border-sky-600"></div>
      <div className="pointer-events-none absolute top-24 right-24 h-24 w-24 rotate-45 border-2 border-yellow-400 opacity-60 dark:border-yellow-500"></div>

      {/* Flowing Curves */}
      <div className="pointer-events-none absolute top-32 left-16 h-64 w-64 opacity-30">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <path d="M20,100 Q60,20 100,100 T180,100" stroke="#facc15" strokeWidth="3" fill="none" opacity="0.7" />
          <path d="M20,120 Q60,40 100,120 T180,120" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Corner Decorative Elements */}
      <div className="pointer-events-none absolute bottom-16 left-16 h-48 w-48 opacity-40">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx="100" cy="100" r="80" stroke="#facc15" strokeWidth="2" fill="none" opacity="0.6" />
          <circle cx="100" cy="100" r="60" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="100" cy="100" r="40" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.3" />
        </svg>
      </div>

      {/* Stylized UI Elements */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-24 w-2 rotate-12 transform bg-sky-500 opacity-70 dark:bg-sky-600"></div>
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-2 w-24 rotate-12 transform bg-sky-500 opacity-70 dark:bg-sky-600"></div>

      {/* Diamond Shapes */}
      <div className="pointer-events-none absolute right-1/3 bottom-1/3 h-8 w-8 rotate-45 transform bg-yellow-400 opacity-60 dark:bg-yellow-500"></div>
      <div className="pointer-events-none absolute right-1/3 bottom-1/3 h-4 w-4 translate-x-6 translate-y-6 rotate-45 transform bg-sky-500 opacity-80 dark:bg-sky-600"></div>

      {/* Speed Lines */}
      <div className="pointer-events-none absolute top-1/3 left-1/4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-16 bg-gradient-to-r from-sky-500 to-transparent opacity-40"
            style={{
              top: `${i * 8}px`,
              transform: `rotate(-15deg)`,
            }}
          />
        ))}
      </div>

      {/* Large Geometric Accent */}
      <div className="pointer-events-none absolute right-1/6 bottom-1/4 h-20 w-20 rotate-45 transform border-t-4 border-l-4 border-sky-500 opacity-70 dark:border-sky-600"></div>

      {/* Persona-style Frame Elements */}
      <div className="pointer-events-none absolute top-8 left-8 h-1 w-16 bg-sky-500 dark:bg-sky-600"></div>
      <div className="pointer-events-none absolute top-8 left-8 h-16 w-1 bg-sky-500 dark:bg-sky-600"></div>
      <div className="pointer-events-none absolute right-8 bottom-8 h-1 w-16 bg-yellow-400 dark:bg-yellow-500"></div>
      <div className="pointer-events-none absolute right-8 bottom-8 h-16 w-1 bg-yellow-400 dark:bg-yellow-500"></div>

      {/* Additional Halftone Clusters */}
      <div className="pointer-events-none absolute top-1/2 right-8 opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-sky-500 dark:bg-sky-600 ${
              i % 3 === 0 ? 'h-2 w-2' : i % 3 === 1 ? 'h-1 w-1' : 'h-3 w-3'
            }`}
            style={{
              left: `${(i % 4) * 12}px`,
              top: `${Math.floor(i / 4) * 12}px`,
            }}
          />
        ))}
      </div>
      {/* Content Area */}
      <div className="z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}

export function ContentBackground({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={twMerge(
        'z-10 mx-auto flex w-fit flex-1 items-center justify-center bg-white/80 px-4 pt-10 pb-32 lg:my-10 lg:py-0 dark:bg-black/80',
        className
      )}>
      {children}
    </div>
  );
}
