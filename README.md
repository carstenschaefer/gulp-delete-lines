# gulp-delete-lines
A gulp plugin that will remove all lines that matches one of the given regex filters.

With respect to Rolf Erik Lekangs work [https://www.npmjs.com/package/gulp-remove-lines] but now with minor bug fixes.

## Install

Install with [npm](https://npmjs.org/package/gulp-delete-lines)

```
npm install --save-dev gulp-delete-lines
```


## Examples

Our index.html file:

```html
<!doctype html>
<html>
<head>
  <title>Our App</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="format-detection" content="telephone=no" />
  
  <link rel="stylesheet" type="text/css" href="vendor/normalize.css/normalize.css" />
  <link rel="stylesheet" type="text/css" href="vendor/font-awesome/css/font-awesome.min.css" />
  <link rel="stylesheet" type="text/css" href="assets/sass/desktop.css" />
  
</head>
<body ng-controller="AppController">
  <div>
      markup goes here...
  </div>
  
  <script type="text/javascript" src="vendor/jquery/jquery.min.js"></script>
  <script type="text/javascript" src="vendor/angular/angular.min.js"></script>
  <script type="text/javascript" src="app/app_Desktop.js"></script>
  
  <script type="text/javascript">
    angular.bootstrap(document, ['ourApp']);
  </script>
</body>
</html>
```

### Example 1: Removes all script tags in index.html
```js
var gulp = require('gulp');
var deleteLines = require('gulp-delete-lines');

gulp.task('insert-scripts-bundle', function () {
  gulp.src('./build/index.html')
   .pipe(deleteLines({
      'filters': [
      /<script type=.*text.*javascript.* src=/
      ]
    }))
  .pipe(gulp.dest('dist'));
});
```

### Example 2: Removes all style tags in index.html
```js
var gulp = require('gulp');
var deleteLines = require('gulp-delete-lines');

gulp.task('insert-styles-bundle', function () {
  gulp.src('./build/index.html')
  .pipe(deleteLines({
      'filters': [
      /<link rel=.*stylesheet.* type=.*text/
      ]
    }))
  .pipe(gulp.dest('dist'));
});
```

## License

MIT © [Carsten Schaefer](http://www.g-tac.de)