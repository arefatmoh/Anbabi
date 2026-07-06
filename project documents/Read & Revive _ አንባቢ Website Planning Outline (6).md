# **Document 7: Technical Roadmap**

## **Read & Revive / አንባቢ**

**Version:** 0.1  
**Status:** Draft for locking  
**Technical Direction:** **Next.js \+ Supabase \+ Vercel**  
**Purpose:** This document defines the long-term technical architecture, database structure, deployment plan, admin system, authentication, gamification readiness, and phase-by-phase development roadmap for Read & Revive.

---

# **1\. Core Technical Decision**

We will use **Supabase** as the main backend foundation.

## **Locked Direction**

| Layer | Selected Direction |
| ----- | ----- |
| Frontend | **Next.js \+ React \+ TypeScript** |
| Styling | **Tailwind CSS \+ custom design system** |
| Backend/database | **Supabase PostgreSQL** |
| Authentication | **Supabase Auth** |
| File/media storage | **Supabase Storage first** |
| Hosting | **Vercel** |
| Admin dashboard | **Custom admin dashboard inside the app** |
| Blog/content | **Database-managed content, not only static files** |
| Future gamification | Built into database from early structure |
| Future Telegram bot | Later phase, connected to Supabase |

Supabase is a strong fit because it provides a Postgres database, authentication, APIs, Edge Functions, Realtime, and Storage in one ecosystem. ([Supabase](https://supabase.com/?utm_source=chatgpt.com))

---

# **2\. Why Supabase Is Better for This Project**

Read & Revive is not only a public landing page. It will later need:

* User accounts  
* Reader profiles  
* Reading cycles  
* Daily check-ins  
* Reflections  
* Blog article submissions  
* Admin approval flows  
* Badges  
* Streaks  
* Leaderboards  
* Certificates  
* Media uploads  
* Telegram bot integration

Using only shared cPanel hosting would make these future features harder because we would need to build authentication, APIs, permissions, storage, and database security manually.

Supabase gives us a modern system foundation from the beginning.

---

# **3\. Recommended Architecture**

## **3.1 High-Level Architecture**

User Browser  
   ↓  
Next.js Frontend on Vercel  
   ↓  
Supabase Client / Server Actions / API Routes  
   ↓  
Supabase Services  
   ├── PostgreSQL Database  
   ├── Auth  
   ├── Storage  
   ├── Row Level Security  
   ├── Edge Functions  
   └── Realtime later

---

## **3.2 Public Website Architecture**

For Phase 1:

Public visitor  
→ Home page  
→ Current reading cycle  
→ Books  
→ Community links  
→ Voices from the Circle  
→ Blog detail  
→ Contact / submission forms

No user login is required in Phase 1, but the database should already be structured so Phase 2 can add accounts without rebuilding everything.

---

## **3.3 Future Platform Architecture**

For Phase 2 and beyond:

Reader signs up  
→ Joins reading cycle  
→ Tracks daily reading  
→ Submits reflections  
→ Earns XP/badges  
→ Appears on leaderboard  
→ Publishes articles  
→ Builds Reader Passport

---

# **4\. Technical Stack**

## **4.1 Frontend**

| Tool | Purpose |
| ----- | ----- |
| **Next.js App Router** | Main frontend framework |
| **React** | UI components |
| **TypeScript** | Safer code and long-term maintainability |
| **Tailwind CSS** | Fast styling with custom design system |
| **Framer Motion** | Smooth animations and microinteractions |
| **Lucide / custom icons** | Base icons, but customized to fit brand |
| **React Hook Form \+ Zod** | Forms and validation |
| **TanStack Query** | Future dashboard data fetching if needed |

---

## **4.2 Backend**

| Tool | Purpose |
| ----- | ----- |
| **Supabase PostgreSQL** | Main database |
| **Supabase Auth** | User login/signup |
| **Supabase Storage** | Images, covers, avatars, certificates |
| **Supabase RLS** | Database-level security |
| **Supabase Edge Functions** | Server-side actions later |
| **Next.js Server Actions/API Routes** | App-specific backend logic |

Supabase Auth supports common auth methods such as email/password, magic link, OTP, social login, and SSO; for our roadmap, we can start with email/password and later add Google or Telegram-related flows. ([Supabase](https://supabase.com/docs/guides/auth?utm_source=chatgpt.com))

---

## **4.3 Hosting and Deployment**

| Layer | Hosting |
| ----- | ----- |
| Frontend | Vercel |
| Database | Supabase |
| Auth | Supabase |
| Storage | Supabase Storage |
| Domain | Connected to Vercel |
| Email later | Resend / Brevo / SMTP provider |

Vercel is a natural fit for Next.js deployment, and environment variables can be configured per environment, such as Development, Preview, and Production. ([Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs?utm_source=chatgpt.com))

---

# **5\. Environment Setup**

## **5.1 Environments**

We should use three environments:

| Environment | Purpose |
| ----- | ----- |
| Local | Developer machine |
| Preview | Testing before production |
| Production | Public website |

---

## **5.2 Environment Variables**

Required variables:

NEXT\_PUBLIC\_SUPABASE\_URL=  
NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=  
SUPABASE\_SERVICE\_ROLE\_KEY=  
NEXT\_PUBLIC\_SITE\_URL=

Important rule:

* `NEXT_PUBLIC_` variables can be exposed to the browser.  
* Secret keys like `SUPABASE_SERVICE_ROLE_KEY` must stay server-side only.

Next.js exposes browser-available environment variables when prefixed with `NEXT_PUBLIC_`, while server-only variables should remain unprefixed. ([Next.js](https://nextjs.org/docs/pages/guides/environment-variables?utm_source=chatgpt.com))

---

# **6\. Supabase Security Foundation**

Security must be planned early.

## **6.1 Row Level Security**

Every public-facing table should have **Row Level Security enabled**.

Supabase specifically recommends enabling RLS for tables exposed through the public schema, because RLS controls what users can access directly from the client. ([Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security?utm_source=chatgpt.com))

---

## **6.2 Security Rule**

Never depend only on frontend hiding.

Bad:

Hide admin button in UI only

Good:

Use database policies and role permissions

---

## **6.3 Role-Based Access**

Future roles:

| Role | Access |
| ----- | ----- |
| Public visitor | Read published content only |
| Reader | Own profile, own reflections, own progress |
| Writer | Own article submissions |
| Moderator | Review reflections |
| Editor | Review and publish articles |
| Admin | Manage content |
| Super Admin | Full system control |

---

# **7\. Authentication Roadmap**

## **Phase 1**

No public login required.

Admin login may be included if we build an admin dashboard early.

## **Phase 2**

Reader accounts:

* Email \+ password  
* Profile creation  
* Join cycles  
* Reading progress  
* Reflections

## **Phase 3**

Additional options:

* Google login  
* Magic link  
* Telegram bot connection  
* Role-based dashboards

For Next.js SSR authentication, Supabase recommends using the `@supabase/ssr` package to configure the client with cookies. ([Supabase](https://supabase.com/docs/guides/auth/server-side/creating-a-client?utm_source=chatgpt.com))

---

# **8\. Database Design**

This is the first system-level database plan. It can be refined during development.

---

## **8.1 Main Tables**

profiles  
books  
reading\_cycles  
cycle\_participants  
reading\_checkins  
reflections  
blog\_posts  
blog\_categories  
blog\_tags  
programs  
community\_links  
badges  
user\_badges  
point\_transactions  
streaks  
leaderboards  
certificates  
contact\_messages  
article\_submissions  
notifications  
admin\_audit\_logs

---

# **9\. Core Database Tables**

## **9.1 `profiles`**

Stores user profile information connected to Supabase Auth.

profiles {  
  id uuid primary key references auth.users(id)  
  display\_name text  
  username text unique  
  avatar\_url text  
  bio text  
  role text default 'reader'  
  level integer default 1  
  xp integer default 0  
  reading\_points integer default 0  
  visibility text default 'private'  
  created\_at timestamp  
  updated\_at timestamp  
}

### **Roles**

reader  
writer  
moderator  
editor  
admin  
super\_admin

---

## **9.2 `books`**

Stores book library content.

books {  
  id uuid primary key  
  title text  
  author text  
  cover\_url text  
  description text  
  why\_selected text  
  difficulty text  
  category text  
  themes text\[\]  
  language text default 'English'  
  status text  
  created\_at timestamp  
  updated\_at timestamp  
}

### **Book Status**

draft  
recommended  
current  
upcoming  
completed  
archived

---

## **9.3 `reading_cycles`**

This is the heart of the platform.

reading\_cycles {  
  id uuid primary key  
  book\_id uuid references books(id)  
  title text  
  slug text unique  
  short\_description text  
  start\_date date  
  end\_date date  
  duration\_days integer  
  daily\_target text  
  status text  
  telegram\_link text  
  facebook\_link text  
  closing\_session\_date timestamp  
  reviewer\_name text  
  reviewer\_bio text  
  reviewer\_image\_url text  
  rewards\_description text  
  featured boolean default false  
  created\_at timestamp  
  updated\_at timestamp  
}

### **Reading Cycle Status**

draft  
upcoming  
active  
closing  
completed  
archived

---

## **9.4 `cycle_schedule`**

Stores daily or weekly reading plans.

cycle\_schedule {  
  id uuid primary key  
  cycle\_id uuid references reading\_cycles(id)  
  day\_number integer  
  week\_number integer  
  title text  
  reading\_target text  
  prompt text  
  due\_date date  
  created\_at timestamp  
}

This allows us to show:

* Day 1 target  
* Week 2 prompt  
* Today’s reading  
* Upcoming prompts  
* Timeline UI

---

## **9.5 `cycle_participants`**

Stores which users joined which cycles.

cycle\_participants {  
  id uuid primary key  
  cycle\_id uuid references reading\_cycles(id)  
  user\_id uuid references profiles(id)  
  joined\_at timestamp  
  status text  
  completion\_level text  
  progress\_percent integer default 0  
  completed\_at timestamp  
}

### **Participant Status**

joined  
active  
behind  
completed  
dropped

### **Completion Level**

basic\_finisher  
reflective\_finisher  
active\_finisher  
full\_circle\_finisher  
contributor\_finisher

---

## **9.6 `reading_checkins`**

Stores daily reading completion.

reading\_checkins {  
  id uuid primary key  
  cycle\_id uuid references reading\_cycles(id)  
  user\_id uuid references profiles(id)  
  schedule\_id uuid references cycle\_schedule(id)  
  completed boolean default false  
  completed\_at timestamp  
  note text  
  created\_at timestamp  
}

Rule:

One reading check-in per user per schedule day.

---

## **9.7 `reflections`**

Stores reader reflections.

reflections {  
  id uuid primary key  
  cycle\_id uuid references reading\_cycles(id)  
  user\_id uuid references profiles(id)  
  schedule\_id uuid references cycle\_schedule(id)  
  prompt text  
  body text  
  visibility text  
  status text  
  quality\_score integer  
  featured boolean default false  
  reviewed\_by uuid references profiles(id)  
  reviewed\_at timestamp  
  created\_at timestamp  
  updated\_at timestamp  
}

### **Reflection Status**

draft  
submitted  
approved  
featured  
needs\_revision  
rejected

---

## **9.8 `blog_posts`**

Stores published articles.

blog\_posts {  
  id uuid primary key  
  author\_id uuid references profiles(id)  
  related\_book\_id uuid references books(id)  
  related\_cycle\_id uuid references reading\_cycles(id)  
  title text  
  slug text unique  
  subtitle text  
  excerpt text  
  cover\_url text  
  body text  
  category\_id uuid references blog\_categories(id)  
  status text  
  reading\_time\_minutes integer  
  featured boolean default false  
  published\_at timestamp  
  created\_at timestamp  
  updated\_at timestamp  
}

### **Blog Status**

draft  
submitted  
under\_review  
needs\_revision  
approved  
scheduled  
published  
featured  
rejected  
archived

---

## **9.9 `article_submissions`**

For submitted articles before publication.

article\_submissions {  
  id uuid primary key  
  user\_id uuid references profiles(id)  
  related\_book\_id uuid references books(id)  
  related\_cycle\_id uuid references reading\_cycles(id)  
  title text  
  body text  
  status text  
  editor\_feedback text  
  reviewed\_by uuid references profiles(id)  
  submitted\_at timestamp  
  updated\_at timestamp  
}

---

## **9.10 `programs`**

Stores workshops and events.

programs {  
  id uuid primary key  
  title text  
  slug text unique  
  description text  
  cover\_url text  
  program\_type text  
  status text  
  start\_date timestamp  
  end\_date timestamp  
  location text  
  registration\_link text  
  created\_at timestamp  
  updated\_at timestamp  
}

---

## **9.11 `community_links`**

Stores social/community links.

community\_links {  
  id uuid primary key  
  platform text  
  label text  
  url text  
  purpose text  
  active boolean default true  
  created\_at timestamp  
}

Examples:

Telegram Reading Circle  
Facebook Community  
Instagram Page

---

# **10\. Gamification Database Tables**

These are not all needed in Phase 1, but the database should be designed with them in mind.

---

## **10.1 `badges`**

badges {  
  id uuid primary key  
  name text  
  slug text unique  
  description text  
  category text  
  requirement\_type text  
  requirement\_value integer  
  rarity text  
  tier text  
  icon\_url text  
  xp\_reward integer default 0  
  is\_hidden boolean default false  
  is\_repeatable boolean default false  
  is\_manual boolean default false  
  active boolean default true  
  created\_at timestamp  
}

---

## **10.2 `user_badges`**

user\_badges {  
  id uuid primary key  
  user\_id uuid references profiles(id)  
  badge\_id uuid references badges(id)  
  related\_cycle\_id uuid references reading\_cycles(id)  
  related\_book\_id uuid references books(id)  
  awarded\_by uuid references profiles(id)  
  note text  
  earned\_at timestamp  
}

---

## **10.3 `point_transactions`**

Use transactions instead of only storing total points. This gives audit history.

point\_transactions {  
  id uuid primary key  
  user\_id uuid references profiles(id)  
  action\_type text  
  xp\_amount integer default 0  
  reading\_points\_amount integer default 0  
  related\_cycle\_id uuid references reading\_cycles(id)  
  related\_reflection\_id uuid references reflections(id)  
  related\_badge\_id uuid references badges(id)  
  reason text  
  created\_at timestamp  
}

---

## **10.4 `streaks`**

streaks {  
  id uuid primary key  
  user\_id uuid references profiles(id)  
  streak\_type text  
  current\_count integer default 0  
  longest\_count integer default 0  
  last\_completed\_date date  
  grace\_days\_used integer default 0  
  freezes\_available integer default 0  
  status text  
  updated\_at timestamp  
}

### **Streak Types**

daily\_reading  
reflection  
weekly\_consistency  
cycle\_completion

---

## **10.5 `certificates`**

certificates {  
  id uuid primary key  
  user\_id uuid references profiles(id)  
  cycle\_id uuid references reading\_cycles(id)  
  certificate\_type text  
  certificate\_code text unique  
  certificate\_url text  
  issued\_at timestamp  
}

---

# **11\. MVP Database Tables**

For Phase 1, we do not need to build everything.

## **Must Build First**

| Table | Why |
| ----- | ----- |
| `books` | Book library |
| `reading_cycles` | Current cycle |
| `cycle_schedule` | Timeline |
| `blog_posts` | Voices from the Circle |
| `blog_categories` | Blog organization |
| `blog_tags` | Blog filtering |
| `programs` | Events/workshops |
| `community_links` | Telegram/Facebook |
| `contact_messages` | Contact form |
| `article_submissions` | Optional early submissions |
| `profiles` | Needed if admin login exists |

---

## **Build Later**

| Table | Phase |
| ----- | ----- |
| `cycle_participants` | Phase 2 |
| `reading_checkins` | Phase 2 |
| `reflections` | Phase 2 |
| `badges` | Phase 3 |
| `user_badges` | Phase 3 |
| `point_transactions` | Phase 3 |
| `streaks` | Phase 3 |
| `leaderboards` | Phase 3 |
| `certificates` | Phase 3 |

---

# **12\. Admin Dashboard Roadmap**

## **12.1 Phase 1 Admin Dashboard**

Admin should manage:

* Books  
* Reading cycles  
* Cycle schedule  
* Blog posts  
* Blog categories  
* Programs  
* Community links  
* Contact messages  
* Article submissions

---

## **12.2 Admin Pages**

/admin  
/admin/books  
/admin/cycles  
/admin/cycles/\[id\]/schedule  
/admin/blog  
/admin/programs  
/admin/community-links  
/admin/messages  
/admin/submissions  
/admin/settings

---

## **12.3 Future Admin Pages**

/admin/users  
/admin/reflections  
/admin/badges  
/admin/leaderboards  
/admin/certificates  
/admin/reports  
/admin/moderation

---

# **13\. Website Pages to Build**

## **13.1 Public Pages**

| Page | Route |
| ----- | ----- |
| Home | `/` |
| Current Cycle | `/current-cycle` |
| Cycle Detail | `/cycles/[slug]` |
| Books | `/books` |
| Book Detail | `/books/[slug]` |
| Voices from the Circle | `/voices` |
| Article Detail | `/voices/[slug]` |
| Programs | `/programs` |
| Program Detail | `/programs/[slug]` |
| Community | `/community` |
| About | `/about` |
| Contact | `/contact` |

---

## **13.2 Future User Pages**

| Page | Route |
| ----- | ----- |
| Dashboard | `/dashboard` |
| Profile | `/profile` |
| Reader Passport | `/passport` |
| My Cycles | `/dashboard/cycles` |
| My Reflections | `/dashboard/reflections` |
| My Badges | `/dashboard/badges` |
| Leaderboard | `/leaderboard` |
| Certificates | `/dashboard/certificates` |

---

# **14\. Frontend Component System**

The UI must follow Document 4\.

## **14.1 Core Components**

Navbar  
Footer  
PrimaryButton  
SecondaryButton  
SectionHeader  
BookCard  
CycleCard  
CurrentCycleHero  
ReadingTimeline  
BlogCard  
ReflectionCard  
ProgramCard  
BadgeCard  
StreakCard  
LeaderboardPreview  
CTASection  
DoodleDecoration  
StatusChip  
CategoryChip  
ProgressRing

---

## **14.2 Important Rule**

Do not use a generic component library look.

If we use tools like shadcn/ui or Radix UI, they should be treated only as accessibility/functionality foundations. The final UI must be custom:

* Orange/black/cream  
* Doodles  
* Scribbles  
* Sticker labels  
* Playful cards  
* Editorial typography  
* Gamified progress elements

---

# **15\. Storage Plan**

## **15.1 Supabase Storage Buckets**

| Bucket | Content |
| ----- | ----- |
| `book-covers` | Book cover images |
| `blog-covers` | Blog article images |
| `program-images` | Program/event images |
| `avatars` | User profile images |
| `badge-icons` | Badge graphics |
| `certificates` | Generated certificate files |
| `site-assets` | General site illustrations/doodles |

Supabase Storage is integrated with Postgres and supports access policies, which helps us protect private files while keeping public assets visible. ([Supabase](https://supabase.com/docs?utm_source=chatgpt.com))

---

## **15.2 Public vs Private Buckets**

| Bucket | Access |
| ----- | ----- |
| Book covers | Public |
| Blog covers | Public |
| Program images | Public |
| Badge icons | Public |
| Avatars | Public or controlled |
| Certificates | Private or signed URL |
| Article attachments | Private until approved |

---

# **16\. Content Management Strategy**

## **16.1 Why Database Content**

We should store books, cycles, blogs, and programs in the database because:

* Admins can update content without code.  
* Blog articles can later come from user submissions.  
* Reading cycles need statuses and dates.  
* The same book can appear in multiple cycles.  
* Future dashboards can connect content to users.

---

## **16.2 Publishing Flow**

Admin creates book  
→ Admin creates reading cycle  
→ Admin adds schedule/prompts  
→ Cycle appears as upcoming/active  
→ Users join through CTA  
→ Blog articles linked to cycle  
→ Cycle completed and archived

---

# **17\. Forms and Submissions**

## **17.1 Phase 1 Forms**

Recommended forms:

| Form | Route | Stored In |
| ----- | ----- | ----- |
| Contact form | `/contact` | `contact_messages` |
| Book suggestion | `/contact` or `/suggest-book` | `book_suggestions` |
| Article submission interest | `/submit` | `article_submissions` |
| Partnership inquiry | `/contact` | `contact_messages` |
| Volunteer interest | `/contact` | `contact_messages` |

---

## **17.2 Contact Messages Table**

contact\_messages {  
  id uuid primary key  
  name text  
  email text  
  subject text  
  message text  
  message\_type text  
  status text default 'new'  
  created\_at timestamp  
}

---

# **18\. Email and Notifications**

## **18.1 Phase 1**

Start simple:

* Store form submissions in Supabase.  
* Optionally send email notifications to admin.

Possible email services:

* Resend  
* Brevo  
* SMTP email provider

---

## **18.2 Future Notifications**

Later:

* Daily reading reminders  
* Badge earned  
* Reflection approved  
* Article published  
* Closing session reminder  
* New cycle announcement

Channels:

Website notification  
Email  
Telegram bot

---

# **19\. Telegram Bot Roadmap**

Telegram bot should not be built first, but we should prepare for it.

## **19.1 Future Bot Features**

* Daily reading reminder  
* Mark reading complete  
* Submit short reflection  
* View streak  
* View current cycle  
* Receive prompt  
* Badge notifications  
* Closing session reminder  
* Admin announcements

---

## **19.2 Bot Architecture Later**

Telegram User  
→ Telegram Bot  
→ Supabase Edge Function / API Route  
→ Supabase Database  
→ User progress updated

Supabase Edge Functions can be used later for server-side logic connected to external services like Telegram. Supabase lists Edge Functions as part of its platform services. ([Supabase](https://supabase.com/?utm_source=chatgpt.com))

---

# **20\. Phase-by-Phase Roadmap**

---

# **Phase 0: Planning and Setup**

## **Goal**

Prepare project foundation.

## **Tasks**

* Create GitHub repository.  
* Create Supabase project.  
* Create Vercel project.  
* Set up Next.js app.  
* Set up Tailwind CSS.  
* Set up Supabase client.  
* Set up environment variables.  
* Define database migrations.  
* Create design tokens from Document 4\.  
* Prepare initial content.

## **Output**

Project foundation ready

---

# **Phase 1: Public Website MVP**

## **Goal**

Launch beautiful public website with database-managed content.

## **Features**

### **Public**

* Home page  
* Current Reading Cycle page  
* Books page  
* Book detail page  
* Voices from the Circle page  
* Article detail page  
* Community page  
* Programs page  
* About page  
* Contact page

### **Admin**

* Admin login  
* Manage books  
* Manage reading cycles  
* Manage cycle schedule  
* Manage blog posts  
* Manage programs  
* Manage community links  
* View contact messages

### **Data**

* Books  
* Reading cycles  
* Blog posts  
* Programs  
* Community links  
* Contact messages

## **Output**

Public website launched  
Admin can manage content  
Users can join Telegram/Facebook reading cycle

---

# **Phase 2: Reader Accounts and Profiles**

## **Goal**

Allow users to officially join and track reading.

## **Features**

* Sign up/login  
* Reader profile  
* Join reading cycle  
* My current cycle  
* Mark reading complete  
* Submit reflection  
* Basic progress percentage  
* Basic reading history

## **Output**

Users can track reading progress

---

# **Phase 3: Gamification System**

## **Goal**

Add streaks, badges, XP, and leaderboards.

## **Features**

* XP system  
* Reading Points  
* Streak tracking  
* Grace days  
* Streak freezes  
* Badge wall  
* Badge unlock logic  
* Weekly leaderboard  
* Cycle leaderboard  
* Completion levels  
* Reader Passport first version

## **Output**

Reading becomes visible, rewarding, and trackable

---

# **Phase 4: Article Submission and Editorial System**

## **Goal**

Build full youth publishing workflow.

## **Features**

* User article submission  
* Editor review dashboard  
* Revision feedback  
* Article approval  
* Publish article to Voices from the Circle  
* Author profile  
* Published Voice badge

## **Output**

Readers become contributors

---

# **Phase 5: Certificates and Recognition**

## **Goal**

Formalize completion and recognition.

## **Features**

* Completion certificate generation  
* Certificate verification code  
* Certificate PDF/image generation  
* QR verification page  
* Reader achievements page  
* Cycle finisher list

## **Output**

Completion becomes credible and shareable

---

# **Phase 6: Telegram Bot and Automation**

## **Goal**

Connect the community platform with Telegram.

## **Features**

* Telegram bot account linking  
* Daily reminders  
* Reading check-ins through Telegram  
* Reflection submission through bot  
* Badge notifications  
* Closing session reminders  
* Admin announcements

## **Output**

Website and Telegram become one connected ecosystem

---

# **Phase 7: Advanced Community Platform**

## **Goal**

Scale the movement.

## **Features**

* Campus circles  
* City circles  
* Team challenges  
* Mentor system  
* Reader ambassadors  
* Advanced analytics  
* Annual reading awards  
* Mobile app consideration

## **Output**

Read & Revive becomes a scalable national reading platform

---

# **21\. Development Priority**

## **Build First**

Design system  
Database schema  
Public pages  
Admin dashboard  
Current cycle system  
Blog system  
Community links  
Contact forms

## **Build Second**

Auth  
Profiles  
Cycle join  
Reading progress  
Reflections

## **Build Third**

XP  
Badges  
Streaks  
Leaderboards  
Certificates  
Telegram bot

---

# **22\. Recommended Folder Structure**

read-and-revive/  
├── app/  
│   ├── page.tsx  
│   ├── current-cycle/  
│   ├── cycles/  
│   ├── books/  
│   ├── voices/  
│   ├── programs/  
│   ├── community/  
│   ├── about/  
│   ├── contact/  
│   ├── dashboard/  
│   └── admin/  
├── components/  
│   ├── ui/  
│   ├── layout/  
│   ├── books/  
│   ├── cycles/  
│   ├── blog/  
│   ├── gamification/  
│   └── admin/  
├── lib/  
│   ├── supabase/  
│   ├── utils/  
│   ├── validators/  
│   └── constants/  
├── hooks/  
├── styles/  
├── public/  
│   ├── doodles/  
│   ├── illustrations/  
│   └── icons/  
├── supabase/  
│   ├── migrations/  
│   └── seed.sql  
└── types/

---

# **23\. API and Data Access Rules**

## **23.1 Public Data**

Public pages can read:

* Published blog posts  
* Active/upcoming/completed cycles  
* Public books  
* Public programs  
* Active community links

## **23.2 Private Data**

Only authenticated users can read:

* Own profile  
* Own progress  
* Own reflections  
* Own certificates

## **23.3 Admin Data**

Only admin/editor/moderator roles can access:

* Unpublished blog posts  
* Submissions  
* Contact messages  
* Reflection review queue  
* User management  
* Badge management

---

# **24\. Row Level Security Policy Direction**

## **24.1 Example Policy Thinking**

### **Books**

Anyone can read published books.  
Only admins can create/update/delete books.

### **Blog Posts**

Anyone can read published posts.  
Authors can read their own drafts.  
Editors/admins can review all submissions.  
Only editors/admins can publish.

### **Reflections**

Users can create their own reflections.  
Users can read their own private reflections.  
Public/featured reflections can be read by anyone.  
Moderators/admins can review submitted reflections.

### **Profiles**

Users can read public profiles.  
Users can update only their own profile.  
Admins can manage roles.

---

# **25\. Performance and SEO**

## **25.1 Performance Goals**

The public website should be:

* Fast on mobile  
* Optimized images  
* Lightweight animations  
* Good Core Web Vitals  
* Clean routes  
* SEO-friendly

## **25.2 SEO Basics**

Each page should have:

* Page title  
* Meta description  
* Open Graph image  
* Clean URL slug  
* Structured headings  
* Descriptive alt text  
* Sitemap  
* Robots.txt

---

# **26\. Analytics Plan**

## **26.1 Phase 1 Metrics**

Track:

* Homepage visits  
* Current cycle page visits  
* Join CTA clicks  
* Telegram link clicks  
* Facebook link clicks  
* Blog article views  
* Contact submissions  
* Book page views

## **26.2 Phase 2 Metrics**

Track:

* Signups  
* Cycle joins  
* Daily check-ins  
* Reflection submissions  
* Completion rate  
* Returning readers

## **26.3 Phase 3 Metrics**

Track:

* Badge unlocks  
* Average streak length  
* Leaderboard participation  
* XP growth  
* Certificate generation

Possible tools:

* Vercel Analytics  
* Plausible  
* PostHog  
* Google Analytics

---

# **27\. Backup and Data Safety**

## **27.1 Backup Needs**

Important data:

* Users  
* Profiles  
* Reflections  
* Articles  
* Reading progress  
* Certificates  
* Badges  
* Submissions

## **27.2 Safety Rules**

* Use migrations for database changes.  
* Keep code in GitHub.  
* Export important content regularly.  
* Do not delete user content permanently without archive/soft delete.  
* Keep admin audit logs.

---

# **28\. Admin Audit Logs**

For long-term seriousness, create an audit system later.

admin\_audit\_logs {  
  id uuid primary key  
  admin\_id uuid references profiles(id)  
  action text  
  entity\_type text  
  entity\_id uuid  
  old\_value jsonb  
  new\_value jsonb  
  created\_at timestamp  
}

This helps track:

* Who published an article  
* Who changed a cycle  
* Who awarded a badge  
* Who deleted content  
* Who changed user role

---

# **29\. Testing and Quality Assurance**

## **29.1 Phase 1 Testing**

Test:

* Mobile responsiveness  
* CTA buttons  
* Telegram/Facebook links  
* Blog article reading  
* Contact form  
* Admin login  
* Admin content create/edit/delete  
* SEO metadata  
* Image loading  
* 404 page  
* Loading states  
* Empty states

---

## **29.2 Future Testing**

Test:

* Auth flows  
* RLS policies  
* User permissions  
* Reflection submission  
* Badge unlock logic  
* Streak logic  
* Certificate generation  
* Leaderboard fairness  
* Telegram bot commands

---

# **30\. Development Workflow**

## **30.1 Recommended Workflow**

Design in Figma  
→ Build components  
→ Connect Supabase  
→ Test locally  
→ Push to GitHub  
→ Vercel preview deployment  
→ Review  
→ Merge to production

---

## **30.2 Branching**

main        \= production  
develop     \= active development  
feature/\*   \= individual features  
fix/\*       \= bug fixes

---

# **31\. Launch Checklist**

## **31.1 Before MVP Launch**

### **Technical**

* Supabase project created  
* Database tables created  
* RLS enabled  
* Admin account created  
* Vercel deployment working  
* Domain connected  
* Environment variables configured  
* Contact form working  
* Images optimized  
* Analytics installed

### **Content**

* Home content ready  
* Current cycle content ready  
* At least 3 books added  
* At least 3 articles added  
* Community links added  
* About page ready  
* Programs page ready or hidden  
* Contact info ready

### **Design**

* Mobile homepage polished  
* Current cycle page polished  
* Blog detail page polished  
* Doodles/illustrations consistent  
* Buttons and cards consistent  
* Footer complete

---

# **32\. Risk Management**

## **32.1 Possible Risks**

| Risk | Solution |
| ----- | ----- |
| UI becomes generic | Follow Document 4 strictly |
| Content becomes random | Follow Document 5 |
| Community becomes inactive | Follow Document 6 weekly rhythm |
| Database becomes messy | Use migrations and clear schema |
| Gamification becomes spammy | Use anti-spam rules from Document 3 |
| Admin dashboard becomes too large | Build in phases |
| Too much built at once | MVP first, system-ready structure |
| RLS mistakes expose data | Test policies carefully before launch |

---

# **33\. Recommended Build Order**

## **Sprint 1: Foundation**

* Project setup  
* Supabase setup  
* Design tokens  
* Basic layout  
* Navbar/footer  
* Database migrations

## **Sprint 2: Public Core**

* Home page  
* Current cycle page  
* Books page  
* Community page  
* About page

## **Sprint 3: Content System**

* Blog listing  
* Blog detail  
* Programs page  
* Contact form  
* Database connection

## **Sprint 4: Admin MVP**

* Admin login  
* Manage books  
* Manage cycles  
* Manage blog posts  
* Manage community links  
* Manage contact messages

## **Sprint 5: Polish and Launch**

* Mobile polish  
* Animation polish  
* SEO  
* Analytics  
* Testing  
* Production deployment

---

# **34\. Technical Decisions to Lock**

| Area | Decision |
| ----- | ----- |
| Backend | Supabase |
| Database | PostgreSQL |
| Frontend | Next.js \+ TypeScript |
| Hosting | Vercel |
| Styling | Tailwind CSS \+ custom design system |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Admin | Custom dashboard |
| Blog | Database-managed |
| Security | RLS from beginning |
| MVP login | Admin only, public users no login first |
| Future login | Reader accounts in Phase 2 |
| Gamification | Database-ready, built in Phase 3 |
| Telegram bot | Later phase |

---

# **35\. Final Technical Summary**

Read & Revive should be built as a **system-ready platform**, not a simple static website.

The first launch will focus on:

Public website  
\+ Current reading cycle  
\+ Book library  
\+ Voices from the Circle  
\+ Community links  
\+ Admin-managed content

The future platform will grow into:

Reader accounts  
\+ Progress tracking  
\+ Reflections  
\+ Streaks  
\+ Badges  
\+ Leaderboards  
\+ Certificates  
\+ Telegram bot integration

The recommended architecture is:

Next.js frontend on Vercel  
\+ Supabase PostgreSQL database  
\+ Supabase Auth  
\+ Supabase Storage  
\+ Supabase RLS  
\+ Custom admin dashboard

This gives us the flexibility to launch quickly now while still preparing for the full long-term reading ecosystem.

---

