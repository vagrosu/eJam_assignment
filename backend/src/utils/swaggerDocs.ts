import { OpenAPIV3 } from "openapi-types";

/**
 * Manages and aggregates Swagger/OpenAPI documentation for API routes.
 *
 * This class allows you to dynamically add and retrieve Swagger documentation paths
 * in a structured and type-safe way. It is useful for modularizing route-specific
 * Swagger documentation and consolidating them into a single object for Swagger UI setup.
 *
 * @example
 * const AuthDocs = new SwaggerDocsManager();
 *
 * AuthDocs.add( routeDocumentationObject1 );
 * AuthDocs.add( routeDocumentationObject2 );
 *
 * export { AuthDocs };
 */
export class SwaggerDocsManager {
  private docs: Record<string, OpenAPIV3.PathItemObject>;

  constructor() {
    this.docs = {};
  }

  /**
   * Add a new documentation object.
   * @param doc - A Swagger documentation object.
   */
  add(doc: Record<string, OpenAPIV3.PathItemObject>) {
    for (const [path, methods] of Object.entries(doc)) {
      if (!this.docs[path]) {
        this.docs[path] = {};
      }
      Object.assign(this.docs[path], methods);
    }
  }

  /**
   * Get the aggregated Swagger documentation.
   * @returns The combined Swagger documentation object.
   */
  getDocs(): Record<string, OpenAPIV3.PathItemObject> {
    return this.docs;
  }
}

/**
 * Creates a JSON request body object for OpenAPI 3.0.
 * @param properties - A map of property names to OpenAPI ReferenceObject or SchemaObject.
 * @param extras - Additional properties to include in the RequestBodyObject.
 * @returns An OpenAPI ReferenceObject or RequestBodyObject.
 */
export const jsonRequestBody = (
  properties: Record<string, (OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject) & { isRequired?: boolean }>,
  extras: Omit<OpenAPIV3.RequestBodyObject, "content"> = {}
): OpenAPIV3.RequestBodyObject => {
  const requiredFields = Object.entries(properties)
    .filter(([, schema]) => schema.isRequired)
    .map(([key]) => key);

  const sanitizedProperties = Object.fromEntries(
    Object.entries(properties).map(([key, schema]) => {
      const { isRequired, ...rest } = schema; // Remove `isRequired`
      return [key, rest];
    })
  );

  return {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: sanitizedProperties,
          ...(requiredFields.length > 0 && { required: requiredFields }),
        },
      },
    },
    ...extras,
  };
};

export const paginationQueryParams: OpenAPIV3.ParameterObject[] = [
  {
    in: "query",
    name: "pageSize",
    required: false,
    schema: { type: "integer" },
    description: "Page size",
  },
  {
    in: "query",
    name: "page",
    required: false,
    schema: { type: "integer" },
    description: "Page number",
  },
];
