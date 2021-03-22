# QuizEnhancements

## Installation

Get Canvas running in development mode locally. This can be done with our
[Vagrant setup](https://github.com/atomicjolt/canvas-dev). You'll probably want
to follow the readme instructions there for running Canvas manually.

Clone this repo into canvas at `gems/plugin/quiz_enhancements`. Then run
`bundle install` at the root of canvas, then start canvas.

To automatically compile JS, run `yarn build:watch` from the canvas root. To
compile sass, run `yarn build:css`. Note that this does not watch for changes
and must be re-run with each change. This can be automated with something like
[entr](http://eradman.com/entrproject/).


## Usage

Canvas plugins allow injecting ruby code into Canvas. It's not really
documented, so most of the strategy has been adapted from the [Instucture
analytics project](https://github.com/instructure/analytics).
