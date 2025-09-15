import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "CodingChallenge API",
      version: "1.0.0",
      description: "API documentation for CodingChallenge backend"
    },
    servers: [
      { url: "/api/v1" }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        ApiError: {
          type: "object",
          properties: {
            message: { type: "string" },
            errors: { description: "Additional error details", nullable: true }
          },
          required: ["message"]
        },
        ApiFailure: {
          type: "object",
          properties: {
            success: { type: "boolean", enum: [false] },
            error: { $ref: "#/components/schemas/ApiError" }
          },
          required: ["success", "error"]
        },
        HealthData: {
          type: "object",
          properties: {
            status: { type: "string", example: "ok" },
            timestamp: { type: "string", format: "date-time" }
          },
          required: ["status", "timestamp"]
        },
        HealthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", enum: [true] },
            data: { $ref: "#/components/schemas/HealthData" }
          },
          required: ["success", "data"]
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" }
          },
          required: ["email"]
        },
        LoginResponseData: {
          type: "object",
          properties: {
            token: { type: "string" },
            userId: { type: "string" }
          },
          required: ["token", "userId"]
        },
        LoginResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", enum: [true] },
            data: { $ref: "#/components/schemas/LoginResponseData" }
          },
          required: ["success", "data"]
        },
        Profile: {
          type: "object",
          properties: {
            userId: { type: "string" },
            name: { type: "string", nullable: true },
            email: { type: "string", format: "email" },
            bio: { type: "string", nullable: true },
            githubUsername: { type: "string", nullable: true },
            updatedAt: { type: "string", format: "date-time" }
          },
          required: ["userId", "email", "updatedAt"]
        },
        GetProfileResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", enum: [true] },
            data: { $ref: "#/components/schemas/Profile" }
          },
          required: ["success", "data"]
        },
        UpdateProfileRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            bio: { type: "string" },
            githubUsername: { type: "string" }
          },
          required: ["email"]
        },
        UpdateProfileResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", enum: [true] },
            data: { $ref: "#/components/schemas/Profile" }
          },
          required: ["success", "data"]
        },
        GitHubRepo: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            html_url: { type: "string", format: "uri" },
            description: { type: "string", nullable: true },
            stargazers_count: { type: "integer" },
            language: { type: "string", nullable: true },
            fork: { type: "boolean" }
          },
          required: ["id", "name", "html_url", "stargazers_count", "fork"]
        },
        GetReposResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", enum: [true] },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/GitHubRepo" }
            }
          },
          required: ["success", "data"]
        }
      }
    },
    tags: [
      { name: "Health", description: "Health check" },
      { name: "Auth", description: "Authentication" },
      { name: "Profile", description: "User profile" },
      { name: "GitHub", description: "GitHub integration" }
    ]
  },
  apis: [
    "./src/routes/**/*.ts",
    "./src/controllers/**/*.ts"
  ]
} as const;

export const swaggerSpec = swaggerJsdoc(options as any);


