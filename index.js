module.exports = FormData

//TODO: Massive spec: http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#constructing-form-data-set
function FormData(elements) {
    return Object.keys(elements).reduce(function (acc, key) {
        var elem = elements[key]

        if (elem.tagName === undefined && elem.nodeType === undefined) {
            acc[key] = FormData(elem)
        } else if (elem.tagName === "INPUT" && elem.type === "checkbox") {
            acc[key] = elem.checked
        } else if (elem.tagName === "INPUT" && elem.type === "text") {
            acc[key] = elem.value
        } else if (elem.tagName === "TEXTAREA") {
            acc[key] = elem.value
        }

        return acc
    }, {})
}
