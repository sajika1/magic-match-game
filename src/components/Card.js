import '../card.css';

export default function Card({item , handleChoice , flipped , enableSelection }) {

    const handleClick = ()=> {
        if (enableSelection) {
            handleChoice(item);
        }
    }

    return (
        <>
            <div className="card">
                <div className={flipped ? "flipped" : ""}>
                    <img className="front" src={item.src} alt="front Card" />            
                    <img className="back" onClick={handleClick} src="../img/cover.png" alt="back Card" />
                </div>
            </div> 
        </>
    )
}
