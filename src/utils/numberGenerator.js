/**
 * 문서번호 생성
 *
 * 예)
 * generateDocumentNo("IN", [])
 * → IN-20260711-001
 *
 * generateDocumentNo("OUT", orders)
 * → OUT-20260711-003
 */

export function generateDocumentNo(prefix, documents = [], key = "documentNo") {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const date = `${yyyy}${mm}${dd}`;

  const count = documents.filter((item) => item[key]?.includes(`${prefix}-${date}`)).length + 1;

  const sequence = String(count).padStart(3, "0");

  return `${prefix}-${date}-${sequence}`;
}
