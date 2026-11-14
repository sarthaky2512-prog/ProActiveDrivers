import heroDriverImg from '../assets/images/hero_truck_driver_1794644613194.jpg';
import peopleFirstImg from '../assets/images/people_first_community_1794644612590.jpg';
import cdlSupportImg from '../assets/images/cdl_protection_support_1794644613775.jpg';
import spanishSupportImg from '../assets/images/spanish_driver_support_1794644613964.jpg';

export const OFFICIAL_CONTACT = {
  companyName: 'Proactive Drivers United Legal Help',
  shortName: 'Proactive Drivers',
  website: 'https://ProactiveDrivers.com',
  websiteDisplay: 'ProactiveDrivers.com',
  phoneDisplay: '800-791-8385',
  phoneHref: 'tel:+18007918385',
  whatsappDisplay: '210-361-0296',
  whatsappHref: 'https://wa.me/12103610296',
  email: 'unite@proactivedrivers.com',
  emailHref: 'mailto:unite@proactivedrivers.com',
  logoPath: '/assets/aistudio/proactive_logo_ab215bc8.jpeg',
} as const;

export const SITE_IMAGES = {
  heroDriver: heroDriverImg,
  peopleFirst: peopleFirstImg,
  cdlSupport: cdlSupportImg,
  spanishSupport: spanishSupportImg,
} as const;

export const US_STATES: Array<{ code: string; name: string }> = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

