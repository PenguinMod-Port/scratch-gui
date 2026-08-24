export default Object.fromEntries([
    'disableExpandables',
    'hexagonalRoundness',
    'paintMultiTool',
    'showExtensionIds',
    'cascadeProcedureColors',
    'swatches',
    'test',
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))