export const films = [
  {
    id: '001', num: 'SCENE 001 · TAKE 01 · ROLL A',
    title: 'Qahwet El Mayteen', arabic: 'قهوة الميتين', subtitle: 'The Coffee of the Dead',
    tags: ['Short Film', 'Graduation'], role: 'Scriptwriter',
    icon: 'fa-scroll',
    logline: 'A grieving father keeps a nightly table at a Cairo coffeehouse for a son who stopped coming — and cannot bring himself to stop waiting.',
    desc: 'An original screenplay rooted in Egyptian folklore — a dark, claustrophobic narrative balancing tragedy with black humour, developed for the BUE graduation film.',
    highlights: [
      'Authored the complete original screenplay — dramatic structure, character arcs, thematic throughlines.',
      'Crafted culturally resonant dialogue rooted in Egyptian folklore and lived experience.',
      'Developed the film\'s tonal language: dark subject matter balanced with human warmth and black humour.',
    ],
  },
  {
    id: '002', num: 'SCENE 002 · TAKE 03 · ROLL B',
    title: 'Documentary Film', arabic: '', subtitle: 'Untitled Documentary Production',
    tags: ['Documentary', 'On-Set'], role: 'Sound Recordist',
    icon: 'fa-microphone',
    logline: 'Add the documentary\'s one-sentence pitch here — what is this film really about?',
    desc: 'On-set audio capture across demanding locations — delivering broadcast-quality dialogue and ambient sound with real-time monitoring throughout production.',
    highlights: [
      'Operated boom and field recording equipment, capturing broadcast-quality sound.',
      'Real-time level monitoring adapting to changing on-location acoustics.',
      'Coordinated with director and camera team for full audio coverage.',
    ],
  },
  {
    id: '003', num: 'SCENE 003 · TAKE 01 · ROLL A',
    title: 'Placid Disruption', arabic: '', subtitle: 'Placid Essentials — Brand Campaign',
    tags: ['Brand Film', 'Commercial'], role: 'Creative Director',
    icon: 'fa-wand-magic-sparkles',
    logline: 'A scent brand reimagined as cinema — controlled stillness as the ultimate disruption.',
    desc: 'Conceptualized and directed the full creative vision for Placid Essentials\' flagship campaign — visual identity, storytelling concept, and tonal language from brief to final cut.',
    highlights: [
      'Defined "controlled disruption as aesthetic" — translating brand values into cinematic language.',
      'Directed all visual assets ensuring tonal and visual consistency.',
      'Applied filmmaking storytelling techniques to elevate brand identity.',
    ],
  },
]

export const gallery = [
  { icon: 'fa-scroll',              title: 'قهوة الميتين',        tag: 'Short Film · Scriptwriting' },
  { icon: 'fa-film',                title: 'On the Page',          tag: 'Qahwet El Mayteen · Development' },
  { icon: 'fa-microphone',          title: 'Documentary · Field',  tag: 'Sound Recording · On-Location' },
  { icon: 'fa-headphones',          title: 'Boom in the Room',     tag: 'Documentary · Audio Capture' },
  { icon: 'fa-wand-magic-sparkles', title: 'Placid Disruption',    tag: 'Placid Essentials · Campaign' },
  { icon: 'fa-eye',                 title: 'Creative Direction',   tag: 'Placid Essentials · Visual Identity' },
]

// Add your actual cinematic influences below
export const influences = [
  { title: 'Add Film Title', year: '—', director: 'Director Name', quote: 'What this film means to your work as a filmmaker.', bg: 'linear-gradient(135deg,#0a0400 0%,#1a0800 100%)' },
  { title: 'Add Film Title', year: '—', director: 'Director Name', quote: 'What this film means to your work as a filmmaker.', bg: 'linear-gradient(135deg,#000a04 0%,#001a08 100%)' },
  { title: 'Add Film Title', year: '—', director: 'Director Name', quote: 'What this film means to your work as a filmmaker.', bg: 'linear-gradient(135deg,#050500 0%,#0f0e00 100%)' },
  { title: 'Add Film Title', year: '—', director: 'Director Name', quote: 'What this film means to your work as a filmmaker.', bg: 'linear-gradient(135deg,#04040a 0%,#08081a 100%)' },
  { title: 'Add Film Title', year: '—', director: 'Director Name', quote: 'What this film means to your work as a filmmaker.', bg: 'linear-gradient(135deg,#020408 0%,#040810 100%)' },
  { title: 'Add Film Title', year: '—', director: 'Director Name', quote: 'What this film means to your work as a filmmaker.', bg: 'linear-gradient(135deg,#080200 0%,#180400 100%)' },
]

