Add-Type -AssemblyName System.Windows.Forms # import libraries
function Send-Keys($key) {
  [System.Windows.Forms.SendKeys]::SendWait($key)
}

Send-Keys("{(1)")  # Ctrl+C

Send-Keys("Hello World{ENTER}")  # Types "Hello World" and presses Enter

for ($i = 0; $i -lt 5; $i++) {
  Send-Keys("{DOWN}")  # Press Down arrow 5 times
  Start-Sleep -Milliseconds 100  # Optional delay between presses
}

Send-Keys("^{ESC}") # windows key


start chrome # open browser

Send-Keys("^(l)")
Send-Keys("^(v)")
Send-Keys("{ENTER}") # go to a chess puzzle

Send-Keys("^(%r)") # record the screen