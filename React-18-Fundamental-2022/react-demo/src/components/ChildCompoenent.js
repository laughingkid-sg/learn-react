export const ChildCompoenent = (props) => {
    return (
        <div>
            <button onClick={() => props.greetHandler('child')}>Greet Parent</button>
        </div>
    )
}