export default function (value) {
  if (value) {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      this.age--;
    }
    return 0 <= age && age <= 100
  }
}