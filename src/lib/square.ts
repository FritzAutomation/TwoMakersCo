import { SquareClient, SquareEnvironment } from 'square'

// Square client for server-side operations
export function createSquareClient() {
  return new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN!,
    environment: process.env.NODE_ENV === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
  })
}
