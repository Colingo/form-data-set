var test = require("tape")

var makeElements = require("./util/makeElements")
var FormData = require("../index")

test("FormData works with <input type='radio' />", function (assert) {
    var elements = makeElements({
        foo: ["radio", {
            as: Array
            , radios: ["foo", "bar", "baz"]
            , checked: 0
            , name: "foo"
        }]
        , bar: ["radio", {
            as: Object
            , radios: ["foo", "bar", "baz"]
            , name: "bar"
            , checked: 1
        }]
    })

    var data = FormData(elements)

    assert.deepEqual(data, {
        foo: "foo"
        , bar: "bar"
    })

    assert.end()
})
