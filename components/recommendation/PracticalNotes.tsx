type PracticalNotesProps = {
  notes?: string[];
};

export function PracticalNotes({ notes }: PracticalNotesProps) {
  if (!notes?.length) {
    return null;
  }

  return (
    <ul className="mt-8 flex flex-wrap gap-2" aria-label="Praktiska läsnoteringar">
      {notes.map((note) => (
        <li
          key={note}
          className="rounded-quiet border border-brass/30 bg-paper px-3 py-2 text-sm leading-tight text-ink-soft"
        >
          {note}
        </li>
      ))}
    </ul>
  );
}
