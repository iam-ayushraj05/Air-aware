interface CalculationDisclosureProps {
  assumptions: string;
  formula: string;
  sourceCitation: string;
}

/**
 * Accordion panel displaying transparent mathematical formulas, assumptions, and citations.
 */
export function CalculationDisclosure({
  assumptions,
  formula,
  sourceCitation,
}: CalculationDisclosureProps) {
  return (
    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      <div>
        <strong className="block text-[11px] font-bold">Assumptions & Baseline:</strong>
        <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
          {assumptions}
        </p>
      </div>
      <div>
        <strong className="block text-[11px] font-bold">Calculation Formula:</strong>
        <code className="block p-1.5 rounded bg-slate-200 dark:bg-slate-900 font-mono text-[10px]">
          {formula}
        </code>
      </div>
      <div className="text-[10px] text-slate-500">Source Citation: {sourceCitation}</div>
    </div>
  );
}
