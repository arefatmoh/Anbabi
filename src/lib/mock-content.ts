import type {
  AboutCopy,
  AboutTrustMarker,
  AboutValue,
  CommunityPlatform,
  CommunityPrinciple,
  CommunityRhythmStep,
  ContactInquiry,
  ContactPrinciple,
  MockBook,
  MockVoice,
  PolicyPageContent,
  ReadingCycle,
} from "@/lib/content-types";
export const mockBooks: readonly MockBook[] = [
  {
    isMock: true,
    slug: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    coverLabel: "Read & Revive Pick",
    coverTone: "charcoal",
    coverImage: {
      src: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
      alt: "Deep Work by Cal Newport book cover",
      sourceLabel: "Open Library cover",
    },
    description:
      "A practical exploration of focused work, attention, and meaningful results in a distracted world.",
    longDescription:
      "Deep Work examines the value of sustained, distraction-free concentration and the routines that make it possible. It gives readers a useful language for noticing shallow habits, protecting attention, and making room for demanding work that matters.",
    themes: ["Focus", "Attention", "Digital discipline"],
    category: "Productivity",
    status: "current",
    statusLabel: "Current cycle",
    language: "English",
    readingTime: "Four-week reading rhythm",
    whyFeatured:
      "The book gives the circle a practical question to test together: what becomes possible when we protect our attention? Its ideas move naturally from private reading into shared experiments and reflection.",
    readerFit: [
      "Readers rebuilding a steady reading habit",
      "Students and young professionals protecting their attention",
      "Anyone ready to examine distraction without chasing perfection",
    ],
    discussionPrompts: [
      "Where does your best attention currently go?",
      "Which shallow habit deserves a thoughtful redesign?",
      "What kind of environment helps you stay with a difficult idea?",
    ],
  },
  {
    isMock: true,
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    coverLabel: "Practice & Growth",
    coverTone: "paper",
    coverImage: {
      src: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
      alt: "Atomic Habits by James Clear book cover",
      sourceLabel: "Open Library cover",
    },
    description:
      "A clear framework for understanding how small repeated choices shape habits and identity.",
    longDescription:
      "Atomic Habits offers a practical way to examine cues, routines, environments, and identity. Its strength is not a promise of instant transformation, but a set of concrete questions about how small systems make helpful behavior easier to repeat.",
    themes: ["Habits", "Identity", "Consistency"],
    category: "Personal Growth",
    status: "recommended",
    statusLabel: "Recommended",
    language: "English",
    readingTime: "Read at your own rhythm",
    whyFeatured:
      "This is a useful companion for readers who want to turn an insight into a repeatable practice. It works especially well with reflection because its ideas can be tested in ordinary routines.",
    readerFit: [
      "Readers beginning a new habit",
      "People who prefer practical frameworks",
      "Anyone curious about identity-based change",
    ],
    discussionPrompts: [
      "Which habit already has a strong cue in your day?",
      "What would make one useful action easier to repeat?",
      "Which identity are your current routines reinforcing?",
    ],
  },
  {
    isMock: true,
    slug: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverLabel: "Story & Purpose",
    coverTone: "orange",
    coverImage: {
      src: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
      alt: "The Alchemist by Paulo Coelho book cover",
      sourceLabel: "Open Library cover",
    },
    description:
      "A fable about purpose, uncertainty, and learning to notice what the journey is teaching.",
    longDescription:
      "The Alchemist follows a young shepherd whose search for treasure becomes a larger meditation on courage, desire, signs, and the meaning we make from a journey. Its accessible form opens space for different readers to question what purpose and risk look like in their own lives.",
    themes: ["Purpose", "Courage", "Journey"],
    category: "Fiction",
    status: "recommended",
    statusLabel: "Recommended",
    language: "English",
    readingTime: "Short reflective read",
    whyFeatured:
      "The story is approachable while leaving room for disagreement and interpretation. It gives a circle many entry points: ambition, fear, faith, choice, and what it means to listen carefully.",
    readerFit: [
      "Readers returning to fiction",
      "People drawn to reflective stories",
      "Anyone thinking about purpose and uncertainty",
    ],
    discussionPrompts: [
      "When does persistence become wisdom—and when does it become stubbornness?",
      "Which part of a journey changes us most: leaving, searching, or returning?",
      "What does the story suggest about listening to fear?",
    ],
  },
];
export const mockCurrentCycle: ReadingCycle = {
  isMock: true,
  slug: "deep-work-reading-circle",
  status: "active",
  statusLabel: "Current cycle",
  title: "Deep Work Reading Circle",
  shortDescription:
    "Read Cal Newport’s Deep Work with a steady weekly rhythm, practical reflection prompts, and a circle that turns focused reading into focused action.",
  book: mockBooks[0],

  dateLabel: "Four-week reading cycle",
  durationLabel: "One focused theme each week",
  targetLabel: "Read daily · reflect weekly",
  whySelected:
    "Deep Work gives the circle a practical question: what becomes possible when we protect our attention? Its ideas invite readers to examine distraction, build stronger routines, and test focused practice in everyday study and work.",
  readerFit: [
    "Readers rebuilding a steady reading habit",
    "Students and young professionals protecting their attention",
    "Curious people ready to test ideas beyond the page",
  ],
  schedule: [
    {
      id: "the-idea",
      label: "Week 1",
      title: "The Idea of Deep Work",
      readingTarget:
        "Explore why focused work is valuable, rare, and meaningful.",
      prompt: "Where does your best attention currently go?",
      state: "completed",
    },
    {
      id: "work-deeply",
      label: "Week 2",
      title: "Work Deeply",
      readingTarget:
        "Read the first rule and design one realistic focus ritual.",
      prompt: "What boundary would make focused work easier this week?",
      state: "current",
    },
    {
      id: "embrace-boredom",
      label: "Week 3",
      title: "Train Your Attention",
      readingTarget:
        "Explore boredom, distraction, and a more intentional digital life.",
      prompt: "Which distraction are you willing to interrupt?",
      state: "upcoming",
    },
    {
      id: "drain-shallows",
      label: "Week 4",
      title: "Make Space for Depth",
      readingTarget:
        "Finish the rules and shape one practice worth carrying forward.",
      prompt: "What will you protect after the reading cycle ends?",
      state: "closing",
    },
  ],
  prompts: [
    "What does focused work look like in your current season of life?",
    "Which environment helps your attention settle—and which one scatters it?",
    "What is one shallow habit you could redesign instead of simply resisting?",
  ],
};

