import 'quasar';

declare module 'quasar' {
  type QTableColumn<
    Row extends Record<string, any> = any,
    K = Row extends Record<string, any> ? keyof Row : string,
    Field = K | ((row: Row) => any)
  > = Omit<NonNullable<QTable['columns']>[0], 'field' | 'format'> & {
    /**
     * Row Object property to determine value for this column or function which maps to the required property
     */
    field: Field;
    /**
     * Horizontal alignment of cells in this column
     *
     * @default 'right'
     */
    align?: 'left' | 'right' | 'center';
    /**
     * Function you can apply to format your data
     *
     * @param val Value of the cell
     * @param row Full Row object in which the cell is contained
     *
     * @returns The resulting formatted value
     */
    format?: (val: any, row: Row) => string;
  };
}
