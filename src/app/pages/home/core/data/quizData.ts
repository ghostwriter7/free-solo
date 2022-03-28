import { IPuzzle } from '../interfaces';

const QUIZ_DATA: IPuzzle[] = [
  {
    title: "juggling",
    icon: "balls",
    text: [`Juggling is a part of my <strong>mind training</strong>. I believe
    that we're often too consumed with our body's appearance, completely
    neglecting brain's fitness.`,
      `Juggling is a <b>mind's martial art</b>. It teaches you how to deconstruct
    even the most complex challenge into manageable pieces and once it's
    done, it develops a <b>habit of winning</b>.`,
      `You learn a new trick, then another one, and one more, and soon
    you've got dozens of them under your belt, and you think you can
    learn anything. It's <b>pretty empowering.</b>`,
      `<b>Would you like to try?</b>`],
    isActive: true
  },
  {
    title: "calisthenics",
    icon: "hand",
    text: [`I like calisthenics. I love the simplicity of training in this way. I often combine my workout with being in the nature, doing sprints on the lonely forest roads or pullups on the branches (although it takes some time to find these horizontal branches of appropiate diameters).`,
      `Being exposed, free in a vast open area <b>helps me think</b> and I often come back home with some <b>game-changing ideas</b>. For instance, the idea to use a memory game to introduce myself was a result of such an act.`],
    isActive: true
  },
  {
    title: "learning",
    icon: "book",
    text: [`I weren't privileged with the opportunity to learn any motor skill at an early age that could guarantee me a success and I'm aware that catching up all these kids doing karate since kindergarden is difficult. But luckily I'm not damned to live a life of mediocrity, cause there's one thing in my body that has a potential to grow insanely in a short period of time.`,
      `<b>The brain.</b> I like to thing about myself as a <b>learning machine</b>, capable of grasping any piece of knowledge. I learn a lot, cause in learning we trust for God's sake.`],
    isActive: true
  },
  {
    title: "barefoot",
    icon: "paw",
    text: [`I was looking for a human foot but ended up on a dog paw. Fine. This paragraph isn't about my past two years working as a musher in  Lapland with huskies.`,
      `It's about my passion for barefoot walking, running, sprinting. Anytime I go for a hike to the forest, I'll do my best to <b>leave shoes in the car</b>. Again, it somehow improves the clarity of my thoughts. Do I have mystical experiences? No, I don't. If I want a spiritual experience, I pick up a book about <b>neurobiology</b>.`],
    isActive: true
  },
  {
    title: "programming",
    icon: "laptop",
    text: [`Why do I want to become a software developer? Answer is simple. I think there's <b>nothing more sexy than intelligence</b>.
    And I want to do a job that stimulates it, instead of leading to mental decline.`,
      `I've done a lot in tourism industry, including jobs that at first sound like a dream of an adventure-seeker. But there have always been this single ingredient missing, which I seek, <b>intellectual challenges</b>.`],
    isActive: true
  },
  {
    title: "ghostwriter",
    icon: "ghost",
    text: [`What the hell is it? A nickname? Here is a story. I'm naturally inclined to languages and thus, to stories. One of my personal life challenges is to write a novel.`,
      `In the process of learning the writer's craft I've came upon a masterclass by David Baldacci. He mentiones his answer to interviewer's question: when are you going to stop writing? I can't recall his exact words but the idea was that he will never stop and someone will find him dead by the desk. That's first puzzle.`,
      `Then comes the second one. There's a good movie by Roman Polanski named 'ghostwriter'. That's where I've discovered the word, which in my opinion, is cool.`,
      `And then I've daydreamed about my answer to the question given to Baldacci. And here is my answer: "I will write until I'm dead, and once this happens, I will become a ghostwriter in hell". Whether you enjoyed that sentence or not, there is a potential benefit for you in the whole story. Since I'm good at languages, <b>I can succeed with JavaScript or Python</b>, cause after all, they're all languages.`],
    isActive: true
  },
];

export default QUIZ_DATA;
