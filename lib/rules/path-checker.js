/**
 * @fileoverview fsd relative path checker
 * @author Nikolai Zein
 */
'use strict'

const path = require('path')
const { isPathRelative } = require('../helpers')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'fsd relative path checker',
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
        },
      },
    ], // Add a schema if the rule has options
    messages: {
      wrongImportPath: 'Import has to be relative within a slice',
    },
  },

  create(context) {
    const alias = context.options[0]?.alias || ''

    return {
      ImportDeclaration(node) {
        // from 'entities/Article'
        const value = node.source.value
        const importFrom = alias ? value.replace(`${alias}/`, '') : value
        // /home/study/ulbi/react/src/entites/Article
        const fromFileName = context.getFilename()

        if (shouldBeRelative(fromFileName, importFrom)) {
          context.report({
            node: node,
            messageId: 'wrongImportPath',
            data: {},
            fix: (fixer) => {
              // entites/Article/Article.tsx
              const normilizedPath = getNormilizedCurrentFilePath(fromFileName)
                .split('/')
                .slice(0, -1)
                .join('/')

              let relativePath = path.relative(normilizedPath, `/${importFrom}`)

              if (!relativePath.startsWith('.')) {
                relativePath = './' + relativePath
              }

              return fixer.replaceText(node.source, `'${relativePath}'`)
            },
          })
        }
      },
    }
  },
}

const layers = {
  entities: 'entities',
  features: 'features',
  shared: 'shared',
  pages: 'pages',
  widgets: 'widgets',
}

function getNormilizedCurrentFilePath(currentFilePath) {
  const normalizedPath = path
    .toNamespacedPath(currentFilePath)
    .replace(/\\/g, '/')
  const project = normalizedPath.split('src')[1]

  // project.split('\\').length > 1 ? project.split('\\') : project.split('/')
  return project
}

function shouldBeRelative(currentFile, from) {
  if (isPathRelative(from)) {
    return false
  }

  // from 'entities/Article'
  const fromArray = from.split('/')
  const fromLayer = fromArray[0] // entities
  const fromSlice = fromArray[1] // Article

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false
  }

  // /home/study/ulbi/react/src/entites/Article
  //const normalizedPath = path.toNamespacedPath(currentFile)
  const project = getNormilizedCurrentFilePath(currentFile)
  const projectArray = project.split('/')

  const projectLayer = projectArray[1]
  const projectSlice = projectArray[2]

  if (!projectLayer || !projectSlice || !layers[projectLayer]) {
    return false
  }

  return projectLayer === fromLayer && projectSlice === fromSlice
}
