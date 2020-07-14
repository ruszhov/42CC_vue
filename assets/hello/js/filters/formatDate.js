export default function (value) {
  if (value) {
    return moment(String(value)).format("MMMM D, YYYY, HH:MM a");
  }
}