# Chess

class Board:
  def __init__(self):
    self.board = [[None] * 8 for  _ in range(8)]
    self.position_history = []
    self.fifty_move_counter = 0
    
  def position_to_coordinates(self, position):
    file = ord(position[0]) - ord('a')
    rank = int(position[1]) - 1

    if 0 <= rank < 8 and 0 <= file < 8:
      return rank, file
    else:
      return None

  def display(self):
    for rank in self.board:
      rank_str = ""
      for piece in rank:
        if piece is None:
          rank_str += " -"
        else:
          rank_str += f" {piece.get_symbol()}"
      print(rank_str)

  def get_piece(self, rank, file):
    return self.board[rank][file]

  def set_piece(self, piece, rank, file):
    self.board[rank][file] = piece

  def move_piece(self, start_rank, start_file, end_rank, end_file):
    piece = self.get_piece(start_rank, start_file)

    if isinstance(piece, Pawn) or self.get_piece(end_rank, end_file) is not None:
      self.fifty_move_counter = 0  # Reset the counter if it's a pawn move or capture
    else:
      self.fifty_move_counter += 1  # Increment the counter

    self.set_piece(piece, end_rank, end_file)
    self.set_piece(None, start_rank, start_file)

    self.position_history.append(self.get_position())
  
  def is_valid_move(self, move):
    # Check if the move is within the board bounds
    if not self.is_within_bounds(move):
      return False

    piece = self.get_piece(move.source_rank, move.source_file)
    if piece is None or piece.color != self.current_player:
      return False

    if not piece.is_valid_move(move, self):
      return False

    if self.is_king_in_check_after_move(move):
      return False

    return True

  def find_king(self, colour):
    for rank in range(len(self.board)):
      for file in range(len(self.board[rank])):
        piece = self.board[rank][file]
        if isinstance(piece, King) and piece.colour == colour:
          return rank, file
    return None

  def is_in_check(self, colour):
    # Find the current player's king
    king_rank, king_file = self.find_king(colour)

    # Check if any opponent's piece can attack the king
    for rank in range(len(self.board)):
      for file in range(len(self.board[rank])):
        piece = self.board[rank][file]
        if isinstance(piece, Piece) and piece.colour != colour:
          if self.is_valid_move(Move(rank, file, king_rank, king_file)):
            return True

    return False
  
  def is_checkmate(self, colour):
    # Check if the king is in check
    if not self.is_in_check(colour):
      return False

    # Check if the king can escape check or if any piece can block the check
    for rank in range(8):
      for file in range(8):
        piece = self.get_piece(rank, file)
        if piece is not None and piece.get_colour() == colour:
          valid_moves = piece.get_valid_moves(rank, file)
          for move in valid_moves:
            if not self.is_in_check(colour):
              return False

    return True

  def is_stalemate(self, colour):
    # Find the current player's king
    king_position = self.find_king(colour)
    if king_position is None:
      return False

    # Check if the king is in check
    if self.is_in_check(king_position, colour):
      return False

    # Check if the current player has any valid moves
    for rank in range(8):
      for file in range(8):
        piece = self.get_piece(rank, file)
        if piece is not None and piece.get_colour() == colour:
          valid_moves = piece.get_valid_moves(rank, file)
          if valid_moves:
            return False

    # No valid moves found for the current player
    return True

  def is_draw(self):
    # Check for draw conditions
    if self.is_insufficient_material():
      return True

    if self.is_threefold_repetition():
      return True

    if self.is_fifty_move_rule():
      return True

    return False
  
  def is_insufficient_material(self):
    # Check if both players have only kings remaining
    if self.count_pieces() == 2:
      return True

    # Check if the material on the board is insufficient for either player to achieve checkmate
    if self.has_insufficient_material("white") and self.has_insufficient_material("black"):
      return True

    return False

  def count_pieces(self):
    count = 0
    for rank in range(8):
      for file in range(8):
        piece = self.get_piece(rank, file)
        if piece is not None:
          count += 1
    return count

  def get_pieces_by_colour(self, colour):
    pieces = []
    for rank in range(8):
      for file in range(8):
        piece = self.get_piece(rank, file)
        if piece is not None and piece.get_colour() == colour:
          pieces.append(piece)
    return pieces

  def has_insufficient_material(self, colour):
    pieces = self.get_pieces_by_color(colour)

    # Insufficient material if there are no pawns or pieces other than kings
    if not any(isinstance(piece, Pawn) for piece in pieces) and len(pieces) <= 1:
      return True

    return False

  def is_threefold_repetition(self):
    position_count = {}
    for position in self.position_history:
      if position in position_count:
        position_count[position] += 1
      else:
        position_count[position] = 1

      if position_count[position] >= 3:
        return True

    return False

  def get_position(self):
    position = ""
    for rank in range(8):
      for file in range(8):
        piece = self.get_piece(rank, file)
        if piece is None:
          position += "-"
        else:
          position += piece.get_symbol()
    return position

