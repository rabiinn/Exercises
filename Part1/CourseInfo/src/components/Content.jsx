import Part from './Part'
const Content = (props) => {
    const {parts} = props
    return(
        <div>
            {parts.map((part) =>(
                <p key={part.id}> <Part part={part}/> </p>
            ))}
        </div>
    )

}

export default Content