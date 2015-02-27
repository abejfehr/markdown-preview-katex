#
# katex-helper
#
# This module will handle loading the Katex environment and provide a wrapper
# for calls to Katex to process LaTeX equations.
#

cheerio = require 'cheerio'
path    = require 'path'

module.exports =
  #
  # Load Katex environment
  #
  loadKatex: ->
    script = document.createElement("script")
    script.addEventListener "load", () ->
      configureKatex()
    script.type = "text/javascript";
    link = document.createElement("link")
    link.href = "node_modules/katex/" # I need to include both the css and the fonts in the preview window
    try
      ##script.src  = "node_modules/katex/katex.js"
      ##document.getElementsByTagName("head")[0].appendChild(script)
    finally
      return
    return

  #
  # Process DOM elements for LaTeX equations with Katex
  #
  # @param domElements An array of DOM elements to be processed by Katex. See
  #   [element](https://developer.mozilla.org/en-US/docs/Web/API/element) for
  #   details on DOM elements.
  #
  # TODO: Edit this so it works with Katex
  #
  mathProcessor: (domElements) ->
    if MathJax?
      MathJax.Hub.Queue ["Typeset", MathJax.Hub, domElements]
    return

#
# Configure Katex environment. Similar to the TeX-AMS_HTML configuration with
# a few unnessesary features stripped away
#
configureKatex = ->
  MathJax.Hub.Config
    jax: ["input/TeX","output/HTML-CSS"]
    extensions: []
    TeX:
      extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
    messageStyle: "none"
    showMathMenu: false
  MathJax.Hub.Configured()
  return
