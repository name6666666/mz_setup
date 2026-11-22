#!/usr/bin/env node

const name = process.argv[2]

if (!name) {
    console.error("Invalid arguments")
    process.exit(1)
}

const fs = require('fs')
const path = require('path')

const template = path.join(__dirname, "template")

function cloneFiles(relative_path) {
    const entries = fs.readdirSync(path.join(template, relative_path), {withFileTypes: true})
    for (const entry of entries) {
        if (entry.isFile()) {
            const content = fs.readFileSync(
                path.join(template, relative_path, entry.name),
                {encoding: 'utf-8'}
            ).replaceAll('{{PLUGIN_NAME}}', name)
            fs.writeFileSync(path.join(relative_path, entry.name), content, {encoding: 'utf-8'})
        } else {
            const dir = path.join(relative_path, entry.name)
            fs.mkdirSync(dir)
            cloneFiles(dir)
        }
    }
}

cloneFiles('./')

const { spawnSync } = require('child_process')

spawnSync('npm', ['install'], { stdio: 'inherit', shell: true })
