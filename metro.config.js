/** @format */

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const dirname = process.cwd();

const config = getDefaultConfig(dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
