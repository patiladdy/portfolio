// @ts-check
/*
  Aditya Angad Patil — portfolio
  ──────────────────────────────────────────────────────────────────────────
  1. PORTFOLIO  — all content lives here. Edit this block to change copy,
                  links, roles, projects or skills; nothing below needs to.
  2. Helpers    — escaping, templating, dates.
  3. Renderers  — one pure function per section (data → HTML string).
  4. Behaviour  — theme, navigation, reveal, Fig. 01 diagram, Fig. 02 chart,
                  skills cross-reference, clock.
  5. Boot
  Types are declared with JSDoc and checked by the editor via @ts-check.
*/
(() => {
  'use strict';

  /* ======================================================================
     1. CONTENT
     ====================================================================== */

  /**
   * @typedef {'mail'|'phone'|'github'|'linkedin'|'arrow-up-right'|'arrow-right'|'file-text'|'sun'|'moon'|'menu'|'x'|'chevron-down'|'monitor'|'layers'|'server'|'database'|'hard-drive'|'radio'|'workflow'|'sparkles'|'cloud'|'map-pin'|'clock'|'corner-down-right'} IconName
   * @typedef {{ label: string, value: string }} Fact
   * @typedef {{ id: string, num: string, title: string, blurb: string, eyebrow?: string, heading?: string, lede?: string }} SectionMeta
   * @typedef {{ label: string, href: string }} Link
   * @typedef {{ id: string, title: string, org: string, role: string, period?: string, summary: string, points: string[], stack: string[], link?: Link, experienceId?: string }} WorkItem
   * @typedef {{ id: string, role: string, org: string, via?: string, start: string, end: string|null, summary?: string, points?: string[], stack?: string[] }} ExperienceItem
   * @typedef {{ id: string, title: string, field?: string, institution: string, start?: string, end: string, note?: string, score: { label: string, value: string }, chart?: string }} EducationItem
   * @typedef {{ label: string, items: string[] }} SkillGroup
   * @typedef {{ id: string, col: number, order?: number, icon: IconName, title: string, sub: string, detail: string, where: string, href?: string, platform?: boolean }} DiagramNode
   * @typedef {{ caption: string, hint: string, idle: { kicker: string, title: string, text: string, where: string }, columns: string[], nodes: DiagramNode[], edges: [string, string][], autoplayMs: number }} Diagram
   * @typedef {{ url: string, resume: string, revised: string, timeZone: string, timeZoneLabel: string }} SiteMeta
   * @typedef {{ name: string, role: string, location: string, photo: { src: string, alt: string, width: number, height: number }, email: string, phone: string|null, github: string, linkedin: string, headline: string, lede: string, facts: Fact[] }} Profile
   * @typedef {{ site: SiteMeta, profile: Profile, sections: SectionMeta[], diagram: Diagram, work: WorkItem[], experience: ExperienceItem[], education: EducationItem[], skills: SkillGroup[] }} Portfolio
   */

  /** @type {Portfolio} */
  const PORTFOLIO = {
    site: {
      url: 'https://your-domain.example/',
      resume: 'assets/Aditya_Patil_Resume.pdf',
      revised: '2026-10',
      timeZone: 'Asia/Kolkata',
      timeZoneLabel: 'IST',
    },

    profile: {
      name: 'Aditya Angad Patil',
      role: 'Full Stack AI Developer',
      location: 'Pune, Maharashtra',
      // width/height = pixel size of the photo file; they keep the whole photo visible at any screen size.
      photo: { src: 'assets/profile.jpg', alt: 'Portrait of Aditya Angad Patil', width: 800, height: 1421 },
      email: 'patiladdy2000@gmail.com',
      phone: '+91 8275424593', // set to null to hide the phone number everywhere
      github: 'https://github.com/patiladdy',
      linkedin: 'https://www.linkedin.com/in/aditya-patil-3191681aa',
      // *asterisks* mark words set in italic accent type
      headline: 'Full-stack engineer building *scalable backends*, React interfaces and *production-ready AI* for enterprise products.',
      lede: 'I am Aditya Angad Patil, a Full Stack AI Developer with 4+ years across Python, FastAPI and React.js. Today I am building an enterprise content studio at John Deere India; before that I shipped forecasting, RAG and event-driven platforms at Infosys.',
      facts: [
        { label: 'Experience', value: '4+ years' },
        { label: 'Current', value: 'Software Engineer 2 — Prutech Solutions, at John Deere India' },
        { label: 'Core stack', value: 'Python · FastAPI · React.js · Redux' },
        { label: 'AI', value: 'GenAI · LLM APIs · RAG pipelines' },
        { label: 'Cloud & observability', value: 'AWS · Datadog' },
        { label: 'Education', value: 'B.Tech CSE · CGPA 9.63' },
      ],
    },

    sections: [
      { id: 'overview', num: '01', title: 'Overview', blurb: 'Who I am' },
      {
        id: 'work', num: '02', title: 'Work', blurb: 'Five systems',
        eyebrow: 'Selected work',
        heading: 'Systems I have *shipped*, and what I built in each.',
        lede: 'Enterprise authoring, telecom forecasting, event-driven alerting, a Metaverse backend and a personal project. Each entry lists the context, what I built and the stack.',
      },
      {
        id: 'experience', num: '03', title: 'Experience', blurb: 'Four roles',
        eyebrow: 'Revision history',
        heading: 'Four roles, in *chronological* order.',
        lede: 'From a two-year internship to enterprise product engineering at John Deere India — with responsibilities listed exactly as I would put them on a résumé.',
      },
      {
        id: 'skills', num: '04', title: 'Skills', blurb: 'Seven groups',
        eyebrow: 'Bill of materials',
        heading: 'The toolkit, *grouped the way I use it*.',
        lede: 'Dots mark skills that appear in the work above. Hover, tap or focus one to see where.',
      },
      {
        id: 'education', num: '05', title: 'Education', blurb: 'B.Tech · 12th · 10th',
        eyebrow: 'Education',
        heading: 'Where it *started*.',
      },
      {
        id: 'contact', num: '06', title: 'Contact', blurb: 'Email · LinkedIn',
        eyebrow: 'Get in touch',
        heading: 'Have something *worth building*? Let us talk.',
        lede: 'Email is the fastest way to reach me. I am also on LinkedIn and GitHub, and the résumé is one click away.',
      },
    ],

    diagram: {
      caption: 'Anatomy of a request — a composite assembled from systems I have built.',
      hint: 'Hover, tap or use the arrow keys to explore each component.',
      idle: {
        kicker: 'Fig. 01',
        title: 'Anatomy of a request',
        text: 'Every component here maps to something real on my résumé: a React client, a FastAPI BFF over domain services, PostgreSQL and S3, Kafka event streams, ETL and RAG pipelines feeding LLM APIs. Select one to see the work behind it.',
        where: 'John Deere India · Infosys',
      },
      columns: ['Interface', 'API edge', 'Services & pipelines', 'Data & models'],
      autoplayMs: 3600,
      nodes: [
        {
          id: 'client', col: 0, icon: 'monitor', title: 'React client', sub: 'React.js · Redux',
          detail: 'Frontend state management in Redux, integrating the backend APIs and managing application state so user workflows stay efficient and responsive — built to John Deere UI/UX and theming standards.',
          where: 'Aftermarket Content Studio · John Deere India', href: '#work-content-studio',
        },
        {
          id: 'bff', col: 1, icon: 'layers', title: 'BFF layer', sub: 'FastAPI',
          detail: 'A Backend-for-Frontend layer in FastAPI that fronts the domain services — one half of the layered architecture I designed and developed from scratch.',
          where: 'Aftermarket Content Studio · John Deere India', href: '#work-content-studio',
        },
        {
          id: 'domain', col: 2, icon: 'server', title: 'Domain services', sub: 'FastAPI · REST APIs',
          detail: 'The Domain Service layer exposing REST APIs for user creation and registration, comments, attachments and other application workflows, consumed by the React.js frontend.',
          where: 'Aftermarket Content Studio · John Deere India', href: '#work-content-studio',
        },
        {
          id: 'kafka', col: 2, order: -1, icon: 'radio', title: 'Event streaming', sub: 'Apache Kafka',
          detail: 'FastAPI microservices connected through Kafka-based event streaming, with automated email notification triggers and monitoring integrations to improve alerting, observability and incident response.',
          where: 'Event-driven alerting microservices · Infosys', href: '#work-event-driven-alerting',
        },
        {
          id: 'pipelines', col: 2, icon: 'workflow', title: 'Data & retrieval pipelines', sub: 'ETL · RAG',
          detail: 'ETL pipelines that process network incident and telemetry data for ML-based forecasting, plus a Retrieval-Augmented Generation pipeline that gives LLMs contextual access to telecom operational data.',
          where: 'Telecom forecasting platform · Infosys', href: '#work-telecom-forecasting',
        },
        {
          id: 'postgres', col: 3, icon: 'database', title: 'Primary database', sub: 'PostgreSQL',
          detail: 'PostgreSQL as the primary database behind the BFF and domain services of the Content Studio.',
          where: 'Aftermarket Content Studio · John Deere India', href: '#work-content-studio',
        },
        {
          id: 's3', col: 3, order: -1, icon: 'hard-drive', title: 'Object storage', sub: 'Amazon S3',
          detail: 'Amazon S3 integration for secure attachment storage and retrieval, supporting the document and content management workflows of the application.',
          where: 'Aftermarket Content Studio · John Deere India', href: '#work-content-studio',
        },
        {
          id: 'llm', col: 3, icon: 'sparkles', title: 'LLM APIs', sub: 'Generative AI',
          detail: 'LLM API integrations used through the RAG pipeline to enable intelligent querying and contextual insights from operational data.',
          where: 'Telecom forecasting platform · Infosys', href: '#work-telecom-forecasting',
        },
        {
          id: 'platform', col: -1, platform: true, icon: 'cloud', title: 'Cloud & observability — AWS · Datadog', sub: '',
          detail: 'Hands-on experience with AWS and Datadog for cloud deployment, application monitoring, observability and performance analysis — the platform layer underneath everything above.',
          where: 'Across roles',
        },
      ],
      edges: [
        ['client', 'bff'],
        ['bff', 'domain'],
        ['domain', 'postgres'],
        ['domain', 's3'],
        ['domain', 'kafka'],
        ['domain', 'pipelines'],
        ['pipelines', 'llm'],
      ],
    },

    work: [
      {
        id: 'content-studio',
        title: 'Aftermarket Content Studio',
        org: 'John Deere India · via Prutech Solutions',
        role: 'Software Engineer 2',
        period: 'Mar 2026 – Present',
        summary: 'An enterprise application built from scratch for Lead TIS and Authoring users, enabling the creation and management of tractor repair, sales and service manuals for authoring in Windchill.',
        points: [
          'Designed and developed the backend in FastAPI with a layered architecture — a Backend-for-Frontend (BFF) layer over Domain Services — on PostgreSQL.',
          'Built and integrated REST APIs for user creation, user registration, comments, attachments and other application workflows, and consumed them in the React.js frontend.',
          'Implemented Redux state management, integrating the backend APIs to keep user workflows efficient and responsive.',
          'Integrated Amazon S3 for secure attachment storage and retrieval, supporting document and content management workflows.',
          'Collaborated through GitHub following enterprise development practices and John Deere UI/UX and theming standards.',
        ],
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'React.js', 'Redux', 'Amazon S3', 'REST APIs', 'BFF', 'Domain Services', 'GitHub'],
        experienceId: 'prutech-john-deere',
      },
      {
        id: 'telecom-forecasting',
        title: 'Telecom Forecasting Platform',
        org: 'Infosys · a leading US telecom client',
        role: 'Digital Specialist Engineer',
        period: 'Aug 2022 – Feb 2026 · Infosys tenure',
        summary: 'Scalable backend systems for a forecasting platform that turns network incident and telemetry data into ML-based forecasting and analytics.',
        points: [
          'Built ETL pipelines to process network incident and telemetry data feeding ML-based forecasting and analytics.',
          'Integrated LLM APIs through a Retrieval-Augmented Generation (RAG) pipeline, enabling intelligent querying and contextual insights from telecom operational data.',
        ],
        stack: ['Python', 'ETL Pipelines', 'LLM APIs', 'RAG', 'Generative AI'],
        experienceId: 'infosys',
      },
      {
        id: 'event-driven-alerting',
        title: 'Event-Driven Alerting Microservices',
        org: 'Infosys',
        role: 'Digital Specialist Engineer',
        period: 'Aug 2022 – Feb 2026 · Infosys tenure',
        summary: 'FastAPI microservices connected by Kafka-based event streaming, with automated email notification triggers and monitoring integrations to improve alerting, observability and incident response.',
        points: [
          'Built FastAPI microservices with Kafka-based event streaming.',
          'Added automated email notification triggers and monitoring integrations to sharpen alerting, observability and incident response.',
        ],
        stack: ['Python', 'FastAPI', 'Apache Kafka', 'Microservices', 'Event-Driven Architecture'],
        experienceId: 'infosys',
      },
      {
        id: 'metaverse-platform',
        title: 'Metaverse Platform Backend',
        org: 'Infosys',
        role: 'Digital Specialist Engineer',
        period: 'Aug 2022 – Feb 2026 · Infosys tenure',
        summary: 'Backend services for a Metaverse platform, with secure authentication and SSO integration through Keycloak for seamless user access across applications.',
        points: [
          'Designed and deployed backend services using Django, MongoDB and AWS.',
          'Implemented secure authentication and SSO integration with Keycloak for seamless access across applications.',
        ],
        stack: ['Python', 'Django', 'MongoDB', 'AWS', 'Keycloak'],
        experienceId: 'infosys',
      },
      {
        id: 'clinic-management',
        title: 'Clinic Management (COVID-19)',
        org: 'Personal project',
        role: 'Independent build',
        summary: 'A patient room allocation and monitoring system that pulls live COVID-19 data through REST APIs, enabling real-time filtering and visualization. Deployed on AWS.',
        points: [
          'Patient room allocation and monitoring workflows.',
          'Live COVID-19 data via REST APIs, with real-time filtering and visualization.',
          'Deployed on AWS.',
        ],
        stack: ['REST APIs', 'AWS'],
        link: { label: 'View on GitHub', href: 'https://github.com/patiladdy' },
      },
    ],

    experience: [
      {
        id: 'prutech-john-deere',
        role: 'Software Engineer 2',
        org: 'John Deere India Pvt. Ltd.',
        via: 'Prutech Solutions',
        start: '2026-03',
        end: null,
        summary: 'Building the Aftermarket Content Studio from scratch — an enterprise authoring platform for tractor repair, sales and service manuals, across a FastAPI backend and a React.js frontend.',
        points: [
          'Developing an enterprise Aftermarket Content Studio application from scratch for Lead TIS and Authoring users, enabling creation and management of tractor repair, sales and service manuals for authoring in Windchill.',
          'Designed and developed backend services using FastAPI with a layered architecture comprising BFF (Backend for Frontend) and Domain Service layers, using PostgreSQL as the primary database.',
          'Developed and integrated multiple REST APIs for user creation, user registration, comments, attachments and other application workflows, and consumed these services in the React.js frontend.',
          'Implemented frontend state management using Redux, integrating backend APIs and managing application state to support efficient and responsive user workflows.',
          'Implemented Amazon S3 integration for secure attachment storage and retrieval, supporting document and content management workflows within the application.',
          'Used GitHub for source code management and collaborative development, following enterprise development practices and John Deere UI/UX and theming standards across the application.',
        ],
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'React.js', 'Redux', 'Amazon S3', 'GitHub'],
      },
      {
        id: 'infosys',
        role: 'Digital Specialist Engineer',
        org: 'Infosys',
        start: '2022-08',
        end: '2026-02',
        summary: 'Backend engineering across a Metaverse platform and a forecasting platform for a leading US telecom client — ETL pipelines, a RAG pipeline over LLM APIs, Kafka-based microservices and monitoring integrations.',
        points: [
          'Designed and deployed backend services for a Metaverse platform using Django, MongoDB and AWS, implementing secure authentication and SSO integration with Keycloak for seamless user access across applications.',
          'Developed scalable backend systems for a forecasting platform for a leading US telecom client, building ETL pipelines to process network incident and telemetry data used for ML-based forecasting and analytics.',
          'Integrated LLM APIs using a RAG (Retrieval-Augmented Generation) pipeline to enable intelligent querying and contextual insights from telecom operational data.',
          'Built FastAPI microservices with Kafka-based event streaming, along with automated email notification triggers and monitoring integrations to improve alerting, observability and incident response.',
        ],
        stack: ['Python', 'Django', 'FastAPI', 'MongoDB', 'AWS', 'Keycloak', 'Apache Kafka', 'ETL Pipelines', 'LLM APIs', 'RAG'],
      },
      {
        id: 'faceprep',
        role: 'Content Development Intern',
        org: 'FacePrep Solution',
        start: '2021-05',
        end: '2021-08',
      },
      {
        id: 'edyst',
        role: 'Software Development Intern',
        org: 'Edyst',
        start: '2020-07',
        end: '2022-07',
        summary: 'Developed Python/Java challenges and Flask backends, using Bitbucket, CMS and CDN.',
        stack: ['Python', 'Java', 'Flask', 'Bitbucket', 'CMS', 'CDN'],
      },
    ],

    // Newest first. A `chart` label also draws the entry in Fig. 02.
    education: [
      {
        id: 'btech',
        title: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science and Engineering',
        institution: 'Walchand Institute of Technology, India',
        start: '2018',
        end: '2022',
        score: { label: 'CGPA', value: '9.63' },
        chart: 'B.Tech, Computer Science and Engineering',
      },
      {
        id: 'grade-12',
        title: '12th Grade',
        institution: 'Walchand College of Arts and Science, Solapur',
        start: '2016',
        end: '2018',
        score: { label: 'Percentage', value: '82.6%' },
      },
      {
        id: 'grade-10',
        title: '10th Grade',
        institution: 'S.R Chandak English Medium School, Solapur',
        end: '2016',
        note: 'Passed out',
        score: { label: 'Percentage', value: '92.68%' },
      },
    ],

    skills: [
      { label: 'Programming languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'] },
      { label: 'Frameworks & libraries', items: ['FastAPI', 'Django', 'React.js', 'Redux', 'LangChain'] },
      { label: 'AI & GenAI', items: ['Generative AI', 'LLM APIs', 'RAG (Retrieval-Augmented Generation)', 'AI Integration'] },
      { label: 'Backend & architecture', items: ['REST APIs', 'Microservices', 'BFF (Backend for Frontend)', 'Domain Services', 'ETL Pipelines', 'Event-Driven Architecture'] },
      { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'BigQuery', 'PL/SQL', 'NoSQL'] },
      { label: 'Cloud & DevOps', items: ['AWS', 'Amazon S3', 'GCP', 'Docker', 'CI/CD', 'GitHub', 'Git', 'Bitbucket', 'Linux'] },
      { label: 'Messaging, monitoring & tools', items: ['Apache Kafka', 'Datadog', 'Keycloak', 'Postman', 'Jira', 'CMS', 'CDN'] },
    ],
  };


  /* ======================================================================
     2. HELPERS
     ====================================================================== */

  /** @typedef {{ __html: string }} Raw */

  const REDUCED_MOTION = matchMedia('(prefers-reduced-motion: reduce)');
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /** @param {unknown} value */
  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => {
      switch (ch) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        default: return '&#39;';
      }
    });
  }

  /** @param {string} markup @returns {Raw} */
  const raw = (markup) => ({ __html: markup });

  /** @param {unknown} value @returns {string} */
  function toHtml(value) {
    if (value == null || value === false || value === '') return '';
    if (Array.isArray(value)) return value.map(toHtml).join('');
    if (typeof value === 'object' && '__html' in value) return /** @type {Raw} */ (value).__html;
    return esc(value);
  }

  /** Tagged template: interpolations are escaped unless they are Raw. @param {TemplateStringsArray} strings @param {...unknown} values @returns {Raw} */
  function html(strings, ...values) {
    let out = '';
    strings.forEach((s, i) => { out += s + (i < values.length ? toHtml(values[i]) : ''); });
    return raw(out);
  }

  /** Escapes text and turns *asterisk* spans into <em>. @param {string} text */
  const em = (text) => raw(esc(text).replace(/\*([^*]+)\*/g, '<em>$1</em>'));

  /** @param {IconName} name @param {string} [className] */
  const icon = (name, className = 'icon') =>
    raw(`<svg class="${className}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`);

  /** @param {string} ym 'YYYY' or 'YYYY-MM' */
  function parseYM(ym) {
    const [y, m] = ym.split('-');
    return { year: Number(y), month: m ? Number(m) : null };
  }

  /** 'YYYY-MM' → 'Mar 2026', 'YYYY' → '2026'. @param {string} ym */
  function fmtYM(ym) {
    const { year, month } = parseYM(ym);
    return month ? `${MONTHS[month - 1]} ${year}` : String(year);
  }

  /** Month offset from January of `originYear`. Year-only values snap to Jan (start) or Jun (end). @param {string} ym @param {number} originYear @param {'start'|'end'} edge */
  function monthIndex(ym, originYear, edge) {
    const { year, month } = parseYM(ym);
    const m = month ?? (edge === 'start' ? 1 : 6);
    return (year - originYear) * 12 + (m - 1);
  }

  /** Inclusive duration label, e.g. '3 yrs 7 mos'. @param {string} start @param {string|null} end @param {Date} now */
  function durationLabel(start, end, now) {
    const a = parseYM(start);
    const b = end ? parseYM(end) : { year: now.getFullYear(), month: now.getMonth() + 1 };
    const months = (b.year - a.year) * 12 + ((b.month ?? 6) - (a.month ?? 1)) + 1;
    const y = Math.floor(months / 12);
    const m = months % 12;
    const parts = [];
    if (y) parts.push(`${y} ${y === 1 ? 'yr' : 'yrs'}`);
    if (m) parts.push(`${m} ${m === 1 ? 'mo' : 'mos'}`);
    return parts.join(' ') || '< 1 mo';
  }

  /** Normalises a skill name for matching: lowercase, no parentheticals. @param {string} s */
  const skillKey = (s) => s.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();

  /** @param {EventTarget|null} target @param {string} selector */
  function closest(target, selector) {
    return target instanceof Element ? target.closest(selector) : null;
  }

  /** @param {string} key */
  function storageGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  /** @param {string} key @param {string} value */
  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch { /* private mode — ignore */ }
  }

  /** @template {keyof SVGElementTagNameMap} K @param {K} tag @param {Record<string, string|number>} attrs */
  function svgEl(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    return el;
  }


  /* ======================================================================
     3. RENDERERS
     ====================================================================== */

  /** Where each skill is used — derived from work and experience stacks. @type {Map<string, Link[]>} */
  const SKILL_USES = (() => {
    /** @type {Map<string, Link[]>} */
    const map = new Map();
    /** @param {string[]} stack @param {Link} link */
    const add = (stack, link) => {
      for (const s of stack) {
        const key = skillKey(s);
        const list = map.get(key) ?? [];
        if (!list.some((l) => l.href === link.href)) list.push(link);
        map.set(key, list);
      }
    };
    for (const w of PORTFOLIO.work) add(w.stack, { label: w.title, href: `#work-${w.id}` });
    for (const e of PORTFOLIO.experience) add(e.stack ?? [], { label: e.org, href: `#exp-${e.id}` });
    return map;
  })();

  /** @param {SectionMeta} sec */
  function sectionHead(sec) {
    return html`
      <header class="section__head">
        <p class="eyebrow reveal">
          <span class="eyebrow__num">§ ${sec.num}</span>
          <span class="eyebrow__rule"></span>
          <span>${sec.eyebrow ?? sec.title}</span>
        </p>
        <h2 class="section__title reveal" id="${sec.id}-title" style="--i:1">${em(sec.heading ?? sec.title)}</h2>
        ${sec.lede ? html`<p class="section__lede reveal" style="--i:2">${sec.lede}</p>` : ''}
      </header>`;
  }

  /** @param {DiagramNode} n */
  function renderNode(n) {
    return html`
      <button type="button" class="node${n.platform ? ' node--platform' : ''}" data-node="${n.id}"
        ${n.order ? raw(`data-order="${n.order}"`) : ''} aria-pressed="false" aria-describedby="diagram-detail-body">
        ${icon(n.icon)}
        <span class="node__title">${n.title}</span>
        <span class="node__sub">${n.sub}</span>
      </button>`;
  }

  /** @param {Diagram} d */
  function renderDiagram(d) {
    const platform = d.nodes.find((n) => n.platform);
    return html`
      <figure class="figure diagram reveal" id="fig-01" data-state="idle" style="--i:4; --autoplay:${d.autoplayMs}ms">
        <figcaption class="figure__cap">
          <span class="figure__num">Fig. 01</span>
          <span>${d.caption}</span>
          <span class="figure__hint">${d.hint}</span>
        </figcaption>
        <div class="diagram__stage">
          <div class="diagram__board">
            <svg class="diagram__wires" aria-hidden="true" focusable="false"></svg>
            <div class="diagram__cols" role="group" aria-label="System components">
              ${d.columns.map((label, ci) => html`
                <div class="diagram__col">
                  <span class="diagram__col-label" aria-hidden="true">${label}</span>
                  ${d.nodes.filter((n) => n.col === ci).map(renderNode)}
                </div>`)}
            </div>
            ${platform ? renderNode(platform) : ''}
          </div>
          <aside class="diagram__detail" aria-live="off" aria-atomic="true">
            <div class="diagram__detail-body" id="diagram-detail-body">
              <p class="diagram__detail-kicker" data-detail="kicker">${d.idle.kicker}</p>
              <h3 class="diagram__detail-title" data-detail="title">${d.idle.title}</h3>
              <p class="diagram__detail-text" data-detail="text">${d.idle.text}</p>
              <p class="diagram__detail-where">${icon('corner-down-right')}<span data-detail="where">${d.idle.where}</span></p>
            </div>
            <div class="diagram__detail-progress" aria-hidden="true"><span></span></div>
          </aside>
        </div>
      </figure>`;
  }

  /** @param {Portfolio} data */
  function renderHero(data) {
    const { profile: p, site } = data;
    const sec = data.sections[0];
    const words = p.name.split(/\s+/);
    const initials = `${words[0]?.[0] ?? ''}${words.at(-1)?.[0] ?? ''}`;
    return html`
      <section class="section section--hero container" id="${sec.id}" aria-labelledby="hero-title">
        <div class="hero" style="--pw:${p.photo.width}; --ph:${p.photo.height}">
          <figure class="portrait hero__portrait reveal">
            <div class="portrait__frame" data-initials="${initials}">
              <img class="portrait__img" src="${p.photo.src}" alt="${p.photo.alt}" width="${p.photo.width}" height="${p.photo.height}" decoding="async" fetchpriority="high">
            </div>
          </figure>
          <p class="eyebrow hero__meta reveal">
            <span class="hero__name">${p.name}</span><span class="sep" aria-hidden="true">·</span>
            <span>${p.role}</span><span class="sep" aria-hidden="true">·</span>
            <span class="hero__loc">${icon('map-pin')}${p.location}</span>
          </p>
          <h1 class="hero__title reveal" id="hero-title" style="--i:1">${em(p.headline)}</h1>
          <div class="hero__intro reveal" style="--i:2">
            <p class="hero__lede">${p.lede}</p>
            <div class="hero__actions">
              <a class="btn" href="mailto:${p.email}">${icon('mail')}<span>Get in touch</span></a>
              <a class="btn btn--ghost" href="${site.resume}" target="_blank" rel="noopener">${icon('file-text')}<span>Résumé (PDF)</span></a>
              <div class="hero__social">
                <a class="icon-btn" href="${p.github}" target="_blank" rel="noopener" aria-label="GitHub profile">${icon('github')}</a>
                <a class="icon-btn" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn profile">${icon('linkedin')}</a>
              </div>
            </div>
          </div>
          <dl class="spec hero__block reveal" style="--i:3" aria-label="At a glance">
            ${p.facts.map((f) => html`<div class="spec__cell"><dt>${f.label}</dt><dd>${f.value}</dd></div>`)}
          </dl>
        </div>
        ${renderDiagram(data.diagram)}
      </section>`;
  }

  /** @param {Portfolio} data */
  function renderWork(data) {
    const sec = data.sections[1];
    return html`
      <section class="section container" id="${sec.id}" aria-labelledby="${sec.id}-title">
        ${sectionHead(sec)}
        <ol class="work">
          ${data.work.map((w, i) => html`
            <li class="work__item reveal" id="work-${w.id}">
              <div class="work__side">
                <span class="work__index">${sec.num}.${i + 1}</span>
                <h3 class="work__title">${w.title}</h3>
                <dl class="work__meta">
                  <dt>For</dt><dd>${w.org}</dd>
                  <dt>Role</dt><dd>${w.role}</dd>
                  ${w.period ? html`<dt>When</dt><dd>${w.period}</dd>` : ''}
                </dl>
                ${w.link ? html`<a class="pill-link work__link" href="${w.link.href}" target="_blank" rel="noopener">${w.link.label}${icon('arrow-up-right')}</a>` : ''}
              </div>
              <div class="work__body">
                <p class="work__summary">${w.summary}</p>
                <h4 class="work__h">What I built</h4>
                <ul class="points">${w.points.map((pt) => html`<li>${pt}</li>`)}</ul>
                <ul class="tags" aria-label="Stack">${w.stack.map((s) => html`<li class="tag">${s}</li>`)}</ul>
              </div>
            </li>`)}
        </ol>
      </section>`;
  }

  /** @param {Portfolio} data @param {Date} now */
  function renderGantt(data, now) {
    const study = data.education.flatMap((e) => (e.chart && e.start ? [{ id: e.id, label: e.chart, institution: e.institution, start: e.start, end: e.end }] : []));
    const originYear = Math.min(...[...study, ...data.experience].map((e) => parseYM(e.start).year));
    const lastYear = now.getFullYear();
    const years = Array.from({ length: lastYear - originYear + 1 }, (_, i) => originYear + i);
    const months = years.length * 12;
    const nowIdx = (lastYear - originYear) * 12 + now.getMonth();

    /** @type {Array<{ id: string, href: string, org: string, role: string, range: string, from: number, to: number, kind: 'work'|'education', present: boolean }>} */
    const rows = [
      ...study.map((e) => ({
        id: e.id, href: '#education', org: e.institution, role: e.label, range: `${e.start} – ${e.end}`,
        from: monthIndex(e.start, originYear, 'start'), to: monthIndex(e.end, originYear, 'end'),
        kind: /** @type {'education'} */ ('education'), present: false,
      })),
      ...data.experience.map((e) => ({
        id: e.id, href: `#exp-${e.id}`, org: e.org, role: e.via ? `${e.role} · via ${e.via}` : e.role,
        range: `${fmtYM(e.start)} – ${e.end ? fmtYM(e.end) : 'Present'}`,
        from: monthIndex(e.start, originYear, 'start'), to: e.end ? monthIndex(e.end, originYear, 'end') : nowIdx,
        kind: /** @type {'work'} */ ('work'), present: !e.end,
      })),
    ].sort((a, b) => a.from - b.from);

    return html`
      <figure class="figure reveal" id="fig-02" style="margin-top:0">
        <figcaption class="figure__cap">
          <span class="figure__num">Fig. 02</span>
          <span>Revision history, ${originYear} – present.</span>
          <span class="figure__hint">Select a row to jump to its entry.</span>
        </figcaption>
        <div class="gantt" style="--years:${years.length}; --months:${months}">
          <div class="gantt__years" aria-hidden="true">
            <span class="gantt__corner"></span>
            <div class="gantt__scale">${years.map((y) => html`<span><b class="gantt__y4">${y}</b><b class="gantt__y2">’${String(y).slice(-2)}</b></span>`)}</div>
          </div>
          ${rows.map((r) => html`
            <a class="gantt__row" href="${r.href}" data-entry="${r.id}">
              <span class="gantt__label">
                <span class="gantt__org">${r.org}</span>
                <span class="gantt__role">${r.role}</span>
                <span class="gantt__range">${r.range}</span>
              </span>
              <span class="gantt__track" aria-hidden="true">
                <span class="gantt__bar gantt__bar--${r.kind}${r.present ? ' gantt__bar--present' : ''}" style="grid-column:${r.from + 1} / ${r.to + 2}"></span>
              </span>
            </a>`)}
          <div class="gantt__now" style="--x:${((nowIdx + 0.5) / months).toFixed(4)}" aria-hidden="true"><span>now</span></div>
        </div>
      </figure>`;
  }

  /** @param {Portfolio} data @param {Date} now */
  function renderExperience(data, now) {
    const sec = data.sections[2];
    const entries = [...data.experience].sort((a, b) => a.start.localeCompare(b.start));
    return html`
      <section class="section container" id="${sec.id}" aria-labelledby="${sec.id}-title">
        ${sectionHead(sec)}
        ${renderGantt(data, now)}
        <ol class="timeline">
          ${entries.map((e) => {
            const related = data.work.filter((w) => w.experienceId === e.id);
            const points = e.points ?? [];
            const stack = e.stack ?? [];
            const list = points.length ? html`<ul class="points">${points.map((pt) => html`<li>${pt}</li>`)}</ul>` : '';
            const tags = stack.length ? html`<ul class="tags" aria-label="Stack">${stack.map((s) => html`<li class="tag">${s}</li>`)}</ul>` : '';
            const hasBody = Boolean(e.summary) || related.length > 0 || points.length > 0 || stack.length > 0;
            return html`
              <li class="timeline__item reveal" id="exp-${e.id}" data-entry="${e.id}">
                <div class="timeline__side">
                  <p class="timeline__when">
                    <span>${fmtYM(e.start)} — ${e.end ? fmtYM(e.end) : raw('<span class="is-present">Present</span>')}</span>
                    <span aria-hidden="true">·</span>
                    <span>${durationLabel(e.start, e.end, now)}</span>
                  </p>
                  <h3 class="timeline__role">${e.role}</h3>
                  <p class="timeline__org">${e.org}${e.via ? html`<span class="timeline__via">via ${e.via}</span>` : ''}</p>
                </div>
                ${hasBody ? html`
                <div class="timeline__body">
                  ${e.summary ? html`<p class="timeline__summary">${e.summary}</p>` : ''}
                  ${related.length ? html`
                    <p class="timeline__related">
                      <span class="timeline__related-label">See</span>
                      ${related.map((w) => html`<a class="pill-link" href="#work-${w.id}">${w.title}${icon('arrow-right')}</a>`)}
                    </p>` : ''}
                  ${related.length && points.length ? html`
                    <details class="disclosure">
                      <summary>${icon('chevron-down')}<span>Responsibilities (${points.length})</span></summary>
                      ${list}${tags}
                    </details>` : html`${list}${tags}`}
                </div>` : ''}
              </li>`;
          })}
        </ol>
      </section>`;
  }

  /** @param {Portfolio} data */
  function renderSkills(data) {
    const sec = data.sections[3];
    return html`
      <section class="section container" id="${sec.id}" aria-labelledby="${sec.id}-title">
        ${sectionHead(sec)}
        <div class="skills">
          ${data.skills.map((g, gi) => {
            const linked = g.items.some((item) => SKILL_USES.has(skillKey(item)));
            return html`
              <section class="skills__group reveal" style="--i:${gi % 2}" aria-labelledby="skills-${gi}">
                <h3 class="skills__label" id="skills-${gi}">
                  <span>${g.label}</span>
                  <span class="skills__count">${String(g.items.length).padStart(2, '0')}</span>
                </h3>
                <ul class="chips">
                  ${g.items.map((item) => {
                    const uses = SKILL_USES.get(skillKey(item));
                    return html`<li><button type="button" class="chip" data-skill="${item}" ${uses ? raw(`data-uses="${uses.length}"`) : ''}>${item}</button></li>`;
                  })}
                </ul>
                <p class="skills__uses" data-uses-out aria-live="polite">${linked
                  ? html`<span class="skills__legend">Marked skills appear in the work above — select one to see where.</span>`
                  : 'Part of my working toolkit; not tied to a single entry above.'}</p>
              </section>`;
          })}
        </div>
      </section>`;
  }

  /** @param {Portfolio} data */
  function renderEducation(data) {
    const sec = data.sections[4];
    return html`
      <section class="section container" id="${sec.id}" aria-labelledby="${sec.id}-title">
        ${sectionHead(sec)}
        <ol class="edu">
          ${data.education.map((e, i) => html`
            <li class="edu__item reveal" id="edu-${e.id}" style="--i:${i}">
              <p class="edu__when">
                <span>${e.start ? `${e.start} – ${e.end}` : e.end}</span>
                ${e.note ? html`<span class="edu__note">${e.note}</span>` : ''}
              </p>
              <div class="edu__main">
                <h3 class="edu__title">${e.title}</h3>
                ${e.field ? html`<p class="edu__field">${e.field}</p>` : ''}
                <p class="edu__institution">${e.institution}</p>
              </div>
              <p class="edu__score">
                <span class="edu__score-k">${e.score.label}</span>
                <span class="edu__score-v">${e.score.value}</span>
              </p>
            </li>`)}
        </ol>
      </section>`;
  }

  /** @param {Portfolio} data */
  function renderContact(data) {
    const sec = data.sections[5];
    const p = data.profile;
    const rows = [
      { k: 'Email', v: p.email, href: `mailto:${p.email}`, icon: /** @type {IconName} */ ('mail'), ext: false },
      ...(p.phone ? [{ k: 'Phone', v: p.phone, href: `tel:${p.phone.replace(/\s+/g, '')}`, icon: /** @type {IconName} */ ('phone'), ext: false }] : []),
      { k: 'LinkedIn', v: p.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: p.linkedin, icon: /** @type {IconName} */ ('linkedin'), ext: true },
      { k: 'GitHub', v: p.github.replace(/^https?:\/\/(www\.)?/, ''), href: p.github, icon: /** @type {IconName} */ ('github'), ext: true },
      { k: 'Résumé', v: 'PDF', href: data.site.resume, icon: /** @type {IconName} */ ('file-text'), ext: true },
    ];
    return html`
      <section class="section container" id="${sec.id}" aria-labelledby="${sec.id}-title">
        ${sectionHead(sec)}
        <div class="contact">
          <div class="reveal">
            <p class="eyebrow"><span class="eyebrow__num">${icon('mail')}</span><span>Write to me</span></p>
            <a class="contact__email" href="mailto:${p.email}">${p.email}</a>
          </div>
          <ul class="contact__list reveal" style="--i:1">
            ${rows.map((r) => html`
              <li>
                <a class="contact__row" href="${r.href}" ${r.ext ? raw('target="_blank" rel="noopener"') : ''}>
                  <span class="contact__k">${r.k}</span>
                  <span class="contact__v">${icon(r.icon)}<span>${r.v}</span>${icon(r.ext ? 'arrow-up-right' : 'arrow-right')}</span>
                </a>
              </li>`)}
          </ul>
        </div>
      </section>`;
  }

  /** @param {Portfolio} data @param {Date} now */
  function renderFooter(data, now) {
    return html`
      <div class="footer__inner container">
        <span>© ${now.getFullYear()} ${data.profile.name}</span>
        <a class="footer__top" href="#top">Back to top ${icon('arrow-up-right')}</a>
      </div>`;
  }

  /** @param {Portfolio} data */
  function renderTopnav(data) {
    return html`
      <ul class="topnav__list">
        ${data.sections.map((s) => html`
          <li><a class="topnav__link" href="#${s.id}" data-nav="${s.id}"><span class="topnav__num">${s.num}</span><span>${s.title}</span></a></li>`)}
      </ul>`;
  }

  /** @param {Portfolio} data */
  function renderToc(data) {
    const p = data.profile;
    return html`
      <div class="toc__inner">
        <div class="toc__head">
          <p class="eyebrow" id="toc-title"><span class="eyebrow__num">§</span><span>Contents</span></p>
          <button class="icon-btn" type="button" data-toc-close aria-label="Close contents">${icon('x')}</button>
        </div>
        <ol class="toc__list">
          ${data.sections.map((s) => html`
            <li>
              <a class="toc__link" href="#${s.id}" data-toc-link="${s.id}">
                <span class="toc__num">${s.num}</span>
                <span class="toc__title">${s.title}</span>
                <span class="toc__leader" aria-hidden="true"></span>
                <span class="toc__blurb">${s.blurb}</span>
              </a>
            </li>`)}
        </ol>
        <div class="toc__foot">
          <div class="toc__links">
            <a class="pill-link" href="mailto:${p.email}">${icon('mail')}Email</a>
            <a class="pill-link" href="${p.linkedin}" target="_blank" rel="noopener">${icon('linkedin')}LinkedIn</a>
            <a class="pill-link" href="${p.github}" target="_blank" rel="noopener">${icon('github')}GitHub</a>
            <a class="pill-link" href="${data.site.resume}" target="_blank" rel="noopener">${icon('file-text')}Résumé</a>
          </div>
          <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark theme">
            ${icon('sun', 'icon theme-toggle__sun')}${icon('moon', 'icon theme-toggle__moon')}
          </button>
        </div>
      </div>`;
  }


  /* ======================================================================
     4. BEHAVIOUR
     ====================================================================== */

  function initTheme() {
    const root = document.documentElement;
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const metas = document.querySelectorAll('meta[name="theme-color"]');

    /** @param {'light'|'dark'} theme @param {boolean} persist */
    const apply = (theme, persist) => {
      root.setAttribute('data-theme', theme);
      document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
        b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      });
      if (persist) {
        storageSet('theme', theme);
        metas.forEach((m) => m.setAttribute('content', theme === 'dark' ? '#121311' : '#f6f3ec'));
      }
    };

    const stored = storageGet('theme');
    apply(stored === 'light' || stored === 'dark' ? stored : (mq.matches ? 'dark' : 'light'), false);
    mq.addEventListener('change', (e) => { if (!storageGet('theme')) apply(e.matches ? 'dark' : 'light', false); });
    document.addEventListener('click', (e) => {
      if (!closest(e.target, '[data-theme-toggle]')) return;
      apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }

  /** @param {Portfolio} data */
  function initNav(data) {
    const topbar = document.querySelector('.topbar');
    const sections = data.sections
      .map((s) => document.getElementById(s.id))
      .filter(/** @returns {el is HTMLElement} */ (el) => el instanceof HTMLElement);
    const links = new Map([...document.querySelectorAll('[data-nav]')].map((a) => [a.getAttribute('data-nav'), a]));
    const tocLinks = new Map([...document.querySelectorAll('[data-toc-link]')].map((a) => [a.getAttribute('data-toc-link'), a]));
    if (!sections.length) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      topbar?.classList.toggle('is-scrolled', y > 8);

      const topbarH = topbar instanceof HTMLElement ? topbar.offsetHeight : 64;
      const probe = y + topbarH + 24;
      const atBottom = Math.ceil(y + innerHeight) >= document.documentElement.scrollHeight - 2;

      let activeIdx = 0;
      sections.forEach((sec, i) => { if (sec.offsetTop <= probe) activeIdx = i; });
      if (atBottom) activeIdx = sections.length - 1;

      sections.forEach((sec, i) => {
        const link = links.get(sec.id);
        const tocLink = tocLinks.get(sec.id);
        const isActive = i === activeIdx;
        let p = 0;
        if (i < activeIdx || atBottom) p = 1;
        else if (isActive) p = Math.min(1, Math.max(0, (probe - sec.offsetTop) / Math.max(1, sec.offsetHeight)));

        if (link instanceof HTMLElement) {
          link.style.setProperty('--p', p.toFixed(3));
          link.classList.toggle('is-read', i < activeIdx);
          if (isActive) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
        }
        if (tocLink) {
          if (isActive) tocLink.setAttribute('aria-current', 'true'); else tocLink.removeAttribute('aria-current');
        }
      });
    };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    document.fonts?.ready.then(request);
    update();
  }

  function initToc() {
    const dialog = document.getElementById('toc');
    const opener = document.getElementById('toc-open');
    if (!(dialog instanceof HTMLDialogElement) || !opener) return;

    opener.addEventListener('click', () => dialog.showModal());
    dialog.addEventListener('click', (e) => {
      if (closest(e.target, '[data-toc-close]') || closest(e.target, 'a[href]')) dialog.close();
    });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (REDUCED_MOTION.matches || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => io.observe(el));
  }

  /** Fig. 01 — wires, pulses, detail panel, autoplay and keyboard support. @param {Diagram} d */
  function initDiagram(d) {
    const fig = document.getElementById('fig-01');
    const board = fig?.querySelector('.diagram__board');
    const svg = fig?.querySelector('svg.diagram__wires');
    const detail = fig?.querySelector('.diagram__detail');
    if (!fig || !(board instanceof HTMLElement) || !(svg instanceof SVGSVGElement) || !detail) return;

    const nodes = [...fig.querySelectorAll('.node')].filter(/** @returns {el is HTMLButtonElement} */ (el) => el instanceof HTMLButtonElement);
    const byId = new Map(nodes.map((n) => [n.dataset.node ?? '', n]));
    const order = d.nodes.map((n) => n.id);
    const parents = new Map(d.edges.map(([from, to]) => [to, from]));
    const desktop = matchMedia('(min-width: 900px)');

    /** @type {Map<string, { path: SVGPathElement, ports: SVGCircleElement[], len: number }>} */
    const wires = new Map();
    /** @type {SVGCircleElement|null} */
    let pulse = null;
    /** @type {string|null} */
    let activeId = null;
    /** @type {string|null} */
    let pinnedId = null;
    /** @type {'idle'|'auto'|'manual'} */
    let mode = 'idle';
    /** @type {number|undefined} */
    let autoTimer;
    let pulseFrame = 0;
    let inView = false;

    /** @param {string} id */
    const chainTo = (id) => {
      const out = [];
      let cur = id;
      while (parents.has(cur)) {
        const p = /** @type {string} */ (parents.get(cur));
        out.unshift(`${p}->${cur}`);
        cur = p;
      }
      return out;
    };

    /** Orthogonal "bus" route with rounded corners, used for same-column edges. @param {number} x0 @param {number} y0 @param {number} xb @param {number} x1 @param {number} y1 @param {number} [r] */
    const elbow = (x0, y0, xb, x1, y1, r = 8) => {
      const dir = y1 > y0 ? 1 : -1;
      return `M${x0},${y0} H${xb + r} Q${xb},${y0} ${xb},${y0 + r * dir} V${y1 - r * dir} Q${xb},${y1} ${xb + r},${y1} H${x1}`;
    };

    const layout = () => {
      wires.clear();
      if (!desktop.matches) { svg.replaceChildren(); pulse = null; return; }
      const b = board.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`);
      const frag = document.createDocumentFragment();

      for (const [from, to] of d.edges) {
        const a = byId.get(from), c = byId.get(to);
        if (!a || !c) continue;
        const ra = a.getBoundingClientRect(), rc = c.getBoundingClientRect();
        const key = `${from}->${to}`;
        const ya = ra.top + ra.height / 2 - b.top, yc = rc.top + rc.height / 2 - b.top;
        let dAttr, ports;
        if (Math.abs(ra.left - rc.left) < 4) {
          const x0 = ra.left - b.left, x1 = rc.left - b.left;
          dAttr = elbow(x0, ya, x0 - 18, x1, yc);
          ports = [[x1, yc]];
        } else {
          const x1 = ra.right - b.left, x2 = rc.left - b.left;
          const dx = Math.max(24, (x2 - x1) * 0.5);
          dAttr = `M${x1},${ya} C${x1 + dx},${ya} ${x2 - dx},${yc} ${x2},${yc}`;
          ports = [[x1, ya], [x2, yc]];
        }
        const path = svgEl('path', { d: dAttr, class: 'wire', 'data-edge': key });
        const portEls = ports.map(([cx, cy]) => svgEl('circle', { cx, cy, r: 3, class: 'wire--port', 'data-edge': key }));
        frag.append(path, ...portEls);
        wires.set(key, { path, ports: portEls, len: 0 });
      }
      pulse = svgEl('circle', { class: 'pulse', r: 4 });
      frag.append(pulse);
      svg.replaceChildren(frag);
      for (const w of wires.values()) w.len = w.path.getTotalLength();
      if (activeId) highlight(activeId);
    };

    /** @param {string|null} id */
    const highlight = (id) => {
      const active = new Set(id ? chainTo(id) : []);
      for (const [key, w] of wires) {
        const on = active.has(key);
        w.path.classList.toggle('is-active', on);
        w.ports.forEach((p) => p.classList.toggle('is-active', on));
      }
      nodes.forEach((n) => n.classList.toggle('is-active', n.dataset.node === id));
    };

    /** @param {string[]} chain @param {() => void} onArrive */
    const runPulse = (chain, onArrive) => {
      cancelAnimationFrame(pulseFrame);
      /** @type {Array<{ path: SVGPathElement, len: number }>} */
      const segs = [];
      for (const k of chain) { const w = wires.get(k); if (w) segs.push(w); }
      if (!pulse || !segs.length || REDUCED_MOTION.matches) { onArrive(); return; }
      const total = segs.reduce((s, w) => s + w.len, 0);
      const duration = Math.min(1500, Math.max(380, (total / 520) * 1000));
      const dot = pulse;
      const t0 = performance.now();
      dot.style.opacity = '1';
      const step = (/** @type {number} */ t) => {
        const u = (t - t0) / duration;
        if (u >= 1) { dot.style.opacity = '0'; onArrive(); return; }
        let dist = u * total;
        for (const w of segs) {
          if (dist <= w.len) {
            const pt = w.path.getPointAtLength(dist);
            dot.setAttribute('cx', pt.x.toFixed(1));
            dot.setAttribute('cy', pt.y.toFixed(1));
            break;
          }
          dist -= w.len;
        }
        pulseFrame = requestAnimationFrame(step);
      };
      pulseFrame = requestAnimationFrame(step);
    };

    /** @param {{ kicker: string, title: string, text: string, where: string, href?: string }} content */
    const setDetail = (content) => {
      const body = detail.querySelector('.diagram__detail-body');
      const kicker = detail.querySelector('[data-detail="kicker"]');
      const title = detail.querySelector('[data-detail="title"]');
      const text = detail.querySelector('[data-detail="text"]');
      const where = detail.querySelector('[data-detail="where"]');
      if (kicker) kicker.textContent = content.kicker;
      if (title) title.textContent = content.title;
      if (text) text.textContent = content.text;
      if (where) {
        where.replaceChildren();
        if (content.href) {
          const a = document.createElement('a');
          a.className = 'link';
          a.href = content.href;
          a.textContent = content.where;
          where.append(a);
        } else {
          where.textContent = content.where;
        }
      }
      if (body instanceof HTMLElement) {
        body.classList.remove('is-switching');
        void body.offsetWidth;
        body.classList.add('is-switching');
      }
    };

    /** @param {string} id */
    const show = (id) => {
      const n = d.nodes.find((x) => x.id === id);
      if (!n) return;
      activeId = id;
      setDetail({
        kicker: n.platform ? 'Platform' : (d.columns[n.col] ?? 'Component'),
        title: n.title, text: n.detail, where: n.where, href: n.href,
      });
      highlight(id);
      const el = byId.get(id);
      runPulse(chainTo(id), () => {
        if (!el) return;
        el.classList.remove('is-lit');
        void el.offsetWidth;
        el.classList.add('is-lit');
      });
    };

    const stopAuto = () => { clearInterval(autoTimer); autoTimer = undefined; };

    const startAuto = () => {
      if (mode === 'manual' || REDUCED_MOTION.matches || autoTimer !== undefined || !inView || document.hidden) return;
      mode = 'auto';
      fig.dataset.state = 'auto';
      let i = activeId ? order.indexOf(activeId) : -1;
      const tick = () => { i = (i + 1) % order.length; show(order[i]); };
      tick();
      autoTimer = window.setInterval(tick, d.autoplayMs);
    };

    const goManual = () => {
      if (mode === 'manual') return;
      mode = 'manual';
      stopAuto();
      fig.dataset.state = 'manual';
      detail.setAttribute('aria-live', 'polite');
    };

    // Pointer, focus and keyboard
    nodes.forEach((n) => {
      const id = n.dataset.node ?? '';
      n.addEventListener('pointerenter', () => { goManual(); if (id !== activeId) show(id); });
      n.addEventListener('focus', () => { goManual(); if (id !== activeId) show(id); });
      n.addEventListener('click', () => {
        goManual();
        pinnedId = pinnedId === id ? null : id;
        nodes.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.node === pinnedId)));
        show(id);
      });
      n.addEventListener('keydown', (e) => {
        const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        const i = nodes.indexOf(n);
        let next = i;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % nodes.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + nodes.length) % nodes.length;
        else if (e.key === 'Home') next = 0;
        else next = nodes.length - 1;
        nodes[next]?.focus();
      });
    });
    board.addEventListener('pointerleave', () => {
      if (pinnedId && pinnedId !== activeId) show(pinnedId);
    });

    // Autoplay while idle and on screen
    const io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      if (inView) startAuto(); else stopAuto();
      if (!inView && mode === 'auto') { fig.dataset.state = 'paused'; }
      if (inView && mode === 'auto') { fig.dataset.state = 'auto'; }
    }, { threshold: 0.35 });
    io.observe(fig);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAuto();
      else if (mode === 'auto') { autoTimer = undefined; startAuto(); }
    });

    // Geometry
    const ro = new ResizeObserver(() => requestAnimationFrame(layout));
    ro.observe(board);
    desktop.addEventListener('change', layout);
    document.fonts?.ready.then(layout);
    layout();
  }

  /** Fig. 02 — hover sync between chart rows and timeline entries. */
  function initGantt() {
    document.querySelectorAll('.gantt__row[data-entry]').forEach((row) => {
      const id = row.getAttribute('data-entry');
      const entry = id ? document.querySelector(`.timeline__item[data-entry="${id}"]`) : null;
      /** @param {boolean} on */
      const set = (on) => { row.classList.toggle('is-hot', on); entry?.classList.toggle('is-hot', on); };
      row.addEventListener('pointerenter', () => set(true));
      row.addEventListener('pointerleave', () => set(false));
      row.addEventListener('focus', () => set(true));
      row.addEventListener('blur', () => set(false));
      entry?.addEventListener('pointerenter', () => set(true));
      entry?.addEventListener('pointerleave', () => set(false));
    });
  }

  /** Skills — shows where a skill was used, derived from the work/experience stacks. */
  function initSkills() {
    document.querySelectorAll('.skills__group').forEach((group) => {
      const out = group.querySelector('[data-uses-out]');
      if (!out) return;
      const defaultHtml = out.innerHTML;
      /** @type {Element|null} */
      let active = null;

      /** @param {Element} chip */
      const describe = (chip) => {
        const name = chip.getAttribute('data-skill') ?? '';
        const uses = SKILL_USES.get(skillKey(name));
        out.innerHTML = uses?.length
          ? toHtml(html`<strong>${name}</strong> — used in ${uses.map((u, i) => html`${i ? ', ' : ''}<a class="link" href="${u.href}">${u.label}</a>`)}.`)
          : toHtml(html`<strong>${name}</strong> — part of my toolkit; not tied to a single entry above.`);
      };
      const reset = () => { if (active) describe(active); else out.innerHTML = defaultHtml; };

      group.addEventListener('pointerover', (e) => { const chip = closest(e.target, '.chip'); if (chip) describe(chip); });
      group.addEventListener('pointerleave', reset);
      group.addEventListener('focusin', (e) => { const chip = closest(e.target, '.chip'); if (chip) describe(chip); });
      group.addEventListener('focusout', (e) => {
        const next = /** @type {FocusEvent} */ (e).relatedTarget;
        if (!(next instanceof Node) || !group.contains(next)) reset();
      });
      group.addEventListener('click', (e) => {
        const chip = closest(e.target, '.chip');
        if (!chip) return;
        active = active === chip ? null : chip;
        group.querySelectorAll('.chip').forEach((c) => c.classList.toggle('is-active', c === active));
        active ? describe(active) : reset();
      });
    });
  }

  /** @param {SiteMeta} site */
  function initClock(site) {
    const time = document.getElementById('clock-time');
    if (!(time instanceof HTMLTimeElement)) return;
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: site.timeZone });
    } catch { return; }
    const tick = () => {
      const now = new Date();
      time.textContent = fmt.format(now);
      time.dateTime = now.toISOString();
    };
    tick();
    setInterval(tick, 30_000);
  }

  /** Hides a missing portrait so the initials placeholder shows instead of a broken image. */
  function initPortrait() {
    document.querySelectorAll('.portrait__img').forEach((img) => {
      if (!(img instanceof HTMLImageElement)) return;
      const hide = () => { img.hidden = true; };
      img.addEventListener('error', hide, { once: true });
      if (img.complete && img.naturalWidth === 0) hide();
    });
  }

  function initPrint() {
    addEventListener('beforeprint', () => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
  }


  /* ======================================================================
     5. BOOT
     ====================================================================== */

  function boot() {
    const now = new Date();
    const main = document.getElementById('main');
    const footer = document.getElementById('site-footer');
    const topnav = document.getElementById('topnav');
    const toc = document.getElementById('toc');
    if (!main) return;

    main.innerHTML = toHtml([
      renderHero(PORTFOLIO),
      renderWork(PORTFOLIO),
      renderExperience(PORTFOLIO, now),
      renderSkills(PORTFOLIO),
      renderEducation(PORTFOLIO),
      renderContact(PORTFOLIO),
    ]);
    if (footer) footer.innerHTML = toHtml(renderFooter(PORTFOLIO, now));
    if (topnav) topnav.innerHTML = toHtml(renderTopnav(PORTFOLIO));
    if (toc) toc.innerHTML = toHtml(renderToc(PORTFOLIO));

    initTheme();
    initNav(PORTFOLIO);
    initToc();
    initReveal();
    initDiagram(PORTFOLIO.diagram);
    initGantt();
    initSkills();
    initClock(PORTFOLIO.site);
    initPortrait();
    initPrint();

    // Deep links arrive before the content exists; honour them once rendered.
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }

  boot();
})();
