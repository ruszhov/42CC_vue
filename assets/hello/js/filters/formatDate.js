import strftime from "./strftime.js"
export default function (value) {
  if (value) {
    return strftime('%B %e, %G, %l:%M %P', value)
  }
}