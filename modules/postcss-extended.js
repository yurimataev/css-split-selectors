const postcss = require('postcss');

function splitSelectors(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        // if this node has nodes, recurse
        if ('nodes' in node && node.nodes.length > 0) {
            node.nodes = splitSelectors(node.nodes);
        }

        const replacementNodes = []
        const nodeSerialized = JSON.stringify(node)

        // split selectors
        if ('selector' in node) {
            const selectors = node.selector.split(',')
            if (selectors.length > 1) {
                for (const selector of selectors) {
                    const nodeDeepCopy = JSON.parse(nodeSerialized)
                    nodeDeepCopy.selector = selector.trim()
                    replacementNodes.push(nodeDeepCopy);
                }
            }
        }
        // split media queries
        else if (node.name == 'media') {
            if ('nodes' in node && node.nodes.length > 1) {
                for (const subnode of node.nodes) {
                    const nodeDeepCopy = JSON.parse(nodeSerialized)
                    const subnodeSerialized = JSON.stringify(subnode)
                    nodeDeepCopy.nodes = [ JSON.parse(subnodeSerialized) ]
                    replacementNodes.push(nodeDeepCopy);
                }
            }
        }

        // replace this node with the replacement nodes
        if (replacementNodes.length > 0) {
            nodes.splice(i, 1, ...replacementNodes)
            i += replacementNodes.length - 1
        }
    }
    return nodes
}

postcss.splitSelectors = splitSelectors;

module.exports = postcss