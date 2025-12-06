function PhotoCard(props) {
    return (
        <>
            <h2>{props.PhotoTitle}</h2>
            <img src={props.Filename} alt={props.PhotoTitle} width="300" />
        </>
    )
}

export default PhotoCard