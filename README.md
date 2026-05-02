# Lucent Lab Mini Games

A small public website hosting independent browser mini-games.

## Goals

- One public home page listing all available games.
- Each game lives in its own folder and can evolve independently.
- Games are launched from the home page with a simple button.
- The project can be published as a static website with GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Add a new game

Create a new folder under `src/games/<game-id>/`:

```txt
src/games/my-game/
  Game.tsx
```

Then register it in `src/games/registry.ts`:

```ts
{
  id: "my-game",
  title: "My Game",
  emoji: "🎮",
  description: "Very short explanation.",
  load: () => import("./my-game/Game"),
}
```

`Game.tsx` must default-export a React component.

## Deployment

This repository includes a GitHub Actions workflow that deploys `dist/` to GitHub Pages on each push to `main`.

In GitHub, open repository **Settings → Pages** and set source to **GitHub Actions**.

The public URL should be:

```txt
https://lucent-lab.github.io/mini-games/
```
