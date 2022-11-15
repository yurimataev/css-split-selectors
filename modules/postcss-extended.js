const postcss = require('postcss');

function splitSelectors(nodes) {
    for (const i in nodes) {
        const node = nodes[i]
        // split selectors
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
        // split media queries
        else if (node.name == 'media') {
            if ('nodes' in node && node.nodes.length > 1) {
                const replacementNodes = []
                const nodeSerialized = JSON.stringify(node)
                for (const subnode of node.nodes) {
                    const nodeDeepCopy = JSON.parse(nodeSerialized)
                    const subnodeSerialized = JSON.stringify(subnode)
                    nodeDeepCopy.nodes = [ JSON.parse(subnodeSerialized) ]
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