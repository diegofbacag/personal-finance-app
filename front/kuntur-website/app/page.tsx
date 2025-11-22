'use client'
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans relative overflow-hidden bg-[#04644f] premium-bg bg-[#f5f5f5]">
      {/* Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <main className="flex flex-col min-h-[50vh] min-w-[28vw] relative bg-white p-10 rounded-2xl shadow-xl backdrop-blur-xl gap-3 items-center justify-center">
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-[#0a7242] text-2xl">Kuntur</p>
        </div>
        <p className="text-[#5c5c5c] font-bold ">Tu dinero, claro y simple.</p>
        <div className="flex flex-col items-center justify-center">
          <p className="text-[#5c5c5c]">
            Controla tus gastos, organiza tu presupuesto
          </p>
          <p className="text-[#5c5c5c]">
            y toma decisiones sin complicaciones.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <input
            className="p-2 bg-[#eaeaea] text-white rounded-xl"
            placeholder="mail@mail.com"
          ></input>
          <input
            className="p-2 bg-[#eaeaea] text-white rounded-2xl"
            placeholder="mail@mail.com"
          ></input>
        </div>

        <button className="bg-[#04644f] h-10 w-40 rounded-xl cursor-pointer">
          <p className="text-white font-medium text-sm">Login</p>
        </button>
        <div>o</div>
        <button className="bg-[#04644f] h-10 w-40 rounded-xl cursor-pointer">
          <p className="text-white font-medium text-sm">Login with google</p>
        </button>
      </main>

      <style jsx global>{`
        /* ----------------------------------------------
           PREMIUM BACKGROUND (super subtle texture + lighting)
        ---------------------------------------------- */
        .premium-bg {
          position: relative;
        }

        /* Subtle radial light effect */
        .premium-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0.03) 40%,
            rgba(0, 0, 0, 0) 100%
          );
          pointer-events: none;
        }

        /* Ultra-light “premium grain” (almost invisible) */
        .premium-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
          opacity: 0.05; /* Lowered from 0.06 to make it premium */
          pointer-events: none;
        }

        /* ----------------------------------------------
           BLOBS (same, soft motion)
        ---------------------------------------------- */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.45; /* Slightly reduced for cleaner premium look */
        }

        .blob1 {
          width: 340px;
          height: 340px;
          background: #00c187;
          top: -40px;
          left: -50px;
          animation: float1 12s ease-in-out infinite;
        }

        .blob2 {
          width: 290px;
          height: 290px;
          background: #04a66b;
          bottom: -60px;
          right: -40px;
          animation: float2 11s ease-in-out infinite;
        }

        .blob3 {
          width: 240px;
          height: 240px;
          background: #059e63;
          bottom: 28%;
          left: 22%;
          animation: float3 14s ease-in-out infinite;
        }

        @keyframes float1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, -40px) scale(1.08);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes float2 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, -30px) scale(1.12);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes float3 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 40px) scale(1.1);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
