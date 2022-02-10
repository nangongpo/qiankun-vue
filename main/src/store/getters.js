const getters = {
  device: state => state.device.deviceType,
  sidebar: state => state.device.sidebar,
  size: state => state.device.size,
  screenSize: state => state.device.screenSize,
  projectName: state => state.settings.projectName,
  projectTitle: state => state.settings.projectTitle,
  projectFooter: state => state.settings.projectFooter
}
export default getters
