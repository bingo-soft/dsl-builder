import CodeInterface from '../CodeInterface'
import CodeNodeInterface from '../CodeNodeInterface'
import CodeNodeTypeInterface from '../CodeNodeTypeInterface'

export default class CodeImpl implements CodeInterface
{
    private root: CodeNodeInterface

    constructor(root: CodeNodeInterface)
    {
        this.root = root
    }

    getRoot(): CodeNodeInterface
    {
        return this.root
    }

    getNodesByType(type: CodeNodeTypeInterface): CodeNodeInterface[]
    {
        let nodes = []
        const rootNode = this.root
        const children = rootNode.getChildren()
        nodes = this.getDeepNodesByType(children, type, nodes)
        return nodes
    }

    getDeepNodesByType(children: CodeNodeInterface[], type: CodeNodeTypeInterface, nodes: CodeNodeInterface[]): CodeNodeInterface[]
    {
        if (children.length) {
            children.forEach(child => {
                if (child.getType() == type) {
                    nodes.push(child)
                }
                const childNodes = child.getChildren()
                if (childNodes.length) {
                    nodes = this.getDeepNodesByType(childNodes, type, nodes)
                }
            })
        }
        return nodes;
    }


}