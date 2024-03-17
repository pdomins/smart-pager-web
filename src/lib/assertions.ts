import assert from 'assert'

type MessageOrError = Parameters<typeof assert>[1]

export const assertAndReturn = <V>(
  value: V,
  messageOrError?: MessageOrError
): NonNullable<V> => {
  assert(value, messageOrError)

  return value as NonNullable<V>
}
