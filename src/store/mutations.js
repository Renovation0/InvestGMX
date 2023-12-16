'strict:true'

// 成功失败音乐
export const modifyMusic = (state, name) => {
  state.mpType = name
}

export const modifyPlay = (state, name) => {
  state.play = name
}

export const modifyTab = (state, name) => {
  state.tabIndex = name
}

export const modifyPigType = (state, name) => {
  state.pigType = name
}

export const modifyNotice = (state, name) => {
  state.showNotice = name
}

export const modifyVersion = (state, name) => {
  state.version = name
}
export const modifyNewVersion = (state, name) => {
  state.new_version = name
}

export const modifyIsApp = (state, name) => {
  state.isApp = name
}

export const modifyRouteAction = (state, name) => {
  state.routeAction = name
}
