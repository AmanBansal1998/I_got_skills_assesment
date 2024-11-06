// POST /nodes
async function createNode(req, res) {
  const { name, type, parentId } = req.body;

  // Check if parentId exists and if the new node doesn't form a cycle
  const parentNode = parentId ? await Node.findById(parentId) : null;
  if (parentNode && await isCyclic(parentNode._id, req.body._id)) {
    return res.status(400).json({ error: "Cycle detected!" });
  }

  // Color assignment for location and department nodes
  let color = null;
  if (type === 'location' || type === 'department') {
    color = getColorForType(type);
  }

  const newNode = new Node({
    name,
    type,
    parent: parentId,
    color,
  });

  if (parentNode) {
    parentNode.addChild(newNode._id);
    await parentNode.save();
  }

  await newNode.save();
  res.status(201).json(newNode);
}
