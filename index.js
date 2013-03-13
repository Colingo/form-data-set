/*jshint maxcomplexity: 10*/

module.exports = FormData

//TODO: Massive spec: http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#constructing-form-data-set
function FormData(elements) {
    return Object.keys(elements).reduce(function (acc, key) {
        var elem = elements[key]

        if (containsRadio(elem)) {
            var elems = toList(elem)
            var checked = elems.filter(function (elem) {
                return elem.checked
            })[0] || null

            acc[key] = checked ? checked.value : null
        } else if (elem.tagName === undefined && elem.nodeType === undefined) {
            acc[key] = FormData(elem)
        } else if (elem.tagName === "INPUT" && elem.type === "checkbox") {
            acc[key] = elem.checked
        } else if (elem.tagName === "INPUT" && elem.type === "text") {
            acc[key] = elem.value
        } else if (elem.tagName === "TEXTAREA") {
            acc[key] = elem.value
        } else if (elem.tagName === "SELECT") {
            acc[key] = elem.value
        }

        return acc
    }, {})
}

function containsRadio(value) {
    if (value.tagName || value.nodeType) {
        return false
    }

    var elems = toList(value)

    return elems.some(function (elem) {
        return elem.tagName === "INPUT" && elem.type === "radio"
    })
}

function toList(value) {
    if (Array.isArray(value)) {
        return value
    }

    return Object.keys(value).map(prop, value)
}

function prop(x) {
    return this[x]
}
