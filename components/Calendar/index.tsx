/** @format */

import { Platform } from "react-native";
import CalendarAndroid from "./Calendar.android";
import CalendarIos from "./Calendar.ios";

const Calendar = Platform.OS === "android" ? CalendarAndroid : CalendarIos;

export default Calendar;
