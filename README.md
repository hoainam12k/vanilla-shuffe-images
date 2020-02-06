Vanilla Shuffle Images let you display and shuffle multiple images by moving cursor around or several other ways to trigger. This plugin is perfect for when you want to save space while allowing users to take a peak at what other images are related to the one displayed. It can also be used to create an interactive animation on multiple static images at once.

Similar to [Shuffle Images by Pete R](https://github.com/peachananr/shuffle-images) but Vanilla JS.

[View demo](https://hoainam12k.github.io/vanilla-shuffe-images/dist/).

## Basic Usage

### HTML Markup (Default)

```html
  <div class="shuffle-me">
      <img src="images/1.jpg" class="active"/>
      <img src="images/2.jpg" />
      <img src="images/3.jpg" />
      ..
  </div>
```

Make sure all the images you want to shuffle are wrapped within a container where we will call the function on.

### Vanilla js

```js
const shuffle = new ShuffleImages({
   target: ".shuffle-me",
});
shuffle.init();
```

### Node js

Install: `npm i vanilla-shuffe-images`

```js
import ShuffleImages from 'vanilla-shuffe-images';

const shuffle = new ShuffleImages({
    target: ".shuffle-me",
});
shuffle.init();
```

## Options

- [`String`] Target: query DOM wrapper listImages
- [`String`] Type: default `imageMouseMove`
> type: `imageMouseMove`, `imageHover`, `documentMouseMove`, `documentScroll` 
- Config time
> mouseMoveTrigger:  50 // Interger, default `50`

> hoverTrigger:  200 // Interger, default `100` 

> scrollTrigger:  100 // Interger, default `100`
- [`String`] wrapperTarget: query DOM wrapper target
> Default: `false`

## For developer

```
npm i
npm run dev
npm run build
```
