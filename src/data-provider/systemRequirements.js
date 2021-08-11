import browser from "./browser.js";
import server from "./server.js";
import viewportDevices from "./viewport-devices.js";
import release from "./tao-release.js";
import api from "./api.js";

const getData = () => {
    return {
        browsers: browser.getData(),
        viewportDevices: viewportDevices.getData(),
        server: server.getData(),
        release: release.getData(),
        api: api.getData()
    }
}

const getMetaData = () => {
    return {
        api: api.getMetaData(),
        release: release.getMetaData(),
        viewportDevices: viewportDevices.getMetaData(),
        server: server.getMetaData(),
        browsers: browser.getMetaData()
    }
}

export default {
    getMetaData,
    getData
}