export interface ServiceItem {
  id: string;
  number: string;
  iconName:
    | 'Shield'
    | 'Award'
    | 'Scale'
    | 'Briefcase'
    | 'FileWarning'
    | 'Truck'
    | 'BookOpen'
    | 'Users'
    | 'Languages';
  category: 'cdl' | 'rights' | 'community';
  titleEn: string;
  titleEs: string;
  summaryEn: string;
  summaryEs: string;
  detailsEn: string;
  detailsEs: string;
  scopeNoteEn: string;
  scopeNoteEs: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'driver-rights-protection',
    number: '01',
    iconName: 'Shield',
    category: 'rights',
    titleEn: 'Driver Rights Protection',
    titleEs: 'Protección de los Derechos del Conductor',
    summaryEn:
      'Clear educational guidance and support connections helping professional drivers understand their roadside, workplace, and constitutional rights.',
    summaryEs:
      'Orientación educativa clara y conexiones de apoyo para que los conductores comprendan sus derechos laborales y en carretera.',
    detailsEn:
      'We organize plain-language information on inspection procedures, driver protections under federal safety rules, and steps for documenting roadside or dispatch disputes.',
    detailsEs:
      'Organizamos información clara sobre procedimientos de inspección, protecciones bajo normas federales y pasos para documentar disputas en carretera.',
    scopeNoteEn: 'Educational information & resource connection — not direct legal representation.',
    scopeNoteEs: 'Información educativa y conexión de recursos — no es representación legal directa.',
  },
  {
    id: 'cdl-protection-support',
    number: '02',
    iconName: 'Award',
    category: 'cdl',
    titleEn: 'CDL Protection Support',
    titleEs: 'Apoyo para la Protección de la CDL',
    summaryEn:
      'Dedicated resources designed to help commercial license holders understand violation impacts, CSA points, and referral pathways.',
    summaryEs:
      'Recursos dedicados para ayudar a titulares de licencia comercial a entender el impacto de infracciones, puntos CSA y vías de referencia.',
    detailsEn:
      'Your Commercial Driver’s License is your livelihood. We connect drivers with CDL-focused information and qualified third-party referral options where available.',
    detailsEs:
      'Su licencia comercial CDL es su sustento. Conectamos a los conductores con información especializada en CDL y opciones de referencia independientes disponibles.',
    scopeNoteEn: 'Support & referral coordination — outcomes are never guaranteed.',
    scopeNoteEs: 'Coordinación de apoyo y referencias — no se garantizan resultados legales.',
  },
  {
    id: 'legal-assistance-resources',
    number: '03',
    iconName: 'Scale',
    category: 'cdl',
    titleEn: 'Legal Assistance Resources',
    titleEs: 'Recursos de Asistencia Legal',
    summaryEn:
      'Structured intake and guidance connecting members with relevant transportation-focused legal information and external referral networks.',
    summaryEs:
      'Proceso de admisión estructurado que conecta a los miembros con información legal del transporte y redes externas de referencia.',
    detailsEn:
      'When a legal challenge arises, knowing where to turn matters. Our intake team helps route your inquiry to appropriate educational resources or independent counsel referrals.',
    detailsEs:
      'Cuando surge un problema legal, saber a quién acudir es fundamental. Nuestro equipo canaliza su consulta hacia recursos adecuados o referencias independientes.',
    scopeNoteEn: 'Proactive Drivers United Legal Help is not a law firm and does not provide attorney services.',
    scopeNoteEs: 'Proactive Drivers United Legal Help no es un bufete de abogados ni presta servicios jurídicos directos.',
  },
  {
    id: 'employment-rights-information',
    number: '04',
    iconName: 'Briefcase',
    category: 'rights',
    titleEn: 'Employment Rights Information',
    titleEs: 'Información sobre Derechos Laborales',
    summaryEn:
      'Accessible information on driver classification, settlement transparency, coercion protections, and workplace documentation.',
    summaryEs:
      'Información accesible sobre clasificación laboral, transparencia en pagos, protección contra coerción y documentación laboral.',
    detailsEn:
      'Covers federal whistleblower protections (STAA), lease-purchase review checklists, and resources for understanding wage, detention, and dispatch practices.',
    detailsEs:
      'Incluye información sobre protecciones federales (STAA), listas de verificación para contratos y recursos sobre prácticas de pago y despacho.',
    scopeNoteEn: 'General educational resource only — consult a licensed attorney for specific advice.',
    scopeNoteEs: 'Solo recurso educativo general — consulte a un abogado autorizado para asesoría específica.',
  },
  {
    id: 'traffic-violation-support',
    number: '05',
    iconName: 'FileWarning',
    category: 'cdl',
    titleEn: 'Traffic Violation Support Resources',
    titleEs: 'Recursos de Apoyo ante Infracciones de Tránsito',
    summaryEn:
      'Practical next-step checklists and referral intake for moving citations, overweight tickets, logbook issues, and DOT inspections.',
    summaryEs:
      'Guías prácticas de próximos pasos y admisión de referencias para multas de tránsito, exceso de peso, bitácoras e inspecciones DOT.',
    detailsEn:
      'Provides timeline awareness for court response dates, DataQs challenge education, and structured support request routing to external traffic defense resources.',
    detailsEs:
      'Ofrece orientación sobre plazos judiciales, educación sobre el sistema DataQs y canalización hacia recursos externos de defensa vial.',
    scopeNoteEn: 'Informational & referral support only — does not create an attorney-client relationship.',
    scopeNoteEs: 'Solo apoyo informativo y de referencia — no crea relación abogado-cliente.',
  },
  {
    id: 'transportation-industry-legal-resources',
    number: '06',
    iconName: 'Truck',
    category: 'cdl',
    titleEn: 'Transportation Industry Legal Resources',
    titleEs: 'Recursos Legales de la Industria del Transporte',
    summaryEn:
      'Industry-specific reference guides covering FMCSA compliance, Hours of Service, Clearinghouse rules, and owner-operator agreements.',
    summaryEs:
      'Guías específicas de la industria sobre cumplimiento FMCSA, Horas de Servicio, Clearinghouse y acuerdos de propietarios-operadores.',
    detailsEn:
      'Built specifically for commercial trucking realities—translating complex federal and state transportation updates into clear driver-friendly summaries.',
    detailsEs:
      'Diseñado para la realidad del transporte comercial, traduciendo regulaciones federales y estatales complejas en resúmenes claros para conductores.',
    scopeNoteEn: 'Verified regulatory summaries & informational guidance.',
    scopeNoteEs: 'Resúmenes regulatorios verificados y orientación informativa.',
  },
  {
    id: 'driver-advocacy-education',
    number: '07',
    iconName: 'BookOpen',
    category: 'community',
    titleEn: 'Driver Advocacy & Education',
    titleEs: 'Defensa y Educación para el Conductor',
    summaryEn:
      'Ongoing workshops, safety and rights briefings, and proactive education empowering drivers before disputes occur.',
    summaryEs:
      'Talleres continuos, boletines de seguridad y derechos, y educación proactiva para preparar a los conductores antes de que surjan conflictos.',
    detailsEn:
      'Prevention starts with knowledge. Our educational materials equip drivers and families with clear checklists before signing agreements or hitting the highway.',
    detailsEs:
      'La prevención comienza con el conocimiento. Nuestros materiales preparan a conductores y familias antes de firmar acuerdos o salir a carretera.',
    scopeNoteEn: 'Proactive driver literacy & community advocacy.',
    scopeNoteEs: 'Educación preventiva y defensa comunitaria.',
  },
  {
    id: 'community-support',
    number: '08',
    iconName: 'Users',
    category: 'community',
    titleEn: 'Community Support',
    titleEs: 'Apoyo Comunitario',
    summaryEn:
      'A united community network built on the People 1st | Gente Primero principle so no driver has to navigate challenges alone.',
    summaryEs:
      'Una red comunitaria unida bajo el principio People 1st | Gente Primero para que ningún conductor enfrente retos solo.',
    detailsEn:
      'Connects company drivers, owner-operators, and transportation families with peer solidarity, bilingual intake coordinators, and trusted resource updates.',
    detailsEs:
      'Conecta a conductores de empresa, propietarios-operadores y familias del transporte con apoyo solidario y coordinadores bilingües.',
    scopeNoteEn: 'Community membership & peer support network.',
    scopeNoteEs: 'Membresía comunitaria y red de apoyo mutuo.',
  },
  {
    id: 'spanish-language-assistance',
    number: '09',
    iconName: 'Languages',
    category: 'community',
    titleEn: 'Spanish Language Assistance',
    titleEs: 'Asistencia en Idioma Español',
    summaryEn:
      'Ayuda Legal Unidos en Español — dedicated bilingual intake, educational resources, and phone/WhatsApp support in Spanish.',
    summaryEs:
      'Ayuda Legal Unidos en Español — admisión bilingüe dedicada, recursos educativos y apoyo por teléfono y WhatsApp en español.',
    detailsEn:
      'Language barriers should never put a driver’s CDL or livelihood at risk. Every core guide, registration form, and support pathway is accessible in Spanish.',
    detailsEs:
      'Las barreras del idioma nunca deben poner en riesgo su CDL ni su sustento. Todas nuestras guías, formularios y vías de apoyo están disponibles en español.',
    scopeNoteEn: 'Full bilingual English & Spanish community support.',
    scopeNoteEs: 'Apoyo comunitario completo bilingüe en inglés y español.',
  },
];

