# Markdown Preview with Math

![Markdown Preview with Math](https://raw.githubusercontent.com/abejfehr/markdown-preview-katex/master/imgs/preview.png)

Just a fork of [Markdown Preview Plus](https://github.com/Galadirith/markdown-preview-plus) that renders math with [KaTeX](http://khan.github.io/KaTeX/) instead of MathJax so it's not a pain to install. Shows the rendered HTML markdown to the right of the
current editor using the keymap `ctrl-shift-m`.

## Dependency-free LaTeX equation rendering

LaTeX equations in the source markdown are rendered in the preview pane. Rendering of LaTeX equations in the preview pane can be toggled with
  `ctrl-shift-x`. Please see [LaTeX](LATEX.md) for more details.

# Saving as PDF

Only select websites and packages are able to export math with markdown. The best solution I've been able to find was [pandoc](http://johnmacfarlane.net/pandoc/).

## License

Markdown Preview with Math is released under the [MIT license](LICENSE.md).
