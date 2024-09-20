import React, {useEffect, useState, Fragment} from 'react';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  Text,
  View,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize';

import {t} from '@i18n/index';
import themeStyle from '@styles/theme.style';
import {IconLibrary} from '@components/Base';
import {goBack} from '@navigation/RootNavigation';

export interface GestureEventType {
  nativeEvent: {translationX: number; translationY: number};
}

export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  Right,
  Up,
  Left,
  Down,
}

export interface SnakeProps {
  snake: Coordinate[];
}

export interface ScoreProps {
  score: number;
}

export interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

export const Colors = {
  primary: 'white',
  secondary: '#84cc16',
  tertiary: '#eab308',
  background: '#84cc16',
};

export const checkEatsFood = (
  head: Coordinate,
  food: Coordinate,
  area: number,
): boolean => {
  const distanceBetweenFoodAndSnakeX: number = Math.abs(head.x - food.x);
  const distanceBetweenFoodAndSnakeY: number = Math.abs(head.y - food.y);
  return (
    distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
  );
};

export const checkGameOver = (
  snakeHead: Coordinate,
  boundaries: any,
): boolean => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax
  );
};

export const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  };
};

function getRandomFruitEmoji() {
  const fruitEmojis = ['🍎', '🍊', '🍋', '🍇', '🍉', '🍓', '🍑', '🍍'];
  const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
  return fruitEmojis[randomIndex];
}

function Snake({snake}: SnakeProps): JSX.Element {
  return (
    <Fragment>
      {snake.map((segment: any, index: number) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[styles.snake, segmentStyle]} />;
      })}
    </Fragment>
  );
}

function Header({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity onPress={goBack}>
        <IconLibrary
          size={35}
          library="Ionicons"
          name="arrow-back-outline"
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={reloadGame}>
        <IconLibrary
          size={40}
          library="Ionicons"
          name="reload-circle"
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseGame}>
        <IconLibrary
          size={40}
          library="FontAwesome"
          name={isPaused ? 'play-circle' : 'pause-circle'}
          color={Colors.primary}
        />
      </TouchableOpacity>
      {children}
    </View>
  );
}
const {width, height} = Dimensions.get('screen');
const MOVE_INTERVAL = 40;
const SCORE_INCREMENT = 10;
const FOOD_INITIAL_POSITION = {x: 5, y: 20};
const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const GAME_BOUNDS = {xMin: 0, xMax: 35, yMin: 0, yMax: 63};

export default function SnakeScreen() {
  const [score, setScore] = useState<number>(0);
  const [prey, setPrey] = useState(getRandomFruitEmoji());
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [food, setFood] = useState<Coordinate>(
    randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax),
  );
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [direction, setDirection] = useState<Direction>(Direction.Right);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead};
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(prev => !prev);
      setShowModal(prev => !prev);
      return;
    }
    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const {translationX, translationY} = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setShowModal(false);
    setScore(0);
    setPrey(getRandomFruitEmoji());
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  function Food({x, y}: Coordinate): JSX.Element {
    return (
      <Text style={[{top: y * 10, left: x * 10}, styles.food]}>{prey}</Text>
    );
  }

  function Score({score}: ScoreProps): JSX.Element {
    return (
      <Text style={styles.text}>
        {prey} {score}
      </Text>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <SafeAreaView style={styles.container}>
          <Header
            reloadGame={reloadGame}
            pauseGame={pauseGame}
            isPaused={isPaused}>
            <Score score={score} />
          </Header>
          <View style={styles.boundaries}>
            <Snake snake={snake} />
            <Food x={food.x} y={food.y} />
          </View>
        </SafeAreaView>
      </PanGestureHandler>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {}}>
        <View style={styles.modalSnake}>
          <View style={styles.modalViewSnake}>
            <Text style={styles.txtGameOver}>{t('game_over')}</Text>
            <Text style={styles.txtScore}>
              {t('your_score')}: {score}
            </Text>
            <View style={styles.modalButton}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.modalTicTacToeButton,
                  {backgroundColor: '#225577'},
                ]}
                onPress={reloadGame}>
                <Text style={styles.txtGenerate}>{t('play_again')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.modalTicTacToeButton,
                  {backgroundColor: '#E45651'},
                ]}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text style={styles.txtGenerate}>{t('close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
  food: {
    width: 100,
    height: 100,
    borderRadius: 7,
    position: 'absolute',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snake: {
    width: 18,
    height: 18,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  containerHeader: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.primary,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: Platform.OS === 'ios' ? normalize(15) : normalize(10),
    backgroundColor: Colors.background,
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  modalSnake: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewSnake: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '70%',
    height: '24%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalTicTacToeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(15),
    backgroundColor: '#EB5758',
    marginTop: normalize(16),
    height: normalize(45),
    marginHorizontal: normalize(10),
    flex: 1,
  },
  txtGenerate: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    fontFamily: themeStyle.FONT_BOLD,
  },
  txtGameOver: {fontSize: 25, fontFamily: themeStyle.FONT_BOLD},
  txtScore: {
    fontSize: 20,
    fontFamily: themeStyle.FONT_FAMILY,
    marginVertical: normalize(10),
    marginTop: normalize(16),
  },
});
