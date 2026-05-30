type ProgressIndicatorProps = {
  current: number;
  total: number;
  onGoTo?: (step: number) => void;
};

export function ProgressIndicator({ current, total, onGoTo }: ProgressIndicatorProps) {
  return (
    <div className="mb-8" aria-label={`Fråga ${current} av ${total}`}>
      <p className="mb-3 text-sm text-ink-soft">
        fråga {current} av {total}
      </p>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1;
          const isPast = step < current;
          const isCurrent = step === current;
          const isClickable = isPast && onGoTo != null;

          return isClickable ? (
            <button
              key={step}
              type="button"
              onClick={() => onGoTo(step)}
              aria-label={`Gå tillbaka till fråga ${step}`}
              className="h-1.5 flex-1 rounded-full bg-brass transition-all duration-calm hover:bg-brass/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
            />
          ) : (
            <div
              key={step}
              className={[
                "h-1.5 flex-1 rounded-full transition-all duration-reveal",
                isCurrent ? "bg-brass" : "bg-brass/20",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}