export const mockVoices: readonly MockVoice[] = [
  {
    isMock: true,
    slug: "what-deep-work-changed-about-my-evenings",
    title: "What Deep Work Changed About My Evenings",
    subtitle:
      "One protected hour taught me that attention needs a place to land.",
    excerpt:
      "Protecting one quiet hour changed more than my schedule; it changed the quality of the questions I could stay with.",
    author: "Liya M.",
    authorNote:
      "Liya writes about reading practice, attention, and the small routines that make reflection possible.",
    category: "Reflection",
    tags: ["Focus", "Reading Practice", "Attention"],
    publishedLabel: "May 18",
    readingTime: "4 min read",
    relatedBook: mockCurrentCycle.book.title,
    relatedBookSlug: mockCurrentCycle.book.slug,
    featured: true,
    cover: "reader",
    sections: [
      {
        paragraphs: [
          "My evenings used to disappear in fragments. I would open a book, answer one message, remember something else, and return to the page without remembering what I had just read. I called it tiredness. Deep Work made me wonder whether it was also a habit of divided attention.",
          "So I tried one modest experiment: one quiet hour after dinner, with the phone in another room and a notebook beside the book. The rule was not to finish a chapter. The rule was to stay.",
        ],
      },
      {
        heading: "The first difficult ten minutes",
        paragraphs: [
          "The beginning was less peaceful than I expected. My mind kept offering exits—check one notification, refill the tea, look up a reference. I began writing those impulses in the margin instead of following them.",
          "After a few evenings, the restlessness stopped feeling like an instruction. It became something I could notice and let pass.",
        ],
        pullQuote:
          "A protected hour did not make me faster. It made me available to the idea in front of me.",
      },
      {
        heading: "Attention needs a place to land",
        paragraphs: [
          "The deepest change was not productivity. It was the quality of reflection. When I stayed with a chapter long enough, I could disagree with it carefully instead of reacting quickly. I could connect it to my own routines and bring a real question to the circle.",
          "I still have distracted evenings. But now I know that focus is not a mood I wait for. It is a place I prepare, enter, and practice returning to.",
        ],
      },
    ],
  },
  {
    isMock: true,
    slug: "boredom-is-not-the-enemy",
    title: "Boredom Is Not the Enemy",
    subtitle:
      "Leaving a few pauses unfilled gave my attention room to become stronger.",
    excerpt:
      "When every pause is filled, attention never gets the chance to become strong. I tried leaving a few pauses alone.",
    author: "Nahom B.",
    authorNote:
      "Nahom explores how books can reshape ordinary choices around time, technology, and attention.",
    category: "Personal Growth",
    tags: ["Digital Discipline", "Habits", "Focus"],
    publishedLabel: "May 15",
    readingTime: "3 min read",
    relatedBook: mockCurrentCycle.book.title,
    relatedBookSlug: mockCurrentCycle.book.slug,
    featured: false,
    cover: "notebook",
    sections: [
      {
        paragraphs: [
          "I used to treat boredom as a small emergency. A slow queue, a quiet ride, even the few minutes before a meeting became reasons to reach for my phone.",
          "Deep Work challenged that reflex. If the mind is trained to expect novelty every few seconds, asking it to stay with a difficult page becomes much harder.",
        ],
      },
      {
        heading: "A week of unfilled pauses",
        paragraphs: [
          "For one week, I left the shortest pauses alone. No dramatic detox—just the walk to lunch, the first ten minutes of a bus ride, and the moment after finishing a task.",
          "The pauses felt awkward before they felt spacious. Then ideas from the reading began returning on their own. A question from the circle would resurface without being forced.",
        ],
        pullQuote:
          "Boredom became less like an empty room and more like a doorway back to my own attention.",
      },
      {
        heading: "What I kept",
        paragraphs: [
          "I did not stop using my phone, and I did not become perfectly focused. I simply stopped giving every quiet second away.",
          "That small boundary made reading easier to enter and discussion easier to remember. The mind had somewhere to continue the conversation.",
        ],
      },
    ],
  },
  {
    isMock: true,
    slug: "a-smaller-phone-a-larger-attention-span",
    title: "A Smaller Phone, a Larger Attention Span",
    subtitle:
      "Simplifying my digital space helped me see which tools were quietly setting my priorities.",
    excerpt:
      "A week of simpler digital choices helped me see which tools served my goals and which ones quietly set them.",
    author: "Mekdes A.",
    authorNote:
      "Mekdes writes about intentional technology, learning, and building habits that leave room for thought.",
    category: "Reader Story",
    tags: ["Technology", "Attention", "Everyday Practice"],
    publishedLabel: "May 12",
    readingTime: "5 min read",
    relatedBook: mockCurrentCycle.book.title,
    relatedBookSlug: mockCurrentCycle.book.slug,
    featured: false,
    cover: "voices",
    sections: [
      {
        paragraphs: [
          "My phone was not only a tool I used. It was also an environment I entered dozens of times a day. Every icon suggested what deserved my attention next.",
          "While reading Deep Work, I decided to make that environment quieter. I removed the loudest shortcuts from the home screen and kept only the tools I could explain in one sentence.",
        ],
      },
      {
        heading: "Designing for the pause",
        paragraphs: [
          "The biggest difference came from adding a little friction. Social apps were still available, but reaching them required a deliberate search. That brief pause gave me a chance to ask whether I had chosen the action or merely repeated it.",
          "I used some of those recovered moments to read two pages, write a question, or simply finish the thought I was already having.",
        ],
        pullQuote:
          "The goal was not a smaller life with technology. It was a larger life around it.",
      },
      {
        heading: "A more intentional default",
        paragraphs: [
          "After a week, I restored a few tools and left others hidden. The useful lesson was not that every app is harmful. It was that every default deserves examination.",
          "My attention span did not transform overnight, but reading stopped competing with a screen designed to win every idle second. That was enough to keep practicing.",
        ],
      },
    ],
  },
];

