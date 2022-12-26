/**
 * @fileoverview fsd relative path checker
 * @author Nikolai Zein
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/path-checker'),
  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
})
ruleTester.run('path-checker', rule, {
  valid: [
    {
      filename: '/home/study/ulbi/expert_react/src/entities/Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename:
        '/home/study/ulbi/expert_react/src/entities/Article/folder/file.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ message: 'Import has to be relative within a slice' }],
      options: [
        {
          alias: '@',
        },
      ],
      output:
        "import { addCommentFormActions, addCommentFormReducer } from '../model/slices/addCommentFormSlice'",
    },
    {
      filename:
        '/home/study/ulbi/expert_react/src/entities/Article/folder/file.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ message: 'Import has to be relative within a slice' }],
      output:
        "import { addCommentFormActions, addCommentFormReducer } from '../model/slices/addCommentFormSlice'",
    },
  ],
})
