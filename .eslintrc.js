module.exports = {
  rules: {
    // Enforce kebab-case for file names
    // This requires eslint-plugin-filenames to be installed
    "filenames/match-regex": ["error", "^[a-z0-9-]+(.test|.spec)?$"],

    // Enforce component names are PascalCase (this is a custom rule you'd need to implement)
    "@typescript-eslint/naming-convention": [
      "error",
      {
        // For React components
        selector: "function",
        format: ["PascalCase"],
        filter: {
          regex: "^[A-Z]",
          match: true
        }
      },
      {
        // For variables, functions, methods that aren't components
        selector: ["variable", "function"],
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        filter: {
          regex: "^[a-z]|^_|^[A-Z0-9_]+$|^[A-Z][a-zA-Z0-9]+$",
          match: true
        }
      },
      {
        // For TypeScript interfaces
        selector: "interface",
        format: ["PascalCase"],
        prefix: ["I"]
      },
      {
        // For TypeScript types
        selector: "typeAlias",
        format: ["PascalCase"]
      },
      {
        // For TypeScript enums
        selector: "enum",
        format: ["PascalCase"]
      },
      {
        // For properties (object keys)
        selector: "property",
        format: null // Allow any format for object keys to support both camelCase and snake_case for DB fields
      }
    ],

    // Import pattern rules
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // Enforce consistent import patterns
          {
            target: "src/**/*",
            from: "src/components/**/*",
            message: "Please use barrel imports from component directories"
          }
        ]
      }
    ]
  }
}; 