class Move:
  def __init__(self, source, target):
    self.source = source
    self.target = target

class Piece:
  def __init__(self, colour):
    self.colour = colour

  def get_colour(self):
    return self.colour

class Pawn(Piece):
  def get_symbol(self):
    return "\u2659" if self.colour == "white" else "\u265F"
  
  def get_valid_moves(self, rank, file):
    moves = []
    direction = -1 if self.colour == "white" else 1
    initial_rank = 6 if self.colour == "white" else 1
    board_size = self.board.board_size

    # Move forward by 1 rank
    moves.append((rank + direction, file))

    # Move forward by 2 ranks if it's the pawn's initial move
    if rank == initial_rank:
      moves.append((rank + 2 * direction, file))

    # Capture diagonally to the left and right
    capture_moves = self._get_capture_moves(rank, file, direction)
    moves.extend(capture_moves)

    # Filter out moves that are outside the board boundaries
    moves = [(r, f) for r, f in moves if 0 <= r < board_size and 0 <= f < board_size]

    return moves

  def _get_capture_moves(self, rank, file, direction):
    capture_moves = []
    capture_offsets = [(direction, -1), (direction, 1)]

    for offset_rank, offset_file in capture_offsets:
      target_rank = rank + offset_rank
      target_file = file + offset_file
      if self._is_valid_capture(target_rank, target_file):
        capture_moves.append((target_rank, target_file))

    return capture_moves

  def _is_valid_capture(self, rank, file):
    # Check if the target position contains an opponent's piece
    if 0 <= rank < self.board.board_size and 0 <= file < self.board.board_size:
        piece_at_target = self.board.get_piece(rank, file)
        if piece_at_target is not None and piece_at_target.colour != self.colour:
            return True

    return False

  def get_valid_moves(self, rank, file):
    moves = []

    if self.colour == "white":
      moves.append((rank - 1, file))
      # Move forward by 2 ranks if it's the pawn's initial move
      if rank == 6:
        moves.append((rank - 2, file))
      # Capture diagonally to the left and right
      moves.append((rank - 1, file - 1))
      moves.append((rank - 1, file + 1))

    else:
      moves.append((rank + 1, file))
      # Move forward by 2 ranks if it's the pawn's initial move
      if rank == 1:
        moves.append((rank + 2, file))
        # Capture diagonally to the left and right
        moves.append((rank + 1, file - 1))
        moves.append((rank + 1, file + 1))

    # Filter out moves that are outside the board boundaries
    moves = [(r, f) for r, f in moves if 0 <= r < 8 and 0 <= f < 8]

    return moves

class Bishop(Piece):
  def get_symbol(self):
    return "\u2657" if self.colour == "white" else "\u265D"

  def get_valid_moves(rank, file):
    moves = []

    # Diagonal movement
    for i in range(1, 8):
      # Up-right
      if rank - i >= 0 and file + i < 8:
        moves.append((rank - i, file + i))
      # Up-left
      if rank - i >= 0 and file - i >= 0:
        moves.append((rank - i, file - i))
      # Down-right
      if rank + i < 8 and file + i < 8:
        moves.append((rank + i, file + i))
      # Down-left
      if rank + i < 8 and file - i >= 0:
        moves.append((rank + i, file - i))
    return moves

class Rook(Piece):
  def get_symbol(self):
    return "\u2656" if self.colour == "white" else "\u265C"

  def get_valid_moves(self, rank, file):
    moves = []

    # Horizontal movement
    for f in range(file + 1, 8):
      moves.append((rank, f))
    for f in range(file - 1, -1, -1):
      moves.append((rank, f))

    # Vertical movement
    for r in range(rank + 1, 8):
      moves.append((r, file))
    for r in range(rank - 1, -1, -1):
      moves.append((r, file))

    return moves

class Knight(Piece):
  def get_symbol(self):
    return "\u2658" if self.colour == "white" else "\u265E"

  def get_valid_moves(self, rank, file):
    moves = []

    # Knight movement pattern
    knight_moves = [
      (rank - 2, file + 1),  # Up 2, Right 1
      (rank - 1, file + 2),  # Up 1, Right 2
      (rank + 1, file + 2),  # Down 1, Right 2
      (rank + 2, file + 1),  # Down 2, Right 1
      (rank + 2, file - 1),  # Down 2, Left 1
      (rank + 1, file - 2),  # Down 1, Left 2
      (rank - 1, file - 2),  # Up 1, Left 2
      (rank - 2, file - 1),  # Up 2, Left 1
    ]

    # Filter out moves that are outside the board boundaries
    moves = [(r, f) for r, f in knight_moves if 0 <= r < 8 and 0 <= f < 8]

    return moves