export const readingJourney = [
  {
    title: "Read",
    description: "Follow a realistic rhythm and mark what catches.",
  },
  {
    title: "Reflect",
    description: "Turn a reaction into a thought you can examine.",
  },
  {
    title: "Discuss",
    description: "Bring questions to the circle and listen closely.",
  },
  {
    title: "Write",
    description: "Shape what changed into your own clear words.",
  },
  {
    title: "Publish",
    description: "Selected, permissioned voices find an audience.",
  },
  {
    title: "Inspire",
    description: "A reflection becomes the next reader’s beginning.",
  },
] as const;

export const communityPlatforms: readonly CommunityPlatform[] = [
  {
    isMock: true,
    id: "telegram",
    name: "Telegram",
    role: "The active reading circle",
    description:
      "This is where the reading plan becomes a shared practice through prompts, focused discussion, reminders, and cycle updates.",
    highlights: [
      "Reading targets and reflection prompts",
      "Focused discussion around the current book",
      "Cycle reminders and shared check-ins",
      "Closing-session details and follow-up",
    ],
    actionLabel: "Open Telegram",
    actionHref: "https://t.me/ReadRevive",
    external: true,
    featured: true,
    icon: "discussion",
  },
  {
    isMock: true,
    id: "website",
    name: "The website",
    role: "The official home and archive",
    description:
      "Use the website to understand the movement, follow the reading plan, explore books, and read Voices from the Circle.",
    highlights: [
      "Current cycle and reading schedule",
      "Books connected to the circle",
      "Published reflections and articles",
      "Community expectations and contact paths",
    ],
    actionLabel: "Explore Current Cycle",
    actionHref: "/current-cycle",
    icon: "book",
  },
  {
    isMock: true,
    id: "facebook",
    name: "Facebook",
    role: "The public-sharing role",
    description:
      "This space is designed for announcements, published Voices, reading recaps, and highlights that can travel beyond the active circle.",
    highlights: [
      "Public reading-cycle announcements",
      "Published Voices and article highlights",
      "Recaps from reading moments",
      "Invitations into the next conversation",
    ],
    icon: "share",
  },
];

