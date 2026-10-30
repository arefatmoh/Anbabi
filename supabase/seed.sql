
-- Development seed for Read & Revive / አንባቢ MVP content schema.
-- These rows are intentionally marked is_mock=true and approved_for_production=false.
-- Public RLS policies will not expose them until an admin explicitly approves/replaces them.

begin;

insert into public.books (
  slug, title, author, cover_label, cover_tone, cover_url, cover_alt, description, long_description,
  why_featured, category, themes, language, status, status_label,
  reading_time_label, reader_fit, discussion_prompts, sort_order, is_mock, approved_for_production
) values
  (
    'deep-work',
    'Deep Work',
    'Cal Newport',
    'Read & Revive Pick',
    'charcoal',
    'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
    'Deep Work by Cal Newport book cover',
    'A practical exploration of focused work, attention, and meaningful results in a distracted world.',
    'Deep Work examines the value of sustained, distraction-free concentration and the routines that make it possible. It gives readers a useful language for noticing shallow habits, protecting attention, and making room for demanding work that matters.',
    'The book gives the circle a practical question to test together: what becomes possible when we protect our attention? Its ideas move naturally from private reading into shared experiments and reflection.',
    'Productivity',
    array['Focus', 'Attention', 'Digital discipline'],
    'English',
    'recommended',
    'Recommended',
    'Read at your own rhythm',
    array['Readers rebuilding a steady reading habit', 'Students and young professionals protecting their attention', 'Anyone ready to examine distraction without chasing perfection'],
    array['Where does your best attention currently go?', 'Which shallow habit deserves a thoughtful redesign?', 'What kind of environment helps you stay with a difficult idea?'],
    10,
    true,
    false
  ),
  (
    'atomic-habits',
    'Atomic Habits',
    'James Clear',
    'Practice & Growth',
    'paper',
    'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    'Atomic Habits by James Clear book cover',
    'A clear framework for understanding how small repeated choices shape habits and identity.',
    'Atomic Habits offers a practical way to examine cues, routines, environments, and identity. Its strength is not a promise of instant transformation, but a set of concrete questions about how small systems make helpful behavior easier to repeat.',
    'This is a useful companion for readers who want to turn an insight into a repeatable practice. It works especially well with reflection because its ideas can be tested in ordinary routines.',
    'Personal Growth',
    array['Habits', 'Identity', 'Consistency'],
    'English',
    'recommended',
    'Recommended',
    'Read at your own rhythm',
    array['Readers beginning a new habit', 'People who prefer practical frameworks', 'Anyone curious about identity-based change'],
    array['Which habit already has a strong cue in your day?', 'What would make one useful action easier to repeat?', 'Which identity are your current routines reinforcing?'],
    20,
    true,
    false
  ),
  (
    'animal-farm',
    'Animal Farm',
    'George Orwell',
    'Current Reading Cycle',
    'orange',
    'https://covers.openlibrary.org/b/isbn/9780141182704-L.jpg',
    'Animal Farm by George Orwell book cover',
    'A sharp political fable about power, equality, and the distance between a promise and its practice.',
    'In George Orwell’s Animal Farm, the animals of Manor Farm rise against their owner in pursuit of a fairer life. Their new society becomes a searching story about power, language, leadership, and how ideals can be changed over time.',
    'Animal Farm invites readers to examine how leadership is exercised, how language shapes what people believe, and what it takes to hold on to shared principles.',
    'Fiction',
    array['Power', 'Equality', 'Leadership'],
    'English',
    'current',
    'Current cycle',
    'Current reading cycle',
    array['Readers who enjoy stories with deeper questions', 'Anyone interested in leadership and fairness', 'Readers who want to explore how language shapes power'],
    array['How do the animals’ original hopes change as power shifts on the farm?', 'How does language influence what the animals believe?', 'What makes a leader accountable to a community?'],
    30,
    true,
    false
  ),
  (
    'eat-that-frog', 'Eat That Frog!', 'Brian Tracy', 'Productivity & Focus', 'charcoal',
    'https://covers.openlibrary.org/b/isbn/9781576754221-L.jpg', 'Eat That Frog! by Brian Tracy book cover',
    'A practical guide to tackling important work, overcoming procrastination, and making purposeful choices about time.',
    'Brian Tracy’s Eat That Frog! offers practical approaches to identifying priorities and beginning the tasks that matter most. It invites readers to examine procrastination and make deliberate use of their time.',
    'Its practical questions about priorities make a useful starting point for reflecting on how we choose and begin meaningful work.',
    'Personal Growth', array['Focus', 'Priorities', 'Productivity'], 'English', 'completed', 'Completed', 'Completed by the circle',
    array['Readers working on procrastination', 'People looking for practical ways to set priorities', 'Anyone reflecting on how they use their time'],
    array['What important task do you tend to put off?', 'How do you decide which work matters most?', 'What helps you begin when a task feels difficult?'], 40, true, false
  ),
  (
    'who-moved-my-cheese', 'Who Moved My Cheese?', 'Spencer Johnson', 'Change & Growth', 'paper',
    'https://covers.openlibrary.org/b/isbn/9780399144462-L.jpg', 'Who Moved My Cheese? by Spencer Johnson book cover',
    'A simple story about change, uncertainty, and how we respond when familiar paths shift.',
    'Spencer Johnson’s Who Moved My Cheese? follows four characters through a maze as they respond differently to change. The story opens a conversation about habits, uncertainty, and adapting when circumstances shift.',
    'The story gives readers a shared language for discussing change and the choices we make when a familiar situation no longer serves us.',
    'Personal Growth', array['Change', 'Adaptability', 'Growth'], 'English', 'completed', 'Completed', 'Completed by the circle',
    array['Readers navigating change', 'People who enjoy short, discussion-friendly stories', 'Anyone curious about adaptability'],
    array['How do you usually respond when something familiar changes?', 'Which character’s response feels most recognizable to you?', 'What can make a new direction easier to explore?'], 50, true, false
  ),
  (
    'the-productive-muslim', 'The Productive Muslim', 'Mohammed Faris', 'Faith & Purpose', 'charcoal',
    'https://covers.openlibrary.org/b/isbn/9781905837380-L.jpg', 'The Productive Muslim: Where Faith Meets Productivity by Mohammed Faris book cover',
    'Where Faith Meets Productivity explores the relationship between faith, purposeful habits, and everyday life.',
    'In The Productive Muslim: Where Faith Meets Productivity, Mohammed Faris brings together reflections on faith and practical approaches to living and working with purpose. The book considers spiritual, physical, and social dimensions of productivity.',
    'The book opens space to consider how intention, faith, and everyday practices can shape a meaningful approach to work and life.',
    'Faith & Growth', array['Faith', 'Purpose', 'Productivity'], 'English', 'completed', 'Completed', 'Completed by the circle',
    array['Readers exploring faith and purposeful living', 'People reflecting on their daily routines', 'Anyone interested in a balanced approach to productivity'],
    array['What does a purposeful day look like to you?', 'How can intention change the way you approach an ordinary task?', 'Which daily practice helps you make space for what matters?'], 60, true, false
  )
