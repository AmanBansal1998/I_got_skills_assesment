async function isCyclic(parentId, childId) {
  let parent = await Node.findById(parentId);
  while (parent) {
    if (parent._id.toString() === childId) {
      return true; // Cycle detected
    }
    parent = parent.parent ? await Node.findById(parent.parent) : null;
  }
  return false;
}
