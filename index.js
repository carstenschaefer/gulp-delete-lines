var es = require('event-stream'),
  gutil = require('gulp-util');

module.exports = function (opt) {
  function gulpDeleteLines(file) {
    if (file.isNull()) return this.emit('data', file);
    if (file.isStream()) return this.emit('error', new Error("gulp-delete-lines: Streaming not supported"));
    var str = file.contents.toString('utf8');
    var line, _i, _j, _len, lines;
    var newLines = [];

    lines = str.split(/\r\n|\r|\n/g);

    for (_i = 0; _i < lines.length; _i++) {
      newLines.push(lines[_i]);
      for (_j = 0; _j < opt.filters.length; _j++) {
        if (lines[_i].match(opt.filters[_j])) {
		newLines.pop();
		break;
        }
      }
    }

    if (lines.length != newLines.length) {
      str = newLines.join('\n');
      file.contents = new Buffer(str);
    }
    this.emit('data', file);
  }

  return es.through(gulpDeleteLines);
};
