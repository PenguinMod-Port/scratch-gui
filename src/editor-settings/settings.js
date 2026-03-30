export default Object.fromEntries([
    'hexagonalRoundness',
    'showExtensionIds',
    'swatches',
    'paintMultiTool',
    'test',
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))