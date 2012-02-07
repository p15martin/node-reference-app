module.exports = {
    nodeRequire: require,
    baseUrl: "src",
    "packages": [
        {
            name: "app",
            main: "Application"
        },
        {
            name: "database",
            location: "data",
            main: "Database"
        },
        {
            name: "ContactModel",
            location: "data/model",
            main: "ContactModel"
        },
        {
            name: "contactDao",
            location: "data/dao",
            main: "ContactDao"
        },
        {
            name: "rpcServer",
            location: "service",
            main: "RpcServer"
        },
        {
            name: "contactService",
            location: "service",
            main: "ContactService"
        },
        {
            name: "promise",
            location: "util",
            main: "Promise"
        }
    ]
};