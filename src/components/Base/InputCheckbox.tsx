import React, {useRef, useState, memo} from 'react';
import Animated, {
  withTiming,
  processColor,
  useDerivedValue,
  useAnimatedProps,
  interpolateColor,
  createAnimatedPropAdapter,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

const AnimatedColor = memo((props: any) => {
  const {
    progress,
    checkedBorderColor,
    unCheckedBorderColor,
    checkedBackgroundColor,
    unCheckedBackgroundColor,
  } = props;
  const AnimationColor = Animated.createAnimatedComponent(Path);

  const animation = useAnimatedProps(
    () => {
      const fill = interpolateColor(
        progress.value,
        [0, 1],
        [unCheckedBackgroundColor, checkedBackgroundColor],
      );
      const stroke = interpolateColor(
        progress.value,
        [0, 1],
        [unCheckedBorderColor, checkedBorderColor],
      );
      return {fill, stroke};
    },
    [],
    createAnimatedPropAdapter(
      props => {
        if (Object.keys(props).includes('fill')) {
          props.fill = {type: 0, payload: processColor(props.fill)};
        }
        if (Object.keys(props).includes('stroke')) {
          props.stroke = {type: 0, payload: processColor(props.stroke)};
        }
      },
      ['fill', 'stroke'],
    ),
  );
  return (
    <AnimationColor
      strokeWidth={4}
      animatedProps={animation}
      d="M2 16C2 8.26801 8.26801 2 16 2H33C40.732 2 47 8.26801 47 16V33C47 40.732 40.732 47 33 47H16C8.26801 47 2 40.732 2 33V16Z"
    />
  );
});

const AnimatedCheckMarkPath = memo((props: any) => {
  const {progress, checkMarkColor} = props;
  const pathRef = useRef<any>(null);
  const [length, setLength] = useState(0);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const checkMarkAnimation = useAnimatedProps(() => {
    const opacity = progress.value;
    const strokeDashoffset = length - length * progress.value;
    return {strokeDashoffset, opacity};
  });
  return (
    <AnimatedPath
      animatedProps={checkMarkAnimation}
      onLayout={() => setLength(pathRef.current.getTotalLength())}
      ref={pathRef}
      d="M12 24.4068L20.6667 32.9999L36.5 17.1667"
      stroke={checkMarkColor}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={length}
      fill="none"
    />
  );
});

export const InputCheckbox = memo((props: any) => {
  const {
    width,
    height,
    checked,
    checkMarkColor,
    checkedBorderColor,
    unCheckedBorderColor,
    checkedBackgroundColor,
    unCheckedBackgroundColor,
  } = props;
  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0);
  });

  return (
    <Svg width={width} height={height} viewBox="0 0 49 49">
      <AnimatedColor
        progress={progress}
        checkedBorderColor={checkedBorderColor}
        unCheckedBorderColor={unCheckedBorderColor}
        checkedBackgroundColor={checkedBackgroundColor}
        unCheckedBackgroundColor={unCheckedBackgroundColor}
      />
      <AnimatedCheckMarkPath
        progress={progress}
        checkMarkColor={checkMarkColor}
      />
    </Svg>
  );
});
