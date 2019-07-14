const aliasMap = {
  react: require.resolve('./aliases/react'),
  'react-router': require.resolve('./aliases/react-router'),
  'react-router-dom': require.resolve('./aliases/react-router-dom'),
  'react-redux': require.resolve('./aliases/react-redux'),
  '@micro-fe/Bridge': require.resolve('./aliases/@micro-fe/Bridge'),
};

module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const importedPath = path.node.source.value;
        if (importedPath in aliasMap) {
          path
            .get('source')
            .replaceWith(t.stringLiteral(aliasMap[importedPath]));
        }
      },
    },
  };
};
