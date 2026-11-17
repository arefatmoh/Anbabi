import type { MockBook } from "@/lib/content-types";

type UpcomingBook = {
  slug: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  themes: string[];
  description: string;
  question: string;
  tone: MockBook["coverTone"];
};

const upcomingTitles: readonly UpcomingBook[] = [
  { slug: "the-daily-stoic", title: "The Daily Stoic", author: "Ryan Holiday and Stephen Hanselman", isbn: "9780735211735", category: "Personal Growth", themes: ["Philosophy", "Reflection"], description: "Daily reflections on Stoic philosophy and the practice of living thoughtfully.", question: "Which idea helps you meet an ordinary day with more intention?", tone: "charcoal" },
  { slug: "the-courage-to-be-disliked", title: "The Courage to Be Disliked", author: "Ichiro Kishimi and Fumitake Koga", isbn: "9781501197277", category: "Personal Growth", themes: ["Psychology", "Courage"], description: "A conversation about Adlerian psychology, freedom, and the choices that shape a life.", question: "What does the book ask you to reconsider about freedom and belonging?", tone: "paper" },
  { slug: "the-art-of-thinking-clearly", title: "The Art of Thinking Clearly", author: "Rolf Dobelli", isbn: "9781444759563", category: "Personal Growth", themes: ["Thinking", "Decisions"], description: "An exploration of common thinking errors and the choices they can influence.", question: "Which thinking habit would you like to notice more carefully?", tone: "paper" },
  { slug: "dopamine-nation", title: "Dopamine Nation", author: "Anna Lembke", isbn: "9781524746728", category: "Personal Growth", themes: ["Habits", "Balance"], description: "A look at pleasure, habit, and the search for balance in an age of easy access.", question: "What helps you find balance in your everyday habits?", tone: "orange" },
  { slug: "digital-minimalism", title: "Digital Minimalism", author: "Cal Newport", isbn: "9780525536512", category: "Productivity", themes: ["Technology", "Focus", "Productivity"], description: "A thoughtful approach to choosing how technology fits into the life you value.", question: "Which digital tools support what matters most to you?", tone: "charcoal" },
  { slug: "the-psychology-of-money", title: "The Psychology of Money", author: "Morgan Housel", isbn: "9780857197689", category: "Personal Growth", themes: ["Money", "Decisions"], description: "Stories about the human choices, habits, and experiences that shape our relationship with money.", question: "How have your experiences shaped the way you think about money?", tone: "paper" },
  { slug: "essentialism", title: "Essentialism", author: "Greg McKeown", isbn: "9780804137386", category: "Productivity", themes: ["Focus", "Priorities", "Productivity"], description: "An invitation to identify what matters most and make space for it with greater intention.", question: "What deserves more of your time, and what could you let go?", tone: "orange" },
];

export const upcomingBooks: readonly MockBook[] = upcomingTitles.map((book) => ({
  isMock: true,
  slug: book.slug,
  title: book.title,
  author: book.author,
  coverLabel: "On the reading shelf",
  coverTone: book.tone,
  coverImage: {
    src: `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`,
    alt: `${book.title} by ${book.author} book cover`,
    sourceLabel: "Open Library cover",
  },
  description: book.description,
  longDescription: book.description,
  themes: book.themes,
  category: book.category,
  status: "upcoming",
  statusLabel: "Upcoming read",
  language: "English",
  readingTime: "On the reading shelf",
  whyFeatured: `${book.description} It offers a starting point for reading, reflection, and conversation.`,
  readerFit: ["Readers curious about this subject", "Anyone who enjoys sharing ideas from a book"],
  discussionPrompts: [book.question],
}));
