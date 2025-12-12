import { updateCartCount } from "./utils.mjs";


async function test(){
const resp = await fetch("https://catalog.data.gov/api/3/action/package_search",)
        if (resp.ok){
            console.log("success")
        } else{
            throw { name: "API Error", error: resp}
        }
        const data = await res.json()
        return data.Result
}
test()
updateCartCount();