export const communityRhythm: readonly CommunityRhythmStep[] = [
  {
    id: "target",
    label: "Start",
    title: "Receive the target",
    description:
      "See the week’s reading focus and choose a realistic time to begin.",
  },
  {
    id: "prompt",
    label: "Notice",
    title: "Sit with a prompt",
    description:
      "Carry one question while reading instead of racing only for completion.",
  },
  {
    id: "discussion",
    label: "Connect",
    title: "Join the discussion",
    description:
      "Share what challenged you and listen for what another reader noticed.",
  },
  {
    id: "check-in",
    label: "Continue",
    title: "Check in honestly",
    description:
      "Name where you are, what helped, and what would make the next step lighter.",
  },
  {
    id: "recap",
    label: "Gather",
    title: "Return to the thread",
    description:
      "Use the recap to collect key questions, insights, and unfinished thoughts.",
  },
  {
    id: "recognition",
    label: "Recognize",
    title: "Notice meaningful effort",
    description:
      "Value consistency, thoughtful questions, generous listening, and clear reflection.",
  },
];

export const communityPrinciples: readonly CommunityPrinciple[] = [
  {
    title: "Curiosity before certainty",
    description:
      "Ask questions, make room for interpretation, and disagree with care rather than performance.",
  },
  {
    title: "People before points",
    description:
      "Recognition should encourage reading and contribution without turning the circle into a competition.",
  },
  {
    title: "Consent before publishing",
    description:
      "A reflection or name moves beyond the discussion only with clear permission from its writer.",
  },
  {
    title: "Progress without shame",
    description:
      "A missed target is information, not a verdict. The circle helps readers return with honesty.",
  },
];

