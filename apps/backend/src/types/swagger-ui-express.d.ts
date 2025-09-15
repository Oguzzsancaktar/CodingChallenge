declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express'

  const swaggerUi: {
    serve: RequestHandler
    setup: (document?: any, customOptions?: any, swaggerOptions?: any, customCss?: string, customfavIcon?: string, swaggerUrl?: string, options?: any) => RequestHandler
  }

  export default swaggerUi
}


