export default function (value) {
  if (value) {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      this.age--;
    }
    if (age >= 0 && age <= 100) {
      return true;
    } else {
      return false;
    }
  }
}
