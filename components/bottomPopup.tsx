import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View,useColorScheme } from 'react-native'
import React, { useState } from 'react'

const deviceHeight = Dimensions.get('window').height;
interface BottomPopupProps {
    ref: any;
    onTouchOutside: () => void;
}
const BottomPopup = ({ ref, onTouchOutside }: BottomPopupProps) => {
    const colorScheme = useColorScheme();
    const [state, setState] = useState( false );

    const show = () => {
        setState( true )
    }
    const close = () => {
        setState( false )
    }

    const RenderOutsideTouchable = ({ onTouch } : { onTouch: (event: any) => void }
    ) => {
        if (!onTouch)
            return (
                <View style={{ flex: 1, width: '100%' }}>
                </View>
            )

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                <View style={{ flex: 1, width: '100%' }}>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={state}
            onRequestClose={close}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <RenderOutsideTouchable onTouch={onTouchOutside} />
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    paddingHorizontal: 10,
                    maxHeight: deviceHeight * 0.4,
                }}>
                </View>
            </View>
        </Modal>

    )
}
const styles = StyleSheet.create({
    
});
export default BottomPopup;

