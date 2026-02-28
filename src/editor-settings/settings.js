export default Object.fromEntries([
    'test',
    'showExtensionIds',
    'hexagonalRoundness'
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))