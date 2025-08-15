import "./Buttons.css"

export default function Index({value, type}) {
    return (
        <div>
            <p className={`buttons ${type ? type: ""}`}>{value}</p>
        </div>
    )
}
