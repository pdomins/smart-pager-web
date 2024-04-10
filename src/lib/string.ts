export function toKebabCase(str: string) {
  const alphanumericAndSpaces = str
    .replace(/[^a-z0-9\s]/gi, '')
    .toLowerCase()
    .trim()

  const kebabCase = alphanumericAndSpaces.replace(/\s+/g, '-')
  return kebabCase
}
