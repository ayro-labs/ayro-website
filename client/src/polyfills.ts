// IE9, IE10 and IE11
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';

// Evergreen
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

// Angular
import 'zone.js/dist/zone';

if (process.env.NODE_ENV === 'development') {
  Error.stackTraceLimit = Infinity;
  // tslint:disable-next-line: no-var-requires
  require('zone.js/dist/long-stack-trace-zone');
}
