export default Object.fromEntries([
    'cascadeProcedureColors',
    'disableExpandables',
    'hexagonalRoundness',
    'paintMultiTool',
    'paintScrollZoom',
    'showExtensionIds',
    'splashModal',
    'swatches',
    'test',
    'vmDebug',
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))