export const communityRecognition = [
  "A question that helped the discussion go deeper",
  "A consistent reading practice carried with honesty",
  "A generous response that made another reader feel heard",
  "A reflection shaped carefully enough to become a Voice",
] as const;

export const aboutValues: readonly AboutValue[] = [
  {
    title: "Knowledge with humility",
    description:
      "Books invite learning, but the circle also makes room for uncertainty, questions, and the wisdom of listening.",
  },
  {
    title: "Discipline with compassion",
    description:
      "A steady reading rhythm matters, and so does helping people return without shame when life interrupts it.",
  },
  {
    title: "Sincerity in reflection",
    description:
      "The goal is not to perform intelligence. It is to notice honestly what a book challenges, clarifies, or changes.",
  },
  {
    title: "Service through sharing",
    description:
      "A useful question, generous response, or carefully shaped Voice can help another reader begin.",
  },
];

export const aboutTrustMarkers: readonly AboutTrustMarker[] = [
  {
    title: "A visible reading plan",
    description:
      "The current cycle shows the book, rhythm, prompts, and next action clearly.",
    href: "/current-cycle",
    actionLabel: "View the cycle",
  },
  {
    title: "Voices connected to books",
    description:
      "Published reflections remain connected to the reading that started them.",
    href: "/voices",
    actionLabel: "Read the Voices",
  },
  {
    title: "Clear community expectations",
    description:
      "Respect, consent, privacy, and thoughtful disagreement are stated openly.",
    href: "/community-guidelines",
    actionLabel: "Read the guidelines",
  },
];

export const aboutCopy: AboutCopy = {
  isMock: true,
  definition:
    "Read & Revive / አንባቢ is a youth-led reading movement for young people in Ethiopia who want books to become a steadier, more social, and more purposeful part of life.",
  problem: [
    "Wanting to read is often not the hardest part. The harder part is protecting attention, choosing a realistic rhythm, and having somewhere meaningful to take the ideas afterward.",
    "When reading stays isolated, a difficult week can quietly end the habit. When reflection stays private, useful questions may never meet another mind. Read & Revive connects those missing pieces through a clear cycle and a thoughtful circle.",
  ],
  mission:
    "Make purposeful reading easier to start, steadier to continue, and richer through reflection, conversation, and expression.",
  vision:
    "A reading culture where young people do more than finish books: they examine ideas, listen generously, write clearly, and help thoughtful voices travel.",
};