on conflict (slug) do update set
  title = excluded.title,
  author = excluded.author,
  cover_label = excluded.cover_label,
  cover_tone = excluded.cover_tone,
  cover_url = excluded.cover_url,
  cover_alt = excluded.cover_alt,
  description = excluded.description,
  long_description = excluded.long_description,
  why_featured = excluded.why_featured,
  category = excluded.category,
  themes = excluded.themes,
  language = excluded.language,
  status = excluded.status,
  status_label = excluded.status_label,
  reading_time_label = excluded.reading_time_label,
  reader_fit = excluded.reader_fit,
  discussion_prompts = excluded.discussion_prompts,
  sort_order = excluded.sort_order,
  is_mock = excluded.is_mock,
  approved_for_production = excluded.approved_for_production;

-- Retire only the old unapproved development cycle from the featured slot.
update public.reading_cycles set featured = false
where slug = 'deep-work-reading-circle' and is_mock = true and approved_for_production = false;

insert into public.reading_cycles (
  book_id, slug, title, short_description, date_label, duration_label,
  target_label, daily_target, why_selected, reader_fit, prompts,
  telegram_link, status, status_label, featured, is_mock, approved_for_production
) values (
  (select id from public.books where slug = 'animal-farm'),
  'animal-farm-reading-circle',
  'Animal Farm Reading Circle',
  'Read George Orwell’s Animal Farm together and explore its questions about power, language, and the promises a community makes.',
  'Current reading cycle',
  'Read and reflect together',
  'Bring a question to the circle',
  'Bring a question to the circle',
  'Animal Farm gives the circle a story to explore together: how do power, language, and leadership shape a community’s shared ideals?',
  array['Readers who enjoy stories with deeper questions', 'Anyone interested in leadership and fairness', 'Curious people ready to discuss ideas with others'],
  array['How do the animals’ original hopes change as power shifts on the farm?', 'How does language influence what the animals believe?', 'What makes a leader accountable to a community?'],
  'https://t.me/ReadRevive',
  'active',
  'Current cycle',
  true,
  true,
  false
)
on conflict (slug) do update set
  book_id = excluded.book_id,
  title = excluded.title,
  short_description = excluded.short_description,
  date_label = excluded.date_label,
  duration_label = excluded.duration_label,
  target_label = excluded.target_label,
  daily_target = excluded.daily_target,
  why_selected = excluded.why_selected,
  reader_fit = excluded.reader_fit,
  prompts = excluded.prompts,
  telegram_link = excluded.telegram_link,
  status = excluded.status,
  status_label = excluded.status_label,
  featured = excluded.featured,
  is_mock = excluded.is_mock,
  approved_for_production = excluded.approved_for_production;

