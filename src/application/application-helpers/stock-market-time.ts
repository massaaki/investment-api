export function isOpened(opensAt: string, closesAt: string) {

  const currentTime = new Date();
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();

  const [opensAtHour, opensAtMin] = opensAt.split(':');
  const openTime = new Date(year, month, day, parseInt(opensAtHour), parseInt(opensAtMin));

  const [closesAtHour, closesAtMin] = closesAt.split(':');
  const closeTime = new Date(year, month, day, parseInt(closesAtHour), parseInt(closesAtMin));

  if (currentTime.getTime() > openTime.getTime() && currentTime.getTime() < closeTime.getTime()) {
    return true
  }
  return false
}