import { nodeHostname } from '../../config/constants'

export const NodeRegistry = {
  nodeHostname: nodeHostname,
  otherNodesHostnames: new Set(),

  registerNewNode(newNodeAddress: string) {
    this.otherNodesHostnames.add(newNodeAddress)
  }
}
