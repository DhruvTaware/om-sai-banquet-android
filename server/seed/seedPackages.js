const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const Package = require("../models/Package");

const placeholderImage = {
  src: "/placeholder.svg",
  alt: "OM SAI sample package image",
  isPlaceholder: true,
};

const images = {
  decoration: () => [
    {
      src: "/placeholder.svg",
      alt: "Sample decoration setup",
      isPlaceholder: true,
    },
  ],
  gallery: () => [
    {
      src: "/placeholder.svg",
      alt: "Sample event gallery image",
      isPlaceholder: true,
    },
  ],
  venue: () => [
    {
      src: "/placeholder.svg",
      alt: "OM SAI venue sample image",
      isPlaceholder: true,
    },
  ],
};

const setup = (name, included, description) => ({
  included,
  name,
  description,
  images: images.decoration(),
});

const service = (included = "notIncluded") => included;

const createDecoration = ({
  haldi = false,
  vidhi = false,
  stage = true,
  varmala = false,
  entry = false,
  theme = [],
  other = [],
}) => ({
  haldiSetup: setup(
    haldi ? "Haldi Setup" : "Haldi Setup",
    haldi,
    haldi
      ? "Traditional Haldi decoration setup."
      : "Available as an optional add-on."
  ),

  vidhiSetup: setup(
    vidhi ? "Vidhi Setup" : "Vidhi Setup",
    vidhi,
    vidhi
      ? "Traditional Vidhi ceremony decoration setup."
      : "Available as an optional add-on."
  ),

  mainStageSetup: setup(
    stage ? "Main Stage Setup" : "Main Stage Setup",
    stage,
    stage
      ? "Decorated main stage suitable for the event."
      : "Available as an optional add-on."
  ),

  varmalaSetup: setup(
    varmala ? "Varmala Setup" : "Varmala Setup",
    varmala,
    varmala
      ? "Decorated Varmala stage arrangement."
      : "Available as an optional add-on."
  ),

  entrySetup: setup(
    entry ? "Entry Setup" : "Entry Setup",
    entry,
    entry
      ? "Decorated event entrance."
      : "Available as an optional add-on."
  ),

  themeTags: theme,
  otherDecorationItems: other,
});

const createMeal = (items = []) => ({
  breads: items.filter((item) =>
    ["Chapati", "Puri", "Bhakri", "Naan", "Roti"].includes(item)
  ),

  dryBhaji: items.filter((item) =>
    ["Bhaji", "Dry Bhaji", "Vegetable"].includes(item)
  ),

  wetBhaji: items.filter((item) =>
    ["Paneer", "Curry", "Mix Vegetable"].includes(item)
  ),

  salad: items.filter((item) =>
    ["Salad", "Kachumber", "Raita"].includes(item)
  ),

  rice: items.filter((item) =>
    ["Rice", "Jeera Rice", "Veg Biryani", "Biryani"].includes(item)
  ),

  dal: items.filter((item) =>
    ["Dal", "Dal Tadka", "Amti"].includes(item)
  ),

  sweet: items.filter((item) =>
    ["Sweet", "Gulab Jamun", "Shrikhand", "Jalebi"].includes(item)
  ),

  dessert: items.filter((item) =>
    ["Dessert", "Ice Cream", "Fruit Custard"].includes(item)
  ),
});

const createCatering = ({
  breakfast = [],
  tea = [],
  lunch = [],
  eveningBreakfast = [],
  eveningTea = [],
  dinner = [],
}) => ({
  morningBreakfast: breakfast,

  teaCoffee: tea,

  lunch: createMeal(lunch),

  eveningBreakfast,

  eveningTeaCoffee: eveningTea,

  dinner: createMeal(dinner),
});

const createServices = ({
  waiters = 8,
  waterBottles = 500,
  tables = "included",
  chairs = "included",
  buffetCounters = "included",
  stageFurniture = "included",
  cleaning = "included",
}) => ({
  waiters,
  waterBottles,
  tables,
  chairs,
  buffetCounters,
  stageFurniture,
  cleaning,
});

