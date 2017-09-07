# Changelog
This file contains highlights of what changes on each version of the [Free Mobile for JS](https://github.com/cedx/free-mobile.js) library.

## Version 7.0.0
- Breaking change: converted the [`Observable`](http://reactivex.io/intro.html)-based API to an `async/await`-based one.
- Breaking change: converted the `Subject` event API to the [`EventEmitter`](https://nodejs.org/api/events.html) one.
- Added the [`#[Symbol.toStringTag]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) property to all classes.
- Changed licensing for the [MIT License](https://opensource.org/licenses/MIT).

## Version 6.2.0
- Replaced the [SuperAgent](https://visionmedia.github.io/superagent) HTTP client by `node-fetch`.
- Updated the package dependencies.

## Version 6.1.0
- Removed the dependency on [Babel](https://babeljs.io) compiler.
- Updated the package dependencies.

## Version 6.0.0
- Breaking change: reverted the API of the `Client` class to an [Observable](http://reactivex.io/intro.html)-based one.
- Added new test cases.
- Updated the package dependencies.

## Version 5.0.1
- Fixed a code generation bug.
- Updated the package dependencies.

## Version 5.0.0
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: the `Client#endPoint` property is now an instance of the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) class.
- Updated the package dependencies.

## Version 4.1.0
- Added support for the [Node Security Platform](https://nodesecurity.io) reports.
- Updated the package dependencies.

## Version 4.0.0
- Breaking change: dropped the dependency on [Observables](http://reactivex.io/intro.html).
- Breaking change: the `Client` class is now an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

## Version 3.1.0
- Updated the package dependencies.

## Version 3.0.0
- Breaking change: changed the constructor signature.
- Breaking change: changed the return type of the `sendMessage()` method.
- Breaking change: dropped the `sendMessage()` helper function.
- Breaking change: renamed the `END_POINT` constant to `DEFAULT_ENDPOINT`.
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: using ES2017 features, like async/await functions.
- Added the `endPoint` property.
- Improved the build system.
- Ported the unit test assertions from [TDD](https://en.wikipedia.org/wiki/Test-driven_development) to [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development).
- Updated the package dependencies.

## Version 2.4.0
- Added the `sendMessage()` helper function.

## Version 2.3.0
- Replaced the [Codacy](https://www.codacy.com) code coverage service by the [Coveralls](https://coveralls.io) one.
- Updated the package dependencies.

## Version 2.2.0
- Added the `onRequest` and `onResponse` event streams.

## Version 2.1.0
- Updated the [SuperAgent](https://visionmedia.github.io/superagent) dependency.

## Version 2.0.0
- Breaking change: modified the signature of the class constructor.
- Added the `toJSON()` and `toString()` methods.
- Fixed the bug with some foreign characters being received as garbage.

## Version 1.0.0
- Initial release.
