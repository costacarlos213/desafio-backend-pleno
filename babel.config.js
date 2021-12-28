module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      root: ["./"],
      alias: {
        "@entities": "./src/entities",
        "@repositories": "./src/repositories",
        "@useCases": "./src/useCases",
        "@config": "./src/config",
        "@controllers": "./src/controllers"
        // insert the same tsconfig.json paths
      }
    }]
  ]
}