insert into public.blog_categories (slug, name, sort_order, active, is_mock) values
  ('reflection', 'Reflection', 10, true, true),
  ('personal-growth', 'Personal Growth', 20, true, true),
  ('reader-story', 'Reader Story', 30, true, true),
  ('book-review', 'Book Review', 40, true, true),
  ('leadership', 'Leadership', 50, true, true),
  ('faith-character', 'Faith & Character', 60, true, true),
  ('society', 'Society', 70, true, true),
  ('productivity', 'Productivity', 80, true, true),
  ('community-recap', 'Community Recap', 90, true, true),
  ('writing-expression', 'Writing & Expression', 100, true, true)
on conflict (slug) do update set
  name = excluded.name,
  sort_order = excluded.sort_order,
  active = excluded.active,
  is_mock = excluded.is_mock;

insert into public.blog_tags (slug, name, is_mock) values
  ('focus', 'Focus', true),
  ('reading-practice', 'Reading Practice', true),
  ('attention', 'Attention', true),
  ('digital-discipline', 'Digital Discipline', true),
  ('habits', 'Habits', true),
  ('technology', 'Technology', true),
  ('everyday-practice', 'Everyday Practice', true)
on conflict (slug) do update set name = excluded.name, is_mock = excluded.is_mock;

insert into public.blog_posts (
  related_book_id, related_cycle_id, category_id, slug, title, subtitle, excerpt,
  author_display_name, author_note, body, cover_key, status,
  reading_time_minutes, reading_time_label, featured, published_at,
  is_mock, approved_for_production
) values
  (
    (select id from public.books where slug = 'deep-work'),
    (select id from public.reading_cycles where slug = 'deep-work-reading-circle'),
    (select id from public.blog_categories where slug = 'reflection'),
    'what-deep-work-changed-about-my-evenings',
    'What Deep Work Changed About My Evenings',
    'One protected hour taught me that attention needs a place to land.',
    'Protecting one quiet hour changed more than my schedule; it changed the quality of the questions I could stay with.',
    'Liya M.',
    'Liya writes about reading practice, attention, and the small routines that make reflection possible.',
    $$[
      {"paragraphs":["My evenings used to disappear in fragments. I would open a book, answer one message, remember something else, and return to the page without remembering what I had just read. I called it tiredness. Deep Work made me wonder whether it was also a habit of divided attention.","So I tried one modest experiment: one quiet hour after dinner, with the phone in another room and a notebook beside the book. The rule was not to finish a chapter. The rule was to stay."]},
      {"heading":"The first difficult ten minutes","paragraphs":["The beginning was less peaceful than I expected. My mind kept offering exits?check one notification, refill the tea, look up a reference. I began writing those impulses in the margin instead of following them.","After a few evenings, the restlessness stopped feeling like an instruction. It became something I could notice and let pass."],"pullQuote":"A protected hour did not make me faster. It made me available to the idea in front of me."},
      {"heading":"Attention needs a place to land","paragraphs":["The deepest change was not productivity. It was the quality of reflection. When I stayed with a chapter long enough, I could disagree with it carefully instead of reacting quickly. I could connect it to my own routines and bring a real question to the circle.","I still have distracted evenings. But now I know that focus is not a mood I wait for. It is a place I prepare, enter, and practice returning to."]}
    ]$$::jsonb,
    'reader',
    'published',
    4,
    '4 min read',
    true,
    date '2026-05-18',
    true,
    false
  ),
  (
    (select id from public.books where slug = 'deep-work'),
    (select id from public.reading_cycles where slug = 'deep-work-reading-circle'),
    (select id from public.blog_categories where slug = 'personal-growth'),
    'boredom-is-not-the-enemy',
    'Boredom Is Not the Enemy',
    'Leaving a few pauses unfilled gave my attention room to become stronger.',
    'When every pause is filled, attention never gets the chance to become strong. I tried leaving a few pauses alone.',
    'Nahom B.',
    'Nahom explores how books can reshape ordinary choices around time, technology, and attention.',
    $$[
      {"paragraphs":["I used to treat boredom as a small emergency. A slow queue, a quiet ride, even the few minutes before a meeting became reasons to reach for my phone.","Deep Work challenged that reflex. If the mind is trained to expect novelty every few seconds, asking it to stay with a difficult page becomes much harder."]},
      {"heading":"A week of unfilled pauses","paragraphs":["For one week, I left the shortest pauses alone. No dramatic detox?just the walk to lunch, the first ten minutes of a bus ride, and the moment after finishing a task.","The pauses felt awkward before they felt spacious. Then ideas from the reading began returning on their own. A question from the circle would resurface without being forced."],"pullQuote":"Boredom became less like an empty room and more like a doorway back to my own attention."},
      {"heading":"What I kept","paragraphs":["I did not stop using my phone, and I did not become perfectly focused. I simply stopped giving every quiet second away.","That small boundary made reading easier to enter and discussion easier to remember. The mind had somewhere to continue the conversation."]}
    ]$$::jsonb,
    'notebook',
    'published',
    3,
    '3 min read',
    false,
    date '2026-05-15',
    true,
    false
  ),
  (
    (select id from public.books where slug = 'deep-work'),
    (select id from public.reading_cycles where slug = 'deep-work-reading-circle'),
    (select id from public.blog_categories where slug = 'reader-story'),
    'a-smaller-phone-a-larger-attention-span',
    'A Smaller Phone, a Larger Attention Span',
    'Simplifying my digital space helped me see which tools were quietly setting my priorities.',
    'A week of simpler digital choices helped me see which tools served my goals and which ones quietly set them.',
    'Mekdes A.',
    'Mekdes writes about intentional technology, learning, and building habits that leave room for thought.',
    $$[
      {"paragraphs":["My phone was not only a tool I used. It was also an environment I entered dozens of times a day. Every icon suggested what deserved my attention next.","While reading Deep Work, I decided to make that environment quieter. I removed the loudest shortcuts from the home screen and kept only the tools I could explain in one sentence."]},
      {"heading":"Designing for the pause","paragraphs":["The biggest difference came from adding a little friction. Social apps were still available, but reaching them required a deliberate search. That brief pause gave me a chance to ask whether I had chosen the action or merely repeated it.","I used some of those recovered moments to read two pages, write a question, or simply finish the thought I was already having."],"pullQuote":"The goal was not a smaller life with technology. It was a larger life around it."},
      {"heading":"A more intentional default","paragraphs":["After a week, I restored a few tools and left others hidden. The useful lesson was not that every app is harmful. It was that every default deserves examination.","My attention span did not transform overnight, but reading stopped competing with a screen designed to win every idle second. That was enough to keep practicing."]}
    ]$$::jsonb,
    'voices',
    'published',
    5,
    '5 min read',
    false,
    date '2026-05-12',
    true,
    false
  )
