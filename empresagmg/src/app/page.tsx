"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Briefcase,
  Globe,
  ArrowRight,
  Shield,
  Smartphone,
  Wrench,
  Paintbrush,
  Home,
  Menu,
  X,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Share2,
  Copy,
  Check,
} from "lucide-react";

const companies = [
  {
    name: "Global Multiservice Group",
    description:
      "Empresa principal del consorcio. Soluciones integrales empresariales, consultoría y gestión de proyectos a nivel global.",
    icon: Globe,
    color: "bg-gmg-blue",
    textColor: "text-gmg-blue",
  },
  {
    name: "Lanco's Decorations",
    description:
      "Diseño interior, decoración de espacios comerciales y residenciales. Transformamos ambientes con estilo y elegancia.",
    icon: Paintbrush,
    color: "bg-rose-600",
    textColor: "text-rose-600",
  },
  {
    name: "TechShield Global",
    description:
      "Ciberseguridad, protección de datos y soluciones tecnológicas avanzadas para empresas de todos los tamaños.",
    icon: Shield,
    color: "bg-emerald-600",
    textColor: "text-emerald-600",
  },
  {
    name: "Drphone Technology",
    description:
      "Reparación, mantenimiento y venta de dispositivos móviles. Tecnología de punta al alcance de todos.",
    icon: Smartphone,
    color: "bg-blue-500",
    textColor: "text-blue-500",
  },
  {
    name: "OmniFix Solutions",
    description:
      "Servicios técnicos especializados, reparaciones industriales y mantenimiento predictivo de equipos.",
    icon: Wrench,
    color: "bg-amber-600",
    textColor: "text-amber-600",
  },
  {
    name: "Komo in Kasa",
    description:
      "Bienes raíces, construcción y desarrollo inmobiliario. Creamos hogares y espacios que inspiran.",
    icon: Home,
    color: "bg-teal-600",
    textColor: "text-teal-600",
  },
];

const positions = [
  "Técnicos en Reparación de Dispositivos",
  "Especialistas en Ciberseguridad",
  "Diseñadores de Interiores",
  "Desarrolladores de Software",
  "Ingenieros de Mantenimiento",
  "Asesores Inmobiliarios",
  "Consultores Empresariales",
  "Técnicos en Instalaciones",
  "Especialistas en Marketing Digital",
  "Administradores de Proyectos",
];

