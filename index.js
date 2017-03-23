import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';

export default class Router {
  constructor() {
    this.routes = [];
  }

  addRoute(path, func) {
    this.routes.push(new Route(path, func))
  }

  exec(pathName) {
    var first_match_route = _.find(this.routes, (route) => {
      return route.isMatch(pathName);
    });
    if (first_match_route != undefined) {
      first_match_route.func();
    }
  }
}

class Route {
  constructor(path, func) {
    this.regexp = pathToRegexp(path, this.key = []);
    this.func = func
  }

  isMatch(currentPath) {
    return (this.regexp.exec(currentPath) != null);
  }
}
