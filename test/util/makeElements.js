var document = require("global/document")
var isObject = require("is-object")

module.exports = makeElements

function makeElements(hash) {
    return Object.keys(hash).reduce(function (acc, key) {
        var value = hash[key]

        if (Array.isArray(value)) {
            var tagName = value[0]
            var content = value[1]

            var elem = document.createElement(tagName)

            if (tagName === "input") {
                elem.value = content

                acc[key] = elem
            } else if (tagName === "select") {
                content.options.forEach(function (text) {
                    var option = document.createElement("option")
                    option.textContent = text
                    option.value = text
                    elem.appendChild(option)
                })

                elem.selectedIndex = content.selected

                acc[key] = elem
            } else if (tagName === "radio") {
                var res = content.as === Array ? [] : {}

                content.radios.forEach(function (text, index) {
                    var input = document.createElement("input")
                    input.type = "radio"
                    input.value = text

                    if (content.checked === index) {
                        input.checked = true
                    }

                    input.name = content.name
                    elem.appendChild(input)

                    if (content.as === Array) {
                        res.push(input)
                    } else {
                        res[text] = input
                    }
                })

                acc[key] = res
            }
        } else if (isObject(value)) {
            acc[key] = makeElements(value)
        }

        return acc
    }, {})
}