export interface FaqEntry {
  id: string;
  category: 'general' | 'cdl' | 'membership' | 'contact';
  questionEn: string;
  questionEs: string;
  answerEn: string;
  answerEs: string;
}

export const FAQ_ITEMS: FaqEntry[] = [
  {
    id: 'what-is-proactive',
    category: 'general',
    questionEn: 'What is Proactive Drivers United Legal Help?',
    questionEs: '¿Qué es Proactive Drivers United Legal Help?',
    answerEn:
      'Proactive Drivers United Legal Help is a driver-focused support community and legal information platform built around the principle "People 1st | Gente Primero." We help truck drivers, CDL holders, and transportation professionals understand their rights, access educational resources, and connect with appropriate legal support referrals.',
    answerEs:
      'Proactive Drivers United Legal Help es una comunidad de apoyo y plataforma de información legal centrada en el conductor bajo el principio "People 1st | Gente Primero". Ayudamos a camioneros, titulares de CDL y profesionales del transporte a comprender sus derechos, acceder a recursos educativos y conectarse con referencias de apoyo legal.',
  },
  {
    id: 'who-can-join',
    category: 'membership',
    questionEn: 'Who can join the community?',
    questionEs: '¿Quién puede unirse a la comunidad?',
    answerEn:
      'Commercial truck drivers, CDL holders, owner-operators, fleet and delivery drivers, student drivers, and members of the transportation community across the United States can join. Both English- and Spanish-speaking drivers are welcome.',
    answerEs:
      'Conductores comerciales de camiones, titulares de CDL, propietarios-operadores, conductores de flotas y entregas, estudiantes de manejo comercial y miembros de la comunidad del transporte en Estados Unidos pueden unirse. Tanto conductores que hablan inglés como español son bienvenidos.',
  },
  {
    id: 'how-protect-cdl',
    category: 'cdl',
    questionEn: 'How can I protect my CDL?',
    questionEs: '¿Cómo puedo proteger mi CDL?',
    answerEn:
      'Protecting your CDL starts with proactive awareness: staying informed about FMCSA rules, documenting inspections accurately, responding promptly to traffic citations before deadlines pass, and connecting quickly with qualified support resources when an issue arises. Our community provides educational checklists and intake connections to help you take informed next steps.',
    answerEs:
      'Proteger su CDL comienza con prevención: mantenerse informado sobre normas de la FMCSA, documentar inspecciones con precisión, atender citaciones de tránsito antes de las fechas límite y conectarse rápidamente con recursos de apoyo cuando surge un problema. Nuestra comunidad ofrece guías educativas y conexiones de admisión para ayudarle a dar pasos informados.',
  },
  {
    id: 'types-of-support',
    category: 'cdl',
    questionEn: 'What types of driver support are available?',
    questionEs: '¿Qué tipos de apoyo para conductores están disponibles?',
    answerEn:
      'We provide resources across nine core areas: Driver Rights Protection, CDL Protection Support, Legal Assistance Resources, Employment Rights Information, Traffic Violation Support Resources, Transportation Industry Legal Resources, Driver Advocacy & Education, Community Support, and Spanish Language Assistance. Please note that we provide informational resources and support connections rather than direct legal representation.',
    answerEs:
      'Ofrecemos recursos en nueve áreas principales: Protección de Derechos del Conductor, Apoyo para Protección de CDL, Recursos de Asistencia Legal, Información de Derechos Laborales, Recursos ante Infracciones de Tránsito, Recursos Legales de la Industria, Defensa y Educación, Apoyo Comunitario y Asistencia en Español. Tenga en cuenta que brindamos información y conexiones de apoyo, no representación legal directa.',
  },
  {
    id: 'how-request-support',
    category: 'cdl',
    questionEn: 'How do I request legal support?',
    questionEs: '¿Cómo solicito apoyo legal?',
    answerEn:
      'You can submit our online Request Legal Support form with general details about your situation (without uploading sensitive documents), call us directly at 800-791-8385, or message us on WhatsApp at 210-361-0296. Submitting an inquiry does not create an attorney-client relationship.',
    answerEs:
      'Puede enviar nuestro formulario en línea de Solicitud de Apoyo Legal con detalles generales de su situación (sin subir documentos confidenciales), llamarnos directamente al 800-791-8385 o escribirnos por WhatsApp al 210-361-0296. Enviar una consulta no crea una relación abogado-cliente.',
  },
  {
    id: 'how-membership-works',
    category: 'membership',
    questionEn: 'How does membership work?',
    questionEs: '¿Cómo funciona la membresía?',
    answerEn:
      'Membership follows four simple steps: Join by completing the registration form, Connect with our driver community, Get Support by exploring educational resources and submitting assistance requests, and Stay Protected with ongoing rights updates. Verified benefits and special offers are published in our Benefits section as they become available.',
    answerEs:
      'La membresía sigue cuatro pasos sencillos: Únase completando el formulario de registro, Conéctese con nuestra comunidad de conductores, Obtenga Apoyo explorando recursos educativos y solicitando asistencia, y Manténgase Protegido con actualizaciones continuas. Los beneficios y ofertas verificadas se publican en nuestra sección de Beneficios según disponibilidad.',
  },
  {
    id: 'spanish-available',
    category: 'general',
    questionEn: 'Is Spanish-language assistance available?',
    questionEs: '¿Hay asistencia disponible en español?',
    answerEn:
      'Yes. Through Ayuda Legal Unidos en Español, we offer a full Spanish-language website experience, bilingual registration and support forms, and dedicated English/Spanish phone and WhatsApp assistance.',
    answerEs:
      'Sí. A través de Ayuda Legal Unidos en Español, ofrecemos una experiencia completa del sitio web en español, formularios de registro y apoyo bilingües, y asistencia dedicada en inglés y español por teléfono y WhatsApp.',
  },
  {
    id: 'how-contact',
    category: 'contact',
    questionEn: 'How can I contact the organization?',
    questionEs: '¿Cómo puedo comunicarme con la organización?',
    answerEn:
      'You can reach Proactive Drivers United Legal Help by phone at 800-791-8385, by WhatsApp at 210-361-0296 (https://wa.me/12103610296), by email at unite@proactivedrivers.com, or through the Contact Us form on our website.',
    answerEs:
      'Puede comunicarse con Proactive Drivers United Legal Help por teléfono al 800-791-8385, por WhatsApp al 210-361-0296 (https://wa.me/12103610296), por correo electrónico a unite@proactivedrivers.com o mediante el formulario de Contacto en nuestro sitio web.',
  },
];