// Add real testimonials from your collaborators, directors, or clients
export const testimonials = [
  { text: 'Add a quote from a collaborator, director, or client you\'ve worked with.', name: 'Collaborator Name', role: 'Their Role' },
  { text: 'Add a quote from a collaborator, director, or client you\'ve worked with.', name: 'Collaborator Name', role: 'Their Role' },
  { text: 'Add a quote from a collaborator, director, or client you\'ve worked with.', name: 'Collaborator Name', role: 'Their Role' },
]

export const process = [
  {
    num: '01', title: 'The Script', title_ar: 'السيناريو', icon: 'pen',
    desc: 'Every frame begins as a word. Character, conflict, and world are built on the page — where story logic, emotional truth, and visual possibility are tested before a single camera rolls.',
    desc_ar: 'كل لقطة تبدأ بكلمة. الشخصية والصراع والعالم تُبنى على الورق — حيث تُختبر منطق القصة والحقيقة العاطفية والإمكانية البصرية قبل أن تدور الكاميرا.',
  },
  {
    num: '02', title: 'Production', title_ar: 'التصوير', icon: 'camera',
    desc: 'On set, every department decision is a storytelling decision. From sound placement to actor blocking, the director\'s job is to translate the written word into something the camera can feel.',
    desc_ar: 'في موقع التصوير، كل قرار من أي قسم هو قرار سردي. من وضع المايك إلى حركة الممثل، مهمة المخرج هي ترجمة الكلمة المكتوبة إلى شيء تشعر به الكاميرا.',
  },
  {
    num: '03', title: 'The Cut', title_ar: 'المونتاج', icon: 'film',
    desc: 'The final story is found in the edit. Pacing, rhythm, and silence are the tools. What survives the cut is what the film actually says.',
    desc_ar: 'القصة الأخيرة تُكتشف في المونتاج. الإيقاع والصمت والتوقيت هي الأدوات. ما يبقى بعد القطع هو ما يقوله الفيلم فعلاً.',
  },
]

export const skills = [
  { n:'01', name:'Script Writing',     sub:'Structure · Dialogue · Arc' },
  { n:'02', name:'Film Production',    sub:'Pre · Shoot · Post' },
  { n:'03', name:'Sound Recording',    sub:'Field · Boom · Location' },
  { n:'04', name:'Creative Direction', sub:'Vision · Identity · Campaign' },
  { n:'05', name:'Visual Storytelling',sub:'Frame · Light · Composition' },
  { n:'06', name:'Set Collaboration',  sub:'Crew · Communication · Flow' },
  { n:'07', name:'Story Development',  sub:'Concept · Theme · Narrative' },
  { n:'08', name:'Directing',          sub:'Cast · Frame · Emotion' },
]

export const training = [
  { school:'Arab Film School',            program:'Full Filmmaking Diploma',        status:'In Progress', active:true },
  { school:'We Can Film School',          program:'Full Filmmaking Diploma',        status:'Completed',   active:false },
  { school:'We Can Film School',          program:'Filmmaking Level 1',             status:'Completed',   active:false },
  { school:'British University in Egypt', program:'BSc Media & Mass Communication — Filmmaking Track', status:'Graduated', active:false },
]

