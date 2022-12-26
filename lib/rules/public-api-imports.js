/**
 * @fileoverview Deny non public api imports
 * @author Nikolai Zein
 */
'use strict'

const micromatch = require('micromatch')
const { isPathRelative } = require('../helpers')
const path = require('path')

const PUBLIC_ERROR = 'PUBLIC_ERROR'
const TEST_PUBLIC_ERROR = 'TEST_PUBLIC_ERROR'

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'Deny non public api imports',
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
          testFilesPatterns: {
            type: 'array',
          },
        },
      },
    ],
    messages: {
      [PUBLIC_ERROR]: 'Absolute import is allowed from public api only',
      [TEST_PUBLIC_ERROR]:
        'Testing data has to be imported from testing public api file: testing.ts',
    },
  },

  create(context) {
    const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {}

    const checkingLayers = {
      entities: 'entities',
      features: 'features',
      pages: 'pages',
      widgets: 'widgets',
    }

    return {
      ImportDeclaration(node) {
        // from 'entities/Article'
        const value = node.source.value
        const importFrom = alias ? value.replace(`${alias}/`, '') : value

        if (isPathRelative(importFrom)) {
          return
        }

        // [entities,article,model, types]
        const segments = importFrom.split('/')
        const layer = segments[0]
        const slice = segments[1]

        if (!checkingLayers[layer]) {
          return
        }

        const isImportNotFromPublicApi = segments.length > 2
        // [entities, article, testing]
        const isTestingPublicApi =
          segments[2] === 'testing' && segments.length <= 3

        if (isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report({
            node: node,
            messageId: PUBLIC_ERROR,
            fix: (fixer) => {
              return fixer.replaceText(
                node.source,
                `'${alias}/${layer}/${slice}'`
              )
            },
            data: {},
          })
        }

        if (isTestingPublicApi) {
          const currentFilePath = context.getFilename()
          const normalizedPath = path
            .toNamespacedPath(currentFilePath)
            .replace(/\\/g, '/')

          const isCurrentFileTesting = testFilesPatterns.some((pattern) =>
            micromatch.isMatch(normalizedPath, pattern)
          )

          if (!isCurrentFileTesting) {
            context.report({
              node: node,
              messageId: TEST_PUBLIC_ERROR,
              data: {},
            })
          }
        }
      },
    }
  },
}
