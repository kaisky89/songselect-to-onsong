# songselect-to-onsong

[![Build & Deploy](https://github.com/kaisky89/songselect-to-onsong/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/kaisky89/songselect-to-onsong/actions/workflows/build-and-deploy.yml)

> This small tool helps you to convert songselect songs to the onsong file format.

## How to use it

### On a desktop computer

- Login to songselect and open the song that you want to convert, switch to chords mode
- Open the console of your browser and enter the following:

```js
import('https://kaisky89.github.io/songselect-to-onsong/index.js')
```

- The song will be automatically downloaded as \*.onsong file.

### On iPhone / iPad

- Download and install [the Shortcut](https://kaisky89.github.io/songselect-to-onsong/Songselect%20To%20Onsong.shortcut)
- Using Safari, login to songselect and open the song that you want to convert, switch to chords mode
- Click on the share button, select "Songselect To Onsong"

## Options

You can also configure it with some options:

```js
const { songselectToOnsong } = await import(
  'https://kaisky89.github.io/songselect-to-onsong/songselectToOnsong.js'
)
songselectToOnsong({
  /**
   * The songtext on the songselect page is mutated during processing.
   * Usually a backup mechanism cares about recovering, but for debug
   * purposes this can be skipped.
   */
  shouldSkipBackup: false,

  /**
   * How to output the results. Possible values:
   * - `file` (default): Download as *.onsong file
   * - `console`: Output in browsers console
   * - `newTab`: Opens result in new tab
   * - `returnValue`: Returns the string as the function return
   */
  output: 'file',
})
```
