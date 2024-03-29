"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var recursionProtect = function recursionProtect(_ref) {
  var t = _ref.types;
  var parentFunctionNames = [];
  var fulfillParentFunctionNames = function fulfillParentFunctionNames(path) {
    parentFunctionNames = [];
    var currentPath = path;
    while (currentPath) {
      if (t.isIdentifier(currentPath.node.id)) {
        parentFunctionNames.push(currentPath.node.id.name);
      }
      currentPath = currentPath.parentPath;
    }
  };
  var visitor = {
    CallExpression: function CallExpression(path) {
      var _path$node = path.node,
        callee = _path$node.callee,
        args = _path$node.arguments;

      // Check if the function is calling React.createElement
      if (t.isMemberExpression(callee) && t.isIdentifier(callee.object, {
        name: 'React'
      }) && t.isIdentifier(callee.property, {
        name: 'createElement'
      }) && args.length >= 1 && t.isIdentifier(args[0])) {
        fulfillParentFunctionNames(path);
        if (parentFunctionNames.includes(args[0].name)) {
          console.warn("Infinite recursion detected in functions [".concat(parentFunctionNames.join(', '), "]:"), path.toString());
          // Replace the statement with a throw statement
          path.replaceWith(t.throwStatement(t.newExpression(t.identifier('Error'), [t.stringLiteral("Infinite recursion detected. <".concat(args[0].name, " /> component renders itself."))])));
        }
      }
    }
  };
  return {
    visitor: visitor
  };
};
var _default = exports["default"] = recursionProtect;