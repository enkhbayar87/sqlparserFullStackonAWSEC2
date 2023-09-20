const { Parser } = require('node-sql-parser')
const parser = new Parser()

const onHashWhere = (astWhere, i = 0) => {
  if (astWhere.left.type === 'binary_expr') {
    onHashWhere(astWhere.left, i + 1)
  }
  if (astWhere.right.type === 'binary_expr') {
    onHashWhere(astWhere.right, i + 1)
  }
  if (astWhere.left.type === 'column_ref') {
    astWhere.left.column = `<hashed column name of ${astWhere.left.column}>`
  }
}
const onHashSqlText = (originalSqlText) => {
  const ast = parser.astify(originalSqlText)
  console.log('ast', ast)
  if ('where' in ast) {
    onHashWhere(ast.where)
  }

  for (const c of ast[0].columns) {
    console.log('c', c)
    if (c.expr.type === 'column_ref') {
      c.expr.column = `<hashed column name of ${c.expr.column}>` 
    }
  }
  const parseText = parser.sqlify(ast)
  return parseText
}
module.exports = onHashSqlText