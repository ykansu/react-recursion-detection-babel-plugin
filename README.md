# react-recursion-protect-plugin
    
[![npm version](https://badge.fury.io/js/react-recursion-protect-plugin.svg)](https://badge.fury.io/js/react-recursion-protect-plugin)
[![Build Status](https://travis-ci.org/ykansu/react-recursion-protect-plugin.svg?branch=master)](https://travis-ci.org/ykansu/react-recursion-protect-plugin)
[![Coverage Status](https://coveralls.io/repos/github/ykansu/react-recursion-protect-plugin/badge.svg?branch=master)](https://coveralls.io/github/ykansu/react-recursion-protect-plugin?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/ykansu/react-recursion-protect-plugin/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ykansu/react-recursion-protect-plugin?targetFile=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Babel plugin to detect infinite recursion in React components.

## Why?

React components can cause infinite recursion if they render themselves. For example:

```jsx
function MyComponent() {
  return <MyComponent />
}
```

This plugin detects infinite recursion and replaces the recursive call with an error-throwing statement. For example:

```jsx
function MyComponent() {
  throw new Error("Infinite recursion detected. <MyComponent /> component renders itself.");
}
```

The _**react-recursion-protect-plugin**_ is a specialized Babel plugin crafted for enhancing the security and stability of JavaScript code within sandbox environments, especially when users submit React code. The primary objective is to detect and address scenarios where a React component inadvertently invokes React.createElement with its own name, potentially leading to unintended infinite recursion. This is particularly crucial in sandbox environments where user-generated code is executed, and preventing infinite loops is essential.

## Key Features

### 1. Recursion Detection for React Components

   The plugin meticulously identifies instances where a React component invokes React.createElement with its own name, indicating a recursive call.
   This feature is especially useful in sandbox environments where user-submitted React code can inadvertently create infinite loops.

### 2. Error Handling for Recursive Calls

   Detected recursive calls within React components are intelligently replaced with an error-throwing statement.
   This strategy prevents the execution of the recursive loop and provides a clear error message to the developer, facilitating quick identification and resolution of the issue.

## Installation

```sh
npm install --save-dev react-recursion-protect-plugin
```

## Usage

To use the plugin in your Babel configuration, add it to the plugins array:

```js
{
  "plugins": ["react-recursion-protect-plugin"]
}
```

For sandbox environments, you can use the plugin with babel-standalone:

```js   
const babel = require("@babel/standalone");
const recursionProtectPlugin = require("react-recursion-protect-plugin");

const code = `
function MyComponent() {
  return <MyComponent />
}
`;

const transformedCode = babel.transform(code, {
  plugins: [recursionProtectPlugin]
}).code;
```


## Contributors

* Author: [Yasin Kansu](https://github.com/ykansu)


## License

MIT / http://opensource.org/licenses/MIT
