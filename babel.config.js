module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', 
    //es2015启动项目会报错‘Cannot find module 'babel-preset-es2015'’，改成"@babel/preset-env"
    ["@babel/preset-env", { "modules": false }]   
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
