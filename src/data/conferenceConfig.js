export const CONFERENCE_START = '2027-03-16T00:00:00+05:30';

const overview = 'NCRTCES 2027 aims to address critical and unresolved research questions in the domains of climate, energy, and sustainability, while fostering innovative approaches and technological solutions. The conference will also explore the role of Artificial Intelligence and Computational Intelligence in driving environmental sustainability and energy efficiency. By bringing together researchers, academicians, and industry professionals, the conference provides a vibrant platform to present original research contributions, exchange knowledge, and engage in meaningful dialogue. Maharaja Surajmal Institute of Technology (MSIT), affiliated with Guru Gobind Singh Indraprastha University (GGSIPU), is one of the premier engineering institutions in New Delhi. Established with a vision to provide excellence in technical education, MSIT has consistently focused on fostering innovation, research, and entrepreneurship. The institute is known for its strong academic environment, modern infrastructure, and a commitment to addressing real-world challenges through research and technology.';

// TODO: confirm deadlines
const importantDates = [
  { label: 'Paper Submission Deadline', date: 'February 26, 2027', placeholder: true },
  { label: 'Notification of acceptance', date: 'February 28, 2027', placeholder: true },
  { label: 'Camera-Ready Submission', date: 'March 1, 2027', placeholder: true },
  { label: 'Registration Deadline', date: 'March 3, 2027', placeholder: true },
  { label: 'Conference Dates', date: 'March 16–17, 2027', placeholder: false },
];

export const conferenceConfig = {
  name: '3rd National Conference on Recent Trends in Climate Change, Energy and Sustainability (NCRTCES-2027)',
  acronym: 'NCRTCES', year: '2027', shortInstitution: 'MSIT',
  institution: 'Maharaja Surajmal Institute Of Technology.', location: 'New Delhi',
  date: 'March 16th – 17th 2027', venue: 'New Delhi',
  theme: 'Climate Change, Energy and Sustainability', about: overview,
  overview, importantDates,
  assets: {
    ministry: '/assets/ministry-earth-sciences.png',
    msit: '/assets/msit-logo.png',
    ncrtces: '/assets/ncrtces-2027-logo.png',
    backgrounds: ['/assets/hero-campus.png', '/assets/hero-agriculture.png', '/assets/hero-wind-energy.png', '/assets/hero-green-tech.png', '/assets/hero-sustainability.png'],
  },
  tracks: [
    { number: '01', title: 'Climate Change', topics: 'Climate science · Adaptation · Resilience' },
    { number: '02', title: 'Energy Systems', topics: 'Renewables · Efficiency · Energy transition' },
    { number: '03', title: 'Sustainability', topics: 'AI · Environmental sustainability · Green technologies' },
  ],
  dates: importantDates.map(({ label, date }) => [label, date]),
  committee: [['Patron', 'To be announced'], ['Convenor', 'To be announced'], ['Organizing Committee', 'Details to be announced']],
  registrationCategories: ['Student', 'Research Scholar', 'Faculty / Academician', 'Industry Professional'],
  submissionUrl: '', contact: { email: 'To be announced', address: 'MSIT, New Delhi', department: 'Conference Secretariat' },
  copyrightYear: '2027',
};

export const sampleRegistrations = [
  { id: 'DEMO-001', name: 'Aarav Sharma', email: 'aarav@example.edu', institution: 'MSIT', category: 'Student', phone: '0000000000', status: 'Sample' },
  { id: 'DEMO-002', name: 'Meera Singh', email: 'meera@example.edu', institution: 'Research Institute', category: 'Research Scholar', phone: '0000000000', status: 'Sample' },
  { id: 'DEMO-003', name: 'Kabir Verma', email: 'kabir@example.edu', institution: 'Engineering College', category: 'Faculty / Academician', phone: '0000000000', status: 'Sample' },
];
