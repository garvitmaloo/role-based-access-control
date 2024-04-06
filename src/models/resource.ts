import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rolePermissionsMap: {
    type: Object,
    default: {
      admin: ["*"],
      subAdmin: [],
      members: [],
      guests: []
    }
  }
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
