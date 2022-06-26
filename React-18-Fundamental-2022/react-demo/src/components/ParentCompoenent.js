import { ChildCompoenent } from "./ChildCompoenent"

export const ParentCompoenent = () => {
    const greetParent = (childName) => {
        alert(`Hello parent' ${childName}`)
    }

    return <ChildCompoenent greetHandler={greetParent} />
}