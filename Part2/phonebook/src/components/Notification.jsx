const Notification = ({msg,type}) =>{
    if(msg === null){
        return (
            <div>

            </div>
        )
    }
    return (
        <div className={`msg ${type}`}>{msg}</div>
    )
}

export default Notification