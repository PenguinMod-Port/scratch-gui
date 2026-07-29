export default Object.fromEntries([
    'blockColors',
    'disableExpandables',
    'hexagonalRoundness',
    'paintMultiTool',
    'showExtensionIds',
    'swatches',
    'test',
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))