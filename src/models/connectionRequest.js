const mongoose = require("mongoose");
const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required:true,
      enum: {
        values: ["ignore", "interested", "rejected", "accepted"],
        message: `{VALUE} is not a valid status`,
      },
    },
  },
  { timestamps: true }
);


connectionRequestSchema.pre("save", async function (next) {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot connect to yourself!");
    }
})
const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;
