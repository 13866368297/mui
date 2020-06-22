export default function (px) {
  const remRate = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return px / remRate;
}
