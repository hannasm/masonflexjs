# MasonFlexJS

This project implements masonry style layouts using the builtin browser feature known as flexbox. Masonry layout has been an expensive and complicated ui feature to use in the past because of inadequate functionality from the browser layout engine. This essentially required implementing your own layout manager in javascript, calculting positions manually and reflowing on changes to the window and dom. 

* Masonflex leverages builtin browser features to give you masonry functionality with a minimal one time cost from calculating element heights and inserting a few padding elements into the dom. 
* Masonflex preserves definition order of elements in the UI by recalculating the flex-order of elements.
* Masonflex uses intersection observer, mutation observer, and other modern techniques to monitor for relevant modifications to the UI to automatically recalculate as needed.

## Credits

The real heavy lifting for this code came from [this post on medium](https://medium.com/@_jh3y/how-to-the-masonry-layout-56f0fe0b19df)

I've just taken the work done there and made it a little more user-friendly for distribution.

## Setup

There is a css file you can use to setup the flexbox properties of your elements. This css is pretty minimal and can easily be copy / pasted somewhere into your own css stylesheets.

By default masonflex uses a class name of masonflex-panel for each of the items in the masonry layout. A special class masonflex-pad is affixed to padding elements that are used to fill in empty space in the bottom of the layout. These two classes should be given the same width.

  * For a three column layout set width to 33.333%. 
  * For a two column layout use 50%. 
  * One column use 100%. (There generally isn't much point in using masonflex for 1 column layouts though)

Masonflex should be initialized with the masonry container and a collection of options.

```javascript
var ele = document.getElementById('myMasonryContainer');
var opts = {};
var mfo = new MasonFlex(ele, opts);
```

Masonflex frequently does not require any options or additional coding.

## Options

| property name | description | default value |
|---------------|-------------|---------------|
| rootMargin | padding around the masonry container used for visibility determintation | 10px |
| threshold | size of element, as a percentage, that must be in the viewport to be considered visible | 0.001 |
| panelClass | classname attached to children of the container element | masonflex-panel |
| padClass | classname attached to the padding elements generated by masonflex code | masonflex-pad |

## Dependencies

 * Masonflex depends on intersection observer, which on older browsers requires a polyfill - [you could try this one](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)

 * Masonflex depends on mutation observer, which on older browsers requires a polyfill - [you could try this one](https://github.com/megawac/MutationObserver.js)

 * Masonflex uses the matches function, which [requires a polyfill on some older browsers](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill)

 * Masonflex uses flexbox layouts, which [requires a polyfill on older browsers](https://github.com/jonathantneal/flexibility)

## Build

dotnet core 2.0 is besing used for builds - masonflex.csproj defines the automation for minifying the javascript and a sln file is also included

from the commandline use dotnet build to minifying

the build depends on google closure compiler, installed through npm via:

 * npm install --save-dev google-closure-compiler

this will produce masonflex.min.js as a optimized / minified version of the code, and masonflex.min.js.map for source mapping

## Test Cases

There are a *growing* list of tests available in the tests subdirectory. Most of these tests do not include assertions. If you would like to contribute to the testing effort pull requests are welcomed and encouraged.

## Release Notes

* 1.0.0-rc.5 - fix calculation issue when elements in layout are not of fixed width
* 1.0.0-rc.4 - fix mutation observer error that ocurs when mutations are observed while masonry layout is empty
* 1.0.0-rc.3 - added a different setInterval based debounce function which seems to have better performance characteristics
* 1.0.0-rc.2 - removing debounce function dependency
* 1.0.0-rc.1 - first version released
