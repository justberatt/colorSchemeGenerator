const getColorsBtn = document.querySelector('#get-colors-btn')

const getColorScheme = () => {
    const schemeMode = document.querySelector('#scheme-mode').value
    let seedColor = document.querySelector('#seed-color').value
    seedColor = seedColor.slice(1, seedColor.length)

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors
            const generatorColors = document.querySelector('#generator-colors')

            generatorColors.textContent = ''

            const fragment = document.createDocumentFragment()
            colors.forEach((color, i) => {
                const div = document.createElement('div')
                div.className = `generator-color generator-color-${i + 1}`
                div.id = `generator-color`
                div.style.backgroundColor = color.hex.value
                div.innerText = `${color.hex.value}`

                // Accessibility attributes
                div.setAttribute('role', 'presentation')
                div.setAttribute('aria-label', `Color: ${color.hex.value}`)
                fragment.appendChild(div) 
            });
            generatorColors.appendChild(fragment)
        })
}

getColorsBtn.addEventListener('click', getColorScheme)

document.addEventListener('click', (e) => {
    if (e.target.id === 'generator-color') {
        navigator.clipboard.writeText(e.target.textContent)
        alert(`${e.target.textContent} copied to clipboard`)
    }
})