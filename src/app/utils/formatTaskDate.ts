const formatTaskDate = (date = new Date(), action = "Created") => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isToday) return `${action} today at ${time}`;
  if (isYesterday) return `${action} yesterday at ${time}`;

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${action} on ${datePart} at ${time}`;
};

export { formatTaskDate };
