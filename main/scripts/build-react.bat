echo Building React App

cd ..\..\renderer
call npm run build
echo Copying build...
del ..\main\build /Q
xcopy build ..\main\build /E /Y
cd ..\main