const createEntertainment = ({
  dholTasha = "notIncluded",
  ghoda = "notIncluded",
  bhraman = "notIncluded",
  kakaService = "notIncluded",
  sound = true,
  lighting = true,
  led = "notIncluded",
  traditionalMusic = "notIncluded",
}) => ({
  dholTasha,
  ghoda,
  bhraman,
  kakaService,

  sound: {
    included: sound,
    type: sound ? "Professional sound system" : "",
  },

  lighting: {
    included: lighting,
    type: lighting ? "Event lighting" : "",
  },

  ledScreenOrWall: led,

  traditionalMusic,
});

const basePackages = [
  {
    id: "P001",
    packageNumber: "P001",
    name: "Royal Wedding Banquet",
    description:
      "Complete wedding package designed for a premium indoor celebration.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Marriage"],
    capacity: 800,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "09:00",
      endTime: "23:00",
    },
    price: 450000,

    decoration: createDecoration({
      haldi: true,
      vidhi: true,
      stage: true,
      varmala: true,
      entry: true,
      theme: ["Traditional Decoration", "Floral Decoration"],
      other: ["Welcome board", "Floral entrance"],
    }),

    entertainment: createEntertainment({
      dholTasha: "included",
      ghoda: "included",
      bhraman: "included",
      kakaService: "included",
      sound: true,
      lighting: true,
      led: "included",
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Upma", "Tea", "Coffee"],
      tea: ["Tea", "Coffee"],
      lunch: ["Chapati", "Puri", "Paneer", "Dal", "Rice", "Sweet"],
      eveningBreakfast: ["Snacks", "Tea"],
      eveningTea: ["Tea", "Coffee"],
      dinner: ["Chapati", "Puri", "Paneer", "Vegetable", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 18,
      waterBottles: 1200,
    }),

    otherFacilities: [
      "Generator backup",
      "Parking",
      "Changing room",
      "Bride and groom room",
    ],
  },

  {
    id: "P002",
    packageNumber: "P002",
    name: "Grand Lawn Wedding",
    description:
      "Large outdoor wedding package with spacious lawn arrangements.",
    venue: "OM SAI LAWNS",
    eventTypes: ["Marriage"],
    capacity: 1800,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "10:00",
      endTime: "23:30",
    },
    price: 600000,

    decoration: createDecoration({
      haldi: true,
      vidhi: true,
      stage: true,
      varmala: true,
      entry: true,
      theme: ["Floral Decoration", "Traditional Decoration"],
      other: ["Outdoor floral gate", "Mandap decoration"],
    }),

    entertainment: createEntertainment({
      dholTasha: "included",
      ghoda: "included",
      bhraman: "included",
      kakaService: "included",
      sound: true,
      lighting: true,
      led: "included",
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Misal", "Poha", "Tea"],
      tea: ["Tea", "Coffee"],
      lunch: ["Puri", "Paneer", "Bhaji", "Dal", "Rice", "Sweet"],
      eveningBreakfast: ["Snacks", "Tea"],
      dinner: ["Chapati", "Paneer", "Vegetable", "Dal", "Rice", "Dessert"],
    }),

    services: createServices({
      waiters: 25,
      waterBottles: 2000,
    }),

    otherFacilities: [
      "Large parking area",
      "Generator backup",
      "Outdoor lighting",
      "Green room",
    ],
  },

  {
    id: "P003",
    packageNumber: "P003",
    name: "Classic Wedding",
    description:
      "Balanced wedding package for families looking for traditional arrangements.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Marriage"],
    capacity: 500,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "10:00",
      endTime: "22:30",
    },
    price: 300000,

    decoration: createDecoration({
      haldi: true,
      vidhi: true,
      stage: true,
      varmala: true,
      entry: false,
      theme: ["Traditional Decoration"],
    }),

    entertainment: createEntertainment({
      dholTasha: "optional",
      ghoda: "optional",
      bhraman: "optional",
      kakaService: "included",
      sound: true,
      lighting: true,
      led: "optional",
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Tea"],
      lunch: ["Chapati", "Bhaji", "Dal", "Rice", "Sweet"],
      dinner: ["Chapati", "Paneer", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 12,
      waterBottles: 700,
    }),

    otherFacilities: ["Parking", "Changing room", "Generator backup"],
  },

  {
    id: "P004",
    packageNumber: "P004",
    name: "Elegant Engagement",
    description:
      "Elegant engagement celebration package with modern stage styling.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Engagement"],
    capacity: 400,
    timing: ["night"],
    timingWindow: {
      startTime: "17:00",
      endTime: "22:30",
    },
    price: 180000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Modern Decoration", "Floral Decoration"],
      other: ["Couple photo corner"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      led: "included",
      traditionalMusic: "optional",
    }),

    catering: createCatering({
      tea: ["Tea", "Coffee"],
      eveningBreakfast: ["Starters", "Snacks"],
      dinner: ["Paneer", "Veg Biryani", "Dal", "Rice", "Dessert"],
    }),

    services: createServices({
      waiters: 10,
      waterBottles: 500,
    }),

    otherFacilities: ["Parking", "Photo area", "Generator backup"],
  },

  {
    id: "P005",
    packageNumber: "P005",
    name: "Premium Engagement Lawn",
    description:
      "Outdoor engagement package with decorative entrance and stage.",
    venue: "OM SAI LAWNS",
    eventTypes: ["Engagement"],
    capacity: 700,
    timing: ["night"],
    timingWindow: {
      startTime: "17:00",
      endTime: "23:00",
    },
    price: 250000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Modern Decoration", "Floral Decoration"],
      other: ["Decorative pathway"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      led: "included",
      traditionalMusic: "optional",
    }),

    catering: createCatering({
      tea: ["Tea", "Coffee"],
      eveningBreakfast: ["Snacks", "Starters"],
      dinner: ["Paneer", "Veg Biryani", "Dal", "Rice", "Sweet", "Dessert"],
    }),

    services: createServices({
      waiters: 14,
      waterBottles: 900,
    }),

    otherFacilities: ["Parking", "Outdoor lighting", "Generator backup"],
  },

  {
    id: "P006",
    packageNumber: "P006",
    name: "Birthday Celebration",
    description:
      "Fun indoor birthday package suitable for family celebrations.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Birthday / Anniversary"],
    capacity: 250,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "11:00",
      endTime: "22:00",
    },
    price: 90000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Theme Decoration", "Modern Decoration"],
      other: ["Birthday backdrop", "Balloon decoration"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      led: "optional",
    }),

    catering: createCatering({
      tea: ["Tea", "Coffee"],
      eveningBreakfast: ["Snacks", "Starters"],
      dinner: ["Paneer", "Noodles", "Rice", "Dal", "Sweet"],
    }),

    services: createServices({
      waiters: 6,
      waterBottles: 300,
    }),

    otherFacilities: ["Parking", "Cake table", "Photo corner"],
  },

  {
    id: "P007",
    packageNumber: "P007",
    name: "Birthday Lawn Party",
    description:
      "Outdoor birthday party package with theme decoration options.",
    venue: "OM SAI LAWNS",
    eventTypes: ["Birthday / Anniversary"],
    capacity: 500,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "16:00",
      endTime: "22:30",
    },
    price: 140000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Theme Decoration", "Modern Decoration"],
      other: ["Balloon arch", "Birthday backdrop"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      led: "optional",
    }),

    catering: createCatering({
      eveningBreakfast: ["Snacks", "Starters"],
      dinner: ["Paneer", "Veg Biryani", "Noodles", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 8,
      waterBottles: 600,
    }),

    otherFacilities: ["Parking", "Outdoor seating", "Photo area"],
  },

  {
    id: "P008",
    packageNumber: "P008",
    name: "Naming Ceremony Classic",
    description:
      "Traditional naming ceremony package for family gatherings.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Naming Ceremony"],
    capacity: 300,
    timing: ["day"],
    timingWindow: {
      startTime: "09:00",
      endTime: "15:00",
    },
    price: 110000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Traditional Decoration", "Floral Decoration"],
      other: ["Baby welcome decoration"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Upma", "Tea"],
      lunch: ["Puri", "Bhaji", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 7,
      waterBottles: 400,
    }),

    otherFacilities: ["Parking", "Changing room", "Generator backup"],
  },

  {
    id: "P009",
    packageNumber: "P009",
    name: "Naming Ceremony Premium",
    description:
      "Premium naming ceremony package with enhanced floral decoration.",
    venue: "OM SAI LAWNS",
    eventTypes: ["Naming Ceremony"],
    capacity: 700,
    timing: ["day"],
    timingWindow: {
      startTime: "09:00",
      endTime: "16:00",
    },
    price: 170000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Traditional Decoration", "Floral Decoration"],
      other: ["Floral entrance", "Baby photo corner"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Upma", "Tea", "Coffee"],
      lunch: ["Puri", "Paneer", "Bhaji", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 12,
      waterBottles: 900,
    }),

    otherFacilities: ["Large parking", "Outdoor seating", "Generator backup"],
  },

  {
    id: "P010",
    packageNumber: "P010",
    name: "Traditional Religious Gathering",
    description:
      "Traditional event package suitable for religious and cultural programs.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Religious / Cultural Events"],
    capacity: 600,
    timing: ["day"],
    timingWindow: {
      startTime: "08:00",
      endTime: "17:00",
    },
    price: 160000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Traditional Decoration"],
      other: ["Traditional backdrop"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Tea"],
      lunch: ["Puri", "Bhaji", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 10,
      waterBottles: 800,
    }),

    otherFacilities: ["Parking", "Generator backup", "Seating arrangement"],
  },

  {
    id: "P011",
    packageNumber: "P011",
    name: "Cultural Lawn Festival",
    description:
      "Spacious lawn package for cultural and community gatherings.",
    venue: "OM SAI LAWNS",
    eventTypes: ["Religious / Cultural Events"],
    capacity: 1500,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "09:00",
      endTime: "22:00",
    },
    price: 320000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Traditional Decoration"],
      other: ["Decorative entrance"],
    }),

    entertainment: createEntertainment({
      dholTasha: "optional",
      sound: true,
      lighting: true,
      led: "optional",
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Tea"],
      lunch: ["Puri", "Bhaji", "Dal", "Rice", "Sweet"],
      eveningTea: ["Tea", "Coffee"],
      dinner: ["Chapati", "Bhaji", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 20,
      waterBottles: 1800,
    }),

    otherFacilities: ["Large parking", "Outdoor stage", "Generator backup"],
  },

  {
    id: "P012",
    packageNumber: "P012",
    name: "Modern Celebration",
    description:
      "Flexible package for modern family and social celebrations.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Others"],
    capacity: 400,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "11:00",
      endTime: "22:30",
    },
    price: 150000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Modern Decoration", "Theme Decoration"],
      other: ["Photo booth"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      led: "included",
    }),

    catering: createCatering({
      eveningBreakfast: ["Snacks", "Starters"],
      dinner: ["Paneer", "Veg Biryani", "Dal", "Rice", "Dessert"],
    }),

    services: createServices({
      waiters: 9,
      waterBottles: 500,
    }),

    otherFacilities: ["Parking", "Photo booth", "Generator backup"],
  },

  {
    id: "P013",
    packageNumber: "P013",
    name: "Premium Family Function",
    description:
      "Premium family function package with complete indoor arrangements.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Others"],
    capacity: 700,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "10:00",
      endTime: "23:00",
    },
    price: 240000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Floral Decoration", "Modern Decoration"],
      other: ["Floral entrance", "Photo corner"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      led: "included",
      traditionalMusic: "optional",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Upma", "Tea"],
      lunch: ["Chapati", "Paneer", "Bhaji", "Dal", "Rice", "Sweet"],
      eveningTea: ["Tea", "Coffee"],
      dinner: ["Chapati", "Paneer", "Dal", "Rice", "Dessert"],
    }),

    services: createServices({
      waiters: 15,
      waterBottles: 1000,
    }),

    otherFacilities: ["Parking", "Changing room", "Generator backup"],
  },

  {
    id: "P014",
    packageNumber: "P014",
    name: "Budget Wedding Banquet",
    description:
      "Value-oriented wedding package for medium-sized gatherings.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Marriage"],
    capacity: 350,
    timing: ["day"],
    timingWindow: {
      startTime: "09:00",
      endTime: "18:00",
    },
    price: 220000,

    decoration: createDecoration({
      haldi: true,
      vidhi: true,
      stage: true,
      varmala: true,
      theme: ["Traditional Decoration"],
    }),

    entertainment: createEntertainment({
      dholTasha: "optional",
      kakaService: "included",
      sound: true,
      lighting: true,
      traditionalMusic: "optional",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Tea"],
      lunch: ["Puri", "Bhaji", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 9,
      waterBottles: 500,
    }),

    otherFacilities: ["Parking", "Generator backup"],
  },

  {
    id: "P015",
    packageNumber: "P015",
    name: "Luxury Wedding Lawn",
    description:
      "Large premium lawn package for grand wedding celebrations.",
    venue: "OM SAI LAWNS",
    eventTypes: ["Marriage"],
    capacity: 2500,
    timing: ["night"],
    timingWindow: {
      startTime: "16:00",
      endTime: "23:30",
    },
    price: 750000,

    decoration: createDecoration({
      haldi: true,
      vidhi: true,
      stage: true,
      varmala: true,
      entry: true,
      theme: ["Floral Decoration", "Modern Decoration"],
      other: ["Grand floral gate", "Premium mandap"],
    }),

    entertainment: createEntertainment({
      dholTasha: "included",
      ghoda: "included",
      bhraman: "included",
      kakaService: "included",
      sound: true,
      lighting: true,
      led: "included",
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Upma", "Tea", "Coffee"],
      lunch: ["Puri", "Paneer", "Bhaji", "Dal", "Rice", "Sweet"],
      eveningBreakfast: ["Starters", "Snacks"],
      dinner: [
        "Chapati",
        "Paneer",
        "Vegetable",
        "Dal",
        "Rice",
        "Sweet",
        "Dessert",
      ],
    }),

    services: createServices({
      waiters: 35,
      waterBottles: 3000,
    }),

    otherFacilities: [
      "Large parking",
      "Generator backup",
      "Premium outdoor lighting",
      "Green room",
      "Bride and groom room",
    ],
  },

  {
    id: "P016",
    packageNumber: "P016",
    name: "Haldi Special",
    description:
      "Wedding Haldi-focused package with traditional decoration.",
    venue: "OM SAI LAWNS",
    eventTypes: ["Marriage"],
    capacity: 500,
    timing: ["day"],
    timingWindow: {
      startTime: "09:00",
      endTime: "15:00",
    },
    price: 130000,

    decoration: createDecoration({
      haldi: true,
      stage: true,
      entry: true,
      theme: ["Traditional Decoration", "Floral Decoration"],
      other: ["Yellow floral decor", "Haldi seating"],
    }),

    entertainment: createEntertainment({
      dholTasha: "included",
      sound: true,
      lighting: true,
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Tea"],
      lunch: ["Puri", "Bhaji", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 8,
      waterBottles: 600,
    }),

    otherFacilities: ["Parking", "Outdoor seating", "Photo area"],
  },

  {
    id: "P017",
    packageNumber: "P017",
    name: "Vidhi Ceremony Special",
    description:
      "Traditional wedding Vidhi ceremony package for family gatherings.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Marriage"],
    capacity: 400,
    timing: ["day"],
    timingWindow: {
      startTime: "08:00",
      endTime: "15:00",
    },
    price: 140000,

    decoration: createDecoration({
      vidhi: true,
      stage: true,
      entry: true,
      theme: ["Traditional Decoration"],
      other: ["Traditional ceremony backdrop"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      traditionalMusic: "included",
      kakaService: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Upma", "Tea"],
      lunch: ["Puri", "Bhaji", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 8,
      waterBottles: 500,
    }),

    otherFacilities: ["Parking", "Changing room", "Generator backup"],
  },

  {
    id: "P018",
    packageNumber: "P018",
    name: "Reception Night",
    description:
      "Elegant evening reception package with modern lighting and stage.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Marriage"],
    capacity: 900,
    timing: ["night"],
    timingWindow: {
      startTime: "17:00",
      endTime: "23:30",
    },
    price: 380000,

    decoration: createDecoration({
      stage: true,
      varmala: true,
      entry: true,
      theme: ["Modern Decoration", "Floral Decoration"],
      other: ["Premium reception backdrop"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      led: "included",
      traditionalMusic: "optional",
    }),

    catering: createCatering({
      eveningBreakfast: ["Starters", "Snacks"],
      eveningTea: ["Tea", "Coffee"],
      dinner: [
        "Chapati",
        "Paneer",
        "Vegetable",
        "Dal",
        "Rice",
        "Sweet",
        "Dessert",
      ],
    }),

    services: createServices({
      waiters: 20,
      waterBottles: 1400,
    }),

    otherFacilities: [
      "Parking",
      "Generator backup",
      "Changing room",
      "Photo area",
    ],
  },

  {
    id: "P019",
    packageNumber: "P019",
    name: "Corporate Gathering",
    description:
      "Flexible event package for meetings, gatherings and corporate functions.",
    venue: "OM SAI BANQUET HALL",
    eventTypes: ["Others"],
    capacity: 500,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "09:00",
      endTime: "21:00",
    },
    price: 175000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Modern Decoration"],
      other: ["Corporate backdrop", "Registration desk"],
    }),

    entertainment: createEntertainment({
      sound: true,
      lighting: true,
      led: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Upma", "Tea", "Coffee"],
      tea: ["Tea", "Coffee"],
      lunch: ["Chapati", "Paneer", "Bhaji", "Dal", "Rice", "Sweet"],
      eveningTea: ["Tea", "Coffee"],
    }),

    services: createServices({
      waiters: 12,
      waterBottles: 700,
    }),

    otherFacilities: [
      "Parking",
      "Projector area",
      "Registration desk",
      "Generator backup",
    ],
  },

  {
    id: "P020",
    packageNumber: "P020",
    name: "Grand Community Event",
    description:
      "Large-scale package designed for community and cultural events.",
    venue: "OM SAI LAWNS",
    eventTypes: ["Religious / Cultural Events", "Others"],
    capacity: 2000,
    timing: ["day", "night"],
    timingWindow: {
      startTime: "09:00",
      endTime: "22:30",
    },
    price: 420000,

    decoration: createDecoration({
      stage: true,
      entry: true,
      theme: ["Traditional Decoration", "Modern Decoration"],
      other: ["Large stage backdrop", "Decorative entrance"],
    }),

    entertainment: createEntertainment({
      dholTasha: "optional",
      sound: true,
      lighting: true,
      led: "included",
      traditionalMusic: "included",
    }),

    catering: createCatering({
      breakfast: ["Poha", "Upma", "Tea"],
      lunch: ["Puri", "Bhaji", "Dal", "Rice", "Sweet"],
      eveningTea: ["Tea", "Coffee"],
      dinner: ["Chapati", "Bhaji", "Dal", "Rice", "Sweet"],
    }),

    services: createServices({
      waiters: 25,
      waterBottles: 2500,
    }),

    otherFacilities: [
      "Large parking",
      "Large outdoor seating",
      "Generator backup",
      "Outdoor stage",
    ],
  },
];

const samplePackages = basePackages.map((pkg) => ({
  ...pkg,
  images: {
    gallery: images.gallery(),
    venue: images.venue(),
  },
  isDemoData: true,
}));

async function seedPackages() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the root .env file.");
    }

    console.log("Connecting to MongoDB Atlas...");

    await mongoose.connect(process.env.MONGODB_URI, {
  dbName: "omsai_planner",
});

    console.log("MongoDB connected.");

    const deleteResult = await Package.deleteMany({
      isDemoData: true,
    });

    console.log(
      `Removed ${deleteResult.deletedCount} existing demo packages.`
    );

    const insertedPackages = await Package.insertMany(samplePackages);

    console.log(
      `Successfully inserted ${insertedPackages.length} demo packages.`
    );

    console.log("Package numbers:");

    insertedPackages.forEach((pkg) => {
      console.log(`- ${pkg.packageNumber}: ${pkg.name}`);
    });

    console.log("\nDemo package seeding completed successfully.");
  } catch (error) {
    console.error("\nPackage seeding failed:");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

seedPackages();