async function withFetch() {
    const res = await fetch('http://localhost:3000')
    const json = await res.json()
  
    return json
  }
  const unmockedFetch = global.fetch
  
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
  })
  
  afterAll(() => {
    global.fetch = unmockedFetch
  })
  
  describe('withFetch', () => {
    test('works', async () => {
      const json = await withFetch()
      expect(Array.isArray(json)).toEqual(true)
      expect(json.length).toEqual(0)
    })
  })