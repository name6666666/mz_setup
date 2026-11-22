import { spawnSync } from 'node:child_process'
import fs from 'fs'
import path from 'path'


const projectDir = undefined // 替换成你的RPG maker mz项目文件夹

const fileName = '{{PLUGIN_NAME}}.js'

function generatePlugin() {
    spawnSync('npx', ['rollup', '-c'], { stdio: 'inherit', shell: true })
    const content = fs.readFileSync('src/comment.js', {encoding: 'utf-8'}) +
        '\n' +
        fs.readFileSync(path.join('dist', fileName), {encoding: 'utf-8'})
    fs.writeFileSync(path.join('dist', fileName), content, {encoding: 'utf-8'})
    return content
}

switch (process.argv[2]) {
    case 'dev':
        if (projectDir === undefined) {
            console.error('Project directory not set')
            break
        }
        const content = generatePlugin()
        const pluginDir = path.join(projectDir, 'js', 'plugins', fileName)
        fs.writeFileSync(pluginDir, content, {encoding: 'utf-8'})
        break
    case 'release':
        generatePlugin()
        break
    default:
        console.error('Unknown argument')
}
