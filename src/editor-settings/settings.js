export default Object.fromEntries([
    'test',
    'showExtensionIds'
].map(v => [v, require(`./settings/${v}/${v}.jsx`).default]))