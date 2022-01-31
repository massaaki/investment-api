export const env = {
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  originUrl: process.env.ORIGIN_URL || "http://localhost:3000/"
}