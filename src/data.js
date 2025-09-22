/* Program Data

  in this file you can declare variables to store important data for your program
  the data can only be primitives, objects or arrays
  do not store dom elements in these variables!!!!

  these variables will be imported by your handlers when necessary
    not by your logic
    not by your listeners
*/

// export const quizData = {
//   currentQuestionIndex: 0,
//   // the questions in the quiz
//   questions: [
//     {
//       text: 'What are the different ways to declare a JS variable?',
//       answers: {
//         a: 'constant, let, variable',
//         b: 'var, const, let, function',
//         c: 'var, let, const',
//       },
//       correct: 'c',
//       selected: null,
//       links: [
//         {
//           text: 'javascript.info',
//           href: 'https://javascript.info/variables',
//         },
//         {
//           text: 'Tyler McGinnis',
//           href: 'https://ui.dev/var-let-const/',
//         },
//       ],
//     },
//     {
//       text: 'What does `typeof` do?',
//       answers: {
//         a: 'changes the type of a primitive value',
//         b: 'returns a string describing the type of a value',
//         c: 'determines if a value is primitive',
//         d: 'can tell the difference between arrays and objects',
//       },
//       correct: 'b',
//       selected: null,
//       links: [
//         {
//           text: 'javascript.info',
//           href: 'https://javascript.info/types#type-typeof',
//         },
//         {
//           text: 'MDN',
//           href:
//             'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
//         },
//       ],
//     },
//     // Add more questions here
//   ],
// };

export let currentQuiz = 'bmw';

export const quizData = [
  {
    id: 'bmw',
    title: 'BMW',
    description: 'Check your knowledge about cars',
    image: '../public/images/cards/cars/BMW.jpg',
    currentQuestion: 0,
    points: 0,
    completed: false,
    questions: [
      {
        id: 'bmw-question-1',
        question: "What do the initials 'BMW' stand for in German?",
        options: [
          'Bayerische Motoren Werke',
          'Berliner Maschinen Werke',
          'Badenische Motoren Werke',
          'Bayerische Maschinen Werk',
        ],
        correctIndex: 0,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-2',
        question: 'In which year was BMW founded?',
        options: ['1909', '1916', '1927', '1936'],
        correctIndex: 1,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-3',
        question: 'BMW’s global headquarters are located in which city?',
        options: ['Berlin', 'Munich', 'Stuttgart', 'Ingolstadt'],
        correctIndex: 1,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-4',
        question: "BMW's earliest products were primarily what?",
        options: [
          'Aircraft engines',
          'Motorcycles',
          'Cars',
          'Diesel generators',
        ],
        correctIndex: 0,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-5',
        question: "What does the 'M' in BMW M stand for?",
        options: ['Modern', 'Motorsport', 'Master', 'Modular'],
        correctIndex: 1,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-6',
        question: 'What is BMW’s all-wheel-drive system called?',
        options: ['Quattro', 'xDrive', '4MATIC', 'SH-AWD'],
        correctIndex: 1,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-7',
        question:
          'Which model was BMW’s first mass-produced battery-electric car of the modern era?',
        options: ['i3', 'i8', '330e', '745e'],
        correctIndex: 0,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-8',
        question:
          "Which BMW model first introduced the twin 'kidney' grille design?",
        options: [
          'BMW 2002',
          'BMW 303',
          'BMW 1500 (Neue Klasse)',
          'BMW E30 3 Series',
        ],
        correctIndex: 1,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-9',
        question: "In BMW naming, what does 'CSL' stand for?",
        options: [
          'Coupe Sport Leichtbau',
          'Competition Sport Luxury',
          'City Sport Lightweight',
          'Cabrio Sport Line',
        ],
        correctIndex: 0,
        userAnswer: null,
        skipped: false,
      },
      {
        id: 'bmw-question-10',
        question:
          'Which BMW series is traditionally classified as a compact executive car?',
        options: ['1 Series', '3 Series', '5 Series', '7 Series'],
        correctIndex: 1,
        userAnswer: null,
        skipped: false,
      },
    ],
  },
  {
    id: 'Mercedes',
    title: 'Mercedes',
    description: 'Check your knowledge about australian cars',
    image: '../public/images/cards/cars/mercedes.jpg',
  },
];
