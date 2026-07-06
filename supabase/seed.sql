
-- Development seed for Read & Revive / አንባቢ MVP content schema.
-- These rows are intentionally marked is_mock=true and approved_for_production=false.
-- Public RLS policies will not expose them until an admin explicitly approves/replaces them.

begin;

insert into public.books (
  slug, title, author, cover_label, cover_tone, description, long_description,
  why_featured, category, themes, language, status, status_label,
  reading_time_label, reader_fit, discussion_prompts, sort_order, is_mock, approved_for_production
) values
  (
    'deep-work',
    'Deep Work',
    'Cal Newport',
    'Read & Revive Pick',
    'charcoal',
    'A practical exploration of focused work, attention, and meaningful results in a distracted world.',
    'Deep Work examines the value of sustained, distraction-free concentration and the routines that make it possible. It gives readers a useful language for noticing shallow habits, protecting attention, and making room for demanding work that matters.',
    'The book gives the circle a practical question to test together: what becomes possible when we protect our attention? Its ideas move naturally from private reading into shared experiments and reflection.',
    'Productivity',
    array['Focus', 'Attention', 'Digital discipline'],
    'English',
    'current',
    'Current cycle',
    'Four-week reading rhythm',
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
    'the-alchemist',
    'The Alchemist',
    'Paulo Coelho',
    'Story & Purpose',
    'orange',
    'A fable about purpose, uncertainty, and learning to notice what the journey is teaching.',
    'The Alchemist follows a young shepherd whose search for treasure becomes a larger meditation on courage, desire, signs, and the meaning we make from a journey. Its accessible form opens space for different readers to question what purpose and risk look like in their own lives.',
    'The story is approachable while leaving room for disagreement and interpretation. It gives a circle many entry points: ambition, fear, faith, choice, and what it means to listen carefully.',
    'Fiction',
    array['Purpose', 'Courage', 'Journey'],
    'English',
    'recommended',
    'Recommended',
    'Short reflective read',
    array['Readers returning to fiction', 'People drawn to reflective stories', 'Anyone thinking about purpose and uncertainty'],
    array['When does persistence become wisdom?and when does it become stubbornness?', 'Which part of a journey changes us most: leaving, searching, or returning?', 'What does the story suggest about listening to fear?'],
    30,
    true,
    false
  )
on conflict (slug) do update set
  title = excluded.title,
  author = excluded.author,
  cover_label = excluded.cover_label,
  cover_tone = excluded.cover_tone,
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

insert into public.reading_cycles (
  book_id, slug, title, short_description, date_label, duration_label,
  target_label, daily_target, why_selected, reader_fit, prompts,
  telegram_link, status, status_label, featured, is_mock, approved_for_production
) values (
  (select id from public.books where slug = 'deep-work'),
  'deep-work-reading-circle',
  'Deep Work Reading Circle',
  'Read Cal Newport?s Deep Work with a steady weekly rhythm, practical reflection prompts, and a circle that turns focused reading into focused action.',
  'Four-week reading cycle',
  'One focused theme each week',
  'Read daily ? reflect weekly',
  'Read daily ? reflect weekly',
  'Deep Work gives the circle a practical question: what becomes possible when we protect our attention? Its ideas invite readers to examine distraction, build stronger routines, and test focused practice in everyday study and work.',
  array['Readers rebuilding a steady reading habit', 'Students and young professionals protecting their attention', 'Curious people ready to test ideas beyond the page'],
  array['What does focused work look like in your current season of life?', 'Which environment helps your attention settle?and which one scatters it?', 'What is one shallow habit you could redesign instead of simply resisting?'],
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

delete from public.cycle_schedule
where cycle_id = (select id from public.reading_cycles where slug = 'deep-work-reading-circle');

insert into public.cycle_schedule (
  cycle_id, label, title, reading_target, prompt, week_number, display_state,
  sort_order, is_mock
) values
  ((select id from public.reading_cycles where slug = 'deep-work-reading-circle'), 'Week 1', 'The Idea of Deep Work', 'Explore why focused work is valuable, rare, and meaningful.', 'Where does your best attention currently go?', 1, 'completed', 10, true),
  ((select id from public.reading_cycles where slug = 'deep-work-reading-circle'), 'Week 2', 'Work Deeply', 'Read the first rule and design one realistic focus ritual.', 'What boundary would make focused work easier this week?', 2, 'current', 20, true),
  ((select id from public.reading_cycles where slug = 'deep-work-reading-circle'), 'Week 3', 'Train Your Attention', 'Explore boredom, distraction, and a more intentional digital life.', 'Which distraction are you willing to interrupt?', 3, 'upcoming', 30, true),
  ((select id from public.reading_cycles where slug = 'deep-work-reading-circle'), 'Week 4', 'Make Space for Depth', 'Finish the rules and shape one practice worth carrying forward.', 'What will you protect after the reading cycle ends?', 4, 'closing', 40, true);

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
  '{"currentCycleSlug":"deep-work-reading-circle","featuredVoiceSlugs":["what-deep-work-changed-about-my-evenings","boredom-is-not-the-enemy","a-smaller-phone-a-larger-attention-span"]}'::jsonb,
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
