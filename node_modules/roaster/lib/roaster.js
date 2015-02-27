(function() {
  var Fs, Path, cheerio, convert_frontmatter, emoji, emojiFolder, marked, taskLists, _;

  Fs = require('fs');

  Path = require('path');

  _ = require('underscore');

  marked = require(Path.join(Path.dirname(__dirname), 'node_modules/marked/lib/marked'));

  emoji = require('emoji-images');

  taskLists = require('task-lists');

  cheerio = require('cheerio');

  convert_frontmatter = require('./convert_frontmatter');

  emojiFolder = Path.join(Path.dirname(require.resolve('emoji-images')), "pngs");

  module.exports = function(file, opts, callback) {
    var conversion, key, options,
      _this = this;
    options = {
      isFile: false,
      header: '<h<%= level %>><a name="<%= anchor %>" class="anchor" href="#<%= anchor %>"><span class="octicon octicon-link"></span></a><%= header %></h<%= level %>>',
      anchorMin: 1
    };
    conversion = function(data) {
      var $, body, contents, emojified, frontmatter, mdToHtml, _ref;
      _ref = convert_frontmatter(data), frontmatter = _ref[0], body = _ref[1];
      mdToHtml = marked(body);
      emojified = emoji(mdToHtml, emojiFolder, 20);
      $ = cheerio.load(emojified);
      $('pre img').each(function(index, element) {
        return $(this).replaceWith($(this).attr('title'));
      });
      $('code img').each(function(index, element) {
        return $(this).replaceWith($(this).attr('title'));
      });
      contents = taskLists($.html());
      if (!_.isNull(frontmatter)) {
        return "" + frontmatter + "\n\n" + contents;
      } else {
        return contents;
      }
    };
    if (typeof opts === 'function') {
      callback = opts;
    } else {
      for (key in opts) {
        options[key] = opts[key];
      }
    }
    marked.setOptions(options);
    if (options.isFile) {
      return Fs.readFile(file, "utf8", function(err, data) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, conversion(data));
        }
      });
    } else {
      return callback(null, conversion(file));
    }
  };

}).call(this);
