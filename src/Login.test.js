const Login = require("./Login")
// @ponicode
describe("signIn", () => {
    let inst

    beforeEach(() => {
        inst = new Login.default()
    })

    test("0", async () => {
        await inst.signIn()
    })
})

// @ponicode
describe("loadingInfo", () => {
    let inst

    beforeEach(() => {
        inst = new Login.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.loadingInfo({ loading: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.loadingInfo({ loading: "ponicode.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.loadingInfo({ loading: "https://accounts.google.com/o/oauth2/revoke?token=%s" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.loadingInfo({ loading: "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.loadingInfo({ loading: "http://www.example.com/route/123?foo=bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.loadingInfo({ loading: null })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("formatData", () => {
    let inst

    beforeEach(() => {
        inst = new Login.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.formatData()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new Login.default()
    })

    test("0", async () => {
        await inst.componentDidMount()
    })
})