on conflict (slug) do update set
  related_book_id = excluded.related_book_id,
  related_cycle_id = excluded.related_cycle_id,
  category_id = excluded.category_id,
  title = excluded.title,
  subtitle = excluded.subtitle,
  excerpt = excluded.excerpt,
  author_display_name = excluded.author_display_name,
  author_note = excluded.author_note,
  body = excluded.body,
  cover_key = excluded.cover_key,
  status = excluded.status,
  reading_time_minutes = excluded.reading_time_minutes,
  reading_time_label = excluded.reading_time_label,
  featured = excluded.featured,
  published_at = excluded.published_at,
  is_mock = excluded.is_mock,
  approved_for_production = excluded.approved_for_production;

insert into public.blog_post_tags (blog_post_id, tag_id)
select bp.id, bt.id
from public.blog_posts bp
join public.blog_tags bt on bt.slug in ('focus', 'reading-practice', 'attention')
where bp.slug = 'what-deep-work-changed-about-my-evenings'
on conflict do nothing;

insert into public.blog_post_tags (blog_post_id, tag_id)
select bp.id, bt.id
from public.blog_posts bp
join public.blog_tags bt on bt.slug in ('digital-discipline', 'habits', 'focus')
where bp.slug = 'boredom-is-not-the-enemy'
on conflict do nothing;

