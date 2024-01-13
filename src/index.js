const reactRecursionProtectPlugin = ({types: t}) => {
    let parentFunctionNames = [];

    const traverseParentFunctions = (path) => {
        parentFunctionNames = [];

        let currentPath = path;
        while (currentPath) {
            if (t.isIdentifier(currentPath.node.id)) {
                parentFunctionNames.push(currentPath.node.id.name);
            }
            currentPath = currentPath.parentPath;
        }
    };

    const visitor = {
        CallExpression(path) {
            const {callee, arguments: args} = path.node;
            traverseParentFunctions(path);
            // Check if the function is calling React.createElement
            if (parentFunctionNames.includes(args[0].name)) {
                console.warn(
                    `Infinite recursion detected in functions [${parentFunctionNames.join(
                        ', ',
                    )}]:`,
                    path.toString(),
                );
                // Replace the statement with a throw statement
                path.replaceWith(
                    t.throwStatement(
                        t.newExpression(t.identifier('Error'), [
                            t.stringLiteral(
                                `Infinite recursion detected. <${args[0].name} /> component renders itself.`,
                            ),
                        ]),
                    ),
                );
            }
        },
    };

    return {
        visitor,
    };
};

export default reactRecursionProtectPlugin;
