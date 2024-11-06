// DELETE /nodes/:id
async function deleteNode(req, res) {
  const { id } = req.params;

  const node = await Node.findById(id);
  if (!node) {
    return res.status(404).json({ error: "Node not found!" });
  }

  // Check if the node has any children before deletion
  if (node.children.length > 0) {
    return res.status(400).json({ error: "Node has children, cannot be deleted." });
  }

  // Remove the node from its parent's children list
  if (node.parent) {
    const parentNode = await Node.findById(node.parent);
    parentNode.children = parentNode.children.filter(childId => childId.toString() !== id);
    await parentNode.save();
  }

  await node.remove();
  res.status(200).json({ message: "Node deleted successfully!" });
}