insert into public.blog_post_tags (blog_post_id, tag_id)
select bp.id, bt.id
from public.blog_posts bp
join public.blog_tags bt on bt.slug in ('technology', 'attention', 'everyday-practice')
where bp.slug = 'a-smaller-phone-a-larger-attention-span'
on conflict do nothing;

insert into public.community_links (
  platform, label, url, purpose, active, sort_order, is_mock, approved_for_production
) values (
  'telegram',
  'Telegram reading circle',
  'https://t.me/ReadRevive',
  'Active reading prompts, focused discussion, reminders, and cycle updates.',
  true,
  10,
  false,
  true
)
on conflict do nothing;

insert into public.site_settings (key, value, description, public_read, is_mock, approved_for_production)
values (
  'homepage_featured_content',
  '{"currentCycleSlug":"animal-farm-reading-circle","featuredVoiceSlugs":["what-deep-work-changed-about-my-evenings","boredom-is-not-the-enemy","a-smaller-phone-a-larger-attention-span"]}'::jsonb,
  'Homepage featured content selection for the public MVP.',
  true,
  true,
  false
)
on conflict (key) do update set
  value = excluded.value,
  description = excluded.description,
  public_read = excluded.public_read,
  is_mock = excluded.is_mock,
  approved_for_production = excluded.approved_for_production;

commit;