class Queen(Piece):
  def get_symbol(self):
    return "\u2655" if self.colour == "white" else "\u265B"

  def get_valid_moves(self, rank, file):
    moves = []

    # Horizontal and vertical movement
    for f in range(file + 1, 8):
      moves.append((rank, f))
    for f in range(file - 1, -1, -1):
      moves.append((rank, f))
    for r in range(rank + 1, 8):
      moves.append((r, file))
    for r in range(rank - 1, -1, -1):
      moves.append((r, file))

    # Diagonal movement
    for i in range(1, 8):
      # Up-right
      if rank - i >= 0 and file + i < 8:
        moves.append((rank - i, file + i))
      # Up-left
      if rank - i >= 0 and file - i >= 0:
        moves.append((rank - i, file - i))
      # Down-right
      if rank + i < 8 and file + i < 8:
        moves.append((rank + i, file + i))
      # Down-left
      if rank + i < 8 and file - i >= 0:
        moves.append((rank + i, file - i))

    return moves

class King(Piece):
  def get_symbol(self):
    return "\u2654" if self.colour == "white" else "\u265A"

  def get_valid_moves(self, rank, file):
    moves = []

    # King movement pattern
    king_moves = [
      (rank - 1, file),    # Up
      (rank - 1, file + 1),  # Up-Right
      (rank, file + 1),    # Right
      (rank + 1, file + 1),  # Down-Right
      (rank + 1, file),    # Down
      (rank + 1, file - 1),  # Down-Left
      (rank, file - 1),    # Left
      (rank - 1, file - 1),  # Up-Left
    ]

    # Filter out moves that are outside the board boundaries
    moves = [(r, f) for r, f in king_moves if 0 <= r < 8 and 0 <= f < 8]

    return moves

class Player:
  def __init__(self, name, colour):
    self.name = name
    self.colour = colour

  def make_move(self, board):
    valid_move = False
    while not valid_move:
      move = input("Enter your move (e.g. 'e2 e4'): ")

      start_pos, end_pos = move.split()

      start_rank, start_file = board.position_to_coordinates(start_pos)
      end_rank, end_file = board.position_to_coordinates(end_pos)

      if board.is_valid_move(start_rank, start_file, end_rank, end_file, self.colour):
        board.move_piece(start_rank, start_file, end_rank, end_file)
        valid_move = True
      else:
        print("Invalid move. Try again.")

  def get_name(self):
    return self.name

  def get_color(self):
    return self.colour

class Game:
  def __init__(self):
    self.board = Board()
    self.players = []
    self.current_player = None

  def setup(self):
    player1_name = input("Enter Player 1 name: ")
    player2_name = input("Enter Player 2 name: ")

    player1_color = "white"
    player2_color = "black"

    self.player1 = Player(player1_name, player1_color)
    self.player2 = Player(player2_name, player2_color)

    self.players = [self.player1, self.player2]

    self.setup_pieces()

    self.current_player = self.player1

    self.start()

  def setup_pieces(self):
    for file in range(8):
      self.board.set_piece(Pawn("white"), rank=1, file=file)
      self.board.set_piece(Pawn("black"), rank=6, file=file)

    self.board.set_piece(Rook("white"), rank=0, file=0)
    self.board.set_piece(Rook("white"), rank=0, file=7)
    self.board.set_piece(Rook("black"), rank=7, file=0)
    self.board.set_piece(Rook("black"), rank=7, file=7)

    self.board.set_piece(Knight("white"), rank=0, file=1)
    self.board.set_piece(Knight("white"), rank=0, file=6)
    self.board.set_piece(Knight("black"), rank=7, file=1)
    self.board.set_piece(Knight("black"), rank=7, file=6)

    self.board.set_piece(Bishop("white"), rank=0, file=2)
    self.board.set_piece(Bishop("white"), rank=0, file=5)
    self.board.set_piece(Bishop("black"), rank=7, file=2)
    self.board.set_piece(Bishop("black"), rank=7, file=5)

    self.board.set_piece(Queen("white"), rank=0, file=3)
    self.board.set_piece(Queen("black"), rank=7, file=3)

    self.board.set_piece(King("white"), rank=0, file=4)
    self.board.set_piece(King("black"), rank=7, file=4)

  def start(self):
    print("Chess Game started!")

    while not self.is_game_over():
      self.board.display()

      print(f"It's {self.current_player.get_name()}'s turn ({self.current_player.get_color()})")
      self.current_player.make_move(self.board)

      self.switch_turn()

    self.end()

  def switch_turn(self):
    if self.current_player == self.player1:
      self.current_player = self.player2
    else:
      self.current_player = self.player1

  def is_game_over(self):
    if self.board.is_checkmate(self.current_player.get_color()):
      print(f"Checkmate! {self.current_player.get_name()} ({self.current_player.get_color()}) wins!")
      return True

    if self.board.is_stalemate(self.current_player.get_color()):
      print("Stalemate! The game is a draw.")
      return True

    if self.board.is_draw():
      print("The game is a draw.")
      return True

    return False

  def end(self):
    print("Thanks for playing")
  

def main():
    game = Game()

    # Perform any initial setup
    game.setup()

    # Start the game
    game.start()

# Entry point of the program
if __name__ == "__main__":
    main()