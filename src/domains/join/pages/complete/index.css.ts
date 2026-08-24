import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

const colors = {
  background: "#F1F8FF",
  pill: "rgba(255, 255, 255, 0.1)",
  pillText: "#FFFFFF",
  cardTitle: "#FFFFFF",
  location: "#FFFFFF",
  title: "#3793FF",
  description: "#707D91",
};

export const root = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
  backgroundColor: colors.background,
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 55,
  padding: "80px 20px 0",
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 17,
  width: 287,
  minHeight: 395,
  padding: 20,
  borderRadius: 15,
  backgroundImage: "linear-gradient(180deg, #258AFF 46%, #66ADFF 100%)",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.25)",
  position: "relative",
  overflow: "hidden",
});

export const momoImage = style({
  display: "block",
  position: "absolute",
  left: 35,
  top: 158,
  width: 385,
  borderRadius: 8,
});

export const dateTimePill = style({
  display: "flex",
  alignItems: "center",
  gap: 13,
  height: 38,
  padding: "0 16px",
  borderRadius: 8,
  backgroundColor: colors.pill,
  color: colors.pillText,
  fontFamily: '"Montserrat"',
  fontSize: 17,
  fontWeight: 500,
});

export const cardTitle = style({
  margin: 0,
  color: colors.cardTitle,
  textAlign: "center",
  textShadow: "0 0 4px rgba(0, 0, 0, 0.25)",
  ...text({ size: 24, weight: 600 }),
});

export const locationRow = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: 8,
  marginBottom: 18,
  color: colors.location,
  ...text({ size: 14, weight: 600 }),
});

export const locationIcon = style({
  width: 20,
  height: 20,
  color: colors.location,
});

export const textSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
});

export const title = style({
  margin: 0,
  color: colors.title,
  textAlign: "center",
  ...text({ size: 24, weight: 600 }),
});

export const description = style({
  margin: 0,
  color: colors.description,
  textAlign: "center",
  ...text({ size: 16, weight: 500 }),
});

export const footer = style({
  display: "flex",
  marginTop: "auto",
  padding: "10px 20px calc(21px + env(safe-area-inset-bottom))",
});
