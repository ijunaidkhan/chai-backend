import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloundinary url
      required: true,
    },
    thumbnail: {
      type: String, //cloundinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //cloundinary
      required: true,
    },
    views: {
      type: Number, //cloundinary
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugi(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
