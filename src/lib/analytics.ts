export const ANALYTICS_FILTER_TYPE = {
  DAY: 'Día',
  MONTH: 'Mes',
  YEAR: 'Año',
}

type FilterType =
  (typeof ANALYTICS_FILTER_TYPE)[keyof typeof ANALYTICS_FILTER_TYPE]

export function getDateFormat(filterType: FilterType) {
  switch (filterType) {
    case ANALYTICS_FILTER_TYPE.DAY:
      return 'dd/MM/yyyy'
    case ANALYTICS_FILTER_TYPE.MONTH:
      return 'MM/yyyy'
    case ANALYTICS_FILTER_TYPE.YEAR:
      return 'yyyy'
    default:
      return 'dd/MM/yyyy'
  }
}
