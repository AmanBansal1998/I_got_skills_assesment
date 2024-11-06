const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['organization', 'location', 'department', 'employee'], required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', default: null },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Node' }],
  color: { type: String, default: null },  // Only for location/department nodes
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

nodeSchema.methods.addChild = function(childId) {
  this.children.push(childId);
};

const Node = mongoose.model('Node', nodeSchema);
