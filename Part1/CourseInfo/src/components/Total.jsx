const Total = ({parts}) => {

    return (
        <>
        <b>
        total of {
            parts.reduce((s,p)=> {
                return s + p.exercises
            },0
            )
        } exercises
        </b>
        </>
    )

}

export default Total