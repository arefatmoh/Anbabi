import type {
  AboutCopy,
  AboutTrustMarker,
  AboutValue,
  CommunityPlatform,
  CommunityPrinciple,
  CommunityRhythmStep,
  ContactInquiry,
  ContactPrinciple,
  JourneyStep,
  HomeImpactStat,
  HomeProgram,
  MockBook,
  MockVoice,
  PolicyPageContent,
  ReadingCycle,
} from "@/lib/content-types";
import {
  aboutCopy,
  aboutTrustMarkers,
  aboutValues,
  communityGuidelinesPolicy,
  communityPlatforms,
  communityPrinciples,
  communityRecognition,
  communityRhythm,
  contactInquiries,
  contactPrinciples,
  mockBooks,
  privacyPolicy,
  mockCurrentCycle,
  mockVoices,
  readingJourney,
  homeImpactStats,
  homePrograms,
} from "@/lib/mock-content";

export type HomeContent = {
  currentCycle: ReadingCycle;
  featuredVoices: readonly MockVoice[];
  journey: readonly JourneyStep[];
  impactStats: readonly HomeImpactStat[];
  programs: readonly HomeProgram[];
};

export type CurrentCycleContent = {
  currentCycle: ReadingCycle;
  relatedVoices: readonly MockVoice[];
};

export type BooksContent = {
  books: readonly MockBook[];
  currentBook: MockBook;
  currentCycle: ReadingCycle;
  voices: readonly MockVoice[];
};

export type ContactContent = {
  inquiries: readonly ContactInquiry[];
  principles: readonly ContactPrinciple[];
  currentCycle: ReadingCycle;
};
export type AboutContent = {
  copy: AboutCopy;
  values: readonly AboutValue[];
  trustMarkers: readonly AboutTrustMarker[];
  journey: readonly JourneyStep[];
  currentCycle: ReadingCycle;
};
export type CommunityContent = {
  platforms: readonly CommunityPlatform[];
  rhythm: readonly CommunityRhythmStep[];
  principles: readonly CommunityPrinciple[];
  recognition: readonly string[];
  currentCycle: ReadingCycle;
};
export type BookDetailContent = {
  book: MockBook;
  currentCycle: ReadingCycle;
  relatedCycle: ReadingCycle | null;
  relatedVoices: readonly MockVoice[];
  recommendations: readonly MockBook[];
};

/**
 * Public content access boundary.
 *
 * Development currently resolves from centralized mock records. During the
 * Supabase phase, these functions become server-side database queries backed
 * by the same records and managed through the admin dashboard. Page components
 * must not import the mock dataset directly.
 */
export async function getHomeContent(): Promise<HomeContent> {
  return {
    currentCycle: mockCurrentCycle,
    featuredVoices: mockVoices.slice(0, 3),
    journey: readingJourney,
    impactStats: homeImpactStats,
    programs: homePrograms,
  };
}

export async function getCurrentCycleContent(): Promise<CurrentCycleContent> {
  return {
    currentCycle: mockCurrentCycle,
    relatedVoices: mockVoices,
  };
}

export async function getCycleBySlug(
  slug: string,
): Promise<ReadingCycle | null> {
  return slug === mockCurrentCycle.slug ? mockCurrentCycle : null;
}

export async function getCycleSlugs(): Promise<readonly string[]> {
  return [mockCurrentCycle.slug];
}

export async function getVoices(): Promise<readonly MockVoice[]> {
  return mockVoices;
}

export async function getVoiceBySlug(slug: string): Promise<MockVoice | null> {
  return mockVoices.find((voice) => voice.slug === slug) ?? null;
}

export async function getVoiceSlugs(): Promise<readonly string[]> {
  return mockVoices.map((voice) => voice.slug);
}

export async function getBooksContent(): Promise<BooksContent> {
  return {
    books: mockBooks,
    currentBook: mockCurrentCycle.book,
    currentCycle: mockCurrentCycle,
    voices: mockVoices,
  };
}

export async function getBooks(): Promise<readonly MockBook[]> {
  return mockBooks;
}

export async function getBookBySlug(slug: string): Promise<MockBook | null> {
  return mockBooks.find((book) => book.slug === slug) ?? null;
}

export async function getBookSlugs(): Promise<readonly string[]> {
  return mockBooks.map((book) => book.slug);
}

export async function getBookDetailContent(
  slug: string,
): Promise<BookDetailContent | null> {
  const book = mockBooks.find((item) => item.slug === slug);
  if (!book) return null;

  return {
    book,
    currentCycle: mockCurrentCycle,
    relatedCycle:
      mockCurrentCycle.book.slug === book.slug ? mockCurrentCycle : null,
    relatedVoices: mockVoices.filter(
      (voice) => voice.relatedBookSlug === book.slug,
    ),
    recommendations: mockBooks.filter((item) => item.slug !== book.slug),
  };
}

export async function getCommunityContent(): Promise<CommunityContent> {
  return {
    platforms: communityPlatforms,
    rhythm: communityRhythm,
    principles: communityPrinciples,
    recognition: communityRecognition,
    currentCycle: mockCurrentCycle,
  };
}

export async function getAboutContent(): Promise<AboutContent> {
  return {
    copy: aboutCopy,
    values: aboutValues,
    trustMarkers: aboutTrustMarkers,
    journey: readingJourney,
    currentCycle: mockCurrentCycle,
  };
}
export async function getContactContent(): Promise<ContactContent> {
  return {
    inquiries: contactInquiries,
    principles: contactPrinciples,
    currentCycle: mockCurrentCycle,
  };
}

export async function getPrivacyContent(): Promise<PolicyPageContent> {
  return privacyPolicy;
}

export async function getCommunityGuidelinesContent(): Promise<PolicyPageContent> {
  return communityGuidelinesPolicy;
}
