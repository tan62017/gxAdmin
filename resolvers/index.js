export function toResolver(name) {
  return name === 'to'
    ? {
        name: 'default',
        from: 'await-to-js'
      }
    : null
}
