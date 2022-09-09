const removeNode = (_treeData, _node, _path, _index) => {
    const newNode = {};
    return newNode;
};


/**
 * Get the maximum depth of the children (the depth of the root node is 0).
 *
 * @param {!Object} node - Node in the tree
 * @param {?number} depth - The current depth
 *
 * @return {number} maxDepth - The deepest depth in the tree
 */
function getDepth(node, depth = 0) {
    if (!node.children) {
        return depth;
    }

    if (typeof node.children === 'function') {
        return depth + 1;
    }

    return node.children.reduce(
        (deepest, child) => Math.max(deepest, getDepth(child, depth + 1)),
        depth
    );
}


export {
    removeNode,
    getDepth,
};