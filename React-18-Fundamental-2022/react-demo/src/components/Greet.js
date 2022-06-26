export const Greet = (props) => {
    return <div>
        <h1> Hello {props.name} {2 + 2}</h1>
        {props.children}
    </div>
}