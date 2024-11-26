import { LocationType } from "../enums/location-type.enum";

export const CategoryEmojiUtil = ({type}: {type: LocationType}) => {
    const getEmoji = (type: LocationType) => {
        switch (type) {
            case LocationType.BUILDING: return <>🏢</>
            case LocationType.CAFE: return <>☕️</>
            case LocationType.CAFETERIA: return <>🍚</>
            case LocationType.CONVENIENCE: return <>🏪</>
            case LocationType.RESTAURANT: return <>🍽️</>
            case LocationType.STORE: return <>🛒</>
            default: return null;
        }
    }

    return <>
        {getEmoji(type)}
    </>
}