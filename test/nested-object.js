var test = require("tape")

var makeElements = require("./util/makeElements")
var FormData = require("../index")

test("formData works with nested objects", function (assert) {
    var elements = makeElements({
        foo: {
            bar: ["input", "bar"]
            , baz: ["input", "baz"]
        }
    })

    var data = FormData(elements)

    assert.deepEqual(data, {
        foo: {
            bar: "bar"
            , baz: "baz"
        }
    })

    assert.end()
})