export const contactInquiries: readonly ContactInquiry[] = [
  {
    isMock: true,
    id: "general",
    title: "General question",
    label: "Ask clearly",
    description:
      "For questions about Read & Revive, the reading model, or where to begin.",
    details: [
      "Write the question in one or two focused paragraphs.",
      "Mention the page, book, or reading-cycle detail you are asking about.",
      "Use a respectful tone so the conversation can stay thoughtful.",
    ],
    actionLabel: "Open Telegram",
    actionHref: "https://t.me/ReadRevive",
    external: true,
    icon: "envelope",
  },
  {
    isMock: true,
    id: "partnership",
    title: "Partnership",
    label: "Share context",
    description:
      "For schools, groups, bookstores, clubs, or collaborators who want to explore a reading-related partnership.",
    details: [
      "Introduce the organization or group in plain language.",
      "Explain the reading problem or audience you want to serve.",
      "Name the kind of collaboration you have in mind.",
    ],
    actionLabel: "Start via Telegram",
    actionHref: "https://t.me/ReadRevive",
    external: true,
    icon: "discussion",
  },
  {
    isMock: true,
    id: "volunteer",
    title: "Volunteer interest",
    label: "Offer help",
    description:
      "For readers who want to support discussion, design, writing, translation, moderation, or event preparation.",
    details: [
      "Mention the skill or responsibility you can offer consistently.",
      "Share a realistic availability window.",
      "Point to the page or cycle that made you want to contribute.",
    ],
    actionLabel: "Open Telegram",
    actionHref: "https://t.me/ReadRevive",
    external: true,
    icon: "notebook",
  },
  {
    isMock: true,
    id: "book-suggestion",
    title: "Book suggestion",
    label: "Suggest with why",
    description:
      "For books that could create strong reading, reflection, and discussion inside the reading-cycle archive.",
    details: [
      "Include the title and author.",
      "Explain what kind of reader would benefit from it.",
      "Share two or three discussion questions the book could open.",
    ],
    actionLabel: "Open Telegram",
    actionHref: "https://t.me/ReadRevive",
    external: true,
    icon: "book",
  },
  {
    isMock: true,
    id: "article-interest",
    title: "Article interest",
    label: "Shape a voice",
    description:
      "For readers who want to turn a reflection into a short piece for Voices from the Circle.",
    details: [
      "Start with the book or prompt that created the reflection.",
      "Describe the personal question or insight you want to develop.",
      "Read existing Voices to understand the tone and consent expectations.",
    ],
    actionLabel: "Read Voices",
    actionHref: "/voices",
    icon: "notebook",
  },
  {
    isMock: true,
    id: "program",
    title: "Program inquiry",
    label: "Ask about sessions",
    description:
      "For questions about workshops, closing sessions, reading gatherings, or learning moments connected to the movement.",
    details: [
      "Name the kind of session you are asking about.",
      "Mention whether the interest is for yourself, a group, or a campus/community circle.",
      "Use the current reading cycle as context when the inquiry is book-related.",
    ],
    actionLabel: "View Current Cycle",
    actionHref: "/current-cycle",
    icon: "discussion",
  },
];

export const contactPrinciples: readonly ContactPrinciple[] = [
  {
    title: "Use the right path",
    description:
      "Cycle questions, book suggestions, and active reading discussions belong in Telegram, the confirmed public community space.",
  },
  {
    title: "Keep consent visible",
    description:
      "Names, reflections, screenshots, and article drafts should move into public pages only with clear permission.",
  },
  {
    title: "Make the ask specific",
    description:
      "A focused message is easier to understand: who you are, what you are asking, and what book, page, or cycle it connects to.",
  },
];

