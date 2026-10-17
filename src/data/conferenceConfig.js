export const conferenceConfig = {
  name: 'National Conference on Recent Trends in Communication, Electronics and Systems',
  acronym: 'NCRTCES', year: '2027', copyrightYear: '2027',
  institution: 'Maharaja Surajmal Institute of Technology', shortInstitution: 'MSIT', location: 'New Delhi, India',
  theme: 'Connecting ideas. Engineering what comes next.',
  date: 'Dates to be announced', venue: 'Venue to be confirmed',
  description: 'A proposed forum for researchers, educators and practitioners to exchange ideas across communication, electronics, computing and the systems that connect them.',
  about: 'The proposed conference will bring together the academic community to discuss emerging research, share practical perspectives and encourage collaboration across connected areas of engineering and technology. Programme details and scope are provisional and will be updated following faculty review.',
  dates: [ ['Paper submission deadline','To be announced'], ['Notification of acceptance','To be announced'], ['Registration deadline','To be announced'], ['Conference dates','To be announced'] ],
  tracks: [
    { number:'01', title:'Communication & Networks', topics:'Wireless and 5G/6G systems · Signal processing · IoT and sensor networks · Optical communication' },
    { number:'02', title:'Electronics & Embedded Systems', topics:'VLSI and microelectronics · Embedded design · Power electronics · Control and instrumentation' },
    { number:'03', title:'Computing & Intelligent Systems', topics:'Artificial intelligence · Edge and cloud computing · Cybersecurity · Data-driven systems' },
    { number:'04', title:'Emerging Technologies', topics:'Robotics and automation · Sustainable engineering · Smart systems · Interdisciplinary applications' }
  ],
  committee: [ ['Patron','Details to be announced'], ['General Chair','Details to be announced'], ['Conference Chair','Details to be announced'], ['Organizing Secretary','Details to be announced'], ['Technical Program Committee','Details to be announced'] ],
  contact: { email:'Contact details to be announced', department:'Department contact to be confirmed', address:'Campus and venue details to be confirmed' },
  submissionUrl: '',
  registrationCategories: ['Student','Research Scholar','Faculty','Industry Professional','Other']
};

export const sampleRegistrations = [
  { id:'DEMO-001', name:'Aarav Mehta', email:'aarav.example@demo.invalid', institution:'Northfield Institute of Technology', category:'Research Scholar', phone:'Not provided', status:'Sample record' },
  { id:'DEMO-002', name:'Mira Kapoor', email:'mira.example@demo.invalid', institution:'Western Valley University', category:'Faculty', phone:'Not provided', status:'Sample record' },
  { id:'DEMO-003', name:'Kabir Sen', email:'kabir.example@demo.invalid', institution:'Central School of Engineering', category:'Student', phone:'Not provided', status:'Sample record' },
  { id:'DEMO-004', name:'Anaya Rao', email:'anaya.example@demo.invalid', institution:'Lakeside Research Centre', category:'Industry Professional', phone:'Not provided', status:'Sample record' }
];
