module.exports = class PostBuildPlugin {
  constructor(options = {}) {
    this.filename = options.filename || 'app.json';
    this.mappings = {
      js: /\.js$/,
      css: /\.css$/,
    };
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('PostBuildPlugin', (compilation, callback) => {
      const publicPath = compilation.mainTemplate.getPublicPath({
        hash: compilation.hash,
      });
      const result = {};

      const mainEntryPoint = compilation.entrypoints.get('main');
      const assets = mainEntryPoint.chunks
        .reduce((array, chunk) => array.concat(chunk.files || []), [])
        .map(asset => publicPath + asset);

      Object.keys(this.mappings).forEach(mapping => {
        const regex = this.mappings[mapping];
        result[mapping] = assets.filter(asset => regex.test(asset));
      });

      const content = JSON.stringify(result);
      compilation.assets[this.filename] = {
        source: () => content,
        size: () => content.length,
      };
      callback();
    });
  }
};
