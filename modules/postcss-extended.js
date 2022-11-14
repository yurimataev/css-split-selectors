const postcss = require('postcss');

function splitSelectors(nodes) {
    for (const i in nodes) {
        const node = nodes[i]
        if ('selector' in node) {
            const selectors = node.selector.split(',')
            if (selectors.length > 1) {
                const replacementNodes = []
                const nodeSerialized = JSON.stringify(node)
                for (const selector of selectors) {
                    const nodeDeepCopy = JSON.parse(nodeSerialized)
                    nodeDeepCopy.selector = selector.trim()
                    replacementNodes.push(nodeDeepCopy);
                }
                // replace this node with the replacement nodes
                nodes.splice(i, 1, ...replacementNodes)
            }
        }
        // if this node has nodes, recurse
        if ('nodes' in node && node.nodes.length > 0) {
            node.nodes = splitSelectors(node.nodes);
        }
    }
    return nodes
}

postcss.splitSelectors = splitSelectors;

module.exports = postcss