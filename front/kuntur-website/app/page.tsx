'use client'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <body className="font-display bg-background-light dark:bg-background-dark text-[#0e0e1b] dark:text-white antialiased">
      {/* <!-- Top Navigation Bar --> */}
      <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e7e7f3] dark:border-[#2a2a3c]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="text-[#0E9053] size-6 flex items-center justify-center">
              <Image
                src="/img/kuntur-logo.jpeg"
                alt="logo image"
                height={40}
                width={40}
              />
            </div>
            <span className="text-[#0E9053] font-sans text-2xl leading-none font-bold">
              Kuntur
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {/* <a
              className="text-sm font-medium hover:text-[#0E9053] transition-colors"
              href="#"
            >
              Funciones
            </a>
            <a
              className="text-sm font-medium hover:text-[#0E9053] transition-colors"
              href="#"
            >
              Metodología
            </a>
            <a
              className="text-sm font-medium hover:text-[#0E9053] transition-colors"
              href="#"
            >
              Precios
            </a> */}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <button className="px-4 py-2 text-sm font-semibold text-[#0e0e1b] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                Iniciar sesión
              </button>
            </Link>
            <Link href="/auth">
              <button className="bg-[#0E9053] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-[#0E9053]/20 hover:scale-[1.02] transition-all">
                Empezar gratis
              </button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        {/* <!-- Hero Section --> */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 bg-[#0E9053]/10 text-[#0E9053] px-3 py-1 rounded-full w-fit">
                <span className="text-xs font-bold uppercase tracking-wide ">
                  Finanzas personales Sin complicaciones
                </span>
              </div>
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                  La app de gastos para personas que{' '}
                  <span className="text-[#0E9053]">
                    odian las apps de gastos.
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                  Registra tus gastos en segundos, con categorías listas para
                  usar y sin configuraciones innecesarias.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <button className="h-14 px-8 bg-[#0E9053] text-white rounded-xl font-bold text-lg shadow-xl shadow-[#0E9053]/25 hover:translate-y-[-2px] transition-all cursor-pointer">
                    Abrir cuenta gratis
                  </button>
                </Link>
                {/* <div className="flex items-center gap-3 px-4">
                  <div className="flex -space-x-2">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                      data-alt="Avatar de usuario sonriente 1"
                    ></div>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"
                      data-alt="Avatar de usuario sonriente 2"
                    ></div>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-400"
                      data-alt="Avatar de usuario sonriente 3"
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    +2k personas ahorrando
                  </span>
                </div> */}
              </div>
            </div>
            {/* <!-- App Mockup Visual --> */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#0E9053]/10 blur-3xl rounded-full opacity-50"></div>
              <div className="relative bg-white dark:bg-[#1e1e35] rounded-3xl shadow-2xl border border-white/20 p-2 overflow-hidden ring-1 ring-black/5">
                <div className="bg-background-light dark:bg-background-dark rounded-2xl p-6 lg:p-8 space-y-8">
                  {/* <!-- Dashboard UI Simulation --> */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Tu Balance
                      </p>
                      <h3 className="text-3xl font-black">$4,280.00</h3>
                    </div>
                    <div className="bg-[#0E9053]/10 p-2 rounded-lg text-[#0E9053]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="#0E9053"
                        viewBox="0 0 256 256"
                      >
                        <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z"></path>
                      </svg>
                    </div>
                  </div>
                  {/* <!-- Mockup Chart --> */}
                  <div
                    className="h-48 w-full bg-gradient-to-t from-[#0E9053]/5 to-transparent rounded-xl flex items-end justify-between px-4 pb-2 gap-2"
                    data-alt="Gráfico de barras de gastos mensuales"
                  >
                    <div className="w-full bg-[#0E9053]/20 h-[40%] rounded-t-sm"></div>
                    <div className="w-full bg-[#0E9053]/40 h-[65%] rounded-t-sm"></div>
                    <div className="w-full bg-[#0E9053]/30 h-[50%] rounded-t-sm"></div>
                    <div className="w-full bg-[#0E9053] h-[90%] rounded-t-sm"></div>
                    <div className="w-full bg-[#0E9053]/60 h-[75%] rounded-t-sm"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white dark:bg-[#2a2a3c] rounded-xl shadow-sm border border-black/5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="#ffffff"
                            viewBox="0 0 256 256"
                          >
                            <path d="M216,40V224a8,8,0,0,1-16,0V176H152a8,8,0,0,1-8-8,268.75,268.75,0,0,1,7.22-56.88c9.78-40.49,28.32-67.63,53.63-78.47A8,8,0,0,1,216,40Zm-96.11-1.31a8,8,0,1,0-15.78,2.63L111.89,88H88V40a8,8,0,0,0-16,0V88H48.11l7.78-46.68a8,8,0,1,0-15.78-2.63l-8,48A8.17,8.17,0,0,0,32,88a48.07,48.07,0,0,0,40,47.32V224a8,8,0,0,0,16,0V135.32A48.07,48.07,0,0,0,128,88a8.17,8.17,0,0,0-.11-1.31Z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-sm">Restaurante</p>
                          <p className="text-xs text-gray-500">Comida y ocio</p>
                        </div>
                      </div>
                      <span className="font-bold text-red-500">-$42.50</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white dark:bg-[#2a2a3c] rounded-xl shadow-sm border border-black/5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="#0E9053"
                            viewBox="0 0 256 256"
                          >
                            <path d="M168,128a40,40,0,1,1-40-40A40,40,0,0,1,168,128Zm80-64V192a8,8,0,0,1-8,8H16a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H240A8,8,0,0,1,248,64Zm-16,46.35A56.78,56.78,0,0,1,193.65,72H62.35A56.78,56.78,0,0,1,24,110.35v35.3A56.78,56.78,0,0,1,62.35,184h131.3A56.78,56.78,0,0,1,232,145.65Z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-sm">Salario Quincena</p>
                          <p className="text-xs text-gray-500">
                            Ingresos recurrentes
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-green-600">
                        +$1,500.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Features Grid --> */}
        <section className="bg-white dark:bg-background-dark py-24 px-6 lg:px-10 border-y border-[#e7e7f3] dark:border-[#2a2a3c]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                  Tu dinero, bajo control y sin estrés
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Diseñada para quienes buscan simplicidad absoluta sin
                  sacrificar el rigor financiero.
                </p>
              </div>
              {/* <button className="text-[#0E9053] font-bold flex items-center gap-2 group">
                Ver todas las funciones
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* <!-- Feature 1 --> */}
              <div className="p-8 rounded-2xl bg-background-light dark:bg-[#1e1e35] border border-black/5 hover:border-[#0E9053]/20 transition-all group">
                <div className="size-12 bg-[#0E9053] text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#0E9053]/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm45.66,61.66-40,40a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,11.32ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Registra ingresos y gastos en segundos
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Registra tus ingresos y gastos al instante. Sin formularios
                  eternos ni clics innecesarios.
                </p>
              </div>
              {/* <!-- Feature 2 --> */}
              <div className="p-8 rounded-2xl bg-background-light dark:bg-[#1e1e35] border border-black/5 hover:border-[#0E9053]/20 transition-all group">
                <div className="size-12 bg-[#0E9053] text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#0E9053]/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Estructura financiera probada
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Inspirada en expertos en dinero. Categorías automáticas que
                  optimizan tu capacidad de ahorro desde el día uno.
                </p>
              </div>
              {/* <!-- Feature 3 --> */}
              <div className="p-8 rounded-2xl bg-background-light dark:bg-[#1e1e35] border border-black/5 hover:border-[#0E9053]/20 transition-all group">
                <div className="size-12 bg-[#0E9053] text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#0E9053]/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M248,152a8,8,0,0,1-8,8H224v16a8,8,0,0,1-16,0V160H192a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,248,152ZM56,72H72V88a8,8,0,0,0,16,0V72h16a8,8,0,0,0,0-16H88V40a8,8,0,0,0-16,0V56H56a8,8,0,0,0,0,16ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80ZM208,68.69,187.31,48l-32,32L176,100.69Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Cero configuración. Cero caos.
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Solo claridad. Olvídate del caos inicial de configurar hojas
                  de cálculo. Entra y empieza a ver tu claridad financiera al
                  instante.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Product Spotlight Section --> */}
        {/* <section className="py-24 px-6 lg:px-10 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div
                className="relative bg-[#0E9053]/5 rounded-3xl p-8 lg:p-12"
                data-alt="Visualización abstracta de gestión de capital"
              >
                <img
                  alt="Dashboard Analytics"
                  className="rounded-2xl shadow-2xl relative z-10 w-full"
                  data-alt="Captura de pantalla de dashboard analítico moderno"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCItBivHGrNEvzs8T8e9LY_4fMBANrFCVHQ0IEBv4Ee1qy9KAxI6RReEdnzQ0BuuQiVsOinCYb61Vl74eSQQBFzgzLegbseZIzbtMvH7KFgdX7BqtMWHMq4_-GwLuSSI_KGWY7geAyEAtMSkb1X17G3mBC9ndSEgv8Qv4dCxdykXKEeicnxowIr5AUd0w8N-upzulF26USNZPNfPooSYoYdDdRKxlJjz3tF-klwOZoEk27jiZje-hGaMgmo3IXX-1Rc0z4ALaDH-kqy"
                />
                <div className="absolute -top-10 -right-10 size-40 bg-[#0E9053]/20 rounded-full blur-3xl"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Tu tablero de control personal para una vida libre de deudas
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 size-6 bg-[#0E9053]/10 text-[#0E9053] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Visualización clara de tus categorías
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Gráficos simples que te dicen exactamente a dónde se va tu
                      dinero cada mes sin necesidad de ser un experto.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 size-6 bg-[#0E9053]/10 text-[#0E9053] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Metas de ahorro inteligentes
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Establece objetivos y visualiza tu progreso en tiempo real
                      con notificaciones que te motivan.
                    </p>
                  </div>
                </li>
              </ul>
              <button className="bg-[#0E9053] text-white h-12 px-6 rounded-lg font-bold hover:bg-[#0E9053]/90 transition-all">
                Ver demostración interactiva
              </button>
            </div>
          </div>
        </section> */}
        {/* <!-- CTA Section --> */}
        <section className="py-24 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto bg-[#0E9053] rounded-[2rem] p-10 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-[#0E9053]/40">
            <div className="absolute top-0 right-0 p-10 opacity-20 translate-x-1/4 -translate-y-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="400"
                height="400"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,176a8,8,0,0,1,0,16H56a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v62.92l34.88-29.07a8,8,0,0,1,9.56-.51l43,28.69,43.41-36.18a8,8,0,0,1,10.24,12.3l-48,40a8,8,0,0,1-9.56.51l-43-28.69L64,155.75V176Z"></path>
              </svg>
            </div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black">
                ¿Listo para dominar tus finanzas?
              </h2>
              <p className="text-[#0E9053]-100 text-lg lg:text-xl max-w-2xl mx-auto opacity-90">
                Únete a miles de personas que ya han recuperado el control de su
                dinero con Kuntur. Empieza gratis hoy mismo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth">
                  <button className="w-full sm:w-auto px-10 py-4 bg-white text-[#0E9053] rounded-xl font-black text-lg hover:bg-gray-100 transition-all shadow-xl">
                    Abrir cuenta gratis
                  </button>
                </Link>
                {/* <button className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                  Agendar demo
                </button> */}
              </div>
              {/* <p className="text-sm opacity-60 italic">
                No se requiere tarjeta de crédito. Cancela en cualquier momento.
              </p> */}
            </div>
          </div>
        </section>
      </main>
      {/* <!-- Footer --> */}
      <footer className="bg-white dark:bg-[#0c0c16] py-16 px-6 lg:px-10 border-t border-[#e7e7f3] dark:border-[#2a2a3c]">
        {/* <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="text-[#0E9053] size-6 flex items-center justify-center">
                <div className="text-[#0E9053] size-6 flex items-center justify-center">
                  <Image
                    src="/img/kuntur-logo.jpeg"
                    alt="logo image"
                    height={40}
                    width={40}
                  />
                </div>
                <span className="text-[#0E9053] font-sans text-2xl leading-none font-bold">
                  Kuntur
                </span>
              </div>
            </div>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              Haciendo que la gestión del dinero sea tan simple como debería
              ser. Diseñado con ❤️ para personas reales.
            </p>
            <div className="flex gap-4">
              <a
                className="text-gray-400 hover:text-[#0E9053] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
              <a
                className="text-gray-400 hover:text-[#0E9053] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="font-bold text-sm uppercase tracking-widest text-gray-400">
              Producto
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0E9053] transition-colors text-sm"
                  href="#"
                >
                  Funciones
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0E9053] transition-colors text-sm"
                  href="#"
                >
                  Seguridad
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0E9053] transition-colors text-sm"
                  href="#"
                >
                  Precios
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-bold text-sm uppercase tracking-widest text-gray-400">
              Compañía
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0E9053] transition-colors text-sm"
                  href="#"
                >
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0E9053] transition-colors text-sm"
                  href="#"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0E9053] transition-colors text-sm"
                  href="#"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-bold text-sm uppercase tracking-widest text-gray-400">
              Legal
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0E9053] transition-colors text-sm"
                  href="#"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-[#0E9053] transition-colors text-sm"
                  href="#"
                >
                  Términos
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#e7e7f3] dark:border-[#2a2a3c] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2024 Kuntur Inc. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2"></div>
        </div>
      </footer>
    </body>
  )
}
