export type PrintOrientation = 'portrait' | 'landscape';

export function printA4(orientation: PrintOrientation) {
  const styleId = 'active-a4-print-orientation';
  document.getElementById(styleId)?.remove();

  const pageStyle = document.createElement('style');
  pageStyle.id = styleId;
  pageStyle.textContent = `@media print { @page { size: A4 ${orientation}; margin: 8mm; } }`;
  document.head.appendChild(pageStyle);
  document.body.dataset.printOrientation = orientation;

  const cleanup = () => {
    pageStyle.remove();
    delete document.body.dataset.printOrientation;
  };

  window.addEventListener('afterprint', cleanup, { once: true });
  window.print();
}
