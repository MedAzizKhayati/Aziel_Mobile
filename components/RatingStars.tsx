import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from './Themed';

export default ({ rating, size }: { rating: number, size: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Icon
                key={i}
                name={'star'}
                size={size}
                color={i <= rating ? '#FFC107' : '#BDBDBD'}
            />,
        );
    }
    return <View style={{flexDirection: 'row', alignItems: 'center'}}>{stars}</View>;
};
