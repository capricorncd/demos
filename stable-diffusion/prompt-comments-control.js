(function() {
    const pos = {}

    let isFocusIn = false

    function setTextereaSelection(el) {
        isFocusIn = true
        pos.start = el.selectionStart
        pos.end = el.selectionEnd
    }

    function textereaEventHandler(e) {
        console.log(e.type)
        const el = e.target
        // xxxx_prompt
        if (el.nodeName === 'TEXTAREA' && (el.closest('div').id || '').endsWith('_prompt')) {
            switch (e.type) {
                case 'mouseup':
                    // click
                    if (e.which === 1) {
                        setTextereaSelection(el)
                    }
                    break
                case 'keyup':
                case 'select':
                    setTextereaSelection(el)
                    break
            }
        } else {
            isFocusIn = false
        }
    }

    document.addEventListener('select', textereaEventHandler)
    document.addEventListener('keyup', textereaEventHandler)
    document.addEventListener('mouseup', textereaEventHandler)

    const COMMENT_REG = /^\s*(#|\/\/)\s*/

    function toggleComment(line) {
        if (COMMENT_REG.test(line)) {
            return line.replace(COMMENT_REG, '')
        } else {
            return '// ' + line
        }
    }

    document.addEventListener('keydown', (e) => {
        if (!isFocusIn) return
        const el = e.target
        // Ctrl + /
        if (e.ctrlKey && e.key === '/') {
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
                    if (charCountEnd >= pos.start && charCountStart <= pos.end) {
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
        pos.start = changedCount > 0 ? pos.start + 3 : pos.start - 3
        pos.end += changedCount
        el.setSelectionRange(pos.start, pos.end)
        updateInput?.(el)
    }
})()
