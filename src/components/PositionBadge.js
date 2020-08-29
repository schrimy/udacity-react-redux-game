import React from 'react'

//list of possible class names if in top three positions
const TOP_POSITIONS = ['gold', 'silver', 'bronze']

//param in function is the prop passed as named, another way of destructuring
//only shows background circle if in top three
const PositionBadge = ({ position }) => {
    return(
        <div className='position'>
            <p>{position}</p>
            {position <= TOP_POSITIONS.length && (
                <div className={`background-circle ${TOP_POSITIONS[position - 1]}`} />
            )}
        </div>
    )
}

export default PositionBadge