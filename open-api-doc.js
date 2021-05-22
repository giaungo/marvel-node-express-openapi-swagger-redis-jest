module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'MARVEL Characters',
    description: 'Play MARVEL Characters API with NodeJS, ExpressJS, Open API, Swagger, Redis and Jest',
    termsOfService: '',
    contact: {
      name: 'Giau Ngo',
      email: 'hellokoding@gmail.com',
      url: 'https://hellokoding.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:8080/',
      description: 'Local server'
    }
  ],
  tags: [
    {
      name: 'CharactersAPI'
    }
  ],
  paths: {
    '/characters': {
      get: {
        tags: ['CharactersAPI'],
        description: 'Get Characters',
        operationId: 'getCharacters',
        parameters: [],
        responses: {
          '200': {
            description: 'All characters ids were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Characters'
                },
                example : [1234, 5678]
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example : {
                  code: 500,
                  status: 'Internal server error'
                }
              }
            }
          }
        }
      },
    },
    '/characters/{characterId}': {
      get: {
        tags: ['CharactersAPI'],
        description: 'Get a character by id',
        operationId: 'getCharactersById',
        parameters: [
          {
            name: 'characterId',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/id'
            },
            required: true,
            description: 'Character id'
          }
        ],
        responses: {
          '200': {
            description: 'Character info was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Character'
                }
              }
            }
          },
          '400': {
            description: 'Character was not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example : {
                  code: 404,
                  status: 'We couldn\'t find that character'
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example : {
                  code: 500,
                  status: 'Internal server error'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      id: {
        type: 'integer',
        description: 'Character identification number',
        example: 1234
      },
      name: {
        type: 'string',
        example: 'Tony Stark'
      },
      description: {
        type: 'string',
        description: 'Character description',
        example: ''
      },
      Character: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/id'
          },
          name: {
            $ref: '#/components/schemas/name'
          },
          description: {
            $ref: '#/components/schemas/description'
          }
        }
      },
      Characters: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/id'
        }
      },
      Error: {
        type: 'object',
        properties: {
          code: {
            type: 'integer'
          },
          status: {
            type: 'string'
          }
        }
      }
    },
  }
};