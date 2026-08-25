export default Object.fromEntries([
    'cascadeProcedureColors',
    'disableExpandables',
    'hexagonalRoundness',
    'paintMultiTool',
    'showExtensionIds',
    'splashModal',
    'swatches',
    'test',
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))