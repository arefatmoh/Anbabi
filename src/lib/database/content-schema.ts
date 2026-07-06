export const profileRoles = [
  "reader",
  "writer",
  "moderator",
  "editor",
  "admin",
  "super_admin",
] as const;

export const bookStatuses = [
  "draft",
  "recommended",
  "current",
  "upcoming",
  "completed",
  "archived",
] as const;

export const cycleStatuses = [
  "draft",
  "upcoming",
  "active",
  "closing",
  "completed",
  "archived",
] as const;

export const timelineStates = [
  "completed",
  "current",
  "upcoming",
  "missed",
  "closing",
] as const;

export const blogPostStatuses = [
  "draft",
  "submitted",
  "under_review",
  "needs_revision",
  "approved",
  "scheduled",
  "published",
  "rejected",
  "archived",
] as const;

export const programStatuses = [
  "draft",
  "open",
  "full",
  "upcoming",
  "ongoing",
  "completed",
  "cancelled",
] as const;

export const contactMessageTypes = [
  "general",
  "partnership",
  "volunteer",
  "book_suggestion",
  "article_interest",
  "program_inquiry",
  "other",
] as const;

export const contactMessageStatuses = [
  "new",
  "read",
  "in_progress",
  "resolved",
  "archived",
  "spam",
] as const;

export type ProfileRole = (typeof profileRoles)[number];
export type DatabaseBookStatus = (typeof bookStatuses)[number];
export type DatabaseCycleStatus = (typeof cycleStatuses)[number];
export type DatabaseTimelineState = (typeof timelineStates)[number];
export type DatabaseBlogPostStatus = (typeof blogPostStatuses)[number];
export type DatabaseProgramStatus = (typeof programStatuses)[number];
export type DatabaseContactMessageType = (typeof contactMessageTypes)[number];
export type DatabaseContactMessageStatus =
  (typeof contactMessageStatuses)[number];

export const publicContentTables = [
  "books",
  "reading_cycles",
  "cycle_schedule",
  "blog_categories",
  "blog_tags",
  "blog_posts",
  "blog_post_tags",
  "programs",
  "community_links",
  "site_settings",
] as const;
