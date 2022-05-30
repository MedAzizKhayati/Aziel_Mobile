import { Modal, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
interface BottomPopupProps {
    onTouchOutside: () => void;
    visible: boolean;
}

const BottomPopup = ({ onTouchOutside, visible }: BottomPopupProps) => {
    const colorScheme = useColorScheme();

    const RenderOutsideTouchable = ({ onTouch }: { onTouch: () => void }) => {
        return (
            <TouchableWithoutFeedback onPress={() => onTouch && onTouch()} style={{ flex: 1, width: '100%' }}>
                <View style={{ flex: 5, width: '100%' }}>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <RenderOutsideTouchable onTouch={onTouchOutside} />
                <View style={{
                    flex: 10,
                    backgroundColor: Colors[colorScheme].secondaryBackground,
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    paddingHorizontal: 10,
                }}>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({

});

export default BottomPopup;

