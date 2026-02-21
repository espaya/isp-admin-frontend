export const formatAmount = (amount) => {
  if (!amount) return "₵0.00";

  const cedi = Number(amount) / 100; // convert from kobo
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  }).format(cedi);
};

export const formatDate = (date, type = "short") => {
  if (!date) return "-";

  const parsed = new Date(date);

  const options =
    type === "long"
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric" };

  return parsed.toLocaleDateString("en-GH", options);
};
