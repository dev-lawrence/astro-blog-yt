export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const parsedDate = new Date(date);
  const day = parsedDate.getDate();
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
  const monthYear = parsedDate.toLocaleDateString("en", options);
  return `${dayWithSuffix} ${monthYear}`;
};
