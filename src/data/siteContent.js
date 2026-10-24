export const committees = [
  {
    name: 'Organising Committee',
    members: [
      { role: 'Organizing Chair', name: 'Prof. (Dr.) A. K. Srivastava' },
      { role: 'Convener', name: 'Dr. Sudesh Pahal' },
      { role: 'Co-Conveners', name: 'Dr. Meena Rao, Dr. Shaifali M. Arora' },
    ],
  },
  { name: 'Organising Chair', members: [{ name: 'Prof. (Dr.) A. K. Srivastava' }] },
  { name: 'Convener', members: [{ name: 'Dr. Sudesh Pahal' }] },
  { name: 'Co-Conveners', members: [{ name: 'Dr. Meena Rao' }, { name: 'Dr. Shaifali M. Arora' }] },
  {
    name: 'Technical Program Committee',
    members: ['Prof. (Dr.) Pardeep Sangwan', 'Prof. (Dr.) Puneet Azad', 'Prof. (Dr.) Neeru Rathee', 'Dr. Sudesh Pahal', 'Dr. Meena Rao', 'Dr. Shaifali M. Arora', 'Dr. Richa Gupta', 'Dr. Aman Dahiya', 'Dr. Dinesh Sheoran'].map(name => ({ name })),
  },
  { name: 'Sponsorship Committee', members: ['Prof. (Dr.) Puneet Azad', 'Mr. Deepak Goyal'].map(name => ({ name })) },
  { name: 'Collaboration Committee', members: ['Prof. (Dr.) Archana Balyan', 'Dr. Sakshi Rajput'].map(name => ({ name })) },
  { name: 'Publication Committee', members: ['Prof. (Dr.) Neeru Rathee', 'Ms. Garima'].map(name => ({ name })) },
  { name: 'Finance Committee', members: ['Dr. Neetu', 'Ms. Himani'].map(name => ({ name })) },
  { name: 'Printing Committee', members: ['Dr. Neelam Nehra', 'Ms. Prinkle'].map(name => ({ name })) },
  { name: 'Publicity & Media Committee', members: ['Dr. Geetanjali Sharma', 'Dr. Neelam Barak'].map(name => ({ name })) },
  { name: 'Design Committee', members: ['Dr. Aman Dahiya', 'Dr. Upma Singh'].map(name => ({ name })) },
  { name: 'Website Committee', members: ['Ms. Vishakha Tomar', 'Ms. Neha'].map(name => ({ name })) },
  { name: 'Stage Committee', members: ['Dr. Deepti Deshwal', 'Dr. Jasmine Chhikara', 'Ms. Sonia'].map(name => ({ name })) },
  { name: 'Local Organising/Registration Committee', members: ['Dr. Dinesh Sheoran', 'Dr. Richa Gupta', 'Dr. Suman Lata'].map(name => ({ name })) },
  { name: 'Hospitality Committee', members: ['Dr. Nishtha', 'Ms. Anjali Balyan'].map(name => ({ name })) },
];

// Proposed reference fees; verify with the conference organizers before publishing as official.
export const registrationFees = [
  { category: 'Students/Research Scholars', earlyBird: '₹1,500', regular: '₹2,000' },
  { category: 'Indian Academicians', earlyBird: '₹2,000', regular: '₹2,500' },
  { category: 'Indian Industry Delegates', earlyBird: '₹2,500', regular: '₹3,000' },
  { category: 'International Delegates', earlyBird: '$80', regular: '$100' },
  { category: 'Attendees', earlyBird: '₹1,000', regular: '₹1,500' },
];
