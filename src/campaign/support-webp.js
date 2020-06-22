let support = undefined;

export function supportWebp () {
  if (support !== undefined) {
    return support;
  }

  support = true;
  const d = document;

  try {
    let el = d.createElement('object');
    el.type = 'image/webp';
    el.style.visibility = 'hidden';
    el.innerHTML = '!';
    d.body.appendChild(el);
    support = !el.offsetWidth;
    d.body.removeChild(el);
  } catch (err) {
    support = false;
  }

  return support;
}
