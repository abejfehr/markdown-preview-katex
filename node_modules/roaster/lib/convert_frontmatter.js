(function() {
  var YAML, _,
    _this = this,
    __slice = [].slice;

  YAML = require('js-yaml');

  _ = require('underscore');

  module.exports = function(content) {
    var body, data, frontmatter, items, process_yaml, table_format, _ref;
    process_yaml = function(data) {
      var elements, is_array, is_hash_array, tb, tb_row, th, th_row, tr_row;
      th_row = [];
      tb_row = [];
      tr_row = [];
      is_array = _.isArray(data);
      is_hash_array = _.any(_.keys(data), function(d) {
        return _.isObject(d);
      });
      if (is_hash_array && !is_array) {
        _.each(_.keys(data[0]), function(header) {
          return th_row.push(table_format("TH", header));
        });
      } else if (!is_array) {
        _.each(_.keys(data), function(header) {
          return th_row.push(table_format("TH", header));
        });
      }
      th = _.isEmpty(th_row) ? "" : table_format("THEAD", table_format("TR", th_row));
      elements = is_array ? data : _.values(data);
      _.each(elements, function(value) {
        if (_.isArray(value) || (_.isObject(value) && !_.isDate(value))) {
          return tb_row.push(table_format("TD", process_yaml(value)));
        } else {
          return tb_row.push(table_format("TD", value));
        }
      });
      if (!_.isEmpty(tb_row)) {
        tr_row.push(table_format("TR", tb_row));
      }
      tb = table_format("TB", tr_row);
      return table_format("TBL", th, tb);
    };
    table_format = function() {
      var str, values;
      str = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      switch (str) {
        case "TBL":
          return "<table>" + values[0] + values[1] + "</table>";
        case "THEAD":
          return "\n  <thead>" + values[0] + "</thead>";
        case "TB":
          return "\n  <tbody>" + values[0] + "</tbody>\n";
        case "TR":
          return "\n  <tr>" + (values[0].join("")) + "</tr>\n  ";
        case "TH":
          return "\n  <th>" + values[0] + "</th>\n  ";
        case "TD":
          return "\n  <td><div>" + values[0] + "</div></td>\n  ";
      }
    };
    try {
      if (items = content.match(/^(-{3}(?:\n|\r)([\w\W]+?)-{3})?([\w\W]*)*/)) {
        body = (_ref = items[3]) != null ? _ref : '';
        data = YAML.load(items[2]);
        if (!_.isObject(data)) {
          return [null, content];
        }
        frontmatter = process_yaml(data).replace(/<table/, "<table data-table-type=\"yaml-metadata\"").replace(/^\s*$/gm, '');
        return [frontmatter, body];
      } else {
        return [null, content];
      }
    } catch (YAMLException) {
      frontmatter = "<pre lang=\"yaml\"><code>\n" + items[1] + "</code></pre>";
      return [frontmatter, body];
    }
  };

}).call(this);
