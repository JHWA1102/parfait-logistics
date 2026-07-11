/**
 * ID로 원하는 필드값 조회
 *
 * @param {Array} list
 * @param {Number|String} id
 * @param {String} field
 * @returns {String}
 */
export function findById(list, id, field) {
  const item = list.find((item) => String(item.id) === String(id));

  return item ? item[field] : "-";
}

/**
 * ID로 객체 조회
 *
 * @param {Array} list
 * @param {Number|String} id
 * @returns {Object|null}
 */
export function findItemById(list, id) {
  return list.find((item) => item.id === id) ?? null;
}

/**
 * 코드(Code)로 객체 조회
 *
 * @param {Array} list
 * @param {String} code
 * @returns {Object|null}
 */
export function findItemByCode(list, code) {
  return list.find((item) => item.code === code) ?? null;
}

export function toOptions(list, labelField, valueField = "id") {
  return list.map((item) => ({
    label: item[labelField],
    value: item[valueField],
  }));
}
