import math
player,opponent=1,0

def isMovesLeft(board):
    for i in range(len(board)):
        if board[i]==-1:
            return True
    return False

def evaluate(board,size):

    def get_rows(board, size):
        rows = []
        for i in range(size):
            row = []
            for j in range(size):
                row.append(board[i * size + j])
            rows.append(row)
        return rows

    def get_columns(board, size):
        columns = []
        for i in range(size):
            column = []
            for j in range(size):
                column.append(board[j * size + i])
            columns.append(column)
        return columns

    def get_diagonals(board, size):
        diagonals = []
        diagonal1 = []
        diagonal2 = []
        for i in range(size):
            diagonal1.append(board[i * size + i])
            diagonal2.append(board[i * size + (size - 1 - i)])
        diagonals.append(diagonal1)
        diagonals.append(diagonal2)
        return diagonals

    def check_winner(board, size):
        rows = get_rows(board, size)
        columns = get_columns(board, size)
        diagonals = get_diagonals(board, size)

        all_lines = rows + columns + diagonals
        for line in all_lines:
            line_set = set(line)
            if len(line_set) == 1 and 1 in line_set:
                return -10 #-10 for X
            elif len(line_set) == 1 and 0 in line_set:
                return 10 #10 for O
        
        return 0  # If no winner is found
    return check_winner(board,int(math.sqrt(len(board))))


def minimax(board, depth, isMax):
    score = evaluate(board,len(board))

    # If Maximizer has won the game return his/her evaluated score
    if score == 10:
        return score

    # If Minimizer has won the game return his/her evaluated score
    if score == -10:
        return score

    # If there are no more moves and no winner then it is a tie
    if not isMovesLeft(board):
        return 0

    # If this maximizer's move
    if isMax:
        best = 1000

        # Traverse all cells
        for i in range(len(board)): 
            if board[i] == -1:  # Check if cell is empty
                # Make the move
                board[i] = opponent
                # Call minimax recursively and choose the minimum value
                best = min(best, minimax(board, depth + 1, not isMax))

                # Undo the move
                board[i] = -1

        return best

    # If this minimizer's move
    else:
        best = -1000

        # Traverse all cells
        for i in range(len(board)):
            if board[i] == -1:  # Check if cell is empty
                # Make the move
                board[i] = player

                # Call minimax recursively and choose the maximum value
                best = max(best, minimax(board, depth + 1, not isMax))
                # Undo the move
                board[i] = -1

        return best

      



# This will return the best possible move for the player 
def findBestMove(board):
    bestVal = -1000
    bestMove = -1
    # Traverse all cells, evaluate minimax function for 
    # all empty cells. And return the cell with optimal 
    # value. 

    for i in range(len(board)):
        # Check if cell is empty 
        if (board[i] == -1):
            # Make the move 
            board[i] = opponent  # Make the move for the player
            # compute evaluation function for this 
            # move. 
            moveVal = minimax(board, 0, False) 
            # Undo the move 
            board[i] = -1

            # If the value of the current move is 
            # more than the best value, then update 
            # best/ 
            if (moveVal > bestVal):				 
                bestMove = i
                bestVal = moveVal 

    return bestMove 
    




# board = [1,0,0,1,1,0,-1,1,-1]
# #   1  0  0
# #   1  1  0
# #  -1 1 -1
  
# bestMove = findBestMove(board)  
  
# print("The Optimal Move is :",bestMove)  
# print(board)