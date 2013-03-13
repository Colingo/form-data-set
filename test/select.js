var test = require("tape")

var makeElements = require("./util/makeElements")
var FormData = require("../index")

test("FormData works with <select> elements", function (assert) {
    var elements = makeElements({
        foo: ["select", {
            options: ["one", "two", "three"]
            , selected: 1
        }]
    })

    var data = FormData(elements)

    assert.deepEqual(data, {
        foo: "two"
    })

    assert.end()
})
