export default Object.fromEntries([
    'hexagonalRoundness',
    'showExtensionIds',
    'swatches',
    'test',
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))