const benefits = [
  "Desarrollo profesional continuo",
  "Capacitaciones y certificaciones",
  "Ambiente laboral inclusivo",
  "Oportunidades de crecimiento",
  "Paquete compensatorio competitivo",
  "Seguro médico y beneficios",
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/cuestionario`
      : "https://empresagmg.com/cuestionario";
  const shareText =
    "¡Únete al Grupo EmpresaGMG! Estamos reclutando talento para Global Multiservice Group, Lanco's Decorations, TechShield Global, Drphone Technology, OmniFix Solutions y Komo in Kasa. Completa el cuestionario de reclutamiento aquí:";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Oportunidad Laboral - Grupo EmpresaGMG");
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-gmg-blue" />
              <span className="text-xl font-bold text-gmg-dark">
                Empresa<span className="text-gmg-blue">GMG</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#empresas" className="text-slate-600 hover:text-gmg-blue font-medium transition-colors">
                Nuestras Empresas
              </a>
              <a href="#vacantes" className="text-slate-600 hover:text-gmg-blue font-medium transition-colors">
                Vacantes
              </a>
              <a href="#beneficios" className="text-slate-600 hover:text-gmg-blue font-medium transition-colors">
                Beneficios
              </a>
              <a href="#contacto" className="text-slate-600 hover:text-gmg-blue font-medium transition-colors">
                Contacto
              </a>
              <Link
                href="/cuestionario"
                className="bg-gmg-blue hover:bg-gmg-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Aplicar Ahora
              </Link>
              <Link
                href="/admin/login"
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Panel RRHH
              </Link>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
            <a href="#empresas" className="block text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Nuestras Empresas
            </a>
            <a href="#vacantes" className="block text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Vacantes
            </a>
            <a href="#beneficios" className="block text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Beneficios
            </a>
            <a href="#contacto" className="block text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contacto
            </a>
            <Link
              href="/cuestionario"
              className="block bg-gmg-blue text-white px-4 py-2 rounded-lg font-semibold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Aplicar Ahora
            </Link>
            <Link
              href="/admin/login"
              className="block bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Panel RRHH
            </Link>
          </div>
        )}
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gmg-light via-white to-slate-100" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-gmg-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gmg-gold/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-gmg-blue/10 text-gmg-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Users className="w-4 h-4" />
                Estamos Reclutando Talento
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gmg-dark leading-tight mb-6"
            >
              Únete al Grupo <span className="text-gmg-blue">EmpresaGMG</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed"
            >
              Forma parte de un consorcio líder en múltiples sectores. Buscamos
              técnicos y profesionales apasionados que quieran crecer junto a
              nosotros en Global Multiservice Group y nuestras empresas subsidiarias.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/cuestionario"
                className="bg-gmg-blue hover:bg-gmg-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-gmg-blue/20"
              >
                <Briefcase className="w-5 h-5" />
                Completar Cuestionario
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShareModalOpen(true)}
                className="bg-white hover:bg-slate-50 text-gmg-dark border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Compartir Vacante
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gmg-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "6", label: "Empresas del Grupo" },
              { number: "50+", label: "Vacantes Disponibles" },
              { number: "15+", label: "Países con Presencia" },
              { number: "1000+", label: "Empleados Activos" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gmg-light text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="empresas" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gmg-dark mb-4">
              Nuestras <span className="text-gmg-blue">Empresas</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Un grupo diverso de empresas líderes en sus respectivos sectores,
              unidas por la excelencia y el compromiso con nuestros clientes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className={`${company.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <company.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gmg-dark mb-2">{company.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{company.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-center">
              <div className="flex items-center justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gmg-blue/10 text-gmg-blue text-4xl font-bold">
                  JP
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gmg-blue font-semibold mb-3">
                  CEO & Fundador | Grupo Empresarial GMG
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gmg-dark mb-4">
                  Juan Carlos Polanco Blanco
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Ingeniero Industrial y Administrador de Empresas con más de 22 años de experiencia en liderazgo estratégico, gestión de operaciones y desarrollo de negocios.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Actualmente especializándose en un Máster en Big Data y Análisis de Datos por la Universidad de Salamanca, ha dedicado su trayectoria a la creación y expansión de proyectos empresariales sostenibles, liderando Grupo Empresarial GMG bajo una visión de excelencia.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Su enfoque combina la optimización de procesos de la ingeniería y la visión directiva con la analítica avanzada de datos para impulsar la transformación digital, la innovación continua y la toma de decisiones estratégicas basadas en datos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vacantes" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gmg-dark mb-4">
                Áreas de <span className="text-gmg-blue">Reclutamiento</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Buscamos talento en diversas áreas. Si tienes experiencia o
                deseas iniciar tu carrera profesional en alguno de estos campos,
                queremos conocerte.
              </p>
              <Link
                href="/cuestionario"
                className="bg-gmg-blue hover:bg-gmg-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Postularme Ahora
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {positions.map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-gmg-blue flex-shrink-0" />
                  <span className="text-slate-700 font-medium text-sm">{pos}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gmg-dark mb-4">
              Beneficios de <span className="text-gmg-blue">Trabajar con Nosotros</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Valoramos a nuestro equipo y ofrecemos beneficios diseñados para tu
              bienestar y crecimiento profesional.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gmg-blue to-gmg-accent rounded-2xl p-6 text-white"
              >
                <CheckCircle2 className="w-8 h-8 mb-3 opacity-80" />
                <p className="font-semibold text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gmg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gmg-blue/20 to-gmg-gold/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">¿Listo para Dar el Siguiente Paso?</h2>
          <p className="text-slate-300 text-lg mb-8">
            Completa nuestro cuestionario de reclutamiento y forma parte del
            grupo de empresas más dinámico de la región.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cuestionario"
              className="bg-gmg-gold hover:bg-yellow-500 text-gmg-dark px-8 py-4 rounded-xl font-bold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              Comenzar Cuestionario
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setShareModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Compartir con un Amigo
            </button>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gmg-dark mb-4">Contacto</h2>
            <p className="text-slate-600 text-lg">¿Tienes preguntas sobre el proceso de reclutamiento? Contáctanos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm">
              <Mail className="w-8 h-8 text-gmg-blue mx-auto mb-3" />
              <h3 className="font-semibold text-gmg-dark mb-1">Email</h3>
              <a href="mailto:globalmultiservicegroup@gmail.com" className="text-slate-600 text-sm hover:text-gmg-blue transition-colors">
                globalmultiservicegroup@gmail.com
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm">
              <Phone className="w-8 h-8 text-gmg-blue mx-auto mb-3" />
              <h3 className="font-semibold text-gmg-dark mb-1">Teléfono</h3>
              <a href="tel:18094226985" className="text-slate-600 text-sm hover:text-gmg-blue transition-colors">
                1-809-422-6985
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm">
              <MapPin className="w-8 h-8 text-gmg-blue mx-auto mb-3" />
              <h3 className="font-semibold text-gmg-dark mb-1">Ubicación</h3>
              <p className="text-slate-600 text-sm">Avenida Ecológica<br />Santo Domingo Este</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gmg-dark text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-gmg-blue" />
                <span className="text-lg font-bold text-white">Empresa<span className="text-gmg-blue">GMG</span></span>
              </div>
              <p className="text-sm leading-relaxed">
                Grupo de empresas líder en múltiples sectores, comprometido con
                la excelencia, la innovación y el desarrollo de talento humano.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresas del Grupo</h4>
              <ul className="space-y-2 text-sm">
                {companies.map((c, i) => (
                  <li key={i}>{c.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/cuestionario" className="hover:text-white transition-colors">
                    Aplicar Ahora
                  </Link>
                </li>
                <li>
                  <a href="#empresas" className="hover:text-white transition-colors">
                    Nuestras Empresas
                  </a>
                </li>
                <li>
                  <a href="#vacantes" className="hover:text-white transition-colors">
                    Vacantes
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="hover:text-white transition-colors">
                    Beneficios
                  </a>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-white transition-colors">
                    Panel RRHH
                  </Link>
                </li>
              </ul>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Juan Carlos Polanco Blanco</p>
                <p className="mt-1">CEO & Fundador</p>
                <p className="mt-1">Máster en Big Data y Análisis de Datos, Universidad de Salamanca</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm space-y-2">
            <p>© {new Date().getFullYear()} EmpresaGMG - Global Multiservice Group. Todos los derechos reservados.</p>
            <p>Avenida Ecológica, Santo Domingo Este | Tel: 1-809-422-6985 | globalmultiservicegroup@gmail.com</p>
          </div>
        </div>
      </footer>

      {shareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShareModalOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
          >
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-gmg-light rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="w-7 h-7 text-gmg-blue" />
              </div>
              <h3 className="text-xl font-bold text-gmg-dark">Compartir Vacante</h3>
              <p className="text-slate-500 text-sm mt-1">Invita a alguien a aplicar al Grupo EmpresaGMG</p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Compartir por WhatsApp
              </button>
              <button
                onClick={handleShareEmail}
                className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                <Mail className="w-5 h-5" />
                Compartir por Email
              </button>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                O copia el enlace
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 bg-gmg-blue hover:bg-gmg-dark text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
