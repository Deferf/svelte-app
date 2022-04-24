# Daily and TalkJS implementation with Svelte

This repository contains my implementation of Daily using TalkJS as chat provider.

Based on this Svelte example: https://www.daily.co/blog/build-a-video-call-app-with-daily-prebuilt-and-svelte/

## How to use

You can download it and run:

```bash
cd svelte-app
npm install
npm run dev
```

It is also hosted on  https://deferf.github.io

## How this is structured

There are three main components: Frame, Chat and App.

Frame is the component that controls the Daily environment as well the one that handles meeting events to pass them on to the TalkJS object defined on the Chat component. The App component joins both modules.

As you may notice most of the interesting stuff happens in Frame.