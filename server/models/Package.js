const mongoose = require("mongoose");

const packageImageSchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const decorationSetupSchema = new mongoose.Schema(
  {
    included: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [packageImageSchema],
      required: true,
    },
  },
  { _id: false }
);

const structuredMealSchema = new mongoose.Schema(
  {
    breads: {
      type: [String],
      default: [],
    },
    dryBhaji: {
      type: [String],
      default: [],
    },
    wetBhaji: {
      type: [String],
      default: [],
    },
    salad: {
      type: [String],
      default: [],
    },
    rice: {
      type: [String],
      default: [],
    },
    dal: {
      type: [String],
      default: [],
    },
    sweet: {
      type: [String],
      default: [],
    },
    dessert: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    packageNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
      enum: ["OM SAI BANQUET HALL", "OM SAI LAWNS"],
    },

    eventTypes: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one event type is required.",
      },
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 5000,
    },

    timing: {
      type: [String],
      required: true,
      enum: ["day", "night", "flexible"],
    },

    timingWindow: {
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    decoration: {
      haldiSetup: {
        type: decorationSetupSchema,
        required: true,
      },

      vidhiSetup: {
        type: decorationSetupSchema,
        required: true,
      },

      mainStageSetup: {
        type: decorationSetupSchema,
        required: true,
      },

      varmalaSetup: {
        type: decorationSetupSchema,
        required: true,
      },

      entrySetup: {
        type: decorationSetupSchema,
        required: true,
      },

      themeTags: {
        type: [String],
        default: [],
      },

      otherDecorationItems: {
        type: [String],
        default: [],
      },
    },

    entertainment: {
      dholTasha: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
        },

        ghoda: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
        },

        bhraman: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },

      kakaService: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },

      sound: {
        included: {
          type: Boolean,
          required: true,
        },
        type: {
          type: String,
          default: "",
        },
      },

      lighting: {
        included: {
          type: Boolean,
          required: true,
        },
        type: {
          type: String,
          default: "",
        },
      },

      ledScreenOrWall: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },

      traditionalMusic: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },
    },

    catering: {
      morningBreakfast: {
        type: [String],
        default: [],
      },

      teaCoffee: {
        type: [String],
        default: [],
      },

      lunch: {
        type: structuredMealSchema,
        required: true,
      },

      eveningBreakfast: {
        type: [String],
        default: [],
      },

      eveningTeaCoffee: {
        type: [String],
        default: [],
      },

      dinner: {
        type: structuredMealSchema,
        required: true,
      },
    },

    services: {
      waiters: {
        type: Number,
        min: 0,
        required: true,
      },

      waterBottles: {
        type: Number,
        min: 0,
        required: true,
      },

      tables: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },

      chairs: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },

      buffetCounters: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },

      stageFurniture: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },

      cleaning: {
        type: String,
        enum: ["included", "optional", "notIncluded"],
        required: true,
      },
    },

    otherFacilities: {
      type: [String],
      default: [],
    },

    images: {
      gallery: {
        type: [packageImageSchema],
        default: [],
      },

      venue: {
        type: [packageImageSchema],
        default: [],
      },
    },

    isDemoData: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Package", packageSchema);