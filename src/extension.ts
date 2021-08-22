// Copyright (c) 2021 zakuro <z@kuro.red>. All rights reserved.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ExtensionContext, window, workspace } from 'vscode'
import { existsSync } from 'fs'
export function activate(_context: ExtensionContext): void {
  if (hasKuqi()) {
    // TODO: enableKuqi()
  }
}

function getConfig() {
  return workspace.getConfiguration('cotowali')
}

function hasKuqi() {
  const path = getConfig().get<string>('kuqi.path')
  if (path === '') {
    return false
  }

  if (!existsSync(path)) {
    window.showErrorMessage('Kuqi is not found. Are you placing it in the specified path?')
    return false
  }

  return true
}
