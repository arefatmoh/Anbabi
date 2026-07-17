export type CycleStatus =
  "draft" | "upcoming" | "active" | "closing" | "completed" | "archived";

export type TimelineState =
  "completed" | "current" | "upcoming" | "missed" | "closing";

export type BookStatus = "current" | "completed-cycle" | "recommended";
export type BookCoverTone = "charcoal" | "orange" | "paper";

export type BookCoverImage = {
  src: string;
  alt: string;
  sourceLabel?: string;
};

export type MockBook = {
  isMock: true;
  slug: string;
  title: string;
  author: string;
  coverLabel: string;
  coverTone: BookCoverTone;
  coverImage?: BookCoverImage;
  description: string;
  longDescription: string;
  themes: readonly string[];
  category: string;
  status: BookStatus;
  statusLabel: string;
  language: string;
  readingTime: string;
  whyFeatured: string;
  readerFit: readonly string[];
  discussionPrompts: readonly string[];
};

export type ScheduleStep = {
  id: string;
  label: string;
  title: string;
  readingTarget: string;
  prompt: string;
  state: TimelineState;
};

export type ReadingCycle = {
  isMock: true;
  slug: string;
  status: CycleStatus;
  statusLabel: string;
  title: string;
  shortDescription: string;
  book: MockBook;
  dateLabel: string;
  durationLabel: string;
  targetLabel: string;
  whySelected: string;
  readerFit: readonly string[];
  schedule: readonly ScheduleStep[];
  prompts: readonly string[];
};

export type JourneyStep = {
  title: string;
  description: string;
};

export type ArticleSection = {
  heading?: string;
  paragraphs: readonly string[];
  pullQuote?: string;
};

export type MockVoice = {
  isMock: true;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  authorNote: string;
  category: string;
  tags: readonly string[];
  publishedLabel: string;
  readingTime: string;
  relatedBook: string;
  relatedBookSlug: string;
  featured: boolean;
  cover: "voices" | "notebook" | "reader";
  sections: readonly ArticleSection[];
};

export type CommunityPlatform = {
  isMock: true;
  id: "telegram" | "website" | "facebook";
  name: string;
  role: string;
  description: string;
  highlights: readonly string[];
  actionLabel?: string;
  actionHref?: string;
  external?: boolean;
  featured?: boolean;
  icon: "discussion" | "book" | "share";
};

export type CommunityRhythmStep = {
  id: string;
  label: string;
  title: string;
  description: string;
};

export type CommunityPrinciple = {
  title: string;
  description: string;
};

export type AboutValue = {
  title: string;
  description: string;
};

export type AboutTrustMarker = {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
};

export type AboutCopy = {
  isMock: true;
  definition: string;
  problem: readonly string[];
  mission: string;
  vision: string;
};

export type ContactInquiry = {
  isMock: true;
  id:
    | "general"
    | "partnership"
    | "volunteer"
    | "book-suggestion"
    | "article-interest"
    | "program";
  title: string;
  label: string;
  description: string;
  details: readonly string[];
  actionLabel: string;
  actionHref: string;
  external?: boolean;
  icon: "envelope" | "discussion" | "book" | "notebook";
};

export type ContactPrinciple = {
  title: string;
  description: string;
};

export type PolicySection = {
  title: string;
  body: readonly string[];
  bullets?: readonly string[];
};

export type PolicyPageContent = {
  isMock: true;
  slug: "privacy" | "community-guidelines";
  eyebrow: string;
  title: string;
  description: string;
  intro: readonly string[];
  sections: readonly PolicySection[];
  closingTitle: string;
  closingBody: string;
};
