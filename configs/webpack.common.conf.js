const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const glob = require('glob');
const vueLoaderConfig = require('./vue-loader.conf');
const vueWebTemp = helper.rootNode(config.templateDir);
const hasPluginInstalled = fs.existsSync(helper.rootNode(config.pluginFilePath));
const isWin = /^win/.test(process.platform);
const weexEntry = {
  'index': helper.root('entry.js'),
  'ModWeexStyle1': helper.root('entry/ModWeexStyle1.js'), // MXU 报料
  'ModWeexStyle1Post':helper.root('entry/ModWeexStyle1Post.js'),
  'ModWeexStyle1ReportDetail':helper.root('entry/ModWeexStyle1ReportDetail.js'),
  'ModWeexStyle2': helper.root('entry/ModWeexStyle2.js'), // 首页
  'ModWeexStyle2CommentList':helper.root('entry/ModWeexStyle2CommentList.js'),
  'ModWeexStyle2GalleryDetail':helper.root('entry/ModWeexStyle2GalleryDetail.js'),
  'ModWeexStyle2NewsDetail':helper.root('entry/ModWeexStyle2NewsDetail.js'),
  'ModWeexStyle2TopicDetail':helper.root('entry/ModWeexStyle2TopicDetail.js'),
  'ModWeexStyle2Search':helper.root('entry/ModWeexStyle2Search.js'),
  'ModWeexStyle3': helper.root('entry/ModWeexStyle3.js'), // 媒体
  'ModWeexStyle3MediaDetail':helper.root('entry/ModWeexStyle3MediaDetail.js'),
  'ModWeexStyle4': helper.root('entry/ModWeexStyle4.js'), // 服务
  'ModWeexStyle4Errors': helper.root('entry/ModWeexStyle4Errors.js'),
  'ModWeexStyle5':helper.root('entry/ModWeexStyle5WendaHome.js'), // 7频道问答
  'ModWeexStyle5WendaDongTai':helper.root('entry/ModWeexStyle5WendaDongTai.js'),
  'ModWeexStyle5WendaAsk':helper.root('entry/ModWeexStyle5WendaAsk.js'),
  'ModWeexStyle5WendaDetail':helper.root('entry/ModWeexStyle5WendaDetail.js'),
  'ModWeexStyle5WendaSelect':helper.root('entry/ModWeexStyle5WendaSelect.js'),
  'ModWeexStyle5WendaComment':helper.root('entry/ModWeexStyle5WendaComment.js'),
  'ModWeexStyle5WendaAnswer':helper.root('entry/ModWeexStyle5WendaAnswer.js'),
  'ModWeexStyle5WendaExpertDetail':helper.root('entry/ModWeexStyle5WendaExpertDetail.js'),
  'ModWeexStyle6':helper.root('entry/ModWeexStyle6featureHome.js'), // 团结社特写
  'ModWeexStyle6FeatureHomeArticleDetail':helper.root('entry/ModWeexStyle6featureHomeArticleDetail.js'),
  'ModWeexStyle6FeatureHomeListen':helper.root('entry/ModWeexStyle6featureHomeListen.js'),
  'ModWeexStyle6FeatureHomeListenList':helper.root('entry/ModWeexStyle6featureHomeListenList.js'),
  'ModWeexStyle6FeatureHomeListenDetail':helper.root('entry/ModWeexStyle6featureHomeListenDetail.js'),
  'ModWeexStyle6FeatureHomeLook':helper.root('entry/ModWeexStyle6featureHomeLook.js'),
  'ModWeexStyle6FeatureHomeWrite':helper.root('entry/ModWeexStyle6featureHomeWrite.js'),
  'ModWeexStyle6FeatureHomeWriteList':helper.root('entry/ModWeexStyle6featureHomeWriteList.js'),
  'ModWeexStyle6FeatureHomeSpeak':helper.root('entry/ModWeexStyle6featureHomeSpeak.js'),
  'ModWeexStyle6FeatureHomeSpeakList1':helper.root('entry/ModWeexStyle6featureHomeSpeakList1.js'),
  'ModWeexStyle6FeatureHomeSpeakList2':helper.root('entry/ModWeexStyle6featureHomeSpeakList2.js'),
  'ModWeexStyle6FeatureHomeSpeakList3':helper.root('entry/ModWeexStyle6featureHomeSpeakList3.js'),
  'ModWeexStyle6FeatureHomeVideoList':helper.root('entry/ModWeexStyle6featureHomeVideoList.js'),
  'ModWeexStyle6FeatureHomeCommentList':helper.root('entry/ModWeexStyle6featureHomeCommentList.js'),
  'ModWeexStyle6FeatureHomeListenAudio':helper.root('entry/ModWeexStyle6featureHomeListenAudio.js'),
  'ModWeexStyle6FeatureHomeListenVideo':helper.root('entry/ModWeexStyle6featureHomeListenVideo.js'),
  'ModWeexStyle7':helper.root('entry/ModWeexStyle7featureHot.js'),
  'ModWeexStyle7FeatureHotRankList':helper.root('entry/ModWeexStyle7featureHotRankList.js'),
  'ModWeexStyle7FeatureHotBookList':helper.root('entry/ModWeexStyle7featureHotBookList.js'),
  'ModWeexStyle7FeatureHotBookList2':helper.root('entry/ModWeexStyle7featureHotBookList2.js'),
  'ModWeexStyle7FeatureHotPeopleList':helper.root('entry/ModWeexStyle7featureHotPeopleList.js'),
  'ModWeexStyle7FeatureHotEventList':helper.root('entry/ModWeexStyle7featureHotEventList.js'),
  'ModWeexStyle8':helper.root('entry/ModWeexStyle8.js'),
  'ModWeexStyle9':helper.root('entry/ModWeexStyle9.js'),
  'ModWeexStyle9MyCollection':helper.root('entry/ModWeexStyle9MyCollection.js'),
  'ModWeexStyle13':helper.root('entry/ModWeexStyle13.js'),
  'ModWeexStyle13RankList':helper.root('entry/ModWeexStyle13RankList.js'),
  'ModWeexStyle13TixianHistory':helper.root('entry/ModWeexStyle13TixianHistory.js'),
  'ModWeexStyle14':helper.root('entry/ModWeexStyle14.js'),
  'ModWeexStyle11':helper.root('entry/ModWeexStyle11.js'),
  'ModWeexStyle11SelectCompany':helper.root('entry/ModWeexStyle11SelectCompany.js'),
  'ModWeexStyle11Result':helper.root('entry/ModWeexStyle11Result.js'),
  'ModWeexStyle12':helper.root('entry/ModWeexStyle12.js'),
  'ModWeexStyle12AddCar':helper.root('entry/ModWeexStyle12AddCar.js'),
  'ModWeexStyle12Result':helper.root('entry/ModWeexStyle12Result.js'),
  'ModWeexStyle15':helper.root('entry/ModWeexStyle15.js'),
  'ModWeexStyle15Result':helper.root('entry/ModWeexStyle15Result.js'),
  'ModWeexStyle16':helper.root('entry/ModWeexStyle16.js'),
  'ModWeexStyle16Detail':helper.root('entry/ModWeexStyle16Detail.js'),
  'ModWeexStyle16New':helper.root('entry/ModWeexStyle16New.js'),
  'ModWeexStyle16Comment':helper.root('entry/ModWeexStyle16Comment.js'),
  'ModWeexStyle17':helper.root('entry/ModWeexStyle17.js'),
  'ModWeexStyle18':helper.root('entry/ModWeexStyle18.js'),
  'ModWeexStyle18List':helper.root('entry/ModWeexStyle18List.js'),
  'ModWeexStyle19':helper.root('entry/ModWeexStyle19.js'),
}

