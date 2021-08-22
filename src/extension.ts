// Copyright (c) 2021 zakuro <z@kuro.red>. All rights reserved.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ExtensionContext, window, workspace } from 'vscode'
import { existsSync } from 'fs'
import { execFileSync } from 'child_process'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'

export function activate(_context: ExtensionContext): void {
  if (hasKuqi()) {
    activateKuqi()
  }
}

let client: LanguageClient

function getConfig() {
  return workspace.getConfiguration('cotowali')
}

function kuqiPath() {
  return getConfig().get<string>('kuqi.path')
}

function hasKuqi() {
  const path = kuqiPath()
  if (path === '') {
    return false
  }

  if (!existsSync(path)) {
    window.showErrorMessage('Kuqi is not found. Are you placing it in the specified path?')
    return false
  }
  const kuqiVersionOut = execFileSync(path, ['version'], { encoding: 'utf-8' })
  if (!kuqiVersionOut.includes('Kuqi')) {
    window.showErrorMessage('Specified path is not Kuqi executable')
    return false
  }

  return true
}

function activateKuqi() {
  client = new LanguageClient(
    'kuqi',
    'Kuqi',
    {
      command: kuqiPath(),
      transport: TransportKind.stdio,
    },
    {
      documentSelector: [{ scheme: 'file', language: 'cotowali' }],
      synchronize: {
        fileEvents: workspace.createFileSystemWatcher('**/*.li'),
      },
    },
  )
  client.start()
}

export async function deactivate(): Promise<void> {
  if (client) {
    await client.stop()
  }
}
