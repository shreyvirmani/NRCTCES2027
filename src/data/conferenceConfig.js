export const CONFERENCE_START = '2027-03-16T00:00:00+05:30';

const overview = 'NRCTCES 2027 aims to address critical and emerging research challenges in climate science, energy, and sustainability by promoting innovative approaches and advanced technological solutions. The conference will emphasize the transformative role of Artificial Intelligence (AI), Machine Learning (ML), and Computational Intelligence in advancing environmental sustainability, improving energy efficiency, and addressing climate-related challenges. By bringing together researchers, academicians, industry professionals, and technology innovators, NRCTCES 2027 will provide a dynamic platform for presenting original research, exchanging knowledge, fostering interdisciplinary collaboration, and engaging in meaningful discussions to shape sustainable technological advancements.';

const importantDates = [
  { label: 'Paper Submission Opens', date: '19 October 2026', isoDate: '2026-10-19' },
  { label: 'Paper Submission Deadline', date: '31 December 2026', isoDate: '2026-12-31' },
  { label: 'Notification of Acceptance', date: '20 January 2027', isoDate: '2027-01-20' },
  { label: 'Camera-Ready Submission', date: '5 February 2027', isoDate: '2027-02-05' },
  { label: 'Registration Deadline', date: '15 February 2027', isoDate: '2027-02-15' },
  { label: 'Conference Dates', date: '16–17 March 2027', isoDate: '2027-03-16' },
];

export const conferenceConfig = {
  name: '3rd National Conference on Recent Trends in Climate Change, Green Energy and Sustainability (NCRTCES 2027)',
  acronym: 'NCRTCES', year: '2027', shortInstitution: 'MSIT',
  institution: 'Maharaja Surajmal Institute of Technology', location: 'New Delhi',
  date: '16th–17th March 2027', venue: 'C-4, Janakpuri, New Delhi, India',
  theme: 'Climate Change, Green Energy and Sustainability', about: overview,
  overview, importantDates,
  assets: {
    ministry: '/assets/ministry-earth-sciences.png',
    msit: '/assets/msit-logo.png',
    ncrtces: '/assets/ncrtces-2027-logo.png',
    backgrounds: ['/assets/hero-campus.png', '/assets/hero-agriculture.png', '/assets/hero-wind-energy.png', '/assets/hero-green-tech.png', '/assets/hero-sustainability.png'],
  },
  tracks: [
    { number: '01', title: 'Climate Change, Extreme Weather, and Disaster Risk Management' },
    { number: '02', title: 'Renewable Energy, Energy Efficiency, and Sustainable Technologies' },
    { number: '03', title: 'Weather Forecasting, Climate Modelling, and Environmental Data Analytics' },
    { number: '04', title: 'Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI' },
    { number: '05', title: 'Internet of Things (IoT), Smart Sensors, Remote Sensing, and Environmental Monitoring' },
    { number: '06', title: 'Big Data Analytics, Cloud Computing, Edge Computing, and Intelligent Information Systems' },
    { number: '07', title: 'Computer Vision, Signal Processing and AI-Driven Prediction and Decision Support Systems' },
    { number: '08', title: 'Smart Cities, Green Computing, Sustainable Infrastructure, and Waste-to-Value Technologies' },
    { number: '09', title: 'Lightning Science, Detection Systems, Atmospheric Electricity, and Safety Technologies' },
  ],
  dates: importantDates.map(({ label, date }) => [label, date]),
  committee: [
    ['Patron', 'Details to be announced'],
    ['Conveners and Co-conveners', 'Details to be announced'],
    ['Program Committee', 'Details to be announced'],
    ['Technical Program Committee', 'Details to be announced'],
    ['Sponsorship / Funding Committee', 'Details to be announced'],
    ['Website Committee', 'Details to be announced'],
    ['Finance Committee', 'Details to be announced'],
    ['Publication Committee', 'Details to be announced'],
    ['Publicity, Design and Printing', 'Details to be announced'],
    ['Stage Committee', 'Details to be announced'],
    ['Hospitality Committee', 'Details to be announced'],
    ['Registration Committee', 'Details to be announced'],
    ['Local Organizing Committee', 'Details to be announced'],
  ],
  specialSessions: { proposalTemplate: '', contactEmail: '' },
  paperGuidelines: {
    templateUrl: '',
    submissionUrl: '',
    requirements: [
      'Papers must be in IEEE format.',
      'Submissions will undergo a standard peer-review process.',
      'Author details, including name, affiliation, and email, must be entered during submission.',
    ],
    publication: [
      'Accepted and presented papers will be published in a reputed conference series.',
      'The call states that accepted and presented papers will be published in a special issue of Satyam Journal (ISSN: 2319-7897).',
      'Selected papers will be published in Scopus/refereed journals.',
      'Papers submitted to a journal must be within that journal’s scope.',
    ],
  },
  authorGuidelines: {
    ethics: [
      'Submit original work and do not present plagiarism or self-plagiarism as original research.',
      'Cite the original source when using previously published ideas, models, figures, tables, or data.',
      'Use your own wording when explaining cited work and obtain permission before reproducing copyrighted material.',
    ],
    privacyNotice: 'The 2027 conference privacy notice, data-handling contact, photography or recording arrangements, and consent process have not yet been supplied. These details should be confirmed before registration opens.',
  },
  registration: { status: 'Registration details to be announced', deadline: '15 February 2027', fees: [], formUrl: '' },
  partners: [],
  acknowledgements: [
    'The Microsoft CMT service was used for managing the peer-review process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.',
  ],
  registrationCategories: ['Student', 'Research Scholar', 'Faculty / Academician', 'Industry Professional'],
  submissionUrl: '', contact: {
    email: 'ncrtces2027@msit.in', phone: '011-65215941',
    address: 'C-4, Janakpuri, New Delhi, India', institution: 'Maharaja Surajmal Institute of Technology (MSIT)',
    website: 'https://www.ncrtces-msit.in/', department: 'NCRTCES 2027 Team',
  },
  copyrightYear: '2027',
};

export const sampleRegistrations = [
  { id: 'DEMO-001', name: 'Aarav Sharma', email: 'aarav@example.edu', institution: 'MSIT', category: 'Student', phone: '0000000000', status: 'Sample' },
  { id: 'DEMO-002', name: 'Meera Singh', email: 'meera@example.edu', institution: 'Research Institute', category: 'Research Scholar', phone: '0000000000', status: 'Sample' },
  { id: 'DEMO-003', name: 'Kabir Verma', email: 'kabir@example.edu', institution: 'Engineering College', category: 'Faculty / Academician', phone: '0000000000', status: 'Sample' },
];
