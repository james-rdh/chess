import pandas as pd
import sqlite3
from selenium import webdriver
# import pyautogui
import time

if __name__ == "__main__":
  # chess content: puzzles, openings, middlegame, endgames, professional games analysis, recent game analysis, history, news, culture, psychology, technology, humour
  # difficulty levels

  # Puzzle database
  conn = sqlite3.connect("./data/chess.db")
  data = pd.read_sql_query("SELECT PuzzleId, FEN, Moves, Rating, Popularity, Themes, OpeningTags FROM ChessPuzzles ORDER BY Popularity DESC LIMIT 20", conn)
  conn.close()
  
  data.head()
  data.info()
  data.describe()

  options = webdriver.ChromeOptions()
  options.add_argument(r"--user-data-dir=C:\Users\james\AppData\Local\Google\Chrome\User Data")
  options.add_argument(r"--profile-directory=Profile 3")

  driver = webdriver.Chrome(options=options)
  
  driver.get('https://www.chess.com/analysis')

# for loop over each puzzle
  # parse the moves
  # paste the FEN
  # flip the board (if needed)
  # click the first piece to move
  # start recording obs-websocket-py https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md#togglerecord
  # click to make the first move
  # spacebar to make the remaining moves
  # stop recording

# potentially create timings for editing

  driver.quit()