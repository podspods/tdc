export const clientSchemas = {
  // Schéma pour créer un client
  createClient: {
    body: {
      type: "object",
      required: ["client_code", "last_name", "first_name", "email", "phone"],
      properties: {
        client_code: { type: "string", minLength: 3, maxLength: 20 },
        last_name: { type: "string", minLength: 1, maxLength: 100 },
        first_name: { type: "string", minLength: 1, maxLength: 100 },
        email: { type: "string", format: "email" },
        phone: { type: "string", pattern: "^[0-9+\-\s]{10,15}$" },
        address: { type: "string", maxLength: 200 },
        city: { type: "string", maxLength: 100 },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {
            type: "object",
            properties: {
              id: { type: "number" },
              client_code: { type: "string" },
              last_name: { type: "string" },
              first_name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
              city: { type: "string" },
              created_at: { type: "string" },
            },
          },
          message: { type: "string" },
        },
      },
    },
  },

  // Schéma pour mettre à jour un client
  updateClient: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string", pattern: "^[0-9]+$" },
      },
    },
    body: {
      type: "object",
      properties: {
        client_code: { type: "string", minLength: 3, maxLength: 20 },
        last_name: { type: "string", minLength: 1, maxLength: 100 },
        first_name: { type: "string", minLength: 1, maxLength: 100 },
        email: { type: "string", format: "email" },
        phone: { type: "string", pattern: "^[0-9+\-\s]{10,15}$" },
        address: { type: "string", maxLength: 200 },
        city: { type: "string", maxLength: 100 },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {
            type: "object",
            properties: {
              id: { type: "number" },
              client_code: { type: "string" },
              last_name: { type: "string" },
              first_name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
              city: { type: "string" },
              updated_at: { type: "string" },
            },
          },
          message: { type: "string" },
        },
      },
    },
  },

  // Schéma pour récupérer un client par ID
  getClient: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string", pattern: "^[0-9]+$" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {
            type: "object",
            properties: {
              id: { type: "number" },
              client_code: { type: "string" },
              last_name: { type: "string" },
              first_name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
              city: { type: "string" },
              created_at: { type: "string" },
              updated_at: { type: "string" },
            },
          },
        },
      },
    },
  },

  // Schéma pour la liste paginée
  listClients: {
    querystring: {
      type: "object",
      properties: {
        page: { type: "number", default: 1, minimum: 1 },
        limit: { type: "number", default: 10, minimum: 1, maximum: 100 },
        search: { type: "string", maxLength: 100 },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                client_code: { type: "string" },
                last_name: { type: "string" },
                first_name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                city: { type: "string" },
              },
            },
          },
          pagination: {
            type: "object",
            properties: {
              page: { type: "number" },
              limit: { type: "number" },
              total: { type: "number" },
              pages: { type: "number" },
            },
          },
        },
      },
    },
  },
};
