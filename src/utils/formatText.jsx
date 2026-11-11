// Render teks dari admin: **teks** jadi tebal, baris kosong jadi paragraf baru.
// Tanpa dangerouslySetInnerHTML, jadi aman dari HTML/script.
export function renderBold(text, boldClass) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <span key={i} className={boldClass}>{part.slice(2, -2)}</span>
    ) : (
      part
    )
  );
}

export function renderParagraphs(text, boldClass) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => <p key={i}>{renderBold(p, boldClass)}</p>);
}
