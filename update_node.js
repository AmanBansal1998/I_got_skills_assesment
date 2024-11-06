// PUT /nodes/:id
async function updateNode(req, res) {
  const { id } = req.params;
  const { name, type, parentId } = req.body;

  const node = await Node.findById(id);
  if (!node) {
    return res.status(404).json({ error: "Node not found!" });
  }

  // Check if the update would result in a cycle
  if (parentId && await isCyclic(parentId, id)) {
    return res.status(400).json({ error: "Cycle detected!" });
  }

  node.name = name || node.name;
  node.type = type || node.type;
  node.parent = parentId || node.parent;

  if (type === 'location' || type === 'department') {
    node.color = getColorForType(type);
  }

  await node.save();
  res.status(200).json(node);
}
