export default function generateId() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i <= 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}