export const privacyPolicy: PolicyPageContent = {
  isMock: true,
  slug: "privacy",
  eyebrow: "Privacy",
  title: "Trust starts with clear boundaries around personal information.",
  description:
    "Read & Revive is designed so visitors can understand the movement, explore books, read Voices, and enter the Telegram circle without creating an account on the public site.",
  intro: [
    "This policy explains the practical privacy posture for the public Read & Revive website. The guiding idea is simple: collect only what is needed, explain why it matters, and treat reader contributions with care.",
    "Telegram and other external platforms have their own privacy practices. When you open an external community link, that platform controls the information it collects and displays.",
  ],
  sections: [
    {
      title: "Browsing the public website",
      body: [
        "You can read public pages, browse books, view reading cycles, and read Voices without creating a reader account on this website.",
        "The public site may use basic technical logs needed for security, reliability, and performance. Those logs should not be used to build intrusive reader profiles.",
      ],
    },
    {
      title: "Messages and inquiry details",
      body: [
        "If you choose to contact Read & Revive through a public contact path, share only information you are comfortable having reviewed for that inquiry.",
        "Inquiry details are used to understand the message, respond appropriately, route the request, and protect community safety.",
      ],
      bullets: [
        "Your name or display name, if you choose to share it",
        "The contact path you use, such as Telegram",
        "The message content and any book, cycle, or article context you include",
      ],
    },
    {
      title: "Community spaces",
      body: [
        "Telegram is the confirmed active reading-circle space. Messages, usernames, reactions, and media shared there are handled through Telegram’s platform rules and privacy controls.",
        "Read & Revive community expectations still apply: avoid exposing private details, do not repost another reader’s words without permission, and keep discussion respectful.",
      ],
    },
    {
      title: "Reader writing and consent",
      body: [
        "Voices from the Circle should publish writing with clear writer permission. A reflection shared in discussion is not automatically permission to publish it on the website.",
        "Writers should be able to understand how their name, display name, bio note, book connection, and article text will appear before publication.",
      ],
    },
    {
      title: "Data care and access",
      body: [
        "Access to private inquiry details should be limited to people responsible for community care, editorial review, or operations.",
        "Personal information should not be sold. It should not be used for unrelated promotion or shared with partners without a clear reason and permission where needed.",
      ],
    },
  ],
  closingTitle: "A simple privacy posture",
  closingBody:
    "Read & Revive should feel like a thoughtful circle, not a surveillance system: browse freely, share intentionally, and publish only with consent.",
};

export const communityGuidelinesPolicy: PolicyPageContent = {
  isMock: true,
  slug: "community-guidelines",
  eyebrow: "Community guidelines",
  title: "A reading circle needs warmth, courage, and clear care.",
  description:
    "These guidelines protect the conditions that make reading, reflection, disagreement, and youth voices possible.",
  intro: [
    "Read & Revive welcomes readers who want to learn with humility, ask better questions, and turn books into meaningful conversation. The circle is not a performance stage; it is a place to practice attention and respect.",
    "Good discussion does not mean everyone agrees. It means disagreement is handled with care, privacy is respected, and no reader is pushed to share more than they choose.",
  ],
  sections: [
    {
      title: "Discuss ideas without attacking people",
      body: [
        "Challenge arguments, interpretations, and habits with care. Do not insult, mock, shame, harass, or target a reader because of identity, background, ability, belief, or level of experience.",
      ],
      bullets: [
        "Ask before assuming intent",
        "Make room for readers who are still forming their thoughts",
        "Disagree with the idea, not the dignity of the person",
      ],
    },
    {
      title: "Protect privacy and consent",
      body: [
        "Do not repost another reader’s message, voice note, image, reflection, or name outside the group without permission. A thoughtful circle depends on trust.",
        "If a reflection becomes a Voice, the writer’s permission and preferred public name should be clear before publication.",
      ],
    },
    {
      title: "Keep the circle focused",
      body: [
        "Stay close to the reading cycle, the book, the prompt, or the community question being discussed. Useful tangents are welcome; spam, unrelated promotion, and repeated disruption are not.",
      ],
    },
    {
      title: "Share with honesty",
      body: [
        "It is okay to miss a target, disagree with a book, or admit confusion. It is not okay to pretend another person’s reflection is yours, pressure people for answers, or present unverified claims as fact.",
      ],
    },
    {
      title: "Moderation and safety",
      body: [
        "Moderation should protect the reading environment. Depending on the situation, a moderator may redirect a thread, remove harmful content, ask for a pause, or limit participation in the community space.",
        "Safety concerns, harassment, privacy violations, and repeated disruption should be raised through the available community contact path.",
      ],
    },
    {
      title: "Recognition without competition",
      body: [
        "Recognition should encourage consistency, thoughtful questions, generous listening, and carefully shaped reflections. It should not turn reading into a public ranking of people’s worth.",
      ],
    },
  ],
  closingTitle: "The circle we are building",
  closingBody:
    "Bring curiosity, discipline, sincerity, and care. The goal is not to sound impressive; it is to read deeply enough that the book changes the quality of our questions.",
};
