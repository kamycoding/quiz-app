# Kamycoding Quiz App

A small, focused quiz for testing HTML, CSS, and JavaScript basics. No frameworks on the logic side — just clean HTML, CSS, and vanilla JavaScript with a glass-style UI you can open in any browser.

![Quiz app preview](img/quiz.png)

## What it does

You land on a welcome screen, start the quiz, answer multiple-choice questions one by one, and see your score at the end. **Play again** takes you back to the start screen so you can choose when to begin — it does not restart the quiz immediately.

## Features

- **Three screens** — welcome, quiz, and results
- **Progress bar** — updates as you move through questions
- **Instant feedback** — correct and wrong answers are highlighted; the right answer is shown when you miss one
- **Sound effects** — `audio/true.mp3` on correct, `audio/wrong.mp3` on wrong
- **Glassmorphism UI** — dark theme, blurred card, floating HTML / CSS / JS icons behind the box
- **Character art** — Kamycoding mascot on welcome, end-screen character when you finish (both sit behind the card at the top edge)
- **Responsive layout** — usable on mobile and desktop
- **Accessible touches** — semantic sections, `aria-live` on results, reduced-motion support in CSS

## Quick start

You only need a browser. Because the app loads audio files, use a **local server** instead of opening `index.html` directly from the file system (`file://`), or sounds may not play reliably.

```bash
# from the project folder — pick one:

npx serve .
# or
python3 -m http.server 8000
```

Then open the URL shown in the terminal (for example `http://localhost:8000`).

## Project structure

```
quiz-app/
├── index.html      # markup and screens
├── style.css       # layout, glass UI, animations
├── script.js       # quiz logic and sounds
├── audio/
│   ├── true.mp3    # correct answer
│   └── wrong.mp3   # wrong answer
└── img/
    ├── quiz.png    # readme preview
    └── icon/       # logos and character SVGs
```

## Adding or editing questions

Open `script.js` and edit the `questions` array. Each item looks like this:

```js
{
  question: "Your question here?",
  answers: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: 0, // index of the correct option (0 = first)
}
```

Save the file and refresh the browser. The question counter and progress bar adjust automatically to the new length.

## Tech stack

| Layer   | Choice                          |
|---------|----------------------------------|
| Markup  | HTML5                            |
| Style   | Custom CSS (+ Bootstrap utilities for `d-none`) |
| Logic   | Vanilla JavaScript               |
| Fonts   | [Ubuntu](https://fonts.google.com/specimen/Ubuntu) via Google Fonts |

No build step, no npm install required to run the app.

## Flow (for contributors)

```
Welcome → Start Quiz → Questions → Results → Play again → Welcome
```

State lives in `script.js`: `currentQuestionIndex`, `score`, and `hasAnswered`. Screen visibility is toggled with Bootstrap’s `d-none` class on the three `<section>` elements.

---

Built as a learning project by **Kamycoding**.