export interface ConfigurableLocationPreset {
  id: string;
  labelEn: string;
  labelEs: string;
  address: string;
  lat: number;
  lng: number;
  corridorNoteEn: string;
  corridorNoteEs: string;
}

export const CONFIGURABLE_LOCATION_PRESETS: ConfigurableLocationPreset[] = [
  {
    id: 'san-antonio',
    labelEn: 'San Antonio Hub (I-35 / I-10 Corridor)',
    labelEs: 'Centro San Antonio (Corredor I-35 / I-10)',
    address: 'San Antonio, TX 78205, United States',
    lat: 29.4241,
    lng: -98.4936,
    corridorNoteEn: 'Primary bilingual intake & Southern freight corridor coordination.',
    corridorNoteEs: 'Coordinación principal de admisión bilingüe y corredor sur de carga.',
  },
  {
    id: 'dallas-ft-worth',
    labelEn: 'Dallas–Fort Worth Freight Hub',
    labelEs: 'Centro de Carga Dallas–Fort Worth',
    address: 'Dallas, TX 75201, United States',
    lat: 32.7767,
    lng: -96.797,
    corridorNoteEn: 'Configurable regional outreach point for North Texas & I-20/I-35 drivers.',
    corridorNoteEs: 'Punto regional configurable para conductores del norte de Texas e I-20/I-35.',
  },
  {
    id: 'chicago-midwest',
    labelEn: 'Chicago Midwest Corridor',
    labelEs: 'Corredor Medio Oeste Chicago',
    address: 'Chicago, IL 60601, United States',
    lat: 41.8781,
    lng: -87.6298,
    corridorNoteEn: 'Configurable regional support point for Midwest intermodal & long-haul routes.',
    corridorNoteEs: 'Punto regional configurable para rutas intermodales y de largo recorrido del Medio Oeste.',
  },
];
