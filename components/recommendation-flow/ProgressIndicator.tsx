type ProgressIndicatorProps = {
  current: number;
  total: number;
};

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="mb-8" aria-label={`Fråga ${current} av ${total}`}>
      <p className="mb-3 text-sm text-ink-soft">
        fråga {current} av {total}
      </p>
      <div className="h-px w-full bg-brass/20">
        <div
          className="h-px bg-brass transition-all duration-reveal"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
