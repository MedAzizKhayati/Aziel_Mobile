import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
    interpolateColor,
    runOnJS,
} from 'react-native-reanimated';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import LinearGradient from 'react-native-linear-gradient';

// const BUTTON_WIDTH = 350;
// const BUTTON_HEIGHT = 100;
// const BUTTON_PADDING = 10;
// const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

// const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
// const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SwipeButton = (
    { onToggle, isToggled, size }: {
        onToggle: (arg: boolean) => void,
        isToggled: boolean,
        size: number,
    }
) => {
    // Animated value for X translation
    const X = useSharedValue(0);
    // Toggled State
    const [toggled, setToggled] = useState(isToggled);
    // Sizes
    const BUTTON_WIDTH = size || 350;
    const BUTTON_HEIGHT = BUTTON_WIDTH / 2.5;
    const BUTTON_PADDING = 2;
    const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

    const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
    const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
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
                X.value = withSpring(0);
                runOnJS(handleComplete)(false);
            } else {
                X.value = withSpring(H_SWIPE_RANGE);
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
                    ['#aaa', '#06d6a0'],
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
        <GestureHandlerRootView>
            <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
                {/* <AnimatedLinearGradient
                style={[AnimatedStyles.colorWave, styles.colorWave]}
                colors={['#06d6a0', '#1b9aaa']}
                start={{ x: 0.0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                />*/}
                <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                    <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]} />
                </PanGestureHandler>
                <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
                </Animated.Text>
            </Animated.View>
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