// Dates inferred from CV — update with exact years if known
export const timeline = [
  { year:'—',   event:'Enrolled at BUE',    event_ar:'التحاق بـ BUE',          desc:'Began BSc in Media & Mass Communication, Filmmaking Track — British University in Egypt.',          desc_ar:'بداية دراسة بكالوريوس الإعلام وصناعة الأفلام في الجامعة البريطانية بمصر.' },
  { year:'—',   event:'Filmmaking Level 1', event_ar:'دبلوم المستوى الأول',    desc:'Completed Filmmaking Level 1 at We Can Film School.',                                              desc_ar:'إتمام دبلوم المستوى الأول في صناعة الأفلام — مدرسة We Can.' },
  { year:'—',   event:'Full Diploma',       event_ar:'دبلوم كامل',             desc:'Completed Full Filmmaking Diploma at We Can Film School.',                                          desc_ar:'إتمام الدبلوم الكامل في صناعة الأفلام — مدرسة We Can.' },
  { year:'—',   event:'Documentary Sound',  event_ar:'تسجيل صوت وثائقي',       desc:'Joined as Sound Recordist on documentary film production.',                                         desc_ar:'الانضمام كمسجل صوت في إنتاج فيلم وثائقي.' },
  { year:'—',   event:'Qahwet El Mayteen',  event_ar:'قهوة الميتين',            desc:'Authored original screenplay for graduation short film — dark Egyptian folklore narrative.',         desc_ar:'كتابة سيناريو فيلم التخرج القصير — قصة مستوحاة من الموروث الشعبي المصري.' },
  { year:'—',   event:'Placid Campaign',    event_ar:'حملة Placid',             desc:'Led full creative direction for Placid Essentials flagship brand campaign.',                        desc_ar:'الإشراف على الإخراج الإبداعي الكامل لحملة Placid Essentials.' },
  { year:'—',   event:'BUE Graduation',     event_ar:'التخرج من BUE',           desc:'Received BSc in Media & Mass Communication — Filmmaking Track.',                                   desc_ar:'التخرج بدرجة البكالوريوس في الإعلام وصناعة الأفلام.' },
  { year:'Now', event:'Arab Film School',   event_ar:'مدرسة الفيلم العربي',     desc:'Full Filmmaking Diploma — currently in progress.',                                                  desc_ar:'الدبلوم الكامل في صناعة الأفلام — جارٍ حالياً.' },
]

export const breakdown = {
  title: 'Qahwet El Mayteen',
  arabic: 'قهوة الميتين',
  subtitle: 'Scene Analysis — Act I, Scene 1',
  excerpt: [
    { type: 'slug',    text: 'INT. QAHWA — LATE NIGHT' },
    { type: 'action',  text: 'The room is almost empty. One table is lit. IBRAHIM, 60s, sits with the stillness of someone who has been here many times before. Two cups of coffee on the table. One untouched, perfectly placed.' },
    { type: 'action',  text: 'A YOUNG WAITER watches from across the room.' },
    { type: 'char',    text: 'WAITER' },
    { type: 'paren',   text: '(carefully)' },
    { type: 'dialogue',text: 'Uncle Ibrahim... the kitchen is closing.' },
    { type: 'action',  text: 'Ibrahim wraps both hands around his cup without looking up.' },
    { type: 'char',    text: 'IBRAHIM' },
    { type: 'dialogue',text: 'He\'s on his way.' },
    { type: 'action',  text: 'The waiter looks at the empty chair. Then at Ibrahim. He says nothing. He walks back.' },
  ],
  annotations: [
    {
      anchor: 'Two cups of coffee. One untouched, perfectly placed.',
      note: 'The film\'s central tension is embedded in staging, not dialogue. Before a word is spoken, the audience understands: someone is absent but expected. The "perfectly placed" detail signals ritual — this is not the first night.',
    },
    {
      anchor: 'He\'s on his way.',
      note: 'Three words carry the entire dramatic question: Is Ibrahim delusional? Loyal? In denial? The ambiguity is the engine. The film refuses to answer this until it must — and when it does, the answer recontextualises every scene before it.',
    },
    {
      anchor: 'He says nothing. He walks back.',
      note: 'The waiter\'s silence is a structural choice, not absence of dialogue. A lesser draft had him offer condolences. This version trusts that what the waiter doesn\'t say — and the audience fills in — is more powerful than any spoken comfort.',
    },
  ],
}

// Add real screenings, festival submissions, or press coverage below
export const press = [
  {
    venue: 'British University in Egypt',
    type: 'Graduation Screening',
    project: 'Qahwet El Mayteen — قهوة الميتين',
    year: '—',
    note: 'Official graduation short film screening, BUE Faculty of Arts & Sciences, Media & Mass Communication.',
    icon: 'fa-film',
  },
  {
    venue: 'Placid Essentials',
    type: 'Brand Release',
    project: 'Placid Disruption Campaign',
    year: '—',
    note: 'Full campaign launched across Placid Essentials brand platforms.',
    icon: 'fa-wand-magic-sparkles',
  },
  {
    venue: 'Add Festival / Press / Screening',
    type: 'Placeholder',
    project: '—',
    year: '—',
    note: 'Replace this with real festival selections, press features, or screening events.',
    icon: 'fa-newspaper',
    placeholder: true,
  },
]
