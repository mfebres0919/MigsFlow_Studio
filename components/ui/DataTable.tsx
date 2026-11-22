// A plain table of facts (payments, publishing history, DNS records).
//
// It is "generic": <Row> stands for whatever kind of thing each row is. The
// caller describes the columns once, and each column says how to draw its
// cell from a row.

type Column<Row> = {
  header: string;
  cell: (row: Row) => React.ReactNode;
  /** Right-align, for amounts of money. */
  alignRight?: boolean;
};

type DataTableProps<Row> = {
  /** Read by screen readers as the table's name. */
  caption: string;
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
};

export default function DataTable<Row>({ caption, columns, rows, rowKey }: DataTableProps<Row>) {
  return (
    // On a narrow screen the table scrolls sideways inside this box, so the
    // page itself never does. tabIndex lets keyboard users scroll it too.
    // "relative" keeps visually hidden text inside the cells (e.g. the extra
    // words on a Download button) from escaping the box and widening the page.
    <div role="region" aria-label={caption} tabIndex={0} className="relative overflow-x-auto rounded-control border border-line">
      <table className="w-full min-w-96 border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-raised">
            {columns.map((column) => (
              <th key={column.header} scope="col" className={`px-4 py-2.5 font-medium ${column.alignRight ? "text-right" : ""}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-t border-line">
              {columns.map((column) => (
                <td key={column.header} className={`px-4 py-3 align-middle ${column.alignRight ? "text-right" : ""}`}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
