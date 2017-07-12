export default url =>
`${new Date().getTime()}${new Buffer(`dotcom-pois-${url}`).toString("base64")}`.substr(0, 32);
