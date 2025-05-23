export const getMostFrequentString = (arr: string[]) => {
  if (arr.length === 0) {
    return null
  }

  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (Object.keys(hashmap).length === 0) {
    return null
  }

  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b,
  )
}
