export const TableHeader = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  if (!title && !description) return null;

  return (
    <div className="space-y-1">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
