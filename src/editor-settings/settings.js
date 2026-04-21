export default Object.fromEntries([
    'disableExpandables',
    'hexagonalRoundness',
    'paintMultiTool',
    'showExtensionIds',
    'swatches',
    'test',
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))