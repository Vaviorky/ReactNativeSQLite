export function formatDate(dateToFormat) {
  let dd = dateToFormat.getDate();
  let mm = dateToFormat.getMonth() + 1; //January is 0!

  const yyyy = dateToFormat.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  dateToFormat = dd + '.' + mm + '.' + yyyy;
  return dateToFormat;
}

export function parseRoomType(roomType) {
  switch (roomType) {
    default:
    case "single":
      return "Pojedynczy";
    case "double":
      return "Podwójny";
    case "triple":
      return "Potrójny";
  }
}