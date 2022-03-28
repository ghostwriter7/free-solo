import { IProject } from '../interfaces';

export const PROJECTS_DATA: IProject[] = [
  {
    title: "todo-app",
    imgPath: "../../../assets/images/todo-app.png",
    github: "https://github.com/ghostwriter7/todo-app",
    live: "https://todo-app-ghostwriter7.vercel.app/",
    tech: ['angular', 'js', 'html', 'css'],
    offset: 0,
    transform: '',
    text: `This app originates from a Frontend Mentor challenge. I've pushed the concept forward, implemented
    authorization and database with Firebase, added a Calendar that enables managing todos in a long run and
     displays some visual summary.`
  },
  {
    title: "eCommerce",
    imgPath: "../../../assets/images/ecommerce.png",
    github: "https://github.com/ghostwriter7/eCommerce",
    live: "https://e-commerce-tawny-iota.vercel.app/",
    tech: ['react', 'js', 'html', 'css'],
    offset: 0,
    transform: '',
    text: `I built this simple e-commerce with CommerceJS about four months ago, what sounds for me as a
    different era nowadays. I enjoyed the library very much, I'm looking forward to building something
    more advanced in this environment with Angular.`
  },
  {
    title: "calculator",
    imgPath: "../../../assets/images/calculator.png",
    github: "https://github.com/ghostwriter7/Calculator-app",
    live: "https://calculator-app-roan.vercel.app/",
    tech: ['js', 'html', 'css'],
    offset: 0,
    transform: '',
    text: `One of my oldest projects, contains some silly bugs, which I will never have time to fix
    but I'm still quite proud of it. So much have changed since I was torturing myself to figure out
    a working logic for that!`
  },
  {
    title: "tip calculator",
    imgPath: "../../../assets/images/tipcalculator.png",
    github: "https://github.com/ghostwriter7/Tip-calculator-app",
    live: "https://tip-calculator-app-delta.vercel.app/",
    tech: ['js', 'html', 'css'],
    offset: 0,
    transform: '',
    text: `Another cosy calculator which I've implemented based on the Frontend Mentor Challenge.`
  },
  {
    title: "dashboard",
    imgPath: "../../../assets/images/dashboard.png",
    github: "https://github.com/ghostwriter7/Time-tracking-dashboard",
    live: "https://time-tracking-dashboard-eight.vercel.app/",
    tech: ['js', 'html', 'css'],
    offset: 0,
    transform: '',
    text: `Simple project based on the Frontend Mentor mockup.`
  },
  {
    title: "testimonials",
    imgPath: "../../../assets/images/testimonials.png",
    github: "https://github.com/ghostwriter7/Testimonials-grid-section",
    live: "https://testimonials-grid-section-opal.vercel.app/",
    tech: ['html', 'css'],
    offset: 0,
    transform: '',
    text: 'Simple project without any JavaScript involved. Primarily my first attempt to play with CSS grid!'
  },
  {
    title: "ip tracker app",
    imgPath: "../../../assets/images/ip-tracker-app.png",
    github: "https://github.com/ghostwriter7/ip-tracker-app",
    live: "https://ip-tracker-app-xi.vercel.app/",
    tech: ['js', 'html', 'css'],
    offset: 0,
    transform: '',
    text: 'A more recent challenge from Frontend Mentor, implemented with Vanilla JavaScript.',
  },
];

export default PROJECTS_DATA;
