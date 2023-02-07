/** src/model/slug.js */

const PubSchema = {
  /** Configure the collection's schema.
   * https://docs.mongodb.com/manual/core/schema-validation/
   */
  bsonType: "object",

  required: [ "name", "pubkey" ],
  
  properties: {
    name: {
      bsonType: "string",
      maxLength: 64,
      description: "Must be a string and is required."
    },
    pubkey: {
      bsonType: "string",
      maxLength: 64,
      description: "Must be a string and is required."
    },
    relays: {
      bsonType: [ "string" ],
      description: "Array of strings."
    }
  }
}

export const PubModel = {
  // Name of the collection.
  name: 'pubkeys',

  indexes: [
    /** Configure the collection's indexes.
     * https://docs.mongodb.com/manual/reference/command/createIndexes
     */
    {
      name: "_lookup_",
      key: { name: 1, pubkey: 1 },
      unique: true
    }
  ],
  options: {
    validator: { $jsonSchema: PubSchema },
    validationLevel: "strict",
    validationAction: "error"
  }
}
