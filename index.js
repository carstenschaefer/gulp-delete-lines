const es = require('event-stream'),
  gutil = require('gulp-util');

module.exports = function (opt) {
  function gulpRmLines(file) {
    if (file.isNull()) {
      return this.emit('data', file);
    }

    if (file.isStream()) {
      return this.emit('error', new Error("gulp-delete-lines: Streaming not supported"));
    }

    let str = file.contents.toString('utf8');
    let newLines = [];

    const lines = str.split(/\r\n|\r|\n/g);

    for (let i=0; i<lines.length; i++) {
      newLines.push(lines[i]);
      for (let j=0; j<opt.filters.length; j++) {
        if (lines[i].match(opt.filters[j])) {
          newLines.pop();
          break;
        }
      }
    }

    str = newLines.join('\n');

    file.contents = new Buffer(str);
    this.emit('data', file);
  }

  return es.through(gulpRmLines);
};
