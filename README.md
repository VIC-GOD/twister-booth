# Interpreter Games

Training games for interpreters and public speakers in English, French, German and sign language.

Play: https://vic-god.github.io/twister-booth/

- Twister Booth: tongue twisters, with live rooms (everyone on their own device, 4-letter code, no account)
- Idiom Booth: idioms and press language
- Booth Gym: booth drills
- Capital Relay: world capitals
- Open Floor / Sujet libre / Freie Rede: impromptu speaking topic cards
- Printable card PDFs and a level test with a 12-week plan in `print/`

## Learn and Lane Runner

- `learn/`: study pages for every game (`#capitals`, `#idioms`, `#twister`, `#booth`, `#topics`).
- `runner/`: Lane Runner. Switch to the lane with the right answer. Packs: capitals, idioms, false friends, acronyms, register, mix. Challenge links (`?seed=…&beat=…`) give friends the same questions.
- `content/data.js`: shared content used by both.
- `climb/`: Monkey Climb, a tree-climbing quiz race against computer monkeys or friends online. Built from `tools/climb-src.html` plus the shared question code in `runner/index.html` (`python3 tools/build-climb.py`).
- `match/`: Match Rush, timed pair matching.
- `live/sfx.js` (music, sounds, vibration), `live/xp.js` (XP, levels, day streaks), `live/teleprompter.js`, `live/vocab.js`.
- `flags/`: country flag SVGs from flag-icons (MIT, see `flags/LICENSE-flag-icons.txt`).

## Phase 1 of the design document
- `numbers/` Number Avalanche (EN, FR/BE/CH, DE, PT/BR; `live/numwords.js` writes numbers in words), daily challenge.
- `minefield/` False Friends Minefield (`live/falsefriends.js`).
- `shadow/` Shadow Boss (`live/speeches.js`, speech synthesis + speech recognition).
- `filler/` Filler Hunter (speech recognition or partner mode).
- `fingerspell/` Fingerspelling Rush (ASL hand drawings in `asl/`, from handsign-multilingual, BSD-2).
- `synonyms/` Word Web: synonyms, antonyms, odd one out and "say it 3 ways" in EN, FR, DE, PT. Data in `content/synonyms.js` (88 aligned groups); `node tools/check-synonyms.js` rejects any word used twice in a language. Printable decks in `print/synonyms/`.
- `progress/` dashboard: career ranks, streak + weekly freeze, daily goal, badges, metrics, error bank reviews (1, 3, 7, 21 days). Logic in `live/xp.js`.

## God Love (new app, preview)
- `app/`: the new platform shell. Onboarding (interpreter / translator, language combination, level, daily goal), then 5 tabs: Today, Learn, Practice, Games, Dictionary, plus Profile.
- `app/catalog.js` languages, games by skill, verified EU SCICtrain video links. `app/learn.js` learning modules. `app/practice.js` corrected translation sentences, grammar sheets and the correction engine. `app/i18n.js` interface text (FR, EN, DE).
- Reuses `content/`, `live/xp.js` (XP, streak, error bank) and all the existing games.
