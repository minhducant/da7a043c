import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Modal,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {IconCaro, IconX, IconO} from '@assets/icons';
import {utilitiesStyle as styles} from '@styles/utils.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

const BOARD_SIZE = 3;

export default function TicTacToeScreen() {
  const {t} = useTranslation();
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [showModal, setsSowModal] = useState(false);
  const [board, setBoard] = useState(
    Array.from(Array(BOARD_SIZE), () => new Array(BOARD_SIZE).fill('')),
  );

  useEffect(() => {
    if (player === 'O') {
      setTimeout(makeAIMove, 500);
    }
  }, [player]);

  const makeAIMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'O';
          const score = minimax(board, 0, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = {i, j};
          }
        }
      }
    }
    if (move) {
      const newBoard = [...board];
      newBoard[move.i][move.j] = 'O';
      setBoard(newBoard);
      const winner = checkWinner(newBoard);
      if (winner) {
        setWinner(winner);
        setsSowModal(true);
      } else {
        setPlayer('X');
      }
    }
  };

  const minimax = (board: any[][], depth: number, isMaximizing: boolean) => {
    const result = checkWinner(board);
    if (result !== null) {
      if (result === 'X') {
        return -10 + depth;
      } else if (result === 'O') {
        return 10 - depth;
      } else {
        return 0;
      }
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'O';
            const score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'X';
            const score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const handlePress = (i: any, j: any) => {
    if (!board[i][j] && !winner) {
      const newBoard = [...board];
      newBoard[i][j] = player;
      setBoard(newBoard);
      const winner = checkWinner(newBoard);
      if (winner) {
        setWinner(winner);
        setsSowModal(true);
      } else {
        setPlayer(player === 'X' ? 'O' : 'X');
      }
    }
  };

  const checkWinner = (board: any[][]) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (
        board[i][0] !== '' &&
        board[i].every((val: any) => val === board[i][0])
      ) {
        return board[i][0];
      }
      if (
        board[0][i] !== '' &&
        board.every((row: any[]) => row[i] === board[0][i])
      ) {
        return board[0][i];
      }
    }
    if (
      board[0][0] !== '' &&
      board.every(
        (row: {[x: string]: any}, i: string | number) => row[i] === board[0][0],
      )
    ) {
      return board[0][0];
    }
    if (
      board[0][BOARD_SIZE - 1] !== '' &&
      board.every(
        (row: any[], i: number) =>
          row[BOARD_SIZE - 1 - i] === board[0][BOARD_SIZE - 1],
      )
    ) {
      return board[0][BOARD_SIZE - 1];
    }
    if (!board.flat().includes('')) {
      return t('draw');
    }
    return null;
  };

  const onReload = () => {
    setsSowModal(false);
    setBoard(
      Array.from(Array(BOARD_SIZE), () => new Array(BOARD_SIZE).fill('')),
    );
    setPlayer('X');
    setWinner(null);
  };

  const renderBoard = () => {
    return board.map((row, i) => (
      <View key={i} style={styles.rowTicTacToe}>
        {row.map((_, j) => renderSquare(i, j))}
      </View>
    ));
  };

  const renderSquare = (i: number, j: number) => {
    return (
      <TouchableOpacity
        key={`${i}-${j}`}
        activeOpacity={0.7}
        style={[
          styles.squareTicTacToe,
          {
            borderTopWidth: i === 0 ? 0 : 1.2,
            borderLeftWidth: j === 0 ? 0 : 1.2,
            borderRightWidth: j === 2 ? 0 : 1.2,
            borderBottomWidth: i === 2 ? 0 : 1.2,
          },
        ]}
        onPress={() => handlePress(i, j)}
        disabled={!!board[i][j] || !!winner}>
        {board[i][j] === 'X' ? (
          <IconX />
        ) : board[i][j] === 'O' ? (
          <IconO />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('caro')} />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewTicTacToe}>
        <IconCaro isLogo />
        <View style={styles.boardTicTacToe}>{renderBoard()}</View>
      </ScrollView>
      <SafeAreaView>
        <Text style={styles.titleTicTacToe}>
          {winner
            ? `${t('winner')}: ${winner}`
            : `${t('next_player')}: ${player}`}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.viewGenerate, {backgroundColor: '#A4B5B8'}]}
          onPress={onReload}>
          <Text style={styles.txtGenerate}>{t('play_again')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {}}>
        <View style={styles.modalTicTacToe}>
          <View style={styles.modalViewTicTacToe}>
            {winner === 'X' ? (
              <IconX />
            ) : winner === 'O' ? (
              <IconO />
            ) : (
              <View style={styles.modalTicTacToeIcon}>
                <IconX />
                <IconO />
              </View>
            )}
            <Text style={styles.modalTicTacToeTxt}>
              {winner !== 'X' && winner !== 'O' ? t('draw') : t('win')}
            </Text>
            <View style={styles.modalButton}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.modalTicTacToeButton,
                  {backgroundColor: '#225577'},
                ]}
                onPress={onReload}>
                <Text style={styles.txtGenerate}>{t('play_again')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.modalTicTacToeButton,
                  {backgroundColor: '#E45651'},
                ]}
                onPress={() => {
                  setsSowModal(false);
                }}>
                <Text style={styles.txtGenerate}>{t('close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
