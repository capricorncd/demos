(function () {
    const pos = {}

    let isFocus = false

    let changedFirstLineCharCount = 0
    let isNotSelect = true

    function getSelectionPosition(el) {
        isFocus = true
        pos.start = el.selectionStart
        pos.end = el.selectionEnd
        isNotSelect = pos.start === pos.end
    }

    function textereaEventHandler(e) {
        const el = e.target
        // id="*_prompt"
        if (el.nodeName === 'TEXTAREA' && (el.closest('div').id || '').endsWith('_prompt')) {
            switch (e.type) {
                case 'mouseup':
                    // click
                    if (e.which === 1) {
                        getSelectionPosition(el)
                    }
                    break
                case 'keyup':
                case 'select':
                    getSelectionPosition(el)
                    break
            }
        } else {
            isFocus = false
        }
    }

    document.addEventListener('select', textereaEventHandler)
    document.addEventListener('keyup', textereaEventHandler)
    document.addEventListener('mouseup', textereaEventHandler)

    const COMMENT_REG = /^\s*(#|\/\/)\s*/

    function toggleComment(line) {
        if (COMMENT_REG.test(line)) {
            const newLine = line.replace(COMMENT_REG, '')
            if (changedFirstLineCharCount === 0) {
                changedFirstLineCharCount = newLine.length - line.length
            }
            return newLine
        } else {
            if (changedFirstLineCharCount === 0) changedFirstLineCharCount = 3
            return '// ' + line
        }
    }

    document.addEventListener('keydown', (e) => {
        if (!isFocus) return
        // Ctrl + /
        if (e.ctrlKey && e.key === '/') {
            changedFirstLineCharCount = 0
            const el = e.target
            const txt = el.value
            const oldTxtCount = txt.length

            let lines = txt.split('\n')
            const len = lines.length
            if (len === 1) {
                el.value = toggleComment(txt)
            } else {
                let charCountStart = 0
                let charCountEnd = 0
                const newLines = []
                let line
                for (let i = 0; i < len; i++) {
                    line = lines[i]
                    // +1 \n
                    charCountEnd += line.length + 1
                    if (charCountEnd > pos.start && charCountStart <= pos.end) {
                        newLines.push(toggleComment(line))
                    } else {
                        newLines.push(line)
                    }
                    charCountStart = charCountEnd
                }
                el.value = newLines.join('\n')
            }
            setSelection(el.value.length - oldTxtCount, el)
        }
    })


    function setSelection(changedCount, el) {
        pos.start += changedFirstLineCharCount
        pos.end = isNotSelect ? pos.start : pos.end + changedCount
        el.setSelectionRange(pos.start, pos.end)
        updateInput?.(el)
    }
})()
