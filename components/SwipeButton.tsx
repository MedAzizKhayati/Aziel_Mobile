import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    interpolateColor,
    runOnJS,
    withTiming,
} from 'react-native-reanimated';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const SwipeButton = (
    { onToggle, isToggled, size }: {
        onToggle: (arg: boolean) => void,
        isToggled: boolean,
        size: number,
    }
) => {
    // Toggled State
    const [toggled, setToggled] = useState(isToggled);
    // Sizes
    const BUTTON_WIDTH = size || 350;
    const BUTTON_HEIGHT = BUTTON_WIDTH / 2.5;
    const BUTTON_PADDING = 2;
    const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

    const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
    const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
    
    // Animated value for X translation
    const X = useSharedValue(isToggled ? H_SWIPE_RANGE : 0);

    const styles = styles_({
        BUTTON_HEIGHT,
        BUTTON_WIDTH,
        BUTTON_PADDING,
        SWIPEABLE_DIMENSIONS,
    });

    // Fires when animation ends
    const handleComplete = (isToggled: boolean) => {
        if (isToggled !== toggled) {
            setToggled(isToggled);
            onToggle && onToggle(isToggled);
        }
    };

    // Gesture Handler Events
    const animatedGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            if (toggled) {
                X.value = withTiming(0);
                runOnJS(handleComplete)(false);
            } else {
                X.value = withTiming(H_SWIPE_RANGE);
                runOnJS(handleComplete)(true);
            }
        },
        onActive: (e, ctx) => {
            // console.log('onActive');
        },
        onEnd: () => {
            // console.log('onEnd');
        },
    });

    const InterpolateXInput = [0, H_SWIPE_RANGE];
    const AnimatedStyles = {
        swipeCont: useAnimatedStyle(() => {
            return {};
        }),
        colorWave: useAnimatedStyle(() => {
            return {
                width: H_WAVE_RANGE + X.value,

                opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
            };
        }),
        swipeable: useAnimatedStyle(() => {
            return {
                backgroundColor: interpolateColor(
                    X.value,
                    [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
                    ['#aaa', '#0f0'],
                ),
                transform: [{ translateX: X.value }],
            };
        }),
        swipeText: useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    X.value,
                    InterpolateXInput,
                    [0.7, 0],
                    Extrapolate.CLAMP,
                ),
                transform: [
                    {
                        translateX: interpolate(
                            X.value,
                            InterpolateXInput,
                            [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
                            Extrapolate.CLAMP,
                        ),
                    },
                ],
            };
        }),
    };

    return (
        <GestureHandlerRootView style={{justifyContent: 'center'}}>
            <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                <Animated.View style={[styles.swipeCont, { backgroundColor: Colors[useColorScheme()].background }, AnimatedStyles.swipeCont]}>
                    <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]} />
                    <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
                    </Animated.Text>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles_ = ({
    BUTTON_HEIGHT,
    BUTTON_WIDTH,
    BUTTON_PADDING,
    SWIPEABLE_DIMENSIONS,
}: {
    BUTTON_HEIGHT: number,
    BUTTON_WIDTH: number,
    BUTTON_PADDING: number,
    SWIPEABLE_DIMENSIONS: number,
}) => (
    StyleSheet.create({
        swipeCont: {
            height: BUTTON_HEIGHT,
            width: BUTTON_WIDTH,
            backgroundColor: '#fff',
            borderRadius: BUTTON_HEIGHT,
            padding: BUTTON_PADDING,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        colorWave: {
            position: 'absolute',
            left: 0,
            height: BUTTON_HEIGHT,
            borderRadius: BUTTON_HEIGHT,
        },
        swipeable: {
            position: 'absolute',
            left: BUTTON_PADDING,
            height: SWIPEABLE_DIMENSIONS,
            width: SWIPEABLE_DIMENSIONS,
            borderRadius: SWIPEABLE_DIMENSIONS,
            zIndex: 3,
        },
        swipeText: {
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            zIndex: 2,
            color: '#1b9aaa',
        },
    }));

export default SwipeButton;