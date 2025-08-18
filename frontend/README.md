## Penny.ai — Frontend

This repository contains the frontend for Penny.ai — a React + TypeScript application built with Vite. It includes UI components, pages, contexts, hooks, and asset bundles used by the web app.

Below you'll find a short quick-start, available npm scripts, an overview of the tech stack, and the project's file structure.

## Quick start

Prerequisites
- Node.js 16+ (Node 18 recommended)
- npm (or use a compatible package manager)

Install dependencies:

```bash
npm install
```

Run the dev server (Vite):

```bash
npm run dev
```

Build for production (type-check + Vite build):

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Run ESLint across the project:

```bash
npm run lint
```

## Available npm scripts

- `dev`: start Vite dev server (command: `vite --host`)
- `build`: run `tsc -b && vite build` (performs TypeScript build then Vite production build)
- `lint`: run `eslint .`
- `preview`: run `vite preview`

These are taken directly from `package.json`.

## Tech stack / notable libraries

- React 19 + TypeScript
- Vite (bundler/development server)
- Tailwind CSS
- @headlessui/react, @heroicons/react
- framer-motion (animations)
- lottie-react (animations)
- recharts (charts)
- axios (HTTP)
- jwt-decode

## Project file structure

Top-level:

```
eslint.config.js
index.html
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
public/
  car.svg
  penny.svg
  vite.svg
src/
  App.tsx
  index.css
  main.tsx
  RootLayout.tsx
  router.tsx
  vite-env.d.ts
  assets/
    Back.svg
    Left.svg
    Penny.svg
    react.svg
    Right.svg
    lottie/
      Animation404.json
      Connection error.json
      load traffic.json
      loading.json
      Loading.json
      Smoking wheel.json
      Vehicle.json
  components/
    AudioEqualizer.tsx
    Footer.tsx
    LoadingComp.tsx
    Modal.tsx
    Navbar.tsx
    Chat/
      AudioModal.tsx
      ChatSidebar.tsx
      ChatWindow.tsx
      MessageBubble.tsx
      MessageInput.tsx
      VoiceRecorder.tsx
    Customize/
      ChoiceCard.tsx
      CustomizeFlow.tsx
      InputField.tsx
      RememberList.tsx
    History/
      HistoryItem.tsx
      HistoryList.tsx
    landing/
      FAQ.tsx
      Features.tsx
      Hero.tsx
      HowItWorks.tsx
  contexts/
    AuthContext.tsx
    ThemeContext.tsx
    WebSocketContext.tsx
  hooks/
    useAuth.ts
    useTheme.ts
    useWebSocket.ts
  libs/
    ApiTypes.ts
    constValues.ts
    HookTypes.ts
    PropTypes.ts
  pages/
    About.tsx
    AuthCallback.jsx
    ChatScreen.tsx
    Customize.tsx
    Dashboard.tsx
    ForgotPasswordPage.tsx
    History.tsx
    Home.tsx
    LandingPage.tsx
    LoginPage.tsx
    Page404.tsx
    ProfileDashboard.tsx
    RegisterPage.tsx
    SignupPage.tsx
  types/
    speech.d.ts
  utils/

```

Short descriptions:
- `src/components`: reusable UI components and grouped feature components (Chat, Customize, History, landing)
- `src/pages`: route-level pages used by the router
- `src/contexts`: React Context providers for auth, theme, and WebSocket state
- `src/hooks`: custom React hooks
- `src/libs`: shared types/constants
- `src/assets`: images and Lottie animations

## Build notes and tips
- The `build` script runs `tsc -b` which performs TypeScript project builds and type checking. Fix type errors before publishing.
- Vite host is enabled in dev (`vite --host`) so the dev server is accessible on the local network.

## Contributing
- Follow existing code style. ESLint is configured — run `npm run lint` before creating PRs.
- Add tests or small checks for new logic where appropriate.

## License
This repository does not specify a license in the README. Add a `LICENSE` file if you want to make usage terms explicit.

---

If you want, I can also:
- add a short Getting Started section that wires env variables and common troubleshooting steps, or
- add a simple CONTRIBUTING.md and CODE_OF_CONDUCT.md — tell me which you'd prefer next.
