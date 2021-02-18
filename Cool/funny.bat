@ECHO OFF

:CONFIRM

echo Does pineapple go on pizza?(Yes/No --- Cap's Sensitive)

set/p "cho=>"

 if %cho%==Yes goto BAD
 
 if %cho%==No goto GOOD
 
 echo Invalid Choice
 
 goto CONFIRM
 
:GOOD

echo You passed! If you did not you would have not been rick rolled.

Start chrome https://nicholaskinchen.github.io/gottem.html
 