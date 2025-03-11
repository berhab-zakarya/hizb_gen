export function getQuarterPages(hizb: number, quarter: number): { pages: number[] } | undefined {
  const startPage = (hizb - 1) * 8 + quarter
  const pages = [startPage]
  return { pages }
}

