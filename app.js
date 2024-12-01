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
            colors.forEach(color => {
                const div = document.createElement('div')
                div.className = 'generator-color'
                div.style.backgroundColor = color.hex.value;

                // Accessibility attributes
                div.setAttribute('role', 'presentation')
                div.setAttribute('aria-label', `Color: ${color.hex.value}`)
                fragment.appendChild(div) 
            });
            generatorColors.appendChild(fragment)
        })
}

getColorsBtn.addEventListener('click', getColorScheme)