const getEntryFileContent = (source, routerpath) => {
  let dependence = `import Vue from 'vue'\n`;
  dependence += `import weex from 'weex-vue-render'\n`;
  let relativePluginPath = helper.rootNode(config.pluginFilePath);
  let entryContents = fs.readFileSync(source).toString();
  let contents = '';
  entryContents = dependence + entryContents;
  entryContents = entryContents.replace(/\/\* weex initialized/, match => `weex.init(Vue)\n${match}`);
  if (isWin) {
    relativePluginPath = relativePluginPath.replace(/\\/g, '\\\\');
  }
  if (hasPluginInstalled) {
    contents += `\n// If detact plugins/plugin.js is exist, import and the plugin.js\n`;
    contents += `import plugins from '${relativePluginPath}';\n`;
    contents += `plugins.forEach(function (plugin) {\n\tweex.install(plugin)\n});\n\n`;
    entryContents = entryContents.replace(/\.\/router/, routerpath);
    entryContents = entryContents.replace(/weex\.init/, match => `${contents}${match}`);
  }
  return entryContents;
}

const getRouterFileContent = (source) => {
  const dependence = `import Vue from 'vue'\n`;
  let routerContents = fs.readFileSync(source).toString();
  routerContents = dependence + routerContents;
  return routerContents;
}

const getEntryFile = () => {
  const entryFile = path.join(vueWebTemp, config.entryFilePath)
  const routerFile = path.join(vueWebTemp, config.routerFilePath)
  fs.outputFileSync(entryFile, getEntryFileContent(helper.root(config.entryFilePath), routerFile));
  fs.outputFileSync(routerFile, getRouterFileContent(helper.root(config.routerFilePath)));
  return {
    index: entryFile
  }
}

// The entry file for web needs to add some library. such as vue, weex-vue-render
// 1. src/entry.js 
// import Vue from 'vue';
// import weex from 'weex-vue-render';
// weex.init(Vue);
// 2. src/router/index.js
// import Vue from 'vue'
const webEntry = getEntryFile();


const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [helper.rootNode('src'), helper.rootNode('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
const useEslint = config.dev.useEslint ? [createLintingRule()] : []

/**
 * Plugins for webpack configuration.
 */
const plugins = [
  /**
   * Plugin: webpack.DefinePlugin
   * Description: The DefinePlugin allows you to create global constants which can be configured at compile time. 
   *
   * See: https://webpack.js.org/plugins/define-plugin/
   */
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': config.dev.env
    }
  }),
  /*
   * Plugin: BannerPlugin
   * Description: Adds a banner to the top of each generated chunk.
   * See: https://webpack.js.org/plugins/banner-plugin/
   */
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue"} \n',
    raw: true,
    exclude: 'Vue'
  })
];

// Config for compile jsbundle for web.
const webConfig = {
  entry: Object.assign(webEntry, {
    'vendor': [path.resolve('node_modules/phantom-limb/index.js')]
  }),
  output: {
    path: helper.rootNode('./dist'),
    filename: '[name].web.js'
  },
  /**
   * Options affecting the resolving of modules.
   * See http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': helper.resolve('src')
    }
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    // webpack 2.0 
    rules: useEslint.concat([
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: config.excludeModuleReg
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'vue-loader',
          options: Object.assign(vueLoaderConfig({useVue: true, usePostCSS: false}), {
            /**
             * important! should use postTransformNode to add $processStyle for
             * inline style prefixing.
             */
            optimizeSSR: false,
            postcss: [
              // to convert weex exclusive styles.
              require('postcss-plugin-weex')(),
              require('autoprefixer')({
                browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
              }),
              require('postcss-plugin-px2rem')({
                // base on 750px standard.
                rootValue: 75,
                // to leave 1px alone.
                minPixelValue: 1.01
              })
            ],
            compilerModules: [
              {
                postTransformNode: el => {
                  // to convert vnode for weex components.
                  require('weex-vue-precompiler')()(el)
                }
              }
            ]
            
          })
        }],
        exclude: config.excludeModuleReg
      }
    ])
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins
};
// Config for compile jsbundle for native.
const weexConfig = {
  entry: weexEntry,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  /**
   * Options affecting the resolving of modules.
   * See http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': helper.resolve('src')
    }
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: config.excludeModuleReg
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'weex-loader',
          options: vueLoaderConfig({useVue: false})
        }],
        exclude: config.excludeModuleReg
      }
    ]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins,
  /*
  * Include polyfills or mocks for various node stuff
  * Description: Node configuration
  *
  * See: https://webpack.github.io/docs/configuration.html#node
  */
  node: config.nodeConfiguration
};

module.exports = [webConfig, weexConfig];
