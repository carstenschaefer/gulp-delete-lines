var es = require('event-stream'),
  gutil = require('gulp-util');

module.exports = function (opt) {
  function gulpDeleteLines(file) {
    if (file.isNull()) return this.emit('data', file);
    if (file.isStream()) return this.emit('error', new Error("gulp-delete-lines: Streaming not supported"));
    var str = file.contents.toString('utf8');
    var line, _i, _j, _len, lines;
    var isMatched = true;
    var newLines = [];

    lines = str.split(/\r\n|\r|\n/g);

    for (_i = 0; _i < lines.length; _i++) {

      for (_j = 0; _j < opt.filters.length; _j++) {
        if ( ! lines[_i].match(opt.filters[_j])) {
           isMatched = false;
        }
        else{
          break;
        }
        if (_j == opt.filters.length-1 && !isMatched){
          newLines.push(lines[_i]); 
        }
      }
    }

    str = newLines.join('\n');

    file.contents = new Buffer(str);
    this.emit('data', file);
  }

  return es.through(gulpDeleteLines);
};
