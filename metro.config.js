const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add support for Expo Router
config.resolver.platforms = ["ios", "android", "native", "web"];

// Add path alias support
config.resolver.alias = {
  "@": path.resolve(__dirname, "src"),
};

module